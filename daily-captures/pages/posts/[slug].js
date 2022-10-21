import {GraphQLClient, gql} from "graphql-request"
import Nav from "../../components/Nav"
import Head from "next/head"
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

        <div className='m-8 lg:mx-44'>

            <Head>
                <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />           
            </Head>

            <Nav />
            <main className='text-left pt-8 lg:pt-12 lg:pb-8'>             
                <h1 className='mt-12'>{title} | <span className='opacity-60'>{datePublished}</span></h1>
                <article className='bg-zinc-800 px-8 py-2'>
                    <section className='columns-1 sm:columns-2 lg:columns-3 py-8'>
                        <img className='w-11/12 mt-2 mb-5 block' src={coverPhoto.url} width="200px"/>       
                        <div
                            dangerouslySetInnerHTML={{__html: post.content.html}}>
                        </div>
                    </section>
                </article>
                <div className="flex place-content-between items-baseline py-8 opacity-80">
                    <div>
                        <button className="border border-1 border-zinc-600 hover:bg-zinc-800"><i class='bx bxl-facebook w-12 aspect-square text-xl flex justify-center items-center'></i></button>
                        <button className="border border-1 border-zinc-600 hover:bg-zinc-800"><i class='bx bxl-twitter w-12 aspect-square text-xl flex justify-center items-center'></i></button>
                        <button className="border border-1 border-zinc-600 hover:bg-zinc-800"><i class='bx bxl-instagram w-12 aspect-square text-xl flex justify-center items-center'></i></button>
                    </div>
                    <div className="flex text-xl gap-2">
                        <i onClick={toggleLike} className={`text-xl bx ${like ? "bxs-heart" : "bx-heart"} ${like ? "text-rose-500" : ""} hover:scale-125 transition-transform ease-in-out duration-300 opacity-80`}></i>
                        <p>{count}</p>
                    </div>
                    
                </div>
                
            </main>
        </div>
    )
}

