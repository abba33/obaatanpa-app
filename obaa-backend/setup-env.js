const fs = require('fs');
const path = require('path');

const envContent = `# Server Configuration
NODE_ENV=development
PORT=5000

# Database - Choose one option below:

# Option 1: Local MongoDB (if installed locally)
MONGODB_URI=mongodb://localhost:27017/obaatanpa

# Option 2: MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/obaatanpa?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=obaatanpa_jwt_secret_key_2024_make_this_very_long_and_secure
JWT_EXPIRE=30d

# Email Configuration (optional for now)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_NAME=Obaatanpa
FROM_EMAIL=noreply@obaatanpa.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;

const envPath = path.join(__dirname, '.env');

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping creation.');
    console.log('📝 Please check your .env file and update the MONGODB_URI if needed.');
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Please update the MONGODB_URI with your MongoDB connection string.');
  }
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}

console.log('\n🔧 Next Steps:');
console.log('1. Choose your MongoDB setup option:');
console.log('   - MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
console.log('   - Local MongoDB: https://www.mongodb.com/try/download/community');
console.log('   - Docker: docker run -d --name mongodb -p 27017:27017 mongo:latest');
console.log('\n2. Update the MONGODB_URI in your .env file');
console.log('\n3. Start the server: npm run dev'); 