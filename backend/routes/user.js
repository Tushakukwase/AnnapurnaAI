import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';
import { inMemoryUsers } from './auth.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const user = await User.findById(req.userId).select('-password');
      res.json(user);
    } else {
      // Find user in memory by userId
      let foundUser = null;
      for (const [email, user] of inMemoryUsers.entries()) {
        if (user._id === req.userId) {
          foundUser = { ...user };
          delete foundUser.password;
          break;
        }
      }
      
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(foundUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { height, weight, activityLevel, diseases } = req.body;
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { height, weight, activityLevel, diseases },
        { new: true }
      ).select('-password');

      res.json(user);
    } else {
      // Update user in memory
      let foundEmail = null;
      for (const [email, user] of inMemoryUsers.entries()) {
        if (user._id === req.userId) {
          foundEmail = email;
          break;
        }
      }

      if (!foundEmail) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = inMemoryUsers.get(foundEmail);
      user.height = height;
      user.weight = weight;
      user.activityLevel = activityLevel;
      user.diseases = diseases;
      
      inMemoryUsers.set(foundEmail, user);

      const userResponse = { ...user };
      delete userResponse.password;
      
      res.json(userResponse);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
