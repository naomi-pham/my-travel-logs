import {GraphQLClient, gql} from "graphql-request"
import Link from 'next/link'
import Image from "next/image"
import GalleryCard from '../components/GalleryCard'

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
    revalidate: 60,
  }
}

export default function Gallery({posts}) {
  return (
      <main className='text-left pt-8 lg:pt-12 lg:pb-8'>     
        <div>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl mt-4 lg:mt-0'>Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map(post => (
                    <GalleryCard key={post.id} post={post} />
            ))}  
           </div>
        </div>    
      </main>
  )
}
