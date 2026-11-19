# AI Revision Buddy

A simple full-stack app to **learn and revise concepts with AI**. Enter a topic (e.g. "React useEffect", "SQL joins"), and the app generates a short explanation, flashcards, and a quiz. Save them and revise later.

Built to practise **React + Node.js integration, REST APIs, deployment, and AI (LLM) integration**.

---

## Features

- Generate a short explanation for any topic
- Auto-generated flashcards (flip-card revision mode)
- Quiz mode with MCQs and score tracking
- Save topics, flashcards, and quizzes to MongoDB ("My Notes")
- Difficulty toggle: beginner / interview-level
- (Optional) JWT authentication so each user has their own notes

## Tech Stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React (Vite), React Router, Axios, CSS/Tailwind |
| Backend  | Node.js, Express                             |
| Database | MongoDB Atlas + Mongoose                     |
| AI       | LLM API (Anthropic SDK), called from backend only |
| Hosting  | Vercel/Netlify (frontend), Render/Railway (backend) |

## Architecture

```
React (browser)  ──HTTP──▶  Express API  ──▶  LLM API
                                │
                                └──▶  MongoDB Atlas
```

The API key lives only on the backend, never in the browser.

---

## Project Structure

The repo has two independent apps: `frontend/` and `backend/`.

```
ai-revision-buddy/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

### Frontend (`frontend/`)

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── axiosClient.js        # Axios instance (baseURL from env)
│   │   ├── topicApi.js           # Generate / save / fetch topics
│   │   └── authApi.js            # Login / register (optional)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TopicForm.jsx         # Topic input + difficulty toggle
│   │   ├── ExplanationCard.jsx
│   │   ├── Flashcard.jsx         # Flip-card component
│   │   ├── QuizQuestion.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/
│   │   ├── Home.jsx              # Generate new content
│   │   ├── MyNotes.jsx           # Saved topics list
│   │   ├── TopicDetail.jsx       # Explanation + flashcards for one topic
│   │   ├── Revise.jsx            # Flashcard revision mode
│   │   ├── Quiz.jsx              # Quiz + score
│   │   ├── Login.jsx             # (optional)
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── AuthContext.jsx       # (optional) auth state
│   ├── hooks/
│   │   └── useFetch.js
│   ├── utils/
│   │   └── helpers.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx                   # Routes
│   └── main.jsx                  # Entry point
├── .env                          # VITE_API_URL=http://localhost:5000/api
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

### Backend (`backend/`)

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── env.js                # Load/validate env variables
│   ├── controllers/
│   │   ├── aiController.js       # Generate explanation, flashcards, quiz
│   │   ├── topicController.js    # CRUD for saved topics
│   │   └── authController.js     # (optional) register / login
│   ├── services/
│   │   └── aiService.js          # LLM API calls + prompt building + JSON parsing
│   ├── models/
│   │   ├── Topic.js              # topic, explanation, flashcards, quiz
│   │   └── User.js               # (optional)
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── topicRoutes.js
│   │   └── authRoutes.js         # (optional)
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js        # Limit AI route usage
│   │   ├── validate.js           # Request body validation
│   │   └── auth.js               # (optional) JWT verification
│   ├── utils/
│   │   └── parseAiJson.js        # Safely clean/parse LLM JSON output
│   ├── app.js                    # Express app setup (CORS, JSON, routes)
│   └── server.js                 # Starts server + connects DB
├── .env
├── .env.example
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas account (free tier)
- An LLM API key (e.g. Anthropic)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/ai-revision-buddy.git
cd ai-revision-buddy
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env     # then fill in the values
npm run dev
```

`backend/.env.example`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
ANTHROPIC_API_KEY=your_api_key_here
ANTHROPIC_MODEL=your_model_name
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret        # optional, for auth
```

Suggested packages: `express`, `cors`, `dotenv`, `mongoose`, `@anthropic-ai/sdk`, `express-rate-limit`, `nodemon` (dev). For auth: `jsonwebtoken`, `bcryptjs`.

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

`frontend/.env.example`

```env
VITE_API_URL=http://localhost:5000/api
```

Suggested packages: `react-router-dom`, `axios`.

The app runs at `http://localhost:5173` and the API at `http://localhost:5000`.

---

## API Endpoints

| Method | Endpoint            | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| POST   | `/api/ai/generate`  | Generate explanation + flashcards for a topic |
| POST   | `/api/ai/quiz`      | Generate MCQs for a topic                    |
| GET    | `/api/topics`       | List saved topics                            |
| GET    | `/api/topics/:id`   | Get one saved topic                          |
| POST   | `/api/topics`       | Save a generated topic                       |
| DELETE | `/api/topics/:id`   | Delete a saved topic                         |
| POST   | `/api/auth/register`| (Optional) Register                          |
| POST   | `/api/auth/login`   | (Optional) Login                             |

Example request:

```json
POST /api/ai/generate
{
  "topic": "React useEffect",
  "level": "beginner"
}
```

Example response:

```json
{
  "topic": "React useEffect",
  "explanation": "useEffect lets you run side effects...",
  "flashcards": [
    { "question": "What is the dependency array?", "answer": "..." }
  ]
}
```

## Data Model (Topic)

```js
{
  user: ObjectId,            // optional
  title: String,
  level: "beginner" | "interview",
  explanation: String,
  flashcards: [{ question: String, answer: String }],
  quiz: [{ question: String, options: [String], correctIndex: Number }],
  createdAt: Date
}
```

---

## Build Phases

1. **Basic integration**: React form to Express route returning a hardcoded response (fetch/axios, CORS, env variables)
2. **AI integration**: backend calls the LLM, returns structured JSON (prompt design, error handling)
3. **Save and revise**: MongoDB CRUD, My Notes page, flip-card revision mode
4. **Quiz mode**: MCQ generation, score tracking, weak-topic revision
5. **Auth (optional)**: JWT login so each user has their own notes

## Deployment

| Part     | Platform           | Notes                                              |
| -------- | ------------------ | -------------------------------------------------- |
| Frontend | Vercel / Netlify   | Build command `npm run build`, output `dist`. Set `VITE_API_URL` to the deployed backend URL |
| Backend  | Render / Railway   | Start command `node src/server.js`. Add all env variables in the dashboard |
| Database | MongoDB Atlas      | Allow the backend host's IP (or `0.0.0.0/0` for learning) in Network Access |

After deploying, update `CLIENT_URL` on the backend to your live frontend URL so CORS allows it.

## Security Notes

- Never commit `.env` files. Add them to `.gitignore`.
- Call the LLM only from the backend.
- Rate-limit `/api/ai/*` routes to control cost.
- Validate and sanitise the topic input before building the prompt.

## Future Improvements

- Stream AI responses word by word
- Spaced-repetition scheduling for flashcards
- Export notes as PDF
- Dark mode

## What I Learned

- Connecting a React frontend to an Express backend
- REST API design and error handling
- Secure API key handling and prompt engineering
- Parsing structured JSON from an LLM
- Database modelling with Mongoose
- Full deployment pipeline (Vercel + Render + Atlas)

## License

MIT
