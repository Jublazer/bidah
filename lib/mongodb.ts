// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bidah';
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }

// if(!process.env.MONGODB_URI){
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if(process.env.NODE_ENV === 'development'){
//   if(!global._mongoClientPromise){
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// }else{
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;


// Mongoose approach
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bidah';     
if(!MONGODB_URI){
    throw new Error('Please add your Mongo URI to .env.local');
}   
let cached = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = { conn: null, promise: null };
}   

async function connectDB(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: false,
        };
       cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
           return mongoose;
       });
   }
   cached.conn = await cached.promise;
   return cached.conn;
}

export default connectDB;
