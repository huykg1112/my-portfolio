import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'
import Footer from '@/components/footer'

const baseUrl = process.env.URL_BASE || 'http://localhost:3000'
const OG_IMAGE = 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png'
const LOGO = 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png'

// ─── Viewport (theme-color moved here per Next.js 14+) ───────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#100e19' },
    { media: '(prefers-color-scheme: light)', color: '#a755f0' },
  ],
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Trần Hoàng Huy – Software Engineer | Full-Stack Developer Vietnam',
    template: '%s | Trần Hoàng Huy',
  },
  description:
    'Trần Hoàng Huy là Software Engineer từ Việt Nam, chuyên về Full-Stack (Next.js, NestJS, React, TypeScript, PostgreSQL). Xem portfolio, dự án thực tế và kinh nghiệm làm việc.',
  keywords: [
    'Trần Hoàng Huy', 'Tran Hoang Huy', 'huykg1112',
    'Software Engineer Vietnam', 'Full-Stack Developer',
    'Next.js Developer', 'React Developer', 'NestJS Developer',
    'TypeScript', 'PostgreSQL', 'Portfolio', 'Web Developer Ho Chi Minh',
    'Lập trình viên', 'Can Tho University',
  ],
  authors: [{ name: 'Trần Hoàng Huy', url: baseUrl }],
  creator: 'Trần Hoàng Huy',
  publisher: 'Trần Hoàng Huy',
  generator: 'Next.js',
  category: 'technology',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Trần Hoàng Huy – Software Engineer | Full-Stack Developer',
    description:
      'Software Engineer specializing in Full-Stack development with Next.js, NestJS, React & TypeScript. View real projects, work experience and contact.',
    type: 'profile',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: baseUrl,
    siteName: 'Trần Hoàng Huy Portfolio',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Trần Hoàng Huy – Software Engineer Portfolio',
        type: 'image/png',
      },
    ],
    firstName: 'Huy',
    lastName: 'Trần Hoàng',
    username: 'huykg1112',
    gender: 'male',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trần Hoàng Huy – Software Engineer',
    description:
      'Full-Stack Developer (Next.js, NestJS, React, TypeScript). Portfolio & projects.',
    images: [OG_IMAGE],
    creator: '@huykg1112',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: LOGO, media: '(prefers-color-scheme: light)', type: 'image/png' },
      { url: LOGO, media: '(prefers-color-scheme: dark)', type: 'image/png' },
    ],
    apple: [{ url: LOGO, sizes: '180x180', type: 'image/png' }],
    shortcut: LOGO,
  },
  manifest: '/manifest.webmanifest',
  // ── Bổ sung sau khi có Google Search Console ──────────────────────────────
  // verification: { google: 'REPLACE_WITH_ACTUAL_CODE' },
}

// ─── JSON-LD Structured Data (SEO + AEO + GEO) ───────────────────────────────

/** 1. Person – core entity, every page references this by @id */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/#person`,
  name: 'Trần Hoàng Huy',
  givenName: 'Huy',
  familyName: 'Trần Hoàng',
  alternateName: ['Tran Hoang Huy', 'huykg1112'],
  jobTitle: 'Software Engineer',
  description:
    'Software Engineer specializing in Full-Stack web development with Next.js, NestJS, React, TypeScript and PostgreSQL. Final-year student at Can Tho University, currently interning at Teknix Corporation.',
  url: baseUrl,
  image: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    caption: 'Trần Hoàng Huy – Software Engineer',
  },
  email: 'huyth.dev@gmail.com',
  telephone: '+84334114244',
  nationality: { '@type': 'Country', name: 'Vietnam' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cần Thơ',
    addressCountry: 'VN',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Trường Đại học Cần Thơ',
    alternateName: 'Can Tho University',
    url: 'https://www.ctu.edu.vn',
    address: { '@type': 'PostalAddress', addressLocality: 'Cần Thơ', addressCountry: 'VN' },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Teknix Corporation',
    url: 'https://www.teknix.vn',
  },
  knowsAbout: [
    'React', 'Next.js', 'NestJS', 'TypeScript', 'JavaScript',
    'PostgreSQL', 'GraphQL', 'RESTful APIs', 'Tailwind CSS',
    'Full-Stack Web Development', 'AI Integration', 'PhoBERT',
    'WordPress', 'Git', 'Docker',
  ],
  knowsLanguage: ['vi', 'en'],
  sameAs: [
    'https://github.com/huykg1112',
    'https://www.linkedin.com/in/hoang-huy-tran-23baa6358',
    'https://www.facebook.com/tran.huy.113299/',
  ],
}

/** 2. WebSite – AEO: SearchAction lets search engines surface sitelinks search */
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
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

/** 3. ProfilePage – GEO: new schema type for personal portfolio pages */
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${baseUrl}/#profilepage`,
  url: baseUrl,
  name: 'Trần Hoàng Huy – Software Engineer Portfolio',
  isPartOf: { '@id': `${baseUrl}/#website` },
  about: { '@id': `${baseUrl}/#person` },
  mainEntity: { '@id': `${baseUrl}/#person` },
  dateCreated: '2025-01-01T00:00:00+07:00',
  dateModified: new Date().toISOString(),
  inLanguage: ['vi-VN', 'en-US'],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl }],
  },
}

/** 4. FAQPage – AEO: answers common questions AI & search engines ask */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${baseUrl}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Trần Hoàng Huy là ai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trần Hoàng Huy (Tran Hoang Huy) là một Software Engineer đến từ Cần Thơ, Việt Nam. Anh hiện là sinh viên năm cuối ngành Kỹ thuật phần mềm tại Đại học Cần Thơ và đang thực tập tại Teknix Corporation, specializing in Full-Stack web development.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Trần Hoàng Huy specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trần Hoàng Huy specializes in Next.js, React, NestJS, TypeScript, PostgreSQL, GraphQL, Tailwind CSS, and WordPress. He has experience building AI-integrated web applications using PhoBERT for natural language processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What projects has Trần Hoàng Huy built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Trần Hoàng Huy's notable projects include: (1) E-Commerce Farm Project – his bachelor's thesis, an AI-powered agricultural e-commerce platform using Next.js, NestJS, PostgreSQL and a PhoBERT-based crop disease diagnosis model with ~97% accuracy. (2) Portfolio Website – built with Next.js, Tailwind CSS and deployed on Vercel. (3) Booking Homestay – a full-stack property booking web app.",
      },
    },
    {
      '@type': 'Question',
      name: 'Where has Trần Hoàng Huy worked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trần Hoàng Huy has worked at: Teknix Corporation (Developer Intern, 2025–present) building dental clinic websites; Green Space Solution (Developer Intern, June–August 2025) on the AutoTMS project; and UTA Co., Ltd (IT Intern, 2024–2025) where he developed an AI pest diagnosis system achieving ~97% accuracy using PhoBERT.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Trần Hoàng Huy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can contact Trần Hoàng Huy via email at huyth.dev@gmail.com, on GitHub at github.com/huykg1112, on LinkedIn at linkedin.com/in/hoang-huy-tran-23baa6358, or by phone at +84 334 114 244.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Trần Hoàng Huy available for work or freelance projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Trần Hoàng Huy is actively looking for opportunities to join a cross-functional software engineering team. He is open to full-time roles, internships, and collaboration on innovative web development projects.',
      },
    },
  ],
}

/** 5. ItemList of projects – AEO: structured project list for search/AI */
const projectsListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${baseUrl}/#projects`,
  name: 'Projects by Trần Hoàng Huy',
  description: 'A list of software projects developed by Trần Hoàng Huy',
  author: { '@id': `${baseUrl}/#person` },
  numberOfItems: 3,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'E-Commerce Farm Project',
        description:
          "Bachelor's thesis: AI-powered agricultural e-commerce platform with crop disease diagnosis using PhoBERT fine-tuned model (~97% accuracy), built with Next.js, NestJS and PostgreSQL.",
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        author: { '@id': `${baseUrl}/#person` },
        programmingLanguage: ['TypeScript', 'JavaScript'],
        url: 'https://github.com/huykg1112/project-ecommerce-farm',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'WebSite',
        name: 'Trần Hoàng Huy Portfolio',
        description: 'Personal portfolio website built with Next.js, Tailwind CSS and Framer Motion.',
        author: { '@id': `${baseUrl}/#person` },
        url: baseUrl,
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Booking Homestay',
        description:
          'Full-stack property booking web application with search, booking and real-time features for clients, landlords and admins.',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        author: { '@id': `${baseUrl}/#person` },
        programmingLanguage: ['TypeScript', 'JavaScript'],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" color-scheme="dark" suppressHydrationWarning>
      <head>
        {/* Performance: preconnect CDN */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* GEO: Canonical author signal */}
        <link rel="author" href="/llms.txt" />
        <meta name="author" content="Trần Hoàng Huy" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Cần Thơ, Việt Nam" />
        {/* AEO: allow full snippet extraction */}
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </head>
      <body className="font-sans antialiased">
        {/* Accessibility: skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-background focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* SEO + AEO + GEO: Multi-schema JSON-LD */}
        <Script id="ld-person" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(personSchema)}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
        <Script id="ld-profilepage" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(profilePageSchema)}
        </Script>
        <Script id="ld-faq" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="ld-projects" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(projectsListSchema)}
        </Script>

        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
