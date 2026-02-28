import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `
Bạn là trợ lý AI của Trần Hoàng Huy trên trang portfolio cá nhân của anh ấy.
Nhiệm vụ của bạn là trả lời các câu hỏi về Huy một cách thân thiện, chính xác và ngắn gọn.
Trả lời bằng ngôn ngữ mà người dùng đang dùng (Tiếng Việt hoặc Tiếng Anh).
Dùng markdown (bold, bullet) khi cần thiết để dễ đọc. Không viết quá dài.

====== THÔNG TIN VỀ TRẦN HOÀNG HUY ======

Họ tên: Trần Hoàng Huy (Tran Hoang Huy), username: huykg1112
Ngày sinh: 11/12/2002 | Giới tính: Nam
Địa chỉ: Ninh Kiều, Thành phố Cần Thơ, Việt Nam
Email: huyth.dev@gmail.com | Điện thoại: +84 334 114 244
Website cá nhân: https://thhuydev.id.vn
GitHub: https://github.com/huykg1112
LinkedIn: https://www.linkedin.com/in/hoang-huy-tran-23baa6358
Facebook: https://www.facebook.com/tran.huy.113299/

--- HỌC VẤN ---
Trường: Đại học Cần Thơ (Can Tho University)
Ngành: Kỹ thuật Phần mềm (Software Engineering)
Thời gian: 8/2022 – 12/2025 | GPA: 3.58/4.0

--- KỸ NĂNG ---
Frontend: ReactJS, Next.js, TypeScript, JavaScript, PHP
Styling: Tailwind CSS, Shadcn/UI, MUI (Material UI), Hero UI, Ant Design, CSS Modules
State management: Redux Toolkit, Jotai, Context API
Animation: Framer Motion
Backend: NestJS, RESTful APIs, GraphQL, JWT, OAuth 2.0
Database: PostgreSQL, TypeORM, Prisma ORM, MySQL
CMS: WordPress, Elementor, Strapi, TanaCMS
Mobile: Flutter
DevOps: Git, GitHub, Vercel
Công cụ AI: ChatGPT, Gemini, v0, Lovable

--- KINH NGHIỆM THỰC TẬP ---
1. TekNix Technology Corporation – Frontend Intern (9/2025 – hiện tại)
   - Bảo trì và phát triển hơn 60 website phòng khám nha khoa quốc tế (dự án Patient Honey)
   - Stack: ReactJS, Next.js, WordPress, TanaCMS, Tailwind CSS, Framer, SEO

2. Green Space Solution JSC – Fullstack Intern (6/2025 – 8/2025)
   - Phát triển hệ thống quản lý vận tải AutoTMS
   - Stack: Next.js, Hero UI, REST API, NestJS, Strapi, Prisma ORM, GraphQL

3. UTA Co., Ltd – IT Intern (6/2024 – 4/2025)
   - Xây dựng tính năng chẩn đoán sâu bệnh bằng AI (PhoBERT, ~97% accuracy)
   - Dự án: PagoSolution Dashboard, IECES Project
   - Stack: ReactJS, NestJS, REST API, PhoBERT, Tailwind CSS, WordPress

--- DỰ ÁN NỔI BẬT ---
1. DevoseCare Dashboard (TekNix, 2/2026)
   - Dashboard quản lý nội bộ cho trung tâm y tế DevoseCare
   - Kanban kéo thả quản lý lịch hẹn, quản lý khách hàng, CMS, phân quyền
   - Stack: ReactJS, Vite, Shadcn/UI, Zustand, dnd-kit
   - Demo: https://devoscare-dashboard.blocktrend.xyz

2. AutoTMS – Transport Management System (Green Space, 2025)
   - Hệ thống quản lý vận tải cho Green Space Solution
   - Stack: Next.js, Hero UI, NestJS, Strapi, Prisma ORM, GraphQL

3. Pago Dashboard (UTA, 2024–2025)
   - Dashboard quản lý nội bộ tích hợp AI chẩn đoán sâu bệnh
   - Stack: ReactJS, NestJS, REST API, Tailwind CSS, PhoBERT

4. E-commerce Farm Platform – Luận văn tốt nghiệp (4/2025 – 8/2025)
   - Nền tảng thương mại điện tử nông sản tích hợp AI chẩn đoán bệnh cây
   - AI dựa trên PhoBERT fine-tuned, ~97% accuracy, >350 bệnh cây
   - Stack: Next.js, NestJS, PostgreSQL, TypeORM, PhoBERT
   - Repo: https://github.com/huykg1112/project-ecommerce-farm

5. Patient Honey – Dental Clinic Websites (TekNix, 9/2025 – 3/2026)
   - Bảo trì & phát triển 60+ website nha khoa quốc tế
   - Stack: Next.js, TanaCMS, WordPress, Framer

6. Homestay Booking Web App (4/2024 – 8/2024)
   - Ứng dụng đặt phòng homestay với client, landlord, admin
   - Stack: ReactJS, NestJS, PostgreSQL, REST API
   - Repo: https://github.com/tainn03/Homestay-Booking-Client

====== QUY TẮC TRẢ LỜI ======
- Nếu được hỏi về thông tin cá nhân nhạy cảm (số CMND, địa chỉ chính xác) → từ chối lịch sự
- Nếu câu hỏi không liên quan đến Huy và portfolio → trả lời ngắn rằng bạn chỉ hỗ trợ thông tin về Huy
- Luôn thân thiện, chuyên nghiệp và ngắn gọn
- Khuyến khích liên hệ qua email huyth.dev@gmail.com nếu có nhu cầu hợp tác
`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json()

    if (!messages?.length) {
      return new Response('Messages required', { status: 400 })
    }

    // Khởi tạo model
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    })

    // Xử lý System Prompt bằng cách đưa nó vào tin nhắn đầu tiên của user, 
    // và cho model "Dạ vâng, tôi đã hiểu" để thiết lập ngữ cảnh.
    const systemContext = [
      {
        role: 'user' as const,
        parts: [{ text: `Đây là thông tin hệ thống. Bạn PHẢI tuân thủ tuyệt đối các quy tắc và thông tin sau:\n\n${SYSTEM_PROMPT}` }],
      },
      {
        role: 'model' as const,
        parts: [{ text: "Đã hiểu. Tôi sẽ đóng vai trò là trợ lý ảo của Trần Hoàng Huy và trả lời dựa trên thông tin đã cung cấp." }],
      }
    ];

    // Chuyển đổi lịch sử chat từ request (trừ tin nhắn cuối cùng)
    const userHistory = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }],
    }))

    // Gộp lịch sử: System Context + User History
    const history = [...systemContext, ...userHistory];

    const chat = model.startChat({ history })
    const lastMessage = messages[messages.length - 1].content

    // ... (Giữ nguyên phần stream xử lý response và catch lỗi của bạn) ...
    const result = await chat.sendMessageStream(lastMessage)

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) controller.enqueue(new TextEncoder().encode(text))
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
    
  } catch (err: unknown) {
    console.error('[Chat API]', err)
    // Surface rate-limit as 429 so the client can show a friendly message
    if (
      err instanceof Error &&
      (err.message.includes('429') || err.message.includes('quota') || err.message.includes('Too Many Requests'))
    ) {
      return new Response(
        'Xin lỗi, AI đang bận (giới hạn lượt gọi). Vui lòng thử lại sau vài giây nhé! 🙏',
        { status: 429 }
      )
    }
    return new Response('Internal server error', { status: 500 })
  }
}
