import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 9,
  });

  const featuredPost = latestPosts[0]; // For now just take the first one as featured
  const gridPosts = latestPosts.slice(1);

  return (
    <div className="space-y-20 pb-20">

      {/* Featured Hero Section */}
      {featuredPost && (
        <section className="relative rounded-[2.5rem] overflow-hidden glass border-white/5 transition-all duration-700 hover:shadow-[0_0_80px_rgba(var(--primary),0.15)] group">
          <div className="md:grid md:grid-cols-[2fr_3fr] gap-0">
            <div className="h-[300px] md:h-[400px] relative overflow-hidden group">
              {featuredPost.coverImage ? (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-purple-600/10 to-transparent flex items-center justify-center">
                  <span className="text-[6rem] italic opacity-10 font-black select-none tracking-tighter">FEATURED</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 rounded-full glass bg-white/10 text-white font-bold text-[10px] uppercase tracking-[0.2em] italic flex items-center gap-2 border border-white/20 backdrop-blur-md shadow-lg shadow-black/20">
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" /> Trending Now
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[100px] rounded-full -mr-24 -mt-24 pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="flex items-center space-x-3">
                  {featuredPost.category && (
                    <Link href={`/category/${featuredPost.category.slug}`}>
                      <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground italic transition-all hover:bg-primary/90 cursor-pointer shadow-md shadow-primary/30">
                        {featuredPost.category.name}
                      </span>
                    </Link>
                  )}
                  <div className="h-1 w-1 bg-white/30 rounded-full" />
                  <span className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-widest">{featuredPost.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-glow italic transition-colors drop-shadow-sm">
                  <Link href={`/${featuredPost.slug}`} className="hover:text-primary transition-all duration-300 block">
                    {featuredPost.title}
                  </Link>
                </h1>
              </div>

              <p className="text-muted-foreground/80 md:text-lg line-clamp-3 leading-relaxed font-medium relative z-10">
                {featuredPost.excerpt || "Dive into the latest insights and breakthrough reviews where technology meets creativity. Exploring the future of the digital landscape."}
              </p>

              <div className="pt-4 relative z-10">
                <Link href={`/${featuredPost.slug}`}>
                  <Button size="lg" className="h-12 px-8 rounded-full text-sm font-black italic shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 group/btn">
                    READ STORY <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Stories Grid */}
      <section className="space-y-12">
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/60 italic">Curated Content</span>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight">Latest Publications</h2>
          </div>
          <Link href="/posts" className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all pb-1">
            Browse All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
