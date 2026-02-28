"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ChatMessage } from "@/app/api/chat/route"

// ─── Simple markdown renderer ─────────────────────────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split("\n")
  return lines.map((line, i) => {
    const isBullet = /^[-*•]\s/.test(line)
    const content = isBullet ? line.replace(/^[-*•]\s/, "") : line
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j} className="font-semibold text-purple-300">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    )
    return (
      <span key={i} className={isBullet ? "flex gap-1.5 mt-1" : "block"}>
        {isBullet && <span className="text-purple-400 mt-0.5 shrink-0">•</span>}
        <span>{parts}</span>
      </span>
    )
  })
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = ChatMessage & { id: string }

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Xin chào! Mình là AI assistant của **Trần Hoàng Huy** 👋\n\nBạn có thể hỏi mình về kỹ năng, kinh nghiệm, dự án hoặc cách liên hệ với Huy nhé!",
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isOpen])

  // Focus input when opened
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
    const botMsg: Message = { id: botId, role: "assistant", content: "" }
    setMessages((prev) => [...prev, botMsg])
    setStreamingId(botId)

    abortRef.current = new AbortController()

    try {
      const history: ChatMessage[] = [
        ...messages
          .filter((m) => m.id !== "welcome")
          .map(({ role, content }) => ({ role, content })),
        { role: "user", content: text },
      ]

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => '')
        const fallback =
          res.status === 429
            ? 'AI đang bận (giới hạn lượt gọi). Vui lòng thử lại sau vài giây nhé! 🙏'
            : res.status === 503
            ? 'Model AI hiện không khả dụng. Vui lòng thử lại sau nhé! 🙏'
            : 'Xin lỗi, đã có lỗi xảy ra. Bạn thử lại nhé! 🙏'
        throw new Error(errText || fallback)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, content: m.content + chunk } : m))
        )
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        const msg =
          err.message && err.message !== "API error"
            ? err.message
            : "Xin lỗi, đã có lỗi xảy ra. Bạn thử lại nhé! 🙏"
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, content: msg } : m))
        )
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
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-[340px] sm:w-[380px] h-[520px] flex flex-col rounded-2xl border border-[#2c2a3c] shadow-2xl shadow-black/50 overflow-hidden"
            style={{ background: "#100e19" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2c2a3c] bg-[#1a1729]">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#a755f0] to-[#d946ef] flex items-center justify-center text-lg select-none">
                  🤖
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1a1729]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#ede9fe] leading-none">Huy&apos;s AI Assistant</p>
                <p className="text-xs text-[#a09cb8] mt-0.5">Powered by Gemini</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  aria-label="Clear chat"
                  title="Xoá cuộc trò chuyện"
                  className="p-1.5 rounded-lg text-[#a09cb8] hover:text-[#ede9fe] hover:bg-[#2c2a3c] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  aria-label="Close chatbot"
                  className="p-1.5 rounded-lg text-[#a09cb8] hover:text-[#ede9fe] hover:bg-[#2c2a3c] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-[#2c2a3c] scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#a755f0] to-[#d946ef] flex items-center justify-center text-xs shrink-0 mt-0.5 select-none">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-linear-to-br from-[#a755f0] to-[#d946ef] text-white rounded-tr-sm"
                        : "bg-[#1a1729] border border-[#2c2a3c] text-[#ede9fe] rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-0.5">
                        {renderMarkdown(msg.content)}
                        {streamingId === msg.id && (
                          <span className="inline-block w-1.5 h-4 bg-[#a755f0] ml-0.5 animate-pulse rounded-sm align-middle" />
                        )}
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing dots – shown while waiting for first chunk */}
              {isLoading && streamingId && messages.find((m) => m.id === streamingId)?.content === "" && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#a755f0] to-[#d946ef] flex items-center justify-center text-xs shrink-0 select-none">
                    🤖
                  </div>
                  <div className="bg-[#1a1729] border border-[#2c2a3c] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#a755f0] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 pb-3 pt-2 border-t border-[#2c2a3c] bg-[#100e19]">
              <div className="flex items-end gap-2 bg-[#1a1729] border border-[#2c2a3c] rounded-xl px-3 py-2 focus-within:border-[#a755f0]/60 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi... (Enter để gửi)"
                  rows={1}
                  disabled={isLoading}
                  aria-label="Chat input"
                  className="flex-1 bg-transparent resize-none text-sm text-[#ede9fe] placeholder:text-[#a09cb8] outline-none max-h-28 overflow-y-auto scrollbar-none disabled:opacity-50"
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
                  className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-[#a755f0] to-[#d946ef] flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-[10px] text-[#a09cb8]/60 mt-1.5">Shift+Enter xuống dòng</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot"}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full shadow-lg shadow-[#a755f0]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a755f0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#100e19]"
        style={{
          background: "linear-gradient(135deg, #a755f0, #d946ef)",
        }}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#a755f0]/40 animate-ping" />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-2xl select-none"
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
