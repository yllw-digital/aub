import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import {
    getBuildingAgeRentalValue,
    getBuildingAgeContractType,
    getNumberOfBedroomsRentalValue,
    getNumberOfBathroomsRentalValue,
    getBuildingStatusRentalValue,
    getBuildingConditionRentalValue,
    getRentalArrangementsContractType,
    getNumberOfBedroomsDistribution
} from '../services/statistics/statistics';

export default function Stats() {
    const [buildingAgeRentalValue, setBuildingAgeRentalValue] = useState([])
    const [buildingAgeContractType, setBuildingAgeContractType] = useState([])
    const [numberBedroomsRentalValue, setNumberOfBedroomsRentalValue] = useState([])
    const [numberOfBathroomsRentalValue, setNumberOfBathroomsRentalValue] = useState([])
    const [buildingStatusRentalValue, setBuildingStatusRentalValue] = useState([])
    const [buildingConditionRentalValue, setBuildingConditionRentalValue] = useState([])
    const [rentalArrangementsContractType, setRentalArrangementsContractType] = useState([])
    const [numberOfBedroomsDistribution, setNumberOfBedroomsDistribution] = useState([])


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
    }, [])

    return <div>
        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={buildingAgeRentalValue}
                options={{
                    title: 'Building Age vs Rental Value',
                    hAxis: { title: 'Building Age', minValue: 0 },
                    vAxis: { title: 'Rental Value', minValue: 0 },
                    legend: 'none',
                }}
            />
        </div>
        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={buildingAgeContractType}
                options={{
                    title: 'Building Age vs Contract Type',
                    vAxis: { title: 'Number of Contracts' },
                    hAxis: { title: 'Age of Building' },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={numberBedroomsRentalValue}
                options={{
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

        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={numberOfBathroomsRentalValue}
                options={{
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

        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={buildingStatusRentalValue}
                options={{
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

        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={buildingConditionRentalValue}
                options={{
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

        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={rentalArrangementsContractType}
                options={{
                    title: 'Rental Arrangements / Contract Type',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>

        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={numberOfBedroomsDistribution}
                options={{
                    title: 'Number Of Bedrooms / Rent counts',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    </div>
}