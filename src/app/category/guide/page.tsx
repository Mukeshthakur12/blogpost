import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Compass, Sparkles } from 'lucide-react';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Guides | Appzyra',
  description: 'Browse practical buying guides, explainers, and curated walkthroughs from Appzyra.',
};

export default async function GuideCategoryPage() {
  const [guideCategory, guidePosts] = await Promise.all([
    prisma.category.findFirst({
      where: { slug: { in: ['guide', 'guides'] } },
      select: { name: true, description: true, slug: true },
    }),
    prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { type: 'GUIDE' },
          { category: { slug: { in: ['guide', 'guides'] } } },
        ],
      },
      include: { category: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: 12,
    }),
  ]);

  const featuredGuide = guidePosts[0];
  const moreGuides = guidePosts.slice(featuredGuide ? 1 : 0);
  const heroTitle = guideCategory?.name || 'Guides';
  const heroDescription =
    guideCategory?.description ||
    'Actionable buying advice, practical walkthroughs, and easy-to-follow explainers to help readers choose smarter.';

  return (
    <div className="space-y-14 pb-8 sm:space-y-16">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_38%),linear-gradient(135deg,rgba(59,130,246,0.16),rgba(255,255,255,0.03),rgba(16,185,129,0.10))] px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.2)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-8%] top-[-20%] h-56 w-56 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-18%] right-[-10%] h-64 w-64 rounded-full bg-emerald-400/15 blur-[140px]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_360px] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Category Spotlight
            </div>
            <div className="space-y-4">
              <h1 className="max-w-[12ch] text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                {heroDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/posts">
                <Button className="h-11 rounded-full px-6 font-bold">
                  Explore all posts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                {guidePosts.length} published guides
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary/70">What you’ll find</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Compass className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  Step-by-step buying guidance for popular tech categories.
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  Clear comparisons, shortlist recommendations, and quick takeaways.
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  Practical explainers written for fast scanning on desktop and mobile.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {featuredGuide && (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <article className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden bg-black/20">
                {featuredGuide.coverImage ? (
                  <Image
                    src={featuredGuide.coverImage}
                    alt={featuredGuide.seoTitle || featuredGuide.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-emerald-400/10">
                    <span className="text-6xl opacity-20">📚</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-background/20" />
              </div>

              <div className="space-y-4 p-6 sm:p-8">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                  Featured guide
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  <Link href={`/${featuredGuide.slug}`} className="transition-colors hover:text-primary">
                    {featuredGuide.seoTitle || featuredGuide.title}
                  </Link>
                </h2>
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {featuredGuide.excerpt || 'A practical guide designed to make the next decision easier and faster.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span>
                    {featuredGuide.createdAt.toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  {featuredGuide.category && (
                    <Link href={`/category/${featuredGuide.category.slug}`} className="text-primary transition-colors hover:text-primary/80">
                      {featuredGuide.category.name}
                    </Link>
                  )}
                </div>
                <Link href={`/${featuredGuide.slug}`}>
                  <Button variant="outline" className="h-11 rounded-full border-white/10 bg-white/5 px-6 font-bold">
                    Read this guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="space-y-8">
        <div className="flex flex-col gap-3 border-b border-white/5 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary/75">Guide Library</p>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">Latest guides and explainers</h2>
          </div>
        </div>

        {guidePosts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {(featuredGuide ? moreGuides : guidePosts).map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-white/8 bg-white/5 px-6 py-16 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No guides published yet</h3>
            <p className="mt-3 text-muted-foreground">
              This page is ready. As soon as guide posts are published, they’ll appear here automatically.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
