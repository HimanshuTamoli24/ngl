/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.asklyy.tech',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/dashboard',
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/verify/*'
  ],
  additionalPaths: async (config) => {
    // Add dynamic user pages if needed
    return []
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/api/',
          '/admin/',
          '/_next/',
          '/verify/'
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.asklyy.tech/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom transform for different page types
    if (path.startsWith('/u/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
