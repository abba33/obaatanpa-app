const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '+233123456789',
  password: 'password123',
  userType: 'pregnant',
  location: {
    city: 'Accra',
    region: 'Greater Accra'
  }
};

let authToken = '';

// Test functions
const testHealth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
};

const testSignup = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, testUser);
    console.log('✅ Signup passed:', response.data.message);
    return response.data.data.token;
  } catch (error) {
    console.log('❌ Signup failed:', error.response?.data?.error || error.message);
    return null;
  }
};

const testLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login passed:', response.data.message);
    return response.data.data.token;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data?.error || error.message);
    return null;
  }
};

const testChatbot = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/chatbot`, {
      message: 'Hello, I need help with pregnancy nutrition'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Chatbot passed:', response.data.data.response);
  } catch (error) {
    console.log('❌ Chatbot failed:', error.response?.data?.error || error.message);
  }
};

const testSymptomTracking = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/symptom-tracking`, {
      symptom: 'Morning sickness',
      severity: 'moderate',
      notes: 'Experiencing nausea in the morning'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Symptom tracking passed:', response.data.message);
  } catch (error) {
    console.log('❌ Symptom tracking failed:', error.response?.data?.error || error.message);
  }
};

const testJournal = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/journal`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Journal passed:', response.data.data.entries.length, 'entries found');
  } catch (error) {
    console.log('❌ Journal failed:', error.response?.data?.error || error.message);
  }
};

const testAppointments = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/appointments`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Appointments passed:', response.data.data.appointments.length, 'appointments found');
  } catch (error) {
    console.log('❌ Appointments failed:', error.response?.data?.error || error.message);
  }
};

const testBookAppointment = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/book-appointment`, {
      practitionerId: 'test-practitioner-id',
      appointmentDate: '2024-01-20',
      appointmentTime: '10:00 AM',
      reason: 'Regular prenatal checkup',
      notes: 'First trimester checkup'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Book appointment passed:', response.data.message);
  } catch (error) {
    console.log('❌ Book appointment failed:', error.response?.data?.error || error.message);
  }
};

const testGetMe = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Get profile passed:', response.data.data.user.firstName);
  } catch (error) {
    console.log('❌ Get profile failed:', error.response?.data?.error || error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting API tests...\n');

  // Test health endpoint
  await testHealth();
  console.log('');

  // Test signup
  const signupToken = await testSignup();
  console.log('');

  // Test login
  const loginToken = await testLogin();
  console.log('');

  // Use the token from login or signup
  const token = loginToken || signupToken;

  if (token) {
    // Test protected endpoints
    await testGetMe(token);
    console.log('');

    await testChatbot(token);
    console.log('');

    await testSymptomTracking(token);
    console.log('');

    await testJournal(token);
    console.log('');

    await testAppointments(token);
    console.log('');

    await testBookAppointment(token);
    console.log('');
  }

  console.log('🏁 API tests completed!');
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests }; 