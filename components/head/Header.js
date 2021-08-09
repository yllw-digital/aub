import Head from 'next/head'

export default function Header() {
  return (
    <Head>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
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
        href="/fonts/D-DIN-Condensed.woff"
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
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>
    </Head>
  )
}