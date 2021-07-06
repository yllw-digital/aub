
import styles from '../styles/RightSideBar.module.css'
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'

export default function GraphSideMenu() {
    return (
        <div>
            <div className={styles.sideHeader}>
                <h1>WANT TO LEAVE</h1>
                <h1>A SURVEY</h1>

                <Link href={'/'} className={styles.loginButton}>
                    LOGIN
                </Link>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.mainContentTitle}>
                    <h2>APARTMENT AREA</h2>
                    <h2>(SQM) IN RELATION</h2>
                    <h2>TO PRICES</h2>
                </div>

                <div className={styles.chartContainer}>
                    <BarChart />
                </div>


            </div>
        </div>
    )
}