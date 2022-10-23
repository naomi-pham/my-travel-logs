import {GraphQLClient, gql} from "graphql-request"
import TripCard from '../components/TripCard'

const graphcms = new GraphQLClient("https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9hecjwa0gsn01uj7mgtceh8/master")

const QUERY = gql`
    {
    myTrips {
      id
      location
      posts {
        id
        title
        slug
        datePublished
        coverPhoto {
          id
          url
        }
        content {
          html
        }
      }
    }
  }

`



export async function getStaticProps() {
    const {myTrips} = await graphcms.request(QUERY)
    console.log(myTrips)
    return {
        props: {
            myTrips,
        },
        revalidate: 60,
    }
    
    
}
    
    

export default function Trips({myTrips}) {
    return (
        <main className='text-left pt-8 lg:pt-12 lg:pb-8'>  
            {myTrips.map(trip => {
                return (
                    <div key={trip.id}>
                        <h1>{trip.location}</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {trip.posts.map(post => {
                                return (
                                    <TripCard
                                        key={post.id}
                                        post={post}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </main>
    )
}