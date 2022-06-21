
// import * as contactStyles from '../styles/Contact.module.css';
// import * as surveyStyles from '../styles/Survey.module.css';
// import styles from '../styles/Layout.module.css'
import { useForm, Controller} from "react-hook-form";
import Select from 'react-select'

export default function Filters({filters, handleFormSubmit, handleFormReset, closeFilters}) {
    const { register, handleSubmit, reset, control} = useForm();

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
                <div className='formItem' key={key.toString()}>
                    <label className='label'>{filters[key].filters_text && filters[key].filters_text.length ? filters[key].filters_text : filters[key].question}</label>
                    {!filters[key].is_multiple ? 
                    <select className='formInput' {...register(filters[key].question_id.toString())}>
                        <option value="">Set filter</option>
                        {filters[key].config.options.map((option, index) => {
                            return <option value={option} selected={option == filters[key].selected_option} key={index.toString()}>{option}</option>
                        })}
                    </select> : null}
                    {filters[key].is_multiple ?
                    <Controller
                    control={control}
                    name={filters[key].question_id.toString()}
                    render={({ field: { onChange, value, name, ref }}) => (
                        <Select
                            className='formInput'
                            inputRef={ref}
                            options={filters[key].config.multiple_options}
                            isMulti={true}
                            onChange={val => onChange(JSON.stringify(val))}
                            // control={control}
                            // name={filters[key].question_id.toString()}
                            >
                        </Select>
                    )} />
                    : null}
                </div>
            )

        })
        return fields;
    }

    const resetFilters = () => {
        handleFormReset();
        reset();
    }

    return (
        <div className='filtersOverlay'>
            <div className='filtersContainer'>
                <h1>SELECT FILTERS</h1>
                <img src="/close.png" className='closeBtn'  onClick={closeFilters}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='fieldsContainer'>
                        {renderFields()}
                    </div>
                    <div className='thirdGrid' style={{ display: 'block' }}>
                        <button type="submit" className='submitBtn'>FILTER</button>
                        <button
                            type="button"
                            className='submitBtn buttonClear'
                            style={{ marginLeft: '2rem' }}
                            onClick={resetFilters}
                        >RESET FILTERS</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

