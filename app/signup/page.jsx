'use client'

import '../../styles/auth.css'
import { auth, db, getConfigs, handleFirebaseAuthError } from '../../fb'
import { GlobalContext } from '../context'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { Ring } from '@uiball/loaders'

//

const uniqueUsername = process.env.NEXT_PUBLIC_UNIQUE_USERNAME

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
            if(!JSON.parse(uniqueUsername))
                fetchUsername(e.target.value)
        }
    }


    const [showPassword, setShowPassword] = useState(false)

    const hadleShowPassword = () => setShowPassword(!showPassword)


    const [message, setMessage] = useState('')

    const handleMessage = (msg) => {
        setMessage(msg)
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

    const [usernameInUse, setUsernameInUse] = useState(false)

    const [fetchStatus, setFetchStatus] = useState({
        icon: null,
        color: null
    })

    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        if(usernameInUse === true) {
            handleMessage('error.usernameInUse')
            setFetchStatus({ icon: faXmark, color: '#ff0000' })
        } else {
            handleMessage('')
            setFetchStatus({ icon: faCheck, color: '#00ff00' })
        }
    }, [usernameInUse])

    const fetchUsername = async(username) => {
        if(username.length >= 3) {
            setFetching(true)
            let exists = false
            const querySnapshot = await getDocs(collection(db, "config"))
            querySnapshot.forEach((doc) => {
                if(username == doc.data().username) {
                    exists = true
                }
            })
            setUsernameInUse(exists)
            setFetching(false)
        } else {
            setMessage('')
        }
    }

    const signup = (e) => {
        e.preventDefault()
        if(validations() && !usernameInUse) {
            createUserWithEmailAndPassword(auth, form.email, form.password)
            .catch(error => handleMessage(handleFirebaseAuthError(error)))
        }
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
                        <div className='relative'>
                            <input className='full' type='text' name='username' placeholder='username' onChange={handleForm} />
                            {
                                !JSON.parse(uniqueUsername) && (
                                    <div className='inUse center'>
                                        {
                                            fetching
                                            ? <Ring size={40} lineWeight={5} speed={2} color="black" />
                                            : (
                                                form.username.length >= 3 && <FontAwesomeIcon className='inUse' icon={fetchStatus.icon} style={{color: fetchStatus.color}} />
                                            )
                                        }
                                    </div>
                                )
                            }
                            
                        </div>
                        <input type='email' name='email' placeholder='email' onChange={handleForm} />
                        <input type={showPassword ? 'text' : 'password'} name='password' placeholder='password' onChange={handleForm} />
                        <input type={showPassword ? 'text' : 'password'} name='confirmPass' placeholder='confirm password' onChange={handleForm} />
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