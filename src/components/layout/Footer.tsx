'use client';

import Link from 'next/link';
import {
  Instagram,
  Youtube,
  Facebook,
  Whatsapp,
  Sms,
  Clock,
  Send2,
} from 'iconsax-react';

const footerLinks = {
  Layanan: [
    { label: 'Paket Umroh', href: '/packages' },
    { label: 'Sesuaikan Kebutuhan', href: '/assessment' },
    { label: 'Bandingkan Paket', href: '/compare' },
    { label: 'Jadwal Keberangkatan', href: '/schedule' },
  ],
  Konten: [
    { label: 'Cerita Jamaah', href: '/stories' },
    { label: 'Edukasi & Blog', href: '/blog' },
    { label: 'Panduan Umroh', href: '/blog' },
    { label: 'FAQ', href: '#' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Hubungi Kami', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kelola Situs (Admin)', href: '/admin' },
  ],
};

const socials = [
  { label: 'Instagram', Icon: Instagram, href: '#' },
  { label: 'Facebook', Icon: Facebook, href: '#' },
  { label: 'YouTube', Icon: Youtube, href: '#' },
  { label: 'WhatsApp', Icon: Whatsapp, href: 'https://wa.me/6281234567890' },
];

const contacts = [
  { Icon: Whatsapp, text: '+62 812 3456 7890 (WA)' },
  { Icon: Sms, text: 'info@nurminathaiftour.com' },
  { Icon: Clock, text: 'Senin–Jumat, 09.00–17.00 WIB' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--gray-900) 0%, #0d0d0d 100%)',
      color: 'rgba(255,255,255,0.7)',
      paddingTop: '4rem',
    }}>
      <div className="container">
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <img src="/images/Logo.svg" alt="NurminaThaifTour Logo" width={60} height={30} style={{ objectFit: 'contain' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>NurminaThaifTour</div>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--primary-400)', textTransform: 'uppercase' }}>
                  Personalisasi Umroh
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '260px' }}>
              Menyesuaikan paket Umroh berdasarkan kebutuhan nyata Anda — bukan sekadar menjual paket terlaris.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 38, height: 38,
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.18)';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <Icon size={17} color="rgba(255,255,255,0.7)" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-300)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter & Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Info Paket Terbaru
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.75 }}>
              Dapatkan info paket terbaru dan tips Umroh langsung di email Anda.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Anda"
                className="input"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Send2 size={14} color="currentColor" /> Berlangganan
              </button>
            </form>

            {/* Contact info */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {contacts.map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '0.8rem' }}>
                  <Icon size={15} color="var(--primary-400)" variant="Bold" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.5rem 0',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.35)',
        }}>
          <p>© 2025 NurminaThaifTour. Hak cipta dilindungi.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}>Kebijakan Privasi</Link>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}>Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
