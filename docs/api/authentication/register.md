---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Register

Create a new user account.

```
POST /api/v1/auth/register
```

## Request Body

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

## Response

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
