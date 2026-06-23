export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export const defaultBlogs: BlogPost[] = [
  {
    id: 'b1',
    slug: 'panduan-lengkap-umroh-mandiri-vs-travel',
    title: 'Panduan Lengkap Umroh Mandiri vs Travel: Mana yang Terbaik?',
    excerpt: 'Perbandingan detail dari segi biaya, kepraktisan, keamanan, dan fleksibilitas untuk membantu Anda menentukan pilihan terbaik.',
    content: `
# Panduan Lengkap Umroh Mandiri vs Travel: Mana yang Terbaik?

Menunaikan ibadah Umroh adalah impian setiap Muslim. Namun, sebelum berangkat, salah satu keputusan terbesar yang harus diambil adalah apakah Anda sebaiknya menggunakan jasa travel resmi (PPIU) atau mencoba Umroh Mandiri (Backpacker).

Dalam artikel ini, kami akan membedah perbandingan kedua metode ini dari berbagai aspek penting.

## 1. Aspek Biaya
Banyak yang berasumsi bahwa Umroh Mandiri jauh lebih murah. Kenyataannya, hal ini tidak selalu benar. Travel Umroh memiliki daya tawar kelompok besar (group booking) untuk tiket pesawat dan kamar hotel, sehingga seringkali mendapatkan harga yang lebih murah daripada individu yang memesan eceran.
- **Travel Umroh**: Biaya paket sudah *all-in* (termasuk visa, mutawwif, makan, bus, perlengkapan).
- **Umroh Mandiri**: Anda harus memesan tiket pesawat, hotel, visa, dan asuransi secara terpisah. Jika tidak cermat, akumulasi biaya eceran bisa lebih mahal dari paket standar.

## 2. Kemudahan dan Kepraktisan
- **Travel Umroh**: Semua pengurusan dokumen (visa, tasrekh Raudhah), transportasi bandara-hotel, hingga bimbingan ibadah selama di Makkah dan Madinah ditangani oleh travel. Sangat ramah untuk lansia dan pemula.
- **Umroh Mandiri**: Anda harus menavigasi transportasi lokal di Arab Saudi (seperti kereta cepat Haramain atau taksi), mengurus visa turis/umroh secara mandiri, dan mengunduh aplikasi Nusuk untuk tasrekh Raudhah secara mandiri.

## 3. Keamanan dan Legalitas
Ibadah Umroh melibatkan aturan imigrasi ketat di Arab Saudi.
- **Travel Umroh**: Menyediakan jaminan perlindungan jika terjadi kendala (sakit, kehilangan dokumen, atau pembatalan jadwal terbang).
- **Umroh Mandiri**: Anda menanggung risiko mandiri. Jika hotel melakukan *overbook* atau paspor hilang, Anda harus menyelesaikannya sendiri tanpa bantuan perwakilan travel.

## Kesimpulan
Jika Anda adalah **traveler berpengalaman** yang mahir berbahasa Inggris/Arab dan menyukai petualangan fleksibel, **Umroh Mandiri** menawarkan kebebasan waktu yang luar biasa. Namun, jika Anda pergi bersama **keluarga, lansia, atau mengutamakan kekhusyukan ibadah** tanpa terdistraksi masalah logistik, menggunakan **Travel Umroh Terpercaya** adalah pilihan paling bijak dan aman.
    `,
    date: '20 Juni 2026',
    author: 'Ustadz Ahmad Fauzi',
    category: 'Panduan',
    image: 'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop',
    readTime: '5 menit baca',
  },
  {
    id: 'b2',
    slug: 'tips-memilih-hotel-terbaik-dekat-masjidil-haram',
    title: 'Tips Memilih Hotel Terbaik Dekat Masjidil Haram Mekkah',
    excerpt: 'Jangan salah pilih hotel! Kenali jarak tempuh nyata, akses kursi roda, serta fasilitas sarapan untuk kekhusyukan ibadah Anda.',
    content: `
# Tips Memilih Hotel Terbaik Dekat Masjidil Haram Mekkah

Memilih akomodasi di Makkah adalah faktor krusial yang menentukan kenyamanan ibadah fisik Anda. Jarak di peta seringkali menipu karena adanya blokade jalan, eskalator yang padat, atau kontur jalanan Makkah yang berbukit.

Berikut tips memilih hotel di Makkah agar ibadah Anda tetap prima:

## 1. Pahami Jarak Nyata (Walking Distance)
Banyak hotel mengklaim berjarak "100 meter dari Masjidil Haram". Namun, tanyakan kembali: *apakah itu jarak ke halaman luar masjid atau ke pintu masuk utama (Gate)?*
- Halaman Masjidil Haram sangat luas. Berjalan dari halaman luar ke area Tawaf (Mataf) bisa memakan waktu 10-15 menit tersendiri.
- Pilihlah hotel di sektor **Abraj Al-Bait (Clock Tower)** atau **Jabal Omar** jika Anda menginginkan akses langsung tanpa berjalan jauh di terik matahari.

## 2. Cek Akses Kursi Roda dan Elevator
Bagi jamaah yang membawa orang tua atau lansia, akses tanpa anak tangga (*step-free access*) sangat penting.
- Sektor Clock Tower memiliki lift penghubung langsung ke halaman masjid.
- Beberapa hotel di area Syisyah atau Mahbas Jin memerlukan transportasi shuttle bus. Meskipun murah, mengantre shuttle bus di musim padat (seperti Ramadhan) sangat melelahkan bagi lansia.

## 3. Pertimbangkan Paket Makanan (Full Board vs Half Board)
- **Full Board (Makan 3x sehari)**: Sangat praktis karena Anda tidak perlu membuang waktu mengantre di food court luar yang padat setelah sholat.
- **Tanpa Makan**: Memberi kebebasan kuliner, namun bisa memotong waktu istirahat Anda karena harus mencari makan di tengah kerumunan massa.

Ibadah Umroh membutuhkan stamina fisik yang tinggi. Memilih hotel yang tepat adalah bentuk ikhtiar terbaik agar energi Anda terfokus sepenuhnya pada ibadah, bukan logistik harian.
    `,
    date: '18 Juni 2026',
    author: 'Hj. Fatimah Az-Zahra',
    category: 'Tips & Trik',
    image: 'https://images.unsplash.com/photo-1564769610621-a25e8f70d3d0?w=800&auto=format&fit=crop',
    readTime: '4 menit baca',
  },
];

export const getBlogs = (): BlogPost[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('nurmina_blogs');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored blogs:', e);
      }
    }
  }
  return defaultBlogs;
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return getBlogs().find(b => b.slug === slug);
};
