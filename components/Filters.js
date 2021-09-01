
import * as contactStyles from '../styles/Contact.module.css';
import * as surveyStyles from '../styles/Survey.module.css';
import { getFilters } from '../services/statistics/statistics'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

export default function Filters() {
    const [filters, setFilters] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchFilters = async () => {
            const filtersRes = await getFilters();
            setFilters(filtersRes?.data);
        }
        fetchFilters()


    }, [])

    const onSubmit = (data) => {
        console.log(data);
    }

    const renderFields = () => {
        const keys = Object.keys(filters);
        let fields = []
        keys.map((key) => {
            fields.push(
                <div className={surveyStyles.formItem} key={key.toString()}>
                    <label className={`${contactStyles.label}`}>{filters[key].question}</label>

                    <select className={contactStyles.formInput} {...register(filters[key].question_id.toString())}>
                        <option value="">Set filter</option>
                        {filters[key].config.options.map((option, index) => {
                            return <option value={option} key={index.toString()}>{option}</option>
                        })}
                    </select>
                </div>
            )

        })
        return fields;
    }

    return (
        <div className={surveyStyles.filtersOverlay}>
            <div className={surveyStyles.filtersContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={surveyStyles.fieldsContainer}>
                        {renderFields()}
                    </div>
                    <div className={surveyStyles.thirdGrid} style={{ display: 'block' }}>
                        <button type="submit" className={contactStyles.submitBtn}>SUBMIT</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

