import mongoose, {Schema} from "mongoose";

export interface User {
    username: string;
    email: string;
    password: string;
}


const userSchema =new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "usernmame must be at least 4 character long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [13, "Email must be at least 13 character long"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 character long"]
    }
})


const userModel= (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema )

export default userModel