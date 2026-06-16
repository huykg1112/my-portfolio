import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { Analytics } from '@vercel/analytics/next'
import '../../styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/footer'
import ChatbotLoader from '@/components/chatbot/chatbot-loader'
import { routing } from '@/i18n/routing'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const baseUrl = process.env.URL_BASE || 'https://thhuydev.id.vn'
const OG_IMAGE = 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png'
const LOGO = 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#100e19' },
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const ogLocale = locale === 'vi' ? 'vi_VN' : 'en_US'

  return {
    title: {
      default: 'Trần Hoàng Huy – Frontend Developer | React / Next.js',
      template: '%s | Trần Hoàng Huy',
    },
    description:
      'Trần Hoàng Huy là Frontend Developer chuyên về ReactJS và Next.js, tốt nghiệp Kỹ thuật Phần mềm Đại học Cần Thơ (GPA 3.58). Hành trình, dự án và kinh nghiệm ở TekNix, Green Space Solution, UTA.',
    keywords: [
      'Trần Hoàng Huy', 'Tran Hoang Huy', 'huykg1112',
      'Frontend Developer Vietnam', 'React Developer', 'Next.js Developer',
      'Frontend Developer Cần Thơ', 'TypeScript Developer', 'Tailwind CSS',
      'Portfolio', 'Lập trình viên', 'Đại học Cần Thơ', 'TekNix',
      'WordPress Developer', 'RESTful API', 'NestJS',
    ],
    authors: [{ name: 'Trần Hoàng Huy', url: baseUrl }],
    creator: 'Trần Hoàng Huy',
    publisher: 'Trần Hoàng Huy',
    generator: 'Next.js',
    category: 'technology',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'vi-VN': '/vi',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: 'Trần Hoàng Huy – Frontend Developer | React / Next.js',
      description:
        'Frontend Developer specializing in ReactJS & Next.js. Graduated Can Tho University (GPA 3.58). Experienced at TekNix Technology, Green Space Solution, UTA.',
      type: 'profile',
      locale: ogLocale,
      alternateLocale: ogLocale === 'vi_VN' ? 'en_US' : 'vi_VN',
      url: `${baseUrl}/${locale}`,
      siteName: 'Trần Hoàng Huy Portfolio',
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: 'Trần Hoàng Huy – Software Engineer Portfolio', type: 'image/png' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Trần Hoàng Huy – Frontend Developer',
      description: 'Frontend Developer (React / Next.js) | Portfolio & projects.',
      images: [OG_IMAGE],
      creator: '@huykg1112',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
      icon: [{ url: LOGO, type: 'image/png' }],
      apple: [{ url: LOGO, sizes: '180x180', type: 'image/png' }],
      shortcut: LOGO,
    },
    manifest: '/manifest.webmanifest',
  }
}

// ─── JSON-LD Structured Data (SEO + AEO + GEO) ───────────────────────────────
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/#person`,
  name: 'Trần Hoàng Huy',
  givenName: 'Huy',
  familyName: 'Trần Hoàng',
  alternateName: ['Tran Hoang Huy', 'huykg1112'],
  jobTitle: 'Frontend Developer',
  description:
    'Frontend Developer chuyên về ReactJS và Next.js. Tốt nghiệp Kỹ thuật Phần mềm Đại học Cần Thơ (GPA 3.58/4.0, 2025). Hiện là Frontend Intern tại TekNix Technology Corporation.',
  url: baseUrl,
  birthDate: '2002-12-11',
  image: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 630, caption: 'Trần Hoàng Huy – Frontend Developer' },
  email: 'huyth.dev@gmail.com',
  telephone: '+84334114244',
  nationality: { '@type': 'Country', name: 'Vietnam' },
  address: { '@type': 'PostalAddress', addressLocality: 'Ninh Kiều, Cần Thơ', addressCountry: 'VN' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Trường Đại học Cần Thơ',
    alternateName: 'Can Tho University',
    url: 'https://www.ctu.edu.vn',
    address: { '@type': 'PostalAddress', addressLocality: 'Cần Thơ', addressCountry: 'VN' },
  },
  worksFor: { '@type': 'Organization', name: 'TekNix Technology Corporation', url: 'https://www.teknix.vn' },
  knowsAbout: [
    'ReactJS', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Shadcn/UI',
    'Redux Toolkit', 'NestJS', 'RESTful APIs', 'GraphQL', 'PostgreSQL', 'Prisma ORM',
    'WordPress', 'Git', 'Vercel', 'Flutter', 'Responsive Design', 'SEO',
  ],
  knowsLanguage: ['vi', 'en'],
  sameAs: [
    'https://thhuydev.id.vn',
    'https://github.com/huykg1112',
    'https://www.linkedin.com/in/hoang-huy-tran-23baa6358',
    'https://www.facebook.com/tran.huy.113299/',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Trần Hoàng Huy Portfolio',
  alternateName: 'THH Portfolio',
  url: baseUrl,
  description: 'Personal portfolio of Trần Hoàng Huy – Software Engineer',
  inLanguage: ['vi-VN', 'en-US'],
  author: { '@id': `${baseUrl}/#person` },
  creator: { '@id': `${baseUrl}/#person` },
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <meta name="author" content="Trần Hoàng Huy" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Cần Thơ, Việt Nam" />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:font-semibold"
        >
          Skip to main content
        </a>

        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(personSchema)}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>

        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            {children}
            <Footer />
            <ChatbotLoader />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
