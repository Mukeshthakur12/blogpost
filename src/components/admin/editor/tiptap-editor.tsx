'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Button } from '@/components/ui/button';
import {
    Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon,
    Heading1, Heading2, Quote, Undo, Redo, Youtube as YoutubeIcon
} from 'lucide-react';
import { useState } from 'react';

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Youtube.configure({
                controls: false,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 bg-background rounded-md border',
            },
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
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

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="border rounded-md overflow-hidden">
            <div className="bg-muted p-2 flex flex-wrap gap-1 border-b">
                <Button
                    type="button"
                    variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                    type="button"
                    variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button type="button" variant="ghost" size="sm" onClick={setLink}>
                    <LinkIcon className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={addImage}>
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={addYoutube}>
                    <YoutubeIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
                    <Undo className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
                    <Redo className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
