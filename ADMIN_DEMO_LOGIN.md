# Admin Panel demo login

1. Start the frontend with `npm run dev`.
2. Open `/admin/login` directly.
3. Enter any syntactically valid email address.
4. Enter any password with at least six characters.
5. Select a demonstration role:
   - **Super Admin** — all admin modules.
   - **Admin** — approved content and operations modules.
   - **Staff** — dashboard, activities, projects (view), volunteers, enquiries, and stories (view).
6. Select **Sign in** to open `/admin/dashboard`. Use **Log out** to end the in-memory demo session.

There are no fixed credentials or production accounts. Authentication exists only in frontend memory, resets on reload, and is not a security control. Do not use this login pattern in production. A future backend must authenticate the user and enforce every permission on each API request.
