
import config from '@payload-config'
import { getPayload } from 'payload'
import { User } from '@/payload-types'

export default async function createCart(user: User) {
    const payload = await getPayload({ config })

    try {
        const res = await payload.create({
            collection: 'cart',
            depth: 2,
            data: {
                name: user.name,
                slug: user.name?.replace(/\s/g, '-'),
                items: [],
                user: user
            }
        });
        return res
    } catch (error) {
        throw new Error(
            `Cart creation failed: ${error instanceof Error ? error.message : 'Unknown Error'}`
        )
    }


}