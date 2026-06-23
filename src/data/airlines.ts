export interface Airline {
  id: string;
  name: string;
  logo: string; // inline SVG data URL
  code: string; // IATA code
  country: string;
}

const svgToDataUrl = (svgStr: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`;

const defaultAirlinesData = [
  {
    id: 'a1',
    name: 'Saudia Airlines',
    code: 'SV',
    country: 'Arab Saudi',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#006C35"/>
        <circle cx="26" cy="20" r="8" fill="#FFF" opacity="0.15"/>
        <path d="M23 15 L29 20 L23 25" stroke="#D4AF37" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="44" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFF">SAUDIA</text>
        <text x="44" y="31" font-family="sans-serif" font-size="6" fill="#D4AF37" letter-spacing="1">AIRLINES</text>
      </svg>
    `
  },
  {
    id: 'a2',
    name: 'Garuda Indonesia',
    code: 'GA',
    country: 'Indonesia',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#FFF" stroke="#E2E8F0" stroke-width="1"/>
        <path d="M16 16 C 22 12, 28 22, 33 14 C 28 26, 21 24, 16 16 Z" fill="#005A9C"/>
        <path d="M18 19 C 23 16, 27 24, 31 18 C 27 26, 23 25, 18 19 Z" fill="#00A2C9"/>
        <text x="42" y="22" font-family="sans-serif" font-weight="bold" font-size="11" fill="#005A9C">Garuda</text>
        <text x="42" y="30" font-family="sans-serif" font-size="7" fill="#00A2C9" font-weight="700" letter-spacing="1">INDONESIA</text>
      </svg>
    `
  },
  {
    id: 'a3',
    name: 'Emirates',
    code: 'EK',
    country: 'Uni Emirat Arab',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#D71920"/>
        <rect x="12" y="10" width="20" height="20" rx="4" fill="#FFF"/>
        <text x="18" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#D71920">E</text>
        <text x="40" y="25" font-family="Georgia, serif" font-weight="bold" font-size="13" fill="#FFF" letter-spacing="0.5">Emirates</text>
      </svg>
    `
  },
  {
    id: 'a4',
    name: 'Qatar Airways',
    code: 'QR',
    country: 'Qatar',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#5A002C"/>
        <path d="M20 15 L28 20 L20 25 L23 20 Z" fill="#FFF"/>
        <text x="38" y="22" font-family="sans-serif" font-weight="bold" font-size="11" fill="#FFF" letter-spacing="0.5">QATAR</text>
        <text x="38" y="30" font-family="sans-serif" font-size="7" fill="#94A3B8" letter-spacing="1">AIRWAYS</text>
      </svg>
    `
  },
  {
    id: 'a5',
    name: 'Etihad Airways',
    code: 'EY',
    country: 'Uni Emirat Arab',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#FFF" stroke="#E2E8F0" stroke-width="1"/>
        <polygon points="20,13 28,13 32,23 24,23" fill="#D4AF37"/>
        <polygon points="14,20 22,20 25,27 17,27" fill="#8C7853"/>
        <text x="38" y="22" font-family="sans-serif" font-weight="bold" font-size="11" fill="#111" letter-spacing="0.5">ETIHAD</text>
        <text x="38" y="30" font-family="sans-serif" font-size="6" fill="#8C7853" letter-spacing="1">AIRWAYS</text>
      </svg>
    `
  },
  {
    id: 'a6',
    name: 'Batik Air',
    code: 'ID',
    country: 'Indonesia',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#FFF" stroke="#E2E8F0" stroke-width="1"/>
        <rect x="12" y="10" width="20" height="20" rx="4" fill="#7A0026"/>
        <path d="M16 15 L28 25 M28 15 L16 25" stroke="#D4AF37" stroke-width="2"/>
        <text x="40" y="25" font-family="sans-serif" font-weight="bold" font-size="12" fill="#7A0026">Batik Air</text>
      </svg>
    `
  },
  {
    id: 'a7',
    name: 'Lion Air',
    code: 'JT',
    country: 'Indonesia',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#FFF" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="24" cy="20" r="8" fill="#F37021"/>
        <path d="M21 18 L27 20 L21 22 Z" fill="#FFF"/>
        <text x="38" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#E31B23">Lion</text>
        <text x="64" y="24" font-family="sans-serif" font-size="12" fill="#F37021">Air</text>
      </svg>
    `
  },
  {
    id: 'a8',
    name: 'Turkish Airlines',
    code: 'TK',
    country: 'Turki',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
        <rect width="100%" height="100%" rx="8" fill="#1E293B"/>
        <circle cx="24" cy="20" r="8" fill="#E30A17"/>
        <path d="M21 20 L27 18 L25 20 L27 22 Z" fill="#FFF"/>
        <text x="38" y="21" font-family="sans-serif" font-weight="bold" font-size="9" fill="#FFF">TURKISH</text>
        <text x="38" y="29" font-family="sans-serif" font-size="7" fill="#E30A17" letter-spacing="0.5">AIRLINES</text>
      </svg>
    `
  }
];

export const defaultAirlines: Airline[] = defaultAirlinesData.map(item => ({
  id: item.id,
  name: item.name,
  code: item.code,
  country: item.country,
  logo: svgToDataUrl(item.svg.trim())
}));

export const getAirlines = (): Airline[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('nurmina_airlines');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored airlines:', e);
      }
    }
  }
  return defaultAirlines;
};

export const saveAirlines = (updated: Airline[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nurmina_airlines', JSON.stringify(updated));
  }
};
