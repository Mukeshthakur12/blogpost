import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('Adminmk@123', 12)
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            password: password,
        },
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: password,
            // role: 'ADMIN', 
        },
    })

    // Seed Categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'reviews' },
            update: {},
            create: { name: 'Reviews', slug: 'reviews', description: 'In-depth tech reviews' },
        }),
        prisma.category.upsert({
            where: { slug: 'guides' },
            update: {},
            create: { name: 'Guides', slug: 'guides', description: 'Buying guides and tutorials' },
        }),
        prisma.category.upsert({
            where: { slug: 'news' },
            update: {},
            create: { name: 'News', slug: 'news', description: 'Latest tech news' },
        }),
    ]);

    // Seed Posts
    await prisma.post.upsert({
        where: { slug: 'welcome-to-techblog' },
        update: {},
        create: {
            title: 'Welcome to TechBlog',
            slug: 'welcome-to-techblog',
            content: '# Welcome to TechBlog\n\nThis is our first post. Stay tuned for more!',
            excerpt: 'Welcome to our new tech blogging platform.',
            published: true,
            authorId: user.id,
            categoryId: categories[0].id, // Reviews
        }
    });

    console.log({ user, categories })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
