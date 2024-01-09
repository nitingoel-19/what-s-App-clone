import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const Login = () => {
    const[{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message));
    }

    return (
        <div className='bg-[#f8f8f8] h-screen w-screen grid place-items-center'>
            <div className='p-[100px] text-center bg-white rounded-xl shadow'>
                <img className='object-contain h-[100px] mb-10 mx-auto' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/480px-WhatsApp.svg.png" alt="logo" />
                <div className='login_text'>
                    <h1 className='font-bold text-2xl'>Sign in to WhatsApp</h1>
                </div>
                <Button className='!mt-[50px] text-transform-inherit !bg-[#0a8d48] !text-white' onClick={signIn} >Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
