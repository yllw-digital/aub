import { useState, useEffect, createRef } from "react";
import { Chart } from "react-google-charts";
import CircledNumber from '../components/charts/CircledNumber/CircledNumber';
// import Layout from '../components/Layout';
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
    getHouseholdPerZone
} from '../services/statistics/statistics';

const colorsArray = ['rgb(52, 64, 147)', 'rgb(26, 133, 136)', 'rgb(254, 213, 49)']
export default function Stats() {
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
    const [elRefs, setElRefs ] = useState([])
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
            const res = await getHouseholdPerZone();
            setHouseholdPerZone(res.data);
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
        elRefs[index].current.scrollIntoView()
    }

    const ScrollList = () => {
        return <>
            <div className='container'>
                <div className='header'>
                    <h1>Graphs List</h1>
                </div>

                <ul className='graphList'>
                    <li className={selectedIndex == 0 ?'active' : ''} onClick={() => handleScroll(0)}>Building Age vs Rental Value</li>
                    <li className={selectedIndex == 1 ?'active' : ''} onClick={() => handleScroll(1)}>Building Age vs Contract Type</li>
                    <li className={selectedIndex == 2 ?'active' : ''} onClick={() => handleScroll(2)}>Number of Bedrooms vs Rental Value</li>
                    <li className={selectedIndex == 3 ?'active' : ''} onClick={() => handleScroll(3)}>Number of Bathrooms vs Rental Value</li>
                    <li className={selectedIndex == 4 ?'active' : ''} onClick={() => handleScroll(4)}>Building Status vs Rental Value</li>
                    <li className={selectedIndex == 5 ?'active' : ''} onClick={() => handleScroll(5)}>Building Condition vs Rental Value</li>
                    <li className={selectedIndex == 6 ?'active' : ''} onClick={() => handleScroll(6)}>Rental Arrangements / Contract Type</li>
                    <li className={selectedIndex == 7 ?'active' : ''} onClick={() => handleScroll(7)}>Zone / Number of household members</li>
                    <li className={selectedIndex == 8 ?'active' : ''} onClick={() => handleScroll(8)}>Number of bedrooms / Rent Count</li>
                    <li className={selectedIndex == 9 ?'active' : ''} onClick={() => handleScroll(9)}>Rental Value Distribution</li>
                    <li className={selectedIndex == 10 ?'active' : ''} onClick={() => handleScroll(10)}>Old contract count</li>
                    <li className={selectedIndex == 11 ?'active' : ''} onClick={() => handleScroll(11)}>Furnished apartments count</li>
                </ul>
            </div>

        </>
    }

    return <Layout rightSideBar={<ScrollList />}>
        <div ref={elRefs[0]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={buildingAgeRentalValue}
                options={{
                    colors: colorsArray,
                    title: 'Building Age vs Rental Value',
                    hAxis: { title: 'Building Age', minValue: 0 },
                    vAxis: { title: 'Rental Value', minValue: 0 },
                    legend: 'none',
                }}
            />
        </div>
        <div ref={elRefs[1]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={buildingAgeContractType}
                options={{
                    colors: colorsArray,
                    title: 'Building Age vs Contract Type',
                    vAxis: { title: 'Number of Contracts' },
                    hAxis: { title: 'Age of Building' },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div ref={elRefs[2]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={numberBedroomsRentalValue}
                options={{
                    colors: colorsArray,
                    bar: { groupWidth: '15%' },
                    title: 'Number of Bedrooms vs Rental Value',
                    hAxis: {
                        title: 'Number of Bedrooms',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Rental Value',
                        minValue: 0,
                    },
                }}
            />
        </div>

        <div ref={elRefs[3]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={numberOfBathroomsRentalValue}
                options={{
                    colors: colorsArray,
                    bar: { groupWidth: '15%' },
                    title: 'Number of Bathrooms vs Rental Value',
                    hAxis: {
                        title: 'Number of Bathrooms',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Rental Value',
                        minValue: 0,
                    },
                }}
            />
        </div>

        <div ref={elRefs[4]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={buildingStatusRentalValue}
                options={{
                    colors: colorsArray,
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
                }}
            />
        </div>

        <div ref={elRefs[5]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={buildingConditionRentalValue}
                options={{
                    colors: colorsArray,
                    bar: { groupWidth: '15%' },
                    title: 'Building Condition vs Rental Value',
                    hAxis: {
                        title: 'Building Condition',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Rental Value',
                        minValue: 0,
                    },
                }}
            />
        </div>

        <div ref={elRefs[6]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={rentalArrangementsContractType}
                options={{
                    colors: colorsArray,
                    title: 'Rental Arrangements / Contract Type',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div ref={elRefs[7]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={householdPerZone}
                options={{
                    colors: colorsArray,
                    title: 'Zone / Number of household members',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div ref={elRefs[8]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={numberOfBedroomsDistribution}
                options={{
                    colors: colorsArray,
                    title: 'Number Of Bedrooms / Rent counts',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div ref={elRefs[9]} style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ScatterChart"
                loader={<div>Loading Chart</div>}
                data={rentalValueDistribution}
                options={{
                    colors: colorsArray,
                    title: 'Rental Value Distribution',
                    hAxis: { title: 'Rental Value' },
                    vAxis: { title: 'Person Count' },
                    legend: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div ref={elRefs[10]} style={{ margin: 80 }}>
            <CircledNumber
                text={'Live under old rent contracts'}
                value={contractArrangements?.toString() + '+'}
            />
        </div>

        <div ref={elRefs[11]} style={{ margin: 80 }}>
            <CircledNumber
                text={'Live in furnished apartments'}
                value={furnishedCount?.toString() + '+'}
            />
        </div>
    </Layout>
}