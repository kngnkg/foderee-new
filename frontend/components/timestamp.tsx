'use client'

import { cn } from '@/lib/utils'

interface TimeStampProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  date: Date
}

export const TimeStamp: React.FC<TimeStampProps> = ({ className, date }) => {
  return (
    <div className={cn('text-sm', className)}>
      <span>{formatTimeDifference(date)}</span>
    </div>
  )
}

const formatTimeDifference = (date: Date): string => {
  const now = new Date()
  // dateから現在までの差分を秒で取得
  // getTime()はミリ秒で取得するので1000で割る
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000

  const oneMinuteInSeconds = 60
  if (diffInSeconds < oneMinuteInSeconds) {
    return `${Math.floor(diffInSeconds)}秒前`
  }

  const oneHourInSeconds = oneMinuteInSeconds * 60
  if (diffInSeconds < oneHourInSeconds) {
    return `${Math.floor(diffInSeconds / oneMinuteInSeconds)}分前`
  }

  const oneDayInSeconds = oneHourInSeconds * 24
  if (diffInSeconds < oneDayInSeconds) {
    return `${Math.floor(diffInSeconds / oneHourInSeconds)}時間前`
  }

  const twoWeeksInSeconds = oneDayInSeconds * 14
  if (diffInSeconds < twoWeeksInSeconds + oneDayInSeconds) {
    return `${Math.floor(diffInSeconds / oneDayInSeconds)}日前`
  }

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}
