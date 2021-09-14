import styles from '../../../styles/PieChart.module.css'

export default function PieChart() {
    const Pie = () => {
        const proportion = {
            background: `radial-gradient(circle closest-side,transparent 100%, white 0),conic-gradient(#038487 0,#038487 80%,#344093 0,#344093 100%)`
        };
        return <div className='pieOuter' style={proportion}></div>
    }

    return (
        <div className='pieChartContainer separated'>
            <div className='pieChartGrid'>
                <div className='results' style={{ color: '#344093' }}>
                    <p>PEOPLE</p>
                    <p className='emphasis'>342</p>
                    <p>NO</p>
                </div>

                <Pie />

                <div className='results' style={{ color: '#1A8487' }}>
                    <p>PEOPLE</p>
                    <p className='emphasis'>2,342</p>
                    <p>YES</p>
                </div>
            </div>
            <div className='info'>
                <p className='info' >Are responsible to pay their own bill and utilities</p>
            </div>
        </div>
    )
}

