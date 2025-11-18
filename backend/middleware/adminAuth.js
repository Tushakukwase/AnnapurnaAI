import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { inMemoryUsers } from '../routes/auth.js';
import mongoose from 'mongoose';

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const user = await User.findById(req.userId);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
    } else {
      // Check in-memory users
      let isAdmin = false;
      for (const [email, user] of inMemoryUsers.entries()) {
        if (user._id === req.userId && user.isAdmin) {
          isAdmin = true;
          break;
        }
      }
      if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
