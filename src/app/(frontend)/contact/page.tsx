import { getPayload } from "payload";
import config from '@payload-config';
export default async function ContactPage() {
    // const payload = await getPayload({config});
    // const res = await payload.find({
    //     collection: 'form',
    //     depth: 2,
    //     where: {
    //         slug: { equals: slug }
    //     }
    // });
    function sendForm({ props }) {

        return props.item;
    }


    return (
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="!pb-[10px]">
                    <h1>
                        Contact
                    </h1>
                </div>

                <span className="flex gap-2 pb-2">
                    <p>Phone: </p>
                    <a href="tel:0433 622 255" className="underline hover:text-white text-gray-300 duration-300">0433 622 255</a>
                </span>

                <span className="flex gap-2 pb-2">
                    <p>Email: </p>
                    <a href="mailto:piscesflowerstudio@gmail.com" className="underline hover:text-white text-gray-300 duration-300">piscesflowerstudio@gmail.com</a>
                </span>
                <span className="flex gap-2 pb-2">
                    <p>Address: </p>
                    <p>Shop 5, 96 Greville St, Prahran VIC 3181</p>
                </span>
                <div className='w-full'>
                    <iframe className='w-full h-[450px]'
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=36%20Porter%20St,%20Prahran%20VIC%203181on%20Street,%20Dublin,%20Ireland+(Pisces%20Flower)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        <a href="https://www.mapsdirections.info/de/evolkerung-auf-einer-karte-berechnen/">
                            Test
                        </a>
                    </iframe>
                </div>

                <form>
                    <div className="flex gap-4 flex-col py-5 text-black">
                        <div className="flex flex-row gap-4">
                            <input type="text" placeholder="Name" className="p-2 px-4 placeholder:text-sm" />
                            <input type="text" placeholder="Email" className="p-2 px-4 placeholder:text-sm" />
                        </div>
                        <div className="w-full flex">
                            <input type="text" placeholder="Phone Number" className="w-full p-2 px-4 placeholder:text-sm" />
                        </div>
                        <div>
                            <input type="text" placeholder="Comment" className="w-full p-2 px-4 pb-8 placeholder:text-sm" />
                        </div>

                    </div>
                    <div className="pb-5">
                        <button type="submit" className="text-white border rounded border-white px-2">Send</button>
                    </div>


                </form>
            </div>
        </div>
    )
}