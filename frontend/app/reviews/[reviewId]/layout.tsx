import { Header } from '@/components/header'

interface ReviewLayoutProps {
  children: React.ReactNode
}

export default function ReviewLayout({ children }: ReviewLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">
        <div className="sticky top-14 z-10 border-b border-solid border-zinc-700 dark:border-zinc-700" />
        <div className="md:mx-auto">{children}</div>
      </main>
    </div>
  )
}
