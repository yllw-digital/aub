import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as contactStyles from '../styles/Contact.module.css';
import * as surveyStyles from '../styles/Survey.module.css';
import { getQuestions } from '../services/questions/questions';
import DatePicker from "react-datepicker";
import "../node_modules/react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/auth';

export default function Survey() {
    const [sections, setSections] = useState([]);
    const [dates, setDates] = useState({ 46: new Date, 47: new Date })
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { isAuthenticated } = useAuth()
    const [researcher, setResearcher] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await getQuestions();
                setSections(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchQuestions();
    }, [isAuthenticated]);


    const renderQuestions = (questions) => {
        let display = [];

        sections.map((section, sectionIdx) => {
            let sectionQuestions = [];
            section?.questions.map((question, questionIdx) => {
                sectionQuestions.push(prepareField(question.config, question.question_id, questionIdx));
            })
            display.push(
                <div key={sectionIdx.toString()} className={surveyStyles.sectionContainer}>
                    <h1>{section.name}</h1>
                    <div className={surveyStyles.thirdGrid}>{sectionQuestions}</div>
                </div>);
        })

        return display;
    }

    const prepareField = (config, questionId, index) => {

        const { question } = config

        if( config?.researcher_only && !researcher ) {return null}

        switch (config.type) {
            case "textfield":
                return <div className={surveyStyles.formItem} key={index.toString()}>
                    <label className={contactStyles.label}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}
                    <input className={contactStyles.formInput} type="text"  {...register(questionId.toString(), { required: config.user_validation == 'required' })} />
                </div>

            case "textarea":
                return <div className={surveyStyles.formItem} key={index.toString()}>
                    <label className={contactStyles.label}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    <textarea className={contactStyles.formTextarea} rows="10"  {...register(questionId.toString(), { required: config.user_validation == 'required' })}></textarea>
                </div>

            case "dropdown":
                return <div className={surveyStyles.formItem} key={index.toString()}>
                    <label className={contactStyles.label}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    <select
                        className={contactStyles.formInput}
                        {...register(questionId.toString(), { required: config.user_validation == 'required' })}
                    >
                        <option value="">Specify Option</option>
                        {config.options.map((option, index) => {
                            return <option value={camelize(option)}>{option}</option>
                        })}
                    </select>
                </div>

            case "checkbox":
                return <div className={surveyStyles.formItem} key={index.toString()}>
                    <label className={contactStyles.label}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    {config.options.map((option, optionIndex) => {
                        return <div className={contactStyles.checkboxContainer}><input type="checkbox" value={camelize(option)} {...register(`${questionId}[]`, { required: config.user_validation == 'required' })} />{option}</div>
                    })}
                </div>


            case "date":
                return <div className={surveyStyles.formItem} key={index.toString()}>
                    <label className={contactStyles.label}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    <DatePicker
                        selected={dates[questionId]}
                        className={contactStyles.formInput}
                        {...register(questionId.toString(), { required: config.user_validation == 'required' })}
                        onChange={(date) => {
                            let datesCopy = { ...dates };
                            datesCopy[questionId] = date;
                            setDates(datesCopy)
                            setValue(questionId.toString(), formatDate(date), { shouldValidate: true })
                        }} />
                </div>

        }
    }

    const formatDate = (d) => {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const camelize = (str) => {
        if (typeof str !== 'string') return str;
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const onSubmit = (data) => {
        console.log(prepareData(data));
    }

    const prepareData = (data) => {
        const keys = Object.keys(data);
        let answers = [];

        keys.forEach((key) => {
            answers.push({
                question_id: key,
                answer: data[key]
            })
        })

        return answers
    }

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>CITY OF TENANTS - RENTAL MAP SURVEY</h1>
                <div className={surveyStyles.researcherCheckbox}>
                    <input type="checkbox" onChange={(e) => setResearcher(e.target.checked)} />
                    <label className={contactStyles.label}>Take survey as a researcher (You will have to answer a few additional questions)</label>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className={surveyStyles.thirdGrid}> */}
                    {/* FIELDS START */}
                    {sections && renderQuestions(sections)}

                    {/* <div className={surveyStyles.formItem}>
                            <label className={contactStyles.label}>EMAIL ADDRESS</label>
                            <input className={contactStyles.formInput} type="text" />
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={contactStyles.label}>AGE</label>
                            <select className={contactStyles.formInput} >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={contactStyles.label}>GENDER</label>
                            <select className={contactStyles.formInput} >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={contactStyles.label}>NATIONALITY</label>
                            <p>Kindly specify nationality under “Other” if not Lebanese</p>
                            <select className={contactStyles.formInput} >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={contactStyles.label}>NUMBER OF HOUSEHOLD MEMBERS</label>
                            <p>including live-in domestic workers</p>
                            <select className={contactStyles.formInput} >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={contactStyles.label}>OTHER HOUSEHOLD MEMBERS</label>
                            <table className={surveyStyles.table}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>0</th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                    </tr>
                                </thead>

                                <tbody className={surveyStyles.tableBody}>
                                    <tr>
                                        <td>Children (Below 18)</td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                    </tr>
                                    <tr>
                                        <td>Children (Above 18)</td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                    </tr>

                                    <tr>
                                        <td>Other dependents (grandparents, grandchildren etc ...)</td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                    </tr>

                                    <tr>
                                        <td>Other family members (daughter in law, son in law, uncles, aunts, etc.)</td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                    </tr>

                                    <tr>
                                        <td>Helpers</td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                    </tr>

                                    <tr>
                                        <td>Roommate</td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                        <td><input type="radio" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={surveyStyles.formItem} style={{ marginBottom: '2.5rem' }}>
                            <label className={contactStyles.label}>WOMAN-HEADED HOUSEHOLD</label>
                            <div className={surveyStyles.inlineRadioContainer}>
                                <div className={surveyStyles.inlineRadio}>
                                    <input type="radio" />
                                    YES
                                </div>
                                <div className={surveyStyles.inlineRadio}>
                                    <input type="radio" />
                                    NO
                                </div>
                            </div>
                        </div> */}
                    {/* FIELDS END  */}
                    <div className={surveyStyles.thirdGrid}>
                        <button type="submit" className={contactStyles.submitBtn}>SUBMIT</button>
                    </div>
                </form>
            </div>
        </Layout>
    )

}