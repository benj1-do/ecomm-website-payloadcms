'use client'

import { useState } from "react"
export default function CartItem({ UserCart }) {
    const [currentCart, setCurrentCart] = useState<any[]>(UserCart)

    function handleDecrement(item: any) {
        setCurrentCart(prev =>
            prev.map(prevItem =>
                prevItem === item
                    ? { ...prevItem, quantity: item.quantity - 1 }
                    : prevItem
            ).filter(item => item.quantity > 0)
        )
        return
    }

    return (
        <div>
            <div className="gap-5 flex flex-col w-1/4">
                {currentCart && currentCart.map(item => (
                    <div key={item.id}>
                        <div>
                            Name: {item.product.name}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            Quantity: {item.quantity}
                            <div className="text-right rounded flex border border-white">
                                <button onClick={() => handleDecrement(item)} className="!p-1">x</button>
                            </div>
                        </div>
                        <div>
                            Total Price: ${item.product.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h2>Total:
                    ${currentCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                </h2>
            </div>
        </div>

    )
}