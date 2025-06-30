import mongoose from "mongoose";


let cached=global.mongoose

if(!cached){
    cached=global.mongoose={conn: null, promise: null}
}

export default async function dbConnect() {
    
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise= mongoose.connect(process.env.MONGO_URI!).then(()=> mongoose.connection )
    }

    try {
        cached.conn= await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn
}