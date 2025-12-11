import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function getName() {
    const payload = await getPayload({ config })
    const headers = await getHeaders()
    const { user, permissions } = await payload.auth({ headers })
    return user?.name;
}