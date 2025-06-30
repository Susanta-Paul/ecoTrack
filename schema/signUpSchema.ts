import {z} from "zod"


export const signUpSchema= z.object({
    username: z
            .string()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username can be at most 20 characters"),

    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, "Password must be at least 8 character long")
        
})