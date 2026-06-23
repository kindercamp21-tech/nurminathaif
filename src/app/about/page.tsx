import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami - NurminaThaifTour',
  description: 'Misi kami adalah membantu setiap calon jamaah menemukan paket Umroh terbaik secara aman, transparan, dan terpercaya.',
};

export default function AboutPage() {
  const values = [
    { emoji: '🕋', title: 'Kemurnian Ibadah', desc: 'Fokus utama kami adalah kelancaran dan kekhusyukan ibadah Anda sesuai sunnah Rasulullah SAW.' },
    { emoji: '💎', title: 'Transparansi Penuh', desc: 'Tidak ada biaya siluman. Seluruh rincian akomodasi, pesawat, mutawwif, dan visa terbuka sejak awal.' },
    { emoji: '🛡️', title: 'Keamanan & Legalitas', desc: 'Kami hanya bekerja sama dengan provider berizin resmi Kemenag dengan rekam jejak tanpa cela.' },
    { emoji: '🤝', title: 'Pendampingan Tulus', desc: 'Advisor kami mendampingi Anda dari proses penentuan paket hingga kepulangan kembali ke tanah air.' },
  ];

  const team = [
    {
      name: 'Sarah Mellisa',
      role: 'Lead Umroh Advisor',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Pengalaman 8 tahun memandu dan membantu ribuan jamaah menyesuaikan paket ideal mereka.'
    },
    {
      name: 'Ustadz Ahmad Salim',
      role: 'Pembimbing Ibadah (Mutawwif)',
      image: 'https://randomuser.me/api/portraits/men/82.jpg',
      bio: 'Lulusan Universitas Islam Madinah, membimbing jalannya ibadah sesuai tuntunan sunnah.'
    },
    {
      name: 'Fahri Hamzah',
      role: 'Operations Manager',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
      bio: 'Memastikan seluruh logistik, dari hotel bintang 5 hingga visa express, terorganisir dengan sempurna.'
    }
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#fff' }}>
        
        {/* ===== HERO SECTION ===== */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--gray-900) 100%)',
          color: '#fff',
          padding: '5rem 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <span className="badge badge-warning" style={{ marginBottom: '1rem', background: 'rgba(212,175,55,0.2)', color: 'var(--primary-200)' }}>
              🕌 Tentang NurminaThaifTour
            </span>
            <h1 className="text-display" style={{ color: '#fff', marginBottom: '1.25rem' }}>
              Misi Kami: Transparansi Ibadah Anda
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Kami lahir untuk menjawab kekhawatiran calon jamaah tentang ketidakpastian travel Umroh. Sebagai penasihat tepercaya, kami menghubungkan Anda dengan perjalanan terbaik.
            </p>
          </div>
        </section>

        {/* ===== WHY WE EXIST ===== */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div className="section-label">📖 Sejarah Singkat</div>
                <h2 className="section-title">Mengapa Kami Berdiri</h2>
                <div className="gold-accent" />
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                  Perjalanan ibadah Umroh adalah impian seumur hidup bagi setiap Muslim. Namun, maraknya kasus penipuan travel, ketidaksesuaian fasilitas hotel, dan ketidaktransparanan harga seringkali menimbulkan kekhawatiran mendalam.
                </p>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  <strong>NurminaThaifTour</strong> didirikan dengan satu komitmen utama: memberikan solusi penasihat independen. Kami menganalisis kebutuhan unik Anda (anggaran, lokasi hotel, maskapai penerbangan, dan durasi) kemudian menyajikan perbandingan paket yang objektif dan terverifikasi secara jujur.
                </p>
                <Link href="/assessment" className="btn btn-primary">
                  Mulai Coba Penilaian Bebas Biaya →
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop" 
                  alt="Ka'bah" 
                  style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', objectFit: 'cover', height: '400px' }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: 'var(--primary-500)',
                  color: '#fff',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: '220px',
                  display: 'none', // hidden on small screens in media queries usually
                }} className="badge-experience">
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 }}>5+</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>Tahun Membimbing Calon Jamaah Haji & Umroh</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OUR VALUES ===== */}
        <section className="section" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-label">💎 Nilai-Nilai Utama</div>
              <h2 className="section-title">Prinsip Kerja Kami</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Kami berpegang teguh pada nilai-nilai ini dalam memberikan rekomendasi kepada setiap jamaah.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {values.map(val => (
                <div key={val.title} className="card" style={{ padding: '2rem', border: '1px solid var(--gray-100)', background: '#fff' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{val.emoji}</div>
                  <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.7 }}>
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MEET THE ADVISORS ===== */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-label">👥 Tim Profesional</div>
              <h2 className="section-title">Pendamping Spiritual & Teknis Anda</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Kenali para ahli yang siap membantu menyusun rencana perjalanan suci Anda.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {team.map(member => (
                <div key={member.name} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--gray-100)' }}>
                  <div style={{ height: '320px', overflow: 'hidden' }}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.5rem' }}>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      letterSpacing: '0.08em', 
                      textTransform: 'uppercase', 
                      color: 'var(--primary-600)',
                      marginBottom: '4px' 
                    }}>
                      {member.role}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '10px' }}>
                      {member.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6, flex: 1 }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PARTNERS & COMPLIANCE ===== */}
        <section className="section" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="section-label">✅ Kepatuhan & Keamanan</div>
            <h2 className="section-title">Hanya Bekerjasama Dengan Maskapai & Hotel Resmi</h2>
            <p style={{ maxWidth: '540px', margin: '0 auto 2rem', color: 'var(--gray-500)', fontSize: '0.925rem', lineHeight: 1.7 }}>
              Setiap hotel bintang 3, 4, maupun 5 yang terdaftar di sistem kami dievaluasi jarak dan layanannya secara berkala. Maskapai penerbangan adalah maskapai penerbangan berskala internasional yang terdaftar resmi.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', alignItems: 'center', opacity: 0.6 }}>
              {['Garuda Indonesia', 'Saudi Arabian Airlines', 'Emirates', 'Qatar Airways', 'Hilton Hotels', 'Pullman Hotels'].map(p => (
                <span key={p} style={{ fontWeight: 700, color: 'var(--gray-500)', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
