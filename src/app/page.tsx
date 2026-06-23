import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/ui/PackageCard';
import { getFeaturedPackages } from '@/data/packages';
import { stories } from '@/data/stories';
import {
  People,
  Star1,
  Verify,
  Heart,
  ClipboardText,
  ShieldTick,
  MoneyRecive,
  Headphone,
  ArrowRight2,
  Clock,
  Book1,
  NoteText,
  MessageText1,
  Routing,
  Award,
  Send2,
} from 'iconsax-react';

export const metadata: Metadata = {
  title: 'NurminaThaifTour — Umroh yang Dipersonalisasi untuk Anda',
  description:
    'Bukan travel biasa. Kami menyesuaikan paket Umroh berdasarkan kebutuhan, anggaran, dan preferensi ibadah Anda. Transparan, terverifikasi, dan tanpa biaya tersembunyi.',
};

const featuredPackages = getFeaturedPackages();

const stats = [
  { number: '500+', label: 'Jamaah Telah Diberangkatkan', Icon: People },
  { number: '4.8', label: 'Rating Kepuasan Rata-rata', Icon: Star1 },
  { number: '50+', label: 'Provider Terverifikasi Aktif', Icon: Verify },
  { number: '98%', label: 'Jamaah Rekomendasikan Kami', Icon: Heart },
];

const features = [
  {
    Icon: ClipboardText,
    title: 'Disesuaikan dengan Kebutuhan Anda',
    desc: 'Jawab beberapa pertanyaan singkat — kami akan memetakan paket yang paling sesuai dengan anggaran, durasi, dan preferensi ibadah Anda.',
  },
  {
    Icon: ShieldTick,
    title: 'Hanya Provider Terpercaya',
    desc: 'Setiap provider di platform kami telah melalui verifikasi legalitas, rekam jejak, dan standar layanan yang ketat.',
  },
  {
    Icon: MoneyRecive,
    title: 'Harga yang Sepenuhnya Transparan',
    desc: 'Tidak ada biaya tersembunyi. Setiap komponen biaya — pesawat, hotel, visa, dan makan — diperinci secara jelas sejak awal.',
  },
  {
    Icon: Headphone,
    title: 'Didampingi dari Awal Hingga Pulang',
    desc: 'Tim kami siap mendampingi Anda mulai dari proses pemilihan paket, pengurusan dokumen, hingga kepulangan dari Tanah Suci.',
  },
];

const steps = [
  {
    num: 1,
    title: 'Ceritakan Kebutuhan Anda',
    desc: 'Jawab beberapa pertanyaan tentang anggaran, durasi perjalanan, kota keberangkatan, dan preferensi ibadah Anda.',
  },
  {
    num: 2,
    title: 'Dapatkan Paket yang Pas',
    desc: 'Sistem kami mencocokkan profil Anda dengan paket terbaik yang tersedia — bukan sekadar pilihan paling mahal.',
  },
  {
    num: 3,
    title: 'Diskusikan dengan Tim Kami',
    desc: 'Konsultasikan pilihan Anda secara gratis dengan tim yang berpengalaman sebelum memutuskan.',
  },
  {
    num: 4,
    title: 'Berangkat dengan Tenang',
    desc: 'Kami urus semua dokumen dan logistik. Anda tinggal fokus pada ibadah.',
  },
];

const articles = [
  {
    title: 'Panduan Lengkap Persiapan Dokumen Umroh',
    excerpt: 'Paspor, visa, dan dokumen apa saja yang wajib Anda siapkan sebelum berangkat Umroh...',
    readTime: '5 min',
    category: 'Persiapan',
    Icon: NoteText,
  },
  {
    title: '10 Tips Agar Umroh Lebih Khusyuk dan Berkesan',
    excerpt: 'Persiapan spiritual dan fisik yang perlu Anda lakukan agar ibadah Umroh lebih bermakna...',
    readTime: '7 min',
    category: 'Tips',
    Icon: Book1,
  },
  {
    title: 'Memilih Paket Umroh: Economy, Standard, atau Premium?',
    excerpt: 'Pahami perbedaan setiap kelas paket Umroh agar Anda bisa memilih yang paling sesuai...',
    readTime: '6 min',
    category: 'Panduan',
    Icon: Routing,
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 0 }}>

        {/* ===== HERO ===== */}
        <section style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'var(--gray-900)',
        }}>
          {/* Background image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1602769490455-36cf9734dbcb?w=2670&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          {/* Gradient overlay */}
          <div className="hero-gradient" style={{ position: 'absolute', inset: 0 }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '4rem' }}>
            <div style={{ maxWidth: '680px' }}>
              {/* Top badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.35)',
                padding: '6px 16px',
                borderRadius: '99px',
                fontSize: '0.8rem',
                color: 'var(--primary-200)',
                fontWeight: 600,
                marginBottom: '1.5rem',
                backdropFilter: 'blur(8px)',
              }}>
                <Award size={14} color="currentColor" />
                Personalisasi Umroh Terpercaya di Indonesia
              </div>

              <h1 className="text-display" style={{ color: '#fff', marginBottom: '1.5rem' }}>
                Umroh yang{' '}
                <span style={{
                  background: 'linear-gradient(90deg, var(--primary-300), var(--primary-200))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Benar-Benar Sesuai
                </span>{' '}
                untuk Anda
              </h1>

              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '560px' }}>
                Setiap orang punya kebutuhan ibadah yang berbeda. Kami menyesuaikan rekomendasi paket Umroh berdasarkan anggaran, durasi, dan preferensi Anda — bukan sekadar menjual paket terlaris.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '3rem' }}>
                <Link href="/assessment" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Send2 size={18} color="currentColor" />
                  Temukan Paket Saya
                </Link>
                <Link href="/packages" className="btn" style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(8px)',
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}>
                  Lihat Semua Paket <ArrowRight2 size={16} color="currentColor" />
                </Link>
              </div>

              {/* Trust indicators */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {[
                  { Icon: People, label: '500+ Jamaah Diberangkatkan' },
                  { Icon: Star1, label: '4.8 / 5 Rating' },
                  { Icon: Verify, label: 'Provider Terverifikasi' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={15} color="var(--primary-300)" variant="Bold" />
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.825rem' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{
              width: '26px', height: '42px',
              border: '1.5px solid rgba(255,255,255,0.25)',
              borderRadius: '13px',
              display: 'flex', justifyContent: 'center', paddingTop: '6px',
            }}>
              <div style={{
                width: '4px', height: '8px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '2px',
                animation: 'slideUp 1.5s ease infinite',
              }} />
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section style={{ padding: '4rem 0', background: '#fff', borderBottom: '1px solid var(--gray-100)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              {stats.map(({ number, label, Icon }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Icon size={28} color="var(--primary-500)" variant="Bold" />
                  </div>
                  <div className="stat-number">{number}</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--gray-500)', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-label">
                <MessageText1 size={13} color="currentColor" /> Cerita Nyata
              </div>
              <h2 className="section-title">Apa Kata Jamaah Kami</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Lebih dari 500 jamaah telah menemukan paket yang tepat melalui platform kami
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {stories.slice(0, 3).map(story => (
                <div key={story.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {story.images && story.images.length > 0 && (
                    <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={story.images[0]}
                        alt="Perjalanan Umroh"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <img
                        src={story.photo}
                        alt={story.name}
                        style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-200)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{story.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{story.location} • {story.travelDate}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star1 key={i} size={14} color="#FBBF24" variant="Bold" />
                      ))}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.75, fontStyle: 'italic', flex: 1, marginBottom: '12px' }}>
                      &ldquo;{story.excerpt}&rdquo;
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', borderTop: '1px solid var(--gray-100)', paddingTop: '10px' }}>
                      {story.packageUsed.split(' ').slice(0, 4).join(' ')}...
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/stories" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Lihat Semua Cerita <ArrowRight2 size={16} color="currentColor" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== WHY US ===== */}
        <section className="section" style={{ background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-label">
                <Verify size={13} color="currentColor" /> Keunggulan Platform
              </div>
              <h2 className="section-title">Kenapa Kami Berbeda?</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Kami tidak sekadar mendaftar paket — kami memahami kebutuhan Anda dan menyesuaikan setiap rekomendasi
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {features.map(({ Icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <div style={{
                    width: 52, height: 52,
                    background: 'var(--primary-50)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                    border: '1px solid var(--primary-100)',
                  }}>
                    <Icon size={24} color="var(--primary-600)" variant="Bold" />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.75rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--gray-900) 100%)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-label" style={{ color: 'var(--primary-300)' }}>
                <Routing size={13} color="currentColor" /> Cara Kerja
              </div>
              <h2 className="section-title" style={{ color: '#fff' }}>Dari Kebutuhan ke Keberangkatan</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.75 }}>
                Proses mudah dan transparan — selesai dalam hitungan menit
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {steps.map(step => (
                <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{
                    width: 52, height: 52,
                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    fontWeight: 800, fontSize: '1.15rem',
                    color: '#fff',
                    boxShadow: 'var(--shadow-gold)',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/assessment" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Send2 size={18} color="currentColor" /> Mulai Sekarang — Gratis
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FEATURED PACKAGES ===== */}
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <div className="section-label">
                  <Award size={13} color="currentColor" /> Pilihan Populer
                </div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Paket yang Paling Banyak Dipilih</h2>
              </div>
              <Link href="/packages" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Lihat Semua <ArrowRight2 size={14} color="currentColor" />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
              {featuredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== KNOWLEDGE ===== */}
        <section className="section" style={{ background: '#fff' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <div className="section-label">
                  <Book1 size={13} color="currentColor" /> Edukasi
                </div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Panduan Umroh</h2>
              </div>
              <Link href="/knowledge" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Lihat Semua <ArrowRight2 size={14} color="currentColor" />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {articles.map(({ title, excerpt, readTime, category, Icon }) => (
                <Link key={title} href="/knowledge" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ height: '100%' }}>
                    <div style={{
                      height: '130px',
                      background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={44} color="rgba(212,175,55,0.7)" variant="Bold" />
                    </div>
                    <div className="card-body">
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'var(--primary-600)', background: 'var(--primary-50)',
                        padding: '3px 10px', borderRadius: '99px', display: 'inline-block', marginBottom: '10px',
                      }}>
                        {category}
                      </span>
                      <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.5rem', lineHeight: 1.45 }}>
                        {title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', lineHeight: 1.65, marginBottom: '1rem' }}>{excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                        <Clock size={13} color="currentColor" /> {readTime} baca
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section style={{
          padding: '6rem 0',
          background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(var(--primary-500) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="container" style={{ position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(212,175,55,0.18)',
              border: '1px solid var(--primary-300)',
              padding: '6px 18px', borderRadius: '99px',
              fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-700)',
              marginBottom: '1.5rem',
            }}>
              <Verify size={14} color="currentColor" variant="Bold" /> Gratis & Tanpa Komitmen
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', color: 'var(--gray-900)', marginBottom: '1.25rem', fontWeight: 800, lineHeight: 1.25 }}>
              Sudah Tahu Apa yang Anda Butuhkan?
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: '460px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
              Temukan paket Umroh yang benar-benar sesuai hanya dalam 2 menit — tanpa telepon, tanpa tekanan.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <Link href="/assessment" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Send2 size={18} color="currentColor" /> Temukan Paket Saya
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MessageText1 size={18} color="currentColor" /> Hubungi Kami
              </Link>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
              Tanpa registrasi &nbsp;·&nbsp; Tanpa komitmen &nbsp;·&nbsp; 100% gratis
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
