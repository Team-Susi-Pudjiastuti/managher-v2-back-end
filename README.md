ManagHer API

ManagHer adalah API backend untuk platform edukasi dan pengelolaan proyek bisnis berbasis level. API ini menyediakan autentikasi pengguna, pembuatan proyek, serta pengelolaan tahapan belajar dan pengujian ide bisnis.

Dokumentasi Postman:
https://documenter.getpostman.com/view/49094265/2sB3WpR1Dq

Ringkasan Fitur

Registrasi dan login pengguna (/api/register, /api/login)

Pembuatan, pembaruan, dan penghapusan proyek bisnis (/api/project/...)

Sistem level (progress learning) dengan tahapan seperti:

Business Idea

RWW Testing

Brand Identity

Lean Canvas

Prototype

Beta Testing

Launch Product

Sell & Scale Up

Update status penyelesaian level (/api/level/:levelId)

Setiap entitas bisnis memiliki struktur data kaya seperti produk, customer segment, problem–solution fit, hingga metric keuangan.

Endpoint Utama
Auth (Profile)
Method	Endpoint	Deskripsi
POST	/api/register	Registrasi pengguna baru
POST	/api/login	Login pengguna dan mendapatkan token sesi

Contoh body register

{
  "name": "Amanda",
  "username": "brmandw",
  "email": "example@gmail.com",
  "password": "123456"
}


Respons sukses

{
  "message": "User registered successfully",
  "data": {
    "name": "Amanda",
    "username": "brmandw",
    "email": "example@gmail.com",
    "_id": "..."
  }
}

Project
Method	Endpoint	Deskripsi
POST	/api/project	Membuat proyek bisnis baru
GET	/api/project/:userId	Mendapatkan semua proyek pengguna
GET	/api/project/detail/:id	Detail proyek dengan struktur lengkap fase dan level
DELETE	/api/project/:id	Menghapus proyek tertentu

Contoh body

{
  "user": "690d2d25c12b062dcd9d6106",
  "title": "Toko Bunga"
}


Respons sukses

{
  "message": "Project created successfully",
  "project": {
    "title": "Toko Bunga",
    "progress_percentage": 0
  }
}

Level
Method	Endpoint	Deskripsi
GET	/api/level/:projectId	Mendapatkan semua level pada proyek
PUT	/api/level/:levelId	Memperbarui status penyelesaian level

Contoh update level

{
  "completed": true
}

Level 1 – Business Idea
Method	Endpoint	Deskripsi
GET	/api/business-idea/:id	Mendapatkan data ide bisnis pengguna
PUT	/api/business-idea/:id	Memperbarui ide bisnis

Contoh body update

{
  "productsServices": [
    {
      "title": "Brownies Lumer Premium",
      "jenis": "Produk Makanan Siap Saji",
      "deskripsi": "Brownies cokelat lembut dengan isian ganache lumer...",
      "fitur_utama": "Tanpa pengawet, tahan 3 hari suhu ruang",
      "harga_jual": "Rp25.000/cup"
    }
  ],
  "customerSegment": "Pelanggan kuliner kekinian",
  "problem": "Sulit menemukan camilan enak dan higienis",
  "solution": "Camilan premium siap santap dengan rasa unik"
}

Struktur Respons Umum
{
  "message": "Operation message",
  "data": { ... }
}


Kode status umum:

200 OK – permintaan berhasil

201 Created – data berhasil dibuat

400 Bad Request – validasi gagal

404 Not Found – data tidak ditemukan

500 Internal Server Error – kesalahan server

Teknologi

Backend: Express.js

Database: MongoDB (ObjectId pada struktur data)

Hosting: Railway.app

Format data: JSON

Auth: Token berbasis session (tanpa JWT pada versi dokumentasi ini)

Penggunaan Koleksi Postman

Buka Postman.

Impor file ManagHer.postman_collection.json dari repository ini.

Set variabel baseURL sesuai lingkungan kamu, misalnya:

baseURL = https://managher-api-production.up.railway.app


Jalankan endpoint mulai dari /api/register → /api/login → /api/project.