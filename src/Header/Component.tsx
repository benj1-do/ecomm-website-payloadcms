import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user, permissions } = await payload.auth({ headers })

  return <HeaderClient data={headerData} name={user?.name} />
}
