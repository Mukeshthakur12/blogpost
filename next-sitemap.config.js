/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tech-blog-demo.vercel.app',
    generateRobotsTxt: true,
    // optional
    robotsTxtOptions: {
        additionalSitemaps: [
            // 'https://example.com/my-custom-sitemap-1.xml',
        ],
    },
}
