export type PackageType = 'economy' | 'standard' | 'premium' | 'vip';

export interface Package {
  id: string;
  slug: string;
  name: string;
  type: PackageType;
  provider: string;
  providerRating: number;
  providerReviews: number;
  verified: boolean;
  duration: number;
  durationMakkah: number;
  durationMadinah: number;
  price: number;
  originalPrice?: number;
  departureCity: string[];
  departureDates: string[];
  hotelRating: number;
  hotelMakkah: string;
  hotelMadinah: string;
  airline: string;
  airlineLogo?: string;
  flight: 'direct' | 'transit';

  groupSize: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inclusions: string[];
  exclusions: string[];
  popularTag?: string;
  availableSlots: number;
  itinerary: { day: number; title: string; activities: string[] }[];
  faqs: { question: string; answer: string }[];
  reviews: {
    id: string;
    name: string;
    location: string;
    rating: number;
    date: string;
    comment: string;
    package: string;
  }[];
}

export const packages: Package[] = [
  {
    id: 'p1',
    slug: 'paket-umroh-reguler-9-hari',
    name: 'Paket Umroh Reguler 9 Hari',
    type: 'economy',
    provider: 'Al-Mabrur Travel',
    providerRating: 4.5,
    providerReviews: 312,
    verified: true,
    duration: 9,
    durationMakkah: 6,
    durationMadinah: 3,
    price: 22500000,
    departureCity: ['Jakarta', 'Surabaya'],
    departureDates: ['Januari 2025', 'Februari 2025', 'Maret 2025', 'April 2025'],
    hotelRating: 3,
    hotelMakkah: 'Al-Safwa Hotel',
    hotelMadinah: 'Madinah Hilton',
    airline: 'Saudia Airlines',
    flight: 'direct',
    groupSize: 40,
    rating: 4.4,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop',
    ],
    description: 'Paket Umroh ekonomis dengan fasilitas lengkap. Cocok untuk jamaah yang ingin beribadah dengan nyaman tanpa biaya berlebihan.',
    features: ['Tiket pesawat PP', 'Hotel bintang 3', 'Makan 3x sehari', 'Visa Umroh'],
    inclusions: [
      'Tiket pesawat pulang pergi (PP)',
      'Akomodasi hotel bintang 3',
      'Konsumsi 3x sehari (full board)',
      'Visa Umroh',
      'Transportasi selama di Tanah Suci',
      'Panduan mutawwif berbahasa Indonesia',
      'Perlengkapan Umroh (kain ihram, buku doa)',
      'Asuransi perjalanan',
    ],
    exclusions: ['Pengeluaran pribadi', 'Laundry', 'Oleh-oleh', 'Upgrade kamar'],
    popularTag: 'Paling Terjangkau',
    availableSlots: 12,
    itinerary: [
      { day: 1, title: 'Keberangkatan dari Indonesia', activities: ['Check-in bandara', 'Penerbangan ke Madinah', 'Tiba di Madinah, transfer hotel'] },
      { day: 2, title: 'Ziarah Madinah', activities: ['Sholat Subuh di Masjid Nabawi', 'Ziarah Raudhah', 'Ziarah makam Rasulullah', 'Istirahat'] },
      { day: 3, title: 'Madinah - Ziarah Lanjutan', activities: ['Masjid Quba (masjid pertama)', 'Masjid Qiblatayn', 'Jabal Uhud', 'Pasar kurma'] },
      { day: 4, title: 'Perjalanan ke Mekkah', activities: ['Setelah subuh berangkat ke Mekkah', 'Miqot di Bir Ali', 'Tiba di Mekkah, check-in hotel', 'Umroh pertama'] },
      { day: 5, title: 'Ibadah di Mekkah', activities: ['Sholat di Masjidil Haram', 'Tawaf sunnah', 'Sai dan tahalul', 'Istirahat'] },
      { day: 6, title: 'Ziarah Mekkah', activities: ['Jabal Rahmah', 'Jabal Nur (Gua Hira)', 'Jabal Tsur', 'Arafah'] },
      { day: 7, title: 'Ibadah Bebas di Mekkah', activities: ['Tawaf dan sai', 'Berdoa di Multazam', 'Istirahat dan persiapan pulang'] },
      { day: 8, title: 'Hari Terakhir di Mekkah', activities: ['Tawaf Wada\'', 'Check-out hotel', 'Perjalanan ke bandara Jeddah'] },
      { day: 9, title: 'Kepulangan ke Indonesia', activities: ['Penerbangan ke Indonesia', 'Tiba di Indonesia', 'Alhamdulillah, selesai'] },
    ],
    faqs: [
      { question: 'Dokumen apa saja yang diperlukan?', answer: 'Paspor dengan masa berlaku minimal 6 bulan, foto terbaru, KTP, dan buku nikah/akta lahir.' },
      { question: 'Bagaimana kebijakan pembatalan?', answer: 'Pembatalan 60+ hari sebelum keberangkatan: refund 80%. 30-60 hari: refund 50%. Kurang dari 30 hari: tidak ada refund.' },
      { question: 'Apakah bisa kustomisasi paket?', answer: 'Ya, kami menyediakan opsi upgrade hotel, penambahan durasi, dan aktivitas tambahan dengan biaya terpisah.' },
      { question: 'Bagaimana sistem pembayaran?', answer: 'DP 30% saat booking, pelunasan 60 hari sebelum keberangkatan. Tersedia opsi cicilan.' },
    ],
    reviews: [
      { id: 'r1', name: 'Ahmad Fauzi', location: 'Jakarta', rating: 5, date: 'Desember 2024', comment: 'Alhamdulillah, perjalanan sangat lancar. Mutawwif sangat berpengalaman dan sabar membimbing jamaah.', package: 'Paket Umroh Reguler 9 Hari' },
      { id: 'r2', name: 'Siti Rahmah', location: 'Bekasi', rating: 4, date: 'November 2024', comment: 'Pelayanan bagus, hotel nyaman untuk kelas ekonomi. Makanan sesuai selera Indonesia.', package: 'Paket Umroh Reguler 9 Hari' },
    ],
  },
  {
    id: 'p2',
    slug: 'paket-umroh-standar-12-hari',
    name: 'Paket Umroh Standar 12 Hari',
    type: 'standard',
    provider: 'Baitullah Tour & Travel',
    providerRating: 4.7,
    providerReviews: 540,
    verified: true,
    duration: 12,
    durationMakkah: 8,
    durationMadinah: 4,
    price: 29900000,
    originalPrice: 32000000,
    departureCity: ['Jakarta', 'Surabaya', 'Bandung', 'Medan'],
    departureDates: ['Januari 2025', 'Februari 2025', 'Maret 2025'],
    hotelRating: 4,
    hotelMakkah: 'Pullman Zamzam',
    hotelMadinah: 'Anwar Al-Madinah',
    airline: 'Garuda Indonesia',
    flight: 'direct',
    groupSize: 35,
    rating: 4.7,
    reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop',
    ],
    description: 'Paket Umroh standar dengan hotel bintang 4, makanan halal berkualitas, dan waktu ibadah yang lebih leluasa. Pilihan terbaik untuk keluarga.',
    features: ['Hotel bintang 4', 'Garuda Indonesia', 'Waktu ibadah leluasa', 'Ziarah lengkap'],
    inclusions: [
      'Tiket pesawat Garuda Indonesia PP',
      'Hotel bintang 4 di Mekkah dan Madinah',
      'Konsumsi 3x sehari buffet',
      'Visa Umroh',
      'City tour Mekkah & Madinah',
      'Panduan senior mutawwif',
      'Perlengkapan Umroh premium',
      'Asuransi jiwa dan kesehatan',
      'Wifi portable',
    ],
    exclusions: ['Pengeluaran pribadi', 'Oleh-oleh', 'Biaya kelebihan bagasi'],
    popularTag: 'Terlaris',
    availableSlots: 8,
    itinerary: [
      { day: 1, title: 'Keberangkatan', activities: ['Kumpul di bandara Soekarno-Hatta', 'Penerbangan langsung ke Madinah', 'Tiba Madinah, check-in hotel'] },
      { day: 2, title: 'Ziarah Madinah I', activities: ['Masjid Nabawi', 'Raudhah', 'Makam Baqi'] },
      { day: 3, title: 'Ziarah Madinah II', activities: ['Masjid Quba', 'Masjid Qiblatayn', 'Jabal Uhud', 'Percetakan Al-Quran'] },
      { day: 4, title: 'Ziarah Madinah III', activities: ['Masjid Ghamama', 'Masjid Abu Bakar', 'Pasar kurma Madinah', 'Persiapan ke Mekkah'] },
      { day: 5, title: 'Berangkat ke Mekkah & Umroh', activities: ['Miqot di Bir Ali', 'Tiba Mekkah check-in hotel', 'Umroh perdana: Tawaf, Sai, Tahalul'] },
      { day: 6, title: 'Ibadah di Masjidil Haram', activities: ['Sholat 5 waktu di Masjidil Haram', 'Tawaf sunnah', 'Berdoa di Multazam'] },
      { day: 7, title: 'Ziarah Mekkah I', activities: ['Jabal Rahmah di Arafah', 'Musdalifah', 'Mina', 'Istirahat'] },
      { day: 8, title: 'Ziarah Mekkah II', activities: ['Jabal Nur (Gua Hira)', 'Jabal Tsur', 'Masjid Ji\'ranah'] },
      { day: 9, title: 'Ibadah Bebas', activities: ['Tawaf dan sai tambahan', 'Perbelanjaan di Masjidil Haram Mall', 'Waktu bebas'] },
      { day: 10, title: 'Umroh Kedua (Opsional)', activities: ['Umroh sunnah dari Tan\'im', 'Tawaf wada\'', 'Istirahat'] },
      { day: 11, title: 'Persiapan Pulang', activities: ['Check-out hotel', 'Shopping oleh-oleh', 'Perjalanan ke bandara Jeddah'] },
      { day: 12, title: 'Kepulangan', activities: ['Penerbangan ke Indonesia', 'Tiba Indonesia', 'Alhamdulillah'] },
    ],
    faqs: [
      { question: 'Apakah ada minimal usia?', answer: 'Tidak ada minimal usia, namun untuk anak di bawah 12 tahun disarankan menggunakan paket keluarga.' },
      { question: 'Berapa jarak hotel ke Masjidil Haram?', answer: 'Hotel di Mekkah berjarak 200-500 meter dari Masjidil Haram. Disediakan shuttle bus.' },
    ],
    reviews: [
      { id: 'r3', name: 'Budi Santoso', location: 'Bandung', rating: 5, date: 'Oktober 2024', comment: 'Sangat puas dengan pelayanannya. Hotel dekat dengan Masjidil Haram, mutawwif sabar dan informatif.', package: 'Paket Umroh Standar 12 Hari' },
      { id: 'r4', name: 'Nurul Hidayah', location: 'Surabaya', rating: 5, date: 'September 2024', comment: 'Alhamdulillah pengalaman Umroh pertama saya sangat berkesan. Recommended!', package: 'Paket Umroh Standar 12 Hari' },
    ],
  },
  {
    id: 'p3',
    slug: 'paket-umroh-premium-15-hari',
    name: 'Paket Umroh Premium 15 Hari',
    type: 'premium',
    provider: 'Haramain Nusantara',
    providerRating: 4.9,
    providerReviews: 821,
    verified: true,
    duration: 15,
    durationMakkah: 10,
    durationMadinah: 5,
    price: 42000000,
    departureCity: ['Jakarta', 'Surabaya', 'Makassar', 'Medan'],
    departureDates: ['Februari 2025', 'Maret 2025', 'April 2025', 'Mei 2025'],
    hotelRating: 5,
    hotelMakkah: 'Raffles Makkah Palace',
    hotelMadinah: 'Oberoi Madinah',
    airline: 'Garuda Indonesia',
    flight: 'direct',
    groupSize: 25,
    rating: 4.9,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
    ],
    description: 'Paket premium dengan hotel bintang 5 terbaik, pengalaman ibadah yang tak terlupakan, dan layanan personal advisor selama perjalanan.',
    features: ['Hotel bintang 5', 'Pemandu pribadi', 'Ziarah eksklusif', 'Layanan premium'],
    inclusions: [
      'Tiket business class Garuda Indonesia PP',
      'Hotel bintang 5 Raffles Makkah Palace',
      'Hotel bintang 5 Oberoi Madinah',
      'Konsumsi premium 3x sehari + snack',
      'Visa Umroh express',
      'Private mutawwif (1 per 10 jamaah)',
      'City tour premium Mekkah & Madinah',
      'Perlengkapan Umroh eksklusif',
      'Asuransi jiwa dan kesehatan premium',
      'WiFi dedicated',
      'Airport lounge access',
      'Koper brand premium',
    ],
    exclusions: ['Pengeluaran sangat pribadi'],
    popularTag: 'Premium Choice',
    availableSlots: 5,
    itinerary: [
      { day: 1, title: 'Keberangkatan Business Class', activities: ['VIP check-in', 'Business class lounge', 'Penerbangan langsung ke Madinah'] },
      { day: 2, title: 'Madinah - Masjid Nabawi', activities: ['Sholat Subuh & Zuhur di Masjid Nabawi', 'Ziarah Raudhah dengan panduan khusus', 'Istirahat premium'] },
      { day: 3, title: 'Ziarah Madinah', activities: ['Masjid Quba', 'Jabal Uhud', 'Percetakan Al-Quran terbesar di dunia'] },
      { day: 4, title: 'Madinah - Ibadah', activities: ['I\'tikaf di Masjid Nabawi', 'Kunjungan eksklusif', 'Makan malam special'] },
      { day: 5, title: 'Madinah - Hari Terakhir', activities: ['Perpisahan Masjid Nabawi', 'City tour', 'Persiapan ke Mekkah'] },
      { day: 6, title: 'Miqot & Mekkah', activities: ['Miqot khusus di Dzul Hulaifah', 'Tiba Mekkah check-in Raffles', 'Umroh perdana dengan panduan senior'] },
      { day: 7, title: 'Masjidil Haram', activities: ['Sholat Fajr di Masjidil Haram', 'Tawaf sunnah', 'Kajian spiritual'] },
      { day: 8, title: 'Ziarah Mekkah I', activities: ['Arafah - Jabal Rahmah', 'Musdalifah', 'Mina'] },
      { day: 9, title: 'Ziarah Mekkah II', activities: ['Jabal Nur', 'Jabal Tsur', 'Ji\'ranah'] },
      { day: 10, title: 'Ibadah Pribadi', activities: ['Waktu bebas untuk ibadah', 'Bimbingan doa khusus', 'Waktu personal'] },
      { day: 11, title: 'Ibadah & Refleksi', activities: ['Tawaf dan sai', 'Sesi refleksi spiritual', 'Bincang pengalaman jamaah'] },
      { day: 12, title: 'Umroh Sunnah', activities: ['Umroh dari Ji\'ranah', 'Tawaf wada\'', 'Doa penutup'] },
      { day: 13, title: 'Hari Terakhir Mekkah', activities: ['Shopping eksklusif', 'Farewell dinner', 'Persiapan kepulangan'] },
      { day: 14, title: 'Transfer & Keberangkatan', activities: ['Check-out', 'VIP transfer ke Jeddah', 'Business lounge'] },
      { day: 15, title: 'Kepulangan', activities: ['Business class flight ke Indonesia', 'Tiba dengan selamat', 'Mabrur!'] },
    ],
    faqs: [
      { question: 'Apa yang dimaksud private mutawwif?', answer: 'Satu mutawwif mendampingi maksimal 10 jamaah, memberikan bimbingan personal yang lebih intensif.' },
      { question: 'Apakah kursi business class guaranteed?', answer: 'Ya, kami menjamin kursi business class Garuda Indonesia untuk semua jamaah paket premium.' },
    ],
    reviews: [
      { id: 'r5', name: 'Dr. Hasan Basri', location: 'Jakarta Selatan', rating: 5, date: 'November 2024', comment: 'Pengalaman Umroh terbaik dalam hidup saya. Semua detail diperhatikan, ibadah terasa sangat khusyuk.', package: 'Paket Umroh Premium 15 Hari' },
      { id: 'r6', name: 'Rahayu Indah', location: 'Tangerang', rating: 5, date: 'Oktober 2024', comment: 'Luar biasa! Hotel sangat mewah, pelayanan bintang 5. Worth every rupiah.', package: 'Paket Umroh Premium 15 Hari' },
    ],
  },
  {
    id: 'p4',
    slug: 'paket-umroh-vip-keluarga',
    name: 'Paket Umroh VIP Keluarga',
    type: 'vip',
    provider: 'Zamzam Internasional',
    providerRating: 4.8,
    providerReviews: 390,
    verified: true,
    duration: 15,
    durationMakkah: 10,
    durationMadinah: 5,
    price: 58000000,
    departureCity: ['Jakarta', 'Surabaya'],
    departureDates: ['Maret 2025', 'April 2025', 'Mei 2025'],
    hotelRating: 5,
    hotelMakkah: 'Makkah Clock Royal Tower',
    hotelMadinah: 'Madinah Hilton',
    airline: 'Garuda Indonesia',
    flight: 'direct',
    groupSize: 15,
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
    ],
    description: 'Paket eksklusif VIP untuk keluarga dengan layanan personal terbaik, kamar suite, dan itinerary yang disesuaikan sepenuhnya.',
    features: ['Suite room', 'Layanan personal 24/7', 'Itinerary kustom', 'Khusus keluarga'],
    inclusions: [
      'Tiket bisnis class untuk seluruh keluarga',
      'Suite room di Makkah Clock Royal Tower',
      'Kamar twin/family di Madinah Hilton',
      'Konsumsi premium tanpa batas',
      'Personal concierge 24/7',
      'Private vehicle eksklusif',
      'Senior mutawwif pribadi',
      'Dokumentasi profesional (foto & video)',
      'Perlengkapan premium untuk semua anggota',
      'Medical kit + dokter pendamping',
    ],
    exclusions: ['Biaya pribadi di luar program'],
    popularTag: 'Eksklusif',
    availableSlots: 3,
    itinerary: [
      { day: 1, title: 'Keberangkatan VIP', activities: ['Private check-in', 'Business lounge eksklusif', 'Penerbangan bisnis ke Madinah'] },
      { day: 2, title: 'Madinah Premium', activities: ['Welcome dinner', 'Briefing ibadah', 'Istirahat di suite room'] },
    ],
    faqs: [
      { question: 'Berapa jumlah anggota keluarga maksimal?', answer: 'Paket ini ideal untuk keluarga 2-6 orang. Untuk lebih dari 6 orang, hubungi kami untuk paket khusus.' },
    ],
    reviews: [
      { id: 'r7', name: 'Keluarga Hidayat', location: 'Jakarta Pusat', rating: 5, date: 'Oktober 2024', comment: 'Pengalaman tak terlupakan untuk seluruh keluarga. Anak-anak pun menikmati ibadah ini. Jazakallah!', package: 'Paket Umroh VIP Keluarga' },
    ],
  },
  {
    id: 'p5',
    slug: 'paket-umroh-plus-wisata-12-hari',
    name: 'Paket Umroh + Wisata 12 Hari',
    type: 'standard',
    provider: 'Baitullah Tour & Travel',
    providerRating: 4.7,
    providerReviews: 540,
    verified: true,
    duration: 12,
    durationMakkah: 7,
    durationMadinah: 4,
    price: 34500000,
    departureCity: ['Jakarta', 'Bandung', 'Yogyakarta'],
    departureDates: ['Februari 2025', 'April 2025', 'Juni 2025'],
    hotelRating: 4,
    hotelMakkah: 'Le Meridien Makkah',
    hotelMadinah: 'Anwar Al-Madinah',
    airline: 'Batik Air',
    flight: 'transit',
    groupSize: 30,
    rating: 4.6,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1605389476569-42b78dc92f7a?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605389476569-42b78dc92f7a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597843797221-a83d4a821e25?w=800&auto=format&fit=crop',
    ],
    description: 'Kombinasi sempurna antara ibadah Umroh dan wisata Islami. Kunjungi tempat-tempat bersejarah yang menambah keimanan dan wawasan.',
    features: ['Umroh + wisata Islami', 'Hotel bintang 4', 'City tour eksklusif', 'Pemandu sejarah'],
    inclusions: [
      'Tiket pesawat PP',
      'Hotel bintang 4',
      'Konsumsi 3x sehari',
      'Visa Umroh',
      'City tour Jeddah & Thaif',
      'Museum sejarah Islam',
      'Panduan sejarah Islami',
      'Perlengkapan Umroh',
      'Asuransi perjalanan',
    ],
    exclusions: ['Pengeluaran pribadi', 'Oleh-oleh', 'Aktivitas di luar program'],
    availableSlots: 15,
    itinerary: [
      { day: 1, title: 'Keberangkatan', activities: ['Check-in bandara', 'Penerbangan ke Madinah'] },
      { day: 2, title: 'Madinah', activities: ['Masjid Nabawi', 'Raudhah'] },
    ],
    faqs: [],
    reviews: [
      { id: 'r8', name: 'Fatimah Zahra', location: 'Yogyakarta', rating: 5, date: 'November 2024', comment: 'Paket wisata plus Umroh sangat memuaskan. Sangat berkesan mengunjungi tempat-tempat bersejarah Islam.', package: 'Paket Umroh + Wisata 12 Hari' },
    ],
  },
  {
    id: 'p6',
    slug: 'paket-umroh-ramadhan-15-hari',
    name: 'Paket Umroh Ramadhan 15 Hari',
    type: 'premium',
    provider: 'Haramain Nusantara',
    providerRating: 4.9,
    providerReviews: 821,
    verified: true,
    duration: 15,
    durationMakkah: 10,
    durationMadinah: 5,
    price: 55000000,
    originalPrice: 60000000,
    departureCity: ['Jakarta', 'Surabaya', 'Makassar'],
    departureDates: ['Ramadhan 2025 (Maret)'],
    hotelRating: 5,
    hotelMakkah: 'Swissotel Al-Maqam',
    hotelMadinah: 'Anber Al-Madinah',
    airline: 'Garuda Indonesia',
    flight: 'direct',
    groupSize: 30,
    rating: 4.9,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1628134785735-427cc7f0a8d1?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1628134785735-427cc7f0a8d1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&auto=format&fit=crop',
    ],
    description: 'Rasakan keistimewaan ibadah Umroh di bulan suci Ramadhan. Pahala berlipat ganda, suasana spiritual yang tiada duanya.',
    features: ['Umroh bulan Ramadhan', 'Hotel premium', 'Iftar & sahur bersama', 'Tarawih di Masjidil Haram'],
    inclusions: [
      'Tiket pesawat Garuda PP',
      'Hotel bintang 5 view Masjidil Haram',
      'Iftar dan sahur',
      'Paket makan spesial Ramadhan',
      'Visa Umroh',
      'Tarawih di Masjidil Haram',
      'Tadarus bersama ustadz',
      'Panduan mutawwif senior',
      'Perlengkapan Umroh premium',
      'Asuransi premium',
    ],
    exclusions: ['Pengeluaran pribadi'],
    popularTag: 'Ramadhan Special',
    availableSlots: 4,
    itinerary: [],
    faqs: [],
    reviews: [
      { id: 'r9', name: 'Ustadz Ridwan', location: 'Depok', rating: 5, date: 'Ramadhan 2024', comment: 'Subhanallah! Umroh di bulan Ramadhan adalah pengalaman spiritual tertinggi. Sangat direkomendasikan!', package: 'Paket Umroh Ramadhan 15 Hari' },
    ],
  },
];

export const getPackages = (): Package[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('nurmina_packages');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored packages:', e);
      }
    }
  }
  return packages;
};

export const getFeaturedPackages = () => getPackages().slice(0, 4);
export const getPackageBySlug = (slug: string) => getPackages().find(p => p.slug === slug);
export const getRelatedPackages = (pkg: Package) =>
  getPackages().filter(p => p.id !== pkg.id && (p.type === pkg.type || Math.abs(p.duration - pkg.duration) <= 3)).slice(0, 3);

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

