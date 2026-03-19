import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  image: string;
}

const PRODUCTS: Product[] = [
  { name: "Matte Clay", price: "$28", image: "https://images.unsplash.com/photo-1594434296621-5038a4966a99?q=80&w=400&auto=format&fit=crop" },
  { name: "Beard Oil", price: "$32", image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=400&auto=format&fit=crop" },
  { name: "Texture Spray", price: "$24", image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?q=80&w=400&auto=format&fit=crop" },
];

const MERCHANDISE: Product[] = [
  { name: "Vanguard Tee", price: "$45", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" },
  { name: "Leather Apron", price: "$180", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=400&auto=format&fit=crop" },
  { name: "Steel Comb", price: "$35", image: "https://images.unsplash.com/photo-1590540179852-2110a54f813a?q=80&w=400&auto=format&fit=crop" },
];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left">
    {subtitle && (
      <p className="text-[10px] uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-neutral-500">
        <span className="w-8 h-[1px] block bg-neutral-300" />
        {subtitle}
      </p>
    )}
    <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-primary">{title}</h2>
  </div>
);

// High-end masonry/grid style component
const ProductGrid = ({ items, title }: { items: Product[], title: string }) => (
   <div className="mb-32">
      <div className="flex justify-between items-end mb-12 border-b border-neutral-200 pb-4">
         <h3 className="text-3xl font-display tracking-widest uppercase text-primary">{title}</h3>
         <button className="text-[10px] uppercase tracking-widest font-bold hover:text-neutral-500 flex items-center gap-2">View All <ArrowRight size={14} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {items.map((item, i) => (
          <div key={item.name} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden bg-secondary mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                 <button className="bg-white text-primary rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ShoppingBag size={24} />
                 </button>
              </div>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700" 
              />
            </div>
            <div className="flex justify-between items-center px-2 border-b border-transparent group-hover:border-primary transition-colors pb-2">
               <div>
                  <h4 className="text-lg font-bold font-display tracking-wider uppercase text-primary">{item.name}</h4>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Vanguard Original</p>
               </div>
               <span className="font-mono text-sm font-bold bg-neutral-100 px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
   </div>
);

export default function Products() {
  return (
    <div className="w-full relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Apothecary" subtitle="Provisions" />
        <p className="max-w-2xl text-neutral-500 font-light leading-relaxed mb-24">
           Curated grooming essentials and dry goods. Crafted with the same uncompromising standards as our barbershop services. Elevate your daily ritual.
        </p>

        <ProductGrid items={PRODUCTS} title="Grooming" />
        <ProductGrid items={MERCHANDISE} title="Dry Goods" />
      </div>
    </div>
  );
}
