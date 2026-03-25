import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.SITE_URL || 'https://blog.appzyra.com';

    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });

        const categories = await prisma.category.findMany({
            select: { slug: true },
        });

        const postUrls = posts.map((post) => ({
            url: `${baseUrl}/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        const categoryUrls = categories.map((cat) => ({
            url: `${baseUrl}/category/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        const staticPages = [
            { url: baseUrl, priority: 1.0, freq: 'daily' },
            { url: `${baseUrl}/contact`, priority: 0.5, freq: 'monthly' },
            { url: `${baseUrl}/affiliate-disclosure`, priority: 0.3, freq: 'monthly' },
            { url: `${baseUrl}/privacy-policy`, priority: 0.3, freq: 'yearly' },
            { url: `${baseUrl}/terms-conditions`, priority: 0.3, freq: 'yearly' },
        ].map((page) => ({
            url: page.url,
            lastModified: new Date(),
            changeFrequency: page.freq as any,
            priority: page.priority,
        }));

        return [...staticPages, ...categoryUrls, ...postUrls];
    } catch (e) {
        console.error("Sitemap generation failed:", e);
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            }
        ];
    }
}
