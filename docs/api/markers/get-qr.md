---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get QR Code

Generate and download a QR code image for a marker.

```
GET /api/v1/markers/{id}/qr
```

## Parameters

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | uuid | path | Marker ID |

## Headers

```
Authorization: Bearer {access_token}
```

## Response

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
