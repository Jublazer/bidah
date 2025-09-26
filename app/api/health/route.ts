import { NextResponse } from 'next/server';
import connectDB, { getConnectionStatus, listCollections } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    
    const status = getConnectionStatus();
    const collections = await listCollections();
    
    return NextResponse.json({
      success: true,
      database: {
        status,
        name: 'bidah',
        collections,
        connection: 'mongodb://localhost:27017/bidah'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error.message,
      connection: 'mongodb://localhost:27017/bidah'
    }, { status: 500 });
  }
}