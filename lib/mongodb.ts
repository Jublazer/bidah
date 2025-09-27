
// Updated 

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bidah';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to your local MongoDB Compass database
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('🚀 Using cached MongoDB connection to localhost:27017/bidah');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('🔌 Connecting to local MongoDB: mongodb://localhost:27017/kidah');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ Successfully connected to local MongoDB!');
        console.log('📊 Database: kidah');
        console.log('📁 Collections: users, produces, orders, blog');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        console.log('💡 Troubleshooting tips:');
        console.log('1. Make sure MongoDB is running: mongod');
        console.log('2. Check if port 27017 is available');
        console.log('3. Verify the database name is correct');
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

/**
 * Check connection status
 */
export function getConnectionStatus(): string {
  switch (mongoose.connection.readyState) {
    case 0: return 'disconnected';
    case 1: return 'connected';
    case 2: return 'connecting';
    case 3: return 'disconnecting';
    default: return 'unknown';
  }
}

/**
 * Get database instance
 */
export function getDatabase() {
  return mongoose.connection.db;
}

/**
 * List all collections (for debugging)
 */
export async function listCollections() {
  try {
    const db = getDatabase();
    const collections = await db.listCollections().toArray();
    return collections.map(col => col.name);
  } catch (error) {
    console.error('Error listing collections:', error);
    return [];
  }
}

// Event listeners for better debugging
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB Compass (localhost:27017/kidah)');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Close connection on app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

export default connectDB;