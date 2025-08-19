# Obaatanpa Backend API

A Node.js + Express + MongoDB backend for the Obaatanpa maternal care platform.

## Features

- User authentication and authorization
- Email verification
- JWT token-based authentication
- Rate limiting
- CORS support
- Error handling middleware
- MongoDB integration

## API Endpoints

### User Management

#### POST `/api/users/signup`
Register a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+233123456789",
  "password": "password123",
  "userType": "pregnant",
  "dateOfBirth": "1990-01-01",
  "location": {
    "city": "Accra",
    "region": "Greater Accra"
  }
}
```

#### POST `/api/users/verify`
Verify user email with token.

**Request Body:**
```json
{
  "token": "verification_token_here"
}
```

#### POST `/api/users/login`
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/users/me`
Get current user profile (requires authentication).

### Chatbot

#### POST `/api/users/chatbot`
Interact with the chatbot (requires authentication).

**Request Body:**
```json
{
  "message": "Hello, I need help with pregnancy nutrition",
  "context": {}
}
```

### Symptom Tracking

#### POST `/api/users/symptom-tracking`
Track symptoms (requires authentication).

**Request Body:**
```json
{
  "symptom": "Morning sickness",
  "severity": "moderate",
  "notes": "Experiencing nausea in the morning",
  "date": "2024-01-15"
}
```

### Journal

#### GET `/api/users/journal`
Get user's journal entries (requires authentication).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

### Appointments

#### POST `/api/users/book-appointment`
Book an appointment (requires authentication).

**Request Body:**
```json
{
  "practitionerId": "practitioner_id_here",
  "appointmentDate": "2024-01-20",
  "appointmentTime": "10:00 AM",
  "reason": "Regular prenatal checkup",
  "notes": "First trimester checkup"
}
```

#### GET `/api/users/appointments`
Get user's appointments (requires authentication).

**Query Parameters:**
- `status` (optional): Filter by status
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env
```

3. Update `.env` file with your configuration:
- Set your MongoDB connection string
- Configure JWT secret
- Set up email credentials
- Update frontend URL

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: JWT token expiration time
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `FRONTEND_URL`: Frontend application URL

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Error Handling

All errors return a consistent format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

All successful responses return:
```json
{
  "success": true,
  "message": "Optional message",
  "data": {
    // Response data
  }
}
``` 