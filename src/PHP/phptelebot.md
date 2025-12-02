# Tutorial PHPTelebot - Panduan Lengkap untuk Pemula

Panduan lengkap ini akan membantumu membuat bot Telegram menggunakan
framework [PHPTelebot](https://github.com/GrayHoax/phptelebot). Tutorial ini
dirancang khusus untuk pemula yang baru belajar membuat bot Telegram dengan PHP.

![Radyakaze](https://avatars.githubusercontent.com/u/3848643?v=4)

## Daftar Isi

- [Apa itu PHPTelebot?](#apa-itu-phptelebot)
- [Mengapa Menggunakan Framework?](#mengapa-menggunakan-framework)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Membuat Bot Sederhana](#membuat-bot-sederhana)
- [Menggunakan Inline Keyboard](#menggunakan-inline-keyboard)
- [Metode Long Polling](#metode-long-polling)
- [Metode Webhook](#metode-webhook)
- [Webhook dengan Ngrok](#webhook-dengan-ngrok)
- [Tips dan Troubleshooting](#tips-dan-troubleshooting)
- [Referensi](#referensi)

---

## Apa itu PHPTelebot?

**PHPTelebot** adalah framework PHP yang mempermudah pembuatan bot Telegram.
Framework ini menyediakan fungsi-fungsi siap pakai untuk berinteraksi dengan
Telegram Bot API, sehingga kamu tidak perlu menulis kode dari nol.

### Sejarah

Sejarah-nya euy..
 **PHPTelebot** ini awalnya dibuat pertama kali oleh admin grup [Bot PHP Indonesia](https://t.me/botphp) Sdr. [Pringgo Radianto (Radya) alias @Radyakaze](https://t.me/error_log)
 
Namun, karena lain satu hal.. repository-nya tidak pernah diupdate, dan dilanjutkan oleh pengembang luar [GrayHoax](https://github.com/GrayHoax/) dan sampai tulisan ini dibuat, masih *uptodate* untuk dipakai di tahun 2025 dan masih aktif.

![GrayHoax](https://avatars.githubusercontent.com/u/8663789?v=4)

### Fitur Utama

- Mudah digunakan, cocok untuk pemula
- Mendukung long polling dan webhook
- Penanganan command yang simpel
- Dukungan untuk inline keyboard, callback query, dan fitur Telegram lainnya

---

## Mengapa Menggunakan Framework?

### Tanpa Framework (PHP + cURL Murni)

Jika kamu menulis bot tanpa framework, kamu harus menulis kode seperti ini
setiap kali ingin mengirim pesan:

```php
<?php
$token = "YOUR_BOT_TOKEN";
$chatId = "USER_CHAT_ID";
$message = "Halo dari bot!";

$url = "https://api.telegram.org/bot{$token}/sendMessage";
$data = [
    'chat_id' => $chatId,
    'text' => $message
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
```

**Masalah dengan pendekatan ini:**

- ❌ Kode berulang-ulang (repetitif)
- ❌ Sulit dibaca dan dipelihara
- ❌ Rawan error (typo URL, parameter salah, dll)
- ❌ Harus menulis ulang untuk setiap fitur (keyboard, foto, dokumen, dll)
- ❌ Tidak ada struktur yang jelas untuk menangani command

### Dengan Framework PHPTelebot

Dengan framework, kode yang sama menjadi jauh lebih sederhana:

```php
<?php
require_once 'phptelebot/src/PHPTelebot.php';

$bot = new PHPTelebot('YOUR_BOT_TOKEN');

$bot->cmd('/start', function() {
    return Bot::sendMessage('Halo dari bot!');
});

$bot->run();
```

**Keuntungan menggunakan framework:**

- ✅ Kode lebih ringkas dan mudah dibaca
- ✅ Fokus pada logika bisnis, bukan detail teknis
- ✅ Penanganan error sudah diatur oleh framework
- ✅ Struktur kode lebih terorganisir
- ✅ Lebih cepat dalam pengembangan
- ✅ Mudah ditambahkan fitur baru

---

## Prasyarat

Sebelum memulai, pastikan sudah memiliki:

1. **PHP 7.4 atau lebih baru** (disarankan PHP 8.0+)
   ```bash
   php -v  # Cek versi PHP
   ```

2. **Ekstensi cURL aktif**
   ```bash
   php -m | grep curl  # Cek apakah cURL sudah aktif
   ```

3. **Git** (untuk mengambil kode dari GitHub)
   ```bash
   git --version  # Cek apakah Git sudah terinstal
   ```

4. **Token Bot dari BotFather**
   - Buka Telegram dan cari [@BotFather](https://t.me/BotFather)
   - Kirim perintah `/newbot`
   - Ikuti instruksi untuk membuat bot baru
   - Simpan token yang diberikan (format:
     `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

---

## Instalasi

### Langkah 1: Clone Repository

Buka terminal dan jalankan perintah berikut:

```bash
# Clone repository PHPTelebot
git clone https://github.com/GrayHoax/phptelebot.git

# Masuk ke folder phptelebot
cd phptelebot
```

### Langkah 2: Struktur Folder

Setelah clone, struktur folder akan seperti ini:

```
phptelebot/
├── src/
│   └── PHPTelebot.php    # File utama framework
├── examples/              # Contoh-contoh penggunaan
├── README.md
└── ...
```

File utama yang kita butuhkan ada di `src/PHPTelebot.php`.

---

## Membuat Bot Sederhana

### Langkah 1: Buat File Bot

Buat file baru bernama `bot.php` di folder yang sama dengan folder `phptelebot`:

```
project/
├── phptelebot/           # Folder hasil clone
└── bot.php               # File bot kamu (buat file ini)
```

### Langkah 2: Tulis Kode Bot

Buka `bot.php` dan tulis kode berikut:

```php
<?php
// Sertakan library PHPTelebot
require_once __DIR__ . '/phptelebot/src/PHPTelebot.php';

// Ganti dengan token bot kamu
$token = 'ISI_TOKEN_BOT_KAMU_DISINI';
$username = 'NamaBotKamu';  // Opsional

// Inisialisasi bot
$bot = new PHPTelebot($token, $username);

// Command /start - Pesan sambutan
$bot->cmd('/start', function () {
    $nama = Bot::$user['first_name'];
    $pesan = "Halo {$nama}! 👋\n\n";
    $pesan .= "Selamat datang di bot saya.\n";
    $pesan .= "Gunakan /help untuk melihat daftar perintah.";
    
    return Bot::sendMessage($pesan);
});

// Command /help - Daftar perintah
$bot->cmd('/help', function () {
    $pesan = "📋 *Daftar Perintah:*\n\n";
    $pesan .= "/start - Mulai bot\n";
    $pesan .= "/help - Tampilkan bantuan\n";
    $pesan .= "/echo [teks] - Ulangi teks yang kamu kirim\n";
    $pesan .= "/info - Informasi tentang kamu";
    
    return Bot::sendMessage($pesan, ['parse' => 'markdown']);
});

// Command /echo - Mengulangi teks
$bot->cmd('/echo|/say', function ($text = '') {
    if (empty($text)) {
        return Bot::sendMessage('❌ Gunakan: /echo [teks yang ingin diulangi]');
    }
    return Bot::sendMessage("🔊 Kamu berkata: {$text}");
});

// Command /info - Informasi user
$bot->cmd('/info', function () {
    $user = Bot::$user;
    $pesan = "👤 *Informasi Kamu:*\n\n";
    $pesan .= "Nama: {$user['first_name']}\n";
    $pesan .= "ID: {$user['id']}\n";
    $pesan .= "Username: @{$user['username']}\n";
    
    return Bot::sendMessage($pesan, ['parse' => 'markdown']);
});

// Handler untuk semua pesan yang tidak cocok dengan command
$bot->cmd('*', function () {
    return Bot::sendMessage("Maaf, saya tidak mengerti perintah itu. Gunakan /help untuk bantuan.");
});

// Jalankan bot
$bot->run();
```

### Langkah 3: Penjelasan Kode

Mari kita pahami setiap bagian kode:

1. **`require_once`**: Memasukkan file library PHPTelebot
2. **`new PHPTelebot($token, $username)`**: Membuat instance bot dengan tokenmu
3. **`$bot->cmd('/start', function() {...})`**: Mendefinisikan apa yang terjadi
   ketika user mengirim `/start`
4. **`Bot::sendMessage($pesan)`**: Mengirim pesan ke user
5. **`Bot::$user`**: Array yang berisi informasi user yang mengirim pesan
6. **`$bot->run()`**: Menjalankan bot (long polling)

---

## Menggunakan Inline Keyboard

Inline keyboard adalah tombol-tombol yang muncul di bawah pesan. Sangat berguna
untuk membuat menu interaktif.

### Contoh 1: Keyboard Sederhana

```php
<?php
require_once __DIR__ . '/phptelebot/src/PHPTelebot.php';

$token = 'ISI_TOKEN_BOT_KAMU';
$bot = new PHPTelebot($token);

// Command dengan inline keyboard
$bot->cmd('/menu', function () {
    $pesan = "Pilih menu yang kamu inginkan:";
    
    // Membuat inline keyboard
    $keyboard = [
        [
            ['text' => '📰 Berita', 'callback_data' => 'menu_berita'],
            ['text' => '🎵 Musik', 'callback_data' => 'menu_musik']
        ],
        [
            ['text' => '🎮 Game', 'callback_data' => 'menu_game'],
            ['text' => '⚙️ Pengaturan', 'callback_data' => 'menu_setting']
        ]
    ];
    
    return Bot::sendMessage($pesan, [
        'reply_markup' => [
            'inline_keyboard' => $keyboard
        ]
    ]);
});

// Menangani callback dari inline keyboard
$bot->on('callback', function ($data) {
    // $data berisi callback_data yang dikirim
    switch ($data) {
        case 'menu_berita':
            $response = "📰 Kamu memilih menu Berita";
            break;
        case 'menu_musik':
            $response = "🎵 Kamu memilih menu Musik";
            break;
        case 'menu_game':
            $response = "🎮 Kamu memilih menu Game";
            break;
        case 'menu_setting':
            $response = "⚙️ Kamu memilih menu Pengaturan";
            break;
        default:
            $response = "Menu tidak dikenal";
    }
    
    // Kirim notifikasi ke user
    Bot::answerCallback($response, true);
    
    // Update pesan dengan pilihan user
    return Bot::editText($response);
});

$bot->run();
```

### Contoh 2: Keyboard dengan URL

```php
$bot->cmd('/sosmed', function () {
    $pesan = "Kunjungi media sosial kami:";
    
    $keyboard = [
        [
            ['text' => '🌐 Website', 'url' => 'https://example.com']
        ],
        [
            ['text' => '📱 Telegram Channel', 'url' => 'https://t.me/channel']
        ],
        [
            ['text' => '🐦 Twitter', 'url' => 'https://twitter.com/username'],
            ['text' => '📘 Facebook', 'url' => 'https://facebook.com/page']
        ]
    ];
    
    return Bot::sendMessage($pesan, [
        'reply_markup' => [
            'inline_keyboard' => $keyboard
        ]
    ]);
});
```

### Contoh 3: Keyboard Dinamis dengan Pagination

```php
$bot->cmd('/list', function () {
    $items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    $page = 1;
    $perPage = 2;
    
    $keyboard = [];
    $start = ($page - 1) * $perPage;
    $end = min($start + $perPage, count($items));
    
    // Tambahkan item ke keyboard
    for ($i = $start; $i < $end; $i++) {
        $keyboard[] = [
            ['text' => $items[$i], 'callback_data' => "item_{$i}"]
        ];
    }
    
    // Tambahkan tombol navigasi
    $navButtons = [];
    if ($page > 1) {
        $navButtons[] = ['text' => '⬅️ Prev', 'callback_data' => 'page_' . ($page - 1)];
    }
    if ($end < count($items)) {
        $navButtons[] = ['text' => 'Next ➡️', 'callback_data' => 'page_' . ($page + 1)];
    }
    if (!empty($navButtons)) {
        $keyboard[] = $navButtons;
    }
    
    return Bot::sendMessage("Daftar Item (Halaman {$page}):", [
        'reply_markup' => [
            'inline_keyboard' => $keyboard
        ]
    ]);
});
```

### Penjelasan Inline Keyboard

- **`text`**: Teks yang ditampilkan pada tombol
- **`callback_data`**: Data yang dikirim ketika tombol ditekan (maksimal 64
  byte)
- **`url`**: Link yang akan dibuka ketika tombol ditekan
- **`$bot->on('callback', function($data) {...})`**: Menangani event ketika
  tombol ditekan
- **`Bot::answerCallback()`**: Mengirim notifikasi popup ke user
- **`Bot::editText()`**: Mengubah teks pesan yang sudah dikirim

---

## Metode Long Polling

Long polling adalah metode di mana bot kamu terus-menerus "bertanya" ke server
Telegram apakah ada pesan baru.

### Cara Kerja Long Polling

```
Bot Kamu  →  "Ada pesan baru?"  →  Telegram Server
          ←  "Tidak ada"         ←
          →  "Ada pesan baru?"  →
          ←  "Ya, ada!"         ←
          →  Proses pesan       →
          →  "Ada pesan baru?"  →
```

### Menjalankan Long Polling

```bash
# Jalankan bot dengan long polling
php bot.php
```

Bot akan terus berjalan dan menunggu pesan. Untuk menghentikan, tekan `Ctrl+C`.

### Menjalankan di Background (Linux)

Jika kamu ingin bot tetap berjalan meskipun terminal ditutup:

```bash
# Menggunakan nohup
nohup php bot.php > bot.log 2>&1 &

# Atau menggunakan screen
screen -S mybot
php bot.php
# Tekan Ctrl+A lalu D untuk detach

# Kembali ke screen
screen -r mybot
```

Tutorial penggunaan Screen ada di [Setup VPS](../computer/vps-setup.md#11-menggunakan-screen)

### Kelebihan dan Kekurangan Long Polling

**Kelebihan:**

- ✅ Mudah digunakan, tidak perlu server web
- ✅ Cocok untuk development dan testing
- ✅ Tidak perlu SSL certificate

**Kekurangan:**

- ❌ Harus selalu running (konsumsi resource)
- ❌ Tidak cocok untuk production dengan traffic tinggi
- ❌ Jika script crash, bot akan mati

---

## Metode Webhook

Webhook adalah metode di mana Telegram mengirim pesan langsung ke server Anda
setiap kali ada update.

### Cara Kerja Webhook

```
User mengirim pesan  →  Telegram Server  →  Kirim ke URL webhook Anda
                                          →  Bot Anda memproses
                                          ←  Kirim response
```

### Persyaratan Webhook

1. **Server web** (Apache/Nginx)
2. **SSL Certificate** (HTTPS wajib)
3. **URL publik** yang bisa diakses Telegram
4. **PHP dengan cURL**

### Contoh Kode Webhook

Buat file `webhook.php`:

```php
<?php
require_once __DIR__ . '/phptelebot/src/PHPTelebot.php';

$token = 'ISI_TOKEN_BOT_ANDA';
$bot = new PHPTelebot($token);

// Definisikan command seperti biasa
$bot->cmd('/start', function () {
    return Bot::sendMessage('Halo! Bot berjalan dengan webhook.');
});

$bot->cmd('/help', function () {
    return Bot::sendMessage('Ini adalah bot dengan webhook.');
});

// Untuk webhook, gunakan method webhook() bukan run()
$bot->webhook();
```

### Set Webhook

Buat file `set_webhook.php`:

```php
<?php
$token = 'ISI_TOKEN_BOT_ANDA';
$webhookUrl = 'https://domain-anda.com/webhook.php';

$url = "https://api.telegram.org/bot{$token}/setWebhook?url={$webhookUrl}";
$response = file_get_contents($url);

echo $response;
```

Jalankan sekali:

```bash
php set_webhook.php
```

### Cek Status Webhook

```php
<?php
$token = 'ISI_TOKEN_BOT_ANDA';
$url = "https://api.telegram.org/bot{$token}/getWebhookInfo";
$response = file_get_contents($url);

echo $response;
```

### Hapus Webhook

```php
<?php
$token = 'ISI_TOKEN_BOT_ANDA';
$url = "https://api.telegram.org/bot{$token}/deleteWebhook";
$response = file_get_contents($url);

echo $response;
```

---

## Webhook dengan Ngrok

Ngrok adalah tool yang membuat tunnel dari internet ke localhost Anda. Sangat
berguna untuk testing webhook tanpa perlu deploy ke server.

### Langkah 1: Install Ngrok

**Linux/Mac:**

```bash
# Download ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz

# Extract
tar -xvzf ngrok-v3-stable-linux-amd64.tgz

# Pindahkan ke /usr/local/bin agar bisa diakses global
sudo mv ngrok /usr/local/bin/
```

**Windows:**

1. Download dari [https://ngrok.com/download](https://ngrok.com/download)
2. Extract file ZIP
3. Jalankan `ngrok.exe`

### Langkah 2: Daftar Akun Ngrok (Gratis)

1. Buka [https://dashboard.ngrok.com/signup](https://dashboard.ngrok.com/signup)
2. Daftar akun gratis
3. Dapatkan authtoken dari dashboard
4. Jalankan:

```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```

### Langkah 3: Setup Server Lokal

Buat file `webhook.php` di folder web server lokal Anda (misalnya di
`/var/www/html/` atau `htdocs/`):

```php
<?php
require_once __DIR__ . '/phptelebot/src/PHPTelebot.php';

$token = 'ISI_TOKEN_BOT_ANDA';
$bot = new PHPTelebot($token);

$bot->cmd('/start', function () {
    return Bot::sendMessage('Halo! Bot berjalan dengan Ngrok webhook.');
});

$bot->cmd('/test', function () {
    $pesan = "✅ Webhook berfungsi dengan baik!\n";
    $pesan .= "Server: " . $_SERVER['HTTP_HOST'];
    return Bot::sendMessage($pesan);
});

// Gunakan webhook() untuk mode webhook
$bot->webhook();
```

### Langkah 4: Jalankan Web Server Lokal

**Menggunakan PHP Built-in Server:**

```bash
# Masuk ke folder project
cd /path/to/project

# Jalankan server di port 8000
php -S localhost:8000
```

**Atau menggunakan Apache/Nginx:**

Pastikan web server Anda sudah running dan file `webhook.php` bisa diakses.

### Langkah 5: Jalankan Ngrok

Buka terminal baru dan jalankan:

```bash
# Untuk PHP built-in server (port 8000)
ngrok http 8000

# Untuk Apache/Nginx (biasanya port 80)
ngrok http 80
```

Anda akan melihat output seperti ini:

```
ngrok

Session Status                online
Account                       your@email.com
Version                       3.x.x
Region                        Asia Pacific (ap)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**Penting:** Salin URL HTTPS (misalnya `https://abc123.ngrok.io`)

### Langkah 6: Set Webhook ke Telegram

Buat file `set_webhook_ngrok.php`:

```php
<?php
$token = 'ISI_TOKEN_BOT_ANDA';

// Ganti dengan URL ngrok Anda (HARUS HTTPS)
$ngrokUrl = 'https://abc123.ngrok.io';
$webhookUrl = $ngrokUrl . '/webhook.php';

$url = "https://api.telegram.org/bot{$token}/setWebhook?url=" . urlencode($webhookUrl);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if ($result['ok']) {
    echo "✅ Webhook berhasil diset!\n";
    echo "URL: {$webhookUrl}\n";
} else {
    echo "❌ Gagal set webhook:\n";
    echo $response . "\n";
}
```

Jalankan:

```bash
php set_webhook_ngrok.php
```

### Langkah 7: Test Bot

1. Buka Telegram dan cari bot Anda
2. Kirim `/start` atau `/test`
3. Bot akan merespons melalui webhook

### Langkah 8: Monitor Request (Opsional)

Ngrok menyediakan web interface untuk melihat semua request:

1. Buka browser
2. Akses `http://127.0.0.1:4040`
3. Anda bisa melihat semua request yang masuk dari Telegram

### Troubleshooting Ngrok

**Bot tidak merespons:**

1. Cek apakah ngrok masih running
2. Cek apakah PHP server masih running
3. Cek webhook info:

```bash
curl https://api.telegram.org/botYOUR_TOKEN/getWebhookInfo
```

4. Lihat error di ngrok web interface (`http://127.0.0.1:4040`)

**URL ngrok berubah:**

- URL ngrok gratis akan berubah setiap kali Anda restart
- Anda harus set webhook ulang dengan URL baru
- Untuk URL tetap, upgrade ke ngrok berbayar

**Webhook tidak menerima update:**

```bash
# Hapus webhook
curl https://api.telegram.org/botYOUR_TOKEN/deleteWebhook

# Set ulang
php set_webhook_ngrok.php
```

### Tips Ngrok

1. **Jangan tutup terminal ngrok** - Jika ditutup, tunnel akan mati
2. **URL berubah setiap restart** - Catat URL baru dan set webhook ulang
3. **Gunakan HTTPS** - Telegram hanya menerima webhook HTTPS
4. **Monitor di web interface** - Sangat membantu untuk debugging

---

## Tips dan Troubleshooting

### Tips Umum

1. **Simpan token dengan aman**
   - Jangan commit token ke Git
   - Gunakan file `.env` atau config terpisah

   ```php
   // config.php
   <?php
   return [
       'token' => 'YOUR_BOT_TOKEN'
   ];

   // bot.php
   $config = require 'config.php';
   $bot = new PHPTelebot($config['token']);
   ```

2. **Logging untuk debugging**

   ```php
   // Tambahkan logging
   file_put_contents('bot.log', date('Y-m-d H:i:s') . " - " . json_encode(Bot::$update) . "\n", FILE_APPEND);
   ```

3. **Gunakan try-catch**

   ```php
   $bot->cmd('/start', function () {
       try {
           // Kode Anda
           return Bot::sendMessage('Halo!');
       } catch (Exception $e) {
           error_log($e->getMessage());
           return Bot::sendMessage('Terjadi kesalahan.');
       }
   });
   ```

### Troubleshooting

**Bot tidak merespons:**

1. Cek token sudah benar
2. Cek koneksi internet
3. Cek apakah script berjalan tanpa error
4. Untuk webhook: cek apakah URL bisa diakses dari luar

**Error "Call to undefined function curl_init":**

```bash
# Ubuntu/Debian
sudo apt install php-curl

# CentOS/RHEL
sudo yum install php-curl

# Restart web server
sudo service apache2 restart
```

**Webhook tidak berfungsi:**

```bash
# Cek status webhook
curl https://api.telegram.org/botYOUR_TOKEN/getWebhookInfo

# Hapus webhook jika ada masalah
curl https://api.telegram.org/botYOUR_TOKEN/deleteWebhook

# Set ulang
curl -X POST https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=YOUR_WEBHOOK_URL
```

**Long polling error "Conflict: terminated by other getUpdates":**

- Ada instance lain yang running
- Atau webhook masih aktif
- Solusi: Hapus webhook dengan `deleteWebhook`

---

## Referensi

### Dokumentasi Telegram

1. **Telegram Bot API Official**
   - [https://core.telegram.org/bots/api](https://core.telegram.org/bots/api)
   - Dokumentasi lengkap semua method dan object Telegram Bot API

2. **Telegram Bot Features**
   - [https://core.telegram.org/bots/features](https://core.telegram.org/bots/features)
   - Penjelasan fitur-fitur bot Telegram

3. **Telegram Bot Tutorial**
   - [https://core.telegram.org/bots/tutorial](https://core.telegram.org/bots/tutorial)
   - Tutorial resmi dari Telegram

4. **Inline Keyboards**
   - [https://core.telegram.org/bots/features#inline-keyboards](https://core.telegram.org/bots/features#inline-keyboards)
   - Dokumentasi lengkap inline keyboard

5. **Webhooks Guide**
   - [https://core.telegram.org/bots/webhooks](https://core.telegram.org/bots/webhooks)
   - Panduan lengkap webhook dari Telegram

### Dokumentasi PHP

1. **PHP cURL**
   - [https://www.php.net/manual/en/book.curl.php](https://www.php.net/manual/en/book.curl.php)
   - Dokumentasi cURL di PHP

2. **PHP JSON**
   - [https://www.php.net/manual/en/book.json.php](https://www.php.net/manual/en/book.json.php)
   - Fungsi-fungsi JSON di PHP

3. **PHP File Handling**
   - [https://www.php.net/manual/en/ref.filesystem.php](https://www.php.net/manual/en/ref.filesystem.php)
   - Manipulasi file di PHP

### Framework PHPTelebot

1. **PHPTelebot GitHub**
   - [https://github.com/GrayHoax/phptelebot](https://github.com/GrayHoax/phptelebot)
   - Repository resmi PHPTelebot

2. **PHPTelebot Examples**
   - [https://github.com/GrayHoax/phptelebot/tree/master/examples](https://github.com/GrayHoax/phptelebot/tree/master/examples)
   - Contoh-contoh penggunaan

### Tools Pendukung

1. **Ngrok**
   - [https://ngrok.com/](https://ngrok.com/)
   - Website resmi Ngrok
   - [https://ngrok.com/docs](https://ngrok.com/docs) - Dokumentasi Ngrok

2. **BotFather**
   - [@BotFather](https://t.me/BotFather)
   - Bot untuk membuat dan manage bot Telegram

3. **Telegram API Testing**
   - [https://api.telegram.org/bot<YOUR_TOKEN>/getMe](https://api.telegram.org/bot<YOUR_TOKEN>/getMe)
   - Test apakah token Anda valid

### Komunitas dan Bantuan

1. **Telegram Bot Indonesia**
   - [@botindonesia](https://t.me/botindonesia)
   - Grup diskusi developer bot Telegram Indonesia

2. **Stack Overflow**
   - [https://stackoverflow.com/questions/tagged/telegram-bot](https://stackoverflow.com/questions/tagged/telegram-bot)
   - Forum tanya jawab

3. **PHP Indonesia**
   - [@phpid](https://t.me/phpid)
   - Komunitas PHP Indonesia

---

## Penutup

Selamat! Kita telah mempelajari cara membuat bot Telegram menggunakan
PHPTelebot. Mulai dari instalasi, membuat bot sederhana, menggunakan inline
keyboard, hingga setup webhook dengan Ngrok.

**Langkah selanjutnya:**

- Eksplorasi fitur-fitur lain di
  [dokumentasi Telegram Bot API](https://core.telegram.org/bots/api)
- Pelajari cara mengirim foto, video, dan dokumen
- Implementasikan database untuk menyimpan data user
- Buat bot yang lebih kompleks dengan state management

Jika ada pertanyaan atau menemui masalah, jangan ragu untuk bertanya di
komunitas atau membuka issue di repository PHPTelebot.

**Selamat coding! 🚀**
