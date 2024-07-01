import { Header } from '@/components/header'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function SearchLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">
        <div className="mx-auto sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
