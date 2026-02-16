import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';

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
                { title: { contains: query } },
                { content: { contains: query } },
                { excerpt: { contains: query } },
            ],
        },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
    }) : [];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>

            {/* Search Input for refinement */}
            <form action="/search" method="GET" className="flex gap-2 max-w-md">
                <Input name="q" placeholder="Search again..." defaultValue={query} />
                <Button type="submit">
                    <Search className="h-4 w-4" />
                </Button>
            </form>

            {query && (
                <p className="text-muted-foreground">
                    Found {posts.length} results for <span className="font-semibold">"{query}"</span>
                </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </div>

            {query && posts.length === 0 && (
                <div className="py-10 text-center">
                    <p className="text-muted-foreground">No posts found matching your query.</p>
                </div>
            )}
        </div>
    );
}
