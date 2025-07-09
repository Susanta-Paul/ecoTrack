import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({req, token})=>{
                const {pathname}= req.nextUrl
                if(
                    pathname==="signin" ||
                    pathname=="signup" ||
                    pathname==="/"
                ){
                    return true
                }
                
                return !!token

            }
        }
    }

)

export const config={
    matcher: [
        "/ ((?!_next/static|_next/image|favicon.ico|public/).*)"
    ]
}