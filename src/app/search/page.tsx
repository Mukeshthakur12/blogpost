import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Info } from 'lucide-react';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || '';

    const posts = query ? await prisma.post.findMany({
        where: {
            published: true,
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { content: { contains: query, mode: 'insensitive' } },
                { excerpt: { contains: query, mode: 'insensitive' } },
            ],
        },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
    }) : [];

    return (
        <div className="space-y-12">
            {/* Search Hero Header */}
            <section className="relative rounded-[2.5rem] overflow-hidden glass p-10 md:p-16 border-white/5 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5">
                <div className="relative z-10 space-y-8 max-w-2xl">
                    <div className="space-y-4">
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/60 italic">Search Results</span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-glow italic">
                            {query ? `Refining: "${query}"` : "Discover More"}
                        </h1>
                    </div>

                    <form action="/search" method="GET" className="relative group max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
                        <Input 
                            name="q" 
                            placeholder="Enter keywords..." 
                            defaultValue={query} 
                            className="pl-14 pr-32 h-14 glass-card border-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all rounded-2xl bg-white/5 font-bold"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Button type="submit" size="sm" className="h-10 rounded-xl font-bold px-6">Search</Button>
                        </div>
                    </form>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-5 pointer-events-none">
                    <Search className="w-80 h-80 italic select-none" />
                </div>
            </section>

            {/* Results Grid */}
            <section className="space-y-10">
                {query && (
                    <div className="flex items-center gap-4 text-muted-foreground font-semibold italic">
                        <div className="p-2 rounded-lg glass bg-primary/10"><Info className="h-4 w-4 text-primary" /></div>
                        Found {posts.length} {posts.length === 1 ? 'story' : 'stories'} match your keywords.
                    </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => (
                        <PostCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {query && posts.length === 0 && (
                    <div className="py-32 text-center glass rounded-[3rem] border-white/5 space-y-4">
                        <div className="inline-flex p-6 rounded-full glass bg-white/5 mb-4 italic text-4xl">💭</div>
                        <h3 className="text-2xl font-bold italic tracking-tight uppercase">No Stories Found</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto font-medium">Try broadening your search or exploring our popular categories.</p>
                        <div className="pt-6">
                            <Button variant="outline" className="rounded-2xl h-12 px-8 font-bold border-white/10 glass-card">View All Articles</Button>
                        </div>
                    </div>
                )}

                {!query && (
                    <div className="py-20 text-center glass rounded-[3rem] border-white/5 italic">
                        <p className="text-muted-foreground font-black tracking-widest uppercase">Type anything to explore our universe</p>
                    </div>
                )}
            </section>
        </div>
    );
}
