'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const CategorySchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: z.string().optional(),
});

export async function createCategory(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const validatedFields = CategorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug') || formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Category.',
        };
    }

    const { name, slug, description } = validatedFields.data;

    try {
        await prisma.category.create({
            data: { name, slug, description },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Create Category.' };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { message: 'Category Created Successfully' };
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const validatedFields = CategorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Category.',
        };
    }

    const { name, slug, description } = validatedFields.data;

    try {
        await prisma.category.update({
            where: { id },
            data: { name, slug, description },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Category.' };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { message: 'Category Updated Successfully' };
}

export async function deleteCategory(id: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    try {
        await prisma.category.delete({ where: { id } });
        revalidatePath('/admin/categories');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Category.' };
    }
}
