import Layout from '../components/Layout';
// import styles from '../components/ZonesLayout.module.css';

export default function About() {
    return (
        <Layout>
                <div className='pageContainer' >
                    <h1 className='pageTitle'>ABOUT</h1>

                    <p className='text'>
                        The City of Tenants map is a user-fed geoportal developed by the Beirut Urban Lab at the American University of Beirut. The project is by “tenants for tenants” initiative that advocates for better visibility of rental market trends and conditions by making rental data publicly available for researchers and city-dwellers looking to understand the condition of shelter acquisition. The map logs rental costs in relation to housing conditions for rented-out units, hence building a knowledge database about tenancy conditions. Units are logged only if they are occupied, providing those looking to rent the possibility to gauge how much they should expect to pay in relation to size, location, quality, and other attributes. The database is not targeted to realtors and does not seek to inform about possible commercial rental options for those looking to rent out units. On the long run, the City of Tenants database will also act as a monitor, tracing the changes in Beirut’s rental market.</p>
                        <br/>

                        <p className='text'>
                        The project conception builds on earlier research in Beirut and other cities, which has demonstrated the substantial negative impacts of rental market opacity for those looking for shelter. We believe that by placing information in the hands of home seekers about existing rather than asking prices, we empower those looking for shelter to make choices that serve their needs best. The pilot map extends only in the municipal districts of Beirut. The long-term ambition is for the map to expand to the outskirts of the city and to other cities across Lebanon.
                        </p>
                        <br/>


                        <p className='text'>
                        City of Tenants is part of the Beirut Built Environment Database initiative, a project by the Beirut Urban Lab at the American University of Beirut.
                        </p>
                        <br/>

                        <p className='text'>
                        “City of Tenants” serves a data aggregator of rental conditions and arrangements in Beirut. We only collect information on the conditions of leased units, rental values and additional costs. We also collect data on geographic locations and household composition. We privilege information security of our users and their data.
                        </p>
                        <br/>

                        <p className='text'>
                        Therefore, we will not relay any indicator of the users’ identity or the apartment’s exact location to the public. Personal or sensitive information collected through this survey will not be aggregated in the public database of our website and will not be made publicly available. Other general results will be published in aggregate and available to the public. Signing in is only required to verify user and allow user to fill multiple surveys. The email address will not be used at any point or linked to the survey. Filled surveys will be collected in a pool of other surveys to maintain anonymity of user.
                        Our team reviews the contributions made on the site and removes inappropriate content regularly. We are not responsible for data sent by users.
                        </p>
                        <br/>

                        <p className='text'>
                        This is an ongoing project. The data is expanding and changing regularly. We do not provide any guarantees about the accuracy of the information provided on the site.
                        </p>
                        <br/>
                        <p className='text'>
                        This is an ongoing project. The data is expanding and changing regularly. We do not provide any guarantees about the accuracy of the information provided on the site.
                    </p>
            </div>
        </Layout>

    )
}
