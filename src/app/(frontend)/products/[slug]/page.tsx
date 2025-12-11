import { getPayload } from "payload";
import config from '@payload-config';
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Cart from "./cart";
import Link from "next/link";

type Props = {
    params: {
        slug: string;
    };
};

export default async function ProductsBySlug({ params }: Props) {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const res = await payload.find({
        collection: 'products',
        depth: 2,
        where: {
            slug: { equals: slug }
        }
    });

    const miscRes = await payload.find({
        collection: 'products',
        depth: 2,
        limit: 3,
        where: {
            productType: { equals: 'misc' }
        }
    });
    const balloonRes = await payload.find({
        collection: 'products',
        depth: 2,
        limit: 3,
        where: {
            productType: { equals: 'balloons' }
        }
    });

    const recommended = await payload.find({
        collection: 'productsTest',
        depth: 2,
    })
    const product = res.docs[0];
    const miscProducts = miscRes.docs;
    const balloonProducts = balloonRes.docs;
    // const suggested = recommended.docs[0].products;
    const suggested = product.recommended;
    console.log(suggested);
    const firstImage = product.images?.[0];
    if (!product) {
        return <div>Product Not Found!</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 !p-[10px]">
                <div className="flex justify-center">
                    <img
                        src={getMediaUrl(firstImage?.image?.sizes.thumbnail.url, 'thumbnail')} /*url isn't found on runtime. ignore this*/
                        alt={`Image of ${product.name}`}

                    />
                </div>
                <div className="flex flex-col">
                    <h2>
                        {product.name}
                    </h2>
                    <h3>
                        ${product.price}.00 AUD
                    </h3>
                    <div /* Change to have a link */ >
                        <span className="underline">
                            <Link href='/policies/shipping-policy'>
                                Shipping
                            </Link>
                        </span> calculated at checkout.
                    </div>
                    {product.size && <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p>
                                Size
                            </p>
                        </div>

                        <span className=""/* Change to allow for multiple sizes */ >
                            <span className="px-4 inline-block py-1 border-white border rounded-full">
                                {product.size}
                            </span>
                        </span>
                    </div>}

                    <div>
                        <p>Pickup/Delivery Date</p>
                        <input className="border rounded" />
                        <p>Order before 1 pm for same-day flower delivery</p>
                    </div>
                    <div>
                        <p>Gift Message</p>
                        <textarea className="border rounded" />
                    </div>
                    <Cart productSlug={slug} miscProducts={miscProducts} balloonProducts={balloonProducts} />
                    {product.description && <div>
                        {product.description}
                    </div>}
                </div>
            </div>
            <div>
                <div className="!p-[10px]">
                    <h2>You may also like</h2>
                </div>
                <div className="grid grid-cols-4">
                    {!suggested && <h3 className="!p-[5px]">No suggestions available!</h3>}
                    {suggested && suggested.map(item => (
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
        </div>
    )
}