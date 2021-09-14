import styles from '../../../styles/BarChart.module.css';

export default function HorizontalChart(props) {
    const { title } = props;

    const HorizontalBar = (props) => {
        const { width } = props;

        return (
            <div className='horizontalBarContainer'>
                <div className='horizontalBar' style={{width: `${width}%`}}></div>
                <p className='horizontalBarLegend'>Zone</p>
            </div>
        );
    }

    return (
        <div className='barChart separated'>
            <div className='mainContentTitle'>
                <h2>{title}</h2>
            </div>
            <div className='horizontalBarsContainer'>
                <p className='legendHorizontal'>Amount Payed</p>
                <HorizontalBar width={100}/>
                <HorizontalBar width={100}/>
                <HorizontalBar width={80}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={70}/>
                <HorizontalBar width={50}/>
                <HorizontalBar width={40}/>
                <HorizontalBar width={40}/>
                <HorizontalBar width={40}/>
                <HorizontalBar width={40}/>
                <HorizontalBar width={40}/>
                <HorizontalBar width={40}/>
                <HorizontalBar width={30}/>
                <HorizontalBar width={30}/>
                <HorizontalBar width={30}/>
                <HorizontalBar width={30}/>
                <HorizontalBar width={20}/>
                <HorizontalBar width={15}/>
                <HorizontalBar width={10}/>
            </div>
        </div>
    )

}