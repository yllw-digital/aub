const apiKey = "AAPKae8d783029d040a390cffcf9591223c6VCnHLKIIbqzFOXIn2WnBVoEiJ4c_YQWGlnUR1K8HBADqSDTG7syvPZS63UilUcz4";
import { loadModules } from 'esri-loader';
import { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import { getFilters, getTable } from '../services/statistics/statistics'

export default function Map() {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([])
    const [tableData, setTableData] = useState([]);
    const [filters, setFilters] = useState([])

    useEffect(() => {
        const fetchFilters = async () => {
            const filtersRes = await getFilters();
            setFilters(filtersRes?.data);
        }

        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchTableData = async (selectedFilters) => {
            const res = await getTable(selectedFilters);
            setTableData(res?.data);

            tableData
        }

        const updateFilters = () => {
            const keys = Object.keys(filters);
            const filtersCopy = { ...filters }
            const filterIds = [];
            
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
    }, [selectedFilters]);

    useEffect(() => {
        loadModules([
            "esri/config",
            "esri/WebMap",
            "esri/views/MapView",
            "esri/widgets/Sketch/SketchViewModel",
            "esri/widgets/Expand",
            "esri/Graphic",
            "esri/layers/GraphicsLayer"
        ])
        .then(([esriConfig, WebMap, MapView, SketchViewModel, Expand, Graphic, GraphicsLayer]) => {
            esriConfig.apiKey = apiKey;
            
            const webmap = new WebMap({
                portalItem: {
                    id: "15a376ea595a4c859c24b4e380591d67"
                },
            });
        
            const view = new MapView({
                map        : webmap,
                center     : [35.49980223628851, 33.89],
                zoom       : 14,
                container  : "map",
                constraints: {
                    snapToZoom: false
                }
            });
        })
        .catch(err => {
            // handle any errors
            console.error(err);
        });
    }, []);

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

            <div className={'filterButtonContainer filterButtonContainer--homepage'}>
                <button
                    type="button"
                    className={'submitBtn buttonClear'}
                    style={{ marginLeft: '2rem' }}
                    onClick={() => setShowFilters(true)}
                >FILTERS</button>
            </div>
            <div id='map' className='map'></div>
        </>
    )
}