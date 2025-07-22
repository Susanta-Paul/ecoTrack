"use client";

import {useSession, signOut} from "next-auth/react"
import { useRouter } from "next/navigation";


export default function Page(){

    const router=useRouter()

    const {data: session, status}=useSession()

    console.log(session, status)

    async function out() {
        await signOut({ redirect: false })
        router.push("/signin")
    }


    return(
        <div>
            This is the Home Page <br /><br />
            <button onClick={out} >Signout</button>
        </div>
    )
}