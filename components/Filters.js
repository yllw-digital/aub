
import * as contactStyles from '../styles/Contact.module.css';
import * as surveyStyles from '../styles/Survey.module.css';
import styles from '../styles/Layout.module.css'
import { useForm } from "react-hook-form";


export default function Filters({filters, handleFormSubmit, closeFilters}) {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const keys = Object.keys(data);
        let filtersObj = [];

        keys.map((key) => {
            if (data[key] !== "")
                filtersObj.push({
                    question_id: key,
                    answer: data[key]
                })
        })

       handleFormSubmit(filtersObj);
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
                            return <option value={option} selected={option == filters[key].selected_option} key={index.toString()}>{option}</option>
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
                <h1>SELECT FILTERS</h1>
                <img src="/close.png" className={styles.closeBtn}  onClick={closeFilters}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={surveyStyles.fieldsContainer}>
                        {renderFields()}
                    </div>
                    <div className={surveyStyles.thirdGrid} style={{ display: 'block' }}>
                        <button type="submit" className={contactStyles.submitBtn}>SUBMIT</button>
                        <button
                            type="button"
                            className={`${contactStyles.submitBtn} ${contactStyles.buttonClear}`}
                            style={{ marginLeft: '2rem' }}
                            onClick={() => reset()}
                        >RESET FILTERS</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
