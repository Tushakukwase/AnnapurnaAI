import express from 'express';
import HealthLog from '../models/HealthLog.js';
import { authMiddleware } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// In-memory health logs storage
const inMemoryHealthLogs = [];

router.post('/log', authMiddleware, async (req, res) => {
  try {
    const { weight, waterIntake, caloriesConsumed, sleep, steps, mood } = req.body;
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const healthLog = new HealthLog({
        userId: req.userId,
        weight,
        waterIntake,
        caloriesConsumed,
        sleep,
        steps,
        mood
      });

      await healthLog.save();
      res.status(201).json(healthLog);
    } else {
      // In-memory storage
      const healthLog = {
        _id: Date.now().toString(),
        userId: req.userId,
        weight,
        waterIntake,
        caloriesConsumed,
        sleep,
        steps,
        mood,
        date: new Date()
      };

      inMemoryHealthLogs.push(healthLog);
      res.status(201).json(healthLog);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const logs = await HealthLog.find({ userId: req.userId })
        .sort({ date: -1 })
        .limit(30);
      res.json(logs);
    } else {
      // In-memory storage
      const logs = inMemoryHealthLogs
        .filter(log => log.userId === req.userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 30);
      res.json(logs);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isDBConnected) {
      const todayLog = await HealthLog.findOne({
        userId: req.userId,
        date: { $gte: today }
      });

      const weekLogs = await HealthLog.find({
        userId: req.userId,
        date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }).sort({ date: -1 });

      res.json({
        today: todayLog,
        week: weekLogs
      });
    } else {
      // In-memory storage
      const userLogs = inMemoryHealthLogs.filter(log => log.userId === req.userId);
      
      const todayLog = userLogs.find(log => new Date(log.date) >= today);
      
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const weekLogs = userLogs
        .filter(log => new Date(log.date) >= weekAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json({
        today: todayLog || null,
        week: weekLogs
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
