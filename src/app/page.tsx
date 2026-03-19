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
        <section className="relative rounded-[3rem] overflow-hidden glass border-white/5 transition-all duration-700 hover:shadow-[0_0_80px_rgba(var(--primary),0.15)] group">
          <div className="md:grid md:grid-cols-2">
            <div className="h-[450px] md:h-[650px] relative overflow-hidden group">
              {featuredPost.coverImage ? (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-purple-600/10 to-transparent flex items-center justify-center">
                  <span className="text-[10rem] italic opacity-10 font-black select-none tracking-tighter">FEATURED</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-8 left-8">
                <span className="px-6 py-2 rounded-full glass bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] italic flex items-center gap-2 border border-white/20 backdrop-blur-xl">
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" /> Trending Now
                </span>
              </div>
            </div>

            <div className="p-10 md:p-20 flex flex-col justify-center space-y-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -mr-32 -mt-32 opacity-20 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {featuredPost.category && (
                    <Link href={`/category/${featuredPost.category.slug}`}>
                      <span className="px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] bg-primary text-primary-foreground italic transition-all hover:scale-110 active:scale-95 cursor-pointer">
                        {featuredPost.category.name}
                      </span>
                    </Link>
                  )}
                  <div className="h-1 w-1 bg-white/20 rounded-full" />
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">{featuredPost.createdAt.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[0.95] text-glow italic transition-colors">
                  <Link href={`/${featuredPost.slug}`} className="hover:text-primary transition-all duration-500 block">
                    {featuredPost.title}
                  </Link>
                </h1>
              </div>

              <p className="text-muted-foreground/80 md:text-xl line-clamp-3 leading-relaxed font-medium">
                {featuredPost.excerpt || "Dive into the latest insights and breakthrough reviews where technology meets creativity. Exploring the future of the digital landscape."}
              </p>

              <div className="pt-8">
                <Link href={`/${featuredPost.slug}`}>
                  <Button size="lg" className="h-16 px-12 rounded-[2rem] text-xl font-black italic shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105 group/btn">
                    READ STORY <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover/btn:translate-x-2" />
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
