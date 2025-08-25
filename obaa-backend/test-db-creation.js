const mongoose = require('mongoose');
require('dotenv').config();

const testDatabaseCreation = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB!');
    
    // Test creating a user (this will create the database and collections)
    const User = require('./models/User');
    
    // Create a test user
    const testUser = new User({
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
    });
    
    console.log('📝 Creating test user...');
    await testUser.save();
    console.log('✅ Test user created successfully!');
    
    // Check what collections exist
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📚 Collections created: ${collections.map(c => c.name).join(', ')}`);
    
    // Clean up - remove test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('🧹 Test user cleaned up');
    
    await mongoose.disconnect();
    console.log('✅ Database creation test completed!');
    console.log('🎉 Your database is ready for use!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testDatabaseCreation(); 