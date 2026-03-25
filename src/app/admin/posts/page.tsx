import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deletePost } from '@/lib/actions/post';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash } from 'lucide-react';

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        include: { author: true, category: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id} className="group hover:bg-white/5 transition-colors h-20">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/5 flex-shrink-0">
                                            {post.coverImage ? (
                                                <img src={post.coverImage} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20">
                                                    <Plus className="w-4 h-4 rotate-45" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-base leading-tight">{post.title}</p>
                                            {post.featured && (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Featured</span>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-tighter ${post.published ? 'bg-green-500/20 text-green-500 border border-green-500/20' : 'bg-white/5 text-muted-foreground border border-white/5'}`}>
                                        {post.published ? 'Live' : 'Draft'}
                                    </span>
                                </TableCell>
                                <TableCell className="font-bold opacity-60">{post.category?.name || 'Uncategorized'}</TableCell>
                                <TableCell className="text-sm">{post.author.name}</TableCell>
                                <TableCell className="text-xs font-medium opacity-40">{post.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end items-center space-x-2">
                                        <Link href={`/${post.slug}`} target="_blank">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/20 hover:text-primary">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/posts/${post.id}`}>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            'use server';
                                            await deletePost(post.id);
                                        }}>
                                            <Button type="submit" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {posts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No posts found. Create your first one.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
