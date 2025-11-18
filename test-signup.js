// Quick test script
import axios from 'axios';

const testSignup = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      age: 25,
      gender: 'male'
    });
    console.log('✅ Signup Success:', response.data);
  } catch (error) {
    console.log('❌ Signup Failed:', error.response?.data || error.message);
  }
};

testSignup();
