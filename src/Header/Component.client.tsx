'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header;
  name?: string | null;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, name }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="pt-8 flex w-full justify-between items-center gap-50 text-white">
        <p>Search</p>
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex gap-5">
          <p className="hover:text-gray-300 text-white duration-300">
            <a href="/cart">
              Cart
            </a>
          </p>
          <div className="hover:opacity-70 opacity-100 text-white duration-300">
            <a href="/login">
              {name && <div className="flex flex-row gap-2 items-center">
                <img src='/profile.svg' alt='profile' width={15} height={15} className="invert" />
                {name}
              </div>}
              {!name && "Log In"}
            </a>
          </div>
        </div>


      </div>
      <div className="justify-center flex pt-4">
        <HeaderNav data={data} />
      </div>

    </header>
  )
}
