import { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
// import styles from '../components/ZonesLayout.module.css';
// import * as contactStyles from '../styles/Contact.module.css';
// import * as surveyStyles from '../styles/Survey.module.css';
import { getQuestions } from '../services/questions/questions';
import DatePicker from "react-datepicker";
import "../node_modules/react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/auth';
import { answerQuestions, getDraftAnswers } from '../services/answers/answers';
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';
import useUserHook from '../hooks/useUserHook';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';

export default function Survey() {
    const [sections, setSections] = useState([]);
    const [dates, setDates] = useState({ 47: null, 48: null })
    const [counter, setCounter] = useState(0)
    // const [ draftAnswers, setDraftAnswers ] = useState(null);
    const { register, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm();
    const { isAuthenticated } = useAuth()
    const user = useUserHook()
    const [questionaire, setQuestionaire] = useState(null)
    const [researcher, setResearcher] = useState(false);
    // const [zones, setZones] = useState([]);
    const router = useRouter();
    const { zone, pid, draftId } = router.query
    const [zoneInfo, setZoneInfo] = useState(null)
    const { showPopup, closePopup } = useContext(PopupsContext);
    const watchFields = watch(["34", "45"]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await getQuestions();
                setSections(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        const fetchDraft = async () => {
            try {
                const res = await getDraftAnswers(draftId);
                fillAnswers(res?.data?.submission);
            } catch (e) {
                console.log(e)
            }
        }

        setValue('1', user?.email)

        if (draftId) {
            fetchDraft()
        }

        fetchQuestions();

        if (!isAuthenticated) {
            showPopup('login')
        } else {
            closePopup()
        }
    }, [isAuthenticated, draftId, zone, pid, user]);

    useEffect(() => {
        setZoneInfo({
            zone_id: zone,
            pid: pid
        })
    }, [zone, pid])

    useEffect(() => {
        renderQuestions(sections)
    }, [sections, dates[47], dates[48], researcher, watchFields[0], watchFields[1], counter])

    // useEffect(() => {

    //     // const subscription = watch((value, { name, type }) => console.log(value, name, type));

    //     renderQuestions(sections)
    //     // return () => subscription.unsubscribe();
    // }, [watchFields[0], watchFields[1]]);

    useEffect(() => {
        if (dates[47] == null && dates[48] == null) {
            setDates({ 47: new Date(), 48: new Date() })
        }
    }, [])

    const fillAnswers = (answers) => {
        // console.log(answers)
        // return
        let answerDates = { 47: null, 48: null };

        answers.map((answer) => {

            const key = answer?.question_id.toString();

            switch (answer?.type) {
                case "textfield":
                case "dropdown":
                    if(answer.is_price) {
                        let parsedAnswer = JSON.parse(answer?.answers[0]?.answer);
                        setValue(key+"_lbp", parsedAnswer.lbp);
                        setValue(key+"_usd", parsedAnswer.usd);
                    } else {
                        setValue(key, answer?.answers[0]?.answer)
                    }
                    break;

                case "checkbox":
                    const answerArray = answer.answers.map(answer => answer.answer)
                    setValue(key, answerArray)
                    break;
                case "date":
                    if (answer?.answers[0]?.answer) {
                        const date = new Date(answer?.answers[0]?.answer);
                        answerDates[key] = date;
                        setValue(key, formatDate(date), { shouldValidate: true })
                    }
                    break;
            }
            setDates(answerDates)
        })
    }

    const renderQuestions = () => {
        let display = [];

        sections.map((section, sectionIdx) => {
            const questionsForResearchers = section?.questions?.filter((question) => question.config.researcher_only === true)

            if ((questionsForResearchers.length == section?.questions?.length) && !researcher) {
                return;
            }

            let sectionQuestions = [];
            section?.questions.map((question, questionIdx) => {
                sectionQuestions.push(prepareField(question.config, question.question_id, questionIdx));
            })

            display.push(
                <div key={sectionIdx.toString()} className={'sectionContainer'}>
                    <h1>{section.name}</h1>
                    <div className={'thirdGrid'}>{sectionQuestions}</div>
                </div>);
        })

        setQuestionaire(display)
        // return display;
    }

    const prepareField = (config, questionId, index) => {

        const { question } = config

        if (config?.researcher_only && !researcher) { return null }
        if (config?.dependency == 34 && config?.dependency_value !== getValues('34')) {
            return null;
        }

        if (config?.dependency == 45 && config?.dependency_value !== getValues('45')) {
            return null;
        }

        switch (config.type) {
            case "textfield":
                if(config.is_price) {
                    return <div className='formItem formItem--full' key={index.toString()}>
                        {getLabel(config, question, questionId)}
                        <div>
                            <div className=' formInput--lbp'>
                                <input className='formInput formInput--price' type="text"
                                    {...register(questionId.toString() + "_lbp")} />
                            </div>
                            <div className=' formInput--usd'>
                                <input className='formInput formInput--price' type="text"
                                    {...register(questionId.toString() + "_usd")} />
                            </div>
                        </div>
                    </div>
                } else {
                    return <div className='formItem' key={index.toString()}>
                        {getLabel(config, question, questionId)}
                        <input className='formInput' type="text"
                            {...register(questionId.toString(), { required: config.researcher_validation == 'required' })} />
                    </div>
                }

            case "textarea":
                return <div className='formItem' key={index.toString()}>
                    {getLabel(config, question, questionId)}

                    <textarea className='formTextarea' rows="10"  {...register(questionId.toString(), { required: config.researcher_validation == 'required' })}
                    //  value={question}
                    ></textarea>
                </div>

            case "dropdown":
                let size = config?.options.length - 1;
                let rndInt = Math.floor(Math.random() * (size + 1))

                return <div className='formItem' key={index.toString()}>
                    {getLabel(config, question, questionId)}

                    <select
                        className='formInput'
                        {...register(questionId.toString(), { required: config.researcher_validation == 'required' })}
                    >
                        <option value="">Specify Option</option>
                        {config.options.map((option, index) => {
                            return <option
                                // selected={index == rndInt}
                                value={option} key={index.toString()}>{option}</option>
                        })}
                    </select>
                </div>

            case "checkbox":
                return <div className='formItem' key={index.toString()}>
                    {getLabel(config, question, questionId)}

                    {config.options.map((option, optionIndex) => {
                        return <div className='checkboxContainer' key={optionIndex.toString() + index.toString()}><input type="checkbox" value={option}
                            //  checked 
                            {...register(`${questionId}[]`, { required: config.researcher_validation == 'required' })} />{option}</div>
                    })}
                </div>


            case "date":
                return <div className='formItem' key={index.toString()}>
                    {getLabel(config, question, questionId)}
                    <DatePicker
                        selected={dates[questionId]}
                        className='formInput'
                        {...register(questionId.toString(), { required: config.researcher_validation == 'required' })}
                        onChange={(date) => {
                            let datesCopy = { ...dates };
                            datesCopy[questionId] = date;
                            setDates(datesCopy)
                            setValue(questionId.toString(), formatDate(date), { shouldValidate: true })
                        }} />
                </div>

        }
    }

    const getLabel = (config, question, questionId) => {
        return (<><label className={`label ${config.researcher_validation == 'required' ? 'requiredField' : ''}`}>{question}</label>
            {config?.description && <p>{config.description}</p>}
            {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}</>
        )
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

    const onError = async () => {
        // if (1 == 1) {
        //     const data = getValues();
        //     onSubmit(data);
        //     return;
        // } 
        setTimeout(() => {
            setCounter(prev => prev + 1)
        }, 1000)
        showPopup('submitError');
    }

    const onSubmit = async (data, draftId = null, isDraft = false) => {
        // const arcgis_id = data['arcgis_id'];
        // delete data['arcgis_id'];
        let res = await answerQuestions(prepareData(data), zoneInfo, draftId, isDraft);
        showPopup('submitSuccess')
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
        <>
            <div className='pageContainer'>
                <h1 className='pageTitle'>CITY OF TENANTS - RENTAL MAP SURVEY</h1>
                <div className='researcherCheckbox'>
                    <input type="checkbox" onChange={(e) => setResearcher(e.target.checked)} />
                    <label className='label'>Take survey as a researcher (You will have to answer a few additional questions)</label>
                </div>
                <form onSubmit={handleSubmit((data, e) => {
                    onSubmit(data, draftId, false)
                }, onError)}>
                    {/* <div className={surveyStyles.thirdGrid}> */}
                    {/* FIELDS START */}
                    {/* <div className='formItem'>
                        <label className='label requiredField'>Select your zone</label>
                        {errors['arcgis_id']?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                        <select
                            className='formInput'
                            {...register('arcgis_id', { required: true })}
                        >
                            <option value="">Specify Option</option>
                            {zones.map((zone, idx) => <option value={zone.arcgis_id}>{zone.name}</option>)}
                        </select>
                    </div> */}

                    {/* {sections && renderQuestions(sections)} */}
                    {questionaire}

                    {/* <div className='formItem'>
                            <label className={contactStyles.label}>EMAIL ADDRESS</label>
                            <input className='formInput' type="text" />
                        </div>

                        <div className='formItem'>
                            <label className={contactStyles.label}>AGE</label>
                            <select className='formInput' >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className='formItem'>
                            <label className={contactStyles.label}>GENDER</label>
                            <select className='formInput' >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className='formItem'>
                            <label className={contactStyles.label}>NATIONALITY</label>
                            <p>Kindly specify nationality under “Other” if not Lebanese</p>
                            <select className='formInput' >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className='formItem'>
                            <label className={contactStyles.label}>NUMBER OF HOUSEHOLD MEMBERS</label>
                            <p>including live-in domestic workers</p>
                            <select className='formInput' >
                                <option>Please specify</option>
                            </select>
                        </div>

                        <div className='formItem'>
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

                        <div className='formItem' style={{ marginBottom: '2.5rem' }}>
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
                    <div className={'formSubmissionButtonContainer'}>
                        <button type="submit" className={'submitBtn'} style={{marginRight: 40}}>SUBMIT</button>
                        <button type="button" onClick={(e) => {
                            onSubmit(getValues(), draftId, true)
                        }} className={'submitBtn'}>SAVE DRAFT</button>
                    </div>
                </form>
            </div >
        </ >
    )

}