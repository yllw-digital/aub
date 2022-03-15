import router from "next/router";
import { useState, useEffect, createRef } from "react";
import { Chart } from "react-google-charts";
import CircledNumber from '../components/charts/CircledNumber/CircledNumber';
import Layout from '../components/Layout';
import { useRouter } from 'next/router'

// import styles from '../styles/ScrollList.module.css';

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
    getHouseholdPerZoneBarSecond
} from '../services/statistics/statistics';

const colorsArray = ['#344093', '#1A8588', '#FED531', '#1a204a', '#0d4344', '#b29522', '#48539e', '#489da0', '#fedd5a'];
export default function Stats() {
    const router = useRouter();
    const [buildingAgeRentalValue, setBuildingAgeRentalValue] = useState([])
    const [buildingAgeContractType, setBuildingAgeContractType] = useState([])
    const [numberBedroomsRentalValue, setNumberOfBedroomsRentalValue] = useState([])
    const [numberOfBathroomsRentalValue, setNumberOfBathroomsRentalValue] = useState([])
    const [buildingStatusRentalValue, setBuildingStatusRentalValue] = useState([])
    const [buildingConditionRentalValue, setBuildingConditionRentalValue] = useState([])
    const [rentalArrangementsContractType, setRentalArrangementsContractType] = useState([])
    const [numberOfBedroomsDistribution, setNumberOfBedroomsDistribution] = useState([])
    const [rentalValueDistribution, setRentalValueDistribution] = useState([])
    const [contractArrangements, setContractArrangements] = useState(null)
    const [furnishedCount, setFurnishedCount] = useState(null);
    const [householdPerZone, setHouseholdPerZone] = useState([]);
    const [householdPerZoneBar, setHouseholdPerZoneBar] = useState([]);
    const [elRefs, setElRefs] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        /** BAR CHARTS PART 1 */
        const buildingAgeAndRentalValue = async () => {
            const res = await getBuildingAgeRentalValue();
            setBuildingAgeRentalValue(res.data);
        }

        const buildingAgeContractType = async () => {
            const res = await getBuildingAgeContractType();
            setBuildingAgeContractType(res.data);
        }

        const numberOfBedroomsRentalValue = async () => {
            const res = await getNumberOfBedroomsRentalValue();
            setNumberOfBedroomsRentalValue(res.data);
        }

        const numberOfBathroomsRentalValue = async () => {
            const res = await getNumberOfBathroomsRentalValue();
            setNumberOfBathroomsRentalValue(res.data);
        }

        const buildingStatusRentalValue = async () => {
            const res = await getBuildingStatusRentalValue();
            setBuildingStatusRentalValue(res.data);
        }

        const buildingConditionRentalValue = async () => {
            const res = await getBuildingConditionRentalValue();
            setBuildingConditionRentalValue(res.data);
        }

        /**  PIE CHARTS */
        const rentalArrangementsContractType = async () => {
            const res = await getRentalArrangementsContractType();
            setRentalArrangementsContractType(res.data);
        }

        const numberOfBedroomsDistribution = async () => {
            const res = await getNumberOfBedroomsDistribution();
            setNumberOfBedroomsDistribution(res.data);
        }

        const rentalValueDistribution = async () => {
            const res = await getRentalValueDistribution();
            setRentalValueDistribution(res.data);
        }

        const householdPerZone = async () => {
            const res = await getHouseholdPerZoneBarSecond();
            setHouseholdPerZone(res.data);
        }

        const householdPerZoneBar = async () => {
            const res = await getHouseholdPerZoneBarSecond();
            setHouseholdPerZoneBar(res.data);
        }

        /** COUNTERS */
        const contractArrangements = async () => {
            const res = await getContractArrangements();
            setContractArrangements(res.data);
        }

        const furnishedCount = async () => {
            const res = await getFurnishedCount();
            setFurnishedCount(res.data);
        }

        /** BAR CHARTS PART 1 */
        buildingAgeAndRentalValue()
        buildingAgeContractType()
        numberOfBedroomsRentalValue()
        numberOfBathroomsRentalValue()
        buildingStatusRentalValue();
        buildingConditionRentalValue();

        /** PIE CHARTS */
        rentalArrangementsContractType()
        numberOfBedroomsDistribution()
        householdPerZoneBar()
        householdPerZone()

        /** SCATTER GRAPH */
        rentalValueDistribution()

        /** COUNTERS */
        contractArrangements()
        furnishedCount()

        setElRefs(elRefs => (
            Array(12).fill().map((_, i) => elRefs[i] || createRef())
        ));
    }, [])

    const handleScroll = (index) => {
        setSelectedIndex(index);
        elRefs[index].current.scrollIntoView({ behavior: 'smooth' })
    }

    const ScrollList = () => {
        return <>
            <div className='stats-container'>
                <div className='stats-header'>
                    <h1>Graphs List</h1>

                    <div style={{ textAlign: 'center', paddingTop: 20 }}>
                        <button className='submitBtn buttonClear' onClick={() => { router.push({pathname: '/'}) }}>Back to map</button>
                    </div>
                </div>

                <ul className='graphList'>
                    <li className={selectedIndex == 0 ? 'active-stat' : ''} onClick={() => handleScroll(0)}>Building Age vs Rental Value</li>
                    <li className={selectedIndex == 1 ? 'active-stat' : ''} onClick={() => handleScroll(1)}>Building Age vs Contract Type</li>
                    <li className={selectedIndex == 2 ? 'active-stat' : ''} onClick={() => handleScroll(2)}>Number of Bedrooms vs Rental Value</li>
                    <li className={selectedIndex == 3 ? 'active-stat' : ''} onClick={() => handleScroll(3)}>Number of Bathrooms vs Rental Value</li>
                    <li className={selectedIndex == 4 ? 'active-stat' : ''} onClick={() => handleScroll(4)}>Building Status vs Rental Value</li>
                    <li className={selectedIndex == 5 ? 'active-stat' : ''} onClick={() => handleScroll(5)}>Building Condition vs Rental Value</li>
                    <li className={selectedIndex == 6 ? 'active-stat' : ''} onClick={() => handleScroll(6)}>Rental Arrangements / Contract Type</li>
                    <li className={selectedIndex == 7 ? 'active-stat' : ''} onClick={() => handleScroll(7)}>Zone / Number of household members</li>
                    <li className={selectedIndex == 8 ? 'active-stat' : ''} onClick={() => handleScroll(8)}>Number of bedrooms / Rent Count</li>
                    <li className={selectedIndex == 9 ? 'active-stat' : ''} onClick={() => handleScroll(9)}>Rental Value Distribution</li>
                    <li className={selectedIndex == 10 ? 'active-stat' : ''} onClick={() => handleScroll(10)}>Old contract count</li>
                    <li className={selectedIndex == 11 ? 'active-stat' : ''} onClick={() => handleScroll(10)}>Furnished apartments count</li>
                </ul>



            </div>

        </>
    }

    // return <Layout rightSideBar={<ScrollList />}>
      return  <div className="pageContainer">
            <div ref={elRefs[0]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Building age vs Rental Value/SQM</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={buildingAgeRentalValue}
                    options={{
                        backgroundColor: 'transparent',
                        colors: colorsArray,
                        chartArea: { width: '50%' },
                        bar: { groupWidth: '50%' },
                        annotations: {
                            alwaysOutside: true,
                            textStyle: {
                                auraColor: '#344093',
                                color: '#FFF',
                                bold: true,
                                fontSize: 16,
                            },
                            stem: {
                                color: 'transparent',
                                // length: 1,
                            }
                        },
                        // title: 'Building Age vs Rental Value',
                        hAxis: { 
                            title: '', 
                            minValue: 0,
                            textStyle: {
                                bold: true
                            }
                         },
                        vAxis: { 
                            title: 'Average Rental Value/SQM',
                            minValue: 0 ,
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
                        legend: 'none',
                    }}
                />
            </div>
            <div ref={elRefs[1]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Building Age vs Contract Type</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={buildingAgeContractType}
                    options={{
                        backgroundColor: 'transparent',
                        colors: colorsArray,
                        chartArea: { width: '70%' },
                        bar: { groupWidth: '80%' },
                        vAxis: { 
                            title: 'Number of Contracts',
                            minValue: 0 ,
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
                        
                        hAxis: { 
                            title: '', 
                            minValue: 0,
                            textStyle: {
                                bold: true
                            }
                         },

                        seriesType: 'bars',
                        series: { 5: { type: 'line' } },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>

            <div ref={elRefs[2]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Number of Bedrooms vs Average Rental Value/SQM</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={numberBedroomsRentalValue}
                    options={{
                        colors: colorsArray,
                        backgroundColor: 'transparent',
                        chartArea: { width: '70%' },
                        bar: { groupWidth: '40%' },
                        series: {
                            0: {targetAxisIndex: 0},
                            1: {targetAxisIndex: 1}
                        },
                        vAxes: {
                          // Adds titles to each axis.
                          0: {title: ''},
                          1: {title: ''}
                        },              
                        hAxis: {
                            title: '', 
                            minValue: 0,
                            textStyle: {
                                bold: true
                            },
                            gridlines: {
                                color: 'transparent'
                            },
                        },
                        vAxis: {
                            title: 'Average Rental Value/SQM',
                            minValue: 0 ,
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
                    }}
                />
            </div>

            <div ref={elRefs[3]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Number of Bathrooms vs Average Rental Value/SQM</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={numberOfBathroomsRentalValue}
                    options={{
                        colors: colorsArray,
                        backgroundColor: 'transparent',
                        chartArea: { width: '70%' },
                        bar: { groupWidth: '40%' },
                        series: {
                            0: {targetAxisIndex: 0},
                            1: {targetAxisIndex: 1}
                        },
                        vAxes: {
                          // Adds titles to each axis.
                          0: {title: ''},
                          1: {title: ''}
                        },                        
                        hAxis: {
                            title: '', 
                            minValue: 0,
                            textStyle: {
                                bold: true
                            },
                            gridlines: {
                                color: 'transparent'
                            },
                        },
                        vAxis: {
                            title: 'Average Rental Value/SQM',
                            minValue: 0 ,
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
                    }}
                />
            </div>

            <div ref={elRefs[4]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Building Status vs Average Rental Value/SQM</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={buildingStatusRentalValue}
                    options={{
                        colors: colorsArray,
                        backgroundColor: 'transparent',
                        bar: { groupWidth: '50%' },
                        chartArea: { width: '20%' },
                        title: '',
                        annotations: {
                            alwaysOutside: true,
                            textStyle: {
                                auraColor: 'transparent',
                                color: '#FFF',
                                fontSize: 16,
                            },
                            stem: {
                                color: 'transparent',
                                // length: 1,
                            }
                        },
                        hAxis: {
                            minValue: 0,
                            textStyle: {
                                bold: true
                            },
                            gridlines: {
                                color: 'transparent'
                            },
                        },
                        vAxis: {
                            title: 'Average Rental Value/SQM',
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
                            baselineColor: 'transparent',
                            minValue: 0,
                        },
                        legend: 'none',
                    }}
                />
            </div>

            <div ref={elRefs[5]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Building Condition vs Average Rental Value/SQM</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={buildingConditionRentalValue}
                    options={{
                        colors: colorsArray,
                        chartArea: { width: '60%' },
                        backgroundColor: 'transparent',
                        bar: { groupWidth: '40%' },
                        title: '',                
                        annotations: {
                            alwaysOutside: true,
                            textStyle: {
                                auraColor: 'transparent',
                                color: '#FFF',
                                fontSize: 16,
                            },
                            stem: {
                                color: 'transparent',
                                // length: 1,
                            }
                        },  
                        hAxis: {
                            title: '', 
                            minValue: 0,
                            textStyle: {
                                bold: true
                            },
                            gridlines: {
                                color: 'transparent'
                            },
                        },
                        vAxis: {
                            title: 'Average Rental Value/SQM',
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
                            baselineColor: 'transparent',
                            minValue: 0,
                        },
                        legend: 'none'
                    }}
                />
            </div>

            <div ref={elRefs[10]} style={{ marginBottom: 80 }} className='chartContainer chartContainer__grid'>
                <div ref={elRefs[6]}  className='chartContainer'>
                    <div className='mainContentTitle chartTitle'><h2 className=''>Rental Arrangements vs Contract Type</h2></div>
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={rentalArrangementsContractType}
                        options={{
                            backgroundColor: 'transparent',
                            pieSliceBorderColor: 'transparent',
                            pieSliceText: 'none',
                            colors: colorsArray,
                            title: '',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>

                <div ref={elRefs[8]}  className='chartContainer'>
                    <div className='mainContentTitle chartTitle'><h2 className=''>Number Of Bedrooms vs Rent counts</h2></div>
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={numberOfBedroomsDistribution}
                        options={{
                            colors: colorsArray,
                            title: '',
                            backgroundColor: 'transparent',
                            pieSliceBorderColor: 'transparent',
                            pieSliceText: 'none'
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>

            <div ref={elRefs[7]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Zone vs Number of household members</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={householdPerZoneBar}
                    options={{
                        backgroundColor: 'transparent',
                        colors: colorsArray,
                        title: '',
                        bar: { groupWidth: '80%' },
                        chartArea: { width: '70%' },
                        annotations: {
                            alwaysOutside: true,
                            textStyle: {
                                auraColor: 'transparent',
                                color: '#fff',
                                bold: true,
                                fontSize: 16,
                            },
                            stem: {
                                color: 'transparent',
                                // length: 1,
                            }
                        },
                        hAxis: {
                            minValue: 0,
                            // direction: -1,
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
                                // color: 'transparent'
                            },
                            gridlines: {
                                color: 'transparent'
                            },
                            baselineColor: 'transparent',
                            minValue: 0,
                        },
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>

            <div ref={elRefs[9]} style={{ marginBottom: 80 }} className='chartContainer'>
                <div className='mainContentTitle chartTitle'><h2 className=''>Rental Value Distribution</h2></div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={rentalValueDistribution}
                    options={{
                        backgroundColor: 'transparent',
                        colors: colorsArray,
                        title: '',
                        hAxis: { title: 'Person Count', titleTextStyle: { italic: false, bold: true } },
                        vAxis: { title: 'Rental Value', titleTextStyle: { bold: true, italic: false } },
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
            
            <div ref={elRefs[10]} style={{ marginBottom: 80 }} className='chartContainer chartContainer__grid'>
                <div>
                    <CircledNumber
                        text={''}
                        value={contractArrangements?.toString() + '+'}
                    />
                    <div className='mainContentTitle chartTitle'><h2 className=''>Live under old rent contracts</h2></div>
                </div>

                <div>
                    <CircledNumber
                        text={''}
                        value={furnishedCount?.toString() + '+'}
                    />
                    <div className='mainContentTitle chartTitle'><h2 className=''>Live in furnished apartments</h2></div>
                </div>
            </div>
        </div>
    // </Layout>
}