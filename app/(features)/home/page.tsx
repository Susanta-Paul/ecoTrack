"use client"

import {useSession, signOut} from "next-auth/react"
import { useRouter } from "next/navigation";
import OverallEmissionChart from "@/helpComponents/OverallEmissionChart";


export default function Page(){

    const router=useRouter()

    const {data: session, status}=useSession()

    // console.log(session, status)

    async function out() {
        await signOut({ redirect: false })
        router.push("/signin")
    }


    return(
        <div className="w-full pt-7 px-5 ">
            <div className="">
                <h1 className="text-3xl font-bold md:text-5xl">Hi, {session?.user.username} </h1>
                <p className="text-gray-300 mt-2 md:text-xl">Here's your complete sustainability snapshot - Updated at Latest</p>
            </div>

            <div>
                <OverallEmissionChart/>
            </div>
        </div>
    )
}