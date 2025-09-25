import mongoose, { Document, Schema, Model } from 'mongoose';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'bank-transfer' | 'card' | 'wallet' | 'cash-on-delivery';

export interface IOrder extends Document {
  orderNumber: string;
  buyer: {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
  };
  farmer: {
    userId: mongoose.Types.ObjectId;
    name: string;
    phone: string;
    location: {
      state: string;
      city: string;
      address: string;
    };
  };
  produce: {
    produceId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    unit: string;
    images: string[];
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: 'NGN' | 'USD';
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  deliveryAddress: {
    contactName: string;
    phone: string;
    state: string;
    city: string;
    address: string;
    landmarks?: string;
    coordinates?: [number, number];
  };
  deliveryDate?: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  specialInstructions?: string;
  cancellationReason?: string;
  refundReason?: string;
  farmerNotes?: string;
  buyerRating?: {
    rating: number;
    comment?: string;
    createdAt: Date;
  };
  farmerRating?: {
    rating: number;
    comment?: string;
    createdAt: Date;
  };
  trackingNumber?: string;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  finalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  buyer: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  farmer: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    location: {
      state: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      }
    }
  },
  produce: {
    produceId: {
      type: Schema.Types.ObjectId,
      ref: 'Produce',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    images: [String]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0.1, 'Quantity must be at least 0.1']
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative']
  },
  currency: {
    type: String,
    default: 'NGN',
    enum: ['NGN', 'USD']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['bank-transfer', 'card', 'wallet', 'cash-on-delivery']
  },
  paymentReference: String,
  deliveryAddress: {
    contactName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    landmarks: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  deliveryDate: Date,
  estimatedDelivery: Date,
  actualDelivery: Date,
  specialInstructions: String,
  cancellationReason: String,
  refundReason: String,
  farmerNotes: String,
  buyerRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: Date
  },
  farmerRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: Date
  },
  trackingNumber: String,
  shippingCost: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cost cannot be negative']
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: [0, 'Tax amount cannot be negative']
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: [0, 'Discount amount cannot be negative']
  },
  finalAmount: {
    type: Number,
    required: true,
    min: [0, 'Final amount cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for order age (days since creation)
OrderSchema.virtual('orderAge').get(function(this: IOrder) {
  const created = this.createdAt;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for isDelayed
OrderSchema.virtual('isDelayed').get(function(this: IOrder) {
  if (this.estimatedDelivery && this.status !== 'delivered') {
    return new Date() > this.estimatedDelivery;
  }
  return false;
});

// Indexes for better query performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ 'buyer.userId': 1, createdAt: -1 });
OrderSchema.index({ 'farmer.userId': 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'deliveryAddress.state': 1 });

// Middleware to generate order number before save
OrderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get count of orders today for sequential number
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    
    const orderCount = await mongoose.model('Order').countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    
    this.orderNumber = `KID${year}${month}${day}${String(orderCount + 1).padStart(4, '0')}`;
    
    // Calculate final amount
    this.finalAmount = this.totalPrice + this.shippingCost + this.taxAmount - this.discountAmount;
  }
  next();
});

// Static method to get orders by buyer
OrderSchema.statics.findByBuyer = function(buyerId: string, filters: any = {}) {
  return this.find({ 'buyer.userId': buyerId, ...filters }).sort({ createdAt: -1 });
};

// Static method to get orders by farmer
OrderSchema.statics.findByFarmer = function(farmerId: string, filters: any = {}) {
  return this.find({ 'farmer.userId': farmerId, ...filters }).sort({ createdAt: -1 });
};

// Static method to get sales statistics
OrderSchema.statics.getSalesStats = function(farmerId: string, startDate?: Date, endDate?: Date) {
  const match: any = { 'farmer.userId': farmerId, status: 'delivered' };
  
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = startDate;
    if (endDate) match.createdAt.$lte = endDate;
  }
  
  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$finalAmount' },
        averageOrderValue: { $avg: '$finalAmount' }
      }
    }
  ]);
};

// Instance method to update status with validation
OrderSchema.methods.updateStatus = function(newStatus: OrderStatus, notes?: string) {
  const validTransitions: { [key in OrderStatus]: OrderStatus[] } = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered', 'cancelled'],
    delivered: ['refunded'],
    cancelled: [],
    refunded: []
  };

  if (!validTransitions[this.status].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
  }

  this.status = newStatus;
  
  // Set timestamps for specific status changes
  const now = new Date();
  if (newStatus === 'shipped') {
    this.estimatedDelivery = new Date(now.setDate(now.getDate() + 3)); // 3 days delivery estimate
  } else if (newStatus === 'delivered') {
    this.actualDelivery = new Date();
  } else if (newStatus === 'cancelled' && notes) {
    this.cancellationReason = notes;
  }

  return this.save();
};

// Instance method to add buyer rating
OrderSchema.methods.addBuyerRating = function(rating: number, comment?: string) {
  if (this.status !== 'delivered') {
    throw new Error('Can only rate delivered orders');
  }
  
  this.buyerRating = {
    rating,
    comment,
    createdAt: new Date()
  };
  
  return this.save();
};

// Instance method to add farmer rating
OrderSchema.methods.addFarmerRating = function(rating: number, comment?: string) {
  if (this.status !== 'delivered') {
    throw new Error('Can only rate delivered orders');
  }
  
  this.farmerRating = {
    rating,
    comment,
    createdAt: new Date()
  };
  
  return this.save();
};

export default mongoose.models.Order as Model<IOrder> || mongoose.model<IOrder>('Order', OrderSchema);