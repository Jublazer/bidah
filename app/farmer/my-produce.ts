import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Produce from '@/lib/models/Produce';
import { authenticate } from '@/middleware';

export default authenticate(async function handler(req: any, res: NextApiResponse) {
  await connectDB();

  try {
    const user = req.user;

    if (user.userType !== 'farmer') {
      return res.status(403).json({
        success: false,
        error: 'Only farmers can access this endpoint'
      });
    }

    const { page = '1', limit = '10', status = 'all' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let query: any = { 'farmer.userId': user.userId };
    
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    const produces = await Produce.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Produce.countDocuments(query);
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        produces,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProduces: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });

  } catch (error) {
    console.error('Get farmer produces error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch produces' 
    });
  }
});