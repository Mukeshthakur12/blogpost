import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import BackgroundEffects from '@/components/background-effects';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechBlog - Latest Tech Reviews & Guides',
  description: 'Your destination for tech reviews, buying guides, and latest news.',
  keywords: ['tech reviews', 'buying guides', 'technology news', 'gadget reviews'],
  authors: [{ name: 'TechBlog Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techblog.com',
    siteName: 'TechBlog',
    title: 'TechBlog - Latest Tech Reviews & Guides',
    description: 'Your destination for tech reviews, buying guides, and latest news.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TechBlog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechBlog - Latest Tech Reviews & Guides',
    description: 'Your destination for tech reviews, buying guides, and latest news.',
    images: ['/og-image.jpg'],
  },
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
      <body className={`${inter.className} bg-mesh selection:bg-primary/30`}>
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
