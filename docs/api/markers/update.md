---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Marker

Update an existing marker. Only provided fields are updated (partial update supported).

```
PUT /api/v1/markers/{id}
```

## Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | uuid | path | Marker ID |

## Headers

```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

## Form Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Marker name |
| `latitude` | string | No | GPS latitude |
| `longitude` | string | No | GPS longitude |
| `description` | string | No | Detailed description |
| `strain` | string | No | Bamboo species/strain |
| `quantity` | integer | No | Number of bamboo (>= 0) |
| `owner_name` | string | No | Land owner's name |
| `owner_contact` | string | No | Owner's contact info |
| `image` | file | No | Image file (max 10MB) |

## Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Marker updated successfully"
  },
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "short_code": "ABC123",
    "creator_id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Bamboo Cluster A - Updated",
    "description": "Updated description",
    "strain": "Bambusa vulgaris",
    "quantity": 75,
    "latitude": "-7.797068",
    "longitude": "110.370529",
    "image_url": "https://drive.google.com/uc?id=...",
    "owner_name": "Pak Bambang",
    "owner_contact": "081234567890",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-02T00:00:00Z"
  }
}
```

:::note
If a new image is provided, the old image is deleted from Google Drive before uploading the new one.
:::

  </TabItem>
  <TabItem value="400" label="400: Bad Request">

```json
{
  "meta": {
    "success": false,
    "message": "Invalid marker ID format"
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
