import Link from 'next/link'
import React, { useContext, useRef } from 'react';
import Image from 'next/image'
// import styles from '../styles/Layout.module.css'
// import * as forms from '../styles/Contact.module.css'
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
import { useEffect } from 'react';
import Cookies from 'js-cookie'

export default function Layout({ children, rightSideBar = null }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const loginForm = useRef(null);

    const popupContext = useContext(PopupsContext)
    const { loginUser, isAuthenticated } = useAuth()
    const router = useRouter();
    const { takesurvey } = router.query

    console.log(takesurvey, 'take sruvey')
    useEffect(() => {
        const checkPopupStatus = async () => {
            const hidePopups = await Cookies.get('hide-popups');
            if (!hidePopups) {
                popupContext.showPopup('welcome')
            }
        }

        checkPopupStatus()
    }, [])

    useEffect(() => {
        if (takesurvey) {
            popupContext.showPopup('surveyMessage');
        }
    }, [takesurvey])

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
            <div className='main'>
                <Header />
                <div className='leftSide'>
                    <header>
                        <div className='container menuBar desktopMenu'>
                            <div className='logo'>
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

                            <div className='menuItems'>
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

                        <div className='mobileMenu'>
                            <FontAwesomeIcon icon={faBars} style={{ width: 20 }} />
                            <a href="/" style={{ textAlign: 'center' }}>

                                <div className='mobileLogo'>
                                    <Image
                                        src="/logo.png"
                                        height={60}
                                        width={130}
                                    />
                                </div>
                            </a>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                {!isAuthenticated && <button className='btnSmall' onClick={(e) => {
                                    popupContext.showPopup('login')
                                }} >
                                    LOGIN
                                </button>}

                                {isAuthenticated && <button className='btnSmall' onClick={(e) => {
                                    router.push('/account')
                                }} >
                                    ACCOUNT
                                </button>}
                            </div>

                        </div>
                    </header>

                    <div>
                        {!existsInHidden() && <div className='floatingTabContainer'>

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

                <div className='rightSide'>
                    {rightSideBar && rightSideBar}
                    {!rightSideBar && <GraphSideMenu />}
                </div>
            </div >
            <img src="/aub-logo.png" className='aubLogo hiddenOnMobile' />
            <img src="/beirut-logo.png" className='beirutLogo hiddenOnMobile' />

            {/* </PopupsContext.Provider> */}
            {popupContext.showPopups.login && <Popup
                popupStyle='signinContainer'
            >
                <h2 className='popupTitle'>LOGIN</h2>
                <form className='contactForm' onSubmit={handleSubmit(onLogin)} ref={loginForm}>
                    <div className='formItem'>
                        {errors?.email?.message && <p style={{ color: 'red', marginLeft: 5, textAlign: 'center' }}>{errors.email.message}</p>}
                        <label className='label'>EMAIL ADDRESS</label>
                        <input className='formInput' type="email" {...register('email', { required: true })} />
                    </div>
                    <div className='formItem'>
                        <label className='label'>PASSWORD</label>
                        <input className='formInput' type="password" {...register('password', { required: true })} />
                    </div>
                    <div className='inlineButton'>
                        <button className='submitBtn buttonClear' onClick={() => { popupContext.showPopup('register') }}>SIGN UP INSTEAD</button>
                        <button className='submitBtn'>SIGN IN</button>
                    </div>
                </form>
            </Popup>}

            {popupContext.showPopups.welcome && <Popup
                popupStyle='welcomePopup'
                leftButtonText="LOG IN"
                handleLeftButtonPress={() => popupContext.showPopup('login')}
                rightButtonText="CONTINUE TO SITE"
                handleRightButtonPress={() => {
                    Cookies.set('hide-popups', true);
                    popupContext.closePopup()
                }}
            >
                <img src="/logo-line.png" />
                <h2 className='popupTitle'>WELCOME TO CITY OF TENANTS</h2>

                <p>“City of Tenants” is an online GIS platform developed by the Beirut Urban Lab at the American University of Beirut. The project is by “tenants for tenants” initiative. It aims to improve visibility of rental housing by providing indications about the variations in available apartments and prices across spatial and physical conditions and geographic locations. “City of Tenants” helps current and future tenants improve their knowledge of the rental housing market and housing options when seeking fairly-priced homes. We believe that by placing information in the hands of home seekers about existing rather than asking prices, we empower those looking for shelter to make choices that serve their needs best. </p>
                <br />
                <p>
                    This project relies on your participation! If you are a Beirut tenant, you can help us expand this database by filling the survey. Signing in is only required to verify user and you can fill multiple surveys with one user account. All surveys remain anonymous. We will not relay any indicator of the tenant’s identity, personal information, or the apartment’s exact location to the public. Overall results will be published in aggregate and available to the public. Personal or sensitive information will not be aggregated in the public database of our website and will not be made publicly available.
                </p>
            </Popup>}

            {popupContext.showPopups.submitSurvey && <Popup
                popupStyle='submitSurvey'
                rightButtonText="I CONFIRM"
                handleRightButtonPress={() => {
                    popupContext.closePopup()
                    router.push({ pathname: '/', query: { takesurvey: true } })
                }}
            >
                <h2 className='popupTitle'>SUBMIT A SURVEY</h2>
                <p>Dear Participant, <br />We invite you to participate in the survey titled “City of Tenants”. This survey will feed into the “City of Tenants” online platform, a project that aims to improve visibility of rental housing for tenants by providing indications about the variations in available apartments and prices across spatial and physical conditions and geographic locations. This helps current and future tenants improve their knowledge of housing options and find homes that respond best to their needs.</p>
                <br />
                <p>You will be asked to complete a brief survey/questionnaire with information about your rental unit condition, available services, and rental value. Your contribution in this survey will remain anonymous. Signing in is only required to verify user and allow user to fill multiple surveys. The email address will not be used at any point or linked to the survey. We will not relay any indicator of the tenant’s identity, personal information, or the apartment’s exact location to the public. Overall results will be published in aggregate and available to the public. Personal or sensitive information will not be aggregated in the public database of our website and will not be made publicly available.</p>
                <br />
                <p>The estimated time to complete this survey is approximately 7 minutes. Please confirm that you have read and understood the consent form to proceed. </p>
                <br />
                <p>If you have any questions about this project, you may contact the Beirut Urban Lab on cityoftenants@aub.edu.lb </p>
            </Popup>}

            {popupContext.showPopups.surveyMessage && <Popup
                popupStyle='submitSurvey'
                rightButtonText="SELECT MY BUILDING"
                handleRightButtonPress={() => {
                    popupContext.closePopup()
                }}
            >
                <h2 className='popupTitle'>SELECT YOUR BUILDING</h2>
                <p>Dear Participant, <br />The first step for you to take the survey is to find your building and select it on the map by clicking on it.</p>
                <br />
                <p>Once your building is selected, a popup will show containing a button that says "Take Survey". Click that button to be redirected to the survey's page</p>
                <br />

                <p>If you have any questions, you may contact the Beirut Urban Lab on cityoftenants@aub.edu.lb </p>
            </Popup>}

            {popupContext.showPopups.register && <RegisterForm />}
        </div>
    )
}
