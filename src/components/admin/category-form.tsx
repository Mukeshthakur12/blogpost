'use client';

import { useActionState } from 'react';
import { createCategory } from '@/lib/actions/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialState: { message: string; errors: Record<string, string[]> } = {
    message: '',
    errors: {},
};

export default function CategoryForm() {
    const [state, formAction, isPending] = useActionState(createCategory, initialState);

    return (
        <Card className="glass shadow-2xl rounded-[2.5rem] border-white/5 h-fit sticky top-24">
            <CardHeader className="pt-10 px-8 pb-4">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/20">
                        <Plus className="h-5 w-5 text-primary" />
                    </div>
                    New Category
                </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-10">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Technology"
                            required
                            className="h-14 rounded-2xl glass-card border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all"
                        />
                        {state?.errors?.name && <p className="text-red-500 text-sm font-bold ml-1">{state.errors.name}</p>}
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Brief description..."
                            className="h-14 rounded-2xl glass-card border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all"
                        />
                    </div>

                    {state?.message && (
                        <p className={`text-sm font-bold ml-1 ${state.message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                            {state.message}
                        </p>
                    )}

                    <Button type="submit" disabled={isPending} className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
                        {isPending ? 'Adding...' : 'Add Category'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
