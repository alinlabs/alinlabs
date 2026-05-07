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
    const [isJson, setIsJson] = useState(false);
    const [hasError, setHasError] = useState(false);
    // Initialize safe-to-render as true if forceRender is on
    const [isSafeToRender, setIsSafeToRender] = useState(forceRender);

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
        if (forceRender) return; // Skip observer logic if forced

        const element = containerRef.current;
        if (!element || !src) return;

        let resizeObserver: ResizeObserver | null = null;
        let intersectionObserver: IntersectionObserver | null = null;
        let renderTimeout: any = null;

        const checkReadiness = () => {
            if (!element) return;
            const rect = element.getBoundingClientRect();
            // Validate dimensions - ensure element is visible
            const hasValidDimensions = rect.width > 0 || rect.height > 0;

            if (hasValidDimensions) {
                if (renderTimeout) clearTimeout(renderTimeout);
                renderTimeout = setTimeout(() => {
                    setIsSafeToRender(true);
                }, 50); // Reduced timeout for faster rendering
            }
        };

        resizeObserver = new ResizeObserver(() => checkReadiness());
        resizeObserver.observe(element);

        intersectionObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) checkReadiness();
        });
        intersectionObserver.observe(element);

        checkReadiness();

        return () => {
            if (resizeObserver) resizeObserver.disconnect();
            if (intersectionObserver) intersectionObserver.disconnect();
            if (renderTimeout) clearTimeout(renderTimeout);
        };
    }, [src, forceRender]);

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
                    console.warn(`Lottie data failed for: ${src}`);
                    setHasError(true);
                });
                anim.addEventListener('error', (e: any) => {
                    console.warn(`Lottie error for: ${src}`, e);
                    setHasError(true);
                });

            } catch (e) {
                console.error("Lottie load exception:", e);
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
            <div className={`${className} flex items-center justify-center bg-slate-50/50 rounded-xl`}>
                <AlertTriangle className="w-6 h-6 text-slate-300 opacity-50" />
            </div>
        );
    }

    return (
        <div 
            ref={containerRef} 
            className={className}
            style={{ display: 'block' }} 
        >
            {isSafeToRender && !isJson && (
                <LottieErrorBoundary fallback={<div className="w-full h-full bg-transparent" />}>
                    <DotLottieReact
                        key={`${src}-${isSafeToRender}`}
                        src={src}
                        loop={loop}
                        autoplay={autoplay}
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