import express from 'express';
import Food from '../models/Food.js';
import { authMiddleware } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// In-memory foods storage
let inMemoryFoods = [];

const ayurvedicFoods = [
  {
    name: 'Turmeric Golden Milk',
    category: 'Beverage',
    diseases: ['inflammation', 'arthritis', 'cold', 'immunity'],
    benefits: ['Anti-inflammatory', 'Boosts immunity', 'Improves digestion', 'Promotes sleep'],
    ayurvedicProperties: {
      rasa: ['bitter', 'pungent'],
      guna: ['light', 'dry'],
      virya: 'hot',
      vipaka: 'pungent'
    },
    ingredients: ['Turmeric powder', 'Milk', 'Black pepper', 'Honey', 'Cinnamon'],
    preparation: 'Heat milk, add 1 tsp turmeric, pinch of black pepper, cinnamon. Simmer 5 min. Add honey when warm.',
    image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=400',
    featured: true
  },
  {
    name: 'Triphala Churna',
    category: 'Herbal Supplement',
    diseases: ['constipation', 'digestion', 'detox', 'immunity'],
    benefits: ['Detoxifies body', 'Improves digestion', 'Enhances vision', 'Anti-aging'],
    ayurvedicProperties: {
      rasa: ['sweet', 'sour', 'pungent', 'bitter', 'astringent'],
      guna: ['light', 'dry'],
      virya: 'neutral',
      vipaka: 'sweet'
    },
    ingredients: ['Amalaki', 'Bibhitaki', 'Haritaki'],
    preparation: 'Mix 1 tsp Triphala powder with warm water before bed or empty stomach.',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=400',
    featured: true
  },
  {
    name: 'Ashwagandha Laddoo',
    category: 'Sweet',
    diseases: ['stress', 'anxiety', 'weakness', 'fatigue'],
    benefits: ['Reduces stress', 'Increases strength', 'Improves vitality', 'Enhances memory'],
    ayurvedicProperties: {
      rasa: ['bitter', 'astringent', 'sweet'],
      guna: ['light', 'unctuous'],
      virya: 'hot',
      vipaka: 'sweet'
    },
    ingredients: ['Ashwagandha powder', 'Dates', 'Almonds', 'Ghee', 'Jaggery'],
    preparation: 'Roast ashwagandha powder in ghee. Mix with ground dates, almonds, jaggery. Form balls.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    featured: false
  },
  {
    name: 'Ginger Tulsi Tea',
    category: 'Beverage',
    diseases: ['cold', 'cough', 'fever', 'immunity'],
    benefits: ['Relieves cold', 'Boosts immunity', 'Improves digestion', 'Anti-bacterial'],
    ayurvedicProperties: {
      rasa: ['pungent'],
      guna: ['light', 'sharp'],
      virya: 'hot',
      vipaka: 'sweet'
    },
    ingredients: ['Ginger', 'Tulsi leaves', 'Black pepper', 'Honey', 'Water'],
    preparation: 'Boil water with ginger and tulsi. Add black pepper. Strain and add honey.',
    image: 'https://images.unsplash.com/photo-1563822249366-7efbeb0eb976?w=400',
    featured: true
  },
  {
    name: 'Moong Dal Khichdi',
    category: 'Main Dish',
    diseases: ['digestion', 'weakness', 'fever', 'detox'],
    benefits: ['Easy to digest', 'Nourishing', 'Detoxifying', 'Balances doshas'],
    ayurvedicProperties: {
      rasa: ['sweet'],
      guna: ['light', 'soft'],
      virya: 'cold',
      vipaka: 'sweet'
    },
    ingredients: ['Rice', 'Moong dal', 'Ghee', 'Cumin', 'Turmeric', 'Vegetables'],
    preparation: 'Cook rice and moong dal with ghee, cumin, turmeric. Add seasonal vegetables.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    featured: false
  },
  {
    name: 'Brahmi Ghrita',
    category: 'Herbal Ghee',
    diseases: ['memory', 'stress', 'anxiety', 'insomnia'],
    benefits: ['Enhances memory', 'Calms mind', 'Improves focus', 'Reduces anxiety'],
    ayurvedicProperties: {
      rasa: ['bitter', 'sweet'],
      guna: ['light'],
      virya: 'cold',
      vipaka: 'sweet'
    },
    ingredients: ['Brahmi', 'Ghee', 'Shankhpushpi', 'Vacha'],
    preparation: 'Infuse brahmi and herbs in ghee slowly. Take 1 tsp with warm milk.',
    image: 'https://images.unsplash.com/photo-1587334206607-774a13f3c1c6?w=400',
    featured: false
  },
  {
    name: 'Amla Murabba',
    category: 'Preserve',
    diseases: ['immunity', 'hair-loss', 'acidity', 'aging'],
    benefits: ['Rich in Vitamin C', 'Improves immunity', 'Enhances hair growth', 'Anti-aging'],
    ayurvedicProperties: {
      rasa: ['sour', 'sweet'],
      guna: ['light', 'dry'],
      virya: 'cold',
      vipaka: 'sweet'
    },
    ingredients: ['Amla', 'Sugar', 'Cardamom', 'Saffron'],
    preparation: 'Cook amla with sugar syrup and spices until preserved. Take 1-2 pieces daily.',
    image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=400',
    featured: true
  },
  {
    name: 'Chyawanprash',
    category: 'Herbal Jam',
    diseases: ['immunity', 'respiratory', 'aging', 'weakness'],
    benefits: ['Boosts immunity', 'Respiratory health', 'Anti-aging', 'Increases vitality'],
    ayurvedicProperties: {
      rasa: ['sweet', 'sour'],
      guna: ['heavy', 'unctuous'],
      virya: 'hot',
      vipaka: 'sweet'
    },
    ingredients: ['Amla', '40+ herbs', 'Ghee', 'Honey', 'Sesame oil'],
    preparation: 'Traditional preparation with amla and herbs. Take 1 tsp twice daily with milk.',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400',
    featured: false
  }
];

router.get('/seed', async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      await Food.deleteMany({});
      const foods = await Food.insertMany(ayurvedicFoods);
      res.json({ message: 'Database seeded', count: foods.length });
    } else {
      // Seed in-memory storage
      inMemoryFoods = ayurvedicFoods.map((food, index) => ({
        ...food,
        _id: (index + 1).toString()
      }));
      res.json({ message: 'In-memory storage seeded', count: inMemoryFoods.length });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const foods = await Food.find({ featured: true }).limit(6);
      res.json(foods);
    } else {
      // Auto-seed if empty
      if (inMemoryFoods.length === 0) {
        inMemoryFoods = ayurvedicFoods.map((food, index) => ({
          ...food,
          _id: (index + 1).toString()
        }));
      }
      const foods = inMemoryFoods.filter(f => f.featured).slice(0, 6);
      res.json(foods);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/recommend', authMiddleware, async (req, res) => {
  try {
    const { disease } = req.query;
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      let query = {};
      if (disease && disease !== 'all') {
        query = { diseases: { $in: [disease.toLowerCase()] } };
      }

      const foods = await Food.find(query).limit(20);
      res.json(foods);
    } else {
      // Auto-seed if empty
      if (inMemoryFoods.length === 0) {
        inMemoryFoods = ayurvedicFoods.map((food, index) => ({
          ...food,
          _id: (index + 1).toString()
        }));
      }

      let foods = inMemoryFoods;
      if (disease && disease !== 'all') {
        foods = inMemoryFoods.filter(f => 
          f.diseases.includes(disease.toLowerCase())
        );
      }
      res.json(foods.slice(0, 20));
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const foods = await Food.find({});
      res.json(foods);
    } else {
      // Auto-seed if empty
      if (inMemoryFoods.length === 0) {
        inMemoryFoods = ayurvedicFoods.map((food, index) => ({
          ...food,
          _id: (index + 1).toString()
        }));
      }
      res.json(inMemoryFoods);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/remedy-of-day', async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const count = await Food.countDocuments();
      const random = Math.floor(Math.random() * count);
      const remedy = await Food.findOne().skip(random);
      res.json(remedy);
    } else {
      // Auto-seed if empty
      if (inMemoryFoods.length === 0) {
        inMemoryFoods = ayurvedicFoods.map((food, index) => ({
          ...food,
          _id: (index + 1).toString()
        }));
      }
      const random = Math.floor(Math.random() * inMemoryFoods.length);
      res.json(inMemoryFoods[random]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new food item
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { name, category, diseases, benefits, ayurvedicProperties, ingredients, preparation, image, featured } = req.body;
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const food = new Food({
        name,
        category,
        diseases,
        benefits,
        ayurvedicProperties,
        ingredients,
        preparation,
        image,
        featured: featured || false
      });
      await food.save();
      res.status(201).json({ message: 'Food added successfully', food });
    } else {
      // Add to in-memory storage
      const newFood = {
        _id: (inMemoryFoods.length + 1).toString(),
        name,
        category,
        diseases,
        benefits,
        ayurvedicProperties,
        ingredients,
        preparation,
        image,
        featured: featured || false
      };
      inMemoryFoods.push(newFood);
      res.status(201).json({ message: 'Food added to memory', food: newFood });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding food', error: error.message });
  }
});

export default router;
export { inMemoryFoods };
