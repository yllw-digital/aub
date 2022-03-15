
const ScrollList = ({router, handleScroll, selectedIndex}) => {

    return <>
        <div className='stats-container'>
            <div className='stats-header'>
                <h1>Graphs List</h1>

                <div style={{ textAlign: 'center', paddingTop: 20 }}>
                    <button className='submitBtn buttonClear' onClick={() => { router.push({pathname: '/'}) }}>Back to map</button>
                </div>
            </div>

            <ul className='graphList'>
                <li className={selectedIndex == 0 ? 'active-stat' : ''} onClick={() => handleScroll(0)}>Building Age vs Rental Value</li>
                <li className={selectedIndex == 1 ? 'active-stat' : ''} onClick={() => handleScroll(1)}>Building Age vs Contract Type</li>
                <li className={selectedIndex == 2 ? 'active-stat' : ''} onClick={() => handleScroll(2)}>Number of Bedrooms vs Rental Value</li>
                <li className={selectedIndex == 3 ? 'active-stat' : ''} onClick={() => handleScroll(3)}>Number of Bathrooms vs Rental Value</li>
                <li className={selectedIndex == 4 ? 'active-stat' : ''} onClick={() => handleScroll(4)}>Building Status vs Rental Value</li>
                <li className={selectedIndex == 5 ? 'active-stat' : ''} onClick={() => handleScroll(5)}>Building Condition vs Rental Value</li>
                <li className={selectedIndex == 6 ? 'active-stat' : ''} onClick={() => handleScroll(6)}>Rental Arrangements / Contract Type</li>
                <li className={selectedIndex == 7 ? 'active-stat' : ''} onClick={() => handleScroll(7)}>Zone / Number of household members</li>
                <li className={selectedIndex == 8 ? 'active-stat' : ''} onClick={() => handleScroll(8)}>Number of bedrooms / Rent Count</li>
                <li className={selectedIndex == 9 ? 'active-stat' : ''} onClick={() => handleScroll(9)}>Rental Value Distribution</li>
                <li className={selectedIndex == 10 ? 'active-stat' : ''} onClick={() => handleScroll(10)}>Old contract count</li>
                <li className={selectedIndex == 11 ? 'active-stat' : ''} onClick={() => handleScroll(10)}>Furnished apartments count</li>
            </ul>



        </div>

    </>
}

export default ScrollList;