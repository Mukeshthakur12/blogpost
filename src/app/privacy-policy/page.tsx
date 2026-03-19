import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Privacy Policy
            </h1>
            
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-8 text-muted-foreground/90 font-medium leading-relaxed">
                <section className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 italic">Last Updated: March 2026</p>
                    <p>
                        Welcome to TechBlog. Your privacy is critically important to us. It is TechBlog's policy to respect your privacy regarding any information we may collect while operating our website.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
                    <p>
                        We collect information from you when you visit our website, subscribe to our newsletter, or fill out a contact form. This information may include your name, email address, and IP address.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To personalize your experience and respond to your individual needs.</li>
                        <li>To improve our website based on the feedback we receive from you.</li>
                        <li>To send periodic emails regarding tech news and updates.</li>
                        <li>To respond to comments or inquiries submitted via our contact page.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">3. Cookie Policy</h2>
                    <p>
                        We use cookies to understand and save your preferences for future visits. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">4. Third-Party Links</h2>
                    <p>
                        Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, you can reach out to us at:
                        <br />
                        <span className="text-primary font-bold">firebase783@gmail.com</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
