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
      id="see-more-button"
      variant="ghost"
      size="lg"
      className={className}
      disabled={isLoading}
      onClick={() => loadMore()}
    >
      {isLoading ? <Icon type="loader" /> : <> もっと見る</>}
    </Button>
  )
}
