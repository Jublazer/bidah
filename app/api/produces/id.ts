import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDB from '../../../lib/mongodb';
import Produce from '../../../lib/models/Produce';
import { authenticate, optionalAuth } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectDB();

  try {
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid produce ID'
      });
    }

    switch (req.method) {
      case 'GET':
        return getProduce(req, res, id as string);
      case 'PUT':
        return authenticate(updateProduce)(req, res, id as string);
      case 'DELETE':
        return authenticate(deleteProduce)(req, res, id as string);
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({ 
          success: false, 
          error: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    console.error('Produce API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

// GET /api/produce/[id] - Get single produce details
async function getProduce(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const produce = await Produce.findById(id);

    if (!produce) {
      return res.status(404).json({
        success: false,
        error: 'Produce not found'
      });
    }

    if (!produce.isActive) {
      return res.status(404).json({
        success: false,
        error: 'This produce listing is no longer available'
      });
    }

    // Increment views
    await produce.incrementViews();

    res.status(200).json({
      success: true,
      data: produce
    });

  } catch (error) {
    console.error('Get produce error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch produce details' 
    });
  }
}

// PUT /api/produce/[id] - Update produce listing
async function updateProduce(req: any, res: NextApiResponse, id: string) {
  try {
    const user = req.user;
    const updates = req.body;

    const produce = await Produce.findById(id);
    if (!produce) {
      return res.status(404).json({
        success: false,
        error: 'Produce not found'
      });
    }

    // Check ownership
    if (produce.farmer.userId.toString() !== user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this produce'
      });
    }

    // Prevent updating certain fields if orders exist
    if (produce.ordersCount > 0) {
      const restrictedFields = ['price', 'unit', 'qualityGrade'];
      const attemptedRestrictedUpdate = Object.keys(updates).some(field => 
        restrictedFields.includes(field)
      );
      
      if (attemptedRestrictedUpdate) {
        return res.status(400).json({
          success: false,
          error: 'Cannot update price, unit, or quality grade after orders have been placed'
        });
      }
    }

    // Update produce
    Object.assign(produce, updates);
    produce.updatedAt = new Date();

    const updatedProduce = await produce.save();

    res.status(200).json({
      success: true,
      data: updatedProduce,
      message: 'Produce updated successfully'
    });

  } catch (error: any) {
    console.error('Update produce error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    res.status(500).json({ 
      success: false, 
      error: 'Failed to update produce' 
    });
  }
}

// DELETE /api/produce/[id] - Delete produce listing (soft delete)
async function deleteProduce(req: any, res: NextApiResponse, id: string) {
  try {
    const user = req.user;

    const produce = await Produce.findById(id);
    if (!produce) {
      return res.status(404).json({
        success: false,
        error: 'Produce not found'
      });
    }

    // Check ownership
    if (produce.farmer.userId.toString() !== user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this produce'
      });
    }

    // Soft delete by setting isActive to false
    produce.isActive = false;
    await produce.save();

    res.status(200).json({
      success: true,
      message: 'Produce listing deleted successfully'
    });

  } catch (error) {
    console.error('Delete produce error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete produce' 
    });
  }
}