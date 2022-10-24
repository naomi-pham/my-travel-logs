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

export default function ({abouts}) {

    return (
        <MainWrapper>
            <SectionTitle>About</SectionTitle>
            {abouts.map(about => {
                return (
                    <section key={about.id}
                        className="about bg-zinc-800 px-8 lg:px-16 pt-14 pb-8"
                        dangerouslySetInnerHTML={{__html: about.content.html}}>
                    </section>
                )
            })}            
        </MainWrapper>
    )

}