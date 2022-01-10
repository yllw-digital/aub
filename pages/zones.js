import Layout from '../components/Layout';

import Link from 'next/link'
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';
import { getZones } from '../services/questions/questions'
import { getFilters, getTable } from '../services/statistics/statistics'
import { CSVLink, CSVDownload } from "react-csv";
import { useContext, useEffect, useState } from 'react';
import Filters from '../components/Filters';

// import styles from '../components/ZonesLayout.module.css';


export async function getServerSideProps() {

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
    const { zone_id, selectedMapFilters } = router.query
    const [csvData, setCsvData] = useState([]);

    const popupContext = useContext(PopupsContext)
    const [showFilters, setShowFilters] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([])

    const [filters, setFilters] = useState(allFilters)

    useEffect(() => {
        const fetchTableData = async (selectedFilters) => {
            let params = [];

            if (selectedMapFilters && !selectedFilters.length) {
                selectedFilters = JSON.parse(selectedMapFilters)
            }

            const res = await getTable(selectedFilters, zone_id || null);
            let columnHeaders = res?.data?.questions?.map(question => question?.question)
            // ADD PID to the headers of the excel as it is not returned by backend
            columnHeaders.unshift('PID');
            setCsvData([columnHeaders, ...res?.data?.submissions])
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
    }, [selectedFilters, selectedMapFilters])




    const Zone = ({ zone }) => {
        const [expanded, setExpanded] = useState(false);


        return (
            <div className={`zoneContainer separated`} onClick={() => setExpanded(!expanded)}>
                {/* <img src={'http://aub-backend.tedmob.com' + zone?.image} /> */}
                <div dangerouslySetInnerHTML={{ __html: zone?.image }} className="svgContainer"></div>
                <h3>{zone?.name}</h3>

                <div className='zoneMetaContainer'>
                    <div className='zoneMeta'>
                        <p className="boldLabel">Rent amount</p>
                        <p className="regularText">{zone?.price}$</p>
                    </div>

                    <div className='zoneMeta'>
                        <p className="boldLabel">Apartment size</p>
                        <p className="regularText">{zone?.area}</p>
                    </div>
                </div>

                {zone?.questions?.length &&
                    expanded && <div className='zoneExpandableContainer'>
                        {zone?.questions?.map((section, index) => (<DataSection section={section} key={index.toString()} />))}
                    </div>
                }
            </div >
        )
    }

    const DataSection = ({ section }) => {

        return <div className='expandableSection'>
            <div className='headerSection'>
                <h2>{section?.section}</h2>
                <div className='optionsContainer'>
                    <div className='option'>
                        <div className='squareBox blueBg'></div>
                        <p className='blueText'>N</p>
                    </div>
                    <div className='option'>
                        <div className='squareBox greenBg'></div>
                        <p className='greenText'>Y</p>
                    </div>
                </div>
            </div>
            <div className='expandableData'>
                {section?.questions?.map((question, index) => <DataItem question={question} key={index.toString()} />)}
            </div>
        </div>
    }
    const DataItem = ({ question }) => {
        return (
            <div className={'dataItem'}>
                <p>{question?.question}</p>

                <div className={'dataBarContainer'}>
                    <p className={`dataNumbers blueText`}>{question?.answers?.No}%</p>

                    <div className={'barContainer'}>
                        <div className={`bar blueBg marginRight`} style={{ width: `${question?.answers?.No}%` }}></div>
                        <div className={`bar greenBg`} style={{ width: `${question?.answers?.Yes}%` }}></div>
                    </div>

                    <p className={`dataNumbers greenText`}>{question?.answers?.Yes}%</p>
                </div>
            </div>
        )
    }

    const onSubmit = (data) => {
        setShowFilters(false);
        setSelectedFilters(data);
    }

    const onReset = () => {
        setSelectedFilters([]);
    }
    return (
        <>
            {showFilters && <Filters
                closeFilters={() => setShowFilters(false)}

                filters={filters}
                handleFormReset={onReset}
                handleFormSubmit={onSubmit} />}
            <Layout>
                <div className={'zonesLayoutContainer'}>

                    <div className={'leftSidebar'}>

                        {/* /** top container start */}
                        <div className={'topContainer'}>
                            <div className={'titleBox'}>
                                <p><span>{tableData?.submissions?.length}</span> SURVEYS</p>
                            </div>

                            <Link href="">
                                <div className={'submit'} onClick={() => {
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


                    <div className={'tableContainer'}>
                        <div className={'filterButtonContainer'}>
                            <button
                                type="button"
                                className={'submitBtn buttonClear'}
                                style={{ marginLeft: '2rem' }}
                                onClick={() => setShowFilters(true)}
                            >FILTERS</button>

                            <CSVLink
                                onClick={(event, done) => {
                                    console.log('on onclick', csvData)
                                    setTimeout(done, 2000)
                                }}
                                className='downloadCSVBtn'
                                data={csvData}
                                asyncOnClick={true}
                                filename={"my-file.csv"}
                                target="_blank"
                            >
                                Download CSV
                            </CSVLink>

                        </div>
                        <table className={'table'}>
                            <thead>
                                <tr>
                                    <th width={200}>SURVEY</th>
                                    <th width={200} >PID</th>
                                    {tableData?.questions?.map((question, idx) => <th width={200} key={idx.toString()}>{question.question}</th>)}
                                </tr>
                            </thead>

                            <tbody>
                                {tableData?.submissions?.map((submission, idx) => {
                                    return <tr key={idx.toString()}>
                                        <td width={200}>{idx}</td>
                                        {submission.map((answer, inx) => <td width={200} key={inx.toString()}>{answer}</td>)}
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
