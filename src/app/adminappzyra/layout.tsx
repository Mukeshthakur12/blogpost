import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    FileText,
    Tags,
    Users,
    Settings,
    LogOut,
    FolderTree
} from 'lucide-react';
import { signOut } from '@/lib/auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className="flex min-h-screen bg-mesh selection:bg-primary/30">
            {/* Sidebar */}
            <aside className="w-80 glass border-r border-white/5 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-10">
                    <Link href="/admin" className="group">
                        <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 group-hover:to-pink-400 transition-all duration-500">
                            Admin Hub
                        </span>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-black mt-2">The Control Center</p>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-3 overflow-y-auto">
                    {[
                        { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
                        { href: '/admin/posts', icon: FileText, label: 'All Posts' },
                        { href: '/admin/categories', icon: FolderTree, label: 'Categories' },
                        { href: '/admin/tags', icon: Tags, label: 'Manage Tags' },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-4 px-6 py-4 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-2xl transition-all duration-300 group"
                        >
                            <item.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                            <span className="font-bold tracking-tight">{item.label}</span>
                        </Link>
                    ))}

                    <div className="pt-8 mt-8 border-t border-white/5 pb-10">
                        <form action={async () => {
                            'use server';
                            await signOut();
                        }}>
                            <button className="flex w-full items-center gap-4 px-6 py-4 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all group">
                                <LogOut className="h-5 w-5" />
                                <span className="font-bold tracking-tight">Sign Out</span>
                            </button>
                        </form>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12">
                {children}
            </main>
        </div>
    );
}
