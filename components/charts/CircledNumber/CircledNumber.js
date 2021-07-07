import styles from '../../../styles/PieChart.module.css'

export default function CircledNumber() {

    const Circle = () => {
        return <div className={`${styles.circledNumber}`}>
            <p className={styles.emphasis}>2,342</p>
            <p>PEOPLE</p>
        </div>
    }

    return (
        <div className={`${styles.pieChartContainer} separated`}>
            <div className={styles.circledNumberContainer}>
                <Circle />
            </div>
            <div className={styles.info}>
                <p className={styles.info} >Are responsible to pay their own bill and utilities</p>
            </div>
        </div>
    )
}

