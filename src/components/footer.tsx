import Link from 'next/link';
import { Mail, Github, Twitter, Linkedin, Facebook, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
    return (
        <footer className="w-full glass border-t border-white/10 mt-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 group-hover:to-pink-400 transition-all duration-500 tracking-tight">
                                TechBlog
                            </span>
                        </Link>
                        <p className="text-muted-foreground/80 leading-relaxed font-medium text-sm">
                            Providing the most in-depth reviews, expert buying guides, and breaking tech news from around the globe. Elevating your digital experience.
                        </p>
                        <div className="flex items-center space-x-4">
                            <Link href="#" className="p-2.5 rounded-full glass hover:bg-primary/20 transition-all hover:scale-110 active:scale-95 group">
                                <Twitter className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" className="p-2.5 rounded-full glass hover:bg-primary/20 transition-all hover:scale-110 active:scale-95 group">
                                <Github className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" className="p-2.5 rounded-full glass hover:bg-primary/20 transition-all hover:scale-110 active:scale-95 group">
                                <Linkedin className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" className="p-2.5 rounded-full glass hover:bg-primary/20 transition-all hover:scale-110 active:scale-95 group">
                                <Facebook className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Explore */}
                    <div className="space-y-6 lg:pl-10">
                        <h4 className="text-lg font-bold tracking-tight text-glow">Quick Explore</h4>
                        <ul className="space-y-4 text-sm font-semibold">
                            <li><Link href="/posts" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Latest Articles</Link></li>
                            <li><Link href="/category/reviews" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Tech Reviews</Link></li>
                            <li><Link href="/category/guides" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Buying Guides</Link></li>
                            <li><Link href="/admin" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Admin Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold tracking-tight text-glow">Resources</h4>
                        <ul className="space-y-4 text-sm font-semibold">
                            <li><Link href="/privacy-policy" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Terms of Service</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Contact Support</Link></li>
                            <li><Link href="/affiliate-disclosure" className="text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 group"><div className="h-1 w-1 bg-primary/40 rounded-full group-hover:w-3 transition-all" /> Affiliate Disclosure</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold tracking-tight text-glow">Newsletter</h4>
                        <p className="text-muted-foreground/80 leading-relaxed font-medium text-sm">
                            Get the weekly digest of tech insights delivered right to your inbox.
                        </p>
                        <div className="relative group">
                            <Input
                                placeholder="Your email..."
                                className="pl-4 pr-12 h-12 glass-card border-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all rounded-2xl bg-white/5 font-semibold text-sm"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all active:scale-90 shadow-lg">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm font-medium text-muted-foreground/60">
                        &copy; {new Date().getFullYear()} <span className="text-primary font-bold">TechBlog</span>. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-muted-foreground/40 italic">
                        <span>Made with Precision</span>
                        <span>Inspired by Innovation</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
