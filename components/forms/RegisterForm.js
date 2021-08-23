import { useContext } from 'react';
import Popup from '../Popup';
import styles from '../../styles/Layout.module.css'
import * as forms from '../../styles/Contact.module.css'
import { PopupsContext } from '../../context/PopupContext';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/auth';
import { register as registerUser } from '../../services/auth/auth'

const RegisterForm = () => {
    const popupContext = useContext(PopupsContext);
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { authenticate } = useAuth();

    const onRegister = async (data) => {
        try {
            let res = await registerUser(data.firstname, data.lastname, data.mobile, data.email, data.password, data.password_confirmation);
            console.log(res)
            if (res?.data?.token) {
                if (authenticate(res.data.token)) {
                    popupContext.closePopup()
                }
            }
        } catch (err) {
            const keys = Object.keys(err.response.data.errors);
            if(keys) {
                keys.map(key => {
                    console.log(err.response.data.errors[key][0])
                    setError(key, {message: err.response.data.errors[key][0]})
                })
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
                        {errors?.firstname?.type === 'required' && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>Firstname is required</p>}
                        {errors?.firstname?.message && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>{errors.firstname.message}</p>}
                        <input className={forms.formInput} type="text"
                            value="Joe"
                            {...register('firstname', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>LAST NAME</label>
                        {errors?.lastname?.type === 'required' && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>Lastname is required</p>}
                        {errors?.firstname?.message && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>{errors.firstname.message}</p>}
                        <input className={forms.formInput} type="text"
                            value="Abdel Sater"
                            {...register('lastname', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>MOBILE NUMBER</label>
                        <input className={forms.formInput} type="text"
                            value="70123123"
                            {...register('mobile')} />
                    </div>
                </div>

                <div>
                    <div className={forms.formItem}>
                        <label className={forms.label}>EMAIL ADDRESS</label>
                        {errors?.email?.type === 'required' && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>Email is required</p>}
                        {errors?.email?.message && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>{errors.email.message}</p>}
                        <input className={forms.formInput} type="email"
                            value="joe@yllwdigital.com"
                            {...register('email', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>CREATE PASSWORD</label>
                        {errors?.password?.type === 'required' && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>Password is required</p>}
                        {errors?.password?.message && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>{errors.password.message}</p>}
                        <input className={forms.formInput} type="password"
                            value="password"
                            {...register('password', { required: true })} />
                    </div>

                    <div className={forms.formItem}>
                        <label className={forms.label}>CONFIRM PASSWORD</label>
                        {errors?.password_confirmation?.type === 'required' && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>Please confirm password</p>}
                        {errors?.password_confirmation?.message && <p style={{ color: 'red', display:'inline', marginLeft: 5 }}>{errors.password_confirmation.message}</p>}
                        <input className={forms.formInput} type="password"
                            value="password"
                            {...register('password_confirmation', { required: true })} />
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