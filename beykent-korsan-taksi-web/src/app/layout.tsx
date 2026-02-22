import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Added Outfit
import { SITE_CONFIG } from "@/lib/constants"; // Added SITE_CONFIG import
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SchemaMarkup from "@/components/SchemaMarkup";
import Script from "next/script"; // Added Script import

const inter = Inter({
  variable: "--font-inter", // Changed variable name
  subsets: ["latin"],
  // display: "swap", // Removed display swap
});

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" }); // Added Outfit font

export const metadata: Metadata = {
  metadataBase: new URL("https://www.beykentkorsantaksi.com"),
  title: {
    default: "Beykent Korsan Taksi | 7/24 Beylikdüzü Korsan Taksi Hizmeti",
    template: "%s | Beykent Korsan Taksi",
  },
  description:
    "Beylikdüzü ve Beykent korsan taksi hizmeti. Sabit fiyat, 7/24 ulaşım, konforlu araçlar. 2014'ten beri güvenilir hizmet. Hemen Ara: 0545 457 27 00",
  keywords: [
    "beylikdüzü korsan taksi",
    "beykent korsan taksi",
    "yakuplu korsan taksi",
    "esenyurt korsan taksi",
    "gürpınar korsan taksi",
    "korsan taksi beylikdüzü",
    "ucuz taksi beylikdüzü",
    "beylikdüzü taksi",
    "havalimanı transfer beylikdüzü",
  ],
  authors: [{ name: "Beykent Korsan Taksi" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.beykentkorsantaksi.com",
    siteName: "Beykent Korsan Taksi",
    title: "Beykent Korsan Taksi | 7/24 Beylikdüzü Korsan Taksi Hizmeti",
    description:
      "Beylikdüzü ve Beykent korsan taksi hizmeti. Sabit fiyat, 7/24 ulaşım, konforlu araçlar. Hemen Ara: 0545 457 27 00",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beykent Korsan Taksi | 7/24 Hizmet",
    description:
      "Beylikdüzü korsan taksi hizmeti. Sabit fiyat, güvenilir, konforlu.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.beykentkorsantaksi.com",
  },
  verification: {
    // Google Search Console verification — user will add their code
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="antialiased">
        <SchemaMarkup />
        {/* Google Analytics Placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        )}
        {/* Global Background Effects for Glassmorphism */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--color-bg-primary)]">
          {/* Top-left blue glow */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[120px] opacity-20" style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.8), transparent)" }} />
          {/* Bottom-right gold glow */}
          <div className="absolute top-1/2 -right-40 w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15]" style={{ background: "linear-gradient(135deg, var(--color-gold), transparent)" }} />
          {/* Bottom-left purple/dark glow */}
          <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15]" style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }} />
        </div>

        <Header />
        <main className="relative z-0">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
