import Layout from '../components/Layout';
// import styles from '../components/ZonesLayout.module.css';
// import * as layoutStyles from '../components/Layout.module.css'
// import * as forms from '../components/Contact.module.css'
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
    }, []);


    const onLogout = () => {
        console.log('asdfasdf')
        if (logout()) {
            router.replace('/')
        }
    }
    const Survey = ({ submission }) => {
        return <div className='surveyWrapper'>
            <div className='surveyContainer'>
                <div className='detailContainer'>
                    <div >
                        <h3 className='zoneName'>{submission.zone.name}</h3>
                    </div>
                </div>

                <div >
                    <div className='detail'>
                        <span>RENT AMOUNT:</span>
                        <p>{submission.rent_value}$</p>
                    </div>
                    <div className='detail'>
                        <span>APARTMENT SIZE:</span>
                        <p>{submission.space}</p>
                    </div>
                </div>

                <Link href={`/submission/${submission.id}`}>
                    VIEW SURVEY
                </Link>

            </div>
        </div>

    }
    return (
        <Layout>
            <div className='accountSectionContainer'>
                {user && <div style={{ borderBottom: '1px solid' }}>
                    <div  className='accountPadding'>
                        <h1 className='pageTitle' style={{ paddingLeft: 0 }}>MY ACCOUNT</h1>
                        <p className='profileName' >HELLO {user.firstname + ' ' + user.lastname}</p>

                        <div className='profileInfoContainer'>
                            <div>
                                <div className='info'>
                                    <img src="/email-icon.png" />
                                    <p>E. {user?.email}</p>
                                </div>
                                {user?.mobile && <div className='info'>
                                    <img src="/phone-icon.png" />
                                    <p>T. {user.mobile}</p>
                                </div>}
                            </div>


                            <div className='inlineButtons' style={{ margin: 'initial', justifyContent: 'flex-end' }}>
                                {/* <button className={forms.submitBtn} >EDIT PROFILE</button> */}
                                <button className='submitBtn forms.buttonClear' onClick={onLogout}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className='profileSurveysSection'>
                    <div className='surveysTop'>
                        <p className='profileName' >YOU HAVE {submissions ? submissions.length : 0} SURVEYS</p>
                        <Link href={'/survey'} >
                            NEW SURVEY
                        </Link>
                    </div>

                    <div className='surveysContainer'>
                        {submissions && submissions.map((submission, index) => <Survey submission={submission} key={index.toString()} />)}
                    </div>

                </div>
            </div>

        </Layout>

    )
}
