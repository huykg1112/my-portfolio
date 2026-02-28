"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { contactSchema, type ContactFormData } from "@/lib/contact-schema"

const inputClass =
  "w-full bg-secondary/40 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"

const errorClass = "mt-1.5 text-xs text-destructive"

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          role="alert"
          aria-live="polite"
          className={errorClass}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        const json = await res.json()

        if (!res.ok) {
          // Surface server-side field errors if any
          if (json.issues) {
            const fields = json.issues as Partial<Record<keyof ContactFormData, string[]>>
            ;(Object.keys(fields) as (keyof ContactFormData)[]).forEach((key) => {
              setError(key, { message: fields[key]?.[0] ?? "Invalid value" })
            })
          } else {
            setError("root", { message: json.error ?? "Something went wrong. Please try again." })
          }
          return
        }

        reset()
      } catch {
        setError("root", { message: "Network error. Please check your connection and try again." })
      }
    })
  }

  if (isSubmitSuccessful && !isPending) {
    return (
      <motion.div
        className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center space-y-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-4xl" aria-hidden="true">🎉</div>
        <h3 className="text-lg font-semibold text-foreground">Message sent!</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => reset(undefined, { keepIsSubmitted: false })}
          className="mt-2 text-sm text-primary underline underline-offset-4 hover:text-accent transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Root / server error */}
      <AnimatePresence mode="wait">
        {errors.root && (
          <motion.div
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {errors.root.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
            Name <span aria-hidden="true" className="text-primary">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            spellCheck={false}
            placeholder="Nguyen Van A…"
            disabled={isPending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
            {...register("name")}
          />
          <span id="contact-name-error">
            <FieldError message={errors.name?.message} />
          </span>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email <span aria-hidden="true" className="text-primary">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            placeholder="you@example.com…"
            disabled={isPending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          <span id="contact-email-error">
            <FieldError message={errors.email?.message} />
          </span>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">
          Subject <span aria-hidden="true" className="text-primary">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Project inquiry, collaboration…"
          disabled={isPending}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={inputClass}
          {...register("subject")}
        />
        <span id="contact-subject-error">
          <FieldError message={errors.subject?.message} />
        </span>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
          Message <span aria-hidden="true" className="text-primary">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          autoComplete="off"
          placeholder="Hi Huy, I'd love to discuss…"
          disabled={isPending}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-none`}
          {...register("message")}
        />
        <span id="contact-message-error">
          <FieldError message={errors.message?.message} />
        </span>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isPending}
        whileHover={isPending ? {} : { scale: 1.02 }}
        whileTap={isPending ? {} : { scale: 0.98 }}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-background font-semibold text-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed shadow-purple-glow"
        aria-label={isPending ? "Sending message…" : "Send message"}
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-background"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </form>
  )
}
