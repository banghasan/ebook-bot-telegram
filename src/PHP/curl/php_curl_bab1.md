# I. Pengantar Bot Telegram dan PHP

#### 1.1. Apa itu Bot Telegram?

Bot Telegram adalah akun khusus yang tidak memerlukan nomor telepon untuk mendaftar dan dioperasikan oleh perangkat lunak. Bot dapat melakukan berbagai tugas, mulai dari mengirimkan notifikasi, mengintegrasikan layanan lain, hingga menjadi alat bantu interaktif dalam obrolan. Bot berinteraksi dengan dunia luar melalui **Telegram Bot API**, sebuah antarmuka HTTP yang sederhana.

#### 1.2. Mengapa Memilih PHP dan cURL?

PHP adalah bahasa pemrograman sisi server yang sangat populer untuk pengembangan web. Kombinasinya dengan **cURL** (Client URL Library) menjadikannya pilihan yang kuat dan fleksibel untuk berinteraksi dengan API eksternal, termasuk Telegram Bot API.

*   **cURL** adalah alat yang sangat efisien untuk membuat permintaan HTTP (GET, POST, dll.) dari skrip PHP. Ini memungkinkan kita untuk berkomunikasi langsung dengan API Telegram tanpa perlu menggunakan pustaka pihak ketiga yang kompleks.
*   Pendekatan ini memberikan pemahaman mendalam tentang bagaimana API bekerja, yang sangat penting saat merancang framework bot kustom.

#### 1.3. Persiapan Lingkungan Pengembangan

Untuk memulai, Anda memerlukan lingkungan pengembangan yang mencakup:
1.  **Web Server:** Apache, Nginx, atau sejenisnya. Diperlukan hanya jika menggunakan metode webhook.
2.  **PHP:** Versi 7.4 ke atas direkomendasikan.
3.  **Ekstensi cURL:** Pastikan ekstensi `php-curl`[^phpcurl] telah diaktifkan di konfigurasi PHP Anda.

#### 1.4. Mendapatkan Token Bot dari @BotFather

![](https://lumpia.js.org/images/botfather/cari_botfather.webp)

Setiap bot memerlukan token unik untuk otentikasi. Token ini didapatkan dari bot resmi Telegram, **@BotFather**.

1.  Buka aplikasi Telegram dan cari **@BotFather**.
2.  Ketik `/newbot` dan ikuti instruksi untuk memilih nama bot (misalnya, "Bot Buku PHP") dan username (harus diakhiri dengan "bot", misalnya, "BotBukuPHP_bot").
3.  Setelah berhasil, @BotFather akan memberikan Anda **HTTP API Token** yang terlihat seperti `123456:ABC-DEF1234ghIkl-jkl-jkl-jkl-jkl`. **Jaga kerahasiaan token ini.**

![](https://lumpia.js.org/images/botfather/token.webp)

[^phpcurl]: [PHP Curl](https://www.php.net/manual/en/book.curl.php) dokumentasi resmi PHP Curl
