    import Layout from '../components/Layout';

import Link from 'next/link'
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';
import { getZones } from '../services/questions/questions'
import { getFilters, getTable } from '../services/statistics/statistics'
import { CSVLink, CSVDownload } from "react-csv";
import DataTable from 'react-data-table-component';
import { useContext, useEffect, useState } from 'react';
import Filters from '../components/Filters';
import { SidebarContext } from '../context/SidebarContext';
import { setConstantValue } from 'typescript';

// import styles from '../components/ZonesLayout.module.css';


export async function getServerSideProps() {
    const filtersRes = await getFilters();
    const allFilters = filtersRes?.data;


    return {
        props: {
            // zones,
            allFilters
        }
    }
}

export default function Zones({ allFilters }) {
    const router = useRouter();
    const [zones, setZones] = useState([]);
    const { zone_id, selectedMapFilters } = router.query
    const sidebarContext = useContext(SidebarContext);
    const [csvData, setCsvData] = useState([]);
    const [columnHeaders, setColumnHeaders] = useState([]);
    const popupContext = useContext(PopupsContext)
    const [showFilters, setShowFilters] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([])
    const [columns, setColumns] = useState([]);
    const [cleanColumns, setCleanColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const [filters, setFilters] = useState(allFilters)


    useEffect(() => {
        const getAllZones = async () => {
            const zoneRes = await getZones();
            const zones = zoneRes?.data;
            setZones(zones);
        }

        getAllZones();
    }, []);
    useEffect(() => {
        const fetchTableData = async (selectedFilters) => {
            let params = [];

            if (selectedMapFilters && !selectedFilters.length) {
                selectedFilters = JSON.parse(selectedMapFilters)
            }

            const res = await getTable(selectedFilters, zone_id || null);
            let columnHeadersRes = res?.data?.questions?.map(question => question?.question)
            // ADD PID to the headers of the excel as it is not returned by backend
            if (res?.data?.is_admin) {
                columnHeadersRes.unshift('PID');
            }

            let cols = [{ name: 'Survey', selector: row => row.answers[0], sortable: true},{ name: 'Zone', selector: row => row.answers[1], sortable: true}, {name: 'Date', selector: row => row.answers[2], sortable: true, hide: 'md'}];
            let cleanCol = ['Survey', 'Zone', 'Date'];
            columnHeadersRes.map((question, idx) => {
                cols.push({
                    name: question,
                    selector: row => row.answers[idx + 3],
                    sortable: true,
                    wrap: true,
                    hide: 'md'
                })
                cleanCol.push(question);
            });

            let rows = [];
            res.data.submissions.map((submission, idx) => {
                rows.push({
                    answers: [idx+1, ...submission]
                });
            });

            setRows(rows);
            setCleanColumns(cleanCol);
            setColumns(cols);
            setColumnHeaders(columnHeadersRes);
            setCsvData([columnHeadersRes, ...res?.data?.submissions])
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
                    filtersCopy[key]['selected_option'] = currentSelectedFilter[0].answer
                }
            })
            setFilters(filtersCopy)
        }


        fetchTableData(selectedFilters)
        updateFilters();
        sidebarContext.sidebarHide();
    }, [selectedFilters, selectedMapFilters])



    const ExpandedComponent = ({ data }) => {
        return (
            <div className='expandedDatatable'>
                {data.answers.map((row, idx) => (<div key={idx}><h2>{cleanColumns[idx]}</h2><h3>{row}</h3></div>))}
            </div>
        )
    }

    const Zone = ({ zone }) => {
        const [expanded, setExpanded] = useState(false);


        return (
            <div className={`zoneContainer separated`} onClick={() => setExpanded(!expanded)}>
                {/* <img src={'http://aub-backend.tedmob.com' + zone?.image} /> */}
                <div dangerouslySetInnerHTML={{ __html: zone?.image }} className="svgContainer"></div>
                <h3>{zone?.name}</h3>

                <div className='zoneMetaContainer'>
                    <div className='zoneMeta'>
                        <p className="boldLabel">Average rent amount</p>
                        <p className="regularText">{zone?.price_usd ?? 0}$</p>
                        <p className="regularText">{zone?.price_lbp ?? 0}LBP</p>
                    </div>

                    <div className='zoneMeta'>
                        <p className="boldLabel">Average apartment size</p>
                        <p className="regularText">{zone?.area ?? 0}sqm</p>
                    </div>
                </div>

                {zone?.questions?.length > 0 &&
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
                        <div className='squareBox greenBg'></div>
                        <p className='greenText'>Y</p>
                    </div>
                    <div className='option'>
                        <div className='squareBox blueBg'></div>
                        <p className='blueText'>N</p>
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
                    <p className={`dataNumbers greenText`}>{question?.answers?.Yes}%</p>

                    <div className={'barContainer'}>
                        <div className={`bar greenBg marginRight`} style={{ width: `${question?.answers?.Yes}%` }}></div>
                        <div className={`bar blueBg `} style={{ width: `${question?.answers?.No}%` }}></div>
                    </div>

                    <p className={`dataNumbers blueText`}>{question?.answers?.No}%</p>
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

                            {tableData?.is_admin && <CSVLink
                                onClick={(event, done) => {
                                    console.log('on onclick', csvData)
                                    setTimeout(done, 2000)
                                }}
                                className='downloadCSVBtn'
                                data={csvData}
                                asyncOnClick={true}
                                filename={"surveys-export.csv"}
                                target="_blank"
                            >
                                Download CSV
                            </CSVLink>}

                        </div>

                        <div className='datatable'>
                            <DataTable
                                columns={columns}
                                data={rows}
                                expandableRows expandableRowsComponent={ExpandedComponent}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
