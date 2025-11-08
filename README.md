# ManagHer API

**ManagHer** adalah REST API backend untuk platform edukasi dan pengelolaan proyek bisnis berbasis level.  
API ini menyediakan autentikasi pengguna, manajemen proyek, sistem level pembelajaran, serta modul pengembangan ide bisnis seperti *Business Idea*, *RWW Testing*, dan *Brand Identity*.

**Dokumentasi resmi:**  
[https://documenter.getpostman.com/view/49094265/2sB3WpR1Dq](https://documenter.getpostman.com/view/49094265/2sB3WpR1Dq)

---

## Ringkasan

API ini dirancang untuk:
- Registrasi dan login pengguna.
- Membuat serta mengelola proyek bisnis.
- Mengatur progres pembelajaran berbasis level.
- Mengelola ide bisnis dengan detail komprehensif (produk, pelanggan, solusi, dsb.).
- Memantau progres dan status penyelesaian level pengguna.

---

## Base URL

Gunakan variabel `{{baseURL}}` di Postman atau file konfigurasi lingkungan Anda:

{{baseURL}} = https://managher-api-production.up.railway.app

yaml
Salin kode

---

## Endpoint Utama

### 1. Autentikasi

| Method | Endpoint | Deskripsi |
|---------|-----------|-----------|
| `POST` | `/api/register` | Registrasi pengguna baru |
| `POST` | `/api/login` | Login pengguna |

**Contoh Request**
```json
{
  "name": "Amanda",
  "username": "brmandw",
  "email": "example@gmail.com",
  "password": "123456"
}
Contoh Response

json
Salin kode
{
  "message": "User registered successfully",
  "data": {
    "name": "Amanda",
    "username": "brmandw",
    "email": "example@gmail.com",
    "_id": "690d368f00fc9f9c4853285d"
  }
}
2. Manajemen Proyek
Method	Endpoint	Deskripsi
POST	/api/project	Membuat proyek bisnis baru
GET	/api/project/:userId	Mendapatkan semua proyek pengguna
GET	/api/project/detail/:id	Mendapatkan detail proyek lengkap (fase & level)
DELETE	/api/project/:id	Menghapus proyek tertentu

Contoh Request

json
Salin kode
{
  "user": "690d2d25c12b062dcd9d6106",
  "title": "Toko Bunga"
}
Contoh Response

json
Salin kode
{
  "message": "Project created successfully",
  "project": {
    "user": "690d2d25c12b062dcd9d6106",
    "title": "Toko Bunga",
    "progress_percentage": 0
  }
}
3. Level
Method	Endpoint	Deskripsi
GET	/api/level/:projectId	Mengambil semua level dari proyek
PUT	/api/level/:levelId	Memperbarui status penyelesaian level

Contoh Request

json
Salin kode
{
  "completed": true
}
Contoh Response

json
Salin kode
{
  "message": "Level updated",
  "data": {
    "title": "Launch Product",
    "completed": true
  }
}
4. Level 1 – Business Idea
Method	Endpoint	Deskripsi
GET	/api/business-idea/:id	Mendapatkan data ide bisnis pengguna
PUT	/api/business-idea/:id	Memperbarui ide bisnis

Contoh Request

json
Salin kode
{
  "productsServices": [
    {
      "title": "Brownies Lumer Premium",
      "jenis": "Produk Makanan Siap Saji",
      "deskripsi": "Brownies cokelat lembut dengan isian ganache lumer di tengah.",
      "fitur_utama": "Tanpa pengawet, tersedia 5 varian rasa",
      "harga_jual": "Rp25.000/cup"
    }
  ],
  "customerSegment": "Pecinta kuliner kekinian",
  "problem": "Sulit menemukan camilan enak dan higienis",
  "solution": "Camilan premium siap santap dengan kemasan menarik"
}
Contoh Response

json
Salin kode
{
  "message": "Business idea updated successfully",
  "data": {
    "productsServices": [
      {
        "title": "Brownies Lumer Premium",
        "harga_jual": "Rp25.000/cup"
      }
    ]
  }
}
Struktur Respons
Semua respons API menggunakan format JSON yang konsisten:

json
Salin kode
{
  "message": "Deskripsi hasil operasi",
  "data": { ... }
}
Status Code	Arti
200 OK	Permintaan berhasil
201 Created	Data berhasil dibuat
400 Bad Request	Validasi gagal
404 Not Found	Data tidak ditemukan
500 Server Error	Kesalahan server

Autentikasi
Beberapa endpoint dilindungi dan memerlukan token sesi atau autentikasi lanjutan (jika diaktifkan).
Semua permintaan harus menggunakan header:

pgsql
Salin kode
Content-Type: application/json
Arsitektur API
mathematica
Salin kode
ManagHer API
│
├── Auth (Register, Login)
├── Project Management
│   ├── Create / Get / Delete
│   └── Project Detail (Fase & Level)
├── Level Management
│   ├── Ambil semua level
│   └── Update status penyelesaian
└── Business Modules
    ├── Business Idea
    ├── RWW Testing
    ├── Brand Identity
    ├── Prototype
    ├── Launch Product
    └── Scale Up
Teknologi yang Digunakan
Komponen	Deskripsi
Backend	Node.js (Express.js)
Database	MongoDB
Hosting	Railway.app
Format Data	JSON
Autentikasi	Token/Session based

Cara Menggunakan Koleksi Postman
Impor file ManagHer.postman_collection.json ke Postman.

Set variabel baseURL sesuai environment Anda.

Jalankan endpoint secara berurutan:

/api/register

/api/login

/api/project

/api/level

Lihat dokumentasi lengkap di:
https://documenter.getpostman.com/view/49094265/2sB3WpR1Dq

Struktur Direktori (Disarankan)
pgsql
Salin kode
managher-api/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── index.js
│
├── tests/
├── .env.example
├── package.json
├── README.md
└── docs/
    └── ManagHer.postman_collection.json
Lisensi
MIT License © 2025 ManagHer Team
Izin diberikan untuk menggunakan, menyalin, memodifikasi, dan mendistribusikan perangkat lunak ini dengan mencantumkan atribusi kepada pengembang asli.

Kontak
Untuk kontribusi, pertanyaan teknis, atau pelaporan bug:

Buka issue di repository ini

Atau hubungi tim pengembang melalui email resmi