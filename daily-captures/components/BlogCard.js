import Link from 'next/link';

export default function BlogCard({post}) {

    const {coverPhoto, title, datePublished, slug} = post

    return (
        <article className='bg-zinc-800 px-8 py-2'>
            <h2 className='mt-12'>{title} | <span className='opacity-60'>{datePublished}</span></h2>

            <section className='columns-1 sm:columns-2 lg:columns-3 mb-6'>
                <img className='w-11/12 mt-2 mb-5' src={coverPhoto.url} width="200px"/>       
                <div
                    dangerouslySetInnerHTML={{__html: post.content.html}}>
                </div>
                <Link href={"/posts/" + slug}>
                    <button className='bg-zinc-700 hover:bg-zinc-600 p-2 text-sm font-bold opacity-60 rounded-lg mt-3'>
                        Go to post
                    </button>
                </Link>
            </section>

        </article>
    )
}