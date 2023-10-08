import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, collection, query, where, onSnapshot, addDoc, deleteDoc, updateDoc, orderBy, limit, getDoc, getDocs, setDoc } from 'firebase/firestore'


const app = initializeApp({
    /*your firebase app config*/
})

//const analytics = getAnalytics(app);

export const auth = getAuth(app)

export const db = getFirestore(app)

export const handleFirebaseAuthError = (error) => {
    console.log(error.code)
    switch (error.code) {
        case 'auth/user-not-found':
            return('error.userNotFound')
        case 'auth/wrong-password':
            return('error.wrongPassword')
        case 'auth/missing-password':
            return('error.missingPassword')
        case 'auth/invalid-email':
            return('error.invalidEmail')
        case 'auth/invalid-login-credentials':
            return('error.invalidLoginCredentials')
        case 'auth/user-disabled':
            return('error.userDisabled')
        case 'auth/email-already-in-use':
            return('error.alreadyInUse')
        default:
            return('error.default')
    }
}

//