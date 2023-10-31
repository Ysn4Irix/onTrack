'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IconContext } from 'react-icons'
import classNames from 'classnames'
import ModeToggle from './ModeToggle'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export const NavBar = () => {
  const currentPath = usePathname()

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-14 items-center px-4">
          <IconContext.Provider value={{ className: 'w-7 h-7 text-rose-600' }}>
            <Link href="/">
              <Image src="/logo.svg" width={90} height={90} alt="ontrack" />
            </Link>
          </IconContext.Provider>
          <div className="mx-6">
            <div className="flex items-center space-x-6">
              <Link
                key="/"
                href="/"
                className={classNames({
                  'text-rose-600': currentPath === '/',
                  'text-gray-500 hover:text-rose-600': currentPath !== '/',
                  'transition-colors': true,
                })}
              >
                Dashboard
              </Link>
              <SignedIn>
                <Link
                  key="/issues"
                  href="/issues"
                  className={classNames({
                    'text-rose-600': currentPath === '/issues',
                    'text-gray-500 hover:text-rose-600': currentPath !== '/issues',
                    'transition-colors': true,
                  })}
                >
                  Issues
                </Link>
              </SignedIn>
              <Link
                key="/about"
                href="/about"
                className={classNames({
                  'text-rose-600': currentPath === '/about',
                  'text-gray-500 hover:text-rose-600': currentPath !== '/about',
                  'transition-colors': true,
                })}
              >
                About
              </Link>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4 transition-colors">
            <ModeToggle />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <a className="text-gray-500 hover:text-rose-600 transition-colors no-underline cursor-pointer">
                  Sign in
                </a>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}
