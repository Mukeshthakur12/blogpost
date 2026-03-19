import { prisma } from '@/lib/prisma';
import { deleteCategory } from '@/lib/actions/category';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import CategoryForm from '@/components/admin/category-form';

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-glow">Manage Categories</h2>
                    <p className="text-muted-foreground/60 mt-2 font-medium">Organize your stories with precision.</p>
                </div>
            </div>

            <div className="grid gap-10 md:grid-cols-[1fr,1.5fr]">
                {/* Create Category Form */}
                <CategoryForm />

                {/* Categories List */}
                <div className="space-y-4">
                    {categories.map((category) => (
                        <Card key={category.id} className="glass-card rounded-[2rem] border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground/60 font-medium">/{category.slug}</p>
                                    {category.description && (
                                        <p className="text-sm mt-2 text-muted-foreground/80 line-clamp-1">{category.description}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <form action={async (formData) => {
                                        'use server';
                                        await deleteCategory(category.id);
                                    }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-12 w-12 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {categories.length === 0 && (
                        <div className="glass p-12 rounded-[2.5rem] border-white/5 text-center">
                            <p className="text-muted-foreground font-medium text-lg">No categories found. Start by creating one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
