import { CollectionConfig } from "payload";

export const ProductsTest: CollectionConfig = {
    slug: 'productsTest',
    labels: {
        singular: "ProductTest",
        plural: "ProductsTest"
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
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            required: true
        },
        {
            name: "image",
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'description',
            type: 'text'
        }
    ]
}