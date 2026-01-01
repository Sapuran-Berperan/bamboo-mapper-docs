---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# List Markers

Get all markers in a lightweight format optimized for map display.

```
GET /api/v1/markers/
```

## Headers

```
Authorization: Bearer {access_token}
```

## Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Markers retrieved successfully"
  },
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "short_code": "ABC123",
      "name": "Bamboo Cluster A",
      "latitude": "-7.797068",
      "longitude": "110.370529"
    }
  ]
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
