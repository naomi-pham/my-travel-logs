import {GraphQLClient, gql} from "graphql-request"
import GalleryCard from '../components/GalleryCard'
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
      <MainWrapper>     
        <div>
          <SectionTitle>Gallery</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map(post => (
                    <GalleryCard key={post.id} post={post} />
            ))}  
           </div>
        </div>    
      </MainWrapper>
  )
}
