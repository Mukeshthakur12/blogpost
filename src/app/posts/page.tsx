import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
    });

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold tracking-tight mb-2">All Posts</h1>
                <p className="text-muted-foreground">Browse all our latest articles, reviews, and guides.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </div>

            {posts.length === 0 && (
                <p className="text-muted-foreground">No posts found.</p>
            )}
        </div>
    );
}
