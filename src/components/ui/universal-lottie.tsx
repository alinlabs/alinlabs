import React, { Component, useEffect, useRef, useState, ReactNode, ErrorInfo } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import lottie from 'lottie-web';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary to catch render errors from DotLottieReact
class LottieErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Silent catch to prevent app crash
    console.debug("Lottie Render Issue:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

interface UniversalLottieProps {
    src?: string; 
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
    forceRender?: boolean; // New prop to skip visibility checks
}

export const UniversalLottie: React.FC<UniversalLottieProps> = ({ 
    src, 
    className = "w-full h-full", 
    autoplay = true, 
    loop = true, 
    forceRender = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const jsonContainerRef = useRef<HTMLDivElement>(null);
    const dotLottieInstanceRef = useRef<any>(null);
    const [isJson, setIsJson] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSafeToRender, setIsSafeToRender] = useState(forceRender);
    const [isInViewport, setIsInViewport] = useState(forceRender);
    const [isTabVisible, setIsTabVisible] = useState(() =>
        typeof document !== 'undefined' ? !document.hidden : true
    );

    useEffect(() => {
        if (!src) {
            if (!forceRender) setIsSafeToRender(false);
            return;
        }
        setHasError(false);
        setIsJson(src.toLowerCase().endsWith('.json'));
        if (!forceRender) setIsSafeToRender(false);
    }, [src, forceRender]);

    useEffect(() => {
        const handleVisibility = () => {
            setIsTabVisible(!document.hidden);
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    useEffect(() => {
        if (forceRender) return;

        const element = containerRef.current;
        if (!element || !src) return;

        let resizeObserver: ResizeObserver | null = null;
        let intersectionObserver: IntersectionObserver | null = null;
        let renderTimeout: ReturnType<typeof setTimeout> | null = null;

        const checkReadiness = (intersecting?: boolean) => {
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const hasValidDimensions = rect.width > 0 || rect.height > 0;
            const nearViewport =
                typeof intersecting === 'boolean'
                    ? intersecting
                    : rect.bottom >= -150 && rect.top <= (window.innerHeight || 900) + 150;

            if (hasValidDimensions && nearViewport) {
                if (renderTimeout) clearTimeout(renderTimeout);
                renderTimeout = setTimeout(() => {
                    setIsSafeToRender(true);
                }, 40);
            }
        };

        resizeObserver = new ResizeObserver(() => checkReadiness());
        resizeObserver.observe(element);

        intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
                if (entry.isIntersecting) checkReadiness(true);
            },
            { rootMargin: '150px' }
        );
        intersectionObserver.observe(element);

        checkReadiness();

        return () => {
            if (resizeObserver) resizeObserver.disconnect();
            if (intersectionObserver) intersectionObserver.disconnect();
            if (renderTimeout) clearTimeout(renderTimeout);
        };
    }, [src, forceRender]);

    // Pause / resume DotLottie when offscreen or tab is backgrounded
    useEffect(() => {
        const instance = dotLottieInstanceRef.current;
        if (!instance || !autoplay) return;
        try {
            if (isInViewport && isTabVisible) {
                instance.play?.();
            } else {
                instance.pause?.();
            }
        } catch {
            // Ignore instance lifecycle edge cases
        }
    }, [isInViewport, isTabVisible, autoplay]);

    // JSON Renderer (Lottie-Web SVG)
    useEffect(() => {
        if (isJson && isSafeToRender && jsonContainerRef.current && !hasError && src) {
            let anim: any;
            try {
                anim = lottie.loadAnimation({
                    container: jsonContainerRef.current,
                    renderer: 'svg',
                    loop: loop,
                    autoplay: autoplay,
                    path: src,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                });

                anim.addEventListener('data_failed', () => {
                    setHasError(true);
                });
                anim.addEventListener('error', () => {
                    setHasError(true);
                });
            } catch {
                setHasError(true);
            }

            return () => {
                if (anim) anim.destroy();
            };
        }
    }, [isJson, src, loop, autoplay, isSafeToRender, hasError]);

    if (!src) return null;

    if (hasError) {
        return (
            <div className={`${className} flex items-center justify-center bg-slate-50/80 rounded-xl`}>
                <AlertTriangle className="w-6 h-6 text-slate-300 opacity-60" />
            </div>
        );
    }

    return (
        <div 
            ref={containerRef} 
            className={className}
            style={{ display: 'block' }} 
        >
            {!isSafeToRender && (
                <div className="w-full h-full rounded-xl bg-slate-100/70 animate-pulse" aria-hidden="true" />
            )}

            {isSafeToRender && !isJson && (
                <LottieErrorBoundary fallback={<div className="w-full h-full bg-transparent" />}>
                    <DotLottieReact
                        key={src}
                        src={src}
                        loop={loop}
                        autoplay={autoplay && isInViewport && isTabVisible}
                        dotLottieRefCallback={(instance) => {
                            dotLottieInstanceRef.current = instance;
                        }}
                        style={{ width: '100%', height: '100%' }}
                        onError={() => setHasError(true)}
                    />
                </LottieErrorBoundary>
            )}
            
            {isSafeToRender && isJson && (
                <div ref={jsonContainerRef} style={{ width: '100%', height: '100%' }} />
            )}
        </div>
    );
};