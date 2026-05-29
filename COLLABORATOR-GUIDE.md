# FieldUp Project Guide 🚀

Welcome to the FieldUp Backend! This guide will help you understand how the project is structured and how to continue building the next set of features.

---

## 1. Project Architecture
The project follows a **Modular MVC (Model-View-Controller)** pattern:
*   **Models (`/models`):** Define the data structure (Database blueprints).
*   **Controllers (`/controllers`):** The "brain" where the logic happens.
*   **Routes (`/routes`):** Defines the URLs and which controller handles them.
*   **Middleware (`/middleware`):** The "security guards" that check for things like authentication before letting a request reach the controller.

---

## 2. Authentication Flow (The "Passport" System)
We use **JWT (JSON Web Tokens)** for security.
1.  **Login/Register:** User sends credentials to `/api/auth`.
2.  **Token Issued:** The server sends back an encrypted `token`.
3.  **Protected Routes:** For sensitive actions (like creating a team), the client must send this token in the header: `Authorization: Bearer <your_token>`.

### Key Security Files:
*   `middleware/auth.js`: Contains `protect` (checks if logged in) and `authorize` (checks if you are a Coach/Admin).
*   `models/User.js`: Automatically hashes passwords and handles token creation.

---

## 3. Current State
*   **Implemented:** Auth (Signup/Login), Teams, and Players.
*   **Stubs:** In `app.js`, you will see routes marked with `res.status(501).json({ message: 'Not Implemented' })`. These are **placeholders** (stubs) that show where future features (like Matches) should go.

---

## 4. Next Task: Match & Performance APIs
Your next goal is to implement the Match scoring system. Below are the instructions for your AI agent.

### **Instructions for Gemini CLI:**
> "I am working on the FieldUp project. We have already implemented Auth, Teams, and Players. 
> 
> **Task:** Implement the **Match & Performance APIs** following the existing project pattern.
> 
> **Requirements:**
> 1. **Model:** Create a `Match` model. It should include:
>    - `homeTeam` and `awayTeam` (Refs to Team model).
>    - `date`, `venue`, and `format` (T20, ODI, etc.).
>    - `scorecard` (detailed object).
> 2. **Controller:** Create `matchController.js` to handle:
>    - `createMatch`: Initialize a new match.
>    - `getMatchDetails`: Fetch full scorecard.
>    - `updateScorecard`: Live scoring updates.
> 3. **Routes:** Create `matchRoutes.js` and mount it in `app.js`.
> 4. **Security:** Ensure that only the participating team **Coaches** or an **Admin** can update the scorecard. Use the existing `protect` and `authorize` middleware.
> 
> Please research the existing `playerController.js` and `teamController.js` to match the coding style, error handling, and ownership logic."
