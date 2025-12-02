# Bot Telegram Multibahasa

[![Netlify Status](https://api.netlify.com/api/v1/badges/880db421-2771-4335-916e-1620217e6b50/deploy-status)](https://app.netlify.com/projects/botindonesia/deploys) ![](https://img.shields.io/github/last-commit/banghasan/ebook-bot-telegram
)

Repositori ini berisi sumber materi buku digital bertema pembangunan bot Telegram lintas bahasa menggunakan berbagai platform, seperti Google Apps Script dengan Lumpia Framework dan bahasa pemrograman populer lainnya. Konten dikemas menggunakan **[mdBook](https://github.com/rust-lang/mdBook)** sehingga mudah dibaca dalam bentuk situs statis maupun ebook.

## Struktur Proyek

| Direktori/Berkas | Deskripsi Singkat |
| --- | --- |
| `src/` | Naskah utama setiap bab (Markdown) yang akan dirender oleh mdBook. |
| `buku/` | Hasil build statis yang dihasilkan oleh `mdbook build`. Folder ini menjadi target publikasi pada layanan hosting. |
| `book.toml` | Konfigurasi mdBook (judul, navigasi, dll.). |

## Cara Menjalankan Secara Lokal

1. Pastikan `mdbook` sudah terpasang.
2. Jalankan `mdbook serve --open` untuk melihat pratinjau lokal dengan *hot reload*.
3. Untuk menghasilkan versi siap rilis, jalankan `mdbook build` sehingga keluaran HTML tersimpan di direktori `buku/`.

## Deployment

Menggunakan release terbaru mdbook tanpa `preprocessor`

(gagal terus euy, versi 5.x belum support `preprocessor` kayaknya)

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

- **Publish Directory:** `book`
- **Build Command:**
```bash
VERSION=$(curl -s https://api.github.com/repos/rust-lang/mdBook/releases/latest | grep tag_name | cut -d '"' -f 4 | sed 's/^v//') && curl -sSL "https://github.com/rust-lang/mdBook/releases/download/v${VERSION}/mdbook-v${VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar -xz && ./mdbook build
```

Perintah di atas akan mengambil rilis mdBook terbaru secara otomatis, mengekstraknya, dan menjalankan proses build untuk menghasilkan folder `book/` yang siap dipublikasikan oleh Netlify.

Selamat berkontribusi dan jangan ragu untuk mengembangkan materi maupun contoh bot baru demi memperkaya ekosistem belajar Telegram di Indonesia!

## Deploy Dengan Preprocessor

Karena mdBook terbaru tidak support untuk `preprocessor` yang sudah jadi, maka build pakai versi lama.

Misalkan ingin menambahkan komentar [giscus](https://giscus.app/id)

Contoh: pakai versi `mdbook-v0.4.52-x86_64-unknown-linux-gnu.tar.gz` dan menambahkan [mdbook-embedify](https://github.com/MR-Addict/mdbook-embedify/)

Sehingga build command untuk Clouflare Pages:

```sh
mkdir -p bin && \
wget -q https://github.com/rust-lang/mdBook/releases/download/v0.4.52/mdbook-v0.4.52-x86_64-unknown-linux-gnu.tar.gz && \
tar -xzf mdbook-v0.4.52-x86_64-unknown-linux-gnu.tar.gz && mv mdbook bin/ && \
wget -q https://github.com/MR-Addict/mdbook-embedify/releases/download/0.2.18/mdbook-embedify-0.2.18-x86_64-unknown-linux-gnu.zip && \
unzip -q mdbook-embedify-0.2.18-x86_64-unknown-linux-gnu.zip && \
mv mdbook-embedify-0.2.18-x86_64-unknown-linux-gnu/mdbook-embedify bin/ && \
chmod +x bin/* && \
export PATH=$PATH:$(pwd)/bin && \
bin/mdbook build
```

Netlify tidak perlu lagi, karena sudah ditambahkan pada file `netlify.toml`

## Notes

Karena versi lama tidak support sub-menu otomatis di panel sebelah kiri, maka diubah kembali ke versi `0.5.x`.

Semoga seiring waktu bisa support plugins lagi, terutama `mdbook-embedify`.
