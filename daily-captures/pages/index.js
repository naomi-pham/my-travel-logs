import {GraphQLClient, gql} from "graphql-request"
import BlogCard from '../components/BlogCard'

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

      myTrip {
        location
        posts {
          id
          title
          datePublished
          coverPhoto {
            url
          }
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
    revalidate: 10,
  }
}

export default function Home({posts}) {
  return (
      <main className='text-left pt-8 lg:pt-12 lg:pb-8'>     
        <div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl mt-4 lg:mt-0'>My travel logs</h1>
            {posts.map(post => (
              <BlogCard 
                key={post.id} 
                post={post}
              /> 
            ))} 
        </div>       
      </main>
  )
}
