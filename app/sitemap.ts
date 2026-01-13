import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Sitemap {
    const baseUrl =  process.env.URL_BASE || 'http://localhost:3000';
    return [
        {
            url: baseUrl + "/",
            lastModified: new Date(),
            changeFrequency: 'monthly', // dùng để chỉ tần suất thay đổi của trang
            priority: 1.0, // ưu tiên của trang trong sitemap
        },
        {
            url: baseUrl + "/about",
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: baseUrl + "/real-projects",
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}