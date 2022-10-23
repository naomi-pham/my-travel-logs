import Image from "next/image"
import Link from "next/link"

export default function TripCard({post}) {

    const {title, coverPhoto, datePublished, slug, content} = post
    return (
        <div className="mb-16">       
            <div className="bg-zinc-800 overflow-hidden">
                <Link href={"/posts/" + slug}>
                    <Image
                        src={coverPhoto.url}
                        width={320} height={210}
                        className="hover:scale-125 transform-transition duration-300 hover:cursor-pointer"
                    />
                </Link>
                <p className="px-2 pt-1">{title} | <span className="opacity-70">{datePublished}</span></p>
            </div>
        </div>

    )
}