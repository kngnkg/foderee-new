import { Header } from '@/components/header'

interface SettingLayoutProps {
  children: React.ReactNode
}

export default function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">
        <div className="mx-auto sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
