import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    const order = await Order.findById(params.id).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const isAuthorized = order.buyer.userId.toString() === user.userId || 
                        order.farmer.userId.toString() === user.userId;

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    const body = await request.json();
    const { action, status, notes, rating, comment } = body;

    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const isFarmer = order.farmer.userId.toString() === user.userId;
    const isBuyer = order.buyer.userId.toString() === user.userId;

    if (!isFarmer && !isBuyer) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 403 }
      );
    }

    let updatedOrder;

    if (action === 'updateStatus' && status && isFarmer) {
      updatedOrder = await order.updateStatus(status, notes);
    } else if (action === 'rate' && rating !== undefined) {
      if (order.status !== 'delivered') {
        return NextResponse.json(
          { success: false, error: 'Can only rate delivered orders' },
          { status: 400 }
        );
      }
      if (isBuyer) {
        updatedOrder = await order.addFarmerRating(rating, comment);
      } else if (isFarmer) {
        updatedOrder = await order.addBuyerRating(rating, comment);
      }
    } else if (action === 'cancel' && isBuyer) {
      if (!['pending', 'confirmed'].includes(order.status)) {
        return NextResponse.json(
          { success: false, error: 'Order cannot be cancelled at this stage' },
          { status: 400 }
        );
      }
      updatedOrder = await order.updateStatus('cancelled', notes);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully'
    });

  } catch (error: any) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}