import type { Metadata } from 'next'
import Header from '@/components/header'
import LabHero from '@/components/lab/lab-hero'
import LabCards from '@/components/lab/lab-cards'
import LabProjects from '@/components/lab/lab-projects'

const baseUrl = process.env.URL_BASE || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Projects & Lab – Trần Hoàng Huy | Software Engineer',
  description:
    'Xem các dự án thực tế và thí nghiệm của Trần Hoàng Huy: E-Commerce Farm với AI PhoBERT, Booking Homestay, Portfolio site và nhiều hơn nữa.',
  keywords: [
    'Projects Trần Hoàng Huy', 'E-Commerce Farm', 'PhoBERT crop disease',
    'Booking Homestay', 'Full-Stack Projects Vietnam', 'Next.js projects',
  ],
  alternates: { canonical: '/real-projects' },
  openGraph: {
    title: 'Projects – Trần Hoàng Huy | Software Engineer',
    description: 'Dự án thực tế: E-Commerce Farm AI, Booking Homestay và Portfolio.',
    type: 'website',
    url: `${baseUrl}/real-projects`,
  },
}

export default function LabPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <LabHero />
      <LabCards />
      <LabProjects />
    </main>
  )
}
