import CredentialsProvider  from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import dbConnect from "./dbConnect"
import userModel from "@/models/user"
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions={
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", type:"text"},
                password: {label: "password", type: "password"}
            },

            async authorize(credentials) {
                
                if(!credentials?.username || !credentials?.password){
                    throw new Error("All the fields are required")
                }

                try {
                    
                    await dbConnect()

                    const user=await userModel.findOne({username: credentials.username})

                    if(!user){
                        throw new Error("No user Found")
                    }

                    const isMatch=await bcrypt.compare(credentials.password, user.password)

                    if(!isMatch){
                        throw new Error("InCorrect Password")
                    }

                    return {
                        id: user._id.toString(),
                        username: user.username
                    }


                } catch (error) {
                    console.log(error)
                    throw new Error("Error in Authorizing User")
                }
            }
        })
    ],
    callbacks: {

        async jwt({token, user}) {

            if(user){
                token.user=user.id
            }

            return token
        },

        async session({session, token}){

            if(session.user){
                session.user.id=token.id as string
            }
            return session
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
        newUser: "/signup"
    },
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60 // 30days in seconds
    },
    secret: process.env.NEXTAUTH_SECRET
}