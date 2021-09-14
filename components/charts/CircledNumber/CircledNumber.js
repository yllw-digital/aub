// import styles from '../../../styles/PieChart.module.css'

export default function CircledNumber({value, text}) {

    const Circle = () => {
        return <div className='circledNumber'>
            <p className='emphasis'>{value}</p>
            <p>PEOPLE</p>
        </div>
    }

    return (
        <div className='pieChartContainer separated'>
            <div className='circledNumberContainer'>
                <Circle />
            </div>
            <div className='circle-info'>
                <p >{text}</p>
            </div>
        </div>
    )
}

