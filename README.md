# Afghan Proverbs RESTful API

A Node.js/Express API for storing and managing traditional Afghan proverbs in Dari, Pashto, and English translations.

## Features
- CRUD operations for proverbs
- Filter proverbs by category
- Get all available categories
- Persistent JSON data storage
- Live-reload during development

## Technologies
- Node.js
- Express
- JavaScript (ES Modules)
- nodemon (dev dependency)

## Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/Maria873324/Afghan-proverbs-api
cd Afghan-proverbs

2. Install dependencies
npm install

3. Start the server
For development (with nodemon):
npm run dev

For production:
npm start

API Endpoints
Get all proverbs
curl http://localhost:3001/proverbs

Get proverbs by category
curl "http://localhost:3001/proverbs?category=wisdom"

Get all categories
curl http://localhost:3001/proverbs/categories

Get single proverb
curl http://localhost:3001/proverbs/1

Add new proverb
curl -X POST http://localhost:3001/proverbs \
-H "Content-Type: application/json" \
-d '{
  "textDari": "مثال جدید",
  "textPashto": "نوی مثال",
  "translationEn": "New example",
  "meaning": "Example meaning",
  "category": "example"
}'

Update proverb
curl -X PUT http://localhost:3001/proverbs/1 \
-H "Content-Type: application/json" \
-d '{
  "meaning": "Updated meaning"
}'

Delete proverb
curl -X DELETE http://localhost:3001/proverbs/1
Example Responses
Successful GET response (200)
json
{
  "id": 1,
  "textDari": "هر که بامش بیش، برفش بیشتر",
  "textPashto": "هغه څوک چې د هغه پورتنۍ برخه لوړه وي، د هغه برف ډیر وي",
  "translationEn": "The higher the roof, the more the snow",
  "meaning": "With greater position comes greater responsibility",
  "category": "wisdom"
}
Successful POST response (201)
json
{
  "id": 5,
  "textDari": "مثال جدید",
  "textPashto": "نوی مثال",
  "translationEn": "New example",
  "meaning": "Example meaning",
  "category": "example"
}
Error responses
400 Bad Request (invalid data)

404 Not Found (proverb doesn't exist)

500 Server Error

Development Setup
Install nodemon globally (if needed):


npm install -g nodemon
The package.json already includes:

json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
Server auto-restarts when you:

Modify app.js, routes, or utils
Save changes to proverbs.json

Project Structure:

Afghan-proverbs/
├── data/               # JSON database
├── routes/             # API endpoints
├── utils/              # Helper functions
├── app.js              # Main application
├── package.json
└── README.md
