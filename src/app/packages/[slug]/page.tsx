'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/ui/PackageCard';
import { getPackageBySlug, getRelatedPackages, formatPrice } from '@/data/packages';
import { getAirlines } from '@/data/airlines';
import { getHotels } from '@/data/hotels';

const typeLabel: Record<string, string> = { economy: 'Ekonomi', standard: 'Standar', premium: 'Premium', vip: 'VIP' };

const journeySteps = [
  {
    title: 'Persiapan & Miqat',
    sub: 'Langkah awal ibadah',
    description: 'Jamaah mempersiapkan diri dengan mandi sunnah, mengenakan pakaian ihram dari hotel/miqat, sholat sunnah ihram, dan melafalkan niat Umroh di batas tanah suci (Miqat Bir Ali/Dzulhulaifah).',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
    checklist: ['Mandi sunnah ihram & berwudhu', 'Mengenakan pakaian ihram bersih', 'Sholat sunnah ihram 2 rakaat', 'Melafalkan niat di Miqat'],
    tip: 'Gunakan ikat pinggang khusus ihram untuk mengencangkan kain ihram bagian bawah (bagi laki-laki).'
  },
  {
    title: 'Thawaf Ka\'bah',
    sub: 'Mengelilingi Baitullah',
    description: 'Melakukan ibadah Thawaf dengan mengelilingi Ka\'bah sebanyak 7 putaran berlawanan arah jarum jam. Dimulai dari sudut Hajar Aswad dan diakhiri di sudut yang sama, sambil membaca talbiyah, doa, dan dzikir.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" />
      </svg>
    ),
    checklist: ['Suci dari hadats kecil & besar', 'Menutup aurat dengan sempurna', 'Ka\'bah berada di sebelah kiri jamaah', 'Mengitari Ka\'bah tepat 7 kali putaran'],
    tip: 'Disarankan melakukan sholat sunnah Thawaf 2 rakaat di belakang Makam Ibrahim setelah selesai Thawaf.'
  },
  {
    title: 'Sa\'i Shafa-Marwah',
    sub: 'Napak tilas Siti Hajar',
    description: 'Berjalan kaki sebanyak 7 kali perjalanan antara bukit Shafa dan bukit Marwah. Perjalanan dimulai dari Shafa dan berakhir di Marwah. Disunnahkan berlari-lari kecil bagi laki-laki di antara dua pilar lampu hijau.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    checklist: ['Dimulai di Bukit Shafa', 'Berjalan menuju Bukit Marwah (1 kali jalan)', 'Total 7 kali perjalanan', 'Berdoa menghadap Ka\'bah di setiap bukit'],
    tip: 'Minumlah air Zam-zam secukupnya dan basuh wajah/kepala sebelum memulai ibadah Sa\'i.'
  },
  {
    title: 'Tahallul',
    sub: 'Mencukur & melepas ihram',
    description: 'Mencukur rambut kepala sebagai simbol pembersihan diri dan selesainya seluruh rangkaian ibadah Umroh. Laki-laki disarankan mencukur gundul (halq) atau memotong pendek (taqsir), sedangkan wanita memotong minimal sepanjang ruas jari.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="9.8" y1="8.2" x2="21" y2="12" />
        <line x1="9.8" y1="15.8" x2="21" y2="12" />
      </svg>
    ),
    checklist: ['Memotong minimal 3 helai rambut', 'Mencukur bersih seluruh kepala (lebih utama bagi pria)', 'Membaca doa setelah bercukur'],
    tip: 'Setelah tahallul dilakukan, semua larangan ihram (seperti memakai pakaian biasa, parfum, memotong kuku) kembali diperbolehkan.'
  },
  {
    title: 'Ziarah Madinah',
    sub: 'Ibadah di Masjid Nabawi',
    description: 'Melakukan perjalanan ke kota Madinah Al-Munawwarah. Beribadah di Masjid Nabawi, berziarah ke makam Rasulullah SAW, Abu Bakar Ash-Shiddiq, Umar bin Khattab, pemakaman Baqi, dan berdoa di area Raudhah (taman surga).',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    checklist: ['Sholat berjamaah di Masjid Nabawi', 'Ziarah makam Rasulullah SAW & Sahabat', 'Berdoa di Raudhah (memerlukan izin Nusuk)', 'Mengunjungi Masjid Quba & Jabal Uhud'],
    tip: 'Bila mengunjungi Masjid Quba dalam keadaan suci (wudhu) lalu sholat 2 rakaat di sana, pahalanya setara dengan 1 kali Umroh.'
  },
  {
    title: 'Ziarah Mekkah',
    sub: 'Menelusuri sejarah Islam',
    description: 'Mengunjungi tempat-tempat bersejarah di sekitar Makkah untuk merenungkan perjuangan Rasulullah SAW dan para Nabi terdahulu, seperti Padang Arafah (Jabal Rahmah), Muzdalifah, Mina, Jabal Nur (Gua Hira), dan Jabal Tsur.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M12 2l-8 8h16l-8-8z" />
      </svg>
    ),
    checklist: ['Ziarah Jabal Rahmah (bukit pertemuan)', 'Melihat lokasi kemah Mina', 'Melewati Jabal Nur (tempat wahyu pertama)', 'Melewati Jabal Tsur (tempat persembunyian)'],
    tip: 'Siapkan pelindung matahari (payung/topi) dan air minum yang cukup karena suhu udara di luar ruangan seringkali sangat terik.'
  },
  {
    title: 'Tawaf Wada\' & Pulang',
    sub: 'Penghormatan terakhir Ka\'bah',
    description: 'Melakukan Thawaf perpisahan (Thawaf Wada\') sebelum bertolak meninggalkan kota suci Makkah menuju bandara Jeddah/Madinah untuk melakukan perjalanan kepulangan ke tanah air.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
    checklist: ['Thawaf keliling Ka\'bah 7 putaran tanpa ihram', 'Tidak diperbolehkan berbelanja/tinggal lama setelah Thawaf', 'Check-out hotel & transfer bandara', 'Penerbangan pulang ke Indonesia'],
    tip: 'Thawaf Wada\' wajib dilakukan bagi setiap jamaah sebelum keluar dari kota Makkah, kecuali wanita yang sedang berhalangan (haid).'
  }
];

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const pkg = getPackageBySlug(slug);

  if (!pkg) return notFound();

  const related = getRelatedPackages(pkg);
  const [activeImage, setActiveImage] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Load dynamic data for airlines & hotels
  const airlines = getAirlines();
  const hotels = getHotels();

  const activeAirline = airlines.find(a => a.name === pkg.airline);
  const airlineLogoUrl = pkg.airlineLogo || activeAirline?.logo;

  const hotelMakkahData = hotels.find(h => h.name === pkg.hotelMakkah && h.city === 'Makkah');
  const hotelMadinahData = hotels.find(h => h.name === pkg.hotelMadinah && h.city === 'Madinah');

  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', background: 'var(--gray-50)', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#fff', borderBottom: '1px solid var(--gray-100)', padding: '12px 0' }}>
          <div className="container">
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
              <Link href="/" style={{ color: 'var(--gray-400)' }}>Home</Link>
              <span>›</span>
              <Link href="/packages" style={{ color: 'var(--gray-400)' }}>Paket</Link>
              <span>›</span>
              <span style={{ color: 'var(--gray-700)', fontWeight: 500 }}>{pkg.name}</span>
            </nav>
          </div>
        </div>

        <div className="container" style={{ padding: '2rem 1.5rem' }}>
          <div className="package-detail-layout">
            {/* LEFT COLUMN */}
            <div>
              {/* Gallery */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '10px', background: 'var(--gray-200)' }}>
                  <img
                    src={pkg.images[activeImage] || pkg.image}
                    alt={pkg.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
                  />
                </div>
                {pkg.images.length > 1 && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {pkg.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        style={{
                          width: '80px', height: '60px', borderRadius: 'var(--radius-md)', overflow: 'hidden',
                          border: activeImage === i ? '2px solid var(--primary-500)' : '2px solid transparent',
                          padding: 0, cursor: 'pointer',
                        }}
                      >
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Header info */}
              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                  <span style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {typeLabel[pkg.type]}
                  </span>
                  {pkg.verified && (
                    <span style={{ background: 'var(--success-50)', color: 'var(--success-700)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ✓ Provider Terverifikasi
                    </span>
                  )}
                  {pkg.availableSlots <= 5 && (
                    <span style={{ background: 'var(--error-50)', color: 'var(--error-700)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ⚡ Tersisa {pkg.availableSlots} slot
                    </span>
                  )}
                </div>

                <h1 style={{ fontFamily: 'var(--font-secondary)', fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
                  {pkg.name}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#FBBF24' }}>{'★'.repeat(Math.round(pkg.rating))}</span>
                  <span style={{ fontWeight: 700, color: 'var(--gray-800)' }}>{pkg.rating}</span>
                  <span style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>({pkg.reviewCount} ulasan)</span>
                </div>
              </div>

              {/* Quick info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                {[
                  { icon: '📅', label: 'Durasi', value: `${pkg.duration} Hari` },
                  { icon: '🕌', label: 'Di Mekkah', value: `${pkg.durationMakkah} Hari` },
                  { icon: '🌿', label: 'Di Madinah', value: `${pkg.durationMadinah} Hari` },
                  { icon: '⭐', label: 'Hotel', value: `Bintang ${pkg.hotelRating}` },
                  { icon: '✈️', label: 'Maskapai', value: pkg.airline, logo: airlineLogoUrl },
                  { icon: '👥', label: 'Grup', value: `${pkg.groupSize} jamaah` },
                ].map(info => (
                  <div key={info.label} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '14px', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '94px' }}>
                    {info.logo ? (
                      <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                        {info.logo.startsWith('data:image/svg+xml;utf8,') ? (
                          <div 
                            style={{ height: '24px', width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                            dangerouslySetInnerHTML={{ __html: decodeURIComponent(info.logo.replace('data:image/svg+xml;utf8,', '')) }} 
                          />
                        ) : (
                          <img src={info.logo} alt={info.value} style={{ height: '24px', maxWidth: '80px', objectFit: 'contain' }} />
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{info.icon}</div>
                    )}
                    <div style={{ fontSize: '0.68rem', color: 'var(--gray-400)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{info.label}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--gray-800)', textAlign: 'center' }}>{info.value}</div>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <SectionCard title="Yang Termasuk dalam Paket" icon="✅">
                <div className="inclusions-grid-layout">
                  {pkg.inclusions.map(inc => (
                    <div key={inc} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                      <span style={{ color: 'var(--success-500)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
                {pkg.exclusions.length > 0 && (
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--gray-100)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                      Tidak Termasuk
                    </div>
                    {pkg.exclusions.map(ex => (
                      <div key={ex} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--error-500)' }}>✕</span>
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Hotel Accommodation Section */}
              {(hotelMakkahData || hotelMadinahData) && (
                <SectionCard title="Akomodasi Hotel Pilihan" icon="🏢">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '0.5rem' }}>
                    {hotelMakkahData && (
                      <div style={{ border: '1px solid var(--gray-100)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', boxShadow: 'var(--shadow-xs)' }}>
                        <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                          <img src={hotelMakkahData.image} alt={hotelMakkahData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#78350f', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '99px' }}>
                            MAKKAH
                          </span>
                        </div>
                        <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)', marginBottom: '4px' }}>{hotelMakkahData.name}</div>
                            <div style={{ color: '#FBBF24', fontSize: '0.75rem', marginBottom: '8px' }}>
                              {'★'.repeat(hotelMakkahData.rating)}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: '8px' }}>
                              {hotelMakkahData.description}
                            </p>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', borderTop: '1px solid var(--gray-100)', paddingTop: '8px', display: 'flex', gap: '4px' }}>
                            <span>📍</span> <span>{hotelMakkahData.address}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {hotelMadinahData && (
                      <div style={{ border: '1px solid var(--gray-100)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', boxShadow: 'var(--shadow-xs)' }}>
                        <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                          <img src={hotelMadinahData.image} alt={hotelMadinahData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#065f46', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '99px' }}>
                            MADINAH
                          </span>
                        </div>
                        <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)', marginBottom: '4px' }}>{hotelMadinahData.name}</div>
                            <div style={{ color: '#FBBF24', fontSize: '0.75rem', marginBottom: '8px' }}>
                              {'★'.repeat(hotelMadinahData.rating)}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: '8px' }}>
                              {hotelMadinahData.description}
                            </p>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', borderTop: '1px solid var(--gray-100)', paddingTop: '8px', display: 'flex', gap: '4px' }}>
                            <span>📍</span> <span>{hotelMadinahData.address}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Itinerary */}
              {pkg.itinerary.length > 0 && (
                <SectionCard title="Rencana Perjalanan" icon="🗺️">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pkg.itinerary.map(day => (
                      <div key={day.day} style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-100)', overflow: 'hidden' }}>
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '14px 16px', background: expandedDay === day.day ? 'var(--primary-50)' : '#fff',
                            border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-primary)',
                            transition: 'background 0.2s',
                          }}
                        >
                          <span style={{
                            width: 32, height: 32, background: 'var(--primary-500)', color: '#fff',
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                          }}>
                            {day.day}
                          </span>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-800)', flex: 1 }}>{day.title}</span>
                          <span style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>{expandedDay === day.day ? '▲' : '▼'}</span>
                        </button>
                        {expandedDay === day.day && (
                          <div className="itinerary-content-box" style={{ background: '#fafafa' }}>
                            {day.activities.map(act => (
                              <div key={act} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '6px' }}>
                                <span style={{ color: 'var(--primary-400)', flexShrink: 0 }}>●</span>
                                {act}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Umroh Journey Stepper Section */}
              <SectionCard title="Alur Perjalanan Umroh" icon="✨">
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Berikut adalah urutan perjalanan ibadah Umroh Anda dari awal hingga kepulangan. Klik tiap tahapan di bawah untuk melihat rincian panduan, syarat sah, serta tips praktisnya.
                </p>

                {/* Step Indicators */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-100)', scrollbarWidth: 'thin' }}>
                  {journeySteps.map((step, idx) => {
                    const isActive = activeJourneyStep === idx;
                    const isPast = idx < activeJourneyStep;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveJourneyStep(idx)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minWidth: '100px',
                          flex: '1 0 auto',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          opacity: isActive ? 1 : 0.6,
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isActive ? 'var(--primary-500)' : (isPast ? 'var(--primary-50)' : 'var(--gray-50)'),
                          border: isActive ? '2px solid var(--primary-500)' : (isPast ? '2px solid var(--primary-300)' : '2px solid var(--gray-200)'),
                          color: isActive ? '#fff' : (isPast ? 'var(--primary-700)' : 'var(--gray-500)'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          marginBottom: '6px',
                          boxShadow: isActive ? 'var(--shadow-gold)' : 'none',
                          transition: 'all 0.2s',
                        }}>
                          {idx + 1}
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary-700)' : 'var(--gray-600)', textAlign: 'center', maxWidth: '100px', whiteSpace: 'normal', lineHeight: 1.2 }}>
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Journey Step Detail Box */}
                <div style={{
                  background: 'linear-gradient(135deg, #fff 0%, var(--primary-50) 100%)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  border: '1.5px solid var(--primary-100)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '1.5rem',
                }} className="admin-grid">
                  {/* Left Column: Description */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'var(--primary-500)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-sm)',
                        flexShrink: 0
                      }}>
                        {journeySteps[activeJourneyStep].icon}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          LANGKAH {activeJourneyStep + 1}
                        </span>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gray-900)' }}>
                          {journeySteps[activeJourneyStep].title}
                        </h3>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {journeySteps[activeJourneyStep].description}
                    </p>

                    {/* Stepper inline navigation */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        disabled={activeJourneyStep === 0}
                        onClick={() => setActiveJourneyStep(prev => prev - 1)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: '1.5px solid var(--primary-300)',
                          color: 'var(--primary-700)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: activeJourneyStep === 0 ? 'not-allowed' : 'pointer',
                          opacity: activeJourneyStep === 0 ? 0.4 : 1,
                        }}
                      >
                        ← Sebelumnya
                      </button>
                      <button
                        disabled={activeJourneyStep === journeySteps.length - 1}
                        onClick={() => setActiveJourneyStep(prev => prev + 1)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'var(--primary-500)',
                          color: '#fff',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: activeJourneyStep === journeySteps.length - 1 ? 'not-allowed' : 'pointer',
                          opacity: activeJourneyStep === journeySteps.length - 1 ? 0.4 : 1,
                          boxShadow: activeJourneyStep === journeySteps.length - 1 ? 'none' : 'var(--shadow-xs)',
                        }}
                      >
                        Selanjutnya →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Guide & Tips */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--primary-100)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gray-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>📋</span> Ketentuan & Amalan
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {journeySteps[activeJourneyStep].checklist.map((c, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                            <span style={{ color: 'var(--success-500)', fontWeight: 900, flexShrink: 0 }}>✓</span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: 'var(--warning-50)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px dashed var(--warning-500)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--warning-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>💡</span> Tips Praktis
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--gray-700)', lineHeight: 1.5 }}>
                        {journeySteps[activeJourneyStep].tip}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* About NurminaThaif */}
              <SectionCard title="Tentang NurminaThaif Tour" icon="🏢">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: 64, height: 64, flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>🕌</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-900)', marginBottom: '4px' }}>NurminaThaif Tour</div>
                    <span style={{ background: 'var(--success-50)', color: 'var(--success-700)', padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ✓ Terverifikasi Kemenag RI
                    </span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '10px', lineHeight: 1.6 }}>
                      Penyelenggara Perjalanan Ibadah Umroh (PPIU) terpercaya dengan pengalaman lebih dari 10 tahun melayani jamaah dari seluruh Indonesia.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: 'var(--primary-600)' }}>4.9</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>Rating</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: 'var(--primary-600)' }}>2000+</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>Jamaah</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: 'var(--primary-600)' }}>10+</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>Tahun</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Reviews */}
              <SectionCard title="Ulasan Jamaah" icon="💬">
                {pkg.reviews.map(r => (
                  <div key={r.id} style={{ padding: '1rem', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{r.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginLeft: '8px' }}>{r.location}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{r.date}</span>
                    </div>
                    <div style={{ color: '#FBBF24', fontSize: '0.875rem', marginBottom: '8px' }}>{'★'.repeat(r.rating)}</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{r.comment}&rdquo;</p>
                  </div>
                ))}
              </SectionCard>

              {/* FAQ */}
              {pkg.faqs.length > 0 && (
                <SectionCard title="Pertanyaan Umum" icon="❓">
                  {pkg.faqs.map((faq, i) => (
                    <div key={i} style={{ borderBottom: '1px solid var(--gray-100)', marginBottom: '4px' }}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        style={{ width: '100%', textAlign: 'left', padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-primary)' }}
                      >
                        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-800)' }}>{faq.question}</span>
                        <span style={{ color: 'var(--primary-500)', fontSize: '1.2rem', flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
                      </button>
                      {openFaq === i && (
                        <div style={{ paddingBottom: '14px', fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.7, animation: 'slideDown 0.3s ease' }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </SectionCard>
              )}
            </div>

            {/* RIGHT STICKY COLUMN */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', border: '1px solid var(--gray-100)' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--gray-100)' }}>
                  {pkg.originalPrice && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'line-through', marginBottom: '4px' }}>
                      {formatPrice(pkg.originalPrice)}
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-secondary)', fontSize: '2rem', fontWeight: 800, color: 'var(--primary-600)', lineHeight: 1 }}>
                    {formatPrice(pkg.price)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '4px' }}>per orang</div>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href="/contact" className="btn btn-primary" style={{ textAlign: 'center', width: '100%' }}>
                    💬 Konsultasi Gratis
                  </Link>
                  <Link href="/contact" className="btn btn-secondary" style={{ textAlign: 'center', width: '100%' }}>
                    Pesan Sekarang
                  </Link>
                  <Link href="/packages" className="btn btn-ghost" style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                    Bandingkan dengan Paket Lain
                  </Link>
                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                    Tanpa komitmen • Gratis konsultasi
                  </p>
                  {pkg.availableSlots <= 5 && (
                    <div style={{ background: 'var(--error-50)', color: 'var(--error-700)', padding: '10px', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', textAlign: 'center', fontWeight: 600 }}>
                      ⚡ Hanya {pkg.availableSlots} slot tersisa bulan ini!
                    </div>
                  )}
                </div>

                {/* Departure dates */}
                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Keberangkatan Tersedia
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {pkg.departureDates.map(d => (
                      <span key={d} style={{ padding: '4px 10px', background: 'var(--primary-50)', color: 'var(--primary-700)', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500 }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related packages */}
          {related.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1.5rem' }}>
                Paket Serupa
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {related.map(p => <PackageCard key={p.id} pkg={p} compact />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}
