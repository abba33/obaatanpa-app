const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('📡 Connection string:', process.env.MONGODB_URI || 'Not set');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    console.log(`🔗 Port: ${conn.connection.port}`);
    
    // Test creating a collection
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📚 Existing collections: ${collections.map(c => c.name).join(', ') || 'None'}`);
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solutions:');
      console.log('1. Make sure MongoDB is running');
      console.log('2. Check if MongoDB is installed');
      console.log('3. Try: net start MongoDB (Windows)');
      console.log('4. Or use MongoDB Atlas (cloud)');
    } else if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Solutions:');
      console.log('1. Check your username and password');
      console.log('2. Verify your connection string');
      console.log('3. Make sure the user has proper permissions');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Solutions:');
      console.log('1. Check your connection string');
      console.log('2. Verify the hostname is correct');
      console.log('3. Check your internet connection (for Atlas)');
    }
  }
};

// Run the test
testConnection(); 