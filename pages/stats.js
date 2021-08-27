import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { getBuildingAgeRentalValue, getBuildingAgeContractType, getNumberOfBedroomsRentalValue, getNumberOfBathroomsRentalValue } from '../services/statistics/statistics';

export default function Stats() {
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])



    useEffect(() => {
        const buildingAgeAndRentalValue = async () => {
            const res = await getBuildingAgeRentalValue();
            setData1(res.data);
        }

        const buildingAgeContractType = async () => {
            const res = await getBuildingAgeContractType();
            setData2(res.data);
        }

        const numberOfBedroomsRentalValue = async () => {
            const res = await getNumberOfBedroomsRentalValue();
            setData3(res.data);
        }

        const numberOfBathroomsRentalValue = async () => {
            const res = await getNumberOfBathroomsRentalValue();
            setData4(res.data);
        }
        buildingAgeAndRentalValue()
        buildingAgeContractType()
        numberOfBedroomsRentalValue()
        numberOfBathroomsRentalValue()

    }, [])

    return <div>
        <div style={{ margin: 80 }}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={data1}
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
                data={data2}
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
                data={data3}
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
                data={data4}
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
    </div>
}