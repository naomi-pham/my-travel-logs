import { GraphQLClient, gql } from "graphql-request";
import MainWrapper from "../components/Wrapper/MainWrapper";
import SectionTitle from "../components/Typography/SectionTitle";

const graphcms = new GraphQLClient("https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9hecjwa0gsn01uj7mgtceh8/master")

const QUERY = gql`
    {
    abouts {
        id
        title
        content {
        html
        }
    } 
}`

export async function getStaticProps() {
    const {abouts} = await graphcms.request(QUERY)
    console.log(abouts)
    return {
        props: {
            abouts,
        },
        revalidate: 60,
    }
}

export default function About ({abouts}) {

    return (
        <MainWrapper>
            <SectionTitle>About</SectionTitle>
            {abouts.map(about => {
                return (
                    <section key={about.id} className="about columns-1 sm:columns-2 lg:columns-3 bg-zinc-800 px-8 lg:px-16 pt-14 pb-8">
                        <div dangerouslySetInnerHTML={{__html: about.content.html}}></div>
                        <a href="https://github.com/naomi-pham/my-travel-logs/blob/main/README.md">
                            <button className ='py-2 text-sm font-bold rounded-lg mt-3 
                                                underline-emerald before:w-12 hover:before:w-16 hover:opacity-80'
                            >
                                Visit GitHub
                            </button>
                        </a>
                    </section>
                )
            })}            
        </MainWrapper>
    )

}