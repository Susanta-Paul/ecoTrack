import mongoose, {Schema} from "mongoose";


export interface Entry{
    user: Schema.Types.ObjectId; // userId 
    category: "electricity" | "travel" | "food" | "misc" ;
    amount: number;
    totalCarbon: number;
    month: string;          // "2025‑06"
    unit: string;           // "kWh", "km", "INR", etc.
    createdAt: Date;
}


const entrySchema= new Schema<Entry>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        enum: ["electricity" , "travel" , "food" , "misc"],
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    totalCarbon: {
        type: Number,
    },
    month: {
        type: String,
        required: true,
        minlength: [6, "Month must be at least 6 character long"]
    },
    unit: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true   // can't be changed after creation
    }
})

const entryModel= mongoose.models.Entry as mongoose.Model<Entry> || mongoose.model<Entry>("Entry", entrySchema)

export default entryModel