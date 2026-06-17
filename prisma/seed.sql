-- ============================================================================
--  Portfolio seed — Neon Postgres
--  Paste into the Neon SQL Editor and Run. Safe to re-run (idempotent):
--    • Project / Skill / Doc  -> upsert by unique key (slug / name)
--    • Experience             -> reset (no natural unique key)
--  NOTE: /docs renders dynamically (changes show instantly). Home/Projects/About
--  are statically generated — after raw SQL edits, rebuild or use /admin (which
--  revalidates) to see the changes on those pages.
-- ============================================================================

BEGIN;

-- ── PROJECTS ────────────────────────────────────────────────────────────────
INSERT INTO "Project"
  ("id","slug","title","subtitleEn","subtitleVi","descriptionEn","descriptionVi",
   "tech","tags","year","role","company","demoUrl","repoUrl","featured","order")
VALUES
  (gen_random_uuid()::text, 'doko-school', 'DOKO — School Management (Odoo)',
   'BMS Tech · Odoo modules', 'BMS Tech · Module Odoo',
   'Two modules on the DOKO school platform (Odoo 17): school_helpdesk for ticket intake, assignment, access control and status tracking; and school_kiosk, a touchscreen OWL.js SPA for class/exam schedules, honor boards, news and campus maps.',
   'Hai module trên nền tảng trường học DOKO (Odoo 17): school_helpdesk quản lý tiếp nhận ticket, phân công, phân quyền và trạng thái; và school_kiosk — SPA màn hình cảm ứng bằng OWL.js xem lịch học/thi, bảng vinh danh, tin tức và bản đồ trường.',
   ARRAY['Odoo 17','Python','OWL.js','XML/QWeb','PostgreSQL','SCSS'], ARRAY['ERP','Odoo'],
   '2026', 'Odoo Developer', 'BMS Tech', NULL, NULL, true, 0),

  (gen_random_uuid()::text, 'devosecare-dashboard', 'DevoseCare Dashboard',
   'TekNix · Internal product', 'TekNix · Sản phẩm nội bộ',
   'Internal operations dashboard for a medical center: Kanban appointment board with drag-and-drop, customer management, a CMS module and role-based permissions. Shipped in under four weeks.',
   'Dashboard vận hành nội bộ cho một trung tâm y tế: bảng lịch hẹn Kanban kéo-thả, quản lý khách hàng, module CMS và phân quyền theo vai trò. Hoàn thành trong chưa đầy bốn tuần.',
   ARRAY['ReactJS','Vite','Tailwind CSS','Shadcn UI','Zustand','dnd-kit','React Query'], ARRAY['Dashboard','Drag & drop'],
   '2026', 'Frontend Developer', 'TekNix Technology', 'https://devoscare-dashboard.blocktrend.xyz', NULL, true, 1),

  (gen_random_uuid()::text, 'ecommerce-farm', 'E-commerce Farm Platform',
   'Bachelor''s thesis', 'Luận văn tốt nghiệp',
   'AI-powered agricultural e-commerce platform with crop-disease diagnosis (PhoBERT fine-tune, ~97% accuracy across 350+ diseases). Web with Next.js, mobile with Flutter, backend on NestJS + PostgreSQL. Final thesis score 9.9/10.',
   'Nền tảng thương mại điện tử nông sản tích hợp AI chẩn đoán bệnh cây (PhoBERT fine-tune, ~97% độ chính xác trên 350+ loại bệnh). Web bằng Next.js, mobile bằng Flutter, backend NestJS + PostgreSQL. Điểm luận văn 9.9/10.',
   ARRAY['Next.js','TypeScript','NestJS','PostgreSQL','TypeORM','Redux Toolkit','Flutter'], ARRAY['AI','E-commerce','Full-stack'],
   '2025', 'Full-stack Developer', 'Can Tho University', NULL, 'https://github.com/huykg1112/project-ecommerce-farm', true, 2),

  (gen_random_uuid()::text, 'autotms', 'AutoTMS — Transport Management',
   'Green Space Solution', 'Green Space Solution',
   'Web-based transport management system: group, vehicle and maintenance modules. Built the frontend and integrated GraphQL services on a NestJS + Strapi backend.',
   'Hệ thống quản lý vận tải trên web: module nhóm, phương tiện và bảo trì. Mình xây frontend và tích hợp các service GraphQL trên backend NestJS + Strapi.',
   ARRAY['Next.js','Hero UI','NestJS','Strapi','Prisma','GraphQL'], ARRAY['Enterprise','Full-stack'],
   '2025', 'Full-stack Intern', 'Green Space Solution', NULL, NULL, false, 3),

  (gen_random_uuid()::text, 'pago-dashboard', 'Pago Dashboard',
   'UTA · Internal product', 'UTA · Sản phẩm nội bộ',
   'Internal management dashboard with an AI-based pest-diagnosis feature (PhoBERT, ~97% accuracy). Optimised UI/UX and integrated RESTful APIs.',
   'Dashboard quản lý nội bộ với tính năng chẩn đoán sâu bệnh bằng AI (PhoBERT, ~97% độ chính xác). Tối ưu UI/UX và tích hợp REST API.',
   ARRAY['ReactJS','NestJS','REST API','Tailwind CSS','PhoBERT'], ARRAY['AI','Dashboard'],
   '2024', 'IT Intern', 'UTA Co., Ltd', NULL, NULL, false, 4),

  (gen_random_uuid()::text, 'patient-honey', 'Patient Honey — Clinic Websites',
   'TekNix · 60+ sites', 'TekNix · 60+ website',
   'Maintained and built 60+ international dental-clinic websites: landing pages, performance and SEO optimisation, and CMS-driven content management.',
   'Bảo trì và xây 60+ website phòng khám nha khoa quốc tế: trang landing, tối ưu hiệu năng và SEO, quản lý nội dung qua CMS.',
   ARRAY['Next.js','WordPress','TanaCMS','Framer','SEO'], ARRAY['Web','SEO'],
   '2025', 'Frontend Intern', 'TekNix Technology', NULL, NULL, false, 5),

  (gen_random_uuid()::text, 'homestay-booking', 'Homestay Booking',
   'Group project', 'Dự án nhóm',
   'Full-stack homestay booking platform with search, filtering, booking flows and real-time updates for three roles: client, landlord and admin.',
   'Nền tảng đặt homestay full-stack với tìm kiếm, lọc, luồng đặt phòng và cập nhật thời gian thực cho ba vai trò: khách, chủ nhà và admin.',
   ARRAY['ReactJS','Tailwind CSS','MUI','REST API','PostgreSQL'], ARRAY['Booking','Full-stack'],
   '2024', 'Frontend Developer', 'Group project', NULL, 'https://github.com/tainn03/Homestay-Booking-Client', false, 6)
ON CONFLICT ("slug") DO UPDATE SET
  "title"=EXCLUDED."title", "subtitleEn"=EXCLUDED."subtitleEn", "subtitleVi"=EXCLUDED."subtitleVi",
  "descriptionEn"=EXCLUDED."descriptionEn", "descriptionVi"=EXCLUDED."descriptionVi",
  "tech"=EXCLUDED."tech", "tags"=EXCLUDED."tags", "year"=EXCLUDED."year",
  "role"=EXCLUDED."role", "company"=EXCLUDED."company",
  "demoUrl"=EXCLUDED."demoUrl", "repoUrl"=EXCLUDED."repoUrl",
  "featured"=EXCLUDED."featured", "order"=EXCLUDED."order";

-- ── EXPERIENCES (reset + insert) ────────────────────────────────────────────
DELETE FROM "Experience";
INSERT INTO "Experience"
  ("id","company","role","periodEn","periodVi","descriptionEn","descriptionVi","tech","link","order")
VALUES
  (gen_random_uuid()::text, 'BMS Tech', 'Fresher Odoo Developer',
   'Mar 2026 — Jun 2026', '03/2026 — 06/2026',
   'Built Odoo 17 modules: school_helpdesk (ticket lifecycle, assignment, status tracking) and school_kiosk (touchscreen SPA for schedules, honor boards, news and feedback). Created reusable Odoo Website snippets and UIs for DOKO, DOKO Kiosk and client sites.',
   'Xây các module Odoo 17: school_helpdesk (vòng đời ticket, phân công, theo dõi trạng thái) và school_kiosk (SPA màn hình cảm ứng xem lịch, bảng vinh danh, tin tức, góp ý). Tạo snippet website Odoo tái sử dụng và UI cho DOKO, DOKO Kiosk cùng các site khách hàng.',
   ARRAY['Odoo 17','Python','OWL.js','XML/QWeb','PostgreSQL'], NULL, 0),

  (gen_random_uuid()::text, 'TekNix Technology Corporation', 'Frontend Intern',
   'Sep 2025 — Present', '09/2025 — Hiện tại',
   'Building and maintaining responsive websites for ~60 international dental clinics with React, Next.js and WordPress. Integrating REST APIs and crafting interactive UI with Framer.',
   'Xây dựng và bảo trì website responsive cho ~60 phòng khám nha khoa quốc tế với React, Next.js và WordPress. Tích hợp REST API và làm UI tương tác với Framer.',
   ARRAY['ReactJS','Next.js','WordPress','Tailwind CSS','Framer','SEO'], 'https://www.teknix.vn/', 1),

  (gen_random_uuid()::text, 'Green Space Solution JSC', 'Full-stack Intern',
   'Jun 2025 — Aug 2025', '06/2025 — 08/2025',
   'Designed and optimised the AutoTMS transport-management frontend. Integrated components with NestJS, Strapi, Prisma and GraphQL services; took part in code reviews.',
   'Thiết kế và tối ưu frontend hệ thống quản lý vận tải AutoTMS. Tích hợp component với các service NestJS, Strapi, Prisma và GraphQL; tham gia review code.',
   ARRAY['Next.js','Hero UI','NestJS','Strapi','Prisma','GraphQL'], 'https://www.autotms.vn/', 2),

  (gen_random_uuid()::text, 'UTA Co., Ltd', 'IT Intern',
   'Jun 2024 — Apr 2025', '06/2024 — 04/2025',
   'Built frontends for internal web apps and an AI-based pest-diagnosis feature (PhoBERT, ~97% accuracy). Improved UI performance and cross-device responsiveness.',
   'Xây frontend cho các ứng dụng web nội bộ và tính năng chẩn đoán sâu bệnh bằng AI (PhoBERT, ~97% độ chính xác). Cải thiện hiệu năng UI và khả năng responsive đa thiết bị.',
   ARRAY['ReactJS','NestJS','REST API','PhoBERT','Tailwind CSS'], 'https://utasolution.com', 3);

-- ── SKILLS (reset + insert) ─────────────────────────────────────────────────
-- icon = simpleicons CDN slug URL (empty '' → app shows a letter badge).
DELETE FROM "Skill";
INSERT INTO "Skill" ("id","name","icon","category","order")
VALUES
  -- Frontend
  (gen_random_uuid()::text, 'ReactJS',              'https://cdn.simpleicons.org/react',        'Frontend', 0),
  (gen_random_uuid()::text, 'Next.js',              'https://cdn.simpleicons.org/nextdotjs',    'Frontend', 1),
  (gen_random_uuid()::text, 'WordPress',            'https://cdn.simpleicons.org/wordpress',    'Frontend', 2),
  (gen_random_uuid()::text, 'Redux Toolkit',        'https://cdn.simpleicons.org/redux',        'Frontend', 3),
  (gen_random_uuid()::text, 'Zustand',              '',                                         'Frontend', 4),
  (gen_random_uuid()::text, 'Tailwind CSS',         'https://cdn.simpleicons.org/tailwindcss',  'Frontend', 5),
  (gen_random_uuid()::text, 'Shadcn/UI',            'https://cdn.simpleicons.org/shadcnui',     'Frontend', 6),
  (gen_random_uuid()::text, 'Responsive Design',    '',                                         'Frontend', 7),
  (gen_random_uuid()::text, 'UI/UX Best Practices', '',                                         'Frontend', 8),
  (gen_random_uuid()::text, 'OWL.js',               '',                                         'Frontend', 9),
  -- Backend
  (gen_random_uuid()::text, 'RESTful APIs',         '',                                         'Backend', 10),
  (gen_random_uuid()::text, 'NestJS',               'https://cdn.simpleicons.org/nestjs',       'Backend', 11),
  (gen_random_uuid()::text, 'JWT Authentication',   'https://cdn.simpleicons.org/jsonwebtokens','Backend', 12),
  (gen_random_uuid()::text, 'OAuth 2.0',            'https://cdn.simpleicons.org/auth0',        'Backend', 13),
  (gen_random_uuid()::text, 'PostgreSQL',           'https://cdn.simpleicons.org/postgresql',   'Backend', 14),
  (gen_random_uuid()::text, 'TypeORM',              'https://cdn.simpleicons.org/typeorm',      'Backend', 15),
  (gen_random_uuid()::text, 'Odoo (17,18,19)',      'https://cdn.simpleicons.org/odoo',         'Backend', 16),
  -- Programming Languages
  (gen_random_uuid()::text, 'JavaScript',           'https://cdn.simpleicons.org/javascript',   'Programming Languages', 17),
  (gen_random_uuid()::text, 'TypeScript',           'https://cdn.simpleicons.org/typescript',   'Programming Languages', 18),
  (gen_random_uuid()::text, 'Python',               'https://cdn.simpleicons.org/python',       'Programming Languages', 19),
  (gen_random_uuid()::text, 'PHP',                  'https://cdn.simpleicons.org/php',          'Programming Languages', 20),
  (gen_random_uuid()::text, 'XML',                  '',                                         'Programming Languages', 21),
  -- Tools & Workflow
  (gen_random_uuid()::text, 'Git',                  'https://cdn.simpleicons.org/git',          'Tools & Workflow', 22),
  (gen_random_uuid()::text, 'GitHub',               'https://cdn.simpleicons.org/github',       'Tools & Workflow', 23),
  (gen_random_uuid()::text, 'GitLab',               'https://cdn.simpleicons.org/gitlab',       'Tools & Workflow', 24),
  (gen_random_uuid()::text, 'Postman',              'https://cdn.simpleicons.org/postman',      'Tools & Workflow', 25),
  (gen_random_uuid()::text, 'Vercel',               'https://cdn.simpleicons.org/vercel',       'Tools & Workflow', 26),
  (gen_random_uuid()::text, 'DBeaver',              'https://cdn.simpleicons.org/dbeaver',      'Tools & Workflow', 27),
  (gen_random_uuid()::text, 'VS Code',              '',                                         'Tools & Workflow', 28),
  (gen_random_uuid()::text, 'Framer',               'https://cdn.simpleicons.org/framer',       'Tools & Workflow', 29),
  (gen_random_uuid()::text, 'Google Colab',         'https://cdn.simpleicons.org/googlecolab',  'Tools & Workflow', 30),
  -- AI-assisted Development
  (gen_random_uuid()::text, 'GitHub Copilot',       'https://cdn.simpleicons.org/githubcopilot','AI-assisted Development', 31),
  (gen_random_uuid()::text, 'ChatGPT',              'https://cdn.simpleicons.org/openai',       'AI-assisted Development', 32),
  (gen_random_uuid()::text, 'Claude',               'https://cdn.simpleicons.org/claude',       'AI-assisted Development', 33),
  -- Soft Skills
  (gen_random_uuid()::text, 'Communication',        '', 'Soft Skills', 34),
  (gen_random_uuid()::text, 'Teamwork',             '', 'Soft Skills', 35),
  (gen_random_uuid()::text, 'Problem Solving',      '', 'Soft Skills', 36),
  (gen_random_uuid()::text, 'Reporting',            '', 'Soft Skills', 37),
  (gen_random_uuid()::text, 'Team Leadership',      '', 'Soft Skills', 38);

-- ── DOCS ────────────────────────────────────────────────────────────────────
-- Content uses dollar-quoting ($md$ … $md$): safe for newlines, semicolons,
-- quotes and backticks without any escaping.
INSERT INTO "Doc" ("id","slug","title","summary","imgUrl","tags","content","updatedAt")
VALUES
  (gen_random_uuid()::text, 'getting-started-with-nextjs',
   'Getting started with Next.js App Router',
   'Notes on routing, server components and data fetching in the App Router.',
   '', ARRAY['Next.js','React'],
   $md$# Next.js App Router — study notes

The **App Router** brings React Server Components to Next.js.

## Server vs Client components

- Components are **server** by default — they can be `async` and fetch data directly.
- Add `"use client"` only when you need state, effects or browser APIs.

```tsx
export default async function Page() {
  const data = await getData()
  return <main>{data.title}</main>
}
```
$md$,
   now()),

  (gen_random_uuid()::text, 'css-grid-cheatsheet',
   'CSS Grid cheatsheet',
   'The grid properties I always forget, in one place.',
   '', ARRAY['CSS'],
   $md$# CSS Grid cheatsheet

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
```
$md$,
   now())
ON CONFLICT ("slug") DO UPDATE SET
  "title"=EXCLUDED."title", "summary"=EXCLUDED."summary", "imgUrl"=EXCLUDED."imgUrl",
  "tags"=EXCLUDED."tags", "content"=EXCLUDED."content", "updatedAt"=now();

COMMIT;

-- Quick check:
-- SELECT 'projects' k, count(*) FROM "Project"
-- UNION ALL SELECT 'experiences', count(*) FROM "Experience"
-- UNION ALL SELECT 'skills', count(*) FROM "Skill"
-- UNION ALL SELECT 'docs', count(*) FROM "Doc";
