import {GraphQLClient, gql} from "graphql-request"
import TripCard from '../components/TripCard'
import MainWrapper from "../components/Wrapper/MainWrapper"
import SectionTitle from "../components/Typography/SectionTitle"

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
        revalidate: 10,
    }   
}   
    

export default function Trips({myTrips}) {
    return (
        <MainWrapper>  
            <SectionTitle>Trips</SectionTitle>
            {myTrips.map(trip => {
                return (
                    <section key={trip.id}>                   
                        <div className="px-8 p-12 bg-zinc-800 pt-2">
                            <h3 className="mt-12">{trip.location} | <span className="opacity-60">{trip.posts.length} trips</span></h3>
                            <section className="columns-1 sm:columns-2 lg:columns-3">
                                {trip.posts.map(post => {
                                    return (
                                        <TripCard
                                            key={post.id}
                                            post={post}
                                        />
                                    )
                                })}
                            </section>
                        </div>
                    </section>
                )
            })}
        </MainWrapper>
    )
}