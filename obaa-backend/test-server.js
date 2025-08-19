const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Obaatanpa API is running',
    timestamp: new Date().toISOString(),
    environment: 'test'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Mock user endpoints
app.post('/api/users/signup', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please check your email to verify your account.',
    data: {
      user: {
        id: 'test-user-id',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userType: req.body.userType,
        status: 'pending_verification',
        emailVerified: false
      },
      token: 'mock-jwt-token'
    }
  });
});

app.post('/api/users/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: 'test-user-id',
        firstName: 'Test',
        lastName: 'User',
        email: req.body.email,
        userType: 'pregnant',
        status: 'active',
        emailVerified: true,
        lastLogin: new Date().toISOString()
      },
      token: 'mock-jwt-token'
    }
  });
});

app.post('/api/users/chatbot', (req, res) => {
  res.json({
    success: true,
    data: {
      response: 'Hello! I\'m your Obaatanpa assistant. How can I help you today?',
      timestamp: new Date().toISOString(),
      context: req.body.context || {}
    }
  });
});

app.post('/api/users/symptom-tracking', (req, res) => {
  res.json({
    success: true,
    message: 'Symptom tracked successfully',
    data: {
      symptom: req.body.symptom,
      severity: req.body.severity,
      notes: req.body.notes,
      date: req.body.date || new Date().toISOString(),
      userId: 'test-user-id'
    }
  });
});

app.get('/api/users/journal', (req, res) => {
  res.json({
    success: true,
    data: {
      entries: [
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
      ],
      pagination: {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        total: 2
      }
    }
  });
});

app.post('/api/users/book-appointment', (req, res) => {
  res.json({
    success: true,
    message: 'Appointment booked successfully',
    data: {
      id: Date.now(),
      userId: 'test-user-id',
      practitionerId: req.body.practitionerId,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      reason: req.body.reason,
      notes: req.body.notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  });
});

app.get('/api/users/appointments', (req, res) => {
  res.json({
    success: true,
    data: {
      appointments: [
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
      ],
      pagination: {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        total: 2
      }
    }
  });
});

app.get('/api/users/me', (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: 'test-user-id',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+233123456789',
        userType: 'pregnant',
        status: 'active',
        emailVerified: true,
        profilePicture: null,
        location: {
          city: 'Accra',
          region: 'Greater Accra',
          country: 'Ghana'
        },
        dateOfBirth: '1990-01-01',
        pregnancyProfile: {
          dueDate: '2024-06-15',
          currentWeek: 12,
          trimester: 1
        },
        preferences: {
          language: 'en',
          notifications: {
            email: true,
            sms: true,
            push: true
          }
        },
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Obaatanpa Test API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📝 API Documentation: Check the README.md file`);
});

module.exports = app; 