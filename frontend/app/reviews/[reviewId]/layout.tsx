import { Header } from '@/components/header'

interface ReviewLayoutProps {
  children: React.ReactNode
}

export default function ReviewLayout({ children }: ReviewLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">
        <div className="mx-auto sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
