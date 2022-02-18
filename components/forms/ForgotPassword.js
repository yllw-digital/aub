import { useContext, useState } from 'react';
import Popup from '../Popup';
import { PopupsContext } from '../../context/PopupContext';
import { useForm } from "react-hook-form";
import { resetPassword } from '../../services/auth/auth'

const ForgotPassword = () => {
    const popupContext = useContext(PopupsContext);
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [text,setText] = useState("A link to reset your password will be sent to your email address");

    const onReset = async (data) => {
        try {
            let res = await resetPassword(data.email);
            console.log(res)
            setText("Reset password instruction has been sent to your email address");
        } catch (err) {
            const keys = Object.keys(err.response.data.errors);
            if (keys) {
                keys.map(key => {
                    console.log(err.response.data.errors[key][0])
                    setError(key, { message: err.response.data.errors[key][0] })
                })
            }

        }
    }

    return <Popup popupStyle='signinContainer'>
        <h2 className='popupTitle'>FORGOT PASSWORD?</h2>
        <form className='contactForm' onSubmit={handleSubmit(onReset)}>
            <div className="formItem">
                <p className="text-center">{text}</p>
            </div>
            <div className='formItem'>
                <label className='label'>EMAIL</label>
                {errors?.email?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>email is required</p>}
                {errors?.email?.message && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>{errors.email.message}</p>}
                <input className='formInput' type="text"
                    {...register('email', { required: true })} />
            </div>


            <div className='inlineButtons'>
                <button className='submitBtn buttonClear' onClick={() => { popupContext.closePopup() }}>CANCEL</button>
                <button className='submitBtn' type="submit">RESET PASSWORD</button>
            </div>
        </form>
    </Popup>
}

export default ForgotPassword;