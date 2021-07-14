import Link from 'next/link'
import { useContext } from 'react';
import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import * as forms from '../styles/Contact.module.css'
import { useRouter } from 'next/router'
import Header from './head/Header'
import GraphSideMenu from './GraphSideMenu.js'
import { PopupsContext } from '../context/PopupContext';
// export const PopupsContext = createContext({test: ''});

export default function Layout({ children }) {
    // const [showPopups, setShowPopups] = useState({
    //     login: false,
    //     register: false,
    //     welcome: false,
    //     submitSurvey: false
    // });
    const popupContext = useContext(PopupsContext)
    console.log(popupContext)
    const router = useRouter();

    // const popupContext.showPopup = (popup) => {
    //     let popupCopy = { ...showPopups };
    //     Object.keys(popupCopy).map((pup) => {
    //         popupCopy[pup] = false;
    //     })
    //     popupCopy[popup] = true;
    //     setShowPopups(popupCopy)
    // }

    // const popupContext.closePopup = (popup) => {
    //     let popupCopy = { ...showPopups };
    //     Object.keys(popupCopy).map((pup) => {
    //         popupCopy[pup] = false;
    //     })
    //     setShowPopups(popupCopy)
    // }

    const Popup = (props) => {
        const { children } = props;

        return (
            <div className={styles.overlay}>
                <div className={`${styles.popupContainer} ${props.popupStyle}`}>
                    <img src="/close.png" className={styles.closeBtn} onClick={popupContext.closePopup} />
                    {children}

                    <div className={styles.inlineButtons}>
                        {props.handleLeftButtonPress && <button type="submit" className={`${forms.submitBtn} ${forms.buttonClear}`} onClick={props.handleLeftButtonPress}>{props.leftButtonText}</button>}
                        {props.handleRightButtonPress && <button type="submit" className={forms.submitBtn} onClick={props.handleRightButtonPress}>{props.rightButtonText}</button>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* <PopupsContext.Provider value={{
                showPopup: (popup) => popupContext.showPopup(popup),
                closePopup: () => popupContext.closePopup()
            }}> */}
                <div className={styles.main}>
                    <Header />
                    <div className={styles.leftSide}>
                        <header>
                            <div className={`${styles.container} ${styles.menuBar}`}>
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
                        </header>

                        <div>
                            {children}
                        </div>
                    </div>

                    <div className={styles.rightSide}>
                        <GraphSideMenu />
                    </div>
                </div >
                <img src="/aub-logo.png" className={styles.aubLogo} />
                <img src="/beirut-logo.png" className={styles.beirutLogo} />
            {/* </PopupsContext.Provider> */}

            {popupContext.showPopups.login && <Popup
                popupStyle={styles.signinContainer}
                leftButtonText="SIGN UP INSTEAD"
                handleLeftButtonPress={() => popupContext.showPopup('register')}
                rightButtonText="SIGN IN"
                handleRightButtonPress={() => {
                    popupContext.closePopup()
                    router.push('/account')
                }}
            >
                <h2 className={styles.popupTitle}>LOGIN</h2>
                <form className={forms.contactForm}>


                    <div className={forms.formItem}>
                        <label className={forms.label}>EMAIL ADDRESS</label>
                        <input className={forms.formInput} type="text" />
                    </div>
                    <div className={forms.formItem}>
                        <label className={forms.label}>PASSWORD</label>
                        <input className={forms.formInput} type="text" />
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

            {popupContext.showPopups.register && <Popup
                popupStyle={styles.registerContainer}
                leftButtonText="LOGIN INSTEAD"
                handleLeftButtonPress={ () => popupContext.showPopup('login')}
                rightButtonText="REGISTER"
                handleRightButtonPress={popupContext.closePopup}
            >
                <h2 className={styles.popupTitle}>SIGN UP</h2>
                <form className={forms.contactForm}>
                    <div className={styles.registerGrid}>
                        <div>
                            <div className={forms.formItem}>
                                <label className={forms.label}>FIRST NAME</label>
                                <input className={forms.formInput} type="text" />
                            </div>

                            <div className={forms.formItem}>
                                <label className={forms.label}>LAST NAME</label>
                                <input className={forms.formInput} type="text" />
                            </div>

                            <div className={forms.formItem}>
                                <label className={forms.label}>MOBILE NUMBER</label>
                                <input className={forms.formInput} type="text" />
                            </div>
                        </div>

                        <div>
                            <div className={forms.formItem}>
                                <label className={forms.label}>EMAIL ADDRESS</label>
                                <input className={forms.formInput} type="text" />
                            </div>

                            <div className={forms.formItem}>
                                <label className={forms.label}>CREATE PASSWORD</label>
                                <input className={forms.formInput} type="text" />
                            </div>

                            <div className={forms.formItem}>
                                <label className={forms.label}>CONFIRM PASSWORD</label>
                                <input className={forms.formInput} type="text" />
                            </div>
                        </div>
                    </div>
                </form>
            </Popup>}
        </div>
    )
}
