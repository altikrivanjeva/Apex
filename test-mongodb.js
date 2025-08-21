// test-mongodb.js
// Simple script to test MongoDB connection

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI || 'mongodb+srv://apexUser:apex1234@apex.xzmswa7.mongodb.net/?retryWrites=true&w=majority&appName=Apex';
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    const dbs = await client.db().admin().listDatabases();
    console.log('Databases:', dbs.databases);
    console.log('MongoDB connection successful!');
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await client.close();
  }
}

testConnection();
