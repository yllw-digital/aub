import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import * as contactStyles from '../styles/Contact.module.css';


export default function About() {
    return (
        <Layout>
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>CONTACT US</h1>

                <div className={contactStyles.gridHalf}>
                    <div>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <form className={contactStyles.contactForm}>
                            <div className={contactStyles.formItem}>
                                <label className={contactStyles.label}>YOUR NAME</label>
                                <input className={contactStyles.formInput} type="text" />
                            </div>

                            <div className={contactStyles.formItem}>
                                <label className={contactStyles.label}>EMAIL ADDRESS</label>
                                <input className={contactStyles.formInput} type="text" />
                            </div>

                            <div className={contactStyles.formItem}>
                                <label className={contactStyles.label}>YOUR MESSAGE</label>
                                <textarea className={contactStyles.formTextarea} placeholder="Tell us more"></textarea>
                            </div>

                            <div className={contactStyles.formItem}>
                                <label className={contactStyles.label}>REASON</label>
                                <select className={contactStyles.formInput} >
                                    <option>Pick a reason</option>
                                </select>
                            </div>

                            <button type="submit" className={contactStyles.submitBtn}>SUBMIT</button>
                        </form>
                    </div>

                    <div>
                        <div className={contactStyles.contactDetailsContainer}>
                            <div className={contactStyles.info}>
                                <img src="/location-icon.png" />
                                <p>Raymond Ghosn Building, American University of Beirut, Maroun Semaan Faculty of Engineering and Architecture</p>
                            </div>
                            <div className={contactStyles.info}>
                                <img src="/phone-icon.png" />
                                <p>RT. +961-1-374374 ext: 3603</p>
                            </div>
                            <div className={contactStyles.info}>
                                <img src="/email-icon.png" />
                                <p>E. cityoftenants@aub.edu.lb </p>
                            </div>
                            <div className={contactStyles.info}>
                                <img src="/mailbox-icon.png" />
                                <p>PO Box. 11-0236, Riad El Solh, 1107 2020, Beirut Lebanon</p>
                            </div>
                        </div>

                        <div className={contactStyles.map}>
                            <img src="/contact-map.png" />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>

    )
}
