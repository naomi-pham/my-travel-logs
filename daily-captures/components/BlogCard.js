import Link from 'next/link';
import Image from'next/image';

export default function BlogCard({post}) {

    const {coverPhoto, title, datePublished, slug, myTrip} = post

    return (
        <article className='bg-zinc-800 px-8 py-2'>
            <h2 className='mt-12'>{title} | <span className='opacity-60'>{datePublished}</span></h2>

            <section className='columns-1 sm:columns-2 lg:columns-3 mb-6'>
                <div className='mt-2 mb-5 w-11/12 lg:mx-auto'>
                    <Image 
                        src={coverPhoto.url} 
                        width={250} 
                        height={180}
                        alt=""
                    />       
                </div>
                <div
                    dangerouslySetInnerHTML={{__html: post.content.html}}>
                </div>
                <Link href={"/posts/" + slug}>
                    <button className ='py-2 text-sm font-bold rounded-lg mt-3 
                                        underline-emerald before:w-12 hover:before:w-16 hover:opacity-80'
                    >
                        Go to post
                    </button>
                </Link>
            </section>

        </article>
    )
}