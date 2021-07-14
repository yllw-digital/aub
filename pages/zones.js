import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';

import { useContext} from 'react';

export default function Zones() {
    const router = useRouter();
    const popupContext = useContext(PopupsContext)

    const Zone = () => {    
        return (
            <div className={`${styles.zoneContainer} separated`}>
                <img src="/zone.png" />
                <h3>Zone Name</h3>

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
                            <p><span>20</span> SURVEY</p>
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
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />
                    <Zone />


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
