import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Produce from '@/lib/models/Produce';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query: any = {};
    
    if (type === 'buying' || type === 'all') {
      query['buyer.userId'] = user.userId;
    }
    
    if (type === 'selling' || (type === 'all' && user.userType === 'farmer')) {
      if (type === 'all') {
        query = { $or: [
          { 'buyer.userId': user.userId },
          { 'farmer.userId': user.userId }
        ]};
      } else {
        query['farmer.userId'] = user.userId;
      }
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalOrders: total
        }
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    
    const { produceId, quantity, paymentMethod, deliveryAddress, specialInstructions } = body;

    if (!produceId || !quantity || !paymentMethod || !deliveryAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (user.userType !== 'buyer') {
      return NextResponse.json(
        { success: false, error: 'Only buyers can place orders' },
        { status: 403 }
      );
    }

    const produce = await Produce.findById(produceId);
    if (!produce || !produce.isActive) {
      return NextResponse.json(
        { success: false, error: 'Produce not available' },
        { status: 404 }
      );
    }

    if (quantity > produce.availableQuantity) {
      return NextResponse.json(
        { success: false, error: `Only ${produce.availableQuantity} ${produce.unit} available` },
        { status: 400 }
      );
    }

    // Calculate order totals
    const unitPrice = produce.price;
    const totalPrice = unitPrice * quantity;
    const shippingCost = calculateShippingCost(produce.farmer.location.state, deliveryAddress.state);
    const taxAmount = totalPrice * 0.075;
    const finalAmount = totalPrice + shippingCost + taxAmount;

    const order = new Order({
      buyer: {
        userId: user.userId,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone
      },
      farmer: produce.farmer,
      produce: {
        produceId: produce._id,
        name: produce.name,
        price: unitPrice,
        unit: produce.unit,
        images: produce.images
      },
      quantity,
      unitPrice,
      totalPrice,
      paymentMethod,
      deliveryAddress,
      specialInstructions,
      shippingCost,
      taxAmount,
      finalAmount
    });

    const savedOrder = await order.save();
    
    // Update produce quantity
    await produce.updateQuantity(quantity);

    return NextResponse.json(
      { 
        success: true, 
        data: savedOrder,
        message: 'Order placed successfully'
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

function calculateShippingCost(fromState: string, toState: string): number {
  const rates = { same_state: 500, middlebelt: 1000, other_region: 2000 };
  if (fromState === toState) return rates.same_state;
  
  const middlebeltStates = ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'Taraba'];
  const isFromMiddlebelt = middlebeltStates.includes(fromState);
  const isToMiddlebelt = middlebeltStates.includes(toState);

  return (isFromMiddlebelt && isToMiddlebelt) ? rates.middlebelt : rates.other_region;
}