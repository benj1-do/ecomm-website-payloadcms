import { CollectionConfig } from "payload";

export const Cart: CollectionConfig = {
    slug: 'cart',
    labels: {
        singular: "Cart",
        plural: "Carts"
    },
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        { // person's name
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true
        },
        {
            name: 'slug',
            type: 'text',
            required: true
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true
                }
            ]
        }
    ]

}