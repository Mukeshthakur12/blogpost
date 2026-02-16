'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const PostSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    content: z.string().min(1),
    excerpt: z.string().optional(),
    published: z.coerce.boolean(),
    categoryId: z.string().optional(),
});

export async function createPost(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error('User not found');

    const validatedFields = PostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: formData.get('content'),
        excerpt: formData.get('excerpt'),
        published: formData.get('published'),
        categoryId: formData.get('categoryId') || undefined,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.',
        };
    }

    const { title, slug, content, excerpt, published, categoryId } = validatedFields.data;

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                published,
                categoryId: categoryId as string,
                authorId: user.id,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }

    revalidatePath('/admin/posts');
    redirect('/admin/posts');
}
// ... createPost above ...

export async function updatePost(id: string, prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const validatedFields = PostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: formData.get('content'),
        excerpt: formData.get('excerpt'),
        published: formData.get('published'),
        categoryId: formData.get('categoryId') || undefined,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Post.',
        };
    }

    const { title, slug, content, excerpt, published, categoryId } = validatedFields.data;

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                excerpt,
                published,
                categoryId: categoryId as string,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Post.',
        };
    }

    revalidatePath('/admin/posts');
    redirect('/admin/posts');
}

export async function deletePost(id: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    try {
        await prisma.post.delete({
            where: { id },
        });
        revalidatePath('/admin/posts');
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Post.' };
    }
}
