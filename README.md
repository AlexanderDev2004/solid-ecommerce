# Frontend E-Commerce (Test)

*Developer:* Alex  
*Tanggal mulai:* 2025-10-19  
*Tanggal selesai:* 2025-10-20

## Setup Project
1. git clone https://github.com/AlexanderDev2004/solid-ecommerce.git
2. cd solid-ecommerce

## Cara Menjalankan

1. Jalankan Mock API (mock server pada port 5000):

```powershell
npm install
```

2. Jalankan mock API (port 5000)

```powershell
npx json-server --watch db.json --port 5000
```

3. Jalankan frontend

```powershell
npm run dev
```

Frontend akan tersedia di `http://localhost:3000` dan mock API di `http://localhost:5000`.

## Available accounts

- User
  - username: dedy
  - password: 123456

- Admin
  - username: alex
  - password: 123456

## Troubleshooting

- Jika port 5000 sudah digunakan, hentikan proses yang memakai port tersebut atau pakai port lain: `npx json-server --watch db.json --port 5001` dan perbarui URL API di konfigurasi jika perlu.
- Jika dependency gagal terpasang, hapus `node_modules` dan lockfile lalu install ulang:

```powershell
rm -r node_modules; rm pnpm-lock.yaml; npm install
```

## Performance Testing (k6)

Pengujian performa login menggunakan k6 terhadap mock API (`json-server`) yang membaca data dari `db.json`.

### Prasyarat
- Jalankan mock API terlebih dahulu (port 5000):

```powershell
npm run mock-api
```

Jika port 5000 terpakai, gunakan alternatif port 5001:

```powershell
npm run mock-api:5001
```

### Smoke Test (Login)
- Menjalankan smoke test untuk memverifikasi login admin default (`alex`/`123456`):

```powershell
npm run k6:login:smoke
```

- Menguji login sebagai customer (`dedy`):

```powershell
$env:USERNAME='dedy'; $env:PASSWORD='123456'; npm run k6:login:smoke
```

- Jika mock API berjalan di port 5001:

```powershell
$env:API_BASE_URL='http://localhost:5001'; npm run k6:login:smoke
```

### Load Test (Ramping VUs)
- Menjalankan skenario beban bertahap untuk endpoint login (query filter):

```powershell
npm run k6:login:load
```

### Cara kerja
- Endpoint yang diuji: `GET /users?username=<name>&password=<pass>` (disediakan oleh `json-server`).
- Sumber data: `db.json` pada root proyek.
- Skrip k6 berada di folder `k6/` (`login-smoke.js`, `login-load.js`).
- NPM scripts menggunakan pembungkus `node tools/run-k6.cjs` agar k6 dapat dijalankan di Windows meski tidak ada di PATH.

### Jika k6 tidak terdeteksi
Apabila muncul pesan bahwa `k6` tidak ditemukan, set variabel `K6_PATH` menuju lokasi `k6.exe` Anda, contoh:

```powershell
$env:K6_PATH='C:\Program Files\k6\k6.exe'; npm run k6:login:smoke
```

Anda juga bisa menjalankan langsung lewat wrapper:

```powershell
node tools/run-k6.cjs run k6/login-smoke.js
```

  
