import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    <div className="space-y-10">

      {/* Featured Hero Section */}
      {featuredPost && (
        <section className="relative rounded-3xl overflow-hidden glass transition-all duration-500 hover:shadow-[0_0_50px_rgba(var(--primary),0.1)] border border-white/5">
          <div className="md:grid md:grid-cols-2">
            <div className="h-[400px] md:h-[600px] relative overflow-hidden group">
              {featuredPost.coverImage ? (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <span className="text-8xl italic opacity-20 font-black">Featured</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-8 md:p-16 flex flex-col justify-center space-y-6 relative">
              <div className="flex items-center space-x-3">
                {featuredPost.category && (
                  <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/20">
                    {featuredPost.category.name}
                  </span>
                )}
                <span className="text-sm font-medium text-muted-foreground/60">{featuredPost.createdAt.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-glow">
                <Link href={`/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                  {featuredPost.title}
                </Link>
              </h1>

              <p className="text-muted-foreground/80 md:text-xl line-clamp-3 leading-relaxed font-medium">
                {featuredPost.excerpt || "Dive into the latest insights and breakthrough reviews where technology meets creativity."}
              </p>

              <div className="pt-6">
                <Link href={`/${featuredPost.slug}`}>
                  <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all hover:scale-105">
                    Read Story <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
          <Link href="/posts" className="text-sm font-medium text-primary hover:underline">
            View all posts
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
        {latestPosts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium">No posts published yet.</h3>
            <p className="text-muted-foreground">Check back later for updates.</p>
          </div>
        )}
      </section>
    </div>
  );
}
