
import styles from '../styles/RightSideBar.module.css'
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'
import PieChart from './charts/PieChart/PieChart'
import CircledNumber from './charts/CircledNumber/CircledNumber'
import HorizontalChart from './charts/HorizontalChart/HorizontalChart'
import { useContext } from 'react'
import { PopupsContext } from '../context/PopupContext'
import OwlCarousel from 'react-owl-carousel2';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'
import { Chart } from "react-google-charts";

const colorsArray = ['rgb(52, 64, 147)', 'rgb(26, 133, 136)', 'rgb(254, 213, 49)']
import {
    getBuildingAgeRentalValue,
    getBuildingAgeContractType,
    getNumberOfBedroomsRentalValue,
    getNumberOfBathroomsRentalValue,
    getBuildingStatusRentalValue,
    getBuildingConditionRentalValue,
    getRentalArrangementsContractType,
    getNumberOfBedroomsDistribution,
    getRentalValueDistribution,
    getContractArrangements,
    getFurnishedCount,
    getHouseholdPerZone
} from '../services/statistics/statistics';
export default function GraphSideMenu() {

    const { showPopup } = useContext(PopupsContext)
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    const [buildingStatusRentalValue, setBuildingStatusRentalValue] = useState([])

    useEffect(() => {
        const buildingStatusRentalValue = async () => {
            const res = await getBuildingStatusRentalValue();
            setBuildingStatusRentalValue(res.data);
        }

        buildingStatusRentalValue();
    }, [])

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
                <h1>WELCOME BACK</h1>
                <h1 style={{ textTransform: 'uppercase' }}>{user?.firstname}</h1>
                <button href={'/'} onClick={(e) => {
                    router.push('/account')
                }} >
                    MY ACCOUNT
                </button>
            </div>}

            <div className={styles.mainContent}>
                <OwlCarousel options={carouselOptions}>

                    <div style={{width: '300px'}}>
                        {/* <BarChart title="APARTMENT AREA (SQM) IN RELATION TO PRICE" /> */}
                            <Chart
                            width={'300px'}
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={buildingStatusRentalValue}
                                options={{
                                    colors: colorsArray,
                                    chartArea: { width: '70%' },
                                    bar: { groupWidth: '15%' },
                                    title: 'Building Status vs Rental Value',
                                    hAxis: {
                                        title: 'Building status',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Rental Value',
                                        minValue: 0,
                                    },
                                    legend: "none",
                                }}

                            />
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
                <CircledNumber value={'2342'} text={'Are responsible to pay their own bill and utilities'} />
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
                        <Link href={'/stats'} >
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