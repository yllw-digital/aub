import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';

export default function Home() {
  return (
    <div>
      <Layout>
        {/* <img
          src="/map.png"
          alt="Picture of the author"
        /> */}
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1mg2lV3nlrMZrJlNoLZuNeFIjv08&ie=UTF8&hl=en&msa=0&ll=47.672943227146995%2C-122.298856&spn=0.009738%2C0.018303&output=embed&z=16" style={{
          width: '100%',
          height: 'calc(100vh - 220px)'
        }} />
      </Layout>
      <img src="/aub-logo.png" className={styles.aubLogo} />
      <img src="/beirut-logo.png" className={styles.beirutLogo}  />
    </div>
  )
}
