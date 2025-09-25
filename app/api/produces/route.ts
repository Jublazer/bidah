import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Produce from '@/lib/models/Produce';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    const query: any = { isActive: true };
    if (category) query.category = category;
    
    const produces = await Produce.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    
    return NextResponse.json({
      success: true,
      data: produces
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch produces' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Authentication check would go here
    const produce = new Produce(body);
    await produce.save();
    
    return NextResponse.json(
      { success: true, data: produce },
      { status: 201 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create produce' },
      { status: 500 }
    );
  }
}