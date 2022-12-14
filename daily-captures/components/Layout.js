import Head from "next/head"
import Nav from "./Nav"
import SecondaryNav from "./SecondaryNav"

export const Layout = ({children}) => {
  return (
    <div className='m-8 lg:mx-48'>
        <Head>
            <title>Travel logs</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        {children}
    </div>
  )
}
