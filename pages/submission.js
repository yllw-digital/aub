import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as contactStyles from '../styles/Contact.module.css';
import * as surveyStyles from '../styles/Survey.module.css';
import { getSubmission } from '../services/answers/answers';
import Cookies from 'js-cookie'
import api from '../services/config';
import { useEffect, useState } from 'react';

export default function Submission() {
    const [sections, setSections] = useState(null);

    useEffect(() => {
        const loadSubmission = async () => {
            const token = await Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
            }
            const submission = await getSubmission(4);
            setSections(submission.data);
        }

        loadSubmission();
    }, []);
    
const renderAnswer = (answers = []) => {
    if (answers.length > 1) {

        let answersConcat = [];
        answers?.map(answer => answersConcat.push(answer.answer))

        return answersConcat.join(", ");
    } else if (answers.length == 1) {
        return answers[0].answer
    } else {
        return  "Not Specified";
    }
}

    const renderAnswers = () => {
        if (!sections) return sections;

        let submissionLayout = [];

        sections?.submissions?.map((section, sectionIdx) => {
            let sectionQuestions = [];

            section.questions.map((question, questionIdx) => {
                sectionQuestions.push(<div className={surveyStyles.formItem}>
                    <label className={`${contactStyles.label}`}>{question.question}</label>
                    <p>{renderAnswer(question.answers)}</p>
                </div>);
            })

            submissionLayout.push(
                <div className={surveyStyles.sectionContainer}>
                    <h1>{section.name}</h1>
                    <div className={surveyStyles.thirdGrid}>
                        {sectionQuestions}
                    </div>
                </div>
            )

        })

        return submissionLayout;
    }

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>CITY OF TENANTS - RENTAL MAP SURVEY</h1>

                <div className={surveyStyles.researcherCheckbox}>

                    <p className={contactStyles.label}>Submitted on {sections?.submission_date}</p>
                </div>

                {renderAnswers()}

                {/* <div className={surveyStyles.sectionContainer}>
                    <h1>SECTION NAME</h1>
                    <div className={surveyStyles.thirdGrid}>
                        <div className={surveyStyles.formItem}>
                            <label className={`${contactStyles.label}`}>Question</label>
                            <p>User's answer</p>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={`${contactStyles.label}`}>Question</label>
                            <p>User's answer</p>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={`${contactStyles.label}`}>Question</label>
                            <p>User's answer</p>
                        </div>

                        <div className={surveyStyles.formItem}>
                            <label className={`${contactStyles.label}`}>Question</label>
                            <p>User's answer</p>
                        </div>


                    </div>
                </div> */}

            </div>
        </Layout >
    )
}