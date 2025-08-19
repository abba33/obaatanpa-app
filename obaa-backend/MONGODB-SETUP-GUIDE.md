# 🗄️ MongoDB Setup Guide for Obaa Backend

## 🚀 Quick Start Options

### Option 1: MongoDB Atlas (Cloud - Easiest) ⭐ RECOMMENDED

**Step 1: Create Atlas Account**
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" and sign up
3. Create a free cluster (Shared, M0)

**Step 2: Configure Database**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

**Step 3: Update .env File**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/obaatanpa?retryWrites=true&w=majority
```

**Step 4: Test Connection**
```bash
node test-db-connection.js
```

---

### Option 2: Local MongoDB Installation

**Step 1: Download MongoDB**
1. Go to https://www.mongodb.com/try/download/community
2. Select "Windows" and "msi"
3. Download and run the installer

**Step 2: Start MongoDB Service**
```bash
# Start MongoDB service
net start MongoDB

# Or check if it's running
netstat -an | findstr 27017
```

**Step 3: Test Connection**
```bash
node test-db-connection.js
```

---

### Option 3: Docker (Advanced)

**Step 1: Install Docker Desktop**
1. Download from https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop

**Step 2: Run MongoDB Container**
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

**Step 3: Test Connection**
```bash
node test-db-connection.js
```

---

## 🔧 Environment Configuration

### Update .env File
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database - Choose one:
MONGODB_URI=mongodb://localhost:27017/obaatanpa
# OR for Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/obaatanpa?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=obaatanpa_jwt_secret_key_2024_make_this_very_long_and_secure
JWT_EXPIRE=30d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🧪 Testing Your Setup

### Test Database Connection
```bash
node test-db-connection.js
```

### Test API Endpoints
```bash
# Start the server
npm run dev

# In another terminal, test the API
node test-api.js
```

---

## 🚨 Troubleshooting

### Common Issues:

**1. Connection Refused**
```bash
# Check if MongoDB is running
netstat -an | findstr 27017

# Start MongoDB service
net start MongoDB
```

**2. Authentication Failed**
- Check username/password in connection string
- Verify user has proper permissions

**3. Network Error (Atlas)**
- Check internet connection
- Verify IP whitelist in Atlas
- Check connection string format

---

## 📚 Next Steps

After MongoDB is set up:

1. **Test the connection**: `node test-db-connection.js`
2. **Start the server**: `npm run dev`
3. **Test API endpoints**: `node test-api.js`
4. **Connect to frontend**: Update frontend API calls

---

## 🎯 Recommended Approach

For development, I recommend **MongoDB Atlas** because:
- ✅ No local installation required
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Easy to share with team
- ✅ Works on any machine

Would you like me to help you with any specific option? 