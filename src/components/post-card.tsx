'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3 } from 'lucide-react';

interface PostCardProps {
    post: {
        title: string;
        seoTitle?: string | null;
        slug: string;
        excerpt?: string | null;
        createdAt: Date;
        category?: { name: string; slug: string } | null;
        coverImage?: string | null;
        featured?: boolean;
    };
    index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
    const displayTitle = post.seoTitle || post.title;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
        >
            <Link href={`/${post.slug}`} className="block h-full">
                <Card className="group h-full overflow-hidden rounded-[1.75rem] border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] transition-all duration-500 hover:border-white/10 hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <div className="relative h-52 w-full overflow-hidden sm:h-60">
                        {post.coverImage ? (
                            <img
                                src={post.coverImage}
                                alt={displayTitle}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                                <span className="text-6xl filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20">📖</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500" />

                        <div className="absolute left-4 top-4 flex flex-col gap-2 sm:left-5 sm:top-5">
                            {post.category && (
                                <Badge className="rounded-full border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:bg-primary">
                                    {post.category.name}
                                </Badge>
                            )}
                            {post.featured && (
                                <Badge className="border-none bg-amber-500/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-amber-500/20">
                                    ★ Featured
                                </Badge>
                            )}
                        </div>
                    </div>

                    <CardContent className="p-5 sm:p-6">
                        <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                            <span>{new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(post.createdAt))}</span>
                            <div className="h-1 w-1 rounded-full bg-primary/60" />
                            <span className="inline-flex items-center gap-1 text-primary/90">
                                <Clock3 className="h-3.5 w-3.5" />
                                5 min read
                            </span>
                        </div>

                        <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                            {displayTitle}
                        </h3>

                        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {post.excerpt || "Unlock the potential of this article as we explore the deeper nuances of technology."}
                        </p>

                        <div className="mt-6 flex items-center text-sm font-bold tracking-tight text-primary opacity-70 transition-all duration-500 group-hover:opacity-100">
                            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
