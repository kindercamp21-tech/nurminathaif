import Link from 'next/link';
import { Package, formatPrice } from '@/data/packages';
import {
  Star1,
  Location,
  Calendar,
  Building,
  Airplane,
  People,
  TickCircle,
  ArrowRight2,
  Flash,
} from 'iconsax-react';

interface PackageCardProps {
  pkg: Package;
  compact?: boolean;
}

const typeLabel: Record<string, string> = {
  economy: 'Ekonomi',
  standard: 'Standar',
  premium: 'Premium',
  vip: 'VIP',
};

const typeBadge: Record<string, { bg: string; color: string; dot: string }> = {
  economy: { bg: '#F3F4F6', color: '#6B7280', dot: '#9CA3AF' },
  standard: { bg: '#FEF3C7', color: '#92400E', dot: '#D4AF37' },
  premium: { bg: '#FEF9EC', color: '#78350F', dot: '#D4AF37' },
  vip: { bg: '#1C1917', color: '#FCD34D', dot: '#FCD34D' },
};

export default function PackageCard({ pkg, compact = false }: PackageCardProps) {
  const badge = typeBadge[pkg.type];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.25s ease, transform 0.25s ease',
    }}
      className="pkg-card"
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#F9FAFB' }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Type badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: badge.bg,
          color: badge.color,
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: badge.dot, display: 'inline-block' }} />
          {typeLabel[pkg.type]}
        </div>

        {/* Popular tag */}
        {pkg.popularTag && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--primary-500)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.7rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Flash size={11} color="currentColor" variant="Bold" />
            {pkg.popularTag}
          </div>
        )}

        {/* Slot warning */}
        {pkg.availableSlots <= 5 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(239,68,68,0.92)',
            color: '#fff',
            fontSize: '0.68rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '6px',
          }}>
            Tersisa {pkg.availableSlots} slot
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Verified badge */}
        {pkg.verified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <TickCircle size={14} color="var(--success-500)" variant="Bold" />
            <span style={{ fontSize: '0.75rem', color: 'var(--success-600)', fontWeight: 600 }}>Terverifikasi Kemenag</span>
          </div>
        )}

        {/* Name */}
        <h3 style={{
          fontSize: '1.025rem',
          fontWeight: 700,
          color: 'var(--gray-900)',
          marginBottom: '12px',
          lineHeight: 1.35,
        }}>
          {pkg.name}
        </h3>

        {/* Meta pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {[
            { Icon: Calendar, text: `${pkg.duration} hari` },
            { Icon: Location, text: pkg.departureCity[0] },
            { Icon: Building, text: `Hotel ${pkg.hotelRating}★` },
            { Icon: Airplane, text: pkg.airline.split(' ')[0] },
          ].map(({ Icon, text }) => (
            <span key={text} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: 500,
              color: 'var(--gray-500)',
              background: 'var(--gray-50)',
              border: '1px solid var(--gray-100)',
              padding: '3px 9px',
              borderRadius: '6px',
            }}>
              <Icon size={11} color="var(--gray-400)" variant="Bold" />
              {text}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star1 key={i} size={13} color={i < Math.round(pkg.rating) ? '#FBBF24' : '#E5E7EB'} variant="Bold" />
            ))}
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-800)' }}>{pkg.rating}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>({pkg.reviewCount} ulasan)</span>
        </div>

        {/* Features */}
        {!compact && pkg.features.length > 0 && (
          <ul style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {pkg.features.slice(0, 3).map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.78rem', color: 'var(--gray-600)' }}>
                <TickCircle size={13} color="var(--success-500)" variant="Bold" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '14px', marginTop: '4px' }}>
          {/* Price */}
          <div style={{ marginBottom: '12px' }}>
            {pkg.originalPrice && (
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textDecoration: 'line-through', marginBottom: '2px' }}>
                {formatPrice(pkg.originalPrice)}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-600)', letterSpacing: '-0.02em' }}>
                {formatPrice(pkg.price)}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>/orang</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/packages/${pkg.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              background: 'var(--gray-900)',
              color: '#fff',
              padding: '11px 16px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            className="pkg-cta"
          >
            <span>Lihat Detail</span>
            <ArrowRight2 size={16} color="currentColor" />
          </Link>
        </div>
      </div>

      {/* Hover CSS via global class */}
      <style>{`
        .pkg-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); transform: translateY(-3px); }
        .pkg-cta:hover { background: var(--primary-600) !important; }
      `}</style>
    </div>
  );
}
