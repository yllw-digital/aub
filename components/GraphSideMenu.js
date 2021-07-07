
import styles from '../styles/RightSideBar.module.css'
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'
import PieChart from './charts/PieChart/PieChart'
import CircledNumber from './charts/CircledNumber/CircledNumber'
import HorizontalChart from './charts/HorizontalChart/HorizontalChart'




export default function GraphSideMenu() {
    return (
        <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
            <div className={styles.sideHeader}>
                <h1>WANT TO LEAVE</h1>
                <h1>A SURVEY</h1>

                <Link href={'/'} className={styles.loginButton}>
                    LOGIN
                </Link>
            </div>

            <div className={styles.mainContent}>
                <BarChart title="APARTMENT AREA (SQM) IN RELATION TO PRICE" />
                <PieChart />
                <CircledNumber />
                <BarChart title="LAST RENT RENEWED" />
                <HorizontalChart title="TOTAL MONTHLY PAYABLE UTILITY FEES (USD)" />
            </div>
            <footer >
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>

            </footer>
        </div>
    )
}