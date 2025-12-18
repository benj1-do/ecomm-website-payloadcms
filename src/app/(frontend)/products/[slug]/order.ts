'use server';
import { getPayload } from "payload";
import config from '@payload-config';
import { headers as getHeaders } from "next/headers";
import createCart from "../../cart/createCart";

export async function sendOrder(productsObj: Record<string, number>) {

    async function findProductBySlug(slug: string) {
        const res = await payload.find({
            collection: 'products',
            depth: 2,
            where: {
                slug: { equals: slug }
            }
        });
        return res.docs[0];
    }


    const payload = await getPayload({ config });
    const headers = await getHeaders();
    const { user, permissions } = await payload.auth({ headers }); // gets the user
    if (user) {
        let userCart;
        const cartRes = await payload.find({
            collection: 'cart',
            depth: 2,
            where: {
                user: { equals: user }
            }
        });
        if (cartRes.docs.length === 0) {
            userCart = await createCart(user); // if a cart object isn't found, create one
        } else {
            userCart = cartRes.docs[0];
        }

        const currentCart = userCart.items ?? [];

        const addCart = await Promise.all(
            Object.entries(productsObj).map(async ([slug, quantity]) => {
                return {
                    'product': await findProductBySlug(slug),
                    'quantity': quantity
                }
            })
        );

        const map = new Map();

        for (const { product, quantity } of currentCart) {
            map.set(product.slug,
                map.has(product.slug) ? {
                    product,
                    quantity: map.get(product.slug).quantity + quantity
                } : { product, quantity } // default if not found
            );
        }

        for (const { product, quantity } of addCart) {
            map.set(product.slug,
                map.has(product.slug) ? {
                    product,
                    quantity: map.get(product.slug).quantity + quantity
                } : { product, quantity } // default if not found
            );
        }

        const newCart = Array.from(map.values());
        console.log(newCart);
        const updRes = await payload.update({
            collection: 'cart',
            id: userCart.id,
            data: {
                items: newCart
            },
            depth: 2
        })
    }

    return
}

export async function calcOrder(productsObj: Record<string, number>) { // dictionary of slugs and numbers
    const payload = await getPayload({ config });

    let total = 0; // total price
    for (const slug in productsObj) {
        const qty = productsObj[slug];
        const res = await payload.find({
            collection: 'products',
            depth: 2,
            where: {
                slug: { equals: slug }
            }
        });
        const product = res.docs[0];
        total += product.price * qty;
    }
    return total;
}