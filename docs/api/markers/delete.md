---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Marker

Delete a marker and its associated image.

```
DELETE /api/v1/markers/{id}
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
