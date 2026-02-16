import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/post-form';
import { updatePost } from '@/lib/actions/post';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    const updatePostWithId = updatePost.bind(null, id);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight mb-10 text-glow flex items-center gap-4">
                <span className="opacity-40">Edit:</span> {post.title}
            </h2>
            <PostForm
                initialData={{
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt,
                    published: post.published,
                    categoryId: post.categoryId
                }}
                action={updatePostWithId}
                categories={categories}
            />
        </div>
    );
}
