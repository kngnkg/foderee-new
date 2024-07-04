import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foderee',
  description: '',
}

const notojp = Noto_Sans_JP({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

function Links() {
  return (
    <div>
      <Link href="/">Home</Link>
      <br />
      <Link href="/login">ログイン</Link>
      <br />
      <Link href="/following">フォローユーザーの投稿</Link>
      <br />
      <Link href="/search">レビュー検索</Link>
      <br />
      <Link href="/search/user">ユーザー検索</Link>
      <br />
      <Link href="/@username">ユーザーページ</Link>
      <br />
      <Link href="/@username/likes">ユーザーがいいねした投稿</Link>
      <br />
      <Link href="/reviews/reviewId">レビュー詳細ページ</Link>
      <br />
      <Link href="/editor/new">新規エディタ</Link>
      <br />
      <Link href="/editor/reviewId">編集エディタ</Link>
      <br />
      <Link href="/setting/profile">プロフィールの設定</Link>
      <br />
      <Link href="/setting/account">アカウント情報の設定</Link>
      <br />
      <Link href="/health">ヘルスチェック</Link>
      <br />
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn('bg-background', notojp.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <Links />
      </body>
    </html>
  )
}
