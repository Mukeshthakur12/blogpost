import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import BackgroundEffects from '@/components/background-effects';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appzyra - Latest Tech Reviews & Guides',
  description: 'Your destination for tech reviews, buying guides, and latest news.',
  keywords: ['tech reviews', 'buying guides', 'technology news', 'gadget reviews'],
  authors: [{ name: 'Appzyra Team' }],

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.appzyra.com',
    siteName: 'Appzyra',
    title: 'Appzyra - Latest Tech Reviews & Guides',
    description: 'Your destination for tech reviews, buying guides, and latest news.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Appzyra' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appzyra - Latest Tech Reviews & Guides',
    description: 'Your destination for tech reviews, buying guides, and latest news.',
    images: ['/og-image.jpg'],
  },
  // Ensure correct absolute URLs for Open Graph/Twitter images in dev
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE ?? 'http://localhost:3000'),
};

import { prisma } from '@/lib/prisma';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: { id: string; name: string; slug: string }[] = [];
  try {
    categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true },
      take: 3,
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch categories for navbar:', error);
  }

  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${inter.className} bg-mesh selection:bg-primary/30`}>
        <Script id="swg-basic-init" strategy="beforeInteractive">
          {`(self.SWG_BASIC = self.SWG_BASIC || []).push(function (basicSubscriptions) {
            basicSubscriptions.init({
              type: "NewsArticle",
              isPartOfType: ["Product"],
              isPartOfProductId: "CAowwIvGDA:openaccess",
              clientOptions: { theme: "light", lang: "en" },
            });
          });`}
        </Script>
        <Script
          id="swg-basic-loader"
          src="https://news.google.com/swg/js/v1/swg-basic.js"
          strategy="afterInteractive"
        />
        <BackgroundEffects />
        <div className="flex min-h-screen flex-col relative">
          <Navbar categories={categories} />
          <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
