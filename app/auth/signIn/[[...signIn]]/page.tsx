'use client'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <div className="flex items-center justify-center h-auto mt-28">
      <SignIn
        appearance={{
          baseTheme: localStorage.getItem('theme') === 'dark' ? dark : undefined,
          elements: {
            card: 'shadow-lg',
          },
        }}
      />
    </div>
  )
}
