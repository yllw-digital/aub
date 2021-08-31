
import * as contactStyles from '../styles/Contact.module.css';
import * as surveyStyles from '../styles/Survey.module.css';
import { getFilters } from '../services/statistics/statistics'
import { useEffect, useState } from 'react';

export default function Filters() {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            const filtersRes = await getFilters();
            setFilters(filtersRes?.data);
        }
        fetchFilters()
    }, [])


    return (
        <div className={surveyStyles.filtersOverlay}>
            <div className={surveyStyles.filtersContainer}>

                <form>

                    <div className={surveyStyles.formItem}>
                        <label className={`${contactStyles.label}`}>Filter name</label>

                        <select className={contactStyles.formInput}>
                            <option value="">Specify Option</option>
                        </select>
                    </div>

                    <div className={surveyStyles.formItem}>
                        <label className={`${contactStyles.label}`}>Filter name</label>

                        <select className={contactStyles.formInput}>
                            <option value="">Specify Option</option>
                        </select>
                    </div>

                </form>

            </div>
        </div>
    )
}

