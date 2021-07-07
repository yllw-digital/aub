import Head from 'next/head'

export default function Header() {
  return (
      <Head>
        <link
          href="/fonts/D-DIN-Bold.woff"
          rel="preload"
          as="font"
        crossOrigin=""
        />
          <link
          href="/fonts/D-DIN.woff"
          rel="preload"
          as="font"
        crossOrigin=""
        />
            <link
          href="/fonts/Interstate-Light-Regular.woff"
          rel="preload"
          as="font"
        crossOrigin=""
        />
      </Head>
  )
}