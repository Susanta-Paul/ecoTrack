import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { signUpSchema } from "@/schema/signUpSchema";
import bcrypt from "bcryptjs";
import { success } from "zod/v4";


export async function POST(request: Request){

    await dbConnect()

    try {
        const body= await request.json()

        const parsed= signUpSchema.safeParse(body)
        if(!parsed.success){
            return Response.json(
                {
                success: false,
                message: parsed.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const {username, email, password}= body

        const existingUser= await userModel.findOne({
            $or: [{username}, {email}]
        })

        if(existingUser){
            return Response.json(
                {success: false, message: "Username and/or already exists"},
                {status: 409 }
            )
        }

        const hashedPassword= await bcrypt.hash(password, 10)

        try {

            const newUser= await userModel.create({username, email, password: hashedPassword})

            return Response.json(
                {success: true, message: "User Successfully Created", newUser},
                {status: 201}
            )

        } catch (error) {
            return Response.json(
                {success: false, error: error},
                {status: 500}
            )
        }


    } catch (error) {

        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
        
    }
}