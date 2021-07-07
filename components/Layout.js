import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import Header from './head/Header'
import GraphSideMenu from './GraphSideMenu.js'

export default function Layout({ children }) {
    return (
        <div>

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
                                        <Link href={"/"}>
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
        </div>
    )
}
