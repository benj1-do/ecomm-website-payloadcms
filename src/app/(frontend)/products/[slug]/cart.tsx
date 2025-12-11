'use client';

import { getMediaUrl } from "@/utilities/getMediaUrl.js";
import { useEffect, useState } from "react";
import { calcOrder, sendOrder } from "./order.ts";
import { Product } from "@/payload-types.js";

type CartProps = {
    productSlug: string;
    balloonProducts: Product[];
    miscProducts: Product[];
}

export default function Cart({ productSlug, balloonProducts, miscProducts }: CartProps) {

    const [num, setNum] = useState(1);
    const [order, setOrder] = useState({ [productSlug]: 1 });
    const [price, setPrice] = useState(0);

    useEffect(() => {
        calcOrder(order).then(setPrice);
    }, [order])

    function handleOrder() {
        console.log("Added to Cart!")
        console.log(order)
        sendOrder(order);
        return
    }

    function handleAdd(action: string) {
        const newNum = (action === '+') ? num + 1 : num - 1;
        setNum(newNum)

        const newOrder = {
            ...order,
            [productSlug]: newNum
        }
        setOrder(newOrder);
        console.log(newOrder);
    }

    function handleAccessory(slug: string) {
        const newOrder = {
            ...order,
            [slug]: order[slug] ? 0 : 1
        }
        setOrder(newOrder);
        console.log(newOrder);
    }

    return (
        <div>
            <div>
                <p>Add a Balloon</p>
                {balloonProducts && balloonProducts.map(
                    item => (
                        <div
                            className={`w-[50px] overflow-hidden h-[50px] hover:opacity-75 duration-300 
                                ${(order[item.slug] == 1) ? 'opacity-50' : 'opacity-100'}
                            `}
                            onClick={() => handleAccessory(item.slug)}
                            key={item.slug}
                        >
                            <img
                                src={getMediaUrl(item.images?.[0]?.image?.url, 'thumbnail')} /*url isn't found on runtime. ignore this*/
                                alt={`Image of ${item.name}`}
                            />
                        </div>
                    )
                )}
            </div>
            <div>
                <p>Add a Chocolate</p>
                {miscProducts && miscProducts.map(
                    item => (
                        <div
                            className={`w-[50px] overflow-hidden h-[50px] hover:opacity-75 duration-300 
                                ${(order[item.slug] == 1) ? 'opacity-50' : 'opacity-100'}
                            `}
                            onClick={() => handleAccessory(item.slug)}
                            key={item.slug}
                        >
                            <img
                                src={getMediaUrl(item.images?.[0]?.image?.url, 'thumbnail')} /*url isn't found on runtime. ignore this*/
                                alt={`Image of ${item.name}`}
                            />
                        </div>
                    )
                )}
            </div>
            <div className="!py-[5px]">
                <p>Quantity</p>
            </div>
            <div className="!pb-[10px]">
                <span className="inline-flex border items-center rounded">
                    <div className="border !px-4">
                        {(num == 1) && <div className="cursor-not-allowed">-</div>}
                        {(num != 1) &&
                            <button onClick={() => handleAdd('-')}>
                                -
                            </button>
                        }
                    </div>

                    <div className="border !px-4">
                        <span>{num}</span>
                    </div>
                    <div className="border !px-4">
                        <button onClick={() => handleAdd('+')}>
                            +
                        </button>
                    </div>
                </span>
            </div>
            <div>
                <p>Total price: {price}</p>
            </div>
            <div className="text-center !w-1/2 border rounded border-white !py-[5px]">
                <button onClick={handleOrder}>Add to Cart</button>
            </div>

        </div>
    )
}