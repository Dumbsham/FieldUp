# FieldUp API Specifications

## Base URL
`http://localhost:5001/api`

---

## 1. Authentication
Endpoints for user identity and access management.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user (coach, player, captain, admin) |
| POST | `/auth/login` | Authenticate user and return JWT |
| GET | `/auth/me` | Get currently authenticated user details |

---

## 2. Teams & Players
Management of teams, academies, and player profiles.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/teams` | Create a new team |
| GET | `/teams/:id` | Get team details and roster |
| POST | `/players` | Create/Add player profile |
| GET | `/players/:id` | Get player statistics and fitness data |
| GET | `/teams/:teamId/players` | List all players in a team |

---

## 3. Matches & Performance
Recording match results and tracking individual metrics.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/matches` | Record a match scorecard |
| GET | `/matches` | List matches for a team |
| GET | `/matches/:id` | Get detailed match scorecard |
| POST | `/performance` | Log player performance (runs, wickets, etc.) |
| POST | `/fitness` | Log player fitness metrics (sleep, fatigue) |

---

## 4. AI Cricket Intelligence
Endpoints that interface with the FastAPI AI service and Gemini API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/match-strategy` | Generate lineup and tactical strategy |
| GET | `/ai/injury-risk/:playerId` | Get AI-predicted injury risk probability |
| GET | `/ai/performance-insights/:playerId` | Get AI-generated coaching recommendations |

---

## 5. AI Service Internal (FastAPI)
Internal endpoints called by the Node.js backend.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict/injury` | ML model prediction for injury |
| POST | `/predict/strategy` | ML model for match outcome probability |
| POST | `/analyze/metrics` | Statistical analysis of player form |
