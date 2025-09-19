# Quiz Backend

## How to Run the Project

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Run in development mode
```bash
npm run start:dev
```

### 3. Build and run in production mode
```bash
npm run build
npm start
```

---

## Database Setup Instructions

1. Make sure PostgreSQL is installed and running.
2. Create a database (e.g., `quiz_app`).
3. Run migrations:
```bash
npm run migration:run
```

---

## Environment Variables Needed

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL=postgres://username:password@localhost:5432/quiz_app
JWT_SECRET=your-secret-key
PORT=4000
```

---

## Sample Data

You can insert 10 sample questions into your database using the following SQL script:

```sql
INSERT INTO questions (title, content, options, correct_answer, created_by, created_at, updated_at) VALUES
('Question 1', 'What is the capital of France?', ARRAY['Berlin','Madrid','Paris','Rome'], 2, 1, NOW(), NOW()),
('Question 2', 'What is 2 + 2?', ARRAY['3','4','5','6'], 1, 1, NOW(), NOW()),
('Question 3', 'What color is the sky?', ARRAY['Blue','Green','Red','Yellow'], 0, 1, NOW(), NOW()),
('Question 4', 'Which is a fruit?', ARRAY['Carrot','Potato','Apple','Onion'], 2, 1, NOW(), NOW()),
('Question 5', 'What is 10 / 2?', ARRAY['2','5','10','20'], 1, 1, NOW(), NOW()),
('Question 6', 'What is the largest planet?', ARRAY['Earth','Mars','Jupiter','Venus'], 2, 1, NOW(), NOW()),
('Question 7', 'Which is a programming language?', ARRAY['HTML','CSS','Python','HTTP'], 2, 1, NOW(), NOW()),
('Question 8', 'What is the boiling point of water?', ARRAY['50°C','100°C','150°C','200°C'], 1, 1, NOW(), NOW()),
('Question 9', 'Which is a mammal?', ARRAY['Shark','Whale','Octopus','Turtle'], 1, 1, NOW(), NOW()),
('Question 10', 'What is the currency of Japan?', ARRAY['Dollar','Yen','Euro','Peso'], 1, 1, NOW(), NOW());
```
