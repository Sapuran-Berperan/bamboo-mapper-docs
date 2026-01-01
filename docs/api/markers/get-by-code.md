---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Marker by Short Code

Get marker by short code. This endpoint is **public** (no authentication required) and is used for QR code scanning.

```
GET /api/v1/markers/code/{shortCode}
```

## Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `shortCode` | string | path | 6-character short code |

## Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Marker retrieved successfully"
  },
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "short_code": "ABC123",
    "creator_id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Bamboo Cluster A",
    "description": "Large bamboo cluster near the river",
    "strain": "Bambusa vulgaris",
    "quantity": 50,
    "latitude": "-7.797068",
    "longitude": "110.370529",
    "image_url": "https://drive.google.com/uc?id=...",
    "owner_name": "Pak Bambang",
    "owner_contact": "081234567890",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

  </TabItem>
  <TabItem value="404" label="404: Not Found">

```json
{
  "meta": {
    "success": false,
    "message": "Marker not found"
  },
  "data": null
}
```

  </TabItem>
</Tabs>
