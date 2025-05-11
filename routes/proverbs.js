import express from 'express';
import {
  readProverbs,
  writeProverbs,
  getNextId,
  findProverbById,
  findProverbIndex,
  filterByCategory
} from '../utils/proverbUtils.js';

const router = express.Router();

// GET all proverbs (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const proverbs = req.query.category 
      ? await filterByCategory(req.query.category)
      : await readProverbs();
    
    res.json(proverbs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single proverb by ID
router.get('/:id', async (req, res) => {
  try {
    const proverb = await findProverbById(req.params.id);
    
    if (!proverb) {
      return res.status(404).json({ message: 'Proverb not found' });
    }
    
    res.json(proverb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new proverb
router.post('/', async (req, res) => {
  try {
    const proverbs = await readProverbs();
    const newProverb = {
      id: getNextId(proverbs),
      ...req.body
    };
    
    proverbs.push(newProverb);
    await writeProverbs(proverbs);
    
    res.status(201).json(newProverb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update an existing proverb
router.put('/:id', async (req, res) => {
  try {
    const proverbs = await readProverbs();
    const index = await findProverbIndex(req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Proverb not found' });
    }
    
    const updatedProverb = { ...proverbs[index], ...req.body };
    proverbs[index] = updatedProverb;
    await writeProverbs(proverbs);
    
    res.json(updatedProverb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a proverb
router.delete('/:id', async (req, res) => {
  try {
    let proverbs = await readProverbs();
    const index = await findProverbIndex(req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Proverb not found' });
    }
    
    const deletedProverb = proverbs.splice(index, 1);
    await writeProverbs(proverbs);
    
    res.json(deletedProverb[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;