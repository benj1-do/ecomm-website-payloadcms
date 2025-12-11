import { CollectionConfig } from "payload";
import { link } from '@/fields/link'
export const NavBar: CollectionConfig = {
    slug: 'navbar',
    labels: {
        singular: "NavBar",
        plural: "NavBars"
    },
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: 'name',
            type: 'text'
        },
        {
            name: 'navItems',
            type: 'array',
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 10,
        }
    ]
}