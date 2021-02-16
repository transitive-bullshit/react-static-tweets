import React from 'react'
import Head from 'next/head'

import '../styles/globals.css'

// core styles shared by all of react-static-tweets (required)
import 'react-static-tweets/styles.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />

        <meta name='description' content='React static tweets demo.' />

        <title>React Static Tweets Demo</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
