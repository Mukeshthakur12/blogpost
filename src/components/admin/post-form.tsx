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
import { useState, useRef } from 'react';
import { ImageIcon, Info, Search, Settings, Share2, Sparkles } from 'lucide-react';

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
        featured?: boolean;
        categoryId?: string | null;
        coverImage?: string | null;
        seoTitle?: string | null;
        seoDesc?: string | null;
    };
    categories: Array<{ id: string; name: string }>;
    action: (prevState: any, formData: FormData) => Promise<any>;
};

export default function PostForm({ initialData, categories, action }: PostFormProps) {
    const [state, formAction] = useActionState(action, initialState);
    const [content, setContent] = useState(initialData?.content || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [isSlugManual, setIsSlugManual] = useState(false);
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSlugManual) {
            const newSlug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setSlug(newSlug);
        }
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setCoverImage(data.url);
            }
        } catch (error) {
            console.error('Error uploading cover:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form action={formAction} className="space-y-12 pb-20">
            {/* Header / Meta section */}
            <div className="glass p-8 lg:p-12 rounded-[3rem] border-white/5 shadow-2xl space-y-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cover Image Upload */}
                    <div className="w-full lg:w-1/3 aspect-[4/3] relative rounded-[2rem] overflow-hidden group cursor-pointer border-2 border-dashed border-white/10 hover:border-primary/50 transition-all bg-white/5 flex items-center justify-center">
                        {coverImage ? (
                            <>
                                <img src={coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" onClick={() => fileInputRef.current?.click()}>
                                    <span className="text-white font-bold flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Change Cover</span>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-6 space-y-4" onClick={() => fileInputRef.current?.click()}>
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
                                    <ImageIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="font-bold">Upload Cover Image</p>
                                    <p className="text-sm opacity-50">Recommended: 1200x800px</p>
                                </div>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleCoverUpload} className="hidden" accept="image/*" />
                        <input type="hidden" name="coverImage" value={coverImage} />
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-8">
                        <div className="grid gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest opacity-40 ml-1">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter a compelling title..."
                                    defaultValue={initialData?.title}
                                    onChange={handleTitleChange}
                                    required
                                    className="h-16 rounded-2xl glass-card border-none px-8 focus-visible:ring-2 focus-visible:ring-primary/40 text-xl font-bold transition-all shadow-lg"
                                />
                                {state?.errors?.title && <p className="text-red-500 text-sm font-bold ml-1">{state.errors.title}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="slug" className="text-xs font-black uppercase tracking-widest opacity-40 ml-1">Slug (URL)</Label>
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
                                    className="h-14 rounded-2xl glass-card border-none px-8 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg opacity-80"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-2xl border border-white/5">
                                <Label htmlFor="published" className="text-sm font-bold">Published</Label>
                                <Select name="published" defaultValue={initialData?.published ? 'true' : 'false'}>
                                    <SelectTrigger className="w-32 bg-transparent border-none focus:ring-0 text-sm font-black text-primary">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10 rounded-2xl overflow-hidden">
                                        <SelectItem value="false">Draft</SelectItem>
                                        <SelectItem value="true">Live</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-2xl border border-white/5">
                                <Label htmlFor="featured" className="text-sm font-bold">Featured</Label>
                                <Select name="featured" defaultValue={initialData?.featured ? 'true' : 'false'}>
                                    <SelectTrigger className="w-32 bg-transparent border-none focus:ring-0 text-sm font-black text-amber-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10 rounded-2xl overflow-hidden">
                                        <SelectItem value="false">Standard</SelectItem>
                                        <SelectItem value="true">Featured</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 ml-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <Label className="text-sm font-black tracking-widest uppercase opacity-60">Content Editor</Label>
                </div>
                <input type="hidden" name="content" value={content} />
                <TiptapEditor
                    content={content}
                    onChange={setContent}
                />
                {state?.errors?.content && <p className="text-red-500 text-sm font-bold ml-1">{state.errors.content}</p>}
            </div>

            {/* Extra Info Grid */}
            <div className="grid lg:grid-cols-2 gap-10">
                {/* Excerpt & Category */}
                <div className="glass p-10 rounded-[2.5rem] border-white/5 shadow-xl space-y-8">
                    <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-primary" />
                        <h3 className="font-black uppercase tracking-widest text-sm opacity-60">Details</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="categoryId" className="text-xs font-bold opacity-40 uppercase tracking-widest">Category</Label>
                            <Select name="categoryId" defaultValue={initialData?.categoryId || undefined}>
                                <SelectTrigger className="h-14 rounded-xl glass-card border-none px-6 text-lg font-bold">
                                    <SelectValue placeholder="Choose a category" />
                                </SelectTrigger>
                                <SelectContent className="glass border-white/10 rounded-2xl p-2">
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id} className="rounded-xl h-12">
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="excerpt" className="text-xs font-bold opacity-40 uppercase tracking-widest">Short Summary (Excerpt)</Label>
                            <Textarea
                                id="excerpt"
                                name="excerpt"
                                placeholder="A brief hook for your readers..."
                                defaultValue={initialData?.excerpt || ''}
                                className="min-h-[140px] rounded-2xl glass-card border-none p-6 text-lg leading-relaxed focus-visible:ring-2 focus-visible:ring-primary/40"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="glass p-10 rounded-[2.5rem] border-white/5 shadow-xl space-y-8">
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-primary" />
                        <h3 className="font-black uppercase tracking-widest text-sm opacity-60">SEO Optimization</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="seoTitle" className="text-xs font-bold opacity-40 uppercase tracking-widest">SEO Title</Label>
                            <Input
                                id="seoTitle"
                                name="seoTitle"
                                placeholder="Override default title for search results..."
                                defaultValue={initialData?.seoTitle || ''}
                                className="h-14 rounded-xl glass-card border-none px-6 font-medium"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="seoDesc" className="text-xs font-bold opacity-40 uppercase tracking-widest">Meta Description</Label>
                            <Textarea
                                id="seoDesc"
                                name="seoDesc"
                                placeholder="Search engine description (max 160 chars)..."
                                defaultValue={initialData?.seoDesc || ''}
                                className="min-h-[120px] rounded-xl glass-card border-none p-6 font-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-12 flex items-center justify-end gap-4 glass-card p-6 rounded-[2rem] border border-white/10 shadow-xl">
                <Button variant="ghost" type="button" className="rounded-full px-6 font-bold hover:bg-white/10" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button type="submit" className="rounded-full px-10 h-12 font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                    Save Post Changes
                </Button>
            </div>

            {state?.message && (
                <div className={`mt-8 p-6 rounded-2xl border ${state.message.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'} font-bold text-center`}>
                    {state.message}
                </div>
            )}
        </form>
    );
}
