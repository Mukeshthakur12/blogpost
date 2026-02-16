'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import TiptapEditor from '@/components/admin/editor/tiptap-editor';
import { createPost } from '@/lib/actions/post';
import { useState } from 'react';

// initialState type
const initialState = {
    message: null,
    errors: {},
};

type PostFormProps = {
    initialData?: {
        title: string;
        slug: string;
        content: string;
        excerpt?: string | null;
        published: boolean;
        categoryId?: string | null;
    };
    categories: Array<{ id: string; name: string }>;
    action: (prevState: any, formData: FormData) => Promise<any>;
};

export default function PostForm({ initialData, categories, action }: PostFormProps) {
    const [state, formAction] = useActionState(action, initialState);
    const [content, setContent] = useState(initialData?.content || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [isSlugManual, setIsSlugManual] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSlugManual) {
            const newSlug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setSlug(newSlug);
        }
    };

    return (
        <form action={formAction} className="space-y-8 glass p-10 rounded-[2.5rem] shadow-2xl border-white/5">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                    <Label htmlFor="title" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Post Title"
                        defaultValue={initialData?.title}
                        onChange={handleTitleChange}
                        required
                        className="h-14 rounded-2xl glass-card border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all"
                    />
                    {state?.errors?.title && <p className="text-red-500 text-sm font-bold ml-1">{state.errors.title}</p>}
                </div>
                <div className="space-y-3">
                    <Label htmlFor="slug" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Slug (URL)</Label>
                    <Input
                        id="slug"
                        name="slug"
                        placeholder="post-url-slug"
                        value={slug}
                        onChange={(e) => {
                            setSlug(e.target.value);
                            setIsSlugManual(true);
                        }}
                        required
                        className="h-14 rounded-2xl glass-card border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all"
                    />
                    {state?.errors?.slug && <p className="text-red-500 text-sm font-bold ml-1">{state.errors.slug}</p>}
                </div>
            </div>

            <div className="space-y-3">
                <Label htmlFor="content" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Content</Label>
                <input type="hidden" name="content" value={content} />
                <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-inner bg-white/5">
                    <TiptapEditor
                        content={content}
                        onChange={setContent}
                    />
                </div>
                {state?.errors?.content && <p className="text-red-500 text-sm font-bold ml-1">{state.errors.content}</p>}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                    <Label htmlFor="excerpt" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        name="excerpt"
                        placeholder="Short summary..."
                        defaultValue={initialData?.excerpt || ''}
                        className="min-h-[120px] rounded-2xl glass-card border-none p-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all resize-none"
                    />
                </div>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="categoryId" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Category</Label>
                        <Select name="categoryId" defaultValue={initialData?.categoryId || undefined}>
                            <SelectTrigger className="h-14 rounded-2xl glass-card border-none px-6 focus:ring-2 focus:ring-primary/40 text-lg transition-all">
                                <SelectValue placeholder="Choose a category" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10 rounded-2xl overflow-hidden p-2">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        className="rounded-xl focus:bg-primary/20 cursor-pointer h-12 text-lg"
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="published" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Status</Label>
                        <Select name="published" defaultValue={initialData?.published ? 'true' : 'false'}>
                            <SelectTrigger className="h-14 rounded-2xl glass-card border-none px-6 focus:ring-2 focus:ring-primary/40 text-lg transition-all">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10 rounded-2xl overflow-hidden p-2">
                                <SelectItem value="false" className="rounded-xl focus:bg-primary/20 cursor-pointer h-12 text-lg">Draft</SelectItem>
                                <SelectItem value="true" className="rounded-xl focus:bg-primary/20 cursor-pointer h-12 text-lg">Published</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit">Save Post</Button>
            </div>

            {state?.message && (
                <p className={`text-sm ${state.message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {state.message}
                </p>
            )}
        </form>
    );
}
