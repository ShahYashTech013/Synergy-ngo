# Synergy NGO Backend

Node.js + Express + MongoDB + Razorpay starter for donation processing.

## Setup
1. Copy `.env.example` to `.env` and fill in your credentials.
2. Run `npm install`.
3. Run `npm run dev`.

The API starts on `http://localhost:5000`.

## User authentication
- `POST /api/auth/register` accepts `{ "name", "email", "password" }` and returns a JWT with safe user details.
- `POST /api/auth/login` accepts `{ "email", "password" }` and returns a JWT with safe user details.
- `GET /api/auth/me` requires `Authorization: Bearer <token>` and returns the authenticated user.
- New accounts are stored in the `synergy_ngo.users` collection. Passwords are bcrypt-hashed and email has a unique index.
- Set `JWT_SECRET` to a long, random value, `JWT_EXPIRES_IN` to a supported duration (default `1d`), and `CLIENT_URL` to the exact frontend origin.

## Important
- Never commit `.env` or expose Razorpay secrets.
- Copy `.env.example` to `.env` and set your MongoDB Atlas URI and secrets locally; do not use example values as production credentials.
- Payment is marked paid only after server-side signature verification and Razorpay API confirmation.
- Configure Razorpay webhook URL as `https://YOUR_DOMAIN/api/payments/webhook` and use the same webhook secret in `.env`.
- Use Razorpay test keys while developing.
- NGO KYC, bank account, and any applicable compliance approvals must be completed with Razorpay before accepting live donations.
