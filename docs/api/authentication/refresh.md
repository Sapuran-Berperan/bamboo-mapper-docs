---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Refresh Token

Get a new access token using a refresh token. The old refresh token is invalidated and a new one is issued (token rotation).

```
POST /api/v1/auth/refresh
```

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `refresh_token` | string | Yes | Valid refresh token |

```json
{
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl..."
}
```

## Response

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
