
import styles from '../styles/RightSideBar.module.css'
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'
import PieChart from './charts/PieChart/PieChart'
import CircledNumber from './charts/CircledNumber/CircledNumber'
// import HorizontalChart from './charts/HorizontalChart/HorizontalChart'
import { useContext } from 'react'
import { PopupsContext } from '../context/PopupContext'
import OwlCarousel from 'react-owl-carousel2';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'
import { Chart } from "react-google-charts";
import { getSubmissionCount } from '../services/answers/answers';
import useUserHook from '../hooks/useUserHook'

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
    const hookUser = useUserHook();

    const [buildingStatusRentalValue, setBuildingStatusRentalValue] = useState([])
    const [buildingConditionRentalValue, setBuildingConditionRentalValue] = useState([])
    const [numberOfBedroomsDistribution, setNumberOfBedroomsDistribution] = useState([])
    const [householdPerZone, setHouseholdPerZone] = useState([]);
    const [contractArrangements, setContractArrangements] = useState(null)
    const [furnishedCount, setFurnishedCount] = useState(null);
    const [submissionCount, setSubmissionCount] = useState(0);

    useEffect(() => {
        const fetchSubmissionCount = async () => {
            try {
                const res = await getSubmissionCount();
                setSubmissionCount(res?.data?.count)
            } catch (e) {
                console.log('fetchSubmissionCount', e)
            }
        }

        const buildingStatusRentalValue = async () => {
            try {
                const res = await getBuildingStatusRentalValue();
                setBuildingStatusRentalValue(res.data);
            } catch (e) {
                console.log('buildingStatusRentalValue', e)

            }
        }

        const buildingConditionRentalValue = async () => {
            try {
                const res = await getBuildingConditionRentalValue();
                setBuildingConditionRentalValue(res.data);
            } catch (e) {
                console.log('buildingConditionRentalValue', e)
            }
        }

        const householdPerZone = async () => {
            try {
                const res = await getHouseholdPerZone();
                setHouseholdPerZone(res.data);
            } catch (e) {
                console.log('householdPerZone', e)
            }
        }

        const numberOfBedroomsDistribution = async () => {
            try {
                const res = await getNumberOfBedroomsDistribution();
                setNumberOfBedroomsDistribution(res.data);
            } catch (e) {
                console.log('numberOfBedrromsDistribution', e)
            }
        }

        const contractArrangements = async () => {
            try {
            const res = await getContractArrangements();
            setContractArrangements(res.data);
            } catch (e) {
                console.log('contractsAgreements', e)
            }
        }

        const furnishedCount = async () => {
            try {
            const res = await getFurnishedCount();
            setFurnishedCount(res.data);
            } catch (e) {
                console.log('furnishedCount', e)
            }
        }

        buildingConditionRentalValue();
        buildingStatusRentalValue();
        householdPerZone();
        numberOfBedroomsDistribution();
        furnishedCount();
        contractArrangements()
        fetchSubmissionCount()
    }, [])

    const first = useRef(null);
    const carouselOptions = {
        items: 1,
        nav: true,
        navText: [
            `<i class="fas fa-chevron-left leftArrow"></i>`, `<i class="fas fa-chevron-right rightArrow"></i>`
        ],
    }
    return (
        <div className='sideMenuContainer'>
            {!isAuthenticated && <div className='sideHeader'>
                <h1>WANT TO LEAVE</h1>
                <h1>A SURVEY</h1>

                <button href={'/'} onClick={(e) => {
                    showPopup('login')
                }} >
                    LOGIN
                </button>
            </div>}


            {isAuthenticated && <div className='sideHeader'>
                <h1>WELCOME BACK</h1>
                <h1 style={{ textTransform: 'uppercase' }}>{ typeof hookUseruser !== 'undefined' ? hookUser?.firstname : user?.firstname}</h1>
                <button href={'/'} onClick={(e) => {
                    router.push('/account')
                }} >
                    MY ACCOUNT
                </button>
            </div>}

            <div className='mainContent'>
                <OwlCarousel options={carouselOptions}>

                    <div>
                        <BarChart title="BUILDING STATUS IN RELATION TO PRICE" >
                            <Chart
                                width={'100%'}
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
                                width={'100%'}
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
                <div className='footerContainer'>
                    <div className='surveyCount'>
                        <p className='emphasised'>{submissionCount}</p>
                        <p>Submitted Surveys</p>
                    </div>

                    <div className='buttonContainer'>
                        {/* <Link href={'/stats'} >
                            MORE STATS
                        </Link> */}
                        <Link href={{ pathname: '/', query: { takesurvey: true } }}>
                            LEAVE SURVEY
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