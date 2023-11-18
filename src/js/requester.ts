import {ZodSchema} from "zod"

interface FetchError {
  error: true
}

interface RequesterOptions {
  schema: ZodSchema
  url: string
}

export default async function requester<T>({
  schema,
  url,
}: RequesterOptions): Promise<FetchError | T> {
  try {
    const res = await fetch(url)
    const json = (await res.json()) as T
    const validatedResponse = schema.safeParse(json)

    if (!validatedResponse.success) {
      return {error: true}
    }

    return json
  } catch {
    return {error: true}
  }
}
