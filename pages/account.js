import Layout from '../components/Layout';
import styles from '../styles/ZonesLayout.module.css';
import Link from 'next/link'

export default function Account() {
    return (
        <Layout>
            <div className={styles.accountSectionContainer}>
                <div style={{ borderBottom: '1px solid' }}>
                    <div style={{ padding: '5.8rem 5.8rem 3rem' }}>
                        <h1 className={styles.pageTitle}>MY ACCOUNT</h1>
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

                            <Link href={""}>
                                EDIT PROFILE
                            </Link>
                        </div>
                    </div>
                </div>
            
                <div className={styles.profileSurverysSection}>
                    
                </div>  
            </div>

        </Layout>

    )
}
