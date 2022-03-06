import styles from '../styles/RightSideBar.module.css'
import 'react-scrollbar/dist/css/scrollArea.css';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link'
import BarChart from './charts/BarChart/BarChart'
import PieChart from './charts/PieChart/PieChart'
import CircledNumber from './charts/CircledNumber/CircledNumber'
// import HorizontalChart from './charts/HorizontalChart/HorizontalChart'
import { useContext } from 'react'
import { PopupsContext } from '../context/PopupContext'
import OwlCarousel from 'react-owl-carousel2';
import ScrollArea from 'react-scrollbar/dist/no-css';
import { useAuth } from '../context/auth';
import { getFilters, getTable } from '../services/statistics/statistics'
import { useRouter } from 'next/router'
import { Chart } from "react-google-charts";
import { getSubmissionCount } from '../services/answers/answers';
import useUserHook from '../hooks/useUserHook'
import { SidebarContext } from "../context/SidebarContext";

const colorsArray = ['#344093', '#1A8588', '#FED531', '#2a3376', '#156a6d', '#cbaa27', '#1f2658','#105052', '#98801d', '#48539e', '#319194', '#fed946'];
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
    getHouseholdPerZoneBarThird
} from '../services/statistics/statistics';
export default function GraphSideMenu() {

    const { showPopup } = useContext(PopupsContext)
    const { isAuthenticated, user } = useAuth();
    const sidebarContext = useContext(SidebarContext);
    const router = useRouter();
    const hookUser = useUserHook();

    const [buildingStatusRentalValue, setBuildingStatusRentalValue] = useState([])
    const [buildingConditionRentalValue, setBuildingConditionRentalValue] = useState([])
    const [numberOfBedroomsDistribution, setNumberOfBedroomsDistribution] = useState([])
    const [householdPerZoneBar, setHouseholdPerZoneBar] = useState([]);
    const [contractArrangements, setContractArrangements] = useState(null)
    const [furnishedCount, setFurnishedCount] = useState(null);
    const [submissionCount, setSubmissionCount] = useState(0);

    useEffect(() => {
        const fetchSubmissionCount = async () => {
            try {
                const res = await getTable([]);
                setSubmissionCount(res?.data?.submissions.length)
            } catch (e) {
                console.log('fetchSubmissionCount', e)
            }
        }

        const buildingStatusRentalValue = async () => {
            try {
                const res = await getBuildingStatusRentalValue();
                console.log('data', res.data);
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

        const householdPerZoneBar = async () => {
            try {
                const res = await getHouseholdPerZoneBarThird();
                setHouseholdPerZoneBar(res.data);
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
        householdPerZoneBar();
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
        <div className={sidebarContext.showSidebar ? 'sideMenuContainer' : 'sideMenuContainer collapsed'}>
            <div className='sideMenuContainer__expand' onClick={(e) => {
                sidebarContext.sidebarShow()
            }}>
                <div>
                    <i className='fas fa-chevron-left'></i>
                </div>
            </div>
            <div className='sideMenuContainer__collapse' onClick={(e) => {
                sidebarContext.sidebarHide()
            }}>
                <div>
                    <i className='fas fa-chevron-right'></i>
                </div>
            </div>
            <div className='sideMenuContainer__content'>
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

                
                <ScrollArea
                    speed={0.8}
                    className="mainContent"
                    contentClassName="content"
                    horizontal={false}
                >
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
                                        bar: { groupWidth: '60%' },
                                        // title: 'Building Status vs Rental Value',
                                        annotations: {
                                            alwaysOutside: true,
                                            textStyle: {
                                                auraColor: 'transparent',
                                                color: '#FFF',
                                                fontSize: 14,
                                            },
                                            stem: {
                                                color: 'transparent',
                                                // length: 1,
                                            }
                                        },
                                        hAxis: {
                                            // title: 'Building status',
                                            minValue: 0,
                                            textStyle: {
                                                bold: true
                                            },
                                        },
                                        vAxis: {
                                            title: 'Rental Value',
                                            textPosition: 'in',
                                            minValue: 0,
                                            titleTextStyle: {
                                                italic: false,
                                                bold: true,
                                            },
                                            textStyle: {
                                                color: 'transparent'
                                            },
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            baselineColor: 'transparent'
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
                                        chartArea: { width: '70%' },
                                        bar: { groupWidth: '80%' },
                                        // title: 'Building Status vs Rental Value',
                                        annotations: {
                                            alwaysOutside: true,
                                            textStyle: {
                                                auraColor: 'transparent',
                                                color: '#FFF',
                                                fontSize: 14,
                                            },
                                            stem: {
                                                color: 'transparent',
                                                // length: 1,
                                            }
                                        },
                                        hAxis: {
                                            // title: 'Building status',
                                            minValue: 0,
                                            textStyle: {
                                                bold: true
                                            },
                                        },
                                        vAxis: {
                                            title: 'Rental Value',
                                            textPosition: 'in',
                                            minValue: 0,
                                            titleTextStyle: {
                                                italic: false,
                                                bold: true,
                                            },
                                            textStyle: {
                                                color: 'transparent'
                                            },
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            baselineColor: 'transparent'
                                        },
                                        legend: "none",
                                    }}
                                />
                            </BarChart>
                        </div>
                    </OwlCarousel>

                    <OwlCarousel options={carouselOptions}>
                        <div>
                            <BarChart title="ZONE VS NUMBER OF HOUSEHOLD MEMBERS" >
                                <Chart
                                    width={'100%'}
                                    chartType="BarChart"
                                    height={'200px'}
                                    loader={<div>Loading Chart</div>}
                                    data={householdPerZoneBar}
                                    options={{
                                        colors: colorsArray,
                                        bar: { groupWidth: '80%' },
                                        chartArea: { width: '60%', height: '100%' },
                                        // pieSliceBorderColor: 'transparent',
                                        // pieSliceText: 'none',
                                        legend: 'none',
                                        annotations: {
                                            alwaysOutside: true,
                                            textStyle: {
                                                auraColor: 'transparent',
                                                color: '#000',
                                                fontSize: 11,
                                            },
                                            stem: {
                                                color: 'transparent',
                                                // length: 1,
                                            }
                                        },
                                        hAxis: {
                                            minValue: 0,
                                            direction: -1,
                                            textStyle: {
                                                bold: true,
                                                color: 'transparent'
                                            },
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                        },
                                        vAxis: {
                                            title: 'Zone',
                                            titleTextStyle: {
                                                italic: false,
                                                bold: true,
                                            },
                                            textStyle: {
                                                // bold: true
                                            },
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            baselineColor: 'transparent',
                                            minValue: 0,
                                        },
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
                                        pieSliceBorderColor: 'transparent',
                                        pieSliceText: 'none'
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
                </ScrollArea>
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
            </div>
        </div >
    )
}