---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Authentication

Authentication endpoints for user registration, login, and token management.

## Register

Create a new user account.

```
POST /api/v1/auth/register
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email address |
| `name` | string | Yes | User's full name (max 100 characters) |
| `password` | string | Yes | Password (min 8 characters) |

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}
```

### Response

<Tabs>
  <TabItem value="201" label="201: Created" default>

```json
{
  "meta": {
    "success": true,
    "message": "User registered successfully"
  },
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

  </TabItem>
  <TabItem value="400" label="400: Bad Request">

```json
{
  "meta": {
    "success": false,
    "message": "Validation failed",
    "details": {
      "email": "invalid email format",
      "password": "password must be at least 8 characters"
    }
  },
  "data": null
}
```

  </TabItem>
  <TabItem value="409" label="409: Conflict">

```json
{
  "meta": {
    "success": false,
    "message": "Email already registered"
  },
  "data": null
}
```

  </TabItem>
</Tabs>

---

## Login

Authenticate user and receive access and refresh tokens.

```
POST /api/v1/auth/login
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Login successful"
  },
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  }
}
```

  </TabItem>
  <TabItem value="400" label="400: Bad Request">

```json
{
  "meta": {
    "success": false,
    "message": "Validation failed",
    "details": {
      "email": "email is required",
      "password": "password is required"
    }
  },
  "data": null
}
```

  </TabItem>
  <TabItem value="401" label="401: Unauthorized">

```json
{
  "meta": {
    "success": false,
    "message": "Invalid email or password"
  },
  "data": null
}
```

  </TabItem>
</Tabs>

---

## Refresh Token

Get a new access token using a refresh token. The old refresh token is invalidated and a new one is issued (token rotation).

```
POST /api/v1/auth/refresh
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `refresh_token` | string | Yes | Valid refresh token |

```json
{
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl..."
}
```

### Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Token refreshed successfully"
  },
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "bmV3IHJlZnJlc2ggdG9r...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

  </TabItem>
  <TabItem value="400" label="400: Bad Request">

```json
{
  "meta": {
    "success": false,
    "message": "Validation failed",
    "details": {
      "refresh_token": "refresh_token is required"
    }
  },
  "data": null
}
```

  </TabItem>
  <TabItem value="401" label="401: Unauthorized">

```json
{
  "meta": {
    "success": false,
    "message": "Invalid or expired refresh token"
  },
  "data": null
}
```

  </TabItem>
</Tabs>

---

## Get Current User

Get the authenticated user's profile information.

```
GET /api/v1/auth/me
```

### Headers

```
Authorization: Bearer {access_token}
```

### Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "User retrieved successfully"
  },
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

  </TabItem>
  <TabItem value="401" label="401: Unauthorized">

```json
{
  "meta": {
    "success": false,
    "message": "Missing or invalid token"
  },
  "data": null
}
```

  </TabItem>
</Tabs>

---

## Logout

Logout the user and revoke all their refresh tokens.

```
POST /api/v1/auth/logout
```

### Headers

```
Authorization: Bearer {access_token}
```

### Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Logged out successfully"
  },
  "data": null
}
```

  </TabItem>
  <TabItem value="401" label="401: Unauthorized">

```json
{
  "meta": {
    "success": false,
    "message": "Missing or invalid token"
  },
  "data": null
}
```

  </TabItem>
</Tabs>
