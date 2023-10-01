import { getAuth, onAuthStateChanged } from "firebase/auth"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "./fb"

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl
    console.log(pathname)

    if(auth.currentUser)
        console.log('A')
    else 
        console.log('B')

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard'
}