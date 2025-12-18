import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'
import createCart from './createCart'
import { Cart } from '@/payload-types'

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
        const userCart = userCartObj.items ?? [];
    }

    return (

        <div className="flex w-full">
            {user &&
                <div className="flex flex-col justify-center w-full">
                    <div>
                        Name: {user.name}
                    </div>
                    <div>
                        Id: {user.id}
                    </div>
                    <div>
                        <h3>Cart</h3>
                    </div>
                    <div className="gap-5 flex flex-col">
                        {userCart && userCart.map(item => (
                            <div key={item.id}>
                                <div>
                                    Name: {item.product.name}
                                </div>
                                <div>
                                    Quantity: {item.quantity}
                                </div>
                                <div>
                                    Total Price: ${item.product.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Total:
                            ${userCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                        </h2>
                    </div>
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