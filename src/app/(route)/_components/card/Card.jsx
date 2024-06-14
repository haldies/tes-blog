
import Link from "next/link";
import Image from "next/image";

import StripHtmlTags from "@/utils/StripHtmlTags";


const Card = ({ item }) => {

    return (
        <>
            <div className="pb-6 flex items-center gap-4 border-b-2" key={item.id} >
                {item.image && <div className="md:h-48 rounded hidden sm:flex md:flex">
                    <Image src={item.image} alt="" width={300} height={150} className="rounded object-cover" />
                </div>
                }
                <div className="xl:h-44 flex flex-col gap-3">
                    <div className="text-gray-600">
                        <span className="text-gray-600">{item.publishedAt}{" "}</span>
                    </div>
                    <Link href={`/artikel/${item.slug}`}>
                        <h1 className="text-lg font-bold">{item.title}</h1>
                    </Link>
                    <p className="text-sm font-semibold line-clamp-2  text-[#836D6E] max-w-[500px]  w-full">
                        <StripHtmlTags html={item.content.substring(0, 250)} />
                    </p>
                    <div>
                        <span className="">{item.catSlug}</span>
                        <Link href={`/artikel/${item.slug}`} className=" font-bold text-[#464283]">Baca Selengkapnya</Link>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Card;