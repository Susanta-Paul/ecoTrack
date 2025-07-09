import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import entryModel from "@/models/entry";
import userModel from "@/models/user";
import { getServerSession } from "next-auth";




export async function POST(request:Request) {

    await dbConnect()

    
    const session=await getServerSession(authOptions)
    
    if(!session?.user?.id){
        return Response.json(
            {success: false, message: "Login first"},
            {status: 401}
        )
    }
    
    try {

        const {categoryData, month}=await request.json()

        // will calculate the carbon emissions using ClimateQ (later...)

        
        const newEntry= await entryModel.create({
            user: session.user.id,
            category: categoryData,
            month: month,
        })

        return Response.json(
            {success: true, message: "Entry successfully uploaded", newEntry: newEntry},
            {status: 201}
        )


    } catch (error) {

        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
        
    }

}


export async function GET(request:Request) {

    await dbConnect()

    const session=await getServerSession(authOptions)

    try {
        if(!session?.user?.id){
            return Response.json(
                {success: false, message: "Login First"},
                {status: 401}
            )
        }
    
        const allEntry= await entryModel.find({user: session.user.id}).sort({ createdAt: -1 })
    
        return Response.json(
            {success: true, allEntry: allEntry},
            {status: 200}
        )
    } catch (error) {
        console.log(error)
        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
    }
    
}