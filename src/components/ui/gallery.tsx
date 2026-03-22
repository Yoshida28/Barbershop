"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

import { cn } from "../../lib/utils";
import { Button } from "./button";

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // First make the container visible with a fade-in
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    // Then start the photo animations after a short delay
    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    ); // Add 0.4s for the opacity transition

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1, // Reduced from 0.3 to 0.1 since we already have the fade-in delay
      },
    },
  };

  // Animation variants for each photo
  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      // Keep the same z-index throughout animation
    }),
    visible: (custom: { x: number; y: number; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0, // No rotation
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15, // Explicit delay based on order
      },
    }),
  };

  // Photo positions - horizontal layout with random y offsets
  // Using barbershop and luxury aesthetic imagery from Unsplash and Pexels
  const photos = [
    {
      id: 1,
      order: 0,
      x: -320,
      y: 15,
      zIndex: 50, // Highest z-index (on top)
      direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      order: 1,
      x: -160,
      y: 32,
      zIndex: 40,
      direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      order: 2,
      x: 0,
      y: 8,
      zIndex: 30,
      direction: "right" as Direction,
      src: "https://images.unsplash.com/photo-1621605815971-8bcaf47d6cb0?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      order: 3,
      x: 160,
      y: 22,
      zIndex: 20,
      direction: "right" as Direction,
      src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      order: 4,
      x: 320,
      y: 44,
      zIndex: 10, // Lowest z-index (at bottom)
      direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="pt-40 pb-20 relative w-full overflow-hidden min-h-screen z-10">
       <div className="absolute inset-0 max-md:hidden top-[100px] -z-10 h-full w-full bg-transparent bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        <p className="lg:text-md mb-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
          A Journey Through Our Craft
        </p>
        <h3 className="z-20 mx-auto max-w-2xl justify-center font-display tracking-[0.2em] uppercase py-3 text-center text-4xl text-heading-text md:text-5xl lg:text-7xl drop-shadow-lg">
          Welcome to <span className="text-emerald-500 italic">TheBarberShop</span>
        </h3>
      </div>
      
      <div className="relative mb-24 h-[400px] w-full items-center justify-center flex mt-12">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[280px] w-[220px]">
              {/* Render photos in reverse order so that higher z-index photos are rendered later in the DOM */}
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0 hidden md:block" // Hidden on small screens if scattered x positions exceed viewport, let's fix below
                  style={{ zIndex: photo.zIndex }} // Apply z-index directly in style
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={220}
                    height={300}
                    src={photo.src}
                    alt="Gallery photo"
                    direction={photo.direction}
                  />
                </motion.div>
              ))}

              {/* Mobile rendering - Stack them without x-offset if screen is small */}
              {[...photos].reverse().map((photo, i) => (
                <motion.div
                  key={'mobile-'+photo.id}
                  className="absolute left-0 top-0 md:hidden"
                   style={{ zIndex: photo.zIndex }}
                   variants={photoVariants}
                   custom={{
                     x: 0, // No horizontal offset on mobile, they just stack
                     y: photo.y + (i * -10),
                     order: photo.order,
                   }}
                >
                  <Photo
                    width={220}
                    height={300}
                    src={photo.src}
                    alt="Gallery photo"
                    direction={photo.direction}
                  />
                </motion.div>
              ))}

            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="flex w-full justify-center mt-12 pb-24 z-20 relative">
        <Button variant="outline" className="text-xs uppercase tracking-[0.2em] font-bold px-8 py-6 rounded-none">
          View Masterpieces
        </Button>
      </div>
    </div>
  );
};

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

const MotionImage = motion.img;

type Direction = "left" | "right";

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      whileTap={{ scale: 1.1, zIndex: 9999 }}
      whileHover={{
        scale: 1.05,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.05,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing p-2 bg-neutral-100 rounded-sm shadow-2xl border border-white/20"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-black">
        <MotionImage
          className={cn("h-full w-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700")}
          src={src}
          alt={alt}
          {...props as any}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
