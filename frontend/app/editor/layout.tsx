import { Header } from '@/components/header'

interface EditorLayoutProps {
  children: React.ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">
        <div className="border-b border-solid border-zinc-700 dark:border-zinc-700" />
        <div className="mx-auto sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
