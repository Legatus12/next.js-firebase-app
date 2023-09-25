'use client'

import '../../styles/auth.css'
import { auth, db, getConfigs, handleFirebaseAuthError } from '../fb'
import { GlobalContext } from '../context'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'

//

export default function SignupPage() {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    const handleForm = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        if([e.target.name] == 'username') {
            findUsername(e.target.value)
        }
    }


    const [showPassword, setShowPassword] = useState(false)

    const hadleShowPassword = () => setShowPassword(!showPassword)


    const [message, setMessage] = useState('')

    const handleMessage = (msg) => {
        setMessage(msg)
    }


    const signup = (e) => {
        e.preventDefault()
        if(validations() && !usernameInUse) {
            createUserWithEmailAndPassword(auth, form.email, form.password)
            .catch(error => handleMessage(handleFirebaseAuthError(error)))
        }
    }

    const validations = () => {
        if(form.username.length < 3) {
            handleMessage('error.usernameLength')
            return false
        } else if (form.password != form.confirmPass) {
            handleMessage('error.passwordMatch')
            return false
        } else if (form.password.length < 4) {
            handleMessage('error.passwordLength')
            return false
        }
        return true
    }

    const [usernameInUse, setUsernameInUse] = useState(true)

    useEffect(() => {
        usernameInUse ? handleMessage('error.usernameInUse') : handleMessage('')
    }, [usernameInUse])

    const findUsername = async(username) => {
        let exists = false
        const querySnapshot = await getDocs(collection(db, "config"))
        querySnapshot.forEach((doc) => {
            if(username == doc.data().username) {
                exists = true
            }
        })
        setUsernameInUse(exists)
    }

    //

    return(
        <div className='frame center'>
            <div className='login center-y'>
                <div className='form-container center-y'>
                    <div>
                        <h1>Create an account.</h1>
                        <p>additional text</p>
                    </div>
                    <form className='center-y' onSubmit={signup}>
                        <input type='text' name='username' placeholder='username' onChange={handleForm} />
                        <input type='email' name='email' placeholder='email' onChange={handleForm} />
                        <input type={showPassword ? 'text' : 'password'} name='password' placeholder='password' onChange={handleForm} className='full' />
                        <input type={showPassword ? 'text' : 'password'} name='confirmPass' placeholder='confirm password' onChange={handleForm} className='full' />
                        <div className='show-password'>
                                <input type="checkbox" checked={showPassword} onChange={hadleShowPassword} />
                                <label>show password</label>
                            </div>
                        <div className='error center'>
                            <p className='w-full'>{message}</p>
                        </div>
                        <input type='submit' className='submit' value={'signup'} />
                    </form>
                    <div className='link-container center'>
                        <span>Already have an acount?</span>
                        <Link className='link' href={'/login'}>Log in here.</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}