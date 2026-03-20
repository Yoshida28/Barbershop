'use client'
import React from 'react'
import { Link } from 'react-router-dom' // Changed from next/link
import { Button } from '../ui/button'
import { InfiniteSlider } from '../ui/infinite-slider'
import { ProgressiveBlur } from '../ui/progressive-blur'
import { cn } from '../../lib/utils'
import { Menu, X, ChevronRight, Scissors, Star, Shield, Award, Crown, Sparkles } from 'lucide-react'
import { useScroll, motion } from 'framer-motion' // Changed from motion/react

const HERO_VIDEO_START = 13
const HERO_VIDEO_END = 60

export function HeroSection() {
    return (
        <>
            <main className="overflow-x-hidden pt-20">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-32">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-3xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-display uppercase tracking-widest text-heading-text">
                                  Elevate Your Style at <span className="text-white italic block mt-2">Vanguard</span>
                                </h1>

                                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[4/5] absolute inset-1 overflow-hidden rounded-3xl border border-white/10 md:aspect-video lg:rounded-[3rem] top-32 -z-10 bg-black">
                            <video
                                className="size-full object-cover opacity-55 scale-105"
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                aria-label="Barbershop cinematic background"
                                onLoadedMetadata={(event) => {
                                    event.currentTarget.currentTime = HERO_VIDEO_START
                                }}
                                onTimeUpdate={(event) => {
                                    if (event.currentTarget.currentTime >= HERO_VIDEO_END) {
                                        event.currentTarget.currentTime = HERO_VIDEO_START
                                        void event.currentTarget.play()
                                    }
                                }}
                            >
                                <source src="/src/public/herovideo.mp4" type="video/mp4" />
                            </video>
                            {/* Vignette + directional gradient keep hero copy readable */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-8 pt-12 md:pb-16 border-t border-white/5 relative z-10 overflow-hidden">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row gap-8">
                            <div className="md:max-w-44 md:border-r border-white/10 md:pr-6 whitespace-nowrap">
                                <p className="text-center md:text-end text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">The Vanguard Standard</p>
                            </div>
                            <div className="relative py-2 w-full md:w-[calc(100%-11rem)]">
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
        </>
    )
}
