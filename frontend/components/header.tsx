import { MainNav } from '@/components/main-nav'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background pt-4">
      <div className="container">
        <div className="flex justify-between">
          <Link href="/">
            <p className="text-lg">Foderee</p>
          </Link>
          <MainNav />
        </div>
        <div className="mt-2">{children}</div>
        <Separator className="z-40" />
      </div>
    </header>
  )
}
