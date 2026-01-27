# Auth Service Documentation

## Overview

Auth service provides authentication functionality for regular users (customers), separate from admin authentication. It includes user registration, login, logout, password management, and email verification.

## Collections

### Users Collection (`users`)

Located at: [collections/users.ts](../collections/users.ts)

**Features:**

- Email/password authentication
- Email verification
- Account status management (active, inactive, suspended)
- User profile with company information
- Newsletter subscription
- Language preferences (Vietnamese/English)
- Login attempt tracking and account lockout

**Authentication Configuration:**

- Token expiration: 2 hours
- Max login attempts: 5
- Lock time: 10 minutes after max attempts
- Email verification: Enabled

## Auth Service Functions

Located at: [services/auth-service.ts](../services/auth-service.ts)

### 1. Register User

```typescript
import { registerUser } from "@/services/auth-service";

const result = await registerUser({
  email: "user@example.com",
  password: "secure-password",
  name: "John Doe",
  phone: "+84901234567",
  company: "ABC Company",
  address: "123 Street, City",
  newsletter: true,
  preferences: {
    language: "vi",
  },
});

// Response:
// {
//   success: true,
//   user: { id, email, name, verified },
//   message: "Registration successful. Please check your email to verify your account."
// }
```

### 2. Login User

```typescript
import { loginUser } from "@/services/auth-service";

const result = await loginUser({
  email: "user@example.com",
  password: "secure-password",
});

// Response:
// {
//   success: true,
//   user: { id, email, name, verified, status },
//   token: "jwt-token-here",
//   exp: 1234567890,
//   message: "Login successful"
// }
```

### 3. Logout User

```typescript
import { logoutUser } from "@/services/auth-service";

const result = await logoutUser(token);

// Response:
// {
//   success: true,
//   message: "Logout successful"
// }
```

### 4. Verify Token

```typescript
import { verifyToken } from "@/services/auth-service";

const result = await verifyToken(token);

// Response:
// {
//   success: true,
//   user: { id, email, name, verified, status }
// }
```

### 5. Get User By ID

```typescript
import { getUserById } from "@/services/auth-service";

const user = await getUserById(userId);
```

### 6. Update User Profile

```typescript
import { updateUserProfile } from "@/services/auth-service";

const result = await updateUserProfile(userId, {
  name: "Jane Doe",
  phone: "+84909876543",
  company: "XYZ Corp",
  newsletter: true,
});
```

### 7. Request Password Reset

```typescript
import { requestPasswordReset } from "@/services/auth-service";

const result = await requestPasswordReset("user@example.com");

// Response:
// {
//   success: true,
//   message: "Password reset email sent. Please check your inbox."
// }
```

### 8. Reset Password

```typescript
import { resetPassword } from "@/services/auth-service";

const result = await resetPassword({
  token: "reset-token-from-email",
  password: "new-secure-password",
});
```

### 9. Verify Email

```typescript
import { verifyEmail } from "@/services/auth-service";

const result = await verifyEmail(verificationToken);

// Response:
// {
//   success: true,
//   message: "Email verified successfully"
// }
```

### 10. Change Password

```typescript
import { changePassword } from "@/services/auth-service";

const result = await changePassword(userId, "current-password", "new-password");
```

### 11. Get All Users (Admin Only)

```typescript
import { getAllUsers } from "@/services/auth-service";

const result = await getAllUsers({
  page: 1,
  limit: 10,
  status: "active",
});
```

### 12. Update User Status (Admin Only)

```typescript
import { updateUserStatus } from "@/services/auth-service";

const result = await updateUserStatus(userId, "suspended");
```

## API Endpoints

### POST /api/auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "John Doe",
  "phone": "+84901234567",
  "company": "ABC Company",
  "address": "123 Street, City",
  "newsletter": true,
  "preferences": {
    "language": "vi"
  }
}
```

**Response (201):**

```json
{
  "success": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "verified": false
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

### POST /api/auth/login

Login with email and password. JWT token is stored in HTTP-only cookie.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "verified": true,
    "status": "active"
  },
  "message": "Login successful"
}
```

**Cookie Set:**

- Name: `payload-token`
- Value: JWT token
- HttpOnly: true
- Secure: true (in production)
- SameSite: lax
- Max-Age: 7200 seconds (2 hours)

### POST /api/auth/logout

Logout current user and clear token cookie.

**Response (200):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /api/auth/me

Get current logged-in user information from cookie token.

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "verified": true,
    "status": "active"
  }
}
```

### POST /api/auth/forgot-password

Request password reset email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "If the email exists, a password reset link has been sent."
}
```

### POST /api/auth/reset-password

Reset password using token from email.

**Request Body:**

```json
{
  "token": "reset-token-from-email",
  "password": "new-secure-password"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

### POST /api/auth/verify-email

Verify email using token from email (for AJAX requests).

**Request Body:**

```json
{
  "token": "verification-token"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### GET /api/auth/verify-email?token=xxx

Verify email using token from email link (for direct browser navigation).

**Query Parameters:**

- `token`: Verification token from email

**Response (200):**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### POST /api/auth/change-password

Change password for logged-in user (requires authentication cookie).

**Request Body:**

```json
{
  "currentPassword": "old-password",
  "newPassword": "new-secure-password"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Access Control

### Users Collection Access:

- **Create**: Public (anyone can register)
- **Read**: Users can read their own data, admins can read all
- **Update**: Users can update themselves, admins can update all
- **Delete**: Only admins can delete users

### User Status:

- **active**: Can login and use the system
- **inactive**: Cannot login
- **suspended**: Account locked, cannot login

## Security Features

1. **Password Requirements:**
   - Minimum 8 characters
   - Stored as bcrypt hash (handled by Payload)

2. **JWT Tokens:**
   - Stored in HTTP-only cookies
   - 2-hour expiration
   - Secure flag in production

3. **Login Protection:**
   - Max 5 failed attempts
   - 10-minute lockout after max attempts

4. **Email Verification:**
   - Enabled by default
   - Users receive verification email after registration

5. **Password Reset:**
   - Token-based reset via email
   - Tokens expire after use

## Email Configuration

**Note:** By default, Payload CMS writes emails to console in development. For production, configure an email adapter:

```typescript
// In payload.config.ts
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

export default buildConfig({
  // ... other config
  email: nodemailerAdapter({
    defaultFromAddress: "noreply@yourcompany.com",
    defaultFromName: "Your Company",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
});
```

## Usage Examples

### Frontend Login Form (React Component)

```typescript
"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to dashboard or home
        window.location.href = "/dashboard";
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Server-Side Authentication Check

```typescript
import { cookies } from "next/headers";
import { verifyToken } from "@/services/auth-service";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value;

  if (!token) {
    return null;
  }

  const result = await verifyToken(token);
  return result.success ? result.user : null;
}

// In your page component
export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <div>Welcome, {user.name}!</div>;
}
```

## Testing

### Test User Registration:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Test User Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### Test Get Current User:

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

### Test Logout:

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

## Admin Panel

Access the Payload admin panel at: `http://localhost:3000/admin`

**Users Collection:**

- View all registered users
- Update user status (active/inactive/suspended)
- View login history
- Manual email verification
- Delete user accounts

## Next Steps

1. **Email Configuration**: Set up email adapter for production (Nodemailer, SendGrid, etc.)
2. **Frontend Components**: Create login, register, profile pages
3. **Middleware**: Add authentication middleware for protected routes
4. **Social Login**: Add OAuth providers (Google, Facebook, etc.)
5. **Two-Factor Authentication**: Add 2FA for enhanced security

## Troubleshooting

### Email Verification Not Working

In development, verification emails are logged to console. Check terminal output for verification links.

### Token Expired Errors

JWT tokens expire after 2 hours. User needs to login again.

### Account Locked

After 5 failed login attempts, account is locked for 10 minutes. Wait or contact admin.

### Cannot Read User Data

Check access control rules. Users can only read their own data unless they're admins.
