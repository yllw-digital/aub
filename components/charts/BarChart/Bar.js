
// import styles from '../../../styles/BarChart.module.css';

export default function Bar(props) {
    const { percentage, count, color } = props;
    return (
        <div style={{ textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent:'flex-end' }}>
            <div className='bar' style={{ height: `${percentage}%`, backgroundColor: color }}>
                <p className='count'>{count}</p>
            </div>
            <p className='legendBottom'>Size 1</p>
        </div>
    )
}