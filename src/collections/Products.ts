import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    labels: {
        singular: "Product",
        plural: "Products"
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
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'price',
            type: 'number',
            required: true
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: "image",
                    type: 'upload',
                    relationTo: 'media',
                }
            ],
            required: true
        },
        {
            name: 'color',
            type: 'text',
        },
        {
            name: 'productType',
            label: 'Product Type',
            type: 'select',
            required: true,
            options: [
                { label: 'Dried Flowers', value: 'dried' },
                { label: 'Fresh Flowers', value: 'fresh' },
                { label: 'Balloons', value: 'balloons' },
                { label: 'Misc', value: 'misc' }, // for chocolates and accessories
                { label: 'Wedding Flowers', value: 'wedding' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'recommended',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'size',
            type: 'text',
        },
        {
            name: 'description',
            type: 'text'
        }
    ]
}