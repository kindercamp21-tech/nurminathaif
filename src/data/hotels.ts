export interface Hotel {
  id: string;
  name: string;
  city: 'Makkah' | 'Madinah';
  rating: number; // star rating (3, 4, 5)
  image: string; // URL
  description: string;
  address: string;
}

export const defaultHotels: Hotel[] = [
  // Makkah Hotels
  {
    id: 'h1',
    name: 'Swissotel Al-Maqam',
    city: 'Makkah',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop',
    description: 'Hotel mewah bintang 5 yang terletak di Kompleks Abraj Al Bait, menghadap langsung ke Masjidil Haram. Akses lift langsung memudahkan ibadah keluarga.',
    address: 'Abraj Al Bait, Makkah, Arab Saudi'
  },
  {
    id: 'h2',
    name: 'Pullman Zamzam Makkah',
    city: 'Makkah',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop',
    description: 'Terletak di jantung kota Makkah, menawarkan kamar-kamar yang luas dengan pemandangan Kaabah atau kota, dilengkapi dengan fasilitas modern terbaik.',
    address: 'Abraj Al Bait Complex, Makkah, Arab Saudi'
  },
  {
    id: 'h3',
    name: 'Raffles Makkah Palace',
    city: 'Makkah',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
    description: 'Hotel suite eksklusif dengan pelayanan pelayan pribadi 24 jam. Menyuguhkan pemandangan Masjidil Haram yang menakjubkan bagi kenyamanan tingkat tinggi.',
    address: 'Jabal Omar, Ibrahim Al Khalil St, Makkah, Arab Saudi'
  },
  {
    id: 'h4',
    name: 'Makkah Clock Royal Tower',
    city: 'Makkah',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
    description: 'Salah satu hotel tertinggi di dunia yang berada tepat di bawah menara jam ikonik Makkah. Menyediakan pelayanan kelas dunia dan restoran internasional mewah.',
    address: 'Abraj Al Bait, King Abdul Aziz Gate, Makkah, Arab Saudi'
  },
  {
    id: 'h5',
    name: 'Le Meridien Makkah',
    city: 'Makkah',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    description: 'Hotel bintang 4 yang nyaman dengan nuansa artistik modern. Menyediakan akses mudah ke gerbang King Abdul Aziz Masjidil Haram.',
    address: 'Kudai Road, Makkah, Arab Saudi'
  },
  {
    id: 'h6',
    name: 'Al-Safwa Hotel',
    city: 'Makkah',
    rating: 3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    description: 'Hotel bintang 3 pilihan utama untuk kelas ekonomi yang terletak sangat dekat dengan pintu masuk Masjidil Haram. Sangat mengutamakan kepraktisan.',
    address: 'Ajyad Street, Makkah, Arab Saudi'
  },
  // Madinah Hotels
  {
    id: 'h7',
    name: 'Madinah Hilton',
    city: 'Madinah',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
    description: 'Terletak hanya beberapa langkah dari Masjid Nabawi di distrik perbelanjaan utama Madinah. Menawarkan akomodasi bintang 5 yang anggun dan luas.',
    address: 'King Fahd Street, Madinah, Arab Saudi'
  },
  {
    id: 'h8',
    name: 'Anwar Al-Madinah Mövenpick',
    city: 'Madinah',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop',
    description: 'Hotel terbesar di Madinah dengan fasilitas lengkap, terhubung langsung dengan pusat perbelanjaan dan berjarak sangat dekat ke gerbang utama Masjid Nabawi.',
    address: 'Saad Bin Abi Waqas Street, Northern Central Area, Madinah, Arab Saudi'
  },
  {
    id: 'h9',
    name: 'Oberoi Madinah',
    city: 'Madinah',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop',
    description: 'Menawarkan kemewahan mutlak dan keramahan legendaris. Berlokasi ideal di sebelah Masjid Nabawi dengan interior klasik bergaya Islam.',
    address: 'Abizar Road, Central Area, Madinah, Arab Saudi'
  },
  {
    id: 'h10',
    name: 'Anber Al-Madinah',
    city: 'Madinah',
    rating: 3,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
    description: 'Hotel bintang 3 yang bersih, tenang, dan bersahabat di kantong. Cocok bagi jamaah yang mendambakan kenyamanan istirahat setelah ibadah di Nabawi.',
    address: 'Central Area, Madinah, Arab Saudi'
  }
];

export const getHotels = (): Hotel[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('nurmina_hotels');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored hotels:', e);
      }
    }
  }
  return defaultHotels;
};

export const saveHotels = (updated: Hotel[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nurmina_hotels', JSON.stringify(updated));
  }
};
