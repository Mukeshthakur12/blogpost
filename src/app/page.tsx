import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles, Layers3 } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  // Find a post marked as featured, or fallback to the latest one
  const featuredPost = latestPosts.find(p => p.featured) || latestPosts[0];
  
  // Filter out the featured post from the grid
  const gridPosts = latestPosts.filter(p => p.id !== featuredPost?.id).slice(0, 9);
  const spotlightPosts = gridPosts.slice(0, 2);
  const latestCount = latestPosts.length;

  return (
    <div className="space-y-16 pb-16 sm:space-y-20 sm:pb-20">

      {/* Featured Hero Section */}
      {featuredPost && (
        <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-[-10%] top-[-20%] h-56 w-56 rounded-full bg-primary/15 blur-[120px]" />
            <div className="absolute bottom-[-18%] right-[-10%] h-64 w-64 rounded-full bg-blue-500/10 blur-[130px]" />
          </div>

          <div className="relative grid gap-5 p-4 sm:p-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.78fr)] lg:p-7">
            <article className="glass overflow-hidden rounded-[1.75rem] border-white/5">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="relative min-h-[200px] overflow-hidden bg-black/20 sm:min-h-[220px] lg:min-h-[350px]">
                  {featuredPost.coverImage ? (
                    <>
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-30"
                      />
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="relative h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent">
                      <span className="select-none text-[4rem] font-black tracking-tighter opacity-10 sm:text-[6rem]">FEATURED</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/20" />

                  <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Editor&apos;s Pick
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-4 p-5 sm:p-7 lg:p-7 xl:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">
                    {featuredPost.category && (
                      <Link
                        href={`/category/${featuredPost.category.slug}`}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {featuredPost.category.name}
                      </Link>
                    )}
                    <span>{featuredPost.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="max-w-[16ch] text-xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:max-w-none sm:text-3xl lg:text-[1.35rem] xl:text-[1.4rem]">
                      <Link href={`/${featuredPost.slug}`} className="transition-colors hover:text-primary">
                        {featuredPost.seoTitle || featuredPost.title}
                      </Link>
                    </h1>
                    <p className="max-w-[54ch] text-sm font-medium leading-6 text-muted-foreground sm:text-base lg:text-[0.75rem] lg:leading-6">
                      {featuredPost.seoDesc || featuredPost.excerpt || "Dive into the latest insights and breakthrough reviews where technology meets creativity. Exploring the future of the digital landscape."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                    <Link href={`/${featuredPost.slug}`}>
                      <Button size="lg" className="h-12 w-full rounded-full px-8 text-[0.8rem] font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/40 sm:w-auto">
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/posts" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[0.8rem] font-semibold text-muted-foreground transition-colors hover:text-foreground">
                      Explore all posts <Layers3 className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <aside className="grid gap-4">
              <div className="glass rounded-[1.75rem] border-white/5 p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground/50">More To Read</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight">Quick picks</h3>
                  </div>
                  <Link href="/posts" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {spotlightPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${post.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-3 transition-all hover:bg-white/8"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-black/10">
                        {post.coverImage ? (
                          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl opacity-20">📘</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                          {post.category?.name || 'Latest'}
                        </p>
                        <h4 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
                          {post.seoTitle || post.title}
                        </h4>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {post.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* Latest Stories Grid */}
      <section className="space-y-8 sm:space-y-12">
        <div className="flex flex-col gap-5 border-b border-white/5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-primary/80">Curated Content</span>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">Latest Publications</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Fresh reviews, practical guides, and easy-to-scan stories designed to help readers find the next useful thing quickly.
            </p>
          </div>
          <Link href="/posts" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-primary sm:pb-1">
            Browse All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {gridPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {latestPosts.length === 0 && (
          <div className="text-center py-40 glass rounded-[3rem] border-white/5 space-y-4 italic">
            <div className="inline-flex p-6 rounded-full glass bg-white/5 mb-4 text-4xl">🗞️</div>
            <h3 className="text-2xl font-black uppercase tracking-widest">Archive Empty</h3>
            <p className="text-muted-foreground max-w-sm mx-auto font-medium">Our editorial team is currently preparing the next wave of insights. Check back momentarily.</p>
          </div>
        )}
      </section>
    </div>
  );
}
