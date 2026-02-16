'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
    post: {
        title: string;
        slug: string;
        excerpt?: string | null;
        createdAt: Date;
        category?: { name: string; slug: string } | null;
        coverImage?: string | null;
    };
    index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
        >
            <Link href={`/${post.slug}`} className="block h-full">
                <Card className="h-full overflow-hidden glass-card group rounded-[2rem] border-white/5 transition-all duration-500">
                    <div className="relative h-64 w-full overflow-hidden">
                        {post.coverImage ? (
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                                <span className="text-6xl filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20">📖</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {post.category && (
                            <Badge className="absolute top-6 left-6 glass bg-black/20 text-white border-white/20 px-4 py-1.5 rounded-full font-bold uppercase tracking-tight text-[10px] hover:bg-primary transition-all duration-300">
                                {post.category.name}
                            </Badge>
                        )}
                    </div>

                    <CardContent className="p-8">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-4 font-black flex items-center gap-3">
                            <span>{post.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <div className="h-1 w-1 rounded-full bg-primary/40" />
                            <span className="text-primary/60">5 min read</span>
                        </div>

                        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                            {post.title}
                        </h3>

                        <p className="text-muted-foreground/70 text-base line-clamp-3 leading-relaxed font-medium">
                            {post.excerpt || "Unlock the potential of this article as we explore the deeper nuances of technology."}
                        </p>

                        <div className="mt-8 flex items-center text-primary font-bold text-sm tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
