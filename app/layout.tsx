import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'
import Footer from '@/components/footer'
import ChatbotLoader from '@/components/chatbot/chatbot-loader'

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
    canonical: '/',
    languages: {
      'vi-VN': '/',
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Trần Hoàng Huy – Frontend Developer | React / Next.js',
    description:
      'Frontend Developer specializing in ReactJS & Next.js. Graduated Can Tho University (GPA 3.58). Experienced at TekNix Technology, Green Space Solution, UTA. View projects and contact.',
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
    title: 'Trần Hoàng Huy – Frontend Developer',
    description:
      'Frontend Developer (React / Next.js) | Portfolio & projects.',
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
  jobTitle: 'Frontend Developer',
  description:
    'Frontend Developer chuyên về ReactJS và Next.js. Tốt nghiệp Kỹ thuật Phần mềm Đại học Cần Thơ (GPA 3.58/4.0, 2025). Hiện là Frontend Intern tại TekNix Technology Corporation.',
  url: 'https://thhuydev.id.vn',
  birthDate: '2002-12-11',
  image: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    caption: 'Trần Hoàng Huy – Frontend Developer',
  },
  email: 'huyth.dev@gmail.com',
  telephone: '+84334114244',
  nationality: { '@type': 'Country', name: 'Vietnam' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ninh Kiều, Cần Thơ',
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
    name: 'TekNix Technology Corporation',
    url: 'https://www.teknix.vn',
  },
  knowsAbout: [
    'ReactJS', 'Next.js', 'TypeScript', 'JavaScript', 'PHP',
    'Tailwind CSS', 'Shadcn/UI', 'MUI', 'Hero UI', 'Ant Design',
    'Redux Toolkit', 'Jotai', 'Context API',
    'NestJS', 'RESTful APIs', 'GraphQL', 'JWT Authentication', 'OAuth 2.0',
    'PostgreSQL', 'TypeORM', 'Prisma ORM',
    'WordPress', 'Git', 'GitHub', 'Vercel', 'Framer',
    'Flutter', 'Clean Architecture', 'Responsive Design', 'SEO',
  ],
  knowsLanguage: ['vi', 'en'],
  sameAs: [
    'https://thhuydev.id.vn',
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
        text: 'Trần Hoàng Huy (Tran Hoang Huy) là Frontend Developer chuyên về ReactJS và Next.js đến từ Ninh Kiều, Cần Thơ, Việt Nam. Anh tốt nghiệp ngành Kỹ thuật Phần mềm tại Đại học Cần Thơ (GPA 3.58/4.0, tháng 12/2025) và hiện đang thực tập tại TekNix Technology Corporation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Trần Hoàng Huy specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trần Hoàng Huy specializes in ReactJS, Next.js, TypeScript, Tailwind CSS, Shadcn/UI, MUI, Redux Toolkit, Jotai and WordPress on the frontend. On the backend he works with NestJS, RESTful APIs, GraphQL, PostgreSQL and Prisma ORM. He also has experience with Flutter for mobile development and uses AI tools (ChatGPT, Gemini, v0, Lovable) in his workflow.',
      },
    },
    {
      '@type': 'Question',
      name: 'What projects has Trần Hoàng Huy built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Trần Hoàng Huy's notable projects include: (1) DevoseCare Dashboard (TekNix Corporation, Feb 2026) – Internal management dashboard with Kanban drag-and-drop appointment board, customer management, CMS module and role-based permissions. Built with ReactJS, Vite, Shadcn/UI, Zustand and dnd-kit. Demo: https://devoscare-dashboard.blocktrend.xyz. (2) E-commerce Farm Platform (Bachelor's thesis, Apr–Aug 2025) – AI-powered agricultural e-commerce platform with PhoBERT-based crop-disease diagnosis (~97% accuracy), built with Next.js, NestJS and PostgreSQL. (3) Homestay Booking Web App (Group project, Apr–Aug 2024) – Full-stack property booking application for clients, landlords and admins.",
      },
    },
    {
      '@type': 'Question',
      name: 'Where has Trần Hoàng Huy worked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trần Hoàng Huy has interned at three companies: (1) TekNix Technology Corporation (Frontend Intern, September 2025–present) – building and optimising dental clinic websites with ReactJS, Next.js and WordPress. (2) Green Space Solution JSC (Fullstack Intern, June–August 2025) – developing the AutoTMS transport management system with Next.js, NestJS, Strapi and GraphQL. (3) UTA Co., Ltd (IT Intern, June 2024–April 2025) – building an AI-based pest diagnosis feature using PhoBERT achieving ~97% accuracy with ReactJS and NestJS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Trần Hoàng Huy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can contact Trần Hoàng Huy via email at huyth.dev@gmail.com, on GitHub at github.com/huykg1112, on LinkedIn at linkedin.com/in/hoang-huy-tran-23baa6358, via his personal website https://thhuydev.id.vn, or by phone at +84 334 114 244.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Trần Hoàng Huy available for work or freelance projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Trần Hoàng Huy is actively seeking full-time Frontend Developer positions and is open to collaboration on innovative React/Next.js web projects. He brings solid experience from three internships and multiple production-grade projects.',
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
  numberOfItems: 4,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'DevoseCare Dashboard',
        description:
          'Internal management dashboard for DevoseCare medical center built at Teknix Corporation (Feb 2026). Features: full appointment lifecycle management with Kanban drag-and-drop (dnd-kit), customer list management, CMS for Client App content, role-based staff permissions, login/logout.',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        author: { '@id': `${baseUrl}/#person` },
        programmingLanguage: ['JavaScript', 'TypeScript'],
        url: 'https://devoscare-dashboard.blocktrend.xyz',
        softwareVersion: '1.0',
        datePublished: '2026-02-27',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
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
      position: 3,
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
      position: 4,
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
        <ChatbotLoader />
        <Analytics />
      </body>
    </html>
  )
}
