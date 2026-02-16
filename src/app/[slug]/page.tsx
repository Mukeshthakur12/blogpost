import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { tags: true, category: true, author: true }
    });

    if (!post) return {};

    const url = `https://techblog.com/${post.slug}`; // Change to your actual domain
    const keywords = post.tags.map(tag => tag.name).join(', ');

    return {
        title: post.seoTitle || post.title,
        description: post.seoDesc || post.excerpt,
        keywords: keywords || undefined,
        authors: [{ name: post.author.name }],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt || undefined,
            type: 'article',
            url: url,
            publishedTime: post.createdAt.toISOString(),
            authors: [post.author.name],
            section: post.category?.name,
            images: post.coverImage ? [{ url: post.coverImage }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || undefined,
            images: post.coverImage ? [post.coverImage] : undefined,
        }
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true, category: true, tags: true },
    });

    if (!post) {
        notFound();
    }

    // Schema Markup
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage ? [post.coverImage] : undefined,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            '@type': 'Person',
            name: post.author.name,
            url: `https://techblog.com/author/${post.author.id}` // Placeholder URL
        },
        publisher: {
            '@type': 'Organization',
            name: 'TechBlog',
            logo: {
                '@type': 'ImageObject',
                url: 'https://techblog.com/logo.png' // Placeholder URL
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://techblog.com/${post.slug}`
        },
        keywords: post.tags.map(t => t.name).join(', ')
    };

    // Fetch related posts (simple logic: same category)
    const relatedPosts = post.categoryId ? await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            id: { not: post.id },
            published: true
        },
        take: 3
    }) : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="lg:col-span-3 space-y-6">
                <header className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {post.category && <Link href={`/category/${post.category.slug}`} className="text-primary hover:underline">{post.category.name}</Link>}
                        <span>•</span>
                        <span>{post.createdAt.toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
                    {post.excerpt && <p className="text-xl text-muted-foreground">{post.excerpt}</p>}
                    {post.coverImage && (
                        <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                </header>

                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                <div className="pt-8 border-t">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <Link key={tag.id} href={`/tag/${tag.slug}`}>
                                <Button variant="outline" size="sm">#{tag.name}</Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Related Posts</h3>
                    {relatedPosts.length > 0 ? (
                        <ul className="space-y-4">
                            {relatedPosts.map(p => (
                                <li key={p.id}>
                                    <Link href={`/${p.slug}`} className="hover:underline text-sm font-medium block mb-1">
                                        {p.title}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">{p.createdAt.toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No related posts found.</p>
                    )}
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 sticky top-24">
                    <h3 className="font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-4">Subscribe to get the latest tech reviews delivered to your inbox.</p>
                    <div className="space-y-2">
                        <input type="email" placeholder="Your email" className="w-full px-3 py-2 border rounded-md text-sm" />
                        <Button className="w-full">Subscribe</Button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
