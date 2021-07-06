import Bar from './Bar';
import styles from '../../../styles/BarChart.module.css';

export default function BarChart() {
   return (
      <div className={styles.barChart}>

         <div className={styles.barsContainer}>
         <p className={styles.legendLeft}>Number of Apartments</p>

            <Bar count={10} percentage={10} color={'#344093'}/>
            <Bar count={40} percentage={40} color={'#1A8588'}/>
            <Bar count={50} percentage={50} color={'#FED531'}/>
            <Bar count={120} percentage={100} color={'#344093'}/>
         </div>


      </div>
   )
}