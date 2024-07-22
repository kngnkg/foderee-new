'use client'

import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'

interface SeeMoreButtonProps {
  className?: string
  isLoading: boolean
  loadMore: () => void
}

export const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({
  className,
  isLoading,
  loadMore,
}) => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className={className}
      disabled={isLoading}
      // disabled
      onClick={() => loadMore()}
    >
      {isLoading ? <Icon type="loader" /> : <> もっと見る</>}
      {/* <Icon type="loader" /> */}
    </Button>
  )
}
