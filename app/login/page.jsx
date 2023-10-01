"use client"

import '../../styles/auth.css'
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, handleFirebaseAuthError } from '../../fb'
import { GlobalContext } from '../context'

//

export default function LoginPage() {

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleForm = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const [showPassword, setShowPassword] = useState(false)

    const hadleShowPassword = () => setShowPassword(!showPassword)
    

    const [message, setMessage] = useState('')

    const handleMessage = (msg) => setMessage(msg)
    

    const login = (e) => {
        e.preventDefault()
        if(validations()) {
            signInWithEmailAndPassword(auth, form.email, form.password)
            .catch(error => handleMessage(handleFirebaseAuthError(error)))
        }
    }
    
    const validations = () => {
        return true
    }

    //

    return(
        <div className="frame center">
            <div className='login center-y'>
                <div className='form-container center-y'>
                    <div>
                        <h1>Welcome</h1>
                        <p>additional text</p>
                    </div>
                    <form className="center-y" onSubmit={login}>
                        <input type="email" name='email' placeholder="email" onChange={handleForm} />
                        <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" onChange={handleForm} />
                        <div className='between-x'>
                            <div className='show-password'>
                                <input type="checkbox" checked={showPassword} onChange={hadleShowPassword} />
                                <label>show password</label>
                            </div>
                            <Link className='link' href={'/recover'}>Forgot your password?</Link>
                        </div>
                        <div className='error center'>
                            <p className='w-full'>{message}</p>
                        </div>
                        <input type="submit" className='submit' value={'login'} />
                    </form>
                    <div className='link-container center'>
                        <span>First time?</span>
                        <Link className='link' href={'/signup'}>Create an account.</Link>
                    </div>
                </div>
                <br />
                <button className='google center' onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
                     or continue with <FontAwesomeIcon icon={faGoogle} />oogle
                </button>
            </div>
        </div>
    )
}