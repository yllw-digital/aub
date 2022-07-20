import Layout from '../components/Layout';
// import styles from '../components/ZonesLayout.module.css';
// import * as layoutStyles from '../components/Layout.module.css'
// import * as forms from '../components/Contact.module.css'
import Link from 'next/link'
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'
import { getUserSubmissions, getUserDrafts, delDraft } from '../services/answers/answers'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import api from '../services/config';
import useUserHook from '../hooks/useUserHook';

export default function Account() {
    const { logout, user: useAuthUser } = useAuth()
    const user = useUserHook()
    const router = useRouter();
    const [submissions, setUserSubmissions] = useState(null)
    const [drafts, setDrafts] = useState(null);
  
    useEffect(() => {
        const fetchUserSubmissions = () => {
            return new Promise(async (resolve, reject) => {
                const token = await Cookies.get('token')
                if (token) {
                    api.defaults.headers.Authorization = `Bearer ${token}`
                }
                try {
                    const res = await getUserSubmissions();
                    resolve(res?.data);
                    // setUserSubmissions(res?.data);
                } catch (e) {
                    console.log(e)
                    reject(e)
                }
            })
        }

        const fetchUserDrafts = () => {
            return new Promise(async (resolve, reject) => {
                const token = await Cookies.get('token')
                if (token) {
                    api.defaults.headers.Authorization = `Bearer ${token}`
                }
                try {
                    const res = await getUserDrafts();
                    resolve(res?.data);
                    // setUserSubmissions(res?.data);
                } catch (e) {
                    console.log(e)
                    reject(e)
                }
            })
        }

        Promise.all([
            fetchUserSubmissions(),
            fetchUserDrafts()
        ]).then(data => {
            setUserSubmissions(data[0])
            setDrafts(data[1])
        }).catch(err => {
            console.log('promise error', err)
        })
        // fetchUserSubmissions()
    }, []);


    const onLogout = () => {
        console.log('asdfasdf')
        if (logout()) {
            router.replace('/')
        }
    }

    const deleteDraft = (id) => {
        console.log('delete draft', id)

        Promise.all([
            delDraft(id)
        ]).then(data => {
            location.reload()
        });
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

                <div className='survey-btns'>
                    {!submission?.is_draft ? <Link href={`/submission/${submission.id}`}>
                        VIEW SURVEY
                    </Link> : null}

                    {submission?.is_draft ? <Link href={`/survey?zone=${submission.zone.arcgis_id}&pid=${submission.pid}&draftId=${submission.id}`}>
                        VIEW DRAFT
                    </Link> : null}

                    {submission?.is_draft ? <a href='#' className='del' onClick={() => deleteDraft(submission.id)}>Delete</a> : null}
                </div>
            </div>
        </div>

    }
    return (
        <>
            <div className='accountSectionContainer'>
                {useAuthUser && <div style={{ borderBottom: '1px solid' }}>
                    <div className='accountPadding'>
                        <h1 className='pageTitle' style={{ paddingLeft: 0 }}>MY ACCOUNT</h1>
                        <p className='profileName' >Hello { useAuthUser?.firstname + ' ' +  useAuthUser?.lastname }</p>

                        <div className='profileInfoContainer'>
                            <div>
                                <div className='info'>
                                    <img src="/email-icon.png" />
                                    <p>E. { useAuthUser?.email}</p>
                                </div>
                                {user?.mobile && <div className='info'>
                                    <img src="/phone-icon.png" />
                                    <p>T. {useAuthUser?.mobile}</p>
                                </div>}
                            </div>


                            <div className='inlineButtons' style={{ margin: 'initial', justifyContent: 'flex-end' }}>
                                {/* <button className={forms.submitBtn} >EDIT PROFILE</button> */}
                                <button className='submitBtn forms.buttonClear' onClick={onLogout}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </div>}

                {drafts && <div className='profileSurveysSection'>
                    <div className='surveysTop'>
                        <p className='profileName' >YOU HAVE {drafts ? drafts.length : 0} DRAFTS</p>
                        <Link href={'/?takesurvey=true'} >
                            NEW SURVEY
                        </Link>
                    </div>

                    <div className='surveysContainer'>
                        {drafts && drafts.map((submission, index) => <Survey submission={submission} key={index.toString()} />)}
                    </div>
                </div>}

                <div className='profileSurveysSection'>
                    <div className='surveysTop'>
                        <p className='profileName' >YOU HAVE {submissions ? submissions.length : 0} SURVEYS</p>
                        {!drafts && <Link href={'/survey'} >
                            NEW SURVEY
                        </Link>}
                    </div>

                    <div className='surveysContainer'>
                        {submissions && submissions.map((submission, index) => <Survey submission={submission} key={index.toString()} />)}
                    </div>

                </div>
            </div>
        </>
    )
}
