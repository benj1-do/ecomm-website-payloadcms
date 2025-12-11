import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { FooterNav } from './Nav'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const navBars = footerData?.NavBars || []

  function SocialLink(props) {
    return (
      <div className='flex flex-row gap-2'>
        <p>{props.name}: </p>
        <a href={props.link}>
          <p className="underline decoration-1 hover:decoration-2">{props.linkText}</p>
        </a>
      </div>
    )
  }

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      {/* <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div> */}
      <div className="justify-center flex py-8 w-full items-center">
        <div className="grid grid-cols-3 justify-between w-2/3">
          {navBars.map(item => (
            <div key={item.name}>
              <div className="!pb-2">
                <h3>{item.name}</h3>
              </div>
              {item.navItems.map(({ link }, i) => (
                <div className="flex flex-col justify-center gap-4" key={i}>
                  <div className="flex hover:underline">
                    <CMSLink className="text-white flex" {...link} />
                  </div>

                </div>
              ))}
            </div>

          ))}
          <div>
            <h3 className="!pb-2">Contact Us</h3>
            <SocialLink name="Phone" link="tel:0433 622 255" linkText="0433 622 255" />
            <SocialLink name="Email" link="mailto:piscesflowerstudio@gmail.com" linkText="piscesflowerstudio@gmail.com" />
            <SocialLink name="Wechat" link="tel:0433 622 255" linkText="piscesflower" />
            <SocialLink name="Instagram" link="tel:0433 622 255" linkText="piscesfloral" />
          </div>
        </div>
      </div>
    </footer>
  )
}
