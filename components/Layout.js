import Link from 'next/link'
import React, { useContext, useRef } from 'react';
import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import * as forms from '../styles/Contact.module.css'
import { useRouter } from 'next/router'
import Header from './head/Header'
import GraphSideMenu from './GraphSideMenu.js'
import { PopupsContext } from '../context/PopupContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import FloatingTab from '../components/FloatingTab';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/auth';
import Popup from '../components/Popup';
import RegisterForm from '../components/forms/RegisterForm';
import { route } from 'next/dist/next-server/server/router';

export default function Layout({ children, rightSideBar = null }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const loginForm = useRef(null);

    const popupContext = useContext(PopupsContext)
    const { loginUser, isAuthenticated } = useAuth()
    const router = useRouter();

    const onLogin = async (data) => {
        try {
            const res = await loginUser(data['email'], data['password']);
            console.log(res, 'asdf');
            if (res.status) {
                console.log('logged in user');
                popupContext.closePopup();
                // router:push('/account');
            } else if (!res.status && res.type === 'verification') {
                setError('email', { message: 'Please verify your email before signing in' })
            } else {
                setError('email', { message: 'Wrong Email/Password combination' })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const existsInHidden = () => {
        const hidden = ['/account', '/survey', '/about', '/contact', '/zones', '/stats', '/submission/[id]'];
        const currentRoute = router.pathname;
        return hidden.includes(currentRoute)
    }

    return (
        <div>
            <div className={styles.main}>
                <Header />
                <div className={styles.leftSide}>
                    <header>
                        <div className={`${styles.container} ${styles.menuBar} ${styles.desktopMenu}`}>
                            <div className={styles.logo}>
                                <Link href="/">
                                    <a>
                                        <Image
                                            src="/logo.png"
                                            height={100}
                                            width={165}
                                        />
                                    </a>
                                </Link>
                            </div>

                            <div className={styles.menuItems}>
                                <ul>
                                    <li>
                                        <Link href={"/"}>
                                            <a>THE MAP</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/about"}>
                                            <a>ABOUT</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/contact"}>
                                            <a>CONTACT US</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={`${styles.mobileMenu}`}>
                            <FontAwesomeIcon icon={faBars} style={{ width: 20 }} />
                            <a href="/" style={{ textAlign: 'center' }}>
                                <div className={`${styles.mobileLogo}`}>
                                    <Image

                                        src="/logo.png"
                                        height={60}
                                        width={130}
                                    />
                                </div>
                            </a>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                {!isAuthenticated && <button className={`${styles.btnSmall}`} onClick={(e) => {
                                    popupContext.showPopup('login')
                                }} >
                                    LOGIN
                                </button>}

                                {isAuthenticated && <button className={`${styles.btnSmall}`} onClick={(e) => {
                                    router.push('/account')
                                }} >
                                    ACCOUNT
                                </button>}
                            </div>

                        </div>
                    </header>

                    <div>
                        {!existsInHidden() && <div className={styles.floatingTabContainer}>

                            <FloatingTab title="DASHBOARD">
                                <GraphSideMenu />
                            </FloatingTab>

                            <FloatingTab title="LEGEND">
                                <GraphSideMenu />
                            </FloatingTab>

                        </div>}
                        {children}
                    </div>
                </div>

                <div className={styles.rightSide}>
                    {rightSideBar && rightSideBar}
                    {!rightSideBar && <GraphSideMenu />}
                </div>
            </div >
            <img src="/aub-logo.png" className={`${styles.aubLogo} ${styles.hiddenOnMobile}`} />
            <img src="/beirut-logo.png" className={`${styles.beirutLogo} ${styles.hiddenOnMobile}`} />

            {/* </PopupsContext.Provider> */}
            {popupContext.showPopups.login && <Popup
                popupStyle={styles.signinContainer}
            >
                <h2 className={styles.popupTitle}>LOGIN</h2>
                <form className={forms.contactForm} onSubmit={handleSubmit(onLogin)} ref={loginForm}>
                    <div className={forms.formItem}>
                        {errors?.email?.message && <p style={{ color: 'red', marginLeft: 5, textAlign: 'center' }}>{errors.email.message}</p>}
                        <label className={forms.label}>EMAIL ADDRESS</label>
                        <input className={forms.formInput}  type="email" {...register('email', { required: true })} />
                    </div>
                    <div className={forms.formItem}>
                        <label className={forms.label}>PASSWORD</label>
                        <input className={forms.formInput} type="password" {...register('password', { required: true })} />
                    </div>
                    <div className={styles.inlineButtons}>
                        <button className={`${forms.submitBtn} ${forms.buttonClear}`} onClick={() => { popupContext.showPopup('register') }}>SIGN UP INSTEAD</button>
                        <button className={forms.submitBtn}>SIGN IN</button>
                    </div>
                </form>
            </Popup>}

            {popupContext.showPopups.welcome && <Popup
                popupStyle={styles.welcomePopup}
                leftButtonText="LOG IN"
                handleLeftButtonPress={() => popupContext.showPopup('login')}
                rightButtonText="CONTINUE TO SITE"
                handleRightButtonPress={popupContext.closePopup}
            >
                <img src="/logo-line.png" />
                <h2 className={styles.popupTitle}>WELCOME TO CITY OF TENANTS</h2>

                <p>“City of Tenants” is an online GIS platform developed by the Beirut Urban Lab at the American University of Beirut. The project is by “tenants for tenants” initiative. It aims to improve visibility of rental housing by providing indications about the variations in available apartments and prices across spatial and physical conditions and geographic locations. “City of Tenants” helps current and future tenants improve their knowledge of the rental housing market and housing options when seeking fairly-priced homes. We believe that by placing information in the hands of home seekers about existing rather than asking prices, we empower those looking for shelter to make choices that serve their needs best. </p>
                <br />
                <p>
                    This project relies on your participation! If you are a Beirut tenant, you can help us expand this database by filling the survey. Signing in is only required to verify user and you can fill multiple surveys with one user account. All surveys remain anonymous. We will not relay any indicator of the tenant’s identity, personal information, or the apartment’s exact location to the public. Overall results will be published in aggregate and available to the public. Personal or sensitive information will not be aggregated in the public database of our website and will not be made publicly available.
                </p>
            </Popup>}

            {popupContext.showPopups.submitSurvey && <Popup
                popupStyle={styles.submitSurvey}
                rightButtonText="I CONFIRM"
                handleRightButtonPress={() => {
                    popupContext.closePopup()
                    router.push('/survey')
                }}
            >
                <h2 className={styles.popupTitle}>SUBMIT A SURVEY</h2>
                <p>Dear Participant, <br />We invite you to participate in the survey titled “City of Tenants”. This survey will feed into the “City of Tenants” online platform, a project that aims to improve visibility of rental housing for tenants by providing indications about the variations in available apartments and prices across spatial and physical conditions and geographic locations. This helps current and future tenants improve their knowledge of housing options and find homes that respond best to their needs.</p>
                <br />
                <p>You will be asked to complete a brief survey/questionnaire with information about your rental unit condition, available services, and rental value. Your contribution in this survey will remain anonymous. Signing in is only required to verify user and allow user to fill multiple surveys. The email address will not be used at any point or linked to the survey. We will not relay any indicator of the tenant’s identity, personal information, or the apartment’s exact location to the public. Overall results will be published in aggregate and available to the public. Personal or sensitive information will not be aggregated in the public database of our website and will not be made publicly available.</p>
                <br />
                <p>The estimated time to complete this survey is approximately 7 minutes. Please confirm that you have read and understood the consent form to proceed. </p>
                <br />
                <p>If you have any questions about this project, you may contact the Beirut Urban Lab on cityoftenants@aub.edu.lb </p>
            </Popup>}

            {popupContext.showPopups.register && <RegisterForm />}
        </div>
    )
}
