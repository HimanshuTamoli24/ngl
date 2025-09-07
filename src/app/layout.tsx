import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from '../context/AuthProvider';
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/customui/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Askly - Fun Anonymous Text Messages & Entertainment",
    template: "%s | Askly"
  },
  description: "Askly is the ultimate fun platform for sending anonymous text messages! Share secrets, ask questions, and have entertaining conversations without revealing your identity. Join the fun!",
  keywords: [
    "askly",
    "anonymous text messages",
    "fun messages",
    "entertainment",
    "secret questions",
    "anonymous chat",
    "fun platform",
    "text messages",
    "anonymous fun",
    "entertainment platform"
  ],
  authors: [{ name: "HimanshuTamoli" }],
  creator: "HimanshuTamoli",
  publisher: "Askly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.asklyy.tech'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Askly - Fun Anonymous Text Messages & Entertainment",
    description: "Askly is the ultimate fun platform for sending anonymous text messages! Share secrets, ask questions, and have entertaining conversations without revealing your identity.",
    url: 'https://www.asklyy.tech',
    siteName: 'Askly',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Askly Platform - Fun Anonymous Text Messages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Askly - Fun Anonymous Text Messages & Entertainment",
    description: "Askly is the ultimate fun platform for sending anonymous text messages! Share secrets, ask questions, and have entertaining conversations without revealing your identity.",
    images: ['/twitter-image.jpg'], 
    creator: '@imarnav24', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'f77e52de381134a4', 
  },
};
import { Archivo_Black, Space_Grotesk } from "next/font/google";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <head>
        <script async defer data-website-id="366ef9fd-41fb-43b0-815d-01f5d7a4f125" src="https://cloud.umami.is/umami.js"></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Askly",
              "description": "Askly is the ultimate fun platform for sending anonymous text messages! Share secrets, ask questions, and have entertaining conversations without revealing your identity.",
              "url": "https://www.asklyy.tech",
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Person",
                "name": "HimanshuTamoli"
              }
            })
          }}
        />
      </head>
      <AuthProvider>
        <body className={`${archivoBlack.variable} ${space.variable}`}>
          <Navbar />

          <main>
            {children}
          </main>

          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
