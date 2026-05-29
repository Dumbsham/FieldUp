# FieldUp Authentication & Authorization Guide 🛡️

This guide explains how we protect our APIs and manage user access. If you've only built basic login/signup before, this will help you understand "Stateless Auth" and "Role-Based Access."

---

## 1. The Big Picture: Stateless Auth with JWT
In basic systems, you might use "Sessions" where the server remembers you in its memory. We use **JWT (JSON Web Tokens)**, which is **Stateless**.

### How it works:
1.  **Signup/Login:** You send your email/password.
2.  **The Token:** The server checks your credentials and sends back a "Token" (a long encrypted string).
3.  **The "Key":** The server *does not* remember you. Instead, you must send this Token in the **Header** of every request you make.
4.  **Verification:** The server sees the Token, decrypts it using a secret "Key" (stored in `.env`), and says "Okay, I know who you are now."

---

## 2. Our New Roles
We have expanded the roles to give different levels of power:
*   **Player:** Can see data but cannot create teams or players.
*   **Captain:** (Future use - similar to player for now).
*   **Coach:** Can create their own Team and add Players to *their* team only.
*   **Admin:** God mode. Can do anything.

---

## 3. How the Code Protects Routes

We use two special "Middlewares" (guards) in our routes:

### `protect`
This guard checks if you are logged in.
*   It looks for the `Authorization` header.
*   It verifies your JWT token.
*   It attaches your User profile to the request (`req.user`).

### `authorize('role1', 'role2')`
This guard checks if your role is allowed to do something.
*   Example: `authorize('coach', 'admin')` means only coaches and admins can pass.

---

## 4. Ownership: The "Coach Rule"
Even if you are a Coach, you shouldn't be able to add players to *someone else's* team. We enforce this in the controller:

```javascript
// Inside playerController.js
if (team.coach.toString() !== req.user.id && req.user.role !== 'admin') {
  return res.status(401).json({ message: "You don't own this team!" });
}
```

---

## 5. How to Test in Postman/Thunder Client

1.  **Register:** `POST /api/auth/register` with `name`, `email`, `password`, and `role`.
2.  **Get Token:** Copy the `token` from the response.
3.  **Use Token:** In your next request (e.g., `POST /api/teams`), go to the **Auth** tab, select **Bearer Token**, and paste your token there.
4.  **Check Access:** Try creating a team with a `player` role—you should get a `403 Forbidden` error!

---

## Technical Setup (For Developers)
*   **Packages:** `bcryptjs` (hashing passwords), `jsonwebtoken` (creating/verifying tokens).
*   **Secrets:** Make sure your `.env` has `JWT_SECRET` and `JWT_EXPIRE`.
