---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Marker

Create a new bamboo marker with optional image upload.

```
POST /api/v1/markers/
```

## Headers

```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

## Form Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Marker name |
| `latitude` | string | Yes | GPS latitude |
| `longitude` | string | Yes | GPS longitude |
| `description` | string | No | Detailed description |
| `strain` | string | No | Bamboo species/strain |
| `quantity` | integer | No | Number of bamboo (>= 0) |
| `owner_name` | string | No | Land owner's name |
| `owner_contact` | string | No | Owner's contact info |
| `image` | file | No | Image file (max 10MB) |

## Response

<Tabs>
  <TabItem value="201" label="201: Created" default>

```json
{
  "meta": {
    "success": true,
    "message": "Marker created successfully"
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

:::note
- `short_code` is auto-generated (6-character alphanumeric)
- `creator_id` is automatically set from the authenticated user
- Image is uploaded to Google Drive with filename `{shortCode}.{ext}`
:::

  </TabItem>
  <TabItem value="400" label="400: Bad Request">

```json
{
  "meta": {
    "success": false,
    "message": "Validation failed",
    "details": {
      "name": "name is required",
      "latitude": "latitude is required",
      "longitude": "longitude is required"
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
    "message": "Missing or invalid token"
  },
  "data": null
}
```

  </TabItem>
</Tabs>
