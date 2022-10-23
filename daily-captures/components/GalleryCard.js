import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function GalleryCard({post}) {

    const {title, coverPhoto, datePublished, slug, content} = post

    const [isHovering, setIsHovering] = React.useState(false)

    function handleMouseOver() {
        setIsHovering(true)
    }

    function handleMouseOut() {
        setIsHovering(false)
    }

    return (
        <div className="relative flex justify-center overflow-hidden">       
            <Link href={"/posts/" + slug}>
                <Image
                    src={coverPhoto.url}
                    width={400} height={300}
                    className="hover:scale-125 transform-transition duration-300 hover:cursor-pointer"
                    onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
                />
            </Link>
            {isHovering && <div className="absolute p-2 bg-zinc-700 opacity-80 left-0 right-0 bottom-0 z-10">{title} | <span className="opacity-70">{datePublished}</span></div>}
        </div>

    )
}