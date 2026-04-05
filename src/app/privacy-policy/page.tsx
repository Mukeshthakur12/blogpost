import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="mb-8 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                Privacy Policy
            </h1>

            <div className="glass space-y-8 rounded-[2.5rem] border-white/5 p-8 font-medium leading-relaxed text-muted-foreground/90 md:p-12">
                <section className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 italic">
                        Last Updated: April 5, 2026
                    </p>
                    <p>
                        This Privacy Policy explains how Appzyra collects, uses, shares, and protects
                        information when you visit <span className="text-foreground">blog.appzyra.com</span> and
                        related pages on this website. It is designed to describe our current content,
                        contact, login, affiliate, and publisher-related features in clear language.
                    </p>
                    <p>
                        By using the site, you agree to the practices described here. If you do not agree,
                        please stop using the site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
                    <p>Depending on how you use the site, we may collect the following categories of information:</p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            Contact information you voluntarily provide, such as your name, email address,
                            subject line, or message when you use a contact or email submission feature.
                        </li>
                        <li>
                            Account or admin authentication information, such as email address and login-related
                            details, when authorized users sign in to manage the website.
                        </li>
                        <li>
                            Content submission data, including files or images uploaded by authorized site
                            administrators for publishing and content management.
                        </li>
                        <li>
                            Technical and usage information such as IP address, browser type, device
                            information, referring pages, approximate location, pages viewed, and timestamps.
                        </li>
                        <li>
                            Cookie and similar identifier data used by the site, hosting providers, or third-party
                            tools that help operate content, security, measurement, or publisher features.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">2. How We Use Information</h2>
                    <p>We may use information we collect to:</p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>Operate, maintain, and improve the website and its content.</li>
                        <li>Respond to questions, support requests, business inquiries, or feedback.</li>
                        <li>Protect the website, detect abuse, debug issues, and maintain security.</li>
                        <li>Manage editorial workflows, publishing tools, and administrator access.</li>
                        <li>Measure performance, understand how visitors use the site, and improve usability.</li>
                        <li>Comply with legal obligations and enforce our site policies.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">3. Cookies and Similar Technologies</h2>
                    <p>
                        Appzyra and our service providers may use cookies, local storage, pixels, log files,
                        web beacons, IP addresses, or similar technologies to remember preferences, maintain
                        sessions, improve security, and understand traffic patterns.
                    </p>
                    <p>
                        Some third-party services embedded on the site may also place or read cookies on your
                        browser or collect information through web beacons, IP addresses, or other identifiers.
                        You can usually control cookies through your browser settings, although disabling them
                        may affect some features.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">4. Google and Other Third-Party Services</h2>
                    <p>
                        We may use third-party tools or integrations to support publishing, hosting, search,
                        storage, sign-in, media delivery, affiliate linking, and site operations. These providers
                        may process technical data such as IP address, browser information, device identifiers,
                        cookie data, or page interaction data according to their own privacy policies.
                    </p>
                    <p>
                        Appzyra currently includes Google publisher-related functionality. As a result, Google or
                        its partners may collect and use data when these features load or operate. Google requires
                        publishers using its services to clearly disclose this type of collection and sharing.
                    </p>
                    <p>
                        You can learn more here:{' '}
                        <a
                            href="https://policies.google.com/technologies/partner-sites"
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-primary hover:text-primary/80"
                        >
                            How Google uses information from sites or apps that use its services
                        </a>
                        .
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">5. Affiliate Links and Outbound Links</h2>
                    <p>
                        Some pages may contain affiliate links. If you click an affiliate link or make a purchase,
                        a third party may track that referral and we may earn a commission at no additional cost
                        to you. External websites have their own privacy practices, and we are not responsible
                        for the content, security, or data handling of third-party sites.
                    </p>
                    <p>
                        For more details, please review our{' '}
                        <Link href="/affiliate-disclosure" className="font-bold text-primary hover:text-primary/80">
                            Affiliate Disclosure
                        </Link>
                        .
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">6. Data Sharing</h2>
                    <p>We do not sell your personal information in the ordinary course of operating this site. We may share information:</p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>With vendors and service providers that help us operate the website.</li>
                        <li>With analytics, hosting, storage, authentication, or publisher-service partners.</li>
                        <li>When required by law, regulation, court order, or valid legal request.</li>
                        <li>To protect our rights, users, systems, or investigate fraud, abuse, or security issues.</li>
                        <li>As part of a business transfer if the site or its assets are sold or reorganized.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">7. Data Retention</h2>
                    <p>
                        We keep information only for as long as reasonably necessary for the purposes described in
                        this policy, including site operations, security, recordkeeping, dispute resolution, and
                        legal compliance. Retention periods may vary depending on the type of data and how it was
                        collected.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">8. Security</h2>
                    <p>
                        We use reasonable administrative, technical, and organizational measures to protect
                        information, but no website or online system can guarantee absolute security. You use the
                        site and transmit information to us at your own risk.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">9. Your Choices and Rights</h2>
                    <p>
                        Depending on where you live, you may have rights to request access to, correction of,
                        deletion of, or restriction of certain personal information. You may also be able to object
                        to certain processing or withdraw consent where consent is the legal basis.
                    </p>
                    <p>
                        You can also manage cookies in your browser and choose whether to contact us or provide
                        personal information through site forms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">10. Children&apos;s Privacy</h2>
                    <p>
                        This website is not directed to children under 13, and we do not knowingly collect personal
                        information from children under 13. If you believe a child has submitted personal
                        information to us, please contact us so we can review and delete it if appropriate.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">11. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in the website,
                        technology, legal requirements, or our practices. The updated version will be posted on this
                        page with a revised effective date.
                    </p>
                </section>

                <section className="space-y-4 border-t border-white/5 pt-8">
                    <h2 className="text-2xl font-bold text-foreground">12. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy or want to make a privacy-related request,
                        contact us at:
                    </p>
                    <p className="font-bold text-primary">firebase783@gmail.com</p>
                </section>
            </div>
        </div>
    );
}
