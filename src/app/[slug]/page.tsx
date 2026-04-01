import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { Calendar, User as UserIcon, Clock, ChevronRight, Share2, Facebook, Twitter, Linkedin, Home } from 'lucide-react';

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

    const url = `https://blog.appzyra.com/${post.slug}`;
    const keywords = [
  post.title,
  post.category?.name,
  ...post.tags.map(tag => tag.name),
].join(', ');

    return {
        title: post.seoTitle || post.title,
        description: post.seoDesc || post.excerpt,
        keywords: keywords || undefined,
        authors: [{ name: post.author.name }],
        alternates: { canonical: url },
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

    if (!post) notFound();

    const relatedPosts = post.categoryId ? await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            id: { not: post.id },
            published: true
        },
        take: 3,
        include: { category: true }
    }) : [];

    return (
        <div className="max-w-[800px] w-full mx-auto px-3 sm:px-4 md:px-0">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground mb-12">
                <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors"><Home className="h-3 w-3" /> Home</Link>
                <ChevronRight className="h-3 w-3" />
                {post.category && (
                    <>
                        <Link href={`/category/${post.category.slug}`} className="hover:text-primary transition-colors">{post.category.name}</Link>
                        <ChevronRight className="h-3 w-3" />
                    </>
                )}
                <span className="text-muted-foreground truncate max-w-[200px]">{post.title}</span>
            </nav>

            <article className="space-y-12">
                {/* Clean Header */}
                <header className="space-y-8 text-center">
                    <div className="space-y-4">

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                            {post.seoTitle || post.title}
                        </h1>
                        {(post.seoDesc || post.excerpt) && (
                            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                                {post.seoDesc || post.excerpt}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col items-center space-y-4 text-[11px] sm:text-sm font-medium text-muted-foreground">
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            <span className="flex items-center gap-1.5 sm:gap-2"><Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(post.createdAt))}</span>
                            <span className="hidden sm:flex w-1 h-1 bg-muted-foreground/40 rounded-full" />
                            <span className="flex items-center gap-1.5 sm:gap-2"><Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {Math.ceil(post.content.split(' ').length / 200)} MIN READ</span>
                            <span className="hidden sm:flex w-1 h-1 bg-muted-foreground/40 rounded-full" />
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    {post.author.image ? <img src={post.author.image} className="w-full h-full object-cover" /> : <UserIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />}
                                </div>
                                <span className="text-foreground font-semibold text-xs sm:text-sm">By {post.author.name}</span>
                            </div>
                        </div>
                    </div>

                    {post.coverImage && (
                        <div className="pt-8 overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
                            <img loading="lazy" src={post.coverImage} alt={`${post.title} - complete guide`} className="w-full h-auto" />
                        </div>
                    )}
                </header>

                {/* Content Area */}
                <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none prose-headings:font-extrabold prose-p:leading-[1.8] prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:w-full prose-img:rounded-2xl prose-strong:text-foreground break-words">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Post Footer (Tags & Share) */}
                <footer className="pt-16 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-y border-white/5 py-10">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 italic">Explore More</span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Link key={tag.id} href={`/tag/${tag.slug}`} className="px-4 py-2 rounded-xl glass bg-white/5 text-xs font-bold text-muted-foreground hover:text-primary transition-all">
                                        #{tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4 md:text-right">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 italic">Share Story</span>
                            <div className="flex items-center md:justify-end gap-3">
                                {[Twitter, Facebook, Linkedin, Share2].map((Icon, i) => (
                                    <button key={i} className="p-3 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-all active:scale-90">
                                        <Icon className="h-4 w-4" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Simple Newsletter Hook */}
                    <div className="glass p-8 md:p-12 rounded-3xl border-white/5 text-center space-y-6 bg-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -ml-32 -mt-32 opacity-20" />
                        <div className="space-y-3 relative">
                            <h3 className="text-3xl font-extrabold tracking-tight">Stay Updated</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">Join our private circle of 50k+ enthusiasts for exclusive weekly insights.</p>
                        </div>
                        <form className="relative max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="email@example.com" className="flex-1 h-12 px-6 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 ring-primary/40 focus:outline-none" />
                            <Button className="h-12 px-8 rounded-xl font-bold">Subscribe</Button>
                        </form>
                    </div>

                    {/* Related Posts Section */}
                    {relatedPosts.length > 0 && (
                        <div className="space-y-10 pt-10">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Recommended Reads</h3>
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.slice(0, 2).map((p) => (
                                    <Link key={p.id} href={`/${p.slug}`} className="group space-y-4">
                                        <div className="aspect-[16/9] rounded-3xl overflow-hidden glass border-white/5">
                                            {p.coverImage && <img src={p.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />}
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">{p.category?.name}</span>
                                            <h4 className="text-xl font-bold italic leading-tight group-hover:text-primary transition-all">{p.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </footer>
            </article>
        </div>
    );
}
