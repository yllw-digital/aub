import Layout from '../components/Layout';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePassword } from '../services/auth/auth'
import { useRouter } from 'next/router'

export default function resetPassword() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [text, setText] = useState("");
    const router = useRouter()
    const {token} = router.query;
    
    const onReset = async (data) => {
        try {
            let res = await changePassword(data.password, data.confirm_password, token);
            setText("Password has successfully been changed");
        } catch (err) {
            if (err.response.data.errors) {
                const keys = Object.keys(err.response.data.errors) ?? null;
                setText("");
                if (keys) {
                    keys.map(key => {
                        console.log(err.response.data.errors[key][0])
                        setError(key, { message: err.response.data.errors[key][0] })
                    })
                }
            } else {
                setText("Token does not exist, password not reset.")
            }
        }
    }
    return (
        // <Layout>
        <div className='signinContainer margin-0'>
            <h2 className='popupTitle'>RESET PASSWORD</h2>
            <form className='contactForm' onSubmit={handleSubmit(onReset)}>
                <div className="formItem">
                    <p className="text-center">{text}</p>
                </div>
                <div className='formItem'>
                    <label className='label'>NEW PASSWORD</label>
                    {errors?.password?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>The new password is required</p>}
                    {errors?.password?.message && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>{errors.password.message}</p>}
                    <input className='formInput' type="password"
                        {...register('password', { required: true })} />
                </div>

                <div className='formItem'>
                    <label className='label'>NEW PASSWORD CONFIRMATION</label>
                    {errors?.confirm_password?.type === 'required' && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>The new password is required</p>}
                    {errors?.confirm_password?.message && <p style={{ color: 'red', display: 'inline', marginLeft: 5 }}>{errors.confirm_password.message}</p>}
                    <input className='formInput' type="password"
                        {...register('confirm_password', { required: true })} />
                </div>

                <div className='inlineButtons'>
                    <button className='submitBtn' type="submit">RESET PASSWORD</button>
                </div>
            </form>
        </div>
    )
}