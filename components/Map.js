const apiKey = "AAPKae8d783029d040a390cffcf9591223c6VCnHLKIIbqzFOXIn2WnBVoEiJ4c_YQWGlnUR1K8HBADqSDTG7syvPZS63UilUcz4";

import { loadModules } from 'esri-loader';
import { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import { getFilters, getTable } from '../services/statistics/statistics'
import { useRouter } from 'next/router';
import { getSubmissionCount } from '../services/answers/answers';

export default function Map() {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([])
    const [tableData, setTableData] = useState([]);
    const [filters, setFilters] = useState([])
    const [showLegend, setShowLegend] = useState(false);
	const [submissionCount, setSubmissionCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchFilters = async () => {
            const filtersRes = await getFilters();
            setFilters(filtersRes?.data);
        }

		const fetchSubmissionCount = async () => {
			const res = await getSubmissionCount();
			setSubmissionCount(res?.data.count)
		}

		fetchSubmissionCount();
        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchTableData = async (selectedFilters) => {
            const res = await getTable(selectedFilters);
            setTableData(res?.data);
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
            "esri/geometry/Point",
            "esri/widgets/Sketch/SketchViewModel",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/widgets/Expand",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/widgets/Locate",
			"esri/widgets/Fullscreen"
        ])
            .then(([esriConfig, WebMap, MapView, SketchViewModel, Expand, Graphic, Locate, Point, SimpleMarkerSymbol, GraphicsLayer, Fullscreen]) => {
                esriConfig.apiKey = apiKey;
                console.log(tableData);

                const initialGraphics = getInitialGraphics();
                const graphicsLayer = new GraphicsLayer({
                    graphics: initialGraphics,
                });

                const webmap = new WebMap({
                    portalItem: {
                        id: "15a376ea595a4c859c24b4e380591d67"
                    },
                });

                const view = new MapView({
                    map: webmap,
                    center: [35.49980223628851, 33.89],
                    zoom: 14,
                    container: "map",
                    constraints: {
                        snapToZoom: false
                    }
                });

				const fullScreen = new Fullscreen({
					view: view
				});

				view.ui.add(fullScreen, "bottom-right");
                const locate = new Locate({
                    view: view,
                    useHeadingEnabled: false,
                    goToOverride: function(view, options) {
                      options.target.scale = 1500;
                      return view.goTo(options.target);
                    }
                });
                view.ui.add(locate, "bottom-left");

                // navigator.geolocation.getCurrentPosition(function(position) {
                //     let lat = position.coords.latitude;
                //     let long = position.coords.longitude;
                //     view.center = [long, lat];
                //     view.zoom = 18;
                // });

                view.on("click", function (event) {
                    view.hitTest(event, {
                        include: graphicsLayer
                    }).then((resp) => {
                        if (resp.results.length) {
                            // let params = [];
                            // selectedFilters.map(filter => params.push(`answer_${filter.question_id}=${filter.answer}`));

                            let query = {
                                zone_id: resp.results[0].graphic.attributes.id,
                                selectedMapFilters: encodeURIComponent(JSON.stringify(selectedFilters))
                            }
                            location.href = `/zones?zone_id=${query.zone_id}&selectedMapFilters=${query.selectedMapFilters}`
                        }
                    })
                });

                view.when(() => {
                    webmap.add(graphicsLayer, 100);
                });

                function getInitialGraphics() {
                    let graphics = [];

                    for (const zone_id in tableData.zones_count) {
                        graphics.push(
                            new Graphic({
                                attributes: {
                                    "id": zone_id,
                                    "count": tableData.zones_count[zone_id]
                                },
                                geometry: {
                                    type: "point",
                                    latitude: 33.89,
                                    longitude: 35.49980223628851
                                },
                                symbol: {
                                    type: "cim",
                                    data: {
                                        type: "CIMSymbolReference",
                                        symbol: getPointSymbolData(tableData.zones_count[zone_id])
                                    }
                                }
                            })
                        );
                    }

                    return graphics;
                }


                function getPointSymbolData(resultsCount) {
                    return {
                        type: "CIMPointSymbol",
                        symbolLayers: [
                            {
                                type: "CIMVectorMarker",
                                enable: true,
                                size: 28,
                                colorLocked: true,
                                anchorPointUnits: "Relative",
                                frame: { xmin: -5, ymin: -5, xmax: 5, ymax: 5 },
                                markerGraphics: [
                                    {
                                        type: "CIMMarkerGraphic",
                                        geometry: { x: 0, y: 0 },
                                        symbol: {
                                            type: "CIMTextSymbol",
                                            fontFamilyName: "Arial",
                                            fontStyleName: "Bold",
                                            height: 4,
                                            horizontalAlignment: "Center",
                                            offsetX: 0,
                                            offsetY: 5.5,
                                            symbol: {
                                                type: "CIMPolygonSymbol",
                                                symbolLayers: [
                                                    {
                                                        type: "CIMSolidFill",
                                                        enable: true,
                                                        color: [255, 255, 255, 255]
                                                    }
                                                ]
                                            },
                                            verticalAlignment: "Center"
                                        },
                                        textString: "" + resultsCount
                                    }
                                ],
                                scaleSymbolsProportionally: true,
                                respectFrame: true
                            },
                            {
                                type: "CIMVectorMarker",
                                enable: true,
                                anchorPoint: { x: 0, y: -0.5 },
                                anchorPointUnits: "Relative",
                                size: 30.8,
                                frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                                markerGraphics: [
                                    {
                                        type: "CIMMarkerGraphic",
                                        geometry: {
                                            rings: [
                                                [
                                                    [8.5, 0.2],
                                                    [7.06, 0.33],
                                                    [5.66, 0.7],
                                                    [4.35, 1.31],
                                                    [3.16, 2.14],
                                                    [2.14, 3.16],
                                                    [1.31, 4.35],
                                                    [0.7, 5.66],
                                                    [0.33, 7.06],
                                                    [0.2, 8.5],
                                                    [0.33, 9.94],
                                                    [0.7, 11.34],
                                                    [1.31, 12.65],
                                                    [2.14, 13.84],
                                                    [3.16, 14.86],
                                                    [4.35, 15.69],
                                                    [5.66, 16.3],
                                                    [7.06, 16.67],
                                                    [8.5, 16.8],
                                                    [9.94, 16.67],
                                                    [11.34, 16.3],
                                                    [12.65, 15.69],
                                                    [13.84, 14.86],
                                                    [14.86, 13.84],
                                                    [15.69, 12.65],
                                                    [16.3, 11.34],
                                                    [16.67, 9.94],
                                                    [16.8, 8.5],
                                                    [16.67, 7.06],
                                                    [16.3, 5.66],
                                                    [15.69, 4.35],
                                                    [14.86, 3.16],
                                                    [13.84, 2.14],
                                                    [12.65, 1.31],
                                                    [11.34, 0.7],
                                                    [9.94, 0.33],
                                                    [8.5, 0.2]
                                                ]
                                            ]
                                        },
                                        symbol: {
                                            type: "CIMPolygonSymbol",
                                            symbolLayers: [
                                                {
                                                    type: "CIMSolidFill",
                                                    enable: true,
                                                    color: [39, 129, 153, 255]
                                                }
                                            ]
                                        }
                                    }
                                ],
                                scaleSymbolsProportionally: true,
                                respectFrame: true
                            },
                        ]
                    };
                }
            })
            .catch(err => {
                // handle any errors
                console.error(err);
            });
    }, [tableData]);

    const onSubmit = (data) => {
        setShowFilters(false);
        setSelectedFilters(data);
    }

    const onReset = () => {
        setSelectedFilters([]);
    }

    const toggleLegend = () => setShowLegend(!showLegend)

    return (
        <>
            {showFilters && <Filters
                closeFilters={() => setShowFilters(false)}
                filters={filters}
                handleFormReset={onReset}
                handleFormSubmit={onSubmit} />}

            <div className='map-legend'>
                <h2 onClick={toggleLegend}>
                    <i className="fa fa-caret-down"> </i>
                    Legend
                </h2>
               { showLegend && <div className='map-content'>
				   <h3><span>{submissionCount}</span> total submissions.</h3>
                    <h3 class='pb'>Average rent amount by neighborhood (USD)</h3>

                    <div>
                        <div className='map-total-rent'><span>&gt; 3,000</span></div>
                        <div className='map-bars'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div><span>450 - 500</span></div>
                        </div>
                    </div>

                    <h3 className='pb'>Average apartment size by neighborhood (SQM)</h3>

                    <div className='apt-size'>
                        <div className='apt-size-divs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <div className='apt-size-label'>
                            <span></span>
                            450 - 500
                        </div>
                        <div className='apt-size-label-2'>
                            <span></span>
                            80 - 110
                        </div>
                    </div>
                </div>}
            </div>


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
