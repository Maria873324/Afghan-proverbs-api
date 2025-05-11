import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../data/proverbs.json');

// Read all proverbs
export const readProverbs = async () => {
  const rawData = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

// Write proverbs to file
export const writeProverbs = async (proverbs) => {
  await fs.writeFile(dataPath, JSON.stringify(proverbs, null, 2));
};

// Get next available ID
export const getNextId = (proverbs) => {
  return proverbs.length > 0 ? Math.max(...proverbs.map(p => p.id)) + 1 : 1;
};

// Find proverb by ID
export const findProverbById = async (id) => {
  const proverbs = await readProverbs();
  return proverbs.find(p => p.id === parseInt(id));
};

// Find proverb index by ID
export const findProverbIndex = async (id) => {
  const proverbs = await readProverbs();
  return proverbs.findIndex(p => p.id === parseInt(id));
};

// Filter proverbs by category
export const filterByCategory = async (category) => {
  const proverbs = await readProverbs();
  return proverbs.filter(
    proverb => proverb.category.toLowerCase() === category.toLowerCase()
  );
};
