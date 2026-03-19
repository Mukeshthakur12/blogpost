import PostForm from '@/components/admin/post-form';
import { createPost } from '@/lib/actions/post';
import { prisma } from '@/lib/prisma';

export default async function CreatePostPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight mb-10 text-glow">Create New Post</h2>
            <PostForm
                action={createPost}
                categories={categories}
            />
        </div>
    );
}
