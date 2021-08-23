import { useContext } from 'react';
import Popup from '../Popup';
import styles from '../../styles/Layout.module.css'
import * as forms from '../../styles/Contact.module.css'
import { PopupsContext } from '../../context/PopupContext';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/auth';
import { register as registerUser} from '../../services/auth/auth'

const RegisterForm = () => {
    const popupContext = useContext(PopupsContext);
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const {authenticate} = useAuth();

    const onRegister = async (data) => {
        console.log(data);
    
        let res = await registerUser(data.firstname, data.lastname, data.mobile, data.email, data.password, data.password_confirmation);
        if(res?.data?.token) {
            if(authenticate(token)) {
                popupContext.closePopup()
            }
        }
    }

    return <Popup popupStyle={styles.registerContainer}>
        <h2 className={styles.popupTitle}>SIGN UP</h2>
        <form className={forms.contactForm} onSubmit={handleSubmit(onRegister)}>
            <div className={styles.registerGrid}>
                <div>
                    <div className={forms.formItem}>
                        <label className={forms.label}>FIRST NAME</label>
                        <input className={forms.formInput} type="text" value="Joe" {...register('firstname', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>LAST NAME</label>
                        <input className={forms.formInput} type="text" value="Abdel Sater" {...register('lastname', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>MOBILE NUMBER</label>
                        <input className={forms.formInput} type="text" value="70123123" {...register('mobile')} />
                    </div>
                </div>

                <div>
                    <div className={forms.formItem}>
                        <label className={forms.label}>EMAIL ADDRESS</label>
                        <input className={forms.formInput} type="email" value="joe@yllwdigital.com" {...register('email', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>CREATE PASSWORD</label>
                        <input className={forms.formInput} type="password" value="password" {...register('password', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>CONFIRM PASSWORD</label>
                        <input className={forms.formInput} type="password" value="password" {...register('password_confirmation', { required: true })} />
                    </div>
                </div>
            </div>
            
            <div className={styles.inlineButtons}>
                <button className={`${forms.submitBtn} ${forms.buttonClear}`} onClick={() => { popupContext.showPopup('login') }}>LOGIN INSTEAD</button>
                <button className={forms.submitBtn} type="submit">REGISTER</button>
            </div>
        </form>
    </Popup>
}

export default RegisterForm;