import type { Metadata } from 'next'
import Header from '@/components/header'
import AboutHero from '@/components/about/about-hero'
import AboutStory from '@/components/about/about-story'
import AboutSkills from '@/components/about/about-skills'
import AboutTimeline from '@/components/about/about-timeline'

const baseUrl = process.env.URL_BASE || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'About – Trần Hoàng Huy | Software Engineer',
  description:
    'Tìm hiểu về hành trình và câu chuyện của Trần Hoàng Huy – Software Engineer tốt nghiệp Đại học Cần Thơ, chuyên về Next.js, NestJS, React và TypeScript.',
  keywords: [
    'About Trần Hoàng Huy', 'Software Engineer biography',
    'Can Tho University', 'Teknix Corporation', 'Full-Stack Developer Vietnam',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About – Trần Hoàng Huy | Software Engineer',
    description: 'Hành trình trở thành Software Engineer của Trần Hoàng Huy.',
    type: 'profile',
    url: `${baseUrl}/about`,
  },
}

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutSkills />
      <AboutTimeline />
    </main>
  )
}
