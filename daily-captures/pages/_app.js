import '../styles/globals.css'
import { Layout } from '../components/Layout'
import Transition from '../components/Transition'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Transition>
        <Component {...pageProps} />
      </Transition>
    </Layout>
  )
}

export default MyApp
