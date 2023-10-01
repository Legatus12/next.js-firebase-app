'use client'

import { redirect, useRouter } from "next/navigation"
import { auth } from "../../fb"
import { useContext } from "react"
import { GlobalContext } from "../context"

//

export default function DashboardPage() {

    return(
        <div className="frame center-y">
            <p>This is your dashboard.</p>
            <br />
            <button onClick={() => auth.signOut()}>log out</button>
        </div>
    )
}