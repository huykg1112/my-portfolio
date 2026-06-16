import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const baseUrl = process.env.URL_BASE || 'https://thhuydev.id.vn'
const LAST_MODIFIED = new Date()

const PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/docs', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${p.path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${baseUrl}/${l}${p.path}`])),
      },
    }))
  )
}
