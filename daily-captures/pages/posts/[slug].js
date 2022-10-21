import {GraphQLClient, gql} from "graphql-request"
import Image from "next/image"
import React from "react"

const graphcms = new GraphQLClient("https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9hecjwa0gsn01uj7mgtceh8/master")

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
            id,
            title,
            slug,
            datePublished,
            author{
                id,
                name
                avatar{
                    url
                }
            }
            coverPhoto{
                id, 
                url
            }
            content{
                html
            }
        }
    }
  
`

const SLUGLIST = gql`
    {
        posts{
            slug
        }
    }
`

export async function getStaticPaths() {
    const {posts} = await graphcms.request(SLUGLIST)
    return {
        paths: posts.map(post => ({params: {slug: post.slug}})),
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const data = await graphcms.request(QUERY, {slug})
    const post = data.post
    // console.log(data)
    return {
        props: {
            post,
        },
        revalidate: 60
    }
}

export default function BlogPost({post}) {

    const {coverPhoto, title, datePublished, slug} = post

    const [like, setLike] = React.useState(false)
    const [count, setCount] = React.useState(0)
    
    function toggleLike() {
        setLike(true)
        setCount(1)
    }

    return (
        <div className='text-left pt-8 lg:pt-12 lg:pb-8'>             
            <h1 className='mt-12'>{title} | <span className='opacity-60'>{datePublished}</span></h1>
            <article className='bg-zinc-800 px-8 py-2'>
                <section className='columns-1 sm:columns-2 lg:columns-3 py-8'>
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
                </section>
            </article>

            <div className="flex place-content-between items-baseline py-8 opacity-80">
                <div>
                    <button className="border border-1 border-zinc-600 hover:bg-zinc-800"><i className='bx bxl-facebook w-12 aspect-square text-xl flex justify-center items-center'></i></button>
                    <button className="border border-1 border-zinc-600 hover:bg-zinc-800"><i className='bx bxl-twitter w-12 aspect-square text-xl flex justify-center items-center'></i></button>
                    <button className="border border-1 border-zinc-600 hover:bg-zinc-800"><i className='bx bxl-instagram w-12 aspect-square text-xl flex justify-center items-center'></i></button>
                    <button className="border border-1 border-zinc-600 hover:bg-zinc-800">
                        <i 
                            className={`text-xl bx ${like ? "bxs-heart" : "bx-heart"} ${like ? "text-rose-500" : ""} 
                                        hover:scale-125 transition-transform ease-in-out duration-300 opacity-80
                                        bx bxl-instagram w-12 aspect-square text-xl flex justify-center items-center`}
                            onClick={toggleLike}
                         >
                        </i>
                    </button>
                </div>
            </div>   
        </div>
    )
}

