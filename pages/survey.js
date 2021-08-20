import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as contactStyles from '../styles/Contact.module.css';
import * as surveyStyles from '../styles/Survey.module.css';
import { getQuestions } from '../services/questions/questions';
import DatePicker from "react-datepicker";
import "../node_modules/react-datepicker/dist/react-datepicker.css";

export default function Survey() {
    const [questions, setQuestions] = useState(null);
    const [startDate, setStartDate] = useState(new Date);
    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await getQuestions();
            setQuestions(res.data)
        }
        fetchQuestions();
    }, []);

    const renderQuestions = (questions) => {
        let display = [];
        questions.map((question, index) => {
            display.push(prepareField(question.config, index));
            console.log(prepareField(question.config, index))
        })
        return display;
    }

    const prepareField = (configJson, index) => {
        const config = JSON.parse(configJson);
        const { question } = config

        switch (config.type) {
            case "textfield":

                return <div className={surveyStyles.formItem}>
                    <label className={contactStyles.label}>{question}</label>
                    <input className={contactStyles.formInput} type="text" />
                </div>
            case "textarea":

                return <div className={surveyStyles.formItem}>
                    <label className={contactStyles.label}>{question}</label>
                    <textarea className={contactStyles.formTextarea} rows="10"></textarea>
                </div>

            case "dropdown":

                return <div className={surveyStyles.formItem}>
                    <label className={contactStyles.label}>{question}</label>
                    <select className={contactStyles.formInput} >
                        <option>Please specify</option>
                        {config.options.map((option) => {
                            return <option>{option}</option>
                        })}
                    </select>
                </div>

            case "checkbox":
                return <div className={surveyStyles.formItem} >
                    <label className={contactStyles.label}>{question}</label>
                    {config.options.map((option) => {
                        return <div className={contactStyles.checkboxContainer}><input type="checkbox" />{option}</div>
                    })}
                </div>
                break;

            case "date":

                return <div className={surveyStyles.formItem}>
                    <label className={contactStyles.label}>{question}</label>
                    <DatePicker selected={startDate} className={contactStyles.formInput} onChange={(date) => setStartDate(date)} />
                </div>
                break;
        }
    }

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>CITY OF TENANTS - RENTAL MAP SURVEY</h1>

                <form >
                    <div className={surveyStyles.thirdGrid}>
                        {/* FIELDS START */}
                        {questions && renderQuestions(questions)}

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

                        <button type="submit" className={contactStyles.submitBtn}>SUBMIT</button>
                    </div>
                </form>
            </div>
        </Layout>
    )

}