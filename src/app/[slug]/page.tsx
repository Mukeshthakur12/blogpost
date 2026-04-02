import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { Calendar, User as UserIcon, Clock, ChevronRight, Home, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PostQuickActions } from '@/components/post-quick-actions';

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

interface Heading {
    id: string;
    title: string;
    level: 1 | 2 | 3;
}

function slugifyHeading(value: string) {
    return value
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[`*_~[\]()#!:+]/g, '')
        .replace(/&[a-z0-9#]+;/gi, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function cleanHeadingText(value: string) {
    return value
        .replace(/<[^>]+>/g, '')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_~>#-]/g, '')
        .trim();
}

function getNodeText(node: ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getNodeText).join('');
    }

    if (node && typeof node === 'object' && 'props' in node) {
        return getNodeText((node as { props?: { children?: ReactNode } }).props?.children ?? '');
    }

    return '';
}

function extractHeadings(markdown: string): Heading[] {
    const headingMap = new Map<string, number>();

    return markdown
        .split('\n')
        .map((line) => line.match(/^(#{1,3})\s+(.+)$/))
        .filter((match): match is RegExpMatchArray => Boolean(match))
        .map((match) => {
            const level = match[1].length as 1 | 2 | 3;
            const title = cleanHeadingText(match[2]);
            const baseId = slugifyHeading(title) || `section-${headingMap.size + 1}`;
            const count = headingMap.get(baseId) ?? 0;
            headingMap.set(baseId, count + 1);

            return {
                id: count === 0 ? baseId : `${baseId}-${count + 1}`,
                title,
                level,
            };
        });
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

    const readMinutes = Math.max(1, Math.ceil(post.content.split(/\s+/).filter(Boolean).length / 200));
    const headings = extractHeadings(post.content);
    const postUrl = new URL(`/${post.slug}`, process.env.NEXT_PUBLIC_METADATA_BASE ?? 'https://blog.appzyra.com').toString();
    const headingIdQueue = headings.reduce<Map<string, string[]>>((map, heading) => {
        const key = heading.title;
        const current = map.get(key) ?? [];
        current.push(heading.id);
        map.set(key, current);
        return map;
    }, new Map());

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
        <div className="mx-auto w-full max-w-6xl">
            <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold text-muted-foreground sm:mb-10 sm:text-sm">
                <Link href="/" className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 transition-colors hover:text-primary">
                    <Home className="h-3 w-3" /> Home
                </Link>
                <ChevronRight className="h-3 w-3 opacity-50" />
                {post.category && (
                    <>
                        <Link href={`/category/${post.category.slug}`} className="rounded-full bg-white/5 px-3 py-1.5 transition-colors hover:text-primary">
                            {post.category.name}
                        </Link>
                        <ChevronRight className="h-3 w-3 opacity-50" />
                    </>
                )}
                <span className="max-w-full truncate rounded-full bg-white/5 px-3 py-1.5">{post.title}</span>
            </nav>

            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                <article className="min-w-0 space-y-10 sm:space-y-12">
                    <header className="glass relative overflow-hidden rounded-[2rem] border-white/5 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
                        <div className="relative space-y-8">
                            <div className="flex flex-wrap items-center gap-3">
                                {post.category && (
                                    <Link
                                        href={`/category/${post.category.slug}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-primary transition-transform hover:-translate-y-0.5"
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        {post.category.name}
                                    </Link>
                                )}
                                {post.tags.slice(0, 2).map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={`/tag/${tag.slug}`}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        #{tag.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                    {post.seoTitle || post.title}
                                </h1>
                                {(post.seoDesc || post.excerpt) && (
                                    <p className="max-w-3xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                                        {post.seoDesc || post.excerpt}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-black/10 p-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Published</p>
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {new Intl.DateTimeFormat('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }).format(new Date(post.createdAt))}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Reading Time</p>
                                        <p className="text-sm font-semibold text-foreground">{readMinutes} min read</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 sm:col-span-2">
                                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10">
                                        {post.author.image ? (
                                            <img src={post.author.image} alt={post.author.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <UserIcon className="h-5 w-5 text-primary" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Written By</p>
                                        <p className="truncate text-sm font-semibold text-foreground">{post.author.name}</p>
                                    </div>
                                </div>
                            </div>

                            {post.coverImage && (
                                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/10">
                                    <img loading="lazy" src={post.coverImage} alt={`${post.title} cover`} className="h-56 w-full object-cover sm:h-72 lg:h-80" />
                                </div>
                            )}
                        </div>
                    </header>

                    {headings.length > 0 && (
                        <section className="xl:hidden">
                            <div className="glass rounded-[1.75rem] border-white/5 p-5">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-black uppercase tracking-[0.24em] text-muted-foreground/70">On This Page</h2>
                                    <span className="text-xs font-medium text-muted-foreground">{headings.length} sections</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {headings.map((heading) => (
                                        <a
                                            key={heading.id}
                                            href={`#${heading.id}`}
                                            className={cn(
                                                'rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground',
                                                heading.level === 1 && 'font-semibold text-foreground/90',
                                                heading.level === 3 && 'pl-6 text-[13px]'
                                            )}
                                        >
                                            {heading.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <div className="glass rounded-[2rem] border-white/5 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
                        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none break-words prose-headings:scroll-mt-28 prose-headings:font-extrabold prose-h1:text-lg sm:prose-h1:text-2xl prose-h2:mt-10 prose-h2:text-base sm:prose-h2:mt-14 sm:prose-h2:text-2xl prose-h3:mt-7 prose-h3:text-[15px] sm:prose-h3:mt-10 sm:prose-h3:text-xl prose-p:text-[12px] prose-p:leading-[1.55] sm:prose-p:text-base sm:prose-p:leading-[1.85] prose-p:text-foreground/90 prose-li:text-[12px] prose-li:leading-[1.5] sm:prose-li:text-base sm:prose-li:leading-[1.75] prose-li:text-foreground/85 prose-a:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-[11px] sm:prose-code:text-[0.875em] prose-code:break-words prose-pre:overflow-x-auto">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    h1: ({ children, ...props }) => {
                                        const title = cleanHeadingText(getNodeText(children));
                                        const id = headingIdQueue.get(title)?.shift() ?? slugifyHeading(title);
                                        return <h1 id={id} {...props}>{children}</h1>;
                                    },
                                    h2: ({ children, ...props }) => {
                                        const title = cleanHeadingText(getNodeText(children));
                                        const id = headingIdQueue.get(title)?.shift() ?? slugifyHeading(title);
                                        return <h2 id={id} {...props}>{children}</h2>;
                                    },
                                    h3: ({ children, ...props }) => {
                                        const title = cleanHeadingText(getNodeText(children));
                                        const id = headingIdQueue.get(title)?.shift() ?? slugifyHeading(title);
                                        return <h3 id={id} {...props}>{children}</h3>;
                                    },
                                    table: ({ children }) => (
                                        <div className="article-table-shell my-4 overflow-hidden rounded-[1.25rem] ">
                                            <table className="w-full">{children}</table>
                                        </div>
                                    ),
                                    a: ({ href, children, ...props }) => {
                                        const isExternal = Boolean(href?.startsWith('http'));
                                        return (
                                            <a
                                                href={href}
                                                {...props}
                                                target={isExternal ? '_blank' : undefined}
                                                rel={isExternal ? 'noreferrer noopener' : undefined}
                                            >
                                                {children}
                                            </a>
                                        );
                                    },
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    <footer className="space-y-8 pt-4 sm:space-y-10 sm:pt-6">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
                            <div className="glass rounded-[2rem] border-white/5 p-6 sm:p-8">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Explore More</span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {post.tags.map(tag => (
                                            <Link
                                                key={tag.id}
                                                href={`/tag/${tag.slug}`}
                                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
                                            >
                                                #{tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass relative overflow-hidden rounded-[2rem] border-white/5 p-6 sm:p-8">
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
                                <div className="relative space-y-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Stay Updated</span>
                                    <h3 className="text-2xl font-extrabold tracking-tight">Get the next deep dive first</h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Weekly product notes, buyer tips. Short, useful, and no spam.
                                    </p>
                                    <form className="pt-2">
                                        <label className="sr-only" htmlFor="post-newsletter-email">Email address</label>
                                        <div className="flex flex-col gap-3 ">
                                            <input
                                                id="post-newsletter-email"
                                                type="email"
                                                placeholder="email@example.com"
                                                className="h-12 flex-1 py-6  rounded-xl border border-white/10 bg-white/5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            />
                                            <Button className="h-12 rounded-xl px-6 font-bold">Subscribe</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {relatedPosts.length > 0 && (
                            <section className="space-y-6 pt-4">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-black uppercase tracking-[0.2em] text-foreground sm:text-xl">Recommended Reads</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                </div>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {relatedPosts.slice(0, 2).map((p) => (
                                        <Link key={p.id} href={`/${p.slug}`} className="group glass overflow-hidden rounded-[2rem] border-white/5">
                                            <div className="aspect-[16/10] overflow-hidden bg-black/10">
                                                {p.coverImage && (
                                                    <img
                                                        src={p.coverImage}
                                                        alt={p.title}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                )}
                                            </div>
                                            <div className="space-y-3 p-5 sm:p-6">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                                                        {p.category?.name || 'Recommended'}
                                                    </span>
                                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                                </div>
                                                <h4 className="text-lg font-bold transition-colors group-hover:text-primary sm:text-xl">
                                                    {p.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </footer>
                </article>

                <PostQuickActions
                    headings={headings}
                    readMinutes={readMinutes}
                    title={post.title}
                    url={postUrl}
                />
            </div>
        </div>
    );
}
