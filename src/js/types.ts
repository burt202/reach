import {z} from "zod"

export interface Observation {
  id: string
  name: string
  videoUrl: string
  webSocketUrl: string
  annotationsUrl: string
}

// use zod to build runtime schemas we can use for validation which we can
// also use to infer compile time TS types
const rectCoordsSchema = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
])

const annotationSchema = z.array(rectCoordsSchema)

export const annotationsResponseSchema = z.array(annotationSchema)

export type AnnotationsResponse = z.infer<typeof annotationsResponseSchema>

export const chatMessageSchema = z.object({
  name: z.string(),
  picture: z.string(),
  message: z.string(),
})

export type ChatMessage = z.infer<typeof chatMessageSchema>
