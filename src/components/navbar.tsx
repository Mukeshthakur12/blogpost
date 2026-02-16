'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    categories: {
        id: string;
        name: string;
        slug: string;
    }[];
}

export default function Navbar({ categories }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled
                ? 'glass border-b border-white/10 shadow-lg'
                : 'bg-transparent border-transparent'
                }`}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 group-hover:to-pink-400 transition-all duration-500">
                        TechBlog
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10 text-sm font-semibold">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="relative text-foreground/70 hover:text-foreground transition-all duration-300 group py-2"
                        >
                            {cat.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/posts"
                        className="relative text-foreground/70 hover:text-foreground transition-all duration-300 group py-2"
                    >
                        All Posts
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                </nav>

                <div className="hidden md:flex items-center space-x-6">
                    <div className="relative w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                        <Input
                            placeholder="Search..."
                            className="pl-12 h-11 glass-card border-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all rounded-full bg-white/5"
                        />
                    </div>
                    {/* <Link href="/login">
                        <Button variant="default" className="rounded-full px-8 h-11 font-bold bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-primary/40 transition-all active:scale-95">
                            Login
                        </Button>
                    </Link> */}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-3 rounded-full glass hover:bg-white/10 transition-all active:scale-90"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-4 right-4 z-40 glass rounded-3xl p-6 shadow-2xl border border-white/10"
                    >
                        <nav className="flex flex-col space-y-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    className="text-lg font-bold px-4 py-2 hover:bg-white/5 rounded-xl transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <Link
                                href="/posts"
                                className="text-lg font-bold px-4 py-2 hover:bg-white/5 rounded-xl transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                All Posts
                            </Link>
                            {/* <div className="pt-4 border-t border-white/10">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full h-12 rounded-2xl text-lg font-bold">Login</Button>
                                </Link>
                            </div> */}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
