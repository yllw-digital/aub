import Layout from '../../components/Layout';
import styles from '../../styles/ZonesLayout.module.css';
import * as contactStyles from '../../styles/Contact.module.css';
import * as surveyStyles from '../../styles/Survey.module.css';
import { getSubmission } from '../../services/answers/answers';
import Cookies from 'js-cookie'
import api from '../../services/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Submission() {
    const [sections, setSections] = useState(null);
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const loadSubmission = async () => {
            const token = await Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
            }

            const submission = await getSubmission(id);
            console.log('submission', submission.data)
            setSections(submission.data);
        }
        if(typeof id !== 'undefined') loadSubmission();
    }, [id]);

    const renderAnswer = (answers = []) => {
        if (answers.length > 1) {
            let answersConcat = [];
            answers?.map(answer => answersConcat.push(answer.answer))

            return answersConcat.join(", ");
        } else if (answers.length == 1) {
            return answers[0].answer
        } else {
            return "Not Specified";
        }
    }

    const renderAnswers = () => {
        if (!sections) return sections;

        let submissionLayout = [];

        sections?.submissions?.map((section, sectionIdx) => {
            let sectionQuestions = [];

            section.questions.map((question, questionIdx) => {
                sectionQuestions.push(<div className='formItem' key={questionIdx.toString()}>
                    <label className='label'>{question.question}</label>
                    <p>{renderAnswer(question.answers)}</p>
                </div>);
            })

            submissionLayout.push(
                <div className='sectionContainer' key={sectionIdx.toString()}>
                    <h1>{section.name}</h1>
                    <div className='thirdGrid'>
                        {sectionQuestions}
                    </div>
                </div>
            )

        })

        return submissionLayout;
    }

    return (
        <Layout>
            <div className='pageContainer'>
                <h1 className='pageTitle'>CITY OF TENANTS - RENTAL MAP SURVEY</h1>

                <div className='researcherCheckbox'>

                    <p className='label'>Submitted {sections?.submission_date}</p>
                </div>

                <div className='formItem' >
                    <label className='label'>PID:</label>
                    <p>{sections?.pid}</p>
                </div>

                {renderAnswers()}

                {/* <div className='sectionContainer'>
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