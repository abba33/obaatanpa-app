const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendVerificationEmail } = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      userType,
      dateOfBirth,
      location,
      pregnancyProfile,
      motherProfile,
      hospitalProfile,
      practitionerProfile
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      userType,
      dateOfBirth,
      location,
      pregnancyProfile,
      motherProfile,
      hospitalProfile,
      practitionerProfile
    });

    // Generate verification token
    const verificationToken = user.createEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(user, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the signup if email fails
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          status: user.status,
          emailVerified: user.emailVerified
        },
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during signup'
    });
  }
};

// @desc    Verify email
// @route   POST /api/users/verify
// @access  Public
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Verification token is required'
      });
    }

    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
    }

    // Update user
    user.emailVerified = true;
    user.status = 'active';
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Generate new token
    const newToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          status: user.status,
          emailVerified: user.emailVerified
        },
        token: newToken
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during email verification'
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update login info
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          status: user.status,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
};

// @desc    Chatbot interaction
// @route   POST /api/users/chatbot
// @access  Private
const chatbot = async (req, res) => {
  try {
    const { message, context } = req.body;
    const userId = req.user.id;

    // Simple chatbot logic - you can enhance this
    let response = '';
    
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = 'Hello! I\'m your Obaatanpa assistant. How can I help you today?';
    } else if (message.toLowerCase().includes('pregnancy') || message.toLowerCase().includes('pregnant')) {
      response = 'I can help you with pregnancy-related questions. What specific information do you need?';
    } else if (message.toLowerCase().includes('nutrition') || message.toLowerCase().includes('food')) {
      response = 'Nutrition is crucial during pregnancy. I can provide guidance on healthy eating habits.';
    } else if (message.toLowerCase().includes('appointment') || message.toLowerCase().includes('booking')) {
      response = 'I can help you book appointments with healthcare providers. Would you like to schedule one?';
    } else {
      response = 'I\'m here to help with your maternal health journey. Please ask me about pregnancy, nutrition, appointments, or any other health-related questions.';
    }

    res.json({
      success: true,
      data: {
        response,
        timestamp: new Date().toISOString(),
        context: context || {}
      }
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error in chatbot'
    });
  }
};

// @desc    Track symptoms
// @route   POST /api/users/symptom-tracking
// @access  Private
const trackSymptom = async (req, res) => {
  try {
    const { symptom, severity, notes, date } = req.body;
    const userId = req.user.id;

    // For now, we'll just return success
    // You can implement actual symptom tracking logic here
    const symptomEntry = {
      symptom,
      severity,
      notes,
      date: date || new Date(),
      userId
    };

    res.json({
      success: true,
      message: 'Symptom tracked successfully',
      data: symptomEntry
    });
  } catch (error) {
    console.error('Symptom tracking error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error in symptom tracking'
    });
  }
};

// @desc    Get user's journal entries
// @route   GET /api/users/journal
// @access  Private
const getJournalEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    // Mock journal entries - you can implement actual journal logic
    const journalEntries = [
      {
        id: 1,
        title: 'First Prenatal Visit',
        content: 'Had my first prenatal visit today. Everything looks good!',
        date: new Date().toISOString(),
        mood: 'happy',
        tags: ['prenatal', 'health']
      },
      {
        id: 2,
        title: 'Morning Sickness',
        content: 'Experiencing morning sickness. Trying ginger tea.',
        date: new Date(Date.now() - 86400000).toISOString(),
        mood: 'uncomfortable',
        tags: ['symptoms', 'morning-sickness']
      }
    ];

    res.json({
      success: true,
      data: {
        entries: journalEntries,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: journalEntries.length
        }
      }
    });
  } catch (error) {
    console.error('Get journal entries error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting journal entries'
    });
  }
};

// @desc    Book appointment
// @route   POST /api/users/book-appointment
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const {
      practitionerId,
      appointmentDate,
      appointmentTime,
      reason,
      notes
    } = req.body;
    const userId = req.user.id;

    // Mock appointment booking - you can implement actual booking logic
    const appointment = {
      id: Date.now(),
      userId,
      practitionerId,
      appointmentDate,
      appointmentTime,
      reason,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error booking appointment'
    });
  }
};

// @desc    Get user's appointments
// @route   GET /api/users/appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    // Mock appointments - you can implement actual appointment fetching
    const appointments = [
      {
        id: 1,
        practitionerName: 'Dr. Sarah Johnson',
        practitionerType: 'Obstetrician',
        appointmentDate: '2024-01-15',
        appointmentTime: '10:00 AM',
        reason: 'Regular prenatal checkup',
        status: 'confirmed',
        location: 'Accra Medical Center'
      },
      {
        id: 2,
        practitionerName: 'Nurse Mary Addo',
        practitionerType: 'Midwife',
        appointmentDate: '2024-01-20',
        appointmentTime: '2:00 PM',
        reason: 'Ultrasound scan',
        status: 'pending',
        location: 'Korle Bu Teaching Hospital'
      }
    ];

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: appointments.length
        }
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting appointments'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          userType: user.userType,
          status: user.status,
          emailVerified: user.emailVerified,
          profilePicture: user.profilePicture,
          location: user.location,
          dateOfBirth: user.dateOfBirth,
          pregnancyProfile: user.pregnancyProfile,
          motherProfile: user.motherProfile,
          hospitalProfile: user.hospitalProfile,
          practitionerProfile: user.practitionerProfile,
          preferences: user.preferences,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting profile'
    });
  }
};

module.exports = {
  signup,
  verifyEmail,
  login,
  chatbot,
  trackSymptom,
  getJournalEntries,
  bookAppointment,
  getUserAppointments,
  getMe
}; 