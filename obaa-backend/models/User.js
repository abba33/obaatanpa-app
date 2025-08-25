const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  
  // User Type and Status
  userType: {
    type: String,
    required: [true, 'User type is required'],
    enum: {
      values: ['pregnant', 'new_mother', 'hospital', 'practitioner'],
      message: 'User type must be pregnant, new_mother, hospital, or practitioner'
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending_verification'],
    default: 'pending_verification'
  },
  
  // Profile Information
  profilePicture: {
    type: String,
    default: null
  },
  location: {
    city: String,
    region: String,
    country: { type: String, default: 'Ghana' },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  
  // Pregnancy-specific fields
  pregnancyProfile: {
    dueDate: Date,
    lastMenstrualPeriod: Date,
    currentWeek: {
      type: Number,
      min: 1,
      max: 42
    },
    trimester: {
      type: Number,
      min: 1,
      max: 3
    },
    isHighRisk: {
      type: Boolean,
      default: false
    },
    complications: [String],
    previousPregnancies: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  
  // New Mother-specific fields
  motherProfile: {
    babyBirthDate: Date,
    babyName: String,
    babyGender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say']
    },
    feedingType: {
      type: String,
      enum: ['breastfeeding', 'formula', 'mixed'],
      default: 'breastfeeding'
    },
    deliveryType: {
      type: String,
      enum: ['vaginal', 'cesarean', 'assisted']
    },
    postpartumWeeks: Number
  },
  
  // Hospital-specific fields
  hospitalProfile: {
    hospitalName: String,
    licenseNumber: String,
    address: {
      street: String,
      city: String,
      region: String,
      postalCode: String
    },
    services: [String],
    specialties: [String],
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String }
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  
  // Practitioner-specific fields
  practitionerProfile: {
    title: {
      type: String,
      enum: ['Dr', 'Nurse', 'Midwife', 'Specialist', 'Other']
    },
    specialty: String,
    licenseNumber: String,
    yearsOfExperience: {
      type: Number,
      min: 0
    },
    qualifications: [String],
    hospitalAffiliation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    consultationFee: {
      amount: Number,
      currency: { type: String, default: 'GHS' }
    },
    availableHours: {
      monday: [{ start: String, end: String }],
      tuesday: [{ start: String, end: String }],
      wednesday: [{ start: String, end: String }],
      thursday: [{ start: String, end: String }],
      friday: [{ start: String, end: String }],
      saturday: [{ start: String, end: String }],
      sunday: [{ start: String, end: String }]
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  
  // Verification
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Password Reset
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Preferences
  preferences: {
    language: {
      type: String,
      enum: ['en', 'tw', 'ak', 'ga', 'ee'],
      default: 'en'
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'private', 'friends_only'],
        default: 'private'
      },
      shareDataForResearch: { type: Boolean, default: false }
    }
  },
  
  // Activity tracking
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
userSchema.index({ userType: 1 });
userSchema.index({ status: 1 });
userSchema.index({ 'location.city': 1, 'location.region': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for current pregnancy week (for pregnant users)
userSchema.virtual('currentPregnancyWeek').get(function() {
  if (this.userType === 'pregnant' && this.pregnancyProfile.lastMenstrualPeriod) {
    const now = new Date();
    const lmp = new Date(this.pregnancyProfile.lastMenstrualPeriod);
    const diffTime = Math.abs(now - lmp);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.min(diffWeeks, 42);
  }
  return null;
});

// Virtual for baby age (for new mothers)
userSchema.virtual('babyAgeWeeks').get(function() {
  if (this.userType === 'new_mother' && this.motherProfile.babyBirthDate) {
    const now = new Date();
    const birthDate = new Date(this.motherProfile.babyBirthDate);
    const diffTime = Math.abs(now - birthDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  }
  return null;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Pre-save middleware to update timestamps
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance method to create email verification token
userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

module.exports = mongoose.model('User', userSchema);
