import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import entryModel from "@/models/entry";
import { getServerSession } from "next-auth";


export async function GET(request: Request,
    { params }: { params: { month: string } }
){

    await dbConnect()
    
    const session=await getServerSession(authOptions)

    if(!session?.user?.id){
        return Response.json(
            {success: false, message: "Login first"},
            {status: 401}
        )
    }

    try {
        const {month}= params
    
        const entryOfPerticularUser= await entryModel.findOne({
            user: session.user.id, month
        })
    
        return Response.json(
            {success: true, data: entryOfPerticularUser},
            {status: 200}
        )
    } catch (error) {
        console.error(error)
        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
    }

}