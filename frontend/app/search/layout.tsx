import { Header } from '@/components/header'

interface SearchLayoutProps {
  children: React.ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">
        <div className="mx-auto sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
