import {useContext} from 'react';
// import styles from '../styles/Layout.module.css'
// import * as forms from '../styles/Contact.module.css'
import { PopupsContext } from '../context/PopupContext';

const Popup = (props) => {
    const { children } = props;
    const popupContext = useContext(PopupsContext)

    return (
        <div className='overlay'>
            <div className={`popupContainer ${props.popupStyle}`}>
                <img src="/close.png" className='closeBtn' onClick={popupContext.closePopup} />
                {children}

                {(props.rightButtonText || props.leftButtonText) && <div className='inlineButtons'>
                    {props.leftButtonText && <button className={`submitBtn buttonClear`} onClick={props.handleLeftButtonPress}>{props.leftButtonText}</button>}
                    {props.rightButtonText && <button className='submitBtn' onClick={props.handleRightButtonPress}>{props.rightButtonText}</button>}
                </div>}
            </div>
        </div>
    )
}

export default Popup;