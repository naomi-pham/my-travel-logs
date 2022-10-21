import Head from 'next/head'
import {GraphQLClient, gql} from "graphql-request"
import Link from 'next/link'
import Image from "next/image"

const graphcms = new GraphQLClient("https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9hecjwa0gsn01uj7mgtceh8/master")

const QUERY = gql`
  {
    posts {
      datePublished
      id
      slug
      title
      content {
        html
      }
      
      coverPhoto{
        url
      }
      
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY)
  return {
    props: {
      posts,
    },
  }
}

export default function Gallery({posts}) {
  return (
      <main className='text-left pt-8 lg:pt-12 lg:pb-8'>     
        <div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl mt-4 lg:mt-0'>Gallery</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
<<<<<<< HEAD
            {posts.map(post => (
              <div className='bg-zinc-700 overflow-hidden'>
                  <Link href={"/posts/" + post.slug}>
                    <Image className='hover:scale-125 hover:cursor-pointer object-fit transition-transform ease-in-out duration-300' width={300} height={210} src={post.coverPhoto.url} />
                  </Link>
                  <p className='pl-2 pt-2 opacity-95 
                  '>{post.title} | <span className='opacity-60'>{post.datePublished}</span></p>
              </div>
            ))}
=======
          {posts.map(post => (
                <div key={post.id} className='bg-zinc-800 overflow-hidden'>
                    <Link href={"/posts/" + post.slug}>
                        <img className='w-full hover:scale-125 hover:cursor-pointer' src={post.coverPhoto.url} />
                    </Link>
                    <p className='pl-2 pt-3 opacity-95 bg-zinc-800
                    '>{post.title} | <span className='opacity-60'>{post.datePublished}</span></p>
                </div>
          ))}
>>>>>>> 88c496fb1c266e20a91935ce69586df981c2249c
           </div>
        </div>    
      </main>
  )
}
