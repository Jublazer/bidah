import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb'
import User from '../../../lib/models/User';
import { generateToken } from '../../../lib/auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  await connectDB();

  try {
    const { email, password, userType, profile } = req.body;

    // Validation
    if (!email || !password || !userType || !profile) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Create user
    const user = new User({
      email,
      password, // Will be hashed by the pre-save middleware
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

    // Generate JWT token
    const token = generateToken({
      userId: savedUser._id.toString(),
      email: savedUser.email,
      userType: savedUser.userType
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: savedUser.toObject(),
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}