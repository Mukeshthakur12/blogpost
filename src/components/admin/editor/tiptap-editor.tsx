'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import CharacterCount from '@tiptap/extension-character-count';
import { Button } from '@/components/ui/button';
import {
    Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon,
    Heading1, Heading2, Quote, Undo, Redo, Youtube as YoutubeIcon,
    Table as TableIcon, AlignLeft, AlignCenter, AlignRight, Underline as UnderlineIcon,
    Plus, Trash2, Columns, Rows, Check, X, Palette
} from 'lucide-react';
import { useState, useRef } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full h-auto border-2 border-white/5 shadow-xl mx-auto block my-8',
                    loading: 'lazy',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline font-medium hover:text-primary/80 transition-colors',
                },
            }),
            Youtube.configure({
                controls: true,
                HTMLAttributes: {
                    class: 'rounded-2xl overflow-hidden aspect-video w-full my-8 max-w-3xl mx-auto shadow-2xl shadow-primary/10 border-2 border-white/5',
                },
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CharacterCount.configure({
                limit: 10000,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose-edit min-h-[500px] w-full max-w-none focus:outline-none p-8 lg:p-12 leading-relaxed text-lg transition-all',
            },
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
                const altText = window.prompt("Enter SEO Alt Text (MANDATORY) - e.g. 'Primary keyword + brand + context':");
                if (!altText || altText.trim() === '') {
                    alert('Upload cancelled: SEO Alt text is required for ranking.');
                    return;
                }
                editor.chain().focus().setImage({ src: data.url, alt: altText }).run();
            } else {
                alert('Upload failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        } finally {
            setIsUploading(false);
        }
    };

    const addYoutube = () => {
        const url = window.prompt('Enter YouTube URL');
        if (url) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const insertSpecTable = () => {
        editor.chain().focus()
            .insertTable({ rows: 5, cols: 2, withHeaderRow: true })
            .focus()
            .run();
    };

    const insertProsCons = () => {
        editor.chain().focus()
            .insertTable({ rows: 3, cols: 2, withHeaderRow: true })
            .focus()
            .run();
    };

    const insertImageGrid = () => {
        editor.chain().focus()
            .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
            .focus()
            .run();
        // User can then upload images into each cell
    };

    const insertCallout = () => {
        editor.chain().focus()
            .toggleBlockquote()
            .run();
    };

    return (
        <>
            {/* The Toolbar fixed to the viewport */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-wrap gap-2 glass-card px-6 py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] items-center justify-center animate-in fade-in slide-in-from-bottom-10 duration-700">
                {/* Text Formatting */}
                <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive('bold') ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive('italic') ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive('underline') ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>
                </div>

                {/* Headings */}
                <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Alignment */}
                <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Media & Tables */}
                <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 rounded-xl transition-all hover:bg-white/10 relative overflow-hidden"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <ImageIcon className="h-4 w-4" />
                        )}
                    </Button>

                    <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl transition-all hover:bg-white/10" onClick={setLink}>
                        <LinkIcon className="h-4 w-4" />
                    </Button>

                    <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl transition-all hover:bg-white/10" onClick={addYoutube}>
                        <YoutubeIcon className="h-4 w-4" />
                    </Button>

                    {/* Table & Layout Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className={`h-9 w-9 p-0 rounded-xl transition-all ${editor.isActive('table') ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10'}`}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="glass border-white/10 rounded-2xl w-56 p-2 space-y-1">
                            <DropdownMenuLabel className="text-xs uppercase font-bold opacity-50 px-3 py-2">Layout & Components</DropdownMenuLabel>
                            <DropdownMenuItem onClick={insertImageGrid} className="rounded-xl py-3 focus:bg-primary/20">
                                <Columns className="mr-2 h-4 w-4" /> 2 Column Grid (Images)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={insertSpecTable} className="rounded-xl py-3 focus:bg-primary/20">
                                <TableIcon className="mr-2 h-4 w-4" /> Specs Table
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={insertProsCons} className="rounded-xl py-3 focus:bg-primary/20">
                                <Check className="mr-2 h-4 w-4 text-green-400" /> Pros & Cons
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={insertCallout} className="rounded-xl py-3 focus:bg-primary/20">
                                <Quote className="mr-2 h-4 w-4 text-primary" /> Callout / Quote
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuLabel className="text-xs uppercase font-bold opacity-50 px-3 py-2">Manage Table</DropdownMenuLabel>

                            <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.isActive('table')} className="rounded-xl focus:bg-primary/20">
                                <Columns className="mr-2 h-4 w-4" /> Add Column Before
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.isActive('table')} className="rounded-xl focus:bg-primary/20">
                                <Columns className="mr-2 h-4 w-4 text-primary" /> Add Column After
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.isActive('table')} className="rounded-xl focus:bg-primary/20">
                                <Rows className="mr-2 h-4 w-4" /> Add Row Before
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.isActive('table')} className="rounded-xl focus:bg-primary/20">
                                <Rows className="mr-2 h-4 w-4 text-primary" /> Add Row After
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.isActive('table')} className="rounded-xl text-red-400 focus:bg-red-400/20">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Column
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.isActive('table')} className="rounded-xl text-red-400 focus:bg-red-400/20">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Row
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.isActive('table')} className="rounded-xl text-red-500 font-bold focus:bg-red-500/20">
                                <X className="mr-2 h-4 w-4" /> Delete Entire Table
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex-1" />

                {/* Undo/Redo */}
                <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
                    <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl transition-all hover:bg-white/10" onClick={() => editor.chain().focus().undo().run()}>
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl transition-all hover:bg-white/10" onClick={() => editor.chain().focus().redo().run()}>
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>

                {/* Character Count */}
                <div className="hidden lg:flex items-center px-4 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-tighter opacity-60">
                    {editor.storage.characterCount.words()} Words | {editor.storage.characterCount.characters()} Chars
                </div>
            </div>

            {/* The Editor Canvas */}
            <div className="flex flex-col h-full bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-2xl group transition-all duration-500">
                <style jsx global>{`
                    .prose-edit {
                        color: rgba(255,255,255,0.9);
                    }
                    .prose-edit h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 2rem; }
                    .prose-edit h2 { font-size: 1.8rem; font-weight: 800; margin-top: 3rem; margin-bottom: 1.5rem; color: #fff; }
                    .prose-edit p { line-height: 1.8; margin-bottom: 1.5rem; }
                    
                    /* Table Styles */
                    .prose-edit table {
                        border-collapse: separate;
                        border-spacing: 0;
                        width: 100%;
                        margin: 2rem 0;
                        border-radius: 1rem;
                        overflow: hidden;
                        border: 1px solid rgba(255,255,255,0.1);
                        background: rgba(255,255,255,0.02);
                    }
                    .prose-edit th {
                        background: rgba(255,255,255,0.05);
                        color: #fff;
                        font-weight: 800;
                        text-transform: uppercase;
                        font-size: 0.75rem;
                        letter-spacing: 0.1em;
                        padding: 1rem;
                        text-align: left;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                    }
                    .prose-edit td {
                        padding: 1rem;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        border-right: 1px solid rgba(255,255,255,0.05);
                        vertical-align: top;
                    }
                    .prose-edit tr:last-child td {
                        border-bottom: none;
                    }
                    .prose-edit td:last-child {
                        border-right: none;
                    }
                    .prose-edit .selectedCell:after {
                        background: rgba(var(--primary), 0.1);
                    }
                    
                    /* Selection & Focus */
                    .prose-edit *:focus { outline: none; }
                `}</style>

                <div className="flex-1 overflow-auto bg-black/10 rounded-[2rem]">
                    <EditorContent editor={editor} className="h-full" />
                </div>
            </div>
        </>
    );
}
