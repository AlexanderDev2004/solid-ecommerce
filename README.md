# Frontend E-Commerce (Test)

*Developer:* Alex  
*Tanggal mulai:* 2025-10-19  
*Tanggal selesai:* 2025-10-20

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
  
