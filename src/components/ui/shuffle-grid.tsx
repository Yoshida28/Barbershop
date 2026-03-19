"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto min-h-screen">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-emerald-500 uppercase tracking-[0.3em] font-bold">
          The Vanguard Portfolio
        </span>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-widest text-heading-text leading-tight">
          Precision <br/>& Heritage
        </h3>
        <p className="text-sm md:text-base text-neutral-400 my-6 md:my-8 leading-loose tracking-wider uppercase max-w-md">
          A definitive collection of our finest grooming work. Each cut is a testament to our dedication to the craft and the gentlemen we serve.
        </p>
        <button className={cn(
          "bg-white/10 border border-white/20 text-white font-bold py-4 px-8 uppercase tracking-[0.2em] text-xs",
          "transition-all hover:bg-white hover:text-black active:scale-95",
          "focus-visible:outline-none"
        )}>
          Book An Appointment
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Vanguard-themed Unsplash images showcasing barbershop concepts
const squareData = [
  { id: 1, src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop" },
  { id: 2, src: "https://images.unsplash.com/photo-1621605815971-8bcaf47d6cb0?q=80&w=800&auto=format&fit=crop" },
  { id: 3, src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop" },
  { id: 4, src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" },
  { id: 5, src: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop" },
  { id: 6, src: "https://images.unsplash.com/photo-1605497788044-5a32c707d30f?q=80&w=800&auto=format&fit=crop" },
  { id: 7, src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=800&auto=format&fit=crop" },
  { id: 8, src: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800&auto=format&fit=crop" },
  { id: 9, src: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=800&auto=format&fit=crop" },
  { id: 10, src: "https://images.unsplash.com/photo-1555135111-82e44dabcba8?q=80&w=800&auto=format&fit=crop" },
  { id: 11, src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop" },
  { id: 12, src: "https://images.unsplash.com/photo-1520697921966-2246473cd63a?q=80&w=800&auto=format&fit=crop" },
  { id: 13, src: "https://images.unsplash.com/photo-1543362145-ee9f61b1b46a?q=80&w=800&auto=format&fit=crop" },
  { id: 14, src: "https://images.unsplash.com/photo-1490226317420-9118c7edccc3?q=80&w=800&auto=format&fit=crop" },
  { id: 15, src: "https://images.unsplash.com/photo-1635273051050-02a8ce2942b0?q=80&w=800&auto=format&fit=crop" },
  { id: 16, src: "https://images.unsplash.com/photo-1506836467174-27f1042aa48c?q=80&w=800&auto=format&fit=crop" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full overflow-hidden bg-neutral-900 border border-white/5 grayscale hover:grayscale-0 transition-all duration-500 rounded-sm"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] md:h-[600px] gap-2 lg:gap-4 p-4 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm shadow-2xl">
      {squares.map((sq) => sq)}
    </div>
  );
};
