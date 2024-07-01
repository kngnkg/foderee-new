import Link from 'next/link'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type MenuTab = {
  label: string
  value: string
  href: string
}

interface MenuTabsProps {
  tabs: MenuTab[]
  defaultValue?: string
  className?: string
}

export const MenuTabs: React.FC<MenuTabsProps> = ({ tabs, defaultValue }) => {
  return (
    <Tabs
      defaultValue={defaultValue ? defaultValue : tabs[0].value}
      className="mx-auto sm:w-4/6"
    >
      <TabsList className="bg-transparent dark:bg-transparent">
        {tabs.map((tab, idx) => (
          <span key={idx}>
            <Link href={tab.href}>
              <TabsTrigger
                value={tab.value}
                className="border-primary dark:border-primary focus-visible:ring-none rounded-none data-[state=active]:border-b-4"
              >
                {tab.label}
              </TabsTrigger>
            </Link>
          </span>
        ))}
      </TabsList>
    </Tabs>
  )
}
