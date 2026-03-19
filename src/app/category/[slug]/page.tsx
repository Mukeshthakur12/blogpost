import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' },
                include: { category: true }
            }
        }
    });

    if (!category) {
        return notFound();
    }

    return (
        <div className="space-y-12">
            {/* Category Hero Section */}
            <section className="relative rounded-[2.5rem] overflow-hidden glass p-10 md:p-20 border-white/5 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5">
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/60 italic">Explore Category</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-glow italic">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                            {category.description}
                        </p>
                    )}
                </div>
                {/* Decorative Elements */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full" />
                <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-10">
                    <span className="text-[12rem] font-black italic select-none">#{category.slug}</span>
                </div>
            </section>

            {/* Posts Grid */}
            <section>
                <div className="flex items-center space-x-4 mb-10">
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic flex-shrink-0">
                        Total {category.posts.length} Publications
                    </h2>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {category.posts.map((post, index) => (
                        <PostCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {category.posts.length === 0 && (
                    <div className="text-center py-32 glass rounded-[3rem] border-white/5">
                        <h3 className="text-2xl font-bold mb-2">No Stories Yet</h3>
                        <p className="text-muted-foreground">We're working on gathering the best content for this category.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
