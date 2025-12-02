# 🚀 Instalasi Giscus di MdBook

Panduan ini memungkinkan Anda menyematkan widget komentar Giscus di bawah setiap bab mdBook dan menyinkronkan temanya secara dinamis.

> [!IMPORTANT]
> Update Metode: Setelah langkah [1)](#1--mendapatkan-data-giscus-yang-diperlukan) langsung meluncurlah [LIHAT CARA DIBAWAH](#-skrip-giscus-terakhir-yang-berhasil) yang sudah berhasil dengan baik!

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

```html
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

~Saat ini, pergantian tema gelap atau terang pada widget Giscus secara dinamis (menggunakan tombol tema mdBook) belum berhasil. Sudah dicoba dengan cara meng-custom js tetap tidak berubah~

Gunakan cara dibawah ini...


---

# 🚀 Skrip Giscus Terakhir yang Berhasil

Dengan metode **Injeksi JavaScript**, cara ini sungguh pamungkas euy!

Kode ini menyuntikkan widget Giscus setelah `<main>` dan menyinkronkan tema mdBook Anda dengan tema Giscus yang spesifik, menjaga `theme/index.hbs` tetap bersih.

## 1. 🛠️ Konfigurasi Aset

Pastikan file-file ini ada di folder theme/ Anda dan dimuat di book.toml.

### A. Atur `book.toml`

Pastikan file kustom Anda dimuat:

```toml
[output.html]
# ... konfigurasi lainnya
additional-css = ["giscus.css"]
additional-js = ["giscus.js"]
```

### B. Buat file `giscus.css`

CSS ini diperlukan untuk mengatur lebar wrapper yang dibuat secara dinamis oleh JavaScript.

```css,fp=giscus.css
#giscus-wrapper {
    /* Atur lebar maksimum agar tidak melebihi lebar tertentu */
    max-width: 800px;

    /* Atau atur lebar yang lebih kecil, misalnya 75% dari konten */
    /* width: 75%; */

    /* Gunakan margin: 0 auto; untuk menempatkannya di tengah halaman (center) */
    margin-left: auto;
    margin-right: auto;

    /* Berikan sedikit margin di bagian atas/bawah agar terpisah dari konten */
    margin-top: 2em;
    margin-bottom: 2em;
}
```

### 2. 🧠 Skrip Utama (`giscus.js`)

Kode ini mengurus pemuatan Giscus (injeksi ke DOM) dan sinkronisasi tema dinamis melalui `MutationObserver` dan `postMessage`

```JavaScript,fp=giscus.js
// giscus.js

// --- Konfigurasi Tema Giscus ---
// Pemetaan Tema Spesifik ke Tema Giscus:
// Light/Default: light
// Gelap Umum (Navy/Coal/Dark): dark
// Rust: gruvbox_dark
// Ayu: dark_dimmed

function getThemeName() {
    const htmlClass = document.documentElement.className;
    
    if (htmlClass.includes("ayu")) {
        return "dark_dimmed"; 
    } 
    
    if (htmlClass.includes("rust")) {
        return "gruvbox_dark";
    }

    if (htmlClass.includes("navy") || htmlClass.includes("coal") || htmlClass.includes("dark")) {
        return "dark"; 
    }
    
    return "light";
}

// --- Fungsi Pemuatan Giscus (Injeksi DOM) ---
function loadGiscus() {
    const mainElement = document.querySelector("main");
    if (!mainElement) {
        console.error("Main content area (<main>) not found. Cannot inject Giscus.");
        return;
    }

    // Buat HR (opsional, sebagai pemisah)
    const hr = document.createElement("hr");
    // Sisipkan elemen setelah <main>
    mainElement.insertAdjacentElement('afterend', hr); 

    // Buat DIV WRAPPER (untuk menerapkan CSS kustom)
    const wrapper = document.createElement("div");
    wrapper.id = "giscus-wrapper";
    mainElement.insertAdjacentElement('afterend', wrapper); 

    // Buat Script Giscus
    let giscusAttributes = {
        src: "https://giscus.app/client.js",
        "data-repo": "<USERNAME/REPO-ANDA>", // Ganti dengan data Anda
        "data-repo-id": "R_kgDOXXXXXXXX", // Ganti dengan data Anda
        "data-category": "<NAMA-KATEGORI>", // Ganti dengan data Anda
        "data-category-id": "DIC_kwDOXXXXXXXX", // Ganti dengan data Anda
        "data-mapping": "pathname",
        "data-strict": "0",
        "data-reactions-enabled": "1",
        "data-emit-metadata": "0",
        "data-input-position": "top",
        "data-theme": getThemeName(), 
        "data-lang": "id",
        "data-loading": "lazy",
        crossorigin: "anonymous",
        async: "",
    };

    let giscusScript = document.createElement("script");
    Object.entries(giscusAttributes).forEach(([key, value]) =>
        giscusScript.setAttribute(key, value),
    );
    wrapper.appendChild(giscusScript); 
}

// --- Sinkronisasi Tema Dinamis ---
function changeGiscusTheme() {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) {
        // Retry logic: Coba lagi hingga iframe ditemukan
        setTimeout(changeGiscusTheme, 500);
        return;
    }

    const theme = getThemeName();
    
    const sendMessage = (message) => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
                { giscus: message },
                "https://giscus.app",
            );
            console.log("Giscus theme sent via postMessage:", theme);
        }
    };

    sendMessage({ setConfig: { theme: theme } });
}

// --- Observer (Trigger Perubahan Tema) ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Muat Giscus saat DOM siap
    loadGiscus();

    const htmlElement = document.documentElement;

    // 2. Observer untuk mendeteksi pergantian tema mdBook
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Jeda 100ms untuk stabilitas sebelum mengirim pesan postMessage
                setTimeout(changeGiscusTheme, 100); 
            }
        }
    });

    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });

    // 3. Fallback Pemuatan Awal (Wajib untuk mengatasi masalah timing)
    setTimeout(() => {
        console.log("Applying initial theme forcefully after 3s delay.");
        changeGiscusTheme(); 
    }, 3000);
});
```

## 3. Build dan Uji

Seperti [metode sebelumnya](#6--build-dan-uji).


Baiklah, segini dulu aja yak! 

> [!TIP]
> Semoga bermanfaat.
