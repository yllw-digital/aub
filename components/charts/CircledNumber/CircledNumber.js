import styles from '../../../styles/PieChart.module.css'

export default function CircledNumber({value, text}) {

    const Circle = () => {
        return <div className={`${styles.circledNumber}`}>
            <p className={styles.emphasis}>{value}</p>
            <p>PEOPLE</p>
        </div>
    }

    return (
        <div className={`${styles.pieChartContainer} separated`}>
            <div className={styles.circledNumberContainer}>
                <Circle />
            </div>
            <div className={styles.info}>
                <p className={styles.info} >{text}</p>
            </div>
        </div>
    )
}

