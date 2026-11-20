import { z } from 'zod'

const SCHEMA_VERSION = 'on.blocks/v1' as const

const normalDistributionBlockSchema = z.object({
  schema: z.literal(SCHEMA_VERSION),
  type: z.literal('normal_distribution'),
  props: z.object({
    mean: z.number().default(0),
    stdDev: z.number().positive().default(1),
    x: z.number().default(0),
    xMin: z.number().optional(),
    xMax: z.number().optional(),
    samples: z.number().int().min(50).max(800).optional(),
    showGrid: z.boolean().default(true),
  }),
})

const polynomialFunctionSchema = z.object({
  kind: z.literal('poly'),
  // coeffs[i] is the coefficient for x^i
  coeffs: z.array(z.number()).min(1),
})

const namedFunctionSchema = z.object({
  kind: z.enum(['sin', 'cos', 'exp']),
})

const calculusPlotBlockSchema = z.object({
  schema: z.literal(SCHEMA_VERSION),
  type: z.literal('calculus_plot'),
  props: z.object({
    fn: z.union([polynomialFunctionSchema, namedFunctionSchema]),
    xMin: z.number().default(-6),
    xMax: z.number().default(6),
    samples: z.number().int().min(50).max(1200).optional(),

    showTangent: z.boolean().default(true),
    x0: z.number().default(0),

    showIntegral: z.boolean().default(false),
    a: z.number().default(-1),
    b: z.number().default(1),

    showGrid: z.boolean().default(true),
  }),
})

export const openNotebookBlockSchema = z.discriminatedUnion('type', [
  normalDistributionBlockSchema,
  calculusPlotBlockSchema,
])

export type OpenNotebookBlock = z.infer<typeof openNotebookBlockSchema>

function normalizeBlockJson(raw: string) {
  return raw
    .replace(/\\\r?\n/g, '\n')
    .replaceAll('&#x20;', ' ')
    .replaceAll('&#32;', ' ')
    .replaceAll('&quot;', '"')
    .replaceAll('&#34;', '"')
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
}

export function parseOpenNotebookBlock(
  raw: string
): { ok: true; block: OpenNotebookBlock } | { ok: false; error: string } {
  const trimmed = raw.trim()
  const normalized = normalizeBlockJson(trimmed)

  try {
    const json = JSON.parse(normalized)
    const parsed = openNotebookBlockSchema.safeParse(json)
    if (!parsed.success) {
      return { ok: false, error: parsed.error.message }
    }
    return { ok: true, block: parsed.data }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
