import React from 'react';

export default function TermsConditions() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Terms & Conditions
            </h1>
            
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-8 text-muted-foreground/90 font-medium leading-relaxed">
                <section className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 italic">Effective Date: March 2026</p>
                    <p>
                        By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws, and regulations.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">1. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Appzyra's website for personal, non-commercial transitory viewing only.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">2. Disclaimer</h2>
                    <p>
                        The materials on Appzyra's website are provided "as is". Appzyra makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">3. Limitations</h2>
                    <p>
                        In no event shall Appzyra or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Appzyra's Internet site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">4. Governing Law</h2>
                    <p>
                        Any claim relating to Appzyra's website shall be governed by the laws of the operating state without regard to its conflict of law provisions.
                    </p>
                </section>

                <section className="space-y-4 border-t border-white/5 pt-8">
                    <p>
                        For any inquiries regarding these terms, please contact: <br />
                        <span className="text-primary font-bold">firebase783@gmail.com</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
