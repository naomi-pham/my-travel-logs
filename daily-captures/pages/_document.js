import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,700&family=Prata&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
