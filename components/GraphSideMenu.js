
import styles from '../styles/RightSideBar.module.css'
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'
import PieChart from './charts/PieChart/PieChart'
import CircledNumber from './charts/CircledNumber/CircledNumber'
import HorizontalChart from './charts/HorizontalChart/HorizontalChart'
import { useContext } from 'react'
import { PopupsContext } from '../context/PopupContext'


export default function GraphSideMenu() {
    const {showPopup} = useContext(PopupsContext)

    return (
        <div className={styles.sideMenuContainer}>
            <div className={styles.sideHeader}>
                <h1>WANT TO LEAVE</h1>
                <h1>A SURVEY</h1>

                <button href={'/'} onClick={(e) => {
                    showPopup('login')
                }} >
                    LOGIN
                </button>
            </div>

            <div className={styles.mainContent}>
                <BarChart title="APARTMENT AREA (SQM) IN RELATION TO PRICE" />
                <PieChart />
                <CircledNumber />
                <BarChart title="LAST RENT RENEWED" />
                <HorizontalChart title="TOTAL MONTHLY PAYABLE UTILITY FEES (USD)" />
            </div>
            <footer >
                <div className={styles.footerContainer}>
                    <div className={styles.surveyCount}>
                        <p className={styles.emphasised}> 2,342</p>
                        <p>Submitted Surveys</p>
                    </div>

                    <div className={styles.buttonContainer}>
                        <Link href={'/zones'} >
                            MORE STATS
                        </Link>
                        <Link href={'/zones'} >
                            VIEW SURVEYS
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}