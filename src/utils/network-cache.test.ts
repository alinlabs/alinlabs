import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MemoryCache,
  resilientFetch,
  resolveServiceRoute,
  clearInFlightForTests,
} from './network-cache.ts';
import { ViewState } from '../types/index.ts';

test('MemoryCache expires entries after TTL elapses', () => {
  const cache = new MemoryCache<string>({ maxEntries: 10, defaultTtlMs: 1000 });
  cache.set('k1', 'v1', 1000, 5000);

  assert.equal(cache.get('k1', 5500), 'v1');
  assert.equal(cache.get('k1', 6000), undefined);
  assert.equal(cache.has('k1', 6000), false);
});

test('MemoryCache evicts least-recently-used entry when maxEntries exceeded', () => {
  const cache = new MemoryCache<number>({ maxEntries: 2, defaultTtlMs: 10000 });
  cache.set('a', 1, 10000, 100);
  cache.set('b', 2, 10000, 101);

  // Touch 'a' so 'b' becomes least-recently-used
  assert.equal(cache.get('a', 102), 1);

  cache.set('c', 3, 10000, 103);
  assert.equal(cache.size, 2);
  assert.equal(cache.get('a', 104), 1);
  assert.equal(cache.get('b', 104), undefined);
  assert.equal(cache.get('c', 104), 3);
});

test('resilientFetch deduplicates concurrent identical requests and caches result', async () => {
  clearInFlightForTests();
  let callCount = 0;
  const cache = new MemoryCache<unknown>({ maxEntries: 10, defaultTtlMs: 60000 });

  const mockFetch = (async () => {
    callCount++;
    await new Promise((r) => setTimeout(r, 25));
    return new Response(JSON.stringify({ ok: true, count: callCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as unknown as typeof fetch;

  const [r1, r2] = await Promise.all([
    resilientFetch<{ ok: boolean; count: number }>('https://example.com/api/test', {
      fetchImpl: mockFetch,
      cache,
    }),
    resilientFetch<{ ok: boolean; count: number }>('https://example.com/api/test', {
      fetchImpl: mockFetch,
      cache,
    }),
  ]);

  assert.equal(callCount, 1);
  assert.deepEqual(r1, { ok: true, count: 1 });
  assert.deepEqual(r2, { ok: true, count: 1 });

  // Third call hits memory cache without calling fetch
  const r3 = await resilientFetch<{ ok: boolean; count: number }>('https://example.com/api/test', {
    fetchImpl: mockFetch,
    cache,
  });
  assert.equal(callCount, 1);
  assert.deepEqual(r3, { ok: true, count: 1 });
});

test('resilientFetch retries transient 503 responses and succeeds', async () => {
  clearInFlightForTests();
  let attempts = 0;
  const cache = new MemoryCache<unknown>();

  const mockFetch = (async () => {
    attempts++;
    if (attempts < 3) {
      return new Response('Service Unavailable', { status: 503 });
    }
    return new Response(JSON.stringify({ recovered: true }), { status: 200 });
  }) as unknown as typeof fetch;

  const data = await resilientFetch<{ recovered: boolean }>('https://example.com/retry', {
    fetchImpl: mockFetch,
    cache,
    retries: 2,
    retryDelayMs: 10,
  });

  assert.equal(attempts, 3);
  assert.deepEqual(data, { recovered: true });
});

test('resilientFetch aborts on timeout and falls back to stale cache if present', async () => {
  clearInFlightForTests();
  const cache = new MemoryCache<unknown>();
  cache.set('json:https://example.com/slow', { stale: true }, 1, 0); // already expired

  const hangingFetch = ((_: RequestInfo | URL, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new Error('Aborted')));
    })) as unknown as typeof fetch;

  const fallbackResult = await resilientFetch<{ stale: boolean }>('https://example.com/slow', {
    fetchImpl: hangingFetch,
    cache,
    timeoutMs: 25,
    retries: 0,
  });

  assert.deepEqual(fallbackResult, { stale: true });
});

test('resilientFetch throws when no cache exists and all retries fail', async () => {
  clearInFlightForTests();
  const cache = new MemoryCache<unknown>();
  const failFetch = (async () => new Response('Server Error', { status: 500 })) as unknown as typeof fetch;

  await assert.rejects(
    resilientFetch('https://example.com/fail', {
      fetchImpl: failFetch,
      cache,
      retries: 1,
      retryDelayMs: 5,
    }),
    /HTTP 500/
  );
});

test('resolveServiceRoute maps virtual service views to PRODUCTS with packageId', () => {
  assert.deepEqual(resolveServiceRoute(ViewState.SERVICE_ECOSYSTEM), {
    view: ViewState.PRODUCTS,
    packageId: 'website-aplikasi',
  });
  assert.deepEqual(resolveServiceRoute(ViewState.SERVICE_ADS), {
    view: ViewState.PRODUCTS,
    packageId: 'digital-marketing',
  });
  assert.deepEqual(resolveServiceRoute(ViewState.SERVICE_CINEMA), {
    view: ViewState.PRODUCTS,
    packageId: 'konten-live',
  });
  assert.deepEqual(resolveServiceRoute(ViewState.PORTFOLIO), {
    view: ViewState.PORTFOLIO,
    packageId: null,
  });
});
