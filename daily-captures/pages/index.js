import {GraphQLClient, gql} from "graphql-request"
import BlogCard from '../components/BlogCard'
import MainWrapper from "../components/Wrapper/MainWrapper"
import SectionTitle from "../components/Typography/SectionTitle"

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
    revalidate: 60,
  }
}

export default function Home({posts}) {
  return (
      <MainWrapper>     
        <div>
          <SectionTitle>My travel logs</SectionTitle>
            {posts.map(post => (
              <BlogCard 
                key={post.id} 
                post={post}
              /> 
            ))} 
        </div>       
      </MainWrapper>
  )
}
