import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as layoutStyles from '../styles/Layout.module.css'
import * as forms from '../styles/Contact.module.css'
import Link from 'next/link'
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'

export default function Account() {
    const { logout } = useAuth()
    const router = useRouter();

    const onLogout = () => {
        console.log('asdfasdf')
        if(logout()) {
            router.replace('/')
        }
    }
    const Survey = () => {
        return <div className={styles.surveyWrapper}>
            <h3>ZONE NAME HERE</h3>
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
                <div style={{ borderBottom: '1px solid' }}>
                    <div style={{ padding: '5.8rem 5.8rem 3rem' }}>
                        <h1 className={styles.pageTitle} style={{ paddingLeft: 0 }}>MY ACCOUNT</h1>
                        <p className={styles.profileName}>HELLO JAD YAZBEK</p>

                        <div className={styles.profileInfoContainer}>
                            <div>
                                <div className={styles.info}>
                                    <img src="/email-icon.png" />
                                    <p>E. jad.yazbeck@tedmob.com</p>
                                </div>
                                <div className={styles.info}>
                                    <img src="/phone-icon.png" />
                                    <p>T. +961-1-374374 ext: 3603</p>
                                </div>
                            </div>


                            <div className={layoutStyles.inlineButtons} style={{ margin: 'initial' }}>
                                <button className={forms.submitBtn} >EDIT PROFILE</button>
                                <button className={`${forms.submitBtn} ${forms.buttonClear}`} onClick={onLogout}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.profileSurveysSection}>
                    <div className={styles.surveysTop}>
                        <p className={styles.profileName}>YOU HAVE 3 SURVEYS</p>
                        <Link href={'/'} >
                            NEW SURVEY
                        </Link>
                    </div>

                    <div className={styles.surveysContainer}>
                        <Survey />
                        <Survey />
                        <Survey />
                    </div>

                </div>
            </div>

        </Layout>

    )
}
