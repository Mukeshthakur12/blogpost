'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const TagSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
});

export async function createTag(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const validatedFields = TagSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug') || formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Tag.',
        };
    }

    const { name, slug } = validatedFields.data;

    try {
        await prisma.tag.create({
            data: { name, slug },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Create Tag.' };
    }

    revalidatePath('/admin/tags');
    return { message: 'Tag Created Successfully' };
}

export async function updateTag(id: string, prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const validatedFields = TagSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Tag.',
        };
    }

    const { name, slug } = validatedFields.data;

    try {
        await prisma.tag.update({
            where: { id },
            data: { name, slug },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Tag.' };
    }

    revalidatePath('/admin/tags');
    return { message: 'Tag Updated Successfully' };
}

export async function deleteTag(id: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Unauthorized');

    try {
        await prisma.tag.delete({ where: { id } });
        revalidatePath('/admin/tags');
        return { success: true };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Tag.' };
    }
}
