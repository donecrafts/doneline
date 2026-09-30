# SAVORÉ

A restaurant website built with React, TypeScript, Vite, and Supabase.

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and add your Supabase project URL and anon key. In the Supabase SQL editor, run the files in `supabase/migrations` in order: `20260929120000_reservations.sql`, then `20260930100000_avatars.sql`.

For instant sign-in during development, turn off email confirmation under Authentication settings. Guests sign up and sign in from the navbar; the menu button holds their profile link and sign out. Signed-in guests can send a reservation request, which is stored in Supabase. The profile screen (`#profile`) shows their details and reservation requests, lets them change their name, and uploads a profile photo to the `avatars` storage bucket.

SAVORÉ is a fictional restaurant.
