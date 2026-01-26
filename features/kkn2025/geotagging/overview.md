---
title: Fitur Geotagging
---

# Fitur Geotagging

## Pendahuluan

Geotagging adalah fitur yang memungkinkan Anda mencatat koordinat lokasi yang akurat untuk setiap bambu yang dipetakan. Setiap marker Bamboo Mapper dilengkapi dengan data latitude dan longitude yang menunjukkan posisi persis bambu di bumi.

### Mengapa Lokasi Akurat Penting?

- **Pelacakan Mudah**: Temukan kembali lokasi bambu dengan koordinat yang tepat
- **Analisis Spasial**: Pahami sebaran bambu dalam suatu area
- **Dokumentasi Ilmiah**: Data lokasi presisi mendukung penelitian dan monitoring
- **Manajemen Aset**: Kelola populasi bambu berdasarkan lokasi geografis

### Konsep: Latitude & Longitude

- **Latitude**: Garis horizontal yang menunjukkan posisi utara-selatan (-90° hingga +90°)
  - Nilai positif: Utara (Northern Hemisphere)
  - Nilai negatif: Selatan (Southern Hemisphere)

- **Longitude**: Garis vertikal yang menunjukkan posisi timur-barat (-180° hingga +180°)
  - Nilai positif: Timur (Eastern Hemisphere)
  - Nilai negatif: Barat (Western Hemisphere)

**Contoh Koordinat:**
```
Latitude:  -7.43475700
Longitude: 109.99181900
```

---

## Cara Menggunakan Geotagging

Bamboo Mapper menyediakan beberapa metode untuk menentukan lokasi bambu:

### Metode 1: Peta Interaktif

Cara termudah untuk menentukan lokasi dengan visual yang jelas.

1. Buka **Dashboard** atau **Aplikasi Mobile**
2. Buat marker baru atau edit marker yang sudah ada
3. Pada bagian **Lokasi**, klik **Pilih di Peta**
4. Peta akan ditampilkan:
   - **Klik** pada peta untuk menempatkan marker
   - **Geser** marker ke posisi yang lebih akurat jika perlu
   - Koordinat akan terisi otomatis
5. Klik **Simpan Lokasi**

### Metode 2: Input Manual Koordinat

Gunakan metode ini jika Anda sudah memiliki koordinat dari GPS device atau sumber lain.

1. Siapkan koordinat lokasi bambu
2. Pada form marker, cari bagian **Latitude** dan **Longitude**
3. Masukkan koordinat:
   - **Latitude**: Contoh `-7.434757`
   - **Longitude**: Contoh `109.991819`
4. Sistem akan memvalidasi format koordinat secara otomatis
5. Klik **Simpan**

### Metode 3: GPS Device

Metode ini hanya bisa digunakan pada aplikasi mobile

1. Buka aplikasi Bamboo Mapper di smartphone
2. Pada form marker, pilih lokasi saat ini
3. Aplikasi akan mengambil koordinat dari GPS device
4. Klik **Simpan**
---

## Standar Presisi Koordinat

Bamboo Mapper menggunakan **format desimal** dengan presisi tinggi:

### Format Standar

| Aspek | Nilai |
|-------|-------|
| Format | Desimal Degrees (DD) |
| Presisi | 6-8 angka di belakang koma |
| Latitude | -90.00000000 hingga +90.00000000 |
| Longitude | -180.00000000 hingga +180.00000000 |

### Contoh Format yang Valid

```
✅ -7.434757, 109.991819
✅ -7.43475700, 109.99181900
✅ 7.434757, -109.991819

❌ 7° 26' 5.1" S, 109° 59' 30.5" E  (format DMS tidak didukung)
❌ -7.434757,                     (longitude tidak lengkap)
❌ -95.434757, 109.991819         (latitude di luar range)
```

### Level Akurasi

| Desimal | Presisi | Penggunaan |
|---------|---------|------------|
| 4 | ±11 meter | Kota/kabupaten |
| 5 | ±1.1 meter | Desa/kelurahan |
| 6 | ±0.11 meter | Pemukiman |
| 7 | ±1.1 cm | Bangunan |
| 8 | ±1.1 mm | Presisi tinggi |

Bamboo Mapper menggunakan **6-8 desimal** untuk akurasi tinggi.

---

## Tips Pengambilan Lokasi yang Akurat

### Sebelum Mengambil Koordinat

- **Gunakan GPS di Lokasi Terbuka**: Hindari gedung tinggi, pohon besar, atau tebing yang dapat memblokir sinyal GPS
- **Periksa Cuaca**: Hujan lebat atau badai dapat mengurangi akurasi GPS
- **Pastikan Baterai Cukup**: Pengambilan GPS memakan waktu dan baterai

### Saat Mengambil Koordinat

- **Tunggu Sinyal Stabil**: Beri waktu 10-30 detik setelah membuka aplikasi GPS
- **Ambil Beberapa Sampel**: Rekam koordinat 2-3 kali dan gunakan rata-ratanya
- **Catat Juga Titik Referensi**: Rekam landmark dekat bambu sebagai referensi visual

### Untuk Akurasi Tertinggi

- **Ambil di Waktu yang Berbeda**: Pagi dan siang hari untuk memastikan konsistensi
- **Verifikasi dengan Peta**: Cek koordinat di Google Maps atau peta lain untuk memastikan posisi masuk akal

---

## FAQ

### Berapa akurasi minimum yang dapat diterima?

Untuk pemetaan bambu, **akurasi ±5 meter** sudah cukup baik. Namun, untuk penelitian ilmiah atau monitoring jangka panjang, disarankan akurasi **±1 meter** atau lebih baik.

### Apa yang terjadi jika koordinat salah?

Koordinat dapat diperbaiki kapan saja melalui menu **Edit Marker**. Marker akan dipindahkan ke lokasi yang baru tanpa kehilangan data lain (foto, deskripsi, dll).

### Bagaimana cara memperbaiki lokasi marker?

1. Buka daftar marker di dashboard atau aplikasi
2. Pilih marker yang ingin diperbaiki
3. Klik **Edit**
4. Update koordinat dengan metode yang sama seperti saat pembuatan
5. Klik **Simpan**

### Apakah koordinat harus diambil di lokasi bambu?

Idealnya ya, untuk akurasi terbaik. Namun, jika tidak memungkinkan, Anda dapat:
- Menggunakan peta satelit untuk memperkirakan lokasi
- Menggunakan koordinat dari sumber lain (misalnya data survei sebelumnya)
- Menandai marker sebagai "perlu verifikasi" untuk dikunjungi kembali nanti

---

## Istilah Penting

| Istilah | Penjelasan |
|---------|------------|
| **Geotagging** | Proses menambahkan data lokasi geografis ke dalam konten digital |
| **Latitude** | Garis lintang, menunjukkan posisi utara-selatan |
| **Longitude** | Garis bujur, menunjukkan posisi timur-barat |
| **GPS** | Global Positioning System, sistem navigasi satelit |
| **Akurasi** | Tingkat ketepatan koordinat terhadap posisi sebenarnya |
| **Presisi** | Jumlah digit desimal dalam koordinat |
