// lib/wizard/schema.ts
import { z } from 'zod'

export const formSchema = z.object({
  // step 1
  primaryBeatmaker: z.string().min(1, 'Required'),
  collaborators: z.string().optional(), // comma separated
  beatName: z.string().min(1, 'Required'),
  typeBeat: z.string().min(1, 'Required'),
  // step 2
  audioFile: z.instanceof(File),
  imageFile: z.instanceof(File),
  // step 3
  templateId: z.number().int(),
  formats: z.array(z.enum(['16_9', '1_1', '9_16'])).min(1),
  publishTargets: z
    .array(z.enum(['youtube', 'tiktok', 'instagram', 'x']))
    .min(1, 'Pick at least one platform'),
  // optional
  buyLink: z
    .string()
    .trim()
    .transform((s) => (s === '' ? undefined : s))
    .optional()
    .refine((val) => val === undefined || z.string().url().safeParse(val).success, {
      message: 'Invalid URL'
    })
})

export type WizardForm = z.infer<typeof formSchema>
