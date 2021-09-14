import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Layout.module.css'

export default function FloatingTa({ children, title }) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(prev => !prev)
    }
    return (
        <div className='floatingTab'>
            <div className='tabTitle' onClick={handleToggle}>
                <FontAwesomeIcon icon={faChevronDown} style={{ width: 20, marginRight: 15 }} />
                <h2>{title}</h2>
            </div>

            {open && <div className='tabContent'>
                {children}
            </div>}
        </div>
    )
}