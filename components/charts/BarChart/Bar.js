
import styles from '../../../styles/BarChart.module.css';

export default function Bar(props) {
    const { percentage, count, color } = props;
    return (
        <div style={{ textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent:'flex-end' }}>
            <div className={`${styles.bar}`} style={{ height: `${percentage}%`, backgroundColor: color }}>
                <p className={styles.count}>{count}</p>
            </div>
            <p className={styles.legendBottom}>Size 1</p>
        </div>
    )
}