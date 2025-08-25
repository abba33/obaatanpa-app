# MongoDB Setup Guide for Obaa Backend

## Option 1: MongoDB Atlas (Cloud - Recommended for Development)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new cluster (free tier)

### Step 2: Configure Database
1. Create a database named `obaatanpa`
2. Create a user with username and password
3. Get your connection string

### Step 3: Update Environment Variables
Update your `.env` file:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/obaatanpa?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### Step 1: Download MongoDB Community Server
1. Go to https://www.mongodb.com/try/download/community
2. Select Windows and download the MSI installer
3. Run the installer and follow the setup wizard

### Step 2: Start MongoDB Service
```bash
# Start MongoDB service
net start MongoDB

# Or start manually
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
```

### Step 3: Create Database
```bash
# Connect to MongoDB
mongosh

# Create database
use obaatanpa

# Create collections
db.createCollection('users')
db.createCollection('appointments')
db.createCollection('journals')
db.createCollection('symptoms')
```

## Option 3: Docker (Alternative)

### Step 1: Install Docker Desktop
1. Download from https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop

### Step 2: Run MongoDB Container
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

## Testing the Connection

After setup, test your MongoDB connection:

```bash
# Navigate to backend directory
cd obaa-backend

# Install dependencies (if not done)
npm install

# Start the server
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/obaatanpa
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Troubleshooting

### Common Issues:
1. **MongoDB not starting**: Check if the service is running
2. **Connection refused**: Ensure MongoDB is running on port 27017
3. **Authentication failed**: Check username/password in connection string

### Useful Commands:
```bash
# Check if MongoDB is running
netstat -an | findstr 27017

# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB
``` 