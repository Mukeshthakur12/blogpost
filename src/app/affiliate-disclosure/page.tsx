import React from 'react';

export default function AffiliateDisclosure() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 font-inter">
                Affiliate Disclosure
            </h1>
            
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-8 text-muted-foreground/90 font-medium leading-relaxed">
                <section className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 italic">Updated: March 2026</p>
                    <p>
                        In compliance with the FTC guidelines, please assume that any and all links on this website are affiliate links. If you purchase products through these links, Appzyra may receive a small commission at no additional cost to you.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Why We Use Affiliate Links</h2>
                    <p>
                        Our goal at Appzyra is to provide the most comprehensive and unbiased tech reviews possible. Running a high-quality content platform requires significant resources. Affiliate commissions help us maintain our testing equipment, pay our writers, and keep the site free for all readers.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Our Integrity Guarantee</h2>
                    <p>
                        We only recommend products that we actually believe in. Our reviews are based on rigorous testing and research. The fact that a product has an affiliate program does not influence our rating or decision to recommend it.
                    </p>
                </section>

                <section className="space-y-4 border-t border-white/5 pt-8">
                    <p>
                        Transparency is our priority. If you have questions about how we use affiliate links, please contact us at: <br />
                        <span className="text-primary font-bold">firebase783@gmail.com</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
