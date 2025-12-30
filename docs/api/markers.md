---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Markers

Endpoints for managing bamboo location markers.

## List Markers

Get all markers in a lightweight format optimized for map display.

```
GET /api/v1/markers/
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

---

## Get Marker by ID

Get full marker details by UUID.

```
GET /api/v1/markers/{id}
```

### Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | uuid | path | Marker ID |

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

---

## Get Marker by Short Code

Get marker by short code. This endpoint is **public** (no authentication required) and is used for QR code scanning.

```
GET /api/v1/markers/code/{shortCode}
```

### Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `shortCode` | string | path | 6-character short code |

### Response

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

---

## Create Marker

Create a new bamboo marker with optional image upload.

```
POST /api/v1/markers/
```

### Headers

```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

### Form Data

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

### Response

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

---

## Update Marker

Update an existing marker. Only provided fields are updated (partial update supported).

```
PUT /api/v1/markers/{id}
```

### Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | uuid | path | Marker ID |

### Headers

```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

### Form Data

Same fields as [Create Marker](#create-marker). All fields are optional for updates.

### Response

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

---

## Delete Marker

Delete a marker and its associated image.

```
DELETE /api/v1/markers/{id}
```

### Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | uuid | path | Marker ID |

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
    "message": "Marker deleted successfully"
  },
  "data": null
}
```

:::note
Associated image in Google Drive is also deleted. Deletion continues even if image deletion fails.
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

---

## Get QR Code

Generate and download a QR code image for a marker.

```
GET /api/v1/markers/{id}/qr
```

### Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | uuid | path | Marker ID |

### Headers

```
Authorization: Bearer {access_token}
```

### Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

Returns a PNG image file.

| Header | Value |
|--------|-------|
| Content-Type | `image/png` |
| Content-Disposition | `inline; filename="{shortCode}.png"` |

:::note
- QR code encodes a deep link URL: `{DEEP_LINK_BASE_URL}/marker/{shortCode}`
- Generated on-the-fly (not stored)
- PNG format
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
