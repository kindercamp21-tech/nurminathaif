'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/adminAuth';
import { getBlogs, BlogPost, defaultBlogs } from '@/data/blogs';

const emptyForm = {
  title: '', category: 'Panduan', author: 'Admin Nurmina',
  excerpt: '', content: '', readTime: '5 menit baca',
  image: 'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
};

const catColors: Record<string, { bg: string; color: string }> = {
  'Panduan':    { bg: '#eff6ff', color: '#1d4ed8' },
  'Tips & Trik': { bg: '#f0fdf4', color: '#15803d' },
  'Informasi':  { bg: '#fef3c7', color: '#b45309' },
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'preview'>('list');

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/admin'); return; }
    setBlogs(getBlogs());
  }, [router]);

  const saveAll = (updated: BlogPost[]) => {
    localStorage.setItem('nurmina_blogs', JSON.stringify(updated));
    setBlogs(updated);
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    setActiveTab('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (blog: BlogPost) => {
    setEditId(blog.id);
    setForm({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      excerpt: blog.excerpt,
      content: blog.content,
      readTime: blog.readTime,
      image: blog.image || emptyForm.image,
    });
    setShowForm(true);
    setActiveTab('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      alert('Judul, Ringkasan, dan Konten wajib diisi!');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (editId) {
        const updated = blogs.map(b => b.id === editId ? { ...b, ...form, slug } : b);
        saveAll(updated);
      } else {
        const newBlog: BlogPost = {
          id: 'b_' + Date.now(),
          slug,
          ...form,
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        };
        saveAll([newBlog, ...blogs]);
      }
      setSaving(false);
      setShowForm(false);
      setEditId(null);
      setForm({ ...emptyForm });
    }, 500);
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    saveAll(blogs.filter(b => b.id !== id));
  };

  const handleReset = () => {
    if (!confirm('Reset ke artikel default?')) return;
    localStorage.removeItem('nurmina_blogs');
    setBlogs(defaultBlogs);
  };

  const filtered = blogs.filter(b =>
    !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
            Blog & Artikel
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{blogs.length} artikel dipublikasikan</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleReset} style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Reset Default
          </button>
          <button onClick={openAdd} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Tulis Artikel
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {/* Form header with tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              {editId ? '✏️ Edit Artikel' : '✍️ Tulis Artikel Baru'}
            </h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {(['list', 'preview'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: activeTab === t ? '#0f172a' : '#f1f5f9', color: activeTab === t ? '#fff' : '#64748b', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {t === 'list' ? 'Editor' : 'Preview'}
                </button>
              ))}
              <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer', marginLeft: '8px' }}>✕</button>
            </div>
          </div>

          {activeTab === 'list' ? (
            <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
              {/* ── Image Section ── */}
              <div style={{ marginBottom: '1.5rem', background: '#f8fafc', borderRadius: '14px', border: '2px dashed #e2e8f0', padding: '1.25rem' }}>
                <label style={{ ...labelStyle, marginBottom: '10px', color: '#D4AF37' }}>🖼️ Gambar Artikel</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Preview */}
                  <div style={{ width: '160px', height: '100px', borderRadius: '10px', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0, border: '1px solid #e2e8f0' }}>
                    {form.image ? (
                      <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center', padding: '8px' }}>
                        Belum ada gambar
                      </div>
                    )}
                  </div>
                  {/* Input URL */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>Paste URL gambar dari internet (Unsplash, Google, dll)</label>
                    <input
                      style={{ ...inputStyle, border: '1.5px solid #D4AF37', background: '#fff' }}
                      placeholder="https://images.unsplash.com/..."
                      value={form.image}
                      onChange={e => setForm({ ...form, image: e.target.value })}
                    />
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
                      💡 Tip: Cari foto di <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={{ color: '#D4AF37' }}>Unsplash.com</a>, klik kanan gambar → Salin alamat gambar
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Judul Artikel *</label>
                  <input required style={inputStyle} placeholder="Judul yang menarik dan deskriptif..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>

                <div>
                  <label style={labelStyle}>Kategori</label>
                  <select style={{ ...inputStyle, appearance: 'auto' }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option>Panduan</option>
                    <option>Tips &amp; Trik</option>
                    <option>Informasi</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Penulis</label>
                  <input style={inputStyle} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                </div>

                <div>
                  <label style={labelStyle}>Estimasi Baca</label>
                  <input style={inputStyle} placeholder="5 menit baca" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Ringkasan / Excerpt *</label>
                  <input required style={inputStyle} placeholder="1-2 kalimat ringkasan yang muncul di daftar blog..." value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Konten Artikel (gunakan ## untuk judul subbab, - untuk list) *</label>
                  <textarea
                    required
                    rows={14}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7 }}
                    placeholder={`## Pendahuluan\nTuliskan paragraf pertama...\n\n## Poin Kedua\n- Item pertama\n- Item kedua`}
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                  />
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
                    Tip: # Judul Besar, ## Judul Subbab, - untuk bullet point
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Batal
                </button>
                <button type="button" onClick={() => setActiveTab('preview')} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Preview →
                </button>
                <button type="submit" disabled={saving} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Publikasikan'}
                </button>
              </div>
            </form>
          ) : (
            /* Preview tab */
            <div style={{ padding: '2rem' }}>
              {form.image && (
                <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '1.5rem', maxHeight: '300px' }}>
                  <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <span style={{ background: (catColors[form.category] || catColors.Informasi).bg, color: (catColors[form.category] || catColors.Informasi).color, padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                {form.category}
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '1rem 0 0.5rem', lineHeight: 1.3, fontFamily: 'var(--font-secondary, sans-serif)' }}>
                {form.title || 'Judul Artikel...'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Oleh {form.author} • {form.readTime}
              </p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                {renderPreview(form.content)}
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setActiveTab('list')} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Kembali ke Editor
                </button>
                <button onClick={handleSubmit as any} disabled={saving} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {editId ? 'Simpan Perubahan' : 'Publikasikan'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input
          style={{ ...inputStyle, maxWidth: '360px' }}
          placeholder="🔍  Cari judul atau penulis..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Blog Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', color: '#94a3b8' }}>
          Tidak ada artikel ditemukan
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(blog => {
            const cc = catColors[blog.category] || catColors.Informasi;
            return (
              <div key={blog.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                {/* Image */}
                <div style={{ height: '160px', background: '#f1f5f9', overflow: 'hidden' }}>
                  <img src={blog.image || emptyForm.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Content */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ background: cc.bg, color: cc.color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {blog.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{blog.date}</span>
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f8fafc' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>oleh {blog.author}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Link href={`/blog/${blog.slug}`} target="_blank" style={{ padding: '4px 10px', borderRadius: '7px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 500 }}>
                        Lihat
                      </Link>
                      <button onClick={() => openEdit(blog)} style={{ padding: '4px 10px', borderRadius: '7px', border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.08)', color: '#92711c', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(blog.id, blog.title)} style={{ padding: '4px 10px', borderRadius: '7px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', color: '#dc2626', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function renderPreview(content: string) {
  if (!content) return <span style={{ color: '#94a3b8' }}>Konten artikel akan muncul di sini...</span>;
  return content.split('\n').map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} style={{ height: '1rem' }} />;
    if (t.startsWith('# ')) return <h1 key={i} style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 0.5rem' }}>{t.slice(2)}</h1>;
    if (t.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '1.25rem 0 0.5rem' }}>{t.slice(3)}</h2>;
    if (t.startsWith('- ')) return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '4px', color: '#475569' }}>{t.slice(2)}</li>;
    return <p key={i} style={{ marginBottom: '0.75rem', color: '#475569', lineHeight: 1.8 }}>{t}</p>;
  });
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
