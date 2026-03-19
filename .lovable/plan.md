

# Replace Client-Side Admin Auth with Supabase Auth via Lovable Cloud

## Overview

Replace the insecure hardcoded passcode authentication (`ADMIN_PASSCODE = 'miki'` + sessionStorage) with proper Supabase Auth using Lovable Cloud. Admin access will be controlled by a `user_roles` table with RLS policies.

## Current State

- No Supabase integration exists in the project
- Admin auth uses a hardcoded passcode compared client-side
- Auth state stored in sessionStorage (easily spoofed)
- Admin panel at `/admin` manages trips, gallery, and insurance via localStorage

## Plan

### Step 1: Enable Lovable Cloud and set up Supabase

- Enable Lovable Cloud to provision a Supabase backend
- Install `@supabase/supabase-js` and create the Supabase client at `src/integrations/supabase/client.ts`

### Step 2: Create database tables and RLS

- **`profiles` table**: `id` (uuid, FK to auth.users), `display_name`, `avatar_url`, `created_at`
  - Trigger to auto-create profile on signup
  - RLS: users can read/update their own profile
- **`user_roles` table**: `id`, `user_id` (FK to auth.users), `role` (enum: admin, user)
  - RLS: admins can read roles; no public write access
- **`has_role()` security definer function**: prevents RLS recursion when checking roles
- Seed an initial admin user (you'll set the email/password after setup)

### Step 3: Rewrite AdminContext to use Supabase Auth

Replace the current `AdminContext` with:
- `onAuthStateChange` listener for session management
- `signInWithPassword` for login (email + password instead of passcode)
- `signOut` for logout
- Role check via `has_role(uid, 'admin')` to verify admin access
- Loading state while session initializes

### Step 4: Update AdminLogin page

- Change from single passcode field to email + password form
- Call `supabase.auth.signInWithPassword()` on submit
- Keep existing visual design (logo, card layout, animation)

### Step 5: Update Admin page

- Replace `useAdmin()` hook calls with the new Supabase-backed context
- Admin dashboard behavior unchanged otherwise

### Step 6: Clean up security findings

- Delete the `hardcoded_passcode` and `admin_client_auth` security findings since they'll be resolved

## What stays the same

- All admin panel functionality (trips, gallery, insurance management)
- Data still stored in localStorage (no migration to DB in this change)
- Visual design and UX of login and admin pages
- Route structure (`/admin/login`, `/admin`)

## Technical Details

- Auth uses Supabase's built-in `auth.users` table
- Roles stored in separate `user_roles` table (not on profiles) per security best practices
- `has_role()` is `SECURITY DEFINER` to avoid RLS recursion
- JWT verified client-side via `onAuthStateChange`; role checked via DB query
- After setup, you'll create your admin account by signing up, then the seed migration assigns the admin role

