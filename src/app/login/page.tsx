'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="glass shadow-2xl rounded-[2.5rem] border-white/5 overflow-hidden">
                    <CardHeader className="pt-12 px-10 pb-4 text-center">
                        <CardTitle className="text-4xl font-black tracking-tight text-glow">Admin Portal</CardTitle>
                        <CardDescription className="text-muted-foreground/60 font-medium text-lg pt-2">
                            Enter the hub of creativity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-10 pb-12 pt-6">
                        <form action={formAction} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="admin@example.com"
                                    required
                                    className="h-14 rounded-2xl glass-card border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-sm font-bold tracking-wide uppercase opacity-60 ml-1">Secure Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    className="h-14 rounded-2xl glass-card border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/40 text-lg transition-all"
                                />
                            </div>

                            {errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
                                >
                                    <span className="text-lg">⚠️</span> {errorMessage}
                                </motion.div>
                            )}

                            <Button type="submit" className="w-full h-16 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95" disabled={isPending}>
                                {isPending ? 'Unlocking...' : 'Login to Dashboard'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
