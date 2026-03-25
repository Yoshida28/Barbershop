import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type {
  Service, Product, RateCardItem, Location,
  GalleryItem, MediaItem, FranchiseInfo, ContactSubmission,
} from '../../lib/supabase';
import {
  LogOut, Scissors, ShoppingBag, List, MapPin, Image, Film,
  Globe, MessageSquare, LayoutDashboard, Plus, Pencil, Trash2,
  ChevronDown, ChevronUp, Eye, EyeOff, Upload, X as XIcon, Loader2, Paperclip,
} from 'lucide-react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const btn = (variant: 'primary' | 'ghost' | 'danger' = 'primary', extra = '') =>
  `inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold rounded transition-colors ${extra} ${
    variant === 'primary' ? 'bg-[#c4a15a] text-black hover:bg-[#d4b56a]' :
    variant === 'danger'  ? 'bg-red-800/30 text-red-400 hover:bg-red-700/40 border border-red-700/30' :
    'bg-white/5 text-[#a88a4e] hover:bg-white/10 border border-white/10'
  }`;

const Input = ({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{label}{required && ' *'}</label>
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      required={required}
      className="bg-[#1a160f] border border-white/10 rounded px-3 py-2 text-sm text-[#c4a15a] focus:outline-none focus:border-[#c4a15a]/40 placeholder:text-white/20 transition-colors"
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{label}</label>
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
      className="bg-[#1a160f] border border-white/10 rounded px-3 py-2 text-sm text-[#c4a15a] focus:outline-none focus:border-[#c4a15a]/40 placeholder:text-white/20 transition-colors resize-none"
    />
  </div>
);

const Select = ({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{label}</label>
    <select
      value={value} onChange={(e) => onChange(e.target.value)}
      className="bg-[#1a160f] border border-white/10 rounded px-3 py-2 text-sm text-[#c4a15a] focus:outline-none focus:border-[#c4a15a]/40 transition-colors appearance-none"
    >
      <option value="">— Select —</option>
      {options.map((o) => <option key={o} value={o} className="bg-[#0b0a08]">{o}</option>)}
    </select>
  </div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#13110d] border border-white/8 rounded-sm p-6 ${className}`}>{children}</div>
);

// ─── Image Upload ─────────────────────────────────────────────────────────────

const BUCKET = 'images';

function ImageUpload({
  label,
  value,
  onChange,
  folder = 'general',
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const ext = file.name.split('.').pop();
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    // Extract path after /object/public/images/
    try {
      const url = new URL(value);
      const parts = url.pathname.split(`/object/public/${BUCKET}/`);
      if (parts[1]) {
        await supabase.storage.from(BUCKET).remove([decodeURIComponent(parts[1])]);
      }
    } catch (_) { /* ignore */ }
    onChange('');
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{label}</label>
      {value ? (
        <div className="relative w-full h-32 rounded overflow-hidden border border-white/10 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-[#c4a15a] text-black text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded flex items-center gap-1"
            >
              <Upload size={10} /> Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-800/80 text-red-300 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded flex items-center gap-1"
            >
              <XIcon size={10} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-24 border border-dashed border-white/20 rounded flex flex-col items-center justify-center gap-2 text-[#7f6738] hover:border-[#c4a15a]/40 hover:text-[#c4a15a] transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <span className="text-[10px] uppercase tracking-widest">Uploading…</span>
          ) : (
            <>
              <Upload size={18} />
              <span className="text-[10px] uppercase tracking-widest">Click to upload image</span>
            </>
          )}
        </button>
      )}
      {error && <p className="text-red-400 text-[10px]">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

const Badge = ({ text, color = 'gold' }: { text: string; color?: 'gold' | 'green' | 'blue' }) => {
  const cls = color === 'green' ? 'bg-green-900/30 text-green-400 border-green-800/30' :
              color === 'blue'  ? 'bg-blue-900/30 text-blue-400 border-blue-800/30' :
              'bg-[#c4a15a]/10 text-[#c4a15a] border-[#c4a15a]/20';
  return <span className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider font-bold ${cls}`}>{text}</span>;
};

function confirmDelete(name: string) {
  return window.confirm(`Delete "${name}"? This cannot be undone.`);
}

// ─── Login ────────────────────────────────────────────────────────────────────

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) setError(err.message);
  };

  return (
    <div className="min-h-screen bg-[#0b0a08] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-display tracking-[0.3em] text-[#c4a15a] mb-2">THEBARBERSHOP</h1>
          <p className="text-xs uppercase tracking-widest text-[#7f6738]">Admin Portal</p>
        </div>
        <Card>
          <form onSubmit={handleLogin} className="space-y-5">
            <Input label="Email" type="email" value={email} onChange={setEmail} required />
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1a160f] border border-white/10 rounded px-3 py-2 pr-10 text-sm text-[#c4a15a] focus:outline-none focus:border-[#c4a15a]/40 transition-colors"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7f6738] hover:text-[#c4a15a]">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className={`w-full py-3 ${btn('primary')}`}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="text-[10px] text-[#7f6738]/60 text-center mt-6">Create an admin account via Supabase Dashboard → Authentication → Users</p>
        </Card>
      </div>
    </div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

const EMPTY_SERVICE = { title: '', price: '', description: '', category: '', image_url: '', duration: '', sort_order: 0 };

function ServicesSection() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_SERVICE);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('services').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const f = (k: keyof typeof EMPTY_SERVICE) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      await supabase.from('services').update(payload).eq('id', editing);
    } else {
      await supabase.from('services').insert(payload);
    }
    setEditing(null); setForm(EMPTY_SERVICE); setShowForm(false); load();
  };

  const handleEdit = (item: Service) => {
    setEditing(item.id);
    setForm({ title: item.title, price: item.price, description: item.description || '', category: item.category || '', image_url: item.image_url || '', duration: item.duration || '', sort_order: item.sort_order });
    setShowForm(true);
  };

  const handleDelete = async (item: Service) => {
    if (!confirmDelete(item.title)) return;
    await supabase.from('services').delete().eq('id', item.id);
    load();
  };

  const categories = ['Hair', 'Beard', 'Grooming', 'Premium', 'Skin', 'Nail'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Services</h2>
        <button className={btn('primary')} onClick={() => { setEditing(null); setForm(EMPTY_SERVICE); setShowForm((v) => !v); }}>
          <Plus size={14} /> Add Service
        </button>
      </div>

      {showForm && (
        <Card className="border-[#c4a15a]/20">
          <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-4">{editing ? 'Edit Service' : 'New Service'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={f('title')} required />
            <Input label="Price" value={form.price} onChange={f('price')} required />
            <Select label="Category" value={form.category} onChange={f('category')} options={categories} />
            <Input label="Duration" value={form.duration} onChange={f('duration')} />
            <div className="md:col-span-2"><ImageUpload label="Image" value={form.image_url} onChange={f('image_url')} folder="services" /></div>
            <div className="md:col-span-2"><Textarea label="Description" value={form.description} onChange={f('description')} /></div>
            <Input label="Sort Order" type="number" value={String(form.sort_order)} onChange={f('sort_order')} />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className={btn('ghost')} onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY_SERVICE); }}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No services yet. Run the seed SQL or add one above.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-white/8">
          <table className="w-full text-sm">
            <thead className="bg-[#1a160f]">
              <tr>
                {['Title', 'Price', 'Category', 'Duration', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-[#13110d]' : 'bg-[#111009]'}>
                  <td className="px-4 py-3 text-[#c4a15a] font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-[#a88a4e]">{item.price}</td>
                  <td className="px-4 py-3"><Badge text={item.category || '—'} /></td>
                  <td className="px-4 py-3 text-[#7f6738]">{item.duration || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button className={btn('ghost', 'px-2 py-1')} onClick={() => handleEdit(item)}><Pencil size={12} /></button>
                      <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Shop Section ─────────────────────────────────────────────────────────────

const EMPTY_PRODUCT = { name: '', price: '', description: '', category: '', image_url: '', rating: '0', reviews: '0', sort_order: '0' };

function ShopSection() {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('products').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const f = (k: keyof typeof EMPTY_PRODUCT) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: form.name, price: form.price, description: form.description, category: form.category, image_url: form.image_url, rating: Number(form.rating), reviews: Number(form.reviews), sort_order: Number(form.sort_order) };
    if (editing) {
      await supabase.from('products').update(payload).eq('id', editing);
    } else {
      await supabase.from('products').insert(payload);
    }
    setEditing(null); setForm(EMPTY_PRODUCT); setShowForm(false); load();
  };

  const handleEdit = (item: Product) => {
    setEditing(item.id);
    setForm({ name: item.name, price: item.price, description: item.description || '', category: item.category || '', image_url: item.image_url || '', rating: String(item.rating || 0), reviews: String(item.reviews || 0), sort_order: String(item.sort_order) });
    setShowForm(true);
  };

  const handleDelete = async (item: Product) => {
    if (!confirmDelete(item.name)) return;
    await supabase.from('products').delete().eq('id', item.id);
    load();
  };

  const categories = ['Hair Styling', 'Beard Care', 'Scalp Care', 'Skin Care', 'Merchandise'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Shop / Products</h2>
        <button className={btn('primary')} onClick={() => { setEditing(null); setForm(EMPTY_PRODUCT); setShowForm((v) => !v); }}>
          <Plus size={14} /> Add Product
        </button>
      </div>

      {showForm && (
        <Card className="border-[#c4a15a]/20">
          <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-4">{editing ? 'Edit Product' : 'New Product'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={f('name')} required />
            <Input label="Price" value={form.price} onChange={f('price')} required />
            <Select label="Category" value={form.category} onChange={f('category')} options={categories} />
            <ImageUpload label="Image" value={form.image_url} onChange={f('image_url')} folder="products" />
            <Input label="Rating (0-5)" type="number" value={form.rating} onChange={f('rating')} />
            <Input label="Reviews Count" type="number" value={form.reviews} onChange={f('reviews')} />
            <div className="md:col-span-2"><Textarea label="Description" value={form.description} onChange={f('description')} /></div>
            <Input label="Sort Order" type="number" value={form.sort_order} onChange={f('sort_order')} />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className={btn('ghost')} onClick={() => { setShowForm(false); setEditing(null); }}> Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No products yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-white/8">
          <table className="w-full text-sm">
            <thead className="bg-[#1a160f]">
              <tr>
                {['Name', 'Price', 'Category', 'Rating', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-[#13110d]' : 'bg-[#111009]'}>
                  <td className="px-4 py-3 text-[#c4a15a] font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-[#a88a4e]">{item.price}</td>
                  <td className="px-4 py-3"><Badge text={item.category || '—'} /></td>
                  <td className="px-4 py-3 text-[#7f6738]">{item.rating || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button className={btn('ghost', 'px-2 py-1')} onClick={() => handleEdit(item)}><Pencil size={12} /></button>
                      <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Rate Card Section ────────────────────────────────────────────────────────

const EMPTY_RATE = { service_name: '', price: '', duration: '', category: '', sort_order: '0' };

function RateCardSection() {
  const [items, setItems] = useState<RateCardItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_RATE);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('rate_card').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const f = (k: keyof typeof EMPTY_RATE) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      await supabase.from('rate_card').update(payload).eq('id', editing);
    } else {
      await supabase.from('rate_card').insert(payload);
    }
    setEditing(null); setForm(EMPTY_RATE); setShowForm(false); load();
  };

  const handleEdit = (item: RateCardItem) => {
    setEditing(item.id);
    setForm({ service_name: item.service_name, price: item.price, duration: item.duration || '', category: item.category || '', sort_order: String(item.sort_order) });
    setShowForm(true);
  };

  const handleDelete = async (item: RateCardItem) => {
    if (!confirmDelete(item.service_name)) return;
    await supabase.from('rate_card').delete().eq('id', item.id);
    load();
  };

  const tiers = ['Senior Barber', 'Master Barber', 'Junior Barber', 'Specialist'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Rate Card</h2>
        <button className={btn('primary')} onClick={() => { setEditing(null); setForm(EMPTY_RATE); setShowForm((v) => !v); }}>
          <Plus size={14} /> Add Item
        </button>
      </div>

      {showForm && (
        <Card className="border-[#c4a15a]/20">
          <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-4">{editing ? 'Edit Item' : 'New Rate Card Item'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Service Name" value={form.service_name} onChange={f('service_name')} required />
            <Input label="Price" value={form.price} onChange={f('price')} required />
            <Input label="Duration" value={form.duration} onChange={f('duration')} />
            <Select label="Tier / Category" value={form.category} onChange={f('category')} options={tiers} />
            <Input label="Sort Order" type="number" value={form.sort_order} onChange={f('sort_order')} />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className={btn('ghost')} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No rate card items yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-white/8">
          <table className="w-full text-sm">
            <thead className="bg-[#1a160f]">
              <tr>
                {['Service', 'Price', 'Duration', 'Tier', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-[#13110d]' : 'bg-[#111009]'}>
                  <td className="px-4 py-3 text-[#c4a15a] font-medium">{item.service_name}</td>
                  <td className="px-4 py-3 text-[#a88a4e]">{item.price}</td>
                  <td className="px-4 py-3 text-[#7f6738]">{item.duration || '—'}</td>
                  <td className="px-4 py-3"><Badge text={item.category || '—'} color="blue" /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button className={btn('ghost', 'px-2 py-1')} onClick={() => handleEdit(item)}><Pencil size={12} /></button>
                      <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Locations Section ────────────────────────────────────────────────────────

const EMPTY_LOCATION = { name: '', address: '', phone: '', hours: '', country: '', state: '', city: '', lat: '', lng: '', image_url: '', sort_order: '0' };

async function geocodeLocation(country: string, state: string, city: string): Promise<{ lat: number; lng: number } | null> {
  const q = [city, state, country].filter(Boolean).join(', ');
  if (!q) return null;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`, {
      headers: { 'Accept-Language': 'en', 'User-Agent': 'TheBarberShopCMS/1.0' },
    });
    const data = await res.json();
    if (data && data[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (_) { /* ignore */ }
  return null;
}

function LocationsSection() {
  const [items, setItems] = useState<Location[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_LOCATION);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('locations').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const f = (k: keyof typeof EMPTY_LOCATION) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleGeocode = async () => {
    setGeocoding(true);
    const coords = await geocodeLocation(form.country, form.state, form.city);
    if (coords) {
      setForm((p) => ({ ...p, lat: String(coords.lat), lng: String(coords.lng) }));
    } else {
      alert('Could not find coordinates. Try a more specific location or enter manually.');
    }
    setGeocoding(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name, address: form.address, phone: form.phone, hours: form.hours,
      country: form.country || null, state: form.state || null, city: form.city || null,
      lat: form.lat ? Number(form.lat) : null, lng: form.lng ? Number(form.lng) : null,
      image_url: form.image_url, sort_order: Number(form.sort_order),
    };
    if (editing) {
      await supabase.from('locations').update(payload).eq('id', editing);
    } else {
      await supabase.from('locations').insert(payload);
    }
    setEditing(null); setForm(EMPTY_LOCATION); setShowForm(false); load();
  };

  const handleEdit = (item: Location) => {
    setEditing(item.id);
    setForm({
      name: item.name, address: item.address || '', phone: item.phone || '', hours: item.hours || '',
      country: item.country || '', state: item.state || '', city: item.city || '',
      lat: String(item.lat || ''), lng: String(item.lng || ''), image_url: item.image_url || '', sort_order: String(item.sort_order),
    });
    setShowForm(true);
  };

  const handleDelete = async (item: Location) => {
    if (!confirmDelete(item.name)) return;
    await supabase.from('locations').delete().eq('id', item.id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Locations</h2>
        <button className={btn('primary')} onClick={() => { setEditing(null); setForm(EMPTY_LOCATION); setShowForm((v) => !v); }}>
          <Plus size={14} /> Add Location
        </button>
      </div>

      {showForm && (
        <Card className="border-[#c4a15a]/20">
          <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-4">{editing ? 'Edit Location' : 'New Location'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={f('name')} required />
            <Input label="Phone" value={form.phone} onChange={f('phone')} />
            <div className="md:col-span-2"><Input label="Address (Street)" value={form.address} onChange={f('address')} /></div>
            <Input label="Country" value={form.country} onChange={f('country')} />
            <Input label="State / Region" value={form.state} onChange={f('state')} />
            <Input label="City" value={form.city} onChange={f('city')} />
            <Input label="Hours" value={form.hours} onChange={f('hours')} />
            {/* Geocode row */}
            <div className="md:col-span-2 flex items-end gap-3">
              <div className="flex-1"><Input label="Latitude (auto-filled)" value={form.lat} onChange={f('lat')} /></div>
              <div className="flex-1"><Input label="Longitude (auto-filled)" value={form.lng} onChange={f('lng')} /></div>
              <button type="button" onClick={handleGeocode} disabled={geocoding || (!form.country && !form.city)}
                className={`${btn('ghost')} mb-0.5 shrink-0`}>
                {geocoding ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                {geocoding ? 'Finding…' : 'Geocode'}
              </button>
            </div>
            <p className="md:col-span-2 text-[10px] text-[#7f6738]">Enter Country + City then click Geocode to auto-fill coordinates, or enter manually.</p>
            <div className="md:col-span-2"><ImageUpload label="Image" value={form.image_url} onChange={f('image_url')} folder="locations" /></div>
            <Input label="Sort Order" type="number" value={form.sort_order} onChange={f('sort_order')} />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className={btn('ghost')} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No locations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-white/8">
          <table className="w-full text-sm">
            <thead className="bg-[#1a160f]">
              <tr>
                {['Name', 'City / Country', 'Phone', 'Hours', 'Coords', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-[#13110d]' : 'bg-[#111009]'}>
                  <td className="px-4 py-3 text-[#c4a15a] font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-[#a88a4e] text-xs">{[item.city, item.country].filter(Boolean).join(', ') || item.address || '—'}</td>
                  <td className="px-4 py-3 text-[#7f6738]">{item.phone || '—'}</td>
                  <td className="px-4 py-3 text-[#7f6738] text-xs">{item.hours || '—'}</td>
                  <td className="px-4 py-3 text-[#7f6738] text-xs">{item.lat ? `${Number(item.lat).toFixed(2)}, ${Number(item.lng).toFixed(2)}` : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button className={btn('ghost', 'px-2 py-1')} onClick={() => handleEdit(item)}><Pencil size={12} /></button>
                      <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

const EMPTY_GALLERY = { title: '', image_url: '', category: '', sort_order: '0' };

function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_GALLERY);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('gallery_items').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const f = (k: keyof typeof EMPTY_GALLERY) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      await supabase.from('gallery_items').update(payload).eq('id', editing);
    } else {
      await supabase.from('gallery_items').insert(payload);
    }
    setEditing(null); setForm(EMPTY_GALLERY); setShowForm(false); load();
  };

  const handleEdit = (item: GalleryItem) => {
    setEditing(item.id);
    setForm({ title: item.title || '', image_url: item.image_url, category: item.category || '', sort_order: String(item.sort_order) });
    setShowForm(true);
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirmDelete(item.title || item.image_url)) return;
    await supabase.from('gallery_items').delete().eq('id', item.id);
    load();
  };

  const categories = ['Haircuts', 'Beard', 'Shave', 'Interior', 'Events', 'Products'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Gallery</h2>
        <button className={btn('primary')} onClick={() => { setEditing(null); setForm(EMPTY_GALLERY); setShowForm((v) => !v); }}>
          <Plus size={14} /> Add Image
        </button>
      </div>

      {showForm && (
        <Card className="border-[#c4a15a]/20">
          <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-4">{editing ? 'Edit Image' : 'New Gallery Image'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={f('title')} />
            <Select label="Category" value={form.category} onChange={f('category')} options={categories} />
            <div className="md:col-span-2"><ImageUpload label="Image *" value={form.image_url} onChange={f('image_url')} folder="gallery" /></div>
            <Input label="Sort Order" type="number" value={form.sort_order} onChange={f('sort_order')} />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className={btn('ghost')} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No gallery images yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group rounded-sm overflow-hidden border border-white/8">
              <img src={item.image_url} alt={item.title || ''} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className={btn('ghost', 'px-2 py-1')} onClick={() => handleEdit(item)}><Pencil size={12} /></button>
                <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
              </div>
              {item.title && <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-[10px] text-[#c4a15a] truncate">{item.title}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Media Center Section ─────────────────────────────────────────────────────

const EMPTY_MEDIA = { title: '', description: '', media_url: '', media_type: 'image' };

function MediaCenterSection() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_MEDIA);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('media_items').select('*').order('published_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const f = (k: keyof typeof EMPTY_MEDIA) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('media_items').update(form).eq('id', editing);
    } else {
      await supabase.from('media_items').insert({ ...form, published_at: new Date().toISOString() });
    }
    setEditing(null); setForm(EMPTY_MEDIA); setShowForm(false); load();
  };

  const handleEdit = (item: MediaItem) => {
    setEditing(item.id);
    setForm({ title: item.title, description: item.description || '', media_url: item.media_url || '', media_type: item.media_type });
    setShowForm(true);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirmDelete(item.title)) return;
    await supabase.from('media_items').delete().eq('id', item.id);
    load();
  };

  const mediaTypes = ['image', 'video', 'article', 'press'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Media Center</h2>
        <button className={btn('primary')} onClick={() => { setEditing(null); setForm(EMPTY_MEDIA); setShowForm((v) => !v); }}>
          <Plus size={14} /> Add Media
        </button>
      </div>

      {showForm && (
        <Card className="border-[#c4a15a]/20">
          <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-4">{editing ? 'Edit Media' : 'New Media Item'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={f('title')} required />
            <Select label="Type" value={form.media_type} onChange={f('media_type')} options={mediaTypes} />
            <div className="md:col-span-2">
              {form.media_type === 'image' ? (
                <ImageUpload label="Image" value={form.media_url} onChange={f('media_url')} folder="media" />
              ) : (
                <Input label="Media URL (video/article/press link)" value={form.media_url} onChange={f('media_url')} />
              )}
            </div>
            <div className="md:col-span-2"><Textarea label="Description" value={form.description} onChange={f('description')} rows={3} /></div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className={btn('ghost')} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No media items yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-white/8">
          <table className="w-full text-sm">
            <thead className="bg-[#1a160f]">
              <tr>
                {['Title', 'Type', 'Published', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#7f6738] font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-[#13110d]' : 'bg-[#111009]'}>
                  <td className="px-4 py-3 text-[#c4a15a] font-medium">{item.title}</td>
                  <td className="px-4 py-3"><Badge text={item.media_type} color="green" /></td>
                  <td className="px-4 py-3 text-[#7f6738] text-xs">{new Date(item.published_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button className={btn('ghost', 'px-2 py-1')} onClick={() => handleEdit(item)}><Pencil size={12} /></button>
                      <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Franchise Section ────────────────────────────────────────────────────────

function FranchiseSection() {
  const [items, setItems] = useState<FranchiseInfo[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ label: '', value: '' });
  const [loading, setLoading] = useState(true);
  const [newForm, setNewForm] = useState({ key: '', label: '', value: '', sort_order: '0' });
  const [showNew, setShowNew] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('franchise_info').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpdate = async (id: string) => {
    await supabase.from('franchise_info').update({ label: editForm.label, value: editForm.value }).eq('id', id);
    setEditing(null);
    load();
  };

  const handleAddNew = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('franchise_info').insert({ key: newForm.key, label: newForm.label, value: newForm.value, sort_order: Number(newForm.sort_order) });
    setNewForm({ key: '', label: '', value: '', sort_order: '0' });
    setShowNew(false);
    load();
  };

  const handleDelete = async (item: FranchiseInfo) => {
    if (!confirmDelete(item.label)) return;
    await supabase.from('franchise_info').delete().eq('id', item.id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Franchise Info</h2>
        <button className={btn('primary')} onClick={() => setShowNew((v) => !v)}>
          <Plus size={14} /> Add Stat
        </button>
      </div>
      <p className="text-xs text-[#7f6738]">These stats appear on the public /franchise page. Edit values to update them instantly.</p>

      {showNew && (
        <Card className="border-[#c4a15a]/20">
          <form onSubmit={handleAddNew} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Key (unique, no spaces)" value={newForm.key} onChange={(v) => setNewForm((p) => ({ ...p, key: v }))} required />
            <Input label="Label" value={newForm.label} onChange={(v) => setNewForm((p) => ({ ...p, label: v }))} required />
            <Input label="Value" value={newForm.value} onChange={(v) => setNewForm((p) => ({ ...p, value: v }))} required />
            <Input label="Sort Order" type="number" value={newForm.sort_order} onChange={(v) => setNewForm((p) => ({ ...p, sort_order: v }))} />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className={btn('primary')}>Add</button>
              <button type="button" className={btn('ghost')} onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[#7f6738] w-28 shrink-0">{item.key}</span>
                {editing === item.id ? (
                  <div className="flex gap-3 flex-1 items-center">
                    <input value={editForm.label} onChange={(e) => setEditForm((p) => ({ ...p, label: e.target.value }))} placeholder="Label" className="bg-[#1a160f] border border-[#c4a15a]/30 rounded px-2 py-1 text-sm text-[#c4a15a] w-40 focus:outline-none" />
                    <input value={editForm.value} onChange={(e) => setEditForm((p) => ({ ...p, value: e.target.value }))} placeholder="Value" className="bg-[#1a160f] border border-[#c4a15a]/30 rounded px-2 py-1 text-sm text-[#c4a15a] w-48 focus:outline-none" />
                  </div>
                ) : (
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-[#a88a4e]">{item.label}</span>
                    <span className="text-base font-display text-[#c4a15a]">{item.value}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {editing === item.id ? (
                  <>
                    <button className={btn('primary', 'px-3 py-1')} onClick={() => handleUpdate(item.id)}>Save</button>
                    <button className={btn('ghost', 'px-3 py-1')} onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className={btn('ghost', 'px-2 py-1')} onClick={() => { setEditing(item.id); setEditForm({ label: item.label, value: item.value }); }}><Pencil size={12} /></button>
                    <button className={btn('danger', 'px-2 py-1')} onClick={() => handleDelete(item)}><Trash2 size={12} /></button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Submissions Section ──────────────────────────────────────────────────────

function SubmissionsSection() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'general' | 'franchise' | 'career'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (item: ContactSubmission) => {
    if (!confirmDelete(`submission from ${item.name}`)) return;
    await supabase.from('contact_submissions').delete().eq('id', item.id);
    setSelected((prev) => { const n = new Set(prev); n.delete(item.id); return n; });
    load();
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} submission(s)? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from('contact_submissions').delete().in('id', Array.from(selected));
    setSelected(new Set());
    setDeleting(false);
    load();
  };

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);
  const typeColor = (type: string) => type === 'general' ? 'gold' : type === 'franchise' ? 'green' : 'blue';

  const toggleSelect = (id: string) => setSelected((prev) => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const allFilteredSelected = filtered.length > 0 && filtered.every((i) => selected.has(i.id));
  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelected((prev) => { const n = new Set(prev); filtered.forEach(i => n.delete(i.id)); return n; });
    } else {
      setSelected((prev) => { const n = new Set(prev); filtered.forEach(i => n.add(i.id)); return n; });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a]">Form Submissions</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {selected.size > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={deleting}
              className={btn('danger')}
            >
              <Trash2 size={12} /> Delete {selected.size} Selected
            </button>
          )}
          <div className="flex gap-2">
            {(['all', 'general', 'franchise', 'career'] as const).map((t) => (
              <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded transition-colors ${filter === t ? 'bg-[#c4a15a] text-black' : 'bg-white/5 text-[#7f6738] hover:bg-white/10'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-[#7f6738] text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#7f6738] text-sm">No submissions yet.</p>
      ) : (
        <>
          {/* Select-all bar */}
          <div className="flex items-center gap-3 px-4 py-2 bg-[#1a160f] rounded-sm border border-white/8 text-xs text-[#7f6738]">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={toggleSelectAll}
              className="accent-[#c4a15a] w-3.5 h-3.5"
            />
            <span>{allFilteredSelected ? 'Deselect all' : 'Select all'} ({filtered.length})</span>
            {selected.size > 0 && <span className="text-[#c4a15a] ml-2">{selected.size} selected</span>}
          </div>

          <div className="space-y-2">
            {filtered.map((item) => (
              <Card key={item.id} className={selected.has(item.id) ? 'border-[#c4a15a]/30' : ''}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="accent-[#c4a15a] w-3.5 h-3.5 shrink-0"
                    />
                    <div
                      className="flex items-center gap-4 min-w-0 cursor-pointer flex-1"
                      onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    >
                      <Badge text={item.type} color={typeColor(item.type) as 'gold' | 'green' | 'blue'} />
                      <span className="text-sm text-[#c4a15a] font-medium truncate">{item.name}</span>
                      <span className="text-xs text-[#7f6738] hidden md:block truncate">{item.email}</span>
                      {item.attachments && item.attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-[#7f6738]">
                          <Paperclip size={10} />{item.attachments.length}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-3 shrink-0 cursor-pointer"
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  >
                    <span className="text-[10px] text-[#7f6738]">{new Date(item.created_at).toLocaleDateString()}</span>
                    <button className={btn('danger', 'px-2 py-1')} onClick={(e) => { e.stopPropagation(); handleDelete(item); }}><Trash2 size={12} /></button>
                    {expanded === item.id ? <ChevronUp size={14} className="text-[#7f6738]" /> : <ChevronDown size={14} className="text-[#7f6738]" />}
                  </div>
                </div>
                {expanded === item.id && (
                  <div className="mt-4 pt-4 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    {[
                      ['Email', item.email],
                      ['Phone', item.phone],
                      ['Location', [item.city, item.state, item.country].filter(Boolean).join(', ')],
                      ['Date', new Date(item.created_at).toLocaleString()],
                    ].map(([k, v]) => (
                      <div key={k as string}>
                        <p className="text-[#7f6738] uppercase tracking-widest mb-1">{k}</p>
                        <p className="text-[#a88a4e]">{v || '—'}</p>
                      </div>
                    ))}
                    {item.message && (
                      <div className="col-span-2 md:col-span-4">
                        <p className="text-[#7f6738] uppercase tracking-widest mb-1">Message</p>
                        <p className="text-[#a88a4e] whitespace-pre-wrap">{item.message}</p>
                      </div>
                    )}
                    {item.attachments && item.attachments.length > 0 && (
                      <div className="col-span-2 md:col-span-4">
                        <p className="text-[#7f6738] uppercase tracking-widest mb-2 flex items-center gap-1"><Paperclip size={10} /> Attachments</p>
                        <div className="flex flex-wrap gap-2">
                          {item.attachments.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#c4a15a] border border-[#c4a15a]/20 px-2 py-1 rounded hover:bg-[#c4a15a]/10 transition-colors"
                            >
                              File {idx + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────

function DashboardSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const tables = ['services', 'products', 'rate_card', 'locations', 'gallery_items', 'media_items', 'contact_submissions'];
    Promise.all(
      tables.map((t) =>
        supabase.from(t).select('*', { count: 'exact', head: true }).then(({ count }) => [t, count ?? 0] as const)
      )
    ).then((results) => setCounts(Object.fromEntries(results)));
  }, []);

  const stats = [
    { label: 'Services', key: 'services', icon: <Scissors size={20} /> },
    { label: 'Products', key: 'products', icon: <ShoppingBag size={20} /> },
    { label: 'Rate Card', key: 'rate_card', icon: <List size={20} /> },
    { label: 'Locations', key: 'locations', icon: <MapPin size={20} /> },
    { label: 'Gallery', key: 'gallery_items', icon: <Image size={20} /> },
    { label: 'Media', key: 'media_items', icon: <Film size={20} /> },
    { label: 'Submissions', key: 'contact_submissions', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-display tracking-widest uppercase text-[#c4a15a] mb-1">Dashboard</h2>
        <p className="text-xs text-[#7f6738]">Overview of all content managed via Supabase.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.key}>
            <div className="flex items-center gap-3 mb-3 text-[#7f6738]">{s.icon}</div>
            <div className="text-3xl font-display text-[#c4a15a]">{counts[s.key] ?? '—'}</div>
            <div className="text-[10px] uppercase tracking-widest text-[#7f6738] mt-1">{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="text-xs uppercase tracking-widest text-[#c4a15a] mb-3">Quick Setup</h3>
        <ol className="space-y-2 text-sm text-[#a88a4e] list-decimal list-inside">
          <li>Run <code className="text-[#c4a15a] text-xs">supabase-schema.sql</code> in your Supabase SQL Editor to create tables and seed data.</li>
          <li>Go to Supabase Dashboard → Authentication → Users → Invite user to create your admin account.</li>
          <li>Use each section in this sidebar to manage content.</li>
          <li>Content changes appear immediately on the public site.</li>
        </ol>
      </Card>
    </div>
  );
}

// ─── Admin Layout ─────────────────────────────────────────────────────────────

type Section = 'dashboard' | 'services' | 'shop' | 'rate-card' | 'locations' | 'gallery' | 'media' | 'franchise' | 'submissions';

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard',   label: 'Dashboard',    icon: <LayoutDashboard size={16} /> },
  { id: 'services',    label: 'Services',     icon: <Scissors size={16} /> },
  { id: 'shop',        label: 'Shop',         icon: <ShoppingBag size={16} /> },
  { id: 'rate-card',   label: 'Rate Card',    icon: <List size={16} /> },
  { id: 'locations',   label: 'Locations',    icon: <MapPin size={16} /> },
  { id: 'gallery',     label: 'Gallery',      icon: <Image size={16} /> },
  { id: 'media',       label: 'Media Center', icon: <Film size={16} /> },
  { id: 'franchise',   label: 'Franchise',    icon: <Globe size={16} /> },
  { id: 'submissions', label: 'Submissions',  icon: <MessageSquare size={16} /> },
];

function AdminLayout({ session }: { session: Session }) {
  const [active, setActive] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => supabase.auth.signOut();

  const renderSection = () => {
    switch (active) {
      case 'dashboard':   return <DashboardSection />;
      case 'services':    return <ServicesSection />;
      case 'shop':        return <ShopSection />;
      case 'rate-card':   return <RateCardSection />;
      case 'locations':   return <LocationsSection />;
      case 'gallery':     return <GallerySection />;
      case 'media':       return <MediaCenterSection />;
      case 'franchise':   return <FranchiseSection />;
      case 'submissions': return <SubmissionsSection />;
    }
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside className={`${mobile ? 'w-full' : 'w-56 shrink-0'} bg-[#0d0b08] border-r border-white/8 flex flex-col`}>
      <div className="px-5 py-6 border-b border-white/8">
        <h1 className="text-sm font-display tracking-[0.3em] text-[#c4a15a]">THEBARBERSHOP</h1>
        <p className="text-[10px] text-[#7f6738] mt-0.5 uppercase tracking-widest">CMS Admin</p>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActive(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-5 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${active === item.id ? 'text-[#c4a15a] bg-[#c4a15a]/8 border-r-2 border-[#c4a15a]' : 'text-[#7f6738] hover:text-[#a88a4e] hover:bg-white/3'}`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-white/8">
        <p className="text-[10px] text-[#7f6738] truncate mb-3">{session.user.email}</p>
        <button onClick={handleLogout} className={`${btn('ghost')} w-full justify-center`}>
          <LogOut size={12} /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#0b0a08] flex font-sans">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0b08] border-b border-white/8 flex items-center justify-between px-4 py-3">
        <h1 className="text-sm font-display tracking-[0.3em] text-[#c4a15a]">CMS Admin</h1>
        <button onClick={() => setSidebarOpen((v) => !v)} className="text-[#c4a15a] p-1">
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 pt-16 md:pt-8 overflow-x-hidden max-w-full">
        {renderSection()}
      </main>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0a08] flex items-center justify-center">
        <span className="text-[#7f6738] text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  return session ? <AdminLayout session={session} /> : <AdminLogin />;
}
