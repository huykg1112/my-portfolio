"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Bot, Send, Trash2, X } from "lucide-react"
import type { ChatMessage } from "@/app/api/chat/route"

// ─── Simple markdown renderer ─────────────────────────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split("\n")
  return lines.map((line, i) => {
    const isBullet = /^[-*•]\s/.test(line)
    const content = isBullet ? line.replace(/^[-*•]\s/, "") : line
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j} className="font-semibold text-primary">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    )
    return (
      <span key={i} className={isBullet ? "flex gap-1.5 mt-1" : "block"}>
        {isBullet && <span className="text-primary mt-0.5 shrink-0">•</span>}
        <span>{parts}</span>
      </span>
    )
  })
}

type Message = ChatMessage & { id: string }

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Xin chào! Mình là AI assistant của **Trần Hoàng Huy** 👋\n\nBạn có thể hỏi mình về kỹ năng, kinh nghiệm, dự án hoặc cách liên hệ với Huy nhé!",
}

export default function Chatbot() {
  const reduce = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
  }, [messages, isOpen, reduce])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    const botId = crypto.randomUUID()
    setMessages((prev) => [...prev, { id: botId, role: "assistant", content: "" }])
    setStreamingId(botId)

    abortRef.current = new AbortController()

    try {
      const history: ChatMessage[] = [
        ...messages.filter((m) => m.id !== "welcome").map(({ role, content }) => ({ role, content })),
        { role: "user", content: text },
      ]

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "")
        const fallback =
          res.status === 429
            ? "AI đang bận (giới hạn lượt gọi). Vui lòng thử lại sau vài giây nhé! 🙏"
            : res.status === 503
            ? "Model AI hiện không khả dụng. Vui lòng thử lại sau nhé! 🙏"
            : "Xin lỗi, đã có lỗi xảy ra. Bạn thử lại nhé! 🙏"
        throw new Error(errText || fallback)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, content: m.content + chunk } : m)))
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        const msg =
          err.message && err.message !== "API error"
            ? err.message
            : "Xin lỗi, đã có lỗi xảy ra. Bạn thử lại nhé! 🙏"
        setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, content: msg } : m)))
      }
    } finally {
      setIsLoading(false)
      setStreamingId(null)
    }
  }, [input, isLoading, messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleClose = () => {
    abortRef.current?.abort()
    setIsOpen(false)
  }

  const handleClear = () => {
    abortRef.current?.abort()
    setIsLoading(false)
    setStreamingId(null)
    setMessages([WELCOME])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="flex h-[520px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-background/60 px-4 py-3">
              <div className="relative shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-none text-foreground">Huy&apos;s AI Assistant</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Powered by Gemini</p>
              </div>
              <button
                onClick={handleClear}
                aria-label="Clear chat"
                title="Xoá cuộc trò chuyện"
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleClose}
                aria-label="Close chatbot"
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "assistant" && (
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm border border-border bg-secondary text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-0.5">
                        {renderMarkdown(msg.content)}
                        {streamingId === msg.id && (
                          <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-primary align-middle" />
                        )}
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && streamingId && messages.find((m) => m.id === streamingId)?.content === "" && (
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-secondary px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background/60 px-3 pb-3 pt-2">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi... (Enter để gửi)"
                  rows={1}
                  disabled={isLoading}
                  aria-label="Chat input"
                  className="max-h-28 flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
                  style={{ scrollbarWidth: "none" }}
                  onInput={(e) => {
                    const t = e.currentTarget
                    t.style.height = "auto"
                    t.style.height = `${Math.min(t.scrollHeight, 112)}px`
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground">Shift+Enter xuống dòng</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot"}
        aria-expanded={isOpen}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {!isOpen && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />}
        <span className="relative">{isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}</span>
      </motion.button>
    </div>
  )
}
