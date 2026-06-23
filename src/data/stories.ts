export interface Story {
  id: string;
  slug: string;
  name: string;
  location: string;
  photo: string;
  travelDate: string;
  packageUsed: string;
  packageType: 'economy' | 'standard' | 'premium' | 'vip';
  rating: number;
  excerpt: string;
  content: string;
  images: string[];
  helpfulVotes: number;
  featured?: boolean;
}

export const stories: Story[] = [
  {
    id: 's1',
    slug: 'perjalanan-umroh-pertama-ahmad',
    name: 'Ahmad Fauzi',
    location: 'Jakarta Timur',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    travelDate: 'Desember 2024',
    packageUsed: 'Paket Umroh Standar 12 Hari',
    packageType: 'standard',
    rating: 5,
    excerpt: 'Alhamdulillah, mimpi saya akhirnya terwujud. Perjalanan Umroh pertama ini menjadi momen paling bermakna dalam hidup saya.',
    content: `Saya sudah bermimpi untuk berangkat Umroh sejak lama, namun selalu bingung memilih paket yang tepat. Ketika menemukan NurminaThaifTour, saya merasa menemukan panduan yang saya butuhkan.

Proses assessment membantu saya memahami kebutuhan dan anggaran. Tim advisor sangat sabar menjelaskan setiap detail paket. Akhirnya saya memilih Paket Umroh Standar 12 Hari karena sesuai budget dan ekspektasi saya.

Pengalaman di Tanah Suci luar biasa. Mutawwif kami, Ustadz Salim, sangat berpengalaman dan sabar membimbing jamaah. Beliau menjelaskan setiap ibadah dengan detail sehingga kami bisa melaksanakannya dengan khusyuk.

Hotel di Mekkah berjarak 300 meter dari Masjidil Haram, sangat nyaman untuk bolak-balik sholat. Di Madinah, hotel juga dekat dengan Masjid Nabawi.

Satu momen yang paling berkesan adalah saat tawaf di malam hari. Melihat Ka'bah langsung di depan mata, hati saya dipenuhi rasa syukur yang luar biasa. Air mata mengalir tanpa henti.

Terima kasih NurminaThaifTour! Insya Allah saya akan kembali lagi untuk Umroh berikutnya.`,
    images: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
    ],
    helpfulVotes: 47,
    featured: true,
  },
  {
    id: 's2',
    slug: 'umroh-bersama-keluarga-budi',
    name: 'Budi Santoso & Keluarga',
    location: 'Bandung',
    photo: 'https://randomuser.me/api/portraits/men/44.jpg',
    travelDate: 'Oktober 2024',
    packageUsed: 'Paket Umroh VIP Keluarga',
    packageType: 'vip',
    rating: 5,
    excerpt: 'Membawa seluruh keluarga beribadah Umroh adalah pencapaian terbesar kami. Anak-anak pun bisa memahami makna ibadah ini.',
    content: `Kami pergi berlima: saya, istri, dan tiga anak (12, 15, dan 18 tahun). Memilih paket yang tepat untuk keluarga sangat penting, dan Paket VIP Keluarga menjawab semua kebutuhan kami.

Fasilitas suite room memungkinkan keluarga kami tidur bersama dengan nyaman. Personal concierge selalu siap membantu, bahkan untuk hal-hal kecil seperti menyiapkan menu makanan untuk anak-anak.

Anak-anak awalnya sedikit khawatir karena perjalanan jauh, namun begitu melihat Ka'bah, mereka langsung terpesona. Momen itu tidak bisa tergantikan dengan apapun.

Mutawwif kami sangat baik dalam menjelaskan sejarah kepada anak-anak dengan bahasa yang mudah dipahami. Anak saya yang 12 tahun bahkan hapal cerita tentang Nabi Ibrahim setelah kunjungan.

Investasi terbaik untuk keluarga kami!`,
    images: ['https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop'],
    helpfulVotes: 38,
    featured: false,
  },
  {
    id: 's3',
    slug: 'umroh-perdana-nurul',
    name: 'Nurul Hidayah',
    location: 'Surabaya',
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
    travelDate: 'September 2024',
    packageUsed: 'Paket Umroh Reguler 9 Hari',
    packageType: 'economy',
    rating: 5,
    excerpt: 'Sebagai wanita yang berangkat sendiri, saya sempat ragu. Tapi NurminaThaifTour membuat saya merasa aman dan terlindungi sepanjang perjalanan.',
    content: `Awalnya saya sangat ragu untuk berangkat Umroh sendirian sebagai wanita. Namun tim NurminaThaifTour sangat membantu dan memberikan rasa aman.

Mereka memastikan saya bergabung dengan kelompok yang tepat, dengan mahram yang sudah diatur. Mutawwif wanita juga tersedia untuk mendampingi jamaah wanita.

Paket Reguler 9 Hari sangat worth it untuk saya. Meskipun ekonomi, fasilitas cukup memadai dan pelayanan sangat baik. Saya tidak merasa kekurangan apapun.

Pengalaman beribadah di Masjidil Haram dan Masjid Nabawi adalah sesuatu yang tidak bisa digambarkan dengan kata-kata. Setiap sholat terasa sangat berbeda, penuh kekhusyukan.

Untuk teman-teman wanita yang ingin Umroh, jangan ragu! NurminaThaifTour sangat terpercaya dan profesional.`,
    images: ['https://images.unsplash.com/photo-1597843797221-a83d4a821e25?w=800&auto=format&fit=crop'],
    helpfulVotes: 62,
    featured: false,
  },
  {
    id: 's4',
    slug: 'umroh-premium-dr-hasan',
    name: 'Dr. Hasan Basri',
    location: 'Jakarta Selatan',
    photo: 'https://randomuser.me/api/portraits/men/57.jpg',
    travelDate: 'November 2024',
    packageUsed: 'Paket Umroh Premium 15 Hari',
    packageType: 'premium',
    rating: 5,
    excerpt: 'Sebagai dokter yang sibuk, saya butuh perjalanan yang terorganisir sempurna. Paket Premium melebihi semua ekspektasi saya.',
    content: `Dengan jadwal yang padat, saya butuh perjalanan Umroh yang tidak menambah stress. Paket Premium NurminaThaifTour adalah jawabannya.

Semua detail diurus dengan sempurna. Dari airport handling, visa express, hingga hotel bintang 5 yang langsung menghadap Ka'bah. Saya tidak perlu memikirkan hal teknis apapun.

Sebagai dokter, saya juga mengapresiasi adanya tim medis yang ikut mendampingi. Ini memberikan ketenangan pikiran, terutama untuk jamaah yang lebih sepuh.

Pengalaman 15 hari memberikan waktu yang cukup untuk benar-benar menikmati ibadah tanpa terburu-buru. Saya bisa menyelesaikan banyak doa dan amalan yang selama ini tertunda.

Ini bukan sekedar perjalanan, ini adalah investasi spiritual terbaik dalam hidup saya.`,
    images: ['https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&auto=format&fit=crop'],
    helpfulVotes: 55,
    featured: false,
  },
  {
    id: 's5',
    slug: 'umroh-ramadhan-ustadz-ridwan',
    name: 'Ustadz Ridwan Hakim',
    location: 'Depok',
    photo: 'https://randomuser.me/api/portraits/men/71.jpg',
    travelDate: 'Ramadhan 2024',
    packageUsed: 'Paket Umroh Ramadhan 15 Hari',
    packageType: 'premium',
    rating: 5,
    excerpt: 'Umroh di bulan Ramadhan adalah pengalaman spiritual tertinggi yang pernah saya rasakan. Setiap malam kami tarawih di Masjidil Haram.',
    content: `Sebagai seorang ustadz, saya sudah sering memandu jamaah Umroh. Tapi Umroh di bulan Ramadhan dengan NurminaThaifTour benar-benar berbeda.

Suasana Ramadhan di Masjidil Haram tak tertandingi. Jutaan jamaah dari seluruh dunia berkumpul, semuanya dengan satu tujuan: beribadah kepada Allah SWT.

Program yang disediakan NurminaThaifTour sangat lengkap untuk Ramadhan. Ada kajian tadarus setelah subuh, buka bersama dengan menu yang lezat, dan tentu tarawih 23 rakaat yang sangat berkesan.

Saya sangat merekomendasikan Umroh Ramadhan kepada semua Muslim yang ingin mendapatkan pengalaman spiritual yang mendalam dan berbeda.

Jazakallah khairan kathiran kepada tim NurminaThaifTour yang telah mengorganisir segalanya dengan sangat baik!`,
    images: ['https://images.unsplash.com/photo-1628134785735-427cc7f0a8d1?w=800&auto=format&fit=crop'],
    helpfulVotes: 89,
    featured: false,
  },
  {
    id: 's6',
    slug: 'umroh-pertama-fatimah',
    name: 'Fatimah Zahra',
    location: 'Yogyakarta',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
    travelDate: 'November 2024',
    packageUsed: 'Paket Umroh + Wisata 12 Hari',
    packageType: 'standard',
    rating: 5,
    excerpt: 'Paket wisata plus Umroh sangat memuaskan. Kami bisa beribadah sekaligus menambah wawasan tentang sejarah Islam.',
    content: `Pilihan Paket Umroh + Wisata 12 Hari sangat tepat untuk saya yang juga ingin mendalami sejarah Islam. Selain ibadah Umroh, kami mengunjungi berbagai tempat bersejarah yang sangat menambah keimanan.

Kunjungan ke Jeddah dan Thaif sangat berkesan. Melihat langsung tempat-tempat yang disebutkan dalam Al-Quran dan Hadist memberikan pemahaman yang berbeda.

Panduan sejarah kami sangat berpengetahuan dan bisa menjelaskan dengan bahasa yang mudah dipahami. Setiap tempat yang dikunjungi terasa hidup dengan cerita-ceritanya.

Alhamdulillah, perjalanan ini bukan hanya memperkuat iman, tapi juga memperluas wawasan keislaman saya. Sangat recommended untuk yang ingin Umroh plus wisata islami!`,
    images: ['https://images.unsplash.com/photo-1605389476569-42b78dc92f7a?w=800&auto=format&fit=crop'],
    helpfulVotes: 31,
    featured: false,
  },
];

export const getFeaturedStory = () => stories.find(s => s.featured) || stories[0];
export const getStoryBySlug = (slug: string) => stories.find(s => s.slug === slug);
