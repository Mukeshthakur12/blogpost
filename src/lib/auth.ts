import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { authConfig } from '@/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log('Authorize called with:', JSON.stringify(credentials));

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const normalizedEmail = email.toLowerCase();
                    console.log('Parsed credentials for:', normalizedEmail);

                    try {
                        const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
                        if (!user) {
                            console.log('User not found in database');
                            return null;
                        }

                        console.log('User found:', user.email);
                        console.log('Stored hash:', user.password);
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        console.log('Password match result:', passwordsMatch);

                        if (passwordsMatch) {
                            console.log('Login successful');
                            return user;
                        } else {
                            console.log('Password mismatch');
                        }
                    } catch (e) {
                        console.error('Database/Bcrypt error:', e);
                        return null;
                    }
                } else {
                    console.log('Zod parsing failed:', parsedCredentials.error);
                }

                console.log('Login failed - returning null');
                return null;
            },
        }),
    ],
});
