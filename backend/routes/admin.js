import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import User from '../models/User.js';
import Food from '../models/Food.js';
import HealthLog from '../models/HealthLog.js';
import { inMemoryUsers } from './auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// In-memory storage references
import { inMemoryFoods } from './food.js';

// Get all users
router.get('/users', adminAuth, async (req, res) => {
    try {
        const isDBConnected = mongoose.connection.readyState === 1;

        if (isDBConnected) {
            const users = await User.find().select('-password');
            res.json(users);
        } else {
            const users = Array.from(inMemoryUsers.values()).map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all foods
router.get('/foods', adminAuth, async (req, res) => {
    try {
        const isDBConnected = mongoose.connection.readyState === 1;

        if (isDBConnected) {
            const foods = await Food.find();
            res.json(foods);
        } else {
            res.json(inMemoryFoods);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete food
router.delete('/foods/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const isDBConnected = mongoose.connection.readyState === 1;

        if (isDBConnected) {
            await Food.findByIdAndDelete(id);
            res.json({ message: 'Food deleted successfully' });
        } else {
            const index = inMemoryFoods.findIndex(f => f._id === id);
            if (index > -1) {
                inMemoryFoods.splice(index, 1);
                res.json({ message: 'Food deleted successfully' });
            } else {
                res.status(404).json({ message: 'Food not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update food
router.put('/foods/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const isDBConnected = mongoose.connection.readyState === 1;

        if (isDBConnected) {
            const food = await Food.findByIdAndUpdate(id, updateData, { new: true });
            res.json(food);
        } else {
            const index = inMemoryFoods.findIndex(f => f._id === id);
            if (index > -1) {
                inMemoryFoods[index] = { ...inMemoryFoods[index], ...updateData };
                res.json(inMemoryFoods[index]);
            } else {
                res.status(404).json({ message: 'Food not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get stats
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const isDBConnected = mongoose.connection.readyState === 1;

        if (isDBConnected) {
            const userCount = await User.countDocuments();
            const foodCount = await Food.countDocuments();
            const healthLogCount = await HealthLog.countDocuments();

            res.json({
                users: userCount,
                foods: foodCount,
                healthLogs: healthLogCount
            });
        } else {
            res.json({
                users: inMemoryUsers.size,
                foods: inMemoryFoods.length,
                healthLogs: 0
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
export { inMemoryFoods };
