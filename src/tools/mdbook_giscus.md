# 🚀 Instalasi Giscus di MdBook

Panduan ini memungkinkan Anda menyematkan widget komentar Giscus di bawah setiap bab mdBook dan menyinkronkan temanya secara dinamis.

## 1. 🔑 Mendapatkan Data Giscus yang Diperlukan

1.  **Kunjungi** [Giscus App](https://giscus.app/).
2.  **Konfigurasikan** *repository* GitHub publik Anda, *category* yang akan digunakan untuk diskusi, dan pengaturan lainnya.
3.  **Salin** kode `<script>` yang dihasilkan. Anda akan memerlukan nilai untuk `data-repo`, `data-repo-id`, `data-category`, dan `data-category-id`.


## 2. ⚙️ Inisialisasi Tema Kustom

Langkah ini menyalin template default mdBook ke direktori `theme/` agar dapat dimodifikasi.

```bash
mdbook init --theme
```

## 3. 📝 Modifikasi theme/index.hbs (Penyematan Giscus)

Sisipkan kode Giscus di dalam template halaman, tepat setelah konten utama (`{{{ content }}}`).

1. Buka `theme/index.hbs`.
2. Cari tag penutup `</main>`.
3. Sisipkan kode Giscus yang dibungkus `div` (`giscus-wrapper`) di lokasi tersebut:

```
// ... 
        <main>
          {{{ content }}}
        </main>

                    <hr> 
                    <div id="giscus-wrapper">
                        <script src="https://giscus.app/client.js"
                                data-repo="USERNAME/REPO-NAME"
                                data-repo-id="R_kgDOXXXXXXXX"
                                data-category="CATEGORY-NAME"
                                data-category-id="DIC_kwDOXXXXXXXX"
                                data-mapping="pathname"
                                data-strict="0"
                                data-reactions-enabled="1"
                                data-emit-metadata="0"
                                data-input-position="bottom"
                                data-theme="preferred_color_scheme" 
                                data-lang="id"
                                data-loading="lazy"
                                crossorigin="anonymous"
                                async>
                        </script>
                    </div>
                    
                    <nav class="nav-wrapper" aria-label="Page navigation">
```

## 4. 🎨 Kontrol Lebar dengan `theme/custom.css`

Buat file CSS kustom untuk membatasi lebar widget Giscus dan memposisikannya di tengah (center).

1. Buat file `theme/custom.css`.
2. Tambahkan CSS berikut:

```css
/* theme/custom.css */
#giscus-wrapper {
    max-width: 800px; /* Batasi lebar maksimum */
    margin-left: auto;
    margin-right: auto; /* Posisikan di tengah */
    margin-top: 2em;
    margin-bottom: 2em;
}
```

## 5. 🛠️ Konfigurasi book.toml

Tambahkan file CSS dan JS kustom Anda ke dalam output HTML mdBook.

1. Buka book.toml.
2. Tambahkan kedua file kustom di bagian `[output.html]`:

```toml
[output.html]
# ... konfigurasi lainnya
additional-css = ["theme/custom.css"]
```

## 6. ✅ Build dan Uji

1. Jalankan `mdbook build`.
2. Atau akses web buku melalui server web (`mdbook serve`) dan lihat hasilnya


## ⚠️ Catatan Penting Mengenai Sinkronisasi Tema

Saat ini, pergantian tema gelap atau terang pada widget Giscus secara dinamis (menggunakan tombol tema mdBook) belum berhasil. Sudah dicoba dengan cara meng-custom js tetap tidak berubah.

Baiklah, segini dulu aja yak! 

> [!TIP]
> Semoga bermanfaat.
