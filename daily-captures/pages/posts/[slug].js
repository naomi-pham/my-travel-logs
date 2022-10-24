import {GraphQLClient, gql} from "graphql-request"
import Image from "next/image"
import React from "react"
import MainWrapper from "../../components/Wrapper/MainWrapper"

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
        revalidate: 10,
    }
}

export default function BlogPost({post}) {

    const {coverPhoto, title, datePublished, slug} = post

    const Icons = ["facebook", "twitter", "instagram"]

    const [like, setLike] = React.useState(false)
    const [count, setCount] = React.useState(0)
    
    function toggleLike() {
        setLike(true)
        setCount(1)
    }

    return (
        <MainWrapper>             
            <h2 className='mt-12'>{title} | <span className='opacity-60'>{datePublished}</span></h2>
            <article className='text-center sm:text-left bg-zinc-800 px-8 py-2'>
                <section className='columns-1 sm:columns-2 lg:columns-3 py-8 px-4'>
                    <div className='mt-2 mb-5 w-11/12 lg:mx-auto sm:text-left'>
                        <Image 
                            src={coverPhoto.url} 
                            width={290} 
                            height={180}
                            alt=""
                        />       
                    </div>
                    <div
                        dangerouslySetInnerHTML={{__html: post.content.html}}>
                    </div>
                </section>
            </article>

            <div className="flex place-content-center items-baseline py-8 opacity-80">
                    {Icons.map((icon, index) => {
                        return (
                            <button key={index} className="border border-1 border-zinc-600 hover:bg-zinc-800">
                                <i className={`bx bxl-${icon} w-12 aspect-square text-xl flex justify-center items-center`}></i>
                            </button>

                        )
                    })}
                    <button className="border border-1 border-zinc-600 hover:bg-zinc-800">
                        <i  onClick={toggleLike} 
                            className={`bx ${like ? "bxs-heart" : "bx-heart"} ${like ? "text-rose-500" : ""} 
                                        w-12 aspect-square text-xl flex justify-center items-center
                                        hover:scale-125 transition-transform ease-in-out duration-300 opacity-80`}></i>
                    </button>
            </div>   
        </MainWrapper>
    )
}

