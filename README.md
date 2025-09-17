# Full-Stack Developer Assessment  

## Overview  
Build a simple quiz application to demonstrate your ability to integrate a modern tech stack. We want to see how you connect React, Express, PostgreSQL, and implement basic authentication. Focus on clean code and proper API communication rather than advanced features.  

---

## Technology Stack Requirements  

### Backend  
- Language: TypeScript  
- Framework: Express.js  
- Database: PostgreSQL  
- Authentication: JWT  
- Validation: Joi or express-validator  

### Frontend  
- Framework: React 18+ with TypeScript  
- Build Tool: Vite  
- State Management: Zustand  
- Routing: React Router v6+  
- Styling: Tailwind CSS  
- HTTP Client: Axios  

---

## Core Requirements (Build These 3 Pages)  

### 1. Authentication Page  
Simple login/register functionality:  

**Backend:**  
- POST /api/auth/register - Create new user  
- POST /api/auth/login - Login user and return JWT  
- Use bcrypt for password hashing  
- Return JWT token on successful login  

**Frontend:**  
- Combined login/register form  
- Store JWT in localStorage/Zustand  
- Redirect to questions page after login  
- Basic form validation  

---

### 2. Questions List Page (Protected Route)  
Display and manage quiz questions:  

**Backend:**  
- GET /api/questions - Get all questions (protected route)  
- POST /api/questions - Create new question (protected route)  
- PUT /api/questions/:id - Update question (protected route)  
- DELETE /api/questions/:id - Delete question (protected route)  

**Frontend:**  
- List all questions in a table/cards format  
- Add new question form with:  
  - Question text  
  - 4 answer options  
  - Mark correct answer  
- Edit existing questions  
- Delete questions  
- Must be logged in to access  

---

### 3. Quiz Interface Page  
Take a quiz with all available questions:  

**Backend:**  
- GET /api/quiz/start - Get all questions for quiz  
- POST /api/quiz/submit - Submit quiz answers and get results  

**Frontend:**  
- Display one question at a time  
- Show question number (e.g., "Question 3 of 10")  
- Radio buttons for answer options  
- Next/Previous navigation buttons  
- Timer showing elapsed time (mm:ss format)  
- Submit button on last question  
- Results page showing:  
  - Total score  
  - Correct answers count  
  - Time taken  

---

## What We're Looking For  
1. Clean Integration - How well you connect Frontend ↔ Backend ↔ Database  
2. API Design - RESTful endpoints with proper status codes  
3. State Management - Proper use of Zustand for auth and quiz state  
4. TypeScript Usage - Interfaces for data models, proper typing  
5. Error Handling - Both frontend (user feedback) and backend (try/catch)  
6. Code Organization - Logical file structure, reusable components  

---

## Deliverables  
1. Working Application with all 3 pages functional  
2. README with:  
   - How to run the project  
   - Database setup instructions  
   - Environment variables needed  
3. Sample Data - SQL script to insert 10 sample questions  

---

## Tips  
- Keep it simple - we prefer working features over complex half-built ones  
- Use Postman to test your APIs first  
- Don't worry about styling perfection - basic Tailwind is fine  
- Focus on the data flow: Frontend → API → Database → API → Frontend  

---

## Important Notes  
- Ensure your deployed app is functional before submission  
- Include environment variable instructions in your README  
- Create a demo account for testing purposes  
- Backend should handle CORS for your frontend domain  
