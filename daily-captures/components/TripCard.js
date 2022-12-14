import Image from "next/image"
import Link from "next/link"

export default function TripCard({post}) {

    const {title, coverPhoto, datePublished, slug, content} = post
    return (
        <div className="flex justify-center bg-zinc-800 opacity-85 mb-8">       
            <div className="overflow-hidden">
                <Link href={"/posts/" + slug}>
                    <Image
                        alt=""
                        src={coverPhoto.url}
                        width={300} height={180}
                        className="hover:scale-125 transform-transition duration-300 hover:cursor-pointer"
                    />
                </Link>
                <p className="px-2 pt-1">{title} | <span className="opacity-70">{datePublished}</span></p>
            </div>
        </div>

    )
}
