import mongoose, {Schema} from "mongoose";


// export interface Entry{
//     user: Schema.Types.ObjectId; // userId 
//     category: "electricity" | "travel" | "food" | "misc" ;
//     amount: number;
//     totalCarbon: number;
//     month: string;          // "2025‑06"
//     unit: string;           // "kWh", "km", "INR", etc.
//     createdAt: Date;
// }
export interface Entry{
    user: Schema.Types.ObjectId; // userId 
    category: {
        electricity: {
            amount: number;
            unit: "kWh" | "MWh";
        },
        travel: {
            amount: number;
            unit: "inr" | "usd";
        },
        food: {
            amount: number;
            unit: "inr" | "usd";
        },
        misc: {
            amount: number;
            unit: "inr" | "usd";
        },
    };
    totalCarbon: {
      Electricity: number; 
      Food: number;
      Travel: number; 
      Misc:  number;     
    };
    month: string;          // "2025‑06"
    createdAt: Date;
}


const entrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  category: {
    electricity: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true }, // e.g., kWh
    },
    travel: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true }, // e.g., km
    },
    food: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true }, // e.g., INR or kg
    },
    misc: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true }, // e.g., INR
    },
  },

  totalCarbon: {
      Electricity: {type: Number, required: false}, 
      Food:{type: Number, required: false}, 
      Travel: {type: Number, required: false}, 
      Misc:  {type: Number, required: false},    
    },

  month: {
    type: String,
    required: true,
    minlength: [6, "Month must be at least 6 characters long"], // e.g., "2025-07"
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const entryModel= mongoose.models.Entry as mongoose.Model<Entry> || mongoose.model<Entry>("Entry", entrySchema)

export default entryModel