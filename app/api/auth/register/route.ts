import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { email, password, userType, profile } = body;

    if (!email || !password || !userType || !profile) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    const user = new User({
      email,
      password,
      userType,
      profile: {
        ...profile,
        location: {
          ...profile.location,
          coordinates: null
        }
      }
    });

    const savedUser = await user.save();
    const token = generateToken({
      userId: savedUser._id.toString(),
      email: savedUser.email,
      userType: savedUser.userType
    });

    const userData = savedUser.toObject();
    delete userData.password;

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: { user: userData, token }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}