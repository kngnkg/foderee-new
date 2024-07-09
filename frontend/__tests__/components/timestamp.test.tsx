import { TimeStamp } from '@/components/timestamp'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

const advanceTimeBy = (seconds: number) => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date(Date.now() + seconds * 1000))
}

describe('TimeStamp', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('0秒前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(0)
    render(<TimeStamp date={now} />)
    expect(screen.getByText('0秒前')).toBeInTheDocument()
  })

  it('59秒前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(59)
    render(<TimeStamp date={now} />)
    expect(screen.getByText('59秒前')).toBeInTheDocument()
  })

  it('1分前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(60)
    render(<TimeStamp date={now} />)
    expect(screen.getByText('1分前')).toBeInTheDocument()
  })

  it('59分前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(60 * 59 + 59) // 59分59秒
    render(<TimeStamp date={now} />)
    expect(screen.getByText('59分前')).toBeInTheDocument()
  })

  it('1時間前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(3600)
    render(<TimeStamp date={now} />)
    expect(screen.getByText('1時間前')).toBeInTheDocument()
  })

  it('23時間前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(3600 * 23 + 60 * 59 + 59) // 23時間59分59秒
    render(<TimeStamp date={now} />)
    expect(screen.getByText('23時間前')).toBeInTheDocument()
  })

  it('1日前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(3600 * 24)
    render(<TimeStamp date={now} />)
    expect(screen.getByText('1日前')).toBeInTheDocument()
  })

  it('14日前を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(3600 * 24 * 14 + 60 * 59 + 59) // 14日23時間59分59秒
    render(<TimeStamp date={now} />)
    expect(screen.getByText('14日前')).toBeInTheDocument()
  })

  it('15日以上前の場合は年、月、日付を正しく表示する', () => {
    const now = new Date()
    advanceTimeBy(3600 * 24 * 15)
    render(<TimeStamp date={now} />)
    expect(
      screen.getByText(
        `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`,
      ),
    ).toBeInTheDocument()
  })
})
