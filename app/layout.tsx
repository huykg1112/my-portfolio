import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '@/components/footer'
import Head from 'next/head'

// import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// // Initialize fonts
// const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
// const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
// const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: 'Trần Hoàng Huy - Software Engineer',
  description: 'This is my personal portfolio website.',
  generator: 'Trần Hoàng Huy',
  openGraph: {  
    title: 'Trần Hoàng Huy - Software Engineer',
    description: 'This is my personal portfolio website.',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png',
        width: 300,
        height: 400,
        
        alt: 'Trần Hoàng Huy',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png',
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Đây là các thẻ bạn cần thêm */}
        <link rel="icon" href="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
