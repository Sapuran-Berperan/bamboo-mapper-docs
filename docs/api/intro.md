---
sidebar_position: 1
---

# Pengenalan API

Backend Bamboo Mapper dibangun menggunakan **Go** dengan framework **Chi** dan database **PostgreSQL**. API ini menyediakan endpoint untuk autentikasi pengguna dan pengelolaan data marker bambu.

## Tech Stack

- **Bahasa:** Go 1.25
- **Framework:** Chi v5 (HTTP router)
- **Database:** PostgreSQL
- **Autentikasi:** JWT (JSON Web Tokens)
- **Penyimpanan Gambar:** Google Drive API
- **QR Code:** yeqown/go-qrcode

## Entity Relationship Diagram

![ERD](/img/ERD.png)

## Perubahan Desain Database

Berikut adalah perubahan yang dilakukan pada desain database dari versi sebelumnya:

### 1. Menggabungkan Table Marker dengan Marker Agrihub

Table `marker` dan `marker_agrihub` digabungkan menjadi satu table `markers` untuk menyederhanakan struktur data dan menghindari redundansi.

### 2. Memecah Kolom Location Menjadi Latitude dan Longitude

Kolom `location` yang sebelumnya menyimpan data geografis dalam satu field dipecah menjadi dua kolom terpisah:
- `latitude` (decimal 10,8)
- `longitude` (decimal 11,8)

Pemisahan ini memudahkan query dan integrasi dengan berbagai layanan peta.

### 3. Mengubah Strain Menjadi Teks Bebas

Kolom `strain` yang sebelumnya menggunakan enum atau referensi ke table terpisah diubah menjadi `varchar(100)` untuk memberikan fleksibilitas dalam mencatat jenis bambu.

### 4. Menyimpan Password Hash

Untuk keamanan, password pengguna tidak lagi disimpan dalam bentuk plain text. Sistem sekarang menyimpan `password_hash` menggunakan algoritma bcrypt dengan cost factor 12.

### 5. Menambahkan Timestamp

Setiap table sekarang memiliki kolom:
- `created_at` - Waktu pembuatan record
- `updated_at` - Waktu terakhir record diperbarui

Timestamp ini menggunakan tipe `timestamptz` untuk mendukung timezone.

### 6. Menggunakan Snake Case

Semua nama kolom dan table menggunakan format `snake_case` untuk konsistensi dengan konvensi PostgreSQL:
- `createdAt` → `created_at`
- `userId` → `user_id`
- `shortCode` → `short_code`

### 7. Membuat Table Refresh Token

Table baru `refresh_tokens` ditambahkan untuk mendukung sistem autentikasi JWT dengan refresh token:

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Foreign key ke users |
| `token_hash` | varchar(64) | Hash SHA-256 dari refresh token |
| `expires_at` | timestamptz | Waktu kedaluwarsa token |
| `revoked_at` | timestamptz | Waktu pencabutan (nullable) |
| `created_at` | timestamptz | Waktu pembuatan |
| `user_agent` | varchar(255) | Browser/device info |
| `ip_address` | varchar(45) | Alamat IP pengguna |

## Format Response API

Semua endpoint menggunakan format response yang konsisten:

```json
{
  "meta": {
    "success": true,
    "message": "Operation successful"
  },
  "data": {
    // Response data
  }
}
```

Jika terjadi error validasi:

```json
{
  "meta": {
    "success": false,
    "message": "Validation failed",
    "details": {
      "field_name": "error message"
    }
  },
  "data": null
}
```

## Base URL

```
/api/v1
```

## Autentikasi

API menggunakan JWT Bearer token. Sertakan header berikut pada request yang memerlukan autentikasi:

```
Authorization: Bearer {access_token}
```

- **Access Token:** Berlaku selama 1 jam
- **Refresh Token:** Berlaku selama 7 hari
