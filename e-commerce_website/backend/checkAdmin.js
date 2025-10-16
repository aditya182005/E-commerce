const mongoose = require('mongoose');
const User = require('./db/user');

async function checkAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/e-comm-store-db');
        
        // Find admin user
        const admin = await User.findOne({ email: 'admin@example.com' });
        
        if (admin) {
            console.log('Admin user found:');
            console.log('Email:', admin.email);
            console.log('Is Admin:', admin.isAdmin);
        } else {
            console.log('No admin user found');
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
        if (error.message.includes('connect ECONNREFUSED')) {
            console.log('\nMake sure MongoDB is running on your system.');
        }
        await mongoose.connection.close();
    }
}

checkAdmin();