import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as layoutStyles from '../styles/Layout.module.css'
import * as forms from '../styles/Contact.module.css'
import Link from 'next/link'
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'
import { getUserSubmissions } from '../services/answers/answers'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import api from '../services/config';

export default function Account() {
    const { logout, user } = useAuth()
    const router = useRouter();
    const [submissions, setUserSubmissions] = useState(null)

    useEffect(() => {
        const fetchUserSubmissions = async () => {
            const token = await Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
            }
            const res = await getUserSubmissions();
            setUserSubmissions(res?.data);
        }

        fetchUserSubmissions()
    },[]);

    
    const onLogout = () => {
        console.log('asdfasdf')
        if (logout()) {
            router.replace('/')
        }
    }
    const Survey = ({submission}) => {
        return <div className={styles.surveyWrapper}>
            <h3>{submission.zone.name}</h3>
            <div className={styles.surveyContainer}>
                <div className={styles.detailContainer}>
                    <div >

                        <div className={styles.detail}>
                            <span>RENT AMOUNT:</span>
                            <p>1,500 - 2,000$</p>
                        </div>
                        <div className={styles.detail}>
                            <span>APARTMENT SIZE:</span>
                            <p>250 - 350 SQM</p>
                        </div>
                    </div>
                </div>

                <div >
                    <div className={styles.detail}>
                        <span>RENT AMOUNT:</span>
                        <p>1,500 - 2,000$</p>
                    </div>
                </div>

                <Link href={""}>
                    VIEW SURVEY
                </Link>

            </div>
        </div>

    }
    return (
        <Layout>
            <div className={styles.accountSectionContainer}>
                {user && <div style={{ borderBottom: '1px solid' }}>
                    <div style={{ padding: '5.8rem 5.8rem 3rem' }}>
                        <h1 className={styles.pageTitle} style={{ paddingLeft: 0 }}>MY ACCOUNT</h1>
                        <p className={styles.profileName}>HELLO {user.firstname + ' ' + user.lastname}</p>

                        <div className={styles.profileInfoContainer}>
                            <div>
                                <div className={styles.info}>
                                    <img src="/email-icon.png" />
                                    <p>E. {user?.email}</p>
                                </div>
                              { user?.mobile && <div className={styles.info}>
                                    <img src="/phone-icon.png" />
                                    <p>T. {user.mobile}</p>
                                </div>}
                            </div>


                            <div className={layoutStyles.inlineButtons} style={{ margin: 'initial', justifyContent :'flex-end' }}>
                                {/* <button className={forms.submitBtn} >EDIT PROFILE</button> */}
                                <button className={`${forms.submitBtn} ${forms.buttonClear}`}  onClick={onLogout}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className={styles.profileSurveysSection}>
                    <div className={styles.surveysTop}>
                        <p className={styles.profileName}>YOU HAVE {submissions ? submissions.length : 0} SURVEYS</p>
                        <Link href={'/survey'} >
                            NEW SURVEY
                        </Link>
                    </div>

                    <div className={styles.surveysContainer}>
                        {submissions && submissions.map((submission,index) => <Survey submission={submission} key={index.toString()} />)}
                    </div>

                </div>
            </div>

        </Layout>

    )
}
