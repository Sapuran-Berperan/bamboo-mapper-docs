---
title: QR Code Developer Guide
---

# QR Code Developer Guide

## Overview

The QR Code feature is tightly integrated with the marker system. Each marker gets a unique short code that is encoded into a QR code. When scanned, the QR code directs users to a deep link URL that retrieves the marker's full details from the public API.

### Architecture

![QR Code Architecture](/img/kkn2025/qr-code-architecture.png)

---

## Short Code Generation

### Algorithm

Each marker is assigned a unique 8-character alphanumeric short code stored in the `short_code` field.

**Character Set:** `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`

**Implementation** (`internal/util/shortcode.go`):

```go
const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

func GenerateShortCode() string {
    b := make([]byte, 8)
    for i := range b {
        b[i] = charset[rand.Intn(len(charset))]
    }
    return string(b)
}
```

### Uniqueness Guarantee

- Short codes are generated using a cryptographically secure random number generator
- Database enforces uniqueness via `UNIQUE` constraint on `short_code` column
- Collision probability is extremely low (~1 in 2.8 trillion for 8 characters with 36-character set)

---

## QR Code Generation Flow

### Endpoint

```
GET /v1/markers/{id}/qr
```

**Authentication:** Required (Bearer token)

**Response:** PNG image file

### Implementation Details

**Handler** (`internal/handler/marker.go`):

```go
func (h *MarkerHandler) GetQRCode(c *gin.Context) {
    id := c.Param("id")

    // Fetch marker with short code
    marker, err := h.markerService.GetByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "marker not found"})
        return
    }

    // Create deep link URL
    deepLink := fmt.Sprintf("%s/marker/%s", h.config.DeepLinkBaseURL, marker.ShortCode)

    // Generate QR code with logo
    qr, err := qrcode.NewWithLogo(deepLink, h.config.LogoPath, &qrcode.Config{
        Width:       300,
        LogoWidth:   90,  // 3x multiplier
        LogoPadding: 10,
    })

    // Return PNG image
    c.Header("Content-Type", "image/png")
    c.Header("Content-Disposition", fmt.Sprintf(`inline; filename="%s.png"`, marker.ShortCode))
    c.Data(http.StatusOK, "image/png", qr)
}
```

**Library Used:** `github.com/yeqown/go-qrcode/v2`

### Deep Link Format

```
{DEEP_LINK_BASE_URL}/marker/{shortCode}
```

Example:
```
https://bamboomapper.com/marker/ABC12345
```

---

## Deep Link Flow

### Public Endpoint

```
GET /v1/markers/code/{shortCode}
```

**Authentication:** Not required (public endpoint)

**Response:** JSON with full marker details

### Flow

1. User scans QR code with camera app
2. Camera app detects URL in QR code
3. User is redirected to deep link URL
4. Mobile app handles deep link (or browser opens web page)
5. App makes request to public endpoint with short code
6. Server returns marker details
7. App displays information to user

### Response Example

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "short_code": "ABC12345",
  "name": "Bambu Apus",
  "strain": "Gigantochloa apus",
  "quantity": 15,
  "latitude": -7.12345678,
  "longitude": 109.12345678,
  "image_url": "https://cdn.bamboomapper.com/markers/abc12345.jpg",
  "owner_name": "Budi Santoso",
  "owner_contact": "+6281234567890",
  "description": "Bambu apus berkualitas baik",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

---

## Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DEEP_LINK_BASE_URL` | Base URL for deep links | `https://bamboomapper.com` |

### QR Code Options

| Option | Value | Description |
|--------|-------|-------------|
| Format | PNG | Image format |
| Width | 300px | QR code size |
| Logo | Sapuran logo | Centered logo |
| Logo Width | 90px | 3x size multiplier |
| Logo Padding | 10px | Space around logo |

---

## API Reference

### Generate QR Code

**Request:**

```bash
curl -X GET "https://api.bamboomapper.com/v1/markers/{id}/qr" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output qr-code.png
```

**Response:**

- **Status:** `200 OK`
- **Content-Type:** `image/png`
- **Body:** Binary PNG image

**Error Responses:**

| Status | Description |
|--------|-------------|
| 401 | Unauthorized (invalid/missing token) |
| 404 | Marker not found |

### Get Marker by Short Code

**Request:**

```bash
curl -X GET "https://api.bamboomapper.com/v1/markers/code/{shortCode}"
```

**Response:**

```json
{
  "id": "...",
  "short_code": "ABC12345",
  "name": "Bambu Apus",
  ...
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| 404 | Marker with given short code not found |

---

## Database Schema

```sql
CREATE TABLE markers (
    id UUID PRIMARY KEY,
    short_code VARCHAR(8) UNIQUE NOT NULL,  -- QR code target
    creator_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    strain VARCHAR(100),
    quantity INT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    image_url TEXT,
    owner_name VARCHAR(100),
    owner_contact VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Security Considerations

1. **QR Code Generation** requires authentication (user must own the marker)
2. **Public Endpoint** is intentionally unauthenticated to allow anyone to scan and view marker info
3. **Short Codes** are randomly generated and not guessable for practical purposes
4. **CORS** configuration controls which domains can access the public endpoint

