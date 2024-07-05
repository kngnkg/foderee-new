'use client'

import * as React from 'react'

import { Icon } from '@/components/icon'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnterKeyDown?: () => void // Enter キー押下時のコールバック
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, value, onChange, onEnterKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!onEnterKeyDown) return

      if (e.key !== 'Enter') return
      if (!value) return

      e.preventDefault()

      onEnterKeyDown()
    }

    return (
      <div className={cn('relative flex items-center', className)}>
        <Icon type="search" className="absolute left-4" />
        <Input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="h-12 bg-transparent pl-14 text-lg"
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
SearchBar.displayName = 'SearchBar'
