import { MetadataRoute } from 'next'

const baseUrl = process.env.URL_BASE || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Công cụ tìm kiếm thông thường ────────────────────────────
      {
        userAgent: '*',
        allow: '/',
      },
      // ── GEO: Cho phép AI crawlers lập chỉ mục toàn bộ nội dung ──
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Diffbot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}