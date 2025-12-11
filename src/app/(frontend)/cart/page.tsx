import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function CartPage() {
    const payload = await getPayload({ config })
    const headers = await getHeaders()
    const { user, permissions } = await payload.auth({ headers })
    const res = await payload.find({
        collection: 'cart',
        depth: 2,
        where: {
            user: { equals: user }
        }
    });
    const userCart = res.docs[0].items ?? [];
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
                <div>
                    <h2>Not Logged In!</h2>
                </div>
            }
        </div>
    )
}