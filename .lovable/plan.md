

# Fix Runtime Errors and Create Admin Account

## Problem

Two issues to address:

1. **Runtime crash**: `TooltipProvider` throws "Cannot read properties of null (reading 'useRef')" — this is a React version mismatch. The installed `@radix-ui/react-tooltip` v1.2.x (and other radix packages at similar versions) require React 19, but the project uses React 18.3.1. This causes duplicate/incompatible React instances.

2. **Admin account**: Need to create an admin user "Zac" so authentication works.

## Fix Plan

### Step 1: Fix React version mismatch

Downgrade `@radix-ui/react-tooltip` to a version compatible with React 18 (v1.1.x), or alternatively pin all radix packages to React 18-compatible versions. The simplest fix is to check `package.json` for all radix packages at versions that jumped to React 19 support and pin them to the last React 18-compatible versions.

### Step 2: Create admin account for Zac

- Enable auto-confirm for email signups (so the account works immediately without email verification)
- Ask for Zac's email address and desired password
- Sign up the user via the app, then insert an admin role into `user_roles` table via SQL

### Step 3: Verify

- App should render without the TooltipProvider crash
- Zac can log in at `/admin/login` with email + password

## Questions needed

I need Zac's email address and desired password to create the admin account.

