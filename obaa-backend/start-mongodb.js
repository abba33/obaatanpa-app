const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting MongoDB manually...');

// Common MongoDB installation paths
const possiblePaths = [
  'C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe',
  'C:\\Program Files\\MongoDB\\Server\\6.0\\bin\\mongod.exe',
  'C:\\Program Files\\MongoDB\\Server\\5.0\\bin\\mongod.exe',
  'C:\\Program Files\\MongoDB\\Server\\4.4\\bin\\mongod.exe',
  'C:\\Program Files\\MongoDB\\Server\\4.2\\bin\\mongod.exe'
];

// Find MongoDB executable
let mongodPath = null;
for (const path of possiblePaths) {
  try {
    const fs = require('fs');
    if (fs.existsSync(path)) {
      mongodPath = path;
      break;
    }
  } catch (error) {
    // Continue to next path
  }
}

if (!mongodPath) {
  console.log('❌ MongoDB not found in common installation paths.');
  console.log('💡 Please check if MongoDB is installed correctly.');
  console.log('📝 You can also try MongoDB Atlas (cloud) instead.');
  console.log('🌐 Go to: https://www.mongodb.com/atlas');
  process.exit(1);
}

console.log(`✅ Found MongoDB at: ${mongodPath}`);

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data', 'db');
const fs = require('fs');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`📁 Created data directory: ${dataDir}`);
}

// Start MongoDB
const mongod = spawn(mongodPath, [
  '--dbpath', dataDir,
  '--port', '27017'
]);

console.log('🔄 Starting MongoDB server...');
console.log('⏳ This may take a few seconds...');

mongod.stdout.on('data', (data) => {
  console.log(`📤 MongoDB: ${data.toString().trim()}`);
});

mongod.stderr.on('data', (data) => {
  const output = data.toString().trim();
  if (output.includes('waiting for connections')) {
    console.log('✅ MongoDB is now running and ready for connections!');
    console.log('📍 Connection string: mongodb://localhost:27017/obaatanpa');
    console.log('🛑 Press Ctrl+C to stop MongoDB');
  } else if (!output.includes('MongoDB starting')) {
    console.log(`⚠️  MongoDB: ${output}`);
  }
});

mongod.on('error', (error) => {
  console.error('❌ Failed to start MongoDB:', error.message);
  console.log('💡 Try running this script as Administrator');
});

mongod.on('close', (code) => {
  console.log(`🔄 MongoDB process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping MongoDB...');
  mongod.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping MongoDB...');
  mongod.kill();
  process.exit(0);
}); 