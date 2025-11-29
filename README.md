# Bot Telegram Multibahasa

Repositori ini berisi sumber materi buku digital bertema pembangunan bot Telegram lintas bahasa menggunakan berbagai platform, seperti Google Apps Script dengan Lumpia Framework dan bahasa pemrograman populer lainnya. Konten dikemas menggunakan **[mdBook](https://github.com/rust-lang/mdBook)** sehingga mudah dibaca dalam bentuk situs statis maupun ebook.

## Struktur Proyek

| Direktori/Berkas | Deskripsi Singkat |
| --- | --- |
| `src/` | Naskah utama setiap bab (Markdown) yang akan dirender oleh mdBook. |
| `book/` | Hasil build statis yang dihasilkan oleh `mdbook build`. Folder ini menjadi target publikasi pada layanan hosting. |
| `book.toml` | Konfigurasi mdBook (judul, navigasi, dll.). |

## Cara Menjalankan Secara Lokal

1. Pastikan `mdbook` sudah terpasang (`cargo install mdbook`) atau gunakan build command di bawah untuk mengunduh versi terbaru.
2. Jalankan `mdbook serve --open` untuk melihat pratinjau lokal dengan *hot reload*.
3. Untuk menghasilkan versi siap rilis, jalankan `mdbook build` sehingga keluaran HTML tersimpan di direktori `book/`.

## Deployment

### Netlify

Gunakan pengaturan berikut saat menyiapkan situs Netlify:

- **Publish Directory:** `book`
- **Build Command:**

  ```bash
  VERSION=$(curl -s "https://api.github.com/repos/rust-lang/mdBook/releases/latest" | grep -Po '\"tag_name\": \"v\K[0-9.]+' ) && \
  curl -sSL "https://github.com/rust-lang/mdBook/releases/download/v${VERSION}/mdbook-v${VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar -xz && \
  ./mdbook build
  ```

### Clouflare Pages

```bash
VERSION=$(curl -s https://api.github.com/repos/rust-lang/mdBook/releases/latest | grep tag_name | cut -d '"' -f 4 | sed 's/^v//') && curl -sSL "https://github.com/rust-lang/mdBook/releases/download/v${VERSION}/mdbook-v${VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar -xz && ./mdbook build
```

Perintah di atas akan mengambil rilis mdBook terbaru secara otomatis, mengekstraknya, dan menjalankan proses build untuk menghasilkan folder `book/` yang siap dipublikasikan oleh Netlify.

Selamat berkontribusi dan jangan ragu untuk mengembangkan materi maupun contoh bot baru demi memperkaya ekosistem belajar Telegram di Indonesia!
