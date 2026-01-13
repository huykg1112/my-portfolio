import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots{
    const baseUrl =  process.env.URL_BASE || 'http://localhost:3000';
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/about',
        },
        sitemap: baseUrl + '/sitemap.xml',
    };
}