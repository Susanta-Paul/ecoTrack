"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page(){

    const [username, setUsername]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [errorMsg, setErrorMsg]=useState("")

    const router=useRouter();

    async function handleSubmit(e: any){
        e.preventDefault()

        const result= await signIn("credentials", {
            redirect: false,
            username, 
            password
        })

        if(result?.ok){
            router.push("/home")
        }else if(result?.error){
            setErrorMsg(result.error)
        }
    }


    return(
        <div>
            <div className="w-screen h-screen flex justify-center items-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>
                            <h1
                            className="text-3xl font-bold"
                            >Welcome to EcoTrack</h1>
                            </CardTitle>
                        <CardDescription>
                        Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                            <label htmlFor="username" className=" font-bold">Username</label>
                            <input
                            className="border border-white rounded-sm h-9"
                                id="username"
                                type="text"
                                placeholder="username"
                                required
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                            />
                            <label htmlFor="email" className=" font-bold">Email</label>
                            <input
                            className="border border-white rounded-sm h-9"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            </div>
                            <div className="grid gap-2">
                            <div className="flex items-center">
                                <label htmlFor="password" className="font-bold">Password</label>
                            </div>
                            <input 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                             className="border border-white rounded-sm h-9"   
                            id="password" type="password" required />
                            
                            <p className="text-red-500 text-md"> {errorMsg} </p>
                            <Button type="submit" className="w-full cursor-pointer">
                                Create Account
                            </Button></div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <p>Already have an account?</p>
                        <Link href="/signin" className=""><Button variant="outline" >
                            Login
                        </Button></Link>
                    </CardFooter>
                    </Card>

            </div>
            
        </div>
    )
}