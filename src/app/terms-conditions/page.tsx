import Link from 'next/link';

export default function TermsConditions() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="mb-8 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                Terms &amp; Conditions
            </h1>

            <div className="glass space-y-8 rounded-[2.5rem] border-white/5 p-8 font-medium leading-relaxed text-muted-foreground/90 md:p-12">
                <section className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 italic">
                        Effective Date: April 5, 2026
                    </p>
                    <p>
                        These Terms &amp; Conditions govern your access to and use of Appzyra, including
                        <span className="text-foreground"> blog.appzyra.com</span> and related pages, content,
                        tools, and services made available through the website.
                    </p>
                    <p>
                        By accessing or using the site, you agree to be bound by these terms. If you do not
                        agree, you should not use the website.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">1. Use of the Website</h2>
                    <p>
                        You may use this website only for lawful purposes and in accordance with these terms.
                        You agree not to misuse the website, interfere with its operation, attempt unauthorized
                        access, or use the site in a way that could damage Appzyra, its users, or its services.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">2. Content and Intellectual Property</h2>
                    <p>
                        Unless otherwise stated, the articles, text, graphics, branding, layout, images, and
                        other content on this website are owned by or licensed to Appzyra and are protected by
                        applicable intellectual property laws.
                    </p>
                    <p>
                        You may view and use the content for personal, non-commercial purposes. You may not copy,
                        republish, distribute, modify, scrape, reproduce, or commercially exploit site content
                        without prior written permission, except where allowed by law.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">3. Editorial Content and No Professional Advice</h2>
                    <p>
                        Appzyra publishes reviews, comparisons, buying guides, news, and opinion-based content for
                        general informational purposes only. While we aim to keep content accurate and useful, we
                        do not guarantee that all information is complete, current, error-free, or suitable for
                        your specific needs.
                    </p>
                    <p>
                        Nothing on the site should be treated as legal, financial, tax, medical, or other
                        professional advice. You are responsible for verifying product details, pricing,
                        compatibility, availability, and suitability before making decisions.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">4. Product Information and External Offers</h2>
                    <p>
                        Product specifications, prices, ratings, promotions, stock status, and merchant terms can
                        change at any time. Appzyra is not responsible for inaccuracies caused by third-party
                        sellers, brands, marketplaces, or service providers.
                    </p>
                    <p>
                        Any purchase you make from a third-party website is solely between you and that third
                        party, and their terms and policies will apply.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">5. Affiliate Relationships</h2>
                    <p>
                        Some links on the website may be affiliate links, which means Appzyra may earn a commission
                        if you click through or make a purchase. Affiliate relationships do not guarantee product
                        availability, merchant performance, warranty coverage, or pricing accuracy.
                    </p>
                    <p>
                        Please also review our{' '}
                        <Link href="/affiliate-disclosure" className="font-bold text-primary hover:text-primary/80">
                            Affiliate Disclosure
                        </Link>
                        .
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">6. Third-Party Links and Services</h2>
                    <p>
                        The website may link to or integrate with third-party websites, tools, or services,
                        including publisher, authentication, storage, search, and external merchant platforms. We
                        do not control those third parties and are not responsible for their content, conduct,
                        uptime, security, or privacy practices.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">7. User Submissions and Communications</h2>
                    <p>
                        If you send us messages, inquiries, feedback, or other submissions, you represent that
                        your content does not violate any law or third-party rights. You also agree not to send
                        spam, malicious code, abusive content, or misleading information through the site.
                    </p>
                    <p>
                        We may review, ignore, store, or respond to communications at our discretion, subject to
                        our privacy practices.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">8. Account and Admin Access</h2>
                    <p>
                        Restricted areas of the site, including administrative tools, are intended only for
                        authorized users. You must not attempt to access protected areas without permission, bypass
                        security controls, or use another person&apos;s credentials.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">9. Disclaimer of Warranties</h2>
                    <p>
                        The website and all content are provided on an &quot;as is&quot; and &quot;as available&quot;
                        basis without warranties of any kind, express or implied, including warranties of
                        merchantability, fitness for a particular purpose, non-infringement, availability, or
                        accuracy.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">10. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, Appzyra and its owners, contributors, affiliates,
                        service providers, and partners will not be liable for any indirect, incidental, special,
                        consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data,
                        goodwill, or business opportunities arising from or related to your use of the website.
                    </p>
                    <p>
                        This includes losses related to reliance on content, third-party purchases, service
                        interruptions, technical failures, or unauthorized access.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">11. Indemnification</h2>
                    <p>
                        You agree to defend, indemnify, and hold harmless Appzyra and its operators from claims,
                        liabilities, damages, losses, and expenses arising out of your misuse of the website, your
                        violation of these terms, or your infringement of any third-party rights.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">12. Privacy</h2>
                    <p>
                        Your use of the website is also subject to our{' '}
                        <Link href="/privacy-policy" className="font-bold text-primary hover:text-primary/80">
                            Privacy Policy
                        </Link>
                        , which explains how we collect and use information.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">13. Changes to These Terms</h2>
                    <p>
                        We may update these Terms &amp; Conditions at any time. Updated terms become effective when
                        posted on this page unless otherwise stated. Your continued use of the website after a
                        change means you accept the revised terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">14. Governing Law</h2>
                    <p>
                        These terms are governed by the laws applicable in the jurisdiction from which the website
                        is operated, without regard to conflict of law principles. Any disputes should be resolved
                        in the appropriate courts of that jurisdiction, unless applicable law requires otherwise.
                    </p>
                </section>

                <section className="space-y-4 border-t border-white/5 pt-8">
                    <h2 className="text-2xl font-bold text-foreground">15. Contact</h2>
                    <p>
                        If you have questions about these Terms &amp; Conditions, contact:
                    </p>
                    <p className="font-bold text-primary">firebase783@gmail.com</p>
                </section>
            </div>
        </div>
    );
}
