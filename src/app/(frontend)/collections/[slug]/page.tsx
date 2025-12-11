import { getPayload } from "payload";
import config from '@payload-config';
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Link from "next/link";

type Props = {
    params: {
        slug: string;
    };
};

export default async function ProductsByType({ params }: Props) {
    const { slug } = await params;
    const payload = await getPayload({ config });

    let query;
    if (slug == 'all') {
        query = {
            collection: 'products',
            depth: 2,
        }
    } else {
        query = {
            collection: 'products',
            depth: 2,
            where: {
                productType: { equals: slug }
            }
        }
    }

    const res = await payload.find(query);
    const product = res.docs;

    function get_label(val: string) {
        let label;
        switch (val) {
            case 'dried':
                label = 'Dried & Preserved Flowers';
                break;
            case 'fresh':
                label = 'Flower Bouquets';
                break;
            case 'balloons':
                label = 'Balloons';
                break;
            case 'misc':
                label = 'Miscellaneous Items';
                break;
            case 'wedding':
                label = 'Wedding Flowers';
                break;
            case 'all':
                label = 'All Products';
                break;
            default:
                label = '404'

        }
        return label;
    }


    if (!product) {
        return (
            <div>
                <h1>
                    This collection does not exist.
                </h1>
            </div>
        )
    }
    return (
        <div>
            <div className="text-center">
                <h1>{get_label(slug)}</h1>
            </div>
            <div className="grid grid-cols-4 !p-[5px]">
                {product.map(item => (
                    <div className="flex flex-col text-center items-center !p-[5px]" key={item.id}>
                        <Link href={`/products/${item.slug}`}>
                            <div className="w-[200px] overflow-hidden h-[200px] hover:opacity-75 duration-300">
                                <img
                                    src={getMediaUrl(item.images?.[0]?.image?.url, 'thumbnail')} /*url isn't found on runtime. ignore this*/
                                    alt={`Image of ${item.name}`}
                                />
                            </div>
                            <div className='!pt-[10px] hover:text-gray-400 duration-300'>
                                {item.name}
                            </div>
                            <div className="!p-[5px] hover:text-gray-400 duration-300">
                                ${item.price}.00 AUD
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    )
}