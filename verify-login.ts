import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

async function main() {
    console.log('Testing login logic...');

    // Simulate what authorize receives
    const email = 'admin@example.com';
    const password = 'Adminmk@123';

    console.log(`Checking: ${email} / ${password}`);

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log('User NOT found in DB');
            return;
        }
        console.log('User found in DB:', user.email);
        console.log('Stored hash:', user.password);

        const match = await bcrypt.compare(password, user.password);
        console.log('Bcrypt match result:', match);

        if (match) {
            console.log('Login logic SUCCESS');
        } else {
            console.log('Login logic FAILED');
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
