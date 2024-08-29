# Cat Healthcare System

## Deskripsi Singkat
Cat Healthcare System adalah aplikasi berbasis web yang dirancang untuk mengelola layanan kesehatan kucing, termasuk layanan grooming, penitipan, dan konsultasi dokter. Aplikasi ini memungkinkan pemilik kucing untuk memesan layanan, sedangkan admin toko dapat mengelola jadwal layanan dan melihat laporan keuangan.

Dokumentasi lengkap proyek: [sini](https://github.com/fikriyoma01/Cat-Healthcare-System/blob/main/dokumentasi_proyek/Cat%20Healthcare%20System-skpl.docx.pdf)

## Fitur
- **Manajemen Layanan Grooming**: Admin toko dapat menambah, mengedit, dan menghapus jadwal layanan grooming.
- **Manajemen Layanan Penitipan**: Admin toko dapat mengelola jadwal dan kuota layanan penitipan kucing.
- **Manajemen Artikel**: Admin dapat mengunggah dan mengelola infografis dan artikel seputar kesehatan kucing.
- **Manajemen Keuangan**: Admin dapat melihat dan mencatat transaksi keuangan terkait layanan yang diberikan.

## Teknologi yang Digunakan
- **Frontend**: ReactJS, Material-UI
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **Middleware**: Axios untuk HTTP requests, Mongoose untuk ODM
- **Tools**: Postman untuk pengujian API, Visual Studio Code sebagai IDE

## Instalasi
1. **Clone repository:**
    ```bash
    git clone https://github.com/fikriyoma01/Cat-Healthcare-System.git
    cd cat-healthcare-system
    ```

2. **Install dependencies:**
    ```bash
    # Backend dependencies
    cd server
    npm install

    # Frontend dependencies
    cd ../client
    npm install
    ```

3. **Jalankan aplikasi:**
    ```bash
    # Jalankan backend server
    cd server
    npm start

    # Jalankan frontend
    cd ../client
    npm start
    ```

4. **Buka di browser:**
   Akses aplikasi di `http://localhost:3000`.

## Struktur Proyek
- **client/**: Kode frontend untuk aplikasi berbasis ReactJS.
  - **src/**: Semua kode sumber ReactJS.
    - **components/**: Komponen-komponen umum yang digunakan di berbagai halaman.
    - **pages/**: Halaman-halaman utama aplikasi (Home, GroomingService, Article, etc).
    - **App.js**: Entry point aplikasi React.
    - **index.js**: Entry point untuk merender React ke DOM.
- **server/**: Kode backend untuk aplikasi berbasis Express.js.
  - **routes/**: Definisi rute API untuk berbagai entitas seperti `groomingServices`, `articles`, etc.
  - **models/**: Definisi model MongoDB menggunakan Mongoose.
  - **server.js**: File utama untuk menjalankan server Express.

## Tampilan Proyek
![Homepage](https://github.com/fikriyoma01/Cat-Healthcare-System/blob/main/dokumentasi_proyek/Homepage.png?raw=true)

![grooming_schedule](https://github.com/fikriyoma01/Cat-Healthcare-System/blob/main/dokumentasi_proyek/grooming_schedule.png?raw=true)
