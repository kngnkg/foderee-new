import Link from 'next/link'

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-background container sticky top-0 z-10 mt-4 flex justify-between py-4 sm:mt-0 sm:w-4/5">
      <Link href="/">
        <p className="text-lg">Foderee</p>
      </Link>
      {children}
    </header>
  )
}
