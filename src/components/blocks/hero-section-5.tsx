'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { InfiniteSlider } from '../ui/infinite-slider'
import { ProgressiveBlur } from '../ui/progressive-blur'
import { cn } from '../../lib/utils'
import { Menu, X, ChevronRight, Scissors, Star, Shield, Award, Crown, Sparkles } from 'lucide-react'
import { useScroll, motion, AnimatePresence } from 'framer-motion'

const PHRASES = [
  "Elevate Your Style at the",
  "Master Your Look at the",
  "Refine Your Edge at the",
  "Discover True Luxury at the",
  "Find Perfection at the"
];

export function HeroSection() {
    const [index, setIndex] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Phrase rotation
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % PHRASES.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    // Robust video playback handler
    const handleVideoReady = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        setVideoLoaded(true);

        // Attempt to play — browsers may block autoplay even with muted
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented; try again on user interaction
                const resumePlay = () => {
                    video.play().catch(() => {});
                    document.removeEventListener('click', resumePlay);
                    document.removeEventListener('touchstart', resumePlay);
                };
                document.addEventListener('click', resumePlay, { once: true });
                document.addEventListener('touchstart', resumePlay, { once: true });
            });
        }
    }, []);

    // Set up video event listeners via ref for maximum reliability
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // If already ready (cached), fire immediately
        if (video.readyState >= 3) {
            handleVideoReady();
            return;
        }

        video.addEventListener('canplaythrough', handleVideoReady);
        // Fallback: if canplaythrough never fires, use canplay
        const fallbackTimer = setTimeout(() => {
            if (!videoLoaded && video.readyState >= 2) {
                handleVideoReady();
            }
        }, 4000);

        return () => {
            video.removeEventListener('canplaythrough', handleVideoReady);
            clearTimeout(fallbackTimer);
        };
    }, [handleVideoReady]);

    return (
        <>
            <main className="overflow-x-hidden pt-20">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-32">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-3xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-display uppercase tracking-widest text-heading-text">
                                    <div className="relative h-[2.5em] md:h-[2em] w-full flex items-center justify-center lg:justify-start">
                                        <AnimatePresence mode="popLayout">
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                                className="absolute w-full"
                                            >
                                                {PHRASES[index]}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>
                                    <span className="block mt-2">
                                        <span className="text-white italic">Barbershop</span>
                                    </span>
                                </h1>

                                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[4/5] absolute inset-1 overflow-hidden rounded-3xl border border-white/10 md:aspect-video lg:rounded-[3rem] top-32 -z-10 bg-black">
                            {/* Loading spinner — shown until video is ready to play */}
                            <AnimatePresence>
                                {!videoLoaded && (
                                    <motion.div
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="absolute inset-0 z-20 flex items-center justify-center bg-black"
                                    >
                                        <div className="hero-loader">
                                            <div className="hero-loader-ring" />
                                            <Scissors className="hero-loader-icon" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <video
                                ref={videoRef}
                                className={cn(
                                    "size-full object-cover opacity-0 scale-105 transition-opacity duration-700",
                                    videoLoaded && "opacity-55"
                                )}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                aria-label="Barbershop cinematic background"
                                src="/herovideo.mp4"
                            />
                            {/* Vignette + directional gradient keep hero copy readable */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-4 pt-4 md:pb-6 border-t border-white/5 relative z-10 overflow-hidden">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row gap-6">
                            <div className="md:min-w-[14rem] md:max-w-[14rem] md:border-r border-white/10 md:pr-8 whitespace-nowrap shrink-0">
                                <p className="text-center md:text-end text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">The Barbershop</p>
                            </div>
                            <div className="relative py-2 w-full md:w-[calc(100%-16rem)] overflow-hidden">
                                <InfiniteSlider
                                    durationOnHover={20}
                                    duration={40}
                                    gap={64}>
                                    <div className="flex items-center gap-2 text-neutral-400 opacity-60">
                                        <Scissors className="w-5 h-5" />
                                        <span className="text-sm tracking-widest uppercase font-semibold">Precision Cuts</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-400 opacity-60">
                                        <Crown className="w-5 h-5" />
                                        <span className="text-sm tracking-widest uppercase font-semibold">Royal Treatment</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-400 opacity-60">
                                        <Star className="w-5 h-5" />
                                        <span className="text-sm tracking-widest uppercase font-semibold">5-Star Service</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-400 opacity-60">
                                        <Shield className="w-5 h-5" />
                                        <span className="text-sm tracking-widest uppercase font-semibold">Premium Quality</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-400 opacity-60">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="text-sm tracking-widest uppercase font-semibold">Luxury Grooming</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-400 opacity-60">
                                        <Award className="w-5 h-5" />
                                        <span className="text-sm tracking-widest uppercase font-semibold">Master Barbers</span>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-gradient-to-r from-background to-transparent absolute inset-y-0 left-0 w-32 z-10"></div>
                                <div className="bg-gradient-to-l from-background to-transparent absolute inset-y-0 right-0 w-32 z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Loader styles */}
            <style>{`
                .hero-loader {
                    position: relative;
                    width: 64px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hero-loader-ring {
                    position: absolute;
                    inset: 0;
                    border: 2px solid rgba(255, 255, 255, 0.08);
                    border-top-color: rgba(196, 164, 110, 0.7);
                    border-radius: 50%;
                    animation: hero-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .hero-loader-icon {
                    width: 22px;
                    height: 22px;
                    color: rgba(196, 164, 110, 0.6);
                    animation: hero-pulse 1.8s ease-in-out infinite;
                }
                @keyframes hero-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes hero-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
            `}</style>
        </>
    )
}
