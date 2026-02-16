'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface MarkdownEditorProps {
    value?: string;
    name: string;
    placeholder?: string;
    className?: string;
    initialValue?: string;
}

export default function MarkdownEditor({ name, placeholder, className, initialValue = '' }: MarkdownEditorProps) {
    const [content, setContent] = useState(initialValue);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                // Insert markdown image syntax at cursor position or append
                const imageMarkdown = `![${file.name}](${data.url})`;
                setContent((prev) => prev + '\n' + imageMarkdown);
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                    />
                    <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                        Upload Image
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="write" className="w-full">
                <TabsList>
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write">
                    <Textarea
                        name={name}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder}
                        className="min-h-[400px] font-mono"
                    />
                </TabsContent>
                <TabsContent value="preview">
                    <div className="border rounded-md p-4 min-h-[400px] prose dark:prose-invert max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
