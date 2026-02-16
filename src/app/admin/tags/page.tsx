import { prisma } from '@/lib/prisma';
import { deleteTag } from '@/lib/actions/tag';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Hash } from 'lucide-react';
import TagForm from '@/components/admin/tag-form';

export default async function AdminTagsPage() {
    const tags = await prisma.tag.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-glow">Manage Tags</h2>
                    <p className="text-muted-foreground/60 mt-2 font-medium">Precision tagging for better discoverability.</p>
                </div>
            </div>

            <div className="grid gap-10 md:grid-cols-[1fr,1.5fr]">
                {/* Create Tag Form */}
                <TagForm />

                {/* Tags Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tags.map((tag) => (
                        <Card key={tag.id} className="glass-card rounded-2xl border-white/5 hover:border-white/10 transition-all duration-300 group">
                            <CardContent className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <Hash className="h-4 w-4 text-primary shrink-0" />
                                    <div className="overflow-hidden">
                                        <h3 className="font-bold tracking-tight truncate group-hover:text-primary transition-colors">{tag.name}</h3>
                                        <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">{tag.slug}</p>
                                    </div>
                                </div>
                                <form action={async (formData) => {
                                    'use server';
                                    await deleteTag(tag.id);
                                }}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    ))}

                    {tags.length === 0 && (
                        <div className="col-span-full glass p-12 rounded-[2.5rem] border-white/5 text-center">
                            <p className="text-muted-foreground font-medium text-lg">No tags found yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
