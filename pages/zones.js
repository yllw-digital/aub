import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as contactStyles from '../styles/Contact.module.css';

import Link from 'next/link'
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';
import { getZones } from '../services/questions/questions'
import { getFilters, getTable } from '../services/statistics/statistics'

import { useContext, useEffect, useState } from 'react';
import Filters from '../components/Filters';

export async function getStaticProps() {

    const zoneRes = await getZones();
    const zones = zoneRes?.data;

    const filtersRes = await getFilters();
    const allFilters = filtersRes?.data;

    return {
        props: {
            zones,
            allFilters
        }
    }
}

export default function Zones({ zones, allFilters }) {
    const router = useRouter();
    const popupContext = useContext(PopupsContext)
    const [showFilters, setShowFilters] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([])

    const [filters, setFilters] = useState(allFilters)

    useEffect(() => {
        const fetchTableData = async (selectedFilters) => {
            const res = await getTable(selectedFilters);
            setTableData(res?.data);
        }

        const updateFilters = () => {
            const keys = Object.keys(filters);
            const filtersCopy = { ...filters }
            const filterIds = [];

            //get all the ids of the question so we can check if the filter is amongst the selected filters
            if (selectedFilters.length) {
                selectedFilters.map(filter => filterIds.push(parseInt(filter.question_id)))
            }

            keys.map((key) => {
                if (filterIds.includes(filtersCopy[key].question_id)) {
                    let currentSelectedFilter = selectedFilters.filter(filter => {
                        return filter.question_id == filtersCopy[key].question_id
                    })
                    console.log(currentSelectedFilter)
                    filtersCopy[key]['selected_option'] = currentSelectedFilter[0].answer
                }
            })
            setFilters(filtersCopy)
        }
        fetchTableData(selectedFilters)
        updateFilters();
    }, [selectedFilters])

    const Zone = ({ zone }) => {
        const [expanded, setExpanded] = useState(false);


        return (
            <div className={`${styles.zoneContainer} separated`} onClick={() => setExpanded(!expanded)}>
                <img src="/zone.png" />
                <h3>{zone?.name}</h3>

                <div className={styles.zoneMetaContainer}>
                    <div className={styles.zoneMeta}>
                        <p>RENT AMOUNT</p>
                        <p>{zone?.price}$</p>
                    </div>

                    <div className={styles.zoneMeta}>
                        <p>APARTMENT SIZE</p>
                        <p>{zone?.area}</p>
                    </div>
                </div>

                {expanded && <div className={styles.zoneExpandableContainer}>
                    {zone?.questions?.map((section, index) => (<DataSection section={section} key={index.toString()}/>) )}

                    {/* <div className={styles.expandableSection}>
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
                    </div> */}
                </div>}
            </div>
        )
    }

    const DataSection = ({section}) => {

        return <div className={styles.expandableSection}>
            <div className={styles.headerSection}>
                <h2>{section?.section}</h2>
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
                {section?.questions?.map((question, index) => <DataItem question={question} key={index.toString()}/> )}
            </div>
        </div>
    }
    const DataItem = ({question}) => {
        return (
            <div className={styles.dataItem}>
                <p>{question?.question}</p>

                <div className={styles.dataBarContainer}>
                    <p className={`${styles.dataNumbers} ${styles.blueText}`}>{question?.answers?.No}%</p>

                    <div className={styles.barContainer}>
                        <div className={`${styles.bar} ${styles.blueBg} ${styles.marginRight}`} style={{ width: `${question?.answers?.No}%` }}></div>
                        <div className={`${styles.bar} ${styles.greenBg}`} style={{ width:  `${question?.answers?.Yes}%` }}></div>
                    </div>

                    <p className={`${styles.dataNumbers} ${styles.greenText}`}>{question?.answers?.Yes}%</p>
                </div>
            </div>
        )
    }

    const onSubmit = (data) => {
        setShowFilters(false);
        setSelectedFilters(data);
    }
    return (
        <>
            {showFilters && <Filters
                closeFilters={() => setShowFilters(false)}
                filters={filters}
                handleFormSubmit={onSubmit} />}
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
                    </div>


                    <div className={styles.tableContainer}>
                        <div className={styles.filterButtonContainer}>
                            <button
                                type="button"
                                className={`${contactStyles.submitBtn} ${contactStyles.buttonClear}`}
                                style={{ marginLeft: '2rem' }}
                                onClick={() => setShowFilters(true)}
                            >FILTERS</button>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <td>SURVEY</td>
                                    {tableData?.questions?.map((question, idx) => <td key={idx.toString()}>{question.question}</td>)}
                                </tr>
                            </thead>

                            <tbody>
                                {tableData?.submissions?.map((submission, idx) => {
                                    return <tr key={idx.toString()}>
                                        <td>{idx}</td>
                                        {submission.map((answer, inx) => <td key={inx.toString()}>{answer}</td>)}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
