'use client'

import { useMemo } from 'react'
import { useTranslation } from '@/lib/hooks/use-translation'
import { parseOpenNotebookBlock } from './types'
import { NormalDistributionBlock } from './NormalDistributionBlock'
import { CalculusPlotBlock } from './CalculusPlotBlock'

export function OpenNotebookBlock({ raw }: { raw: string }) {
  const { t } = useTranslation()

  const parsed = useMemo(() => parseOpenNotebookBlock(raw), [raw])

  if (!parsed.ok) {
    return (
      <div className="border border-border rounded p-3 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground">{t('learning.invalidBlockTitle')}</div>
        <div className="mt-1">{t('learning.invalidBlockDesc')}</div>
      </div>
    )
  }

  const { block } = parsed

  switch (block.type) {
    case 'normal_distribution':
      return <NormalDistributionBlock {...block.props} />
    case 'calculus_plot':
      return <CalculusPlotBlock {...block.props} />
    default:
      return (
        <div className="border border-border rounded p-3 text-xs text-muted-foreground">
          <div className="font-semibold text-foreground">{t('learning.invalidBlockTitle')}</div>
          <div className="mt-1">{t('learning.unknownBlockType', { type: (block as any).type })}</div>
        </div>
      )
  }
}
