import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    };

    console.log('Connecting to MongoDB on Render...');
    console.log('MongoDB URI length:', MONGODB_URI.length);
    console.log('MongoDB URI starts with:', MONGODB_URI.substring(0, 20) + '...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully on Render');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error on Render:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB on Render:', e);
    console.error('Error details:', {
      name: e.name,
      message: e.message,
      code: e.code,
      stack: e.stack
    });
    throw e;
  }

  return cached.conn;
}

export default connectDB;