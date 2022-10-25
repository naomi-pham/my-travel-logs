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
                        <div className="bg-zinc-800 px-8 p-12">
                            <h3 className="text-4xl font-light text-center underline-emerald before:w-28 before:-bottom-[0.5px]">{trip.location}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    </section>
                )
            })}
        </MainWrapper>
    )
}