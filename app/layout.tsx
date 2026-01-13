import type { Metadata } from 'next'
import Script from 'next/script'

import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'
import Footer from '@/components/footer'

// import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// // Initialize fonts
// const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
// const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
// const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const baseUrl =  process.env.URL_BASE || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'Trần Hoàng Huy - Software Engineer',
    template: '%s | Trần Hoàng Huy'
  },
  description: 'Software Engineer specializing in full-stack development. Explore my portfolio, projects, and technical expertise.',
  keywords: ['Software Engineer', 'Full-stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio', 'Trần Hoàng Huy'],
  authors: [{ name: 'Trần Hoàng Huy' }],
  creator: 'Trần Hoàng Huy',
  publisher: 'Trần Hoàng Huy',
  generator: 'Next.js',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {  
    title: 'Trần Hoàng Huy - Software Engineer',
    description: 'Software Engineer specializing in full-stack development. Explore my portfolio, projects, and technical expertise.',
    type: 'website',
    locale: 'vi_VN',
    url: baseUrl,
    siteName: 'Trần Hoàng Huy Portfolio',
    images: [
      {
        url: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png',
        width: 1200,
        height: 630,
        alt: 'Trần Hoàng Huy - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trần Hoàng Huy - Software Engineer',
    description: 'Software Engineer specializing in full-stack development. Explore my portfolio, projects, and technical expertise.',
    images: ['https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png'],
  },
  robots: {
    index: true,
    follow: true,
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
      {
        url: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'your-google-site-verification-code', // Thay bằng code thực của bạn
  },
}

// JSON-LD Schema for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Trần Hoàng Huy',
  jobTitle: 'Software Engineer',
  description: 'Software Engineer specializing in full-stack development',
  url: baseUrl,
  image: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png',
  sameAs: [
    // Thêm các link social media của bạn ở đây
    'https://github.com/huykg1112',
    'https://www.linkedin.com/in/hoang-huy-tran-23baa6358',
  ],
  knowsAbout: [
    'Software Development',
    'Full-stack Development',
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript'
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`font-sans antialiased`}>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />

        {/* Optional: Google Analytics - Uncomment and add your GA ID */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script> */}

        {/* Performance & Security */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              if ('PerformanceObserver' in window) {
                try {
                  const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      console.log(entry.name, entry.value);
                    }
                  });
                  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
                } catch (e) {
                  console.error('Performance observer error:', e);
                }
              }
            `,
          }}
        />

        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
