import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  image: string;
}

const PRODUCTS: Product[] = [
  { name: "Matte Clay", price: "$28", image: "https://images.pexels.com/photos/4587635/pexels-photo-4587635.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Beard Oil", price: "$32", image: "https://images.pexels.com/photos/672629/pexels-photo-672629.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Texture Spray", price: "$24", image: "https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const MERCHANDISE: Product[] = [
  { name: "Vanguard Tee", price: "$45", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Leather Apron", price: "$180", image: "https://images.pexels.com/photos/3389531/pexels-photo-3389531.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Steel Comb", price: "$35", image: "https://images.pexels.com/photos/10153406/pexels-photo-10153406.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left">
    {subtitle && (
      <p className="text-xs uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-body-text">
        <span className="w-8 h-[1px] block bg-neutral-300" />
        {subtitle}
      </p>
    )}
    <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-heading-text">{title}</h2>
  </div>
);

// High-end masonry/grid style component
const ProductGrid = ({ items, title }: { items: Product[], title: string }) => (
   <div className="mb-32">
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
         <h3 className="text-3xl font-display tracking-widest uppercase text-heading-text">{title}</h3>
         <button className="text-xs uppercase tracking-widest font-bold hover:text-body-text flex items-center gap-2">View All <ArrowRight size={14} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {items.map((item, i) => (
          <div key={item.name} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden bg-secondary-bg mb-6 relative">
              <div className="absolute inset-0 bg-primary-bg/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                 <button className="bg-primary-bg-bg text-heading-text rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
                  <h4 className="text-lg font-bold font-display tracking-wider uppercase text-heading-text">{item.name}</h4>
                  <p className="text-xs text-muted-text uppercase tracking-widest mt-1">Vanguard Original</p>
               </div>
               <span className="font-mono text-sm font-bold bg-white/5 px-3 py-1 rounded-full group-hover:bg-primary-bg group-hover:text-heading-text transition-colors">{item.price}</span>
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
        <p className="max-w-2xl text-body-text font-light leading-relaxed mb-24">
           Curated grooming essentials and dry goods. Crafted with the same uncompromising standards as our barbershop services. Elevate your daily ritual.
        </p>

        <ProductGrid items={PRODUCTS} title="Grooming" />
        <ProductGrid items={MERCHANDISE} title="Dry Goods" />
      </div>
    </div>
  );
}
