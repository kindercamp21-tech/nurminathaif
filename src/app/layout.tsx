import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NurminaThaifTour - Umroh yang Sesuai untuk Anda",
  description:
    "Temukan paket Umroh yang dipersonalisasi sesuai kebutuhan, anggaran, dan preferensi ibadah Anda. Harga transparan, provider terverifikasi.",
  keywords: ["paket umroh", "travel umroh", "biaya umroh", "persiapan umroh", "nurminathaiftour"],
  openGraph: {
    title: "NurminaThaifTour - Umroh yang Sesuai untuk Anda",
    description: "Platform personalisasi Umroh terpercaya di Indonesia. Temukan paket yang sesuai dengan kebutuhan dan anggaran Anda.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body style={{ fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)' }}>{children}</body>
    </html>
  );
}
