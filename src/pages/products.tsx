import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, X, Star, ShieldCheck, ChevronLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/supabase';
import { Loader } from '../components/ui/loader';

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full md:max-w-3xl bg-[#18140f] border border-[#c4a15a]/20 rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '92vh', overflowY: 'auto' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-[#c4a15a] rounded-full p-2 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 aspect-square md:aspect-auto md:min-h-[420px] flex-shrink-0 overflow-hidden bg-[#18140f] flex items-center justify-center">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag size={48} className="text-[#c4a15a]/20" />
            )}
          </div>

          <div className="flex flex-col p-7 md:p-9 flex-1">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c4a15a]/70 font-bold mb-3">
              {product.category}
            </span>

            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-[#c4a15a] leading-none mb-4">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.round(product.rating || 5) ? 'text-[#c4a15a] fill-[#c4a15a]' : 'text-[#7f6738]'}
                  />
                ))}
              </div>
              <span className="text-xs text-[#a88a4e]">{product.rating || '5.0'} · {product.reviews || 0} reviews</span>
            </div>

            <div className="text-4xl font-mono font-bold text-[#c4a15a] mb-6">{product.price}</div>

            <p className="text-[#a88a4e] font-light leading-relaxed mb-6 text-sm">{product.description}</p>

            <ul className="space-y-2 mb-8">
              {(product.details || []).map(d => (
                <li key={d} className="flex items-center gap-3 text-sm text-[#a88a4e]">
                  <ShieldCheck size={13} className="text-[#c4a15a] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link to="/contact" className="w-full bg-[#c4a15a] text-[#0b0a08] font-bold uppercase tracking-widest text-xs py-4 px-6 rounded-full hover:bg-[#d4b56a] active:scale-95 transition-all flex items-center justify-center gap-2">
                <Mail size={15} />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View All Overlay ─────────────────────────────────────────────────────────
function ViewAllOverlay({
  title,
  items,
  onClose,
  onSelect,
}: {
  title: string;
  items: Product[];
  onClose: () => void;
  onSelect: (p: Product) => void;
}) {
  return (
    <div className="fixed inset-0 z-40 bg-[#0b0a08] overflow-y-auto">
      {/* sticky header */}
      <div className="sticky top-0 z-10 bg-[#0b0a08]/95 backdrop-blur-md border-b border-[#c4a15a]/15 px-6 py-5 flex items-center gap-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#c4a15a] hover:text-[#d4b56a] transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <span className="w-[1px] h-5 bg-[#c4a15a]/20" />
        <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-[#c4a15a]">{title} — All Products</h3>
        <span className="ml-auto bg-[#c4a15a]/10 text-[#c4a15a] text-xs font-mono px-3 py-1 rounded-full">
          {items.length} items
        </span>
      </div>

      {/* grid */}
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map(item => (
            <button
              key={item.name}
              onClick={() => onSelect(item)}
              className="group text-left focus:outline-none"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#18140f] mb-4 relative rounded-xl border border-[#c4a15a]/10 group-hover:border-[#c4a15a]/40 transition-colors duration-300 shadow-lg">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <div className="bg-[#c4a15a] text-[#0b0a08] rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    <ShoppingBag size={13} />
                    View Details
                  </div>
                </div>
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={48} className="text-[#c4a15a]/20 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center px-1">
                <div>
                  <h4 className="text-sm font-bold font-display tracking-wider uppercase text-[#c4a15a] group-hover:text-[#d4b56a] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#7f6738] uppercase tracking-widest mt-0.5">{item.category}</p>
                </div>
                <span className="font-mono text-xs font-bold bg-[#c4a15a]/10 text-[#c4a15a] px-3 py-1 rounded-full group-hover:bg-[#c4a15a] group-hover:text-[#0b0a08] transition-colors duration-300">
                  {item.price}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Product Grid (section preview) ──────────────────────────────────────────
function ProductGrid({
  items,
  title,
  onSelect,
  onViewAll,
}: {
  items: Product[];
  title: string;
  onSelect: (p: Product) => void;
  onViewAll: () => void;
}) {
  const preview = items.slice(0, 3);

  return (
    <div className="mb-28">
      <div className="flex justify-between items-end mb-10 border-b border-[#c4a15a]/15 pb-4">
        <h3 className="text-2xl md:text-3xl font-display tracking-widest uppercase text-[#c4a15a]">
          {title}
        </h3>
        <button
          onClick={onViewAll}
          className="text-xs uppercase tracking-widest font-bold text-[#a88a4e] hover:text-[#c4a15a] flex items-center gap-2 transition-colors group"
        >
          View All
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {preview.map(item => (
          <button
            key={item.name}
            onClick={() => onSelect(item)}
            className="group text-left focus:outline-none cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#18140f] mb-5 relative rounded-xl border border-[#c4a15a]/10 group-hover:border-[#c4a15a]/30 transition-colors duration-300 shadow-md">
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <div className="bg-[#c4a15a] text-[#0b0a08] rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                  <ShoppingBag size={13} />
                  View Details
                </div>
              </div>
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={48} className="text-[#c4a15a]/20 group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center px-1">
              <div>
                <h4 className="text-base font-bold font-display tracking-wider uppercase text-[#c4a15a] group-hover:text-[#d4b56a] transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-[#7f6738] uppercase tracking-widest mt-0.5">
                  {item.category}
                </p>
              </div>
              <span className="font-mono text-sm font-bold bg-[#c4a15a]/10 text-[#c4a15a] px-3 py-1 rounded-full group-hover:bg-[#c4a15a] group-hover:text-[#0b0a08] transition-colors duration-300">
                {item.price}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* subtle "view all" CTA below the grid */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={onViewAll}
          className="border border-[#c4a15a]/25 text-[#c4a15a] text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-[#c4a15a]/10 hover:border-[#c4a15a]/50 transition-all group flex items-center gap-3"
        >
          See all {items.length} {title.toLowerCase()} products
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Products() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [viewAllSection, setViewAllSection] = useState<{ title: string; items: Product[] } | null>(null);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('*').order('sort_order').then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  const groomingProducts = products.filter(p => !['Apparel', 'Accessories', 'Tools', 'Bundle'].includes(p.category || ''));
  const dryGoods = products.filter(p => ['Apparel', 'Accessories', 'Tools', 'Bundle'].includes(p.category || ''));

  const openDetail = (p: Product) => setSelected(p);
  const closeDetail = () => setSelected(null);

  const openViewAll = (title: string, items: Product[]) => setViewAllSection({ title, items });
  const closeViewAll = () => setViewAllSection(null);

  // When a product is opened from the ViewAll overlay, keep overlay open below
  const handleSelectFromOverlay = (p: Product) => setSelected(p);

  return (
    <div className="w-full min-h-screen bg-[#0b0a08] relative">
      <div className="px-6 md:px-12 py-20 md:py-28 max-w-[1600px] mx-auto">

        {/* Page header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] mb-5 font-bold flex items-center gap-4 text-[#c4a15a]/60">
            <span className="w-8 h-[1px] block bg-[#c4a15a]/30" />
            Provisions
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-none uppercase tracking-tight text-[#c4a15a] font-display mb-8">
            Apothecary
          </h1>
          <p className="max-w-2xl text-[#a88a4e] font-light leading-relaxed text-base">
            Curated grooming essentials and dry goods. Crafted with the same uncompromising standards as
            our barbershop services. Tap any product to explore details and pricing.
          </p>
        </div>

        {/* Category divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-[#c4a15a]/30 via-[#c4a15a]/10 to-transparent mb-20" />

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader size="large" />
          </div>
        ) : (
          <>
            <ProductGrid
              items={groomingProducts}
              title="Grooming"
              onSelect={openDetail}
              onViewAll={() => openViewAll('Grooming', groomingProducts)}
            />
            <ProductGrid
              items={dryGoods}
              title="Dry Goods"
              onSelect={openDetail}
              onViewAll={() => openViewAll('Dry Goods', dryGoods)}
            />
          </>
        )}
      </div>

      {/* View All full-screen overlay */}
      {viewAllSection && (
        <ViewAllOverlay
          title={viewAllSection.title}
          items={viewAllSection.items}
          onClose={closeViewAll}
          onSelect={handleSelectFromOverlay}
        />
      )}

      {/* Product detail modal */}
      {selected && <ProductModal product={selected} onClose={closeDetail} />}
    </div>
  );
}
