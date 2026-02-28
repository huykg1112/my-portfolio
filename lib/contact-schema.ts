import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email is too long')
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject is too long')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long (max 5000 characters)')
    .trim(),
})

export type ContactFormData = z.infer<typeof contactSchema>
