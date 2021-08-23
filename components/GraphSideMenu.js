
import styles from '../styles/RightSideBar.module.css'
import { useRef } from 'react';
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'
import PieChart from './charts/PieChart/PieChart'
import CircledNumber from './charts/CircledNumber/CircledNumber'
import HorizontalChart from './charts/HorizontalChart/HorizontalChart'
import { useContext } from 'react'
import { PopupsContext } from '../context/PopupContext'
import OwlCarousel from 'react-owl-carousel2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'

export default function GraphSideMenu() {
    const { showPopup } = useContext(PopupsContext)
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const first = useRef(null);
    const carouselOptions = {
        items: 1,
        nav: true,
        navText: [
            `<i class="fas fa-chevron-left ${styles.leftArrow}"></i>`, `<i class="fas fa-chevron-right ${styles.rightArrow}"></i>`
        ],
    }
    return (
        <div className={styles.sideMenuContainer}>
                {!isAuthenticated && <div className={styles.sideHeader}> 
                    <h1>WANT TO LEAVE</h1>
                    <h1>A SURVEY</h1>

                    <button href={'/'} onClick={(e) => {
                        showPopup('login')
                    }} >
                        LOGIN
                    </button>
                </div>}


                {isAuthenticated && <div className={styles.sideHeader}>
                    <h1>WELCOME BACK,</h1>
                    <h1>JOE</h1>
                    <button href={'/'} onClick={(e) => {
                        router.push('/account')
                    }} >
                        MY ACCOUNT
                    </button>
                </div>}

            <div className={styles.mainContent}>
                <OwlCarousel options={carouselOptions}>
                    <div>
                        <BarChart title="APARTMENT AREA (SQM) IN RELATION TO PRICE" />
                    </div>
                    <div>
                        <BarChart title="APARTMENT AREA (SQM) IN RELATION TO PRICE" />
                    </div>
                    <div>
                        <BarChart title="APARTMENT AREA (SQM) IN RELATION TO PRICE" />
                    </div>
                </OwlCarousel>


                <OwlCarousel options={carouselOptions}>
                    <div>
                        <PieChart />
                    </div>
                    <div>
                        <PieChart />
                    </div>
                    <div>
                        <PieChart />
                    </div>
                </OwlCarousel>
                <CircledNumber />
                <BarChart title="LAST RENT RENEWED" />
                <HorizontalChart title="TOTAL MONTHLY PAYABLE UTILITY FEES (USD)" />
            </div >
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
        </div >
    )
}