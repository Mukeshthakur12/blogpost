'use client';

import React from 'react';
import { Mail, Send, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 leading-tight">
                            Get in Touch
                        </h1>
                        <p className="text-muted-foreground/80 text-xl font-medium leading-relaxed">
                            Have a question about a review or want to collaborate? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start space-x-6 group">
                            <div className="p-4 rounded-2xl glass group-hover:bg-primary/20 transition-all duration-500">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">Email Us</h4>
                                <p className="text-muted-foreground font-medium">firebase783@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-6 group">
                            <div className="p-4 rounded-2xl glass group-hover:bg-primary/20 transition-all duration-500">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">Call Support</h4>
                                <p className="text-muted-foreground font-medium">+1 (555) 000-TECH</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-6 group">
                            <div className="p-4 rounded-2xl glass group-hover:bg-primary/20 transition-all duration-500">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">Office</h4>
                                <p className="text-muted-foreground font-medium">Silicon Valley, CA, USA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="glass p-10 rounded-[3rem] border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] -mr-16 -mt-16" />
                    
                    <form className="space-y-6 relative" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-2">Full Name</label>
                                <Input 
                                    placeholder="John Doe" 
                                    className="h-14 bg-white/5 border-none rounded-2xl px-6 font-medium focus-visible:ring-primary/40 ring-offset-background/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-2">Email Address</label>
                                <Input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="h-14 bg-white/5 border-none rounded-2xl px-6 font-medium focus-visible:ring-primary/40 ring-offset-background/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-2">Subject</label>
                            <Input 
                                placeholder="Regarding latest review..." 
                                className="h-14 bg-white/5 border-none rounded-2xl px-6 font-medium focus-visible:ring-primary/40 ring-offset-background/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-2">Message</label>
                            <Textarea 
                                placeholder="Your message here..." 
                                className="min-h-[200px] bg-white/5 border-none rounded-3xl p-6 font-medium focus-visible:ring-primary/40"
                            />
                        </div>

                        <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                            Send Message <Send className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
}
