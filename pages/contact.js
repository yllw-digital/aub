import Layout from '../components/Layout';
// import styles from '../styles/ZonesLayout.module.css';
// import * as contactStyles from '../styles/Contact.module.css';


export default function About() {
    return (
        <Layout>
            <div className='pageContainer'>
                <h1 className='pageTitle'>CONTACT US</h1>

                <div className='gridHalf'>
                    <div>
                        <p className='text'>
                        Have any questions? We’d love to hear from you!</p>

                        <form className='contactForm'>
                            <div className='formItem'>
                                <label className='label'>YOUR NAME</label>
                                <input className='formInput' type="text" />
                            </div>

                            <div className='formItem'>
                                <label className='label'>EMAIL ADDRESS</label>
                                <input className='formInput' type="text" />
                            </div>

                            <div className='formItem'>
                                <label className='label'>PHONE</label>
                                <input className='formInput' type="text" />
                            </div>

                            <div className='formItem'>
                                <label className='label'>ORGANIZATION</label>
                                <input className='formInput' type="text" />
                            </div>

                            <div className='formItem'>
                                <label className='label'>YOUR MESSAGE</label>
                                <textarea className='formTextarea' placeholder="Tell us more"></textarea>
                            </div>

                            {/* <div className='formItem'>
                                <label className='label'>REASON</label>
                                <select className='formInput' >
                                    <option>Pick a reason</option>
                                </select>
                            </div> */}

                            <button type="submit" className='submitBtn'>SUBMIT</button>
                        </form>
                    </div>

                    <div>
                        <div className='contactDetailsContainer'>
                            <div className='info'>
                                <img src="/location-icon.png" />
                                <p>Raymond Ghosn Building, American University of Beirut, Maroun Semaan Faculty of Engineering and Architecture</p>
                            </div>
                            <div className='info'>
                                <img src="/phone-icon.png" />
                                <p>RT. +961-1-374374 ext: 3603</p>
                            </div>
                            <div className='info'>
                                <img src="/email-icon.png" />
                                <p>E. cityoftenants@aub.edu.lb </p>
                            </div>
                            <div className='info'>
                                <img src="/mailbox-icon.png" />
                                <p>PO Box. 11-0236, Riad El Solh, 1107 2020, Beirut Lebanon</p>
                            </div>
                        </div>

                        <div className='map'>
                            <img src="/contact-map.png" />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>

    )
}
