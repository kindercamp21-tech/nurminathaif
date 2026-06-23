'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    packageInterest: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.message) {
      alert('Mohon isi nama lengkap, nomor WhatsApp, dan pesan Anda.');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      // Save request to localStorage
      try {
        const storedRequests = localStorage.getItem('nurmina_requests') || '[]';
        const requests = JSON.parse(storedRequests);
        const newRequest = {
          id: 'req_' + Date.now(),
          type: 'Contact',
          date: new Date().toLocaleString('id-ID'),
          status: 'Pending',
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email || '-',
          packageInterest: formData.packageInterest,
          message: formData.message,
        };
        localStorage.setItem('nurmina_requests', JSON.stringify([newRequest, ...requests]));
      } catch (e) {
        console.error('Error saving contact request:', e);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        whatsapp: '',
        email: '',
        packageInterest: 'general',
        message: ''
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const faqs = [
    { q: 'Bagaimana cara memulai konsultasi gratis?', a: 'Anda dapat mengisi form di samping ini atau mengklik tombol chat WhatsApp langsung untuk terhubung dengan advisor kami dalam waktu kurang dari 5 menit.' },
    { q: 'Apakah ada biaya tambahan untuk pendampingan pendaftaran?', a: 'Tidak. Layanan konsultasi dan pencarian rekomendasi paket di platform kami 100% gratis tanpa komitmen apa pun.' },
    { q: 'Bagaimana legalitas travel yang bekerjasama dengan platform Anda?', a: 'Seluruh travel provider yang masuk dalam rekomendasi kami wajib memiliki izin Penyelenggara Perjalanan Ibadah Umroh (PPIU) resmi dari Kemenag RI dan memiliki rekam jejak keuangan yang sehat.' }
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--gray-50)' }}>
        
        {/* ===== HERO SECTION ===== */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--gray-900) 100%)',
          color: '#fff',
          padding: '4.5rem 0 3.5rem',
          textAlign: 'center'
        }}>
          <div className="container">
            <span className="badge badge-warning" style={{ marginBottom: '1rem', background: 'rgba(212,175,55,0.2)', color: 'var(--primary-200)' }}>
              📞 Hubungi Penasihat Umroh
            </span>
            <h1 className="text-display" style={{ color: '#fff', marginBottom: '1.25rem' }}>
              Konsultasikan Perjalanan Suci Anda
            </h1>
            <p style={{ maxWidth: '580px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Tim advisor kami siap menjawab pertanyaan Anda mengenai rincian paket, legalitas travel, akomodasi hotel, hingga pengurusan paspor dan visa.
            </p>
          </div>
        </section>

        {/* ===== CONTACT INTERACTIVE SECTION ===== */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              
              {/* Left Column - Contact Info & FAQs */}
              <div>
                <div className="section-label">📞 Informasi Kontak</div>
                <h2 className="section-title">Hubungi Kami Secara Langsung</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  Silakan hubungi kami melalui saluran berikut atau tinggalkan pesan untuk dihubungi kembali oleh Advisor kami.
                </p>

                {/* Direct links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                  <a 
                    href="https://wa.me/6281234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="card"
                    style={{ 
                      padding: '1.25rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      border: '1px solid rgba(212,175,55,0.25)', 
                      background: 'linear-gradient(135deg, #fff 0%, var(--primary-50) 100%)' 
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>💬</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>WhatsApp Hubungi Advisor</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 600 }}>Tanya jawab instan 24/7 (Klik di Sini)</div>
                    </div>
                  </a>

                  <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--gray-100)', background: '#fff' }}>
                    <div style={{ fontSize: '2rem' }}>📧</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>Alamat Email Resmi</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>info@nurminathaiftour.com</div>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--gray-100)', background: '#fff' }}>
                    <div style={{ fontSize: '2rem' }}>📍</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>Kantor Advisor Jakarta</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Jl. Thamrin No. 89, Menteng, Jakarta Pusat</div>
                    </div>
                  </div>
                </div>

                {/* FAQ Component */}
                <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '2.5rem' }}>
                  <div className="section-label">💡 Pertanyaan Sering Diajukan</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>FAQs Pendukung</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {faqs.map(faq => (
                      <div key={faq.q}>
                        <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '6px' }}>{faq.q}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <div className="card" style={{ padding: '2.5rem', background: '#fff', border: '1px solid var(--gray-100)' }}>
                  {submitSuccess ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>✅</span>
                      <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem' }}>
                        Pesan Anda Terkirim!
                      </h3>
                      <p style={{ color: 'var(--gray-500)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Terima kasih telah menghubungi kami. Tim Advisor kami akan segera menghubungi Anda melalui nomor WhatsApp yang terdaftar dalam waktu dekat.
                      </p>
                      <button 
                        onClick={() => setSubmitSuccess(false)}
                        className="btn btn-secondary"
                        style={{ width: '100%' }}
                      >
                        Kirim Pesan Baru
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
                        Formulir Konsultasi Gratis
                      </h3>
                      <p style={{ color: 'var(--gray-400)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        Lengkapi rincian di bawah untuk mendaftarkan jadwal diskusi atau menanyakan detail paket.
                      </p>

                      <div>
                        <label htmlFor="name" className="label">Nama Lengkap *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Contoh: Ahmad Husein" 
                          className="input" 
                        />
                      </div>

                      <div>
                        <label htmlFor="whatsapp" className="label">Nomor WhatsApp Aktif *</label>
                        <input 
                          type="tel" 
                          id="whatsapp" 
                          name="whatsapp" 
                          required
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="Contoh: 081234567890" 
                          className="input" 
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="label">Alamat Email (Opsional)</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Contoh: ahmad@domain.com" 
                          className="input" 
                        />
                      </div>

                      <div>
                        <label htmlFor="packageInterest" className="label">Minat Kategori Paket</label>
                        <select 
                          id="packageInterest" 
                          name="packageInterest"
                          value={formData.packageInterest}
                          onChange={handleChange}
                          className="input"
                          style={{ appearance: 'auto', background: '#fff' }}
                        >
                          <option value="general">Tanya Jawab Umum</option>
                          <option value="economy">Paket Ekonomi</option>
                          <option value="standard">Paket Standar</option>
                          <option value="premium">Paket Premium / VIP</option>
                          <option value="custom">Paket Khusus Rombongan</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="label">Pesan / Pertanyaan Anda *</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tuliskan pertanyaan Anda secara detail (contoh: ketersediaan hotel bintang 5 dekat Ka'bah di bulan September)" 
                          className="input"
                          style={{ resize: 'vertical' }}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Mengirimkan...' : 'Kirim Pengajuan Konsultasi'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
