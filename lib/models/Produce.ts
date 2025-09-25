import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduce extends Document {
  name: string;
  description: string;
  category: 'grains' | 'tubers' | 'vegetables' | 'fruits' | 'livestock' | 'dairy' | 'poultry';
  variety?: string;
  price: number;
  currency: 'NGN' | 'USD';
  unit: 'kg' | 'bag' | 'ton' | 'crate' | 'piece' | 'dozen' | 'liter';
  quantity: number;
  availableQuantity: number;
  minOrder: number;
  maxOrder: number;
  images: string[];
  qualityGrade: 'premium' | 'standard' | 'economy';
  certification?: 'organic' | 'non-gmo' | 'fair-trade' | 'local';
  harvestDate: Date;
  expiryDate?: Date;
  storageTips?: string;
  farmer: {
    userId: mongoose.Types.ObjectId;
    name: string;
    phone: string;
    location: {
      state: string;
      city: string;
      address: string;
      coordinates?: [number, number];
    };
    rating?: number;
    totalSales?: number;
  };
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  ordersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProduceSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Produce name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: true,
    enum: ['grains', 'tubers', 'vegetables', 'fruits', 'livestock', 'dairy', 'poultry']
  },
  variety: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'NGN',
    enum: ['NGN', 'USD']
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'bag', 'ton', 'crate', 'piece', 'dozen', 'liter']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  availableQuantity: {
    type: Number,
    required: true,
    min: [0, 'Available quantity cannot be negative']
  },
  minOrder: {
    type: Number,
    default: 1,
    min: [0, 'Minimum order cannot be negative']
  },
  maxOrder: {
    type: Number,
    validate: {
      validator: function(this: IProduce, value: number) {
        return value === 0 || value >= this.minOrder;
      },
      message: 'Maximum order must be 0 (unlimited) or greater than minimum order'
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function(images: string[]) {
        return images.length <= 10;
      },
      message: 'Cannot have more than 10 images'
    }
  }],
  qualityGrade: {
    type: String,
    required: true,
    enum: ['premium', 'standard', 'economy']
  },
  certification: {
    type: String,
    enum: ['organic', 'non-gmo', 'fair-trade', 'local']
  },
  harvestDate: {
    type: Date,
    required: [true, 'Harvest date is required']
  },
  expiryDate: {
    type: Date,
    validate: {
      validator: function(this: IProduce, value: Date) {
        return !value || value > this.harvestDate;
      },
      message: 'Expiry date must be after harvest date'
    }
  },
  storageTips: {
    type: String,
    maxlength: [500, 'Storage tips cannot be more than 500 characters']
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
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    }
  },
  tags: [{
    type: String,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  ordersCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for freshness (days since harvest)
ProduceSchema.virtual('freshness').get(function(this: IProduce) {
  const harvest = this.harvestDate;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - harvest.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for isExpired
ProduceSchema.virtual('isExpired').get(function(this: IProduce) {
  return this.expiryDate ? new Date() > this.expiryDate : false;
});

// Indexes for better query performance
ProduceSchema.index({ category: 1, isActive: 1, createdAt: -1 });
ProduceSchema.index({ 'farmer.userId': 1, isActive: 1 });
ProduceSchema.index({ price: 1 });
ProduceSchema.index({ tags: 1 });
ProduceSchema.index({ 'farmer.location.state': 1 });
ProduceSchema.index({ harvestDate: 1 });
ProduceSchema.index({ isFeatured: 1, createdAt: -1 });

// Middleware to set availableQuantity equal to quantity on create
ProduceSchema.pre('save', function(next) {
  if (this.isNew) {
    this.availableQuantity = this.quantity;
  }
  next();
});

// Static method to get active produces with filters
ProduceSchema.statics.findActive = function(filters: any = {}) {
  const query = { isActive: true, ...filters };
  return this.find(query);
};

// Static method to get produces by farmer
ProduceSchema.statics.findByFarmer = function(farmerId: string) {
  return this.find({ 'farmer.userId': farmerId, isActive: true });
};

// Instance method to update quantity after order
ProduceSchema.methods.updateQuantity = function(orderedQuantity: number) {
  if (orderedQuantity > this.availableQuantity) {
    throw new Error('Insufficient quantity available');
  }
  
  this.availableQuantity -= orderedQuantity;
  
  // Auto-deactivate if no quantity left
  if (this.availableQuantity <= 0) {
    this.isActive = false;
  }
  
  return this.save();
};

// Instance method to increment views
ProduceSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

export default mongoose.models.Produce as Model<IProduce> || mongoose.model<IProduce>('Produce', ProduceSchema);