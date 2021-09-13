import Layout from '../components/Layout';
import styles from '../styles/Layout.module.css';

export default function Home() {

  return (
    <Layout>
      <iframe src="https://experience.arcgis.com/experience/e25736eb4cf54344abb4a3bbfde809b5/" className={styles.map} />
    </Layout>
  )

}