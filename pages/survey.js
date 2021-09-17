import { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
// import styles from '../components/ZonesLayout.module.css';
// import * as contactStyles from '../styles/Contact.module.css';
// import * as surveyStyles from '../styles/Survey.module.css';
import { getQuestions, getZones } from '../services/questions/questions';
import DatePicker from "react-datepicker";
import "../node_modules/react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/auth';
import { answerQuestions } from '../services/answers/answers';
import { useRouter } from 'next/router'
import { PopupsContext } from '../context/PopupContext';

export default function Survey() {
    const [sections, setSections] = useState([]);
    const [dates, setDates] = useState({ 46: new Date, 47: new Date })
    const { register, handleSubmit, setValue, formState: { errors }} = useForm();
    const { isAuthenticated } = useAuth()
    const [researcher, setResearcher] = useState(false);
    // const [zones, setZones] = useState([]);
    const router = useRouter();
    const { zone, pid } = router.query
    const [zoneInfo, setZoneInfo] = useState(null)
    const { showPopup, closePopup } = useContext(PopupsContext);



    useEffect(() => {

        const fetchQuestions = async () => {
            try {
                const res = await getQuestions();
                setSections(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        const fetchZones = async () => {
            try {
                const res = await getZones();
                setZones(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchQuestions();
        fetchZones();

        if (!isAuthenticated) {
            console.log('auth on timer', isAuthenticated)
            showPopup('login')
        }else {
            closePopup()
        }
    }, [isAuthenticated]);

    useEffect(() => {
        setZoneInfo({
            zone_id: zone,
            pid: pid
        })
    }, [zone, pid])


    const renderQuestions = (questions) => {
        let display = [];

        sections.map((section, sectionIdx) => {
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

        return display;
    }

    const prepareField = (config, questionId, index) => {

        const { question } = config

        if (config?.researcher_only && !researcher) { return null }

        switch (config.type) {
            case "textfield":
                return <div className='formItem' key={index.toString()}>
                    <label className={`label ${config.researcher_validation == 'required' ? 'requiredField' : ''}`}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}
                    <input className='formInput' type="text" value={question} {...register(questionId.toString(), { required: config.researcher_validation == 'required' })} />
                </div>

            case "textarea":
                return <div className='formItem' key={index.toString()}>
                    <label className={`label ${config.researcher_validation == 'required' ? 'requiredField' : ''}`}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    <textarea className='formTextarea' rows="10"  {...register(questionId.toString(), { required: config.researcher_validation == 'required' })} value={question}></textarea>
                </div>

            case "dropdown":
                let size = config?.options.length - 1;
                let rndInt = Math.floor(Math.random() * (size + 1))

                return <div className='formItem' key={index.toString()}>
                    <label className={`label ${config.researcher_validation == 'required' ? 'requiredField' : ''}`}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    <select
                        className='formInput'
                        {...register(questionId.toString(), { required: config.researcher_validation == 'required' })}
                    >
                        <option value="">Specify Option</option>
                        {config.options.map((option, index) => {
                            return <option selected={index == rndInt} value={option}>{option}</option>
                        })}
                    </select>
                </div>

            case "checkbox":
                return <div className='formItem' key={index.toString()}>
                    <label className={`label ${config.researcher_validation == 'required' ? 'requiredField' : ''}`}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

                    {config.options.map((option, optionIndex) => {
                        return <div className='checkboxContainer'><input type="checkbox" value={option} checked {...register(`${questionId}[]`, { required: config.researcher_validation == 'required' })} />{option}</div>
                    })}
                </div>


            case "date":
                return <div className='formItem' key={index.toString()}>
                    <label className={`label ${config.researcher_validation == 'required' ? 'requiredField' : ''}`}>{question}</label>
                    {errors[questionId.toString()]?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>Field is required</p>}

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

    const onError = () => {
        showPopup('submitError');
    }

    const onSubmit = async (data) => {
        // const arcgis_id = data['arcgis_id'];
        // delete data['arcgis_id'];
        let res = await answerQuestions(prepareData(data), zoneInfo);
        showPopup('submitSuccess')
    }

    const prepareData = (data) => {

        console.log(data);
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
            <div className='pageContainer'>
                <h1 className='pageTitle'>CITY OF TENANTS - RENTAL MAP SURVEY</h1>
                <div className='researcherCheckbox'>
                    <input type="checkbox" onChange={(e) => setResearcher(e.target.checked)} />
                    <label className='label'>Take survey as a researcher (You will have to answer a few additional questions)</label>
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
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

                    {sections && renderQuestions(sections)}

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
                    <div className={'thirdGrid'}>
                        <button type="submit" className={'submitBtn'}>SUBMIT</button>
                    </div>
                </form>
            </div>
        </Layout>
    )

}