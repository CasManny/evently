import mongoose, { mongo } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;


let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async () => {
    if (cached.conn) return cached.con;

    if (!MONGODB_URL) throw new Error('MONGODB_URL IS MISSING')
    
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'eventmeet',
        bufferCommands: false,
    })
    cached.conn = await cached.promise;
    return cached.conn;
}

