import './globals.css'
import { NavBar } from './NavBar'
import { Rubik } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'onTrack',
  description:
    'A fullstack issue tracker built with Next.js and Prisma and Clerk, and Tailwind CSS. Built by @ysn4irix.',
}

const rubik = Rubik({
  weight: '400',
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body lang="en" className={rubik.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ClerkLoading>
              <div className="flex items-center justify-center h-screen">
                <Image className="animate-pulse" src="/logo.svg" width={170} height={170} alt="ontrack" />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <NavBar />
              <main>{children}</main>
              <Toaster />
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
