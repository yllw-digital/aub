
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
    const [buildingConditionRentalValue, setBuildingConditionRentalValue] = useState([])
    const [numberOfBedroomsDistribution, setNumberOfBedroomsDistribution] = useState([])
    const [householdPerZone, setHouseholdPerZone] = useState([]);
    const [contractArrangements, setContractArrangements] = useState(null)
    const [furnishedCount, setFurnishedCount] = useState(null);


    useEffect(() => {
        const buildingStatusRentalValue = async () => {
            const res = await getBuildingStatusRentalValue();
            setBuildingStatusRentalValue(res.data);
        }

        const buildingConditionRentalValue = async () => {
            const res = await getBuildingConditionRentalValue();
            setBuildingConditionRentalValue(res.data);
        }

        const householdPerZone = async () => {
            const res = await getHouseholdPerZone();
            setHouseholdPerZone(res.data);
        }

        const numberOfBedroomsDistribution = async () => {
            const res = await getNumberOfBedroomsDistribution();
            setNumberOfBedroomsDistribution(res.data);
        }

        const contractArrangements = async () => {
            const res = await getContractArrangements();
            setContractArrangements(res.data);
        }

        const furnishedCount = async () => {
            const res = await getFurnishedCount();
            setFurnishedCount(res.data);
        }

        buildingConditionRentalValue();
        buildingStatusRentalValue();
        householdPerZone();
        numberOfBedroomsDistribution();
        furnishedCount();
        contractArrangements()
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

                    <div>
                        <BarChart title="BUILDING STATUS IN RELATION TO PRICE" >
                            <Chart
                                width={'300px'}
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={buildingStatusRentalValue}
                                options={{
                                    colors: colorsArray,
                                    chartArea: { width: '70%' },
                                    bar: { groupWidth: '15%' },
                                    // title: 'Building Status vs Rental Value',
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
                        </BarChart>
                    </div>
                    <div>
                        <BarChart title="BUILDING CONDITION IN RELATION TO PRICE" >
                            <Chart
                                width={'300px'}
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={buildingConditionRentalValue}
                                options={{
                                    colors: colorsArray,
                                    bar: { groupWidth: '15%' },
                                    // title: 'Building Condition vs Rental Value',
                                    hAxis: {
                                        title: 'Building Condition',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Rental Value',
                                        minValue: 0,
                                    },
                                    legend: "none",

                                }}
                            />
                        </BarChart>
                    </div>

                </OwlCarousel>


                {/* <OwlCarousel options={carouselOptions}>
                    <div>
                        <PieChart />
                    </div>
                    <div>
                        <PieChart />
                    </div>
                    <div>
                        <PieChart />
                    </div>
                </OwlCarousel> */}

                <OwlCarousel options={carouselOptions}>
                    <div>
                        <BarChart title="ZONE / NUMBER OF HOUSEHOLD MEMBERS" >
                            <Chart
                                width={'100%'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={householdPerZone}
                                options={{
                                    colors: colorsArray,
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </BarChart>
                    </div>

                    <div>
                        <BarChart title="NUMBER OF BEDROOMS / RENT COUNTS" >
                            <Chart
                                width={'100%'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={numberOfBedroomsDistribution}
                                options={{
                                    colors: colorsArray,
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </BarChart>
                    </div>
                </OwlCarousel>

                <OwlCarousel options={carouselOptions}>
                    <div>
                        <CircledNumber
                            text={'Live under old rent contracts'}
                            value={contractArrangements?.toString() + '+'}
                        />
                    </div>

                    <div>
                        <CircledNumber
                            text={'Live in furnished apartments'}
                            value={furnishedCount?.toString() + '+'}
                        />
                    </div>
                </OwlCarousel>



                {/* <CircledNumber value={'2342'} text={'Are responsible to pay their own bill and utilities'} /> */}
                {/* <BarChart title="LAST RENT RENEWED" />
                <HorizontalChart title="TOTAL MONTHLY PAYABLE UTILITY FEES (USD)" /> */}
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