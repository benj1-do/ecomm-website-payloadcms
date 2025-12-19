import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'
import createCart from './createCart'
import { Cart } from '@/payload-types'
import CartItem from './cartItem'

export default async function CartPage() {
    const payload = await getPayload({ config })
    const headers = await getHeaders()
    const { user, permissions } = await payload.auth({ headers })
    let userCartObj: Cart
    let userCart: any[] = []
    if (user) {
        const res = await payload.find({
            collection: 'cart',
            depth: 2,
            where: {
                user: { equals: user }
            }
        });
        if (res.docs.length === 0) { // if a cart object isn't found, create one
            userCartObj = await createCart(user)
        } else {
            userCartObj = res.docs[0]
        }
        userCart = userCartObj.items ?? [];
    }

    return (

        <div className="flex w-full !p-[10px]">
            {user &&
                <div className="flex flex-col justify-center w-full">
                    <div>
                        Name: {user.name}
                    </div>
                    <div>
                        Id: {user.id}
                    </div>
                    <div className="!py-[10px]">
                        <h3>Cart</h3>
                    </div>
                    <CartItem UserCart={userCart} />
                </div>
            }
            {!user &&
                <div className="flex flex-col justify-center w-full">
                    <div>
                        <h2>Cart</h2>
                    </div>
                    <div>
                        <h3>Not Logged In!</h3>
                    </div>

                </div>
            }
        </div>
    )
}