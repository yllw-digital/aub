import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import Link from 'next/link'

export default function Zones() {

    const Zone = () => {
        return (
            <div className={`${styles.zoneContainer} separated`}>
                <img src="/zone.png" />
                <h3>Zone Name</h3>

                <div className={styles.zoneMetaContainer}>
                    <div className={styles.zoneMeta}>
                        <p>RENT AMOUNT</p>
                        <p>1,500 - 2,000$</p>
                    </div>

                    <div className={styles.zoneMeta}>
                        <p>APARTMENT SIZE</p>
                        <p>250 - 350 SQM</p>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <Layout>
            <div className={styles.zonesLayoutContainer}>
                <div className={styles.leftSidebar}>

                    {/* /** top container start */}
                    <div className={styles.topContainer}>
                        <div className={styles.titleBox}>
                            <p><span>20</span> SURVEY</p>
                        </div>

                        <Link href="">
                            <div className={styles.submit}>
                                <img src="/editpen.png" />
                                SUBMIT A SURVEY
                            </div>
                        </Link>
                    </div>
                    {/* /** top container end */}

                    {/* Zones list */}
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />


                </div>


                <div className={styles.tableContainer}>

                </div>
            </div>
        </Layout>

    )
}
