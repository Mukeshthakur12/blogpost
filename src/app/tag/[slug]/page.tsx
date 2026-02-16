import { prisma } from '@/lib/prisma';
import PostCard from '@/components/post-card';
import { notFound } from 'next/navigation';

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tag = await prisma.tag.findUnique({
        where: { slug },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' },
                include: { category: true }
            }
        }
    });

    if (!tag) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Tag: {tag.name}</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tag.posts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </div>

            {tag.posts.length === 0 && (
                <p className="text-muted-foreground">No posts found with this tag.</p>
            )}
        </div>
    );
}
