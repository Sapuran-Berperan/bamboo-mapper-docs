---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# List Markers (Paginated)

Get markers with pagination, sorting, search, and filtering. Designed for dashboard usage with full marker details.

```
GET /v1/markers/paginated
```

## Headers

```
Authorization: Bearer {access_token}
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number (minimum: 1) |
| `per_page` | integer | `10` | Items per page (minimum: 1, maximum: 100) |
| `sort_by` | string | `created_at` | Sort field: `name`, `created_at`, `updated_at`, `strain`, `quantity` |
| `sort_dir` | string | `desc` | Sort direction: `asc`, `desc` |
| `search` | string | - | Search in name, description, and strain |
| `date_from` | string | - | Filter by creation date (format: `YYYY-MM-DD`) |
| `date_to` | string | - | Filter by creation date (format: `YYYY-MM-DD`) |
| `creator_id` | uuid | - | Filter by creator user ID |

## Example Requests

```bash
# Basic pagination
GET /v1/markers/paginated?page=1&per_page=10

# With sorting
GET /v1/markers/paginated?sort_by=name&sort_dir=asc

# With search
GET /v1/markers/paginated?search=bambusa

# With date filter
GET /v1/markers/paginated?date_from=2025-01-01&date_to=2025-12-31

# Combined filters
GET /v1/markers/paginated?page=1&per_page=20&sort_by=created_at&sort_dir=desc&search=cluster
```

## Response

<Tabs>
  <TabItem value="200" label="200: OK" default>

```json
{
  "meta": {
    "success": true,
    "message": "Markers retrieved successfully",
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_items": 45,
      "total_pages": 5
    }
  },
  "data": [
    {
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
  ]
}
```

  </TabItem>
  <TabItem value="400" label="400: Bad Request">

```json
{
  "meta": {
    "success": false,
    "message": "Invalid query parameters"
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

## Notes

- When `page` is less than 1, it defaults to 1
- When `per_page` exceeds 100, it is capped at 100
- Invalid `sort_by` or `sort_dir` values are ignored and defaults are used
- The `date_to` filter is inclusive (includes the entire day)
- Search is case-insensitive and matches partial strings
