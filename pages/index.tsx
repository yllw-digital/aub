import Layout from '../components/Layout';
import styles from '../styles/Layout.module.css';

export default function Home() {

  return (
    <Layout>
      <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1mg2lV3nlrMZrJlNoLZuNeFIjv08&ie=UTF8&hl=en&msa=0&ll=47.672943227146995%2C-122.298856&spn=0.009738%2C0.018303&output=embed&z=16" className={styles.map} />
    </Layout>

  )
}
