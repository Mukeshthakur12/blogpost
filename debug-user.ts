import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log('User not found');
        return;
    }

    console.log('User found:', {
        id: user.id,
        email: user.email,
        passwordHash: user.password
    });

    const testPassword = 'Adminmk@123';
    const isMatch = await bcrypt.compare(testPassword, user.password);

    console.log(`Password '${testPassword}' match:`, isMatch);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
