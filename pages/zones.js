import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';
import { getZones } from '../services/questions/questions'

import { useContext, useEffect, useState } from 'react';

export async function getStaticProps() {
    const res = await getZones();
    const zones = res.data;

    return {
        props: {
            zones
        }
    }
}

export default function Zones({ zones }) {
    const router = useRouter();
    const popupContext = useContext(PopupsContext)

    const Zone = ({ zone }) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <div className={`${styles.zoneContainer} separated`} onClick={() => setExpanded(!expanded)}>
                <img src="/zone.png" />
                <h3>{zone?.name}</h3>

                <div className={styles.zoneMetaContainer}>
                    <div className={styles.zoneMeta}>
                        <p>RENT AMOUNT</p>
                        <p>1,500 - 2,000$</p>
                    </div>

                    <div className={styles.zoneMeta}>
                        <p>APARTMENT SIZE</p>
                        <p>250 - 350 SQM</p>
                    </div>
                </div>

           {expanded && <div className={styles.zoneExpandableContainer}>
                    
                    <div className={styles.expandableSection}>
                        <div className={styles.headerSection}>
                            <h2>AMENITIES</h2>
                            <div className={styles.optionsContainer}>
                                <div className={styles.option}>
                                    <div className={`${styles.squareBox} ${styles.blueBg}`}></div>
                                    <p className={styles.blueText}>N</p>
                                </div>
                                <div className={styles.option}>
                                    <div className={`${styles.squareBox} ${styles.greenBg}`}></div>
                                    <p className={styles.greenText}>Y</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.expandableData}>
                            <DataItem />
                            <DataItem />
                            <DataItem />
                            <DataItem />
                        </div>
                    </div>

                    <div className={styles.expandableSection}>
                        <div className={styles.headerSection}>
                            <h2>QUALITY</h2>
                            <div className={styles.optionsContainer}>
                                <div className={styles.option}>
                                    <div className={`${styles.squareBox} ${styles.blueBg}`}></div>
                                    <p className={styles.blueText}>N</p>
                                </div>
                                <div className={styles.option}>
                                    <div className={`${styles.squareBox} ${styles.greenBg}`}></div>
                                    <p className={styles.greenText}>Y</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.expandableData}>
                            <DataItem />
                            <DataItem />
                            <DataItem />
                            <DataItem />
                        </div>
                    </div>

                </div>}
            </div>
        )
    }

    const DataItem = () => {
        return (
            <div className={styles.dataItem}>
                <p >Private Security</p>

                <div className={styles.dataBarContainer}>
                    <p className={`${styles.dataNumbers} ${styles.blueText}`}>73%</p>

                    <div className={styles.barContainer}>
                        <div className={`${styles.bar} ${styles.blueBg} ${styles.marginRight}`} style={{ width: '50%' }}></div>
                        <div className={`${styles.bar} ${styles.greenBg}`} style={{ width: '50%' }}></div>
                    </div>

                    <p className={`${styles.dataNumbers} ${styles.greenText}`}>27%</p>
                </div>
            </div>
        )
    }
    return (
        <Layout>
            <div className={styles.zonesLayoutContainer}>
                <div className={styles.leftSidebar}>

                    {/* /** top container start */}
                    <div className={styles.topContainer}>
                        <div className={styles.titleBox}>
                            <p><span>20</span> SURVEYS</p>
                        </div>

                        <Link href="">
                            <div className={styles.submit} onClick={() => {
                                popupContext.showPopup('submitSurvey')
                            }}>
                                <img src="/editpen.png" />
                                SUBMIT A SURVEY
                            </div>
                        </Link>
                    </div>
                    {/* /** top container end */}

                    {/* Zones list */}
                    {zones?.map((zone, idx) => <Zone zone={zone} key={idx.toString()} />)}

                    {/* <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone /> */}


                </div>


                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>SURVEY</td>
                                <td>PRICE</td>
                                <td>NEIGHBORHOOD</td>
                                <td>AMENITIES</td>
                                <td>QUALITY</td>
                                <td>CONTRACT TYPR</td>
                                <td>UTILITIES</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr> <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <span>950$</span>
                                </td>
                                <td>
                                    info needed
                                </td>
                                <td>
                                    <p><span>YES</span> Private Security</p>
                                    <p><span>YES</span> Concierge</p>
                                    <p><span>YES</span> Functional elevator</p>
                                </td>

                                <td>
                                    <p><span>YES</span> New kitchen</p>
                                    <p><span>YES</span> New bedroom</p>
                                    <p><span>YES</span> Lorem ipsum</p>
                                </td>

                                <td>
                                    info needed
                                </td>

                                <td>
                                    info needed
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>

    )
}
