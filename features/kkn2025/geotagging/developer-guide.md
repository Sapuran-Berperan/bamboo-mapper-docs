---
title: Geotagging Developer Guide
---

# Geotagging Developer Guide

## Overview

Geotagging is a core capability across the Bamboo Mapper ecosystem. It enables accurate location capture and storage for bamboo markers, implemented consistently across backend (Go), dashboard (React/TypeScript), and mobile app (Flutter).

### Geotagging Architecture

![Geotagging Flow](/img/kkn2025/geotagging-flow.png)

---

## Coordinate System

### Format

Bamboo Mapper uses **decimal degrees** (DD), not degrees-minutes-seconds (DMS).

**Backend Storage:**
- Latitude: `DECIMAL(10,8)` — range -90.00000000 to +90.00000000
- Longitude: `DECIMAL(11,8)` — range -180.00000000 to +180.00000000

**Precision by Platform:**

| Platform | Precision | Use Case |
|----------|-----------|----------|
| Backend | 8 decimals | Max precision (±1.1mm) |
| Mobile | 6 decimals | Balance of precision & UI |
| Dashboard | 6-8 decimals | Full precision for display |

### Validation Rules

**Latitude:** -90.0 to +90.0
```go
// backend/internal/model/marker.go
if lat < -90 || lat > 90 {
    return errors.New("latitude must be between -90 and 90")
}
```

**Longitude:** -180.0 to +180.0
```go
if lng < -180 || lng > 180 {
    return errors.New("longitude must be between -180 and 180")
}
```

---

## Backend Implementation (Go)

### Handler Validation

**File:** `internal/handler/marker.go`

```go
func (h *MarkerHandler) CreateMarker(c *gin.Context) {
    var req CreateMarkerRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    // Validate coordinates
    lat, err := strconv.ParseFloat(req.Latitude, 64)
    if err != nil || lat < -90 || lat > 90 {
        c.JSON(400, gin.H{"error": "invalid latitude"})
        return
    }

    lng, err := strconv.ParseFloat(req.Longitude, 64)
    if err != nil || lng < -180 || lng > 180 {
        c.JSON(400, gin.H{"error": "invalid longitude"})
        return
    }

    // Create marker with validated coordinates
    marker := &model.Marker{
        Latitude:  req.Latitude,
        Longitude: req.Longitude,
        // ... other fields
    }
}
```

### Database Schema

**File:** `migrations/000001_init_schema.up.sql`

```sql
CREATE TABLE markers (
    id UUID PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    -- Spatial index for efficient queries
);

CREATE INDEX idx_markers_location ON markers(latitude, longitude);
```

### EXIF Writing

**File:** `internal/imaging/exif.go`

Coordinates are embedded into uploaded images:

```go
func WriteGPSExif(imagePath string, lat, lng float64) error {
    // Convert decimal to DMS for EXIF format
    latDeg, latMin, latSec := decimalToDMS(lat)
    lngDeg, lngMin, lngSec := decimalToDMS(lng)

    // Write EXIF GPS tags
    exif := &exif.GPSInfo{
        Latitude:  []float64{latDeg, latMin, latSec},
        Longitude: []float64{lngDeg, lngMin, lngSec},
        // ... direction ref
    }

    return exif.Write(imagePath, exif)
}
```

---

## Dashboard Implementation (React + TypeScript)

### LocationPicker Component

**File:** `src/components/markers/LocationPicker.tsx`

```tsx
import { MapContainer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface LocationPickerProps {
  value: { latitude: string; longitude: string };
  onChange: (lat: string, lng: string) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const position = new LatLng(
    parseFloat(value.latitude) || -7.434757,
    parseFloat(value.longitude) || 109.991819
  );

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        onChange(
          e.latlng.lat.toFixed(8),
          e.latlng.lng.toFixed(8)
        );
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend(e) {
            onChange(
              e.target.getLatLng().lat.toFixed(8),
              e.target.getLatLng().lng.toFixed(8)
            );
          },
        }}
      />
    </MapContainer>
  );
}
```

### Manual Input with Validation

```tsx
interface CoordinateInputProps {
  value: string;
  onChange: (value: string) => void;
  type: 'latitude' | 'longitude';
}

export function CoordinateInput({ value, onChange, type }: CoordinateInputProps) {
  const validate = (val: string): boolean => {
    const num = parseFloat(val);
    if (isNaN(num)) return false;
    return type === 'latitude'
      ? num >= -90 && num <= 90
      : num >= -180 && num <= 180;
  };

  return (
    <input
      type="number"
      step="0.000001"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={validate(value) ? 'valid' : 'invalid'}
      placeholder={type === 'latitude' ? '-7.434757' : '109.991819'}
    />
  );
}
```

---

## Mobile App Implementation (Flutter)

### Dependencies

**File:** `pubspec.yaml`

```yaml
dependencies:
  geolocator: ^13.0.2      # GPS location service
  flutter_map: ^6.1.0      # OpenStreetMap widget
  latlong2: ^0.9.0         # Coordinate handling
  permission_handler: ^11.3.1  # Runtime permissions
```

### GPS Controller

**File:** `lib/src/app/use_cases/gps_controller.dart`

```dart
import 'package:geolocator/geolocator.dart';

class GpsController {
  /// Get current position with high accuracy
  Future<Position> getCurrentPosition() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw LocationServiceDisabledException();
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        throw PermissionDeniedException();
      }
    }

    if (permission == LocationPermission.deniedForever) {
      throw PermissionDeniedForeverException();
    }

    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.best,
      timeLimit: const Duration(seconds: 10),
    );
  }

  /// Stream position updates for real-time tracking
  Stream<Position> getPositionStream() {
    return Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.best,
        distanceFilter: 5, // Update every 5 meters
      ),
    );
  }
}
```

### Location Picker Widget

**File:** `lib/src/app/presentation/widgets/molecule/location_picker.dart`

```dart
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class LocationPicker extends StatefulWidget {
  final LatLng? initialPosition;
  final Function(LatLng) onLocationSelected;

  const LocationPicker({
    required this.onLocationSelected,
    this.initialPosition,
  });

  @override
  State<LocationPicker> createState() => _LocationPickerState();
}

class _LocationPickerState extends State<LocationPicker> {
  LatLng? selectedPosition;

  @override
  void initState() {
    super.initState();
    selectedPosition = widget.initialPosition;
  }

  Future<void> _getCurrentLocation() async {
    try {
      final position = await GetIt.I<GpsController>().getCurrentPosition();
      setState(() {
        selectedPosition = LatLng(position.latitude, position.longitude);
      });
      widget.onLocationSelected(selectedPosition!);
    } catch (e) {
      // Show error message
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Manual input fields
        TextFormField(
          initialValue: selectedPosition?.latitude.toStringAsFixed(6),
          decoration: const InputDecoration(labelText: 'Latitude'),
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          validator: (value) {
            final lat = double.tryParse(value ?? '');
            if (lat == null || lat < -90 || lat > 90) {
              return 'Invalid latitude (-90 to 90)';
            }
            return null;
          },
          onSaved: (value) {
            // Update position
          },
        ),
        TextFormField(
          initialValue: selectedPosition?.longitude.toStringAsFixed(6),
          decoration: const InputDecoration(labelText: 'Longitude'),
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          validator: (value) {
            final lng = double.tryParse(value ?? '');
            if (lng == null || lng < -180 || lng > 180) {
              return 'Invalid longitude (-180 to 180)';
            }
            return null;
          },
        ),
        // GPS button
        ElevatedButton(
          onPressed: _getCurrentLocation,
          child: const Text('Use Current Location'),
        ),
        // Map picker
        SizedBox(
          height: 300,
          child: FlutterMap(
            options: MapOptions(
              initialCenter: selectedPosition ?? const LatLng(-7.434757, 109.991819),
              initialZoom: 15,
              onTap: (tapPosition, point) {
                setState(() => selectedPosition = point);
                widget.onLocationSelected(point);
              },
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
              ),
              // Crosshair at center
              const Center(
                child: Icon(Icons.location_on, size: 40, color: Colors.red),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

### Permission Handling

**File:** `lib/src/app/use_cases/permission_controller.dart`

```dart
import 'package:permission_handler/permission_handler.dart';

class PermissionController {
  Future<bool> requestLocationPermission() async {
    final status = await Permission.location.request();

    if (status.isDenied) {
      // Show dialog explaining why permission is needed
      return false;
    }

    if (status.isPermanentlyDenied) {
      // Open app settings
      await openAppSettings();
      return false;
    }

    return status.isGranted;
  }

  Future<bool> isLocationGranted() async {
    return await Permission.location.isGranted;
  }
}
```

---

## Offline & Sync Strategy

The mobile app uses an **offline-first architecture** for location data:

### Local Storage

```dart
// Marker stored locally with SQLite
class EntitiesMarker {
  final String id;
  final double latitude;
  final double longitude;
  final bool isSynced; // Track sync status

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'latitude': latitude.toString(),
      'longitude': longitude.toString(),
      'is_synced': isSynced ? 1 : 0,
    };
  }
}
```

### Sync Service

**File:** `lib/src/app/data/services/sync_service.dart`

```dart
class SyncService {
  Future<void> syncPendingMarkers() async {
    if (!await _networkMonitor.isConnected()) return;

    final pendingMarkers = await _localDb.getUnsyncedMarkers();

    for (final marker in pendingMarkers) {
      try {
        await _apiClient.createMarker(marker);
        await _localDb.markAsSynced(marker.id);
      } catch (e) {
        // Retry later
      }
    }
  }
}
```

---

## API Data Flow

### Create Marker Request

```bash
POST /api/markers
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Bambu Apus",
  "latitude": "-7.434757",
  "longitude": "109.991819",
  "description": "Bambu apus berkualitas baik",
  "strain": "Gigantochloa apus",
  "quantity": 15
}
```

### Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "short_code": "ABC12345",
  "name": "Bambu Apus",
  "latitude": "-7.43475700",
  "longitude": "109.99181900",
  "description": "Bambu apus berkualitas baik",
  "created_at": "2025-01-25T10:00:00Z"
}
```

---

## Configuration

### Backend (`.env`)

```env
# Default map center for Indonesia
DEFAULT_LATITUDE=-7.434757
DEFAULT_LONGITUDE=109.991819
```

### Dashboard (`src/config/map.ts`)

```typescript
export const MAP_CONFIG = {
  defaultCenter: [-7.434757, 109.991819] as [number, number],
  defaultZoom: 13,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 19,
  minZoom: 3,
};
```

### Mobile (`lib/core/config/map_config.dart`)

```dart
class MapConfig {
  static const double defaultLatitude = -7.434757;
  static const double defaultLongitude = 109.991819;
  static const double defaultZoom = 15.0;
  static const String tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
}
```

---

## Best Practices

1. **Always validate coordinates** before storing or sending to API
2. **Handle location permissions** gracefully with user-friendly messages
3. **Provide fallback** when GPS is unavailable (map picker, manual input)
4. **Store precision consistently** — 6 decimals for UI, 8 for backend
5. **Use offline-first** approach for mobile to handle poor connectivity
6. **Display accuracy indicators** when using GPS for transparency
7. **Consider battery impact** — balance GPS accuracy with power consumption
