import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Produce from '@/lib/models/Produce';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const produce = await Produce.findById(params.id);
    
    if (!produce) {
      return NextResponse.json(
        { success: false, error: 'Produce not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: produce
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch produce' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Handle PUT request
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Handle DELETE request
}