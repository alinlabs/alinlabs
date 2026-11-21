import { ViewState } from '../types';

export interface MemoryCacheOptions {
  maxEntries?: number;
  defaultTtlMs?: number;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  createdAt: number;
}

/**
 * Bounded LRU + TTL in-memory cache for runtime API/JSON/Lottie data.
 * Evicts the least-recently-used entry when maxEntries is exceeded.
 */
export class MemoryCache<T = unknown> {
  private readonly store = new Map<string, CacheEntry<T>>();
  private readonly maxEntries: number;
  private readonly defaultTtlMs: number;

  constructor(options: MemoryCacheOptions = {}) {
    this.maxEntries = Math.max(1, Math.floor(options.maxEntries ?? 100));
    this.defaultTtlMs = Math.max(100, Math.floor(options.defaultTtlMs ?? 5 * 60 * 1000));
  }

  get(key: string, now = Date.now()): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (now >= entry.expiresAt) {
      return undefined;
    }

    // Refresh recency in Map insertion order (LRU)
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.value;
  }

  /**
   * Returns stale value even if expired (used for offline/network error fallback).
   */
  getStale(key: string): T | undefined {
    return this.store.get(key)?.value;
  }

  set(key: string, value: T, ttlMs = this.defaultTtlMs, now = Date.now()): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.maxEntries) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
      }
    }

    this.store.set(key, {
      value,
      expiresAt: now + Math.max(1, ttlMs),
      createdAt: now,
    });
  }

  has(key: string, now = Date.now()): boolean {
    return this.get(key, now) !== undefined;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}

export interface ResilientFetchOptions {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  cacheTtlMs?: number;
  bypassCache?: boolean;
  parseAs?: 'json' | 'text';
  fetchImpl?: typeof fetch;
  cache?: MemoryCache<unknown>;
}

const defaultRuntimeCache = new MemoryCache<unknown>({
  maxEntries: 80,
  defaultTtlMs: 5 * 60 * 1000,
});

const inFlightRequests = new Map<string, Promise<unknown>>();

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || (status >= 500 && status <= 599);
}

/**
 * Resilient fetch wrapper with:
 * - In-memory TTL + LRU caching
 * - In-flight request deduplication
 * - AbortController timeout safeguard
 * - Bounded exponential retry for transient/5xx failures
 * - Stale cache fallback when network is unstable/offline
 */
export async function resilientFetch<T = unknown>(
  url: string,
  options: ResilientFetchOptions = {}
): Promise<T> {
  const {
    timeoutMs = 8000,
    retries = 2,
    retryDelayMs = 250,
    cacheTtlMs = 5 * 60 * 1000,
    bypassCache = false,
    parseAs = 'json',
    fetchImpl = fetch,
    cache = defaultRuntimeCache,
  } = options;

  const cacheKey = `${parseAs}:${url}`;

  if (!bypassCache) {
    const cached = cache.get(cacheKey);
    if (cached !== undefined) {
      return cached as T;
    }
  }

  const existingInFlight = inFlightRequests.get(cacheKey);
  if (existingInFlight) {
    return existingInFlight as Promise<T>;
  }

  const execute = async (): Promise<T> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(new Error(`Request timeout after ${timeoutMs}ms`)), timeoutMs);

      try {
        const response = await fetchImpl(url, { signal: controller.signal });
        clearTimeout(timer);

        if (!response.ok) {
          const err = new Error(`HTTP ${response.status} for ${url}`);
          if (attempt < retries && isRetryableStatus(response.status)) {
            lastError = err;
            await sleep(retryDelayMs * Math.pow(2, attempt));
            continue;
          }
          throw err;
        }

        const data = (parseAs === 'text' ? await response.text() : await response.json()) as T;
        cache.set(cacheKey, data, cacheTtlMs);
        return data;
      } catch (error) {
        clearTimeout(timer);
        lastError = error;

        if (attempt < retries) {
          await sleep(retryDelayMs * Math.pow(2, attempt));
          continue;
        }
      }
    }

    const stale = cache.getStale(cacheKey);
    if (stale !== undefined) {
      return stale as T;
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  };

  const promise = execute().finally(() => {
    inFlightRequests.delete(cacheKey);
  });

  inFlightRequests.set(cacheKey, promise);
  return promise;
}

const preloadedImageUrls = new Set<string>();

/**
 * Deduplicated image preloader for upcoming banners / critical assets.
 */
export function preloadImage(src: string): void {
  if (!src || typeof Image === 'undefined' || preloadedImageUrls.has(src)) return;
  preloadedImageUrls.add(src);
  const img = new Image();
  img.referrerPolicy = 'no-referrer';
  img.decoding = 'async';
  img.src = src;
}

export interface ResolvedRoute {
  view: ViewState;
  packageId: string | null;
}

/**
 * Maps virtual service views (SERVICE_ECOSYSTEM, SERVICE_ADS, SERVICE_CINEMA)
 * to concrete PRODUCTS view + packageId so every link resolves properly.
 */
export function resolveServiceRoute(view: ViewState): ResolvedRoute {
  switch (view) {
    case ViewState.SERVICE_ECOSYSTEM:
      return { view: ViewState.PRODUCTS, packageId: 'website-aplikasi' };
    case ViewState.SERVICE_ADS:
      return { view: ViewState.PRODUCTS, packageId: 'digital-marketing' };
    case ViewState.SERVICE_CINEMA:
      return { view: ViewState.PRODUCTS, packageId: 'konten-live' };
    default:
      return { view, packageId: null };
  }
}

export function clearInFlightForTests(): void {
  inFlightRequests.clear();
  defaultRuntimeCache.clear();
}
