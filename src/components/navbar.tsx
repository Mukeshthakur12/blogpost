'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleSearch from '@/components/GoogleSearch';

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
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-500 overflow-hidden">
                        {/* Inner glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent flex items-center justify-center pointer-events-none" />
                        <span className="text-white font-black text-2xl relative z-10 tracking-tighter mix-blend-overlay">
                            A
                        </span>
                        <span className="text-white font-black text-2xl absolute z-20 tracking-tighter opacity-90">
                            A
                        </span>
                    </div>
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 group-hover:to-pink-400 transition-all duration-500 tracking-tight">
                        Appzyra
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
                    <Link
                        href="/contact"
                        className="relative text-foreground/70 hover:text-foreground transition-all duration-300 group py-2"
                    >
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                </nav>

                <div className="hidden md:flex items-center space-x-6">
                    <div className="search-container w-full max-w-xs lg:max-w-sm">
                        <GoogleSearch
                            className="w-full"
                            inputClassName="h-11 rounded-full border-none bg-white/5 glass-card transition-all focus-visible:ring-2 focus-visible:ring-primary/40"
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
                        className="md:hidden absolute top-20 left-4 right-4 z-40 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl"
                    >
                        <nav className="flex flex-col space-y-4">
                            <div className="search-container mb-2 w-full">
                                <GoogleSearch
                                    className="w-full"
                                    inputClassName="h-14 rounded-2xl border border-white/10 bg-white/10 font-bold text-white placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-primary/40"
                                    placeholder="Search stories..."
                                    onSearch={() => setIsMobileMenuOpen(false)}
                                />
                            </div>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    className="rounded-xl px-4 py-2 text-lg font-bold transition-colors hover:bg-white/10"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <Link
                                href="/posts"
                                className="rounded-xl px-4 py-2 text-lg font-bold transition-colors hover:bg-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                All Posts
                            </Link>
                            <Link
                                href="/contact"
                                className="rounded-xl px-4 py-2 text-lg font-bold transition-colors hover:bg-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
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
