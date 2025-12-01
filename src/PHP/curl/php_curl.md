
### Bab 2: Interaksi Pertama dengan Telegram Bot API

#### 2.1. Struktur Permintaan API

Semua interaksi dengan Telegram Bot API dilakukan melalui permintaan HTTP POST atau GET ke URL dasar berikut:

```
https://api.telegram.org/bot<TOKEN>/<METHOD>
```

Di mana:
*   `<TOKEN>` adalah token bot Anda.
*   `<METHOD>` adalah nama metode API yang ingin Anda panggil (misalnya, `sendMessage`).

#### 2.2. Memahami Fungsi cURL di PHP

Fungsi inti untuk berinteraksi dengan API menggunakan cURL adalah:

| Fungsi cURL | Deskripsi |
| :--- | :--- |
| `curl_init()` | Menginisialisasi sesi cURL. |
| `curl_setopt()` | Mengatur opsi untuk transfer cURL. |
| `curl_exec()` | Mengeksekusi sesi cURL. |
| `curl_close()` | Menutup sesi cURL. |

#### 2.3. Contoh Dasar: Mengirim Pesan Teks (`sendMessage`)

Metode `sendMessage` digunakan untuk mengirim pesan teks ke pengguna atau grup. Parameter wajibnya adalah `chat_id` (ID obrolan tujuan) dan `text` (isi pesan).

Berikut adalah fungsi PHP yang mengimplementasikan permintaan cURL ke API Telegram:

```php
<?php
// Ganti dengan token bot Anda
define('BOT_TOKEN', 'GANTI_DENGAN_TOKEN_BOT_ANDA');
define('API_URL', 'https://api.telegram.org/bot' . BOT_TOKEN . '/');

/**
 * Fungsi untuk memanggil metode API Telegram menggunakan cURL
 * @param string $method Nama metode API (misalnya, 'sendMessage')
 * @param array $params Parameter yang akan dikirimkan
 * @return array Hasil respons dari API
 */
function apiRequest($method, $params = []) {
    $url = API_URL . $method;
    $ch = curl_init();
    
    // Mengatur opsi cURL
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Mengembalikan hasil transfer sebagai string
    curl_setopt($ch, CURLOPT_POST, true); // Menggunakan metode POST
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params)); // Mengirim parameter sebagai query string
    
    // Eksekusi permintaan
    $response = curl_exec($ch);
    
    // Cek error
    if (curl_error($ch)) {
        throw new \Exception(curl_error($ch));
    }
    
    // Tutup sesi cURL
    curl_close($ch);
    
    // Mengembalikan respons dalam bentuk array PHP
    return json_decode($response, true);
}

// Contoh penggunaan: Mengirim pesan ke chat ID tertentu
$chat_id = 'GANTI_DENGAN_CHAT_ID_ANDA'; // Anda bisa mendapatkan ini dari update pertama
$text = 'Halo! Ini adalah pesan pertama dari bot PHP cURL saya.';

$result = apiRequest('sendMessage', [
    'chat_id' => $chat_id,
    'text' => $text,
    'parse_mode' => 'Markdown'
]);

// Tampilkan hasil
print_r($result);
?>
```

#### 2.4. Contoh Dasar: Mendapatkan Informasi Bot (`getMe`)

Metode `getMe` adalah cara termudah untuk menguji koneksi dan memverifikasi token bot Anda.

```php
// ... (gunakan fungsi apiRequest dari contoh sebelumnya)

$bot_info = apiRequest('getMe');

if ($bot_info['ok']) {
    echo "Bot berhasil terhubung!\n";
    echo "Username Bot: @" . $bot_info['result']['username'] . "\n";
    echo "ID Bot: " . $bot_info['result']['id'] . "\n";
} else {
    echo "Gagal terhubung ke API Telegram: " . $bot_info['description'] . "\n";
}
```

#### 2.5. Menjalankan Skrip Melalui Command Line (CLI)

Menjalankan skrip langsung dari command line memudahkan pengujian tanpa harus menyiapkan server web terlebih dahulu. Berikut langkah yang bisa diikuti secara berurutan:

1.  **Pastikan PHP terpasang dengan benar.** Buka Terminal (macOS/Linux) atau Command Prompt/PowerShell (Windows), lalu jalankan:

    ```bash
    php -v
    ```

    Jika versi PHP muncul, berarti PHP siap digunakan. 
    
    Contoh hasilnya:
    
    ```sh
    $ php -v
    PHP 8.3.6 (cli) (built: Jul 14 2025 18:30:55) (NTS)
    Copyright (c) The PHP Group
    Zend Engine v4.3.6, Copyright (c) Zend Technologies
        with Zend OPcache v8.3.6, Copyright (c), by Zend Technologies
    ```
    
    ![](./static/img/version.jpg)
    
    Bila muncul pesan error, instal PHP terlebih dahulu atau pastikan path PHP sudah ditambahkan ke `PATH`.
    
2.  **Simpan kode PHP Anda ke dalam sebuah berkas.** Misalnya `send_message.php` atau `get_me.php`. Gunakan editor teks apa pun (Notepad, VS Code, atau nano) dan pastikan token bot sudah diganti dengan milik Anda.
3.  **Masuk ke folder tempat berkas disimpan.** Gunakan perintah `cd` (change directory). Contoh:

    ```bash
    cd /home/user/proyek-bot
    ```

    Di Windows, sesuaikan dengan drive yang tepat, misalnya `cd C:\Users\nama\proyek-bot`.
4.  **Jalankan skrip dengan perintah `php nama_berkas.php`.** Contoh:

    ```bash
    php send_message.php
    ```

    Terminal akan menampilkan hasil `print_r($result)` atau pesan lain yang Anda buat di skrip. Jika permintaan berhasil, status `ok` bernilai `true` dan pesan akan terkirim ke Telegram.
5.  **Baca pesan atau error yang muncul.** Pesan sukses berarti skrip berjalan sesuai harapan. Jika ada error (misalnya `{"ok":false,...}`), catat keterangannya, periksa ulang token, koneksi internet, atau parameter yang dikirim.

Dengan alur di atas, siapapun dapat menguji bot kecil secara mandiri hanya bermodalkan PHP CLI dan koneksi internet, tanpa harus memahami konfigurasi server web yang lebih kompleks.

##### Melihat Detail Permintaan dengan cURL Verbose

Kadang perlu melihat detail lalu lintas HTTP (header permintaan, header respons, status koneksi) untuk memastikan permintaan benar. PHP menyediakan opsi `CURLOPT_VERBOSE` agar cURL mengeluarkan log proses secara mendetail.

*   **Fungsi utama:** Menampilkan informasi debug yang mencakup bagaimana cURL membuka koneksi, header yang dikirim, respon yang diterima, hingga informasi SSL.
*   **Cara mengaktifkan:** Setel `CURLOPT_VERBOSE` ke `true`. Agar log rapi, arahkan output-nya ke berkas atau `php://stdout`.

Contoh menyalakan verbose dan menyimpan log ke berkas `curl_debug.log`:

```php
$ch = curl_init();
$verbose = fopen('curl_debug.log', 'w'); // log akan ditulis ke file

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
curl_setopt($ch, CURLOPT_VERBOSE, true); // aktifkan verbose
curl_setopt($ch, CURLOPT_STDERR, $verbose); // arahkan output verbose

$response = curl_exec($ch);

if (curl_error($ch)) {
    throw new \Exception(curl_error($ch));
}

curl_close($ch);
fclose($verbose);
```

Setelah skrip dijalankan lewat command line, buka `curl_debug.log` untuk melihat seluruh detail komunikasi. Ketika terjadi error (contoh: token salah atau koneksi ditolak), informasi verbose biasanya memberi petunjuk jelas soal penyebabnya.

### Bab 3: Menerima Pembaruan (Updates) dari Pengguna

Bot perlu menerima pesan atau interaksi dari pengguna, yang disebut **Updates**. Ada dua cara utama untuk menerima Updates: Polling dan Webhook.

#### 3.1. Metode Polling (Long Polling)

Polling adalah metode di mana bot secara berkala (misalnya, setiap beberapa detik) bertanya kepada server Telegram, "Apakah ada pesan baru untuk saya?".

*   **Cara Kerja `getUpdates`:** Bot memanggil metode `getUpdates` secara berulang. Telegram menggunakan **Long Polling**, yang berarti server akan menahan koneksi hingga ada pembaruan baru atau batas waktu tercapai.
*   **Kelebihan:** Sangat mudah diimplementasikan, tidak memerlukan domain publik atau sertifikat SSL.
*   **Kekurangan:** Boros sumber daya server (harus terus-menerus membuat koneksi), ada jeda waktu (latency) antara pesan dikirim dan diterima bot, tidak cocok untuk bot dengan volume tinggi.

#### 3.2. Metode Webhook (Direkomendasikan)

Webhook adalah mekanisme di mana server Telegram yang akan menghubungi (memanggil) skrip PHP Anda secara instan setiap kali ada pembaruan baru.

*   **Cara Kerja Webhook:** Anda memberikan URL publik (misalnya, `https://domainanda.com/webhook.php`) kepada Telegram. Ketika ada pesan baru, Telegram mengirimkan permintaan HTTP POST berisi data pembaruan (dalam format JSON) ke URL tersebut.
*   **Mendaftarkan Webhook (`setWebhook`):**

```php
// ... (gunakan fungsi apiRequest)

$webhook_url = 'https://domainanda.com/webhook.php'; // Ganti dengan URL publik Anda

$result = apiRequest('setWebhook', [
    'url' => $webhook_url
]);

if ($result['ok']) {
    echo "Webhook berhasil diatur ke: " . $webhook_url . "\n";
} else {
    echo "Gagal mengatur Webhook: " . $result['description'] . "\n";
}
```

*   **Menangani Data JSON dari Webhook di PHP:**
    Skrip `webhook.php` Anda hanya perlu membaca input mentah dari permintaan POST dan memprosesnya.

```php
<?php
// webhook.php
// Baca input mentah dari permintaan POST
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Log data untuk debugging
file_put_contents('update_log.txt', date('Y-m-d H:i:s') . "\n" . $content . "\n\n", FILE_APPEND);

if (isset($update['message'])) {
    $chat_id = $update['message']['chat']['id'];
    $text = $update['message']['text'];
    
    // Lakukan aksi balasan (misalnya, echo)
    apiRequest('sendMessage', [
        'chat_id' => $chat_id,
        'text' => "Anda mengirim: " . $text
    ]);
}

// Penting: Telegram mengharapkan respons HTTP 200 OK secepat mungkin
// Skrip harus selesai dieksekusi tanpa output tambahan
?>
```

*   **Kelebihan:** Instan, efisien, dan skalabel.
*   **Kekurangan:** Membutuhkan domain publik dan sertifikat SSL (walaupun Telegram menerima sertifikat yang ditandatangani sendiri, HTTPS tetap wajib).

---

## Bagian II: Fitur Interaktif Bot

### Bab 4: Keyboard Balasan (Reply Keyboard)

Keyboard Balasan (Reply Keyboard) adalah keyboard kustom yang muncul di atas kolom input pesan pengguna. Keyboard ini dirancang untuk menggantikan keyboard standar perangkat, membatasi input pengguna ke pilihan yang telah ditentukan.

#### 4.1. Pengenalan `ReplyKeyboardMarkup`

Untuk menampilkan keyboard ini, Anda perlu mengirimkan objek JSON `ReplyKeyboardMarkup` sebagai nilai dari parameter `reply_markup` dalam metode seperti `sendMessage`.

```json
{
    "keyboard": [
        ["Tombol 1", "Tombol 2"],
        ["Tombol Baris Baru"]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": false
}
```

#### 4.2. Membuat Keyboard Kustom Sederhana

Dalam PHP, kita akan membuat struktur array yang kemudian di-encode menjadi JSON.

```php
$keyboard = [
    'keyboard' => [
        ['Pesan Saya', 'Bantuan'],
        ['Tentang Bot']
    ],
    'resize_keyboard' => true, // Agar keyboard menyesuaikan ukuran layar
    'one_time_keyboard' => false // Keyboard tetap muncul setelah digunakan
];

$reply_markup = json_encode($keyboard);

// Contoh pengiriman pesan dengan keyboard
apiRequest('sendMessage', [
    'chat_id' => $chat_id,
    'text' => 'Silakan pilih menu di bawah:',
    'reply_markup' => $reply_markup
]);
```

#### 4.3. Opsi Keyboard Lanjutan

*   `resize_keyboard`: (Boolean) Jika `true`, keyboard akan dibuat lebih kecil.
*   `one_time_keyboard`: (Boolean) Jika `true`, keyboard akan disembunyikan setelah pengguna menekan tombol.
*   `remove_keyboard`: (Objek JSON) Digunakan untuk menghapus keyboard balasan yang sedang aktif.

```php
// Menghapus keyboard balasan
$remove_keyboard = json_encode(['remove_keyboard' => true]);

apiRequest('sendMessage', [
    'chat_id' => $chat_id,
    'text' => 'Keyboard telah dihapus.',
    'reply_markup' => $remove_keyboard
]);
```

#### 4.4. Menangani Input Teks dari Keyboard

Ketika pengguna menekan tombol Reply Keyboard, teks pada tombol tersebut akan dikirimkan ke bot sebagai pesan teks biasa. Bot Anda perlu memproses teks ini seperti perintah atau pesan biasa.

```php
// Dalam skrip webhook.php
if (isset($update['message'])) {
    $chat_id = $update['message']['chat']['id'];
    $text = $update['message']['text'];
    
    switch ($text) {
        case 'Pesan Saya':
            $response = 'Ini adalah pesan dari menu "Pesan Saya".';
            break;
        case 'Bantuan':
            $response = 'Silakan hubungi admin untuk bantuan.';
            break;
        default:
            $response = 'Perintah tidak dikenal.';
            break;
    }
    
    apiRequest('sendMessage', [
        'chat_id' => $chat_id,
        'text' => $response
    ]);
}
```

### Bab 5: Keyboard Inline (Inline Keyboard)

Keyboard Inline adalah tombol-tombol kecil yang melekat langsung pada pesan tertentu. Berbeda dengan Reply Keyboard, tombol Inline tidak mengirimkan teks ke obrolan, melainkan mengirimkan data tersembunyi yang disebut **Callback Query**.

#### 5.1. Pengenalan `InlineKeyboardMarkup`

Keyboard Inline dikirim melalui parameter `reply_markup` dengan objek JSON `InlineKeyboardMarkup`.

```json
{
    "inline_keyboard": [
        [
            {"text": "Opsi A", "callback_data": "opsi_a"},
            {"text": "Kunjungi", "url": "https://telegram.org"}
        ]
    ]
}
```

#### 5.2. Perbedaan Utama dengan Reply Keyboard

| Fitur | Reply Keyboard | Inline Keyboard |
| :--- | :--- | :--- |
| **Posisi** | Di bawah kolom input pesan | Melekat pada pesan |
| **Aksi** | Mengirim pesan teks ke obrolan | Mengirim `callback_query` tersembunyi |
| **Data** | Teks tombol terlihat di obrolan | Data tersembunyi (`callback_data`) |
| **Penggunaan** | Menu utama, input terbatas | Interaksi spesifik pesan (voting, navigasi) |

#### 5.3. Membuat Tombol Inline dengan `callback_data`

Tombol Inline yang paling umum adalah tombol `callback_data`. Ketika ditekan, tombol ini mengirimkan `callback_query` ke bot.

```php
$keyboard = [
    'inline_keyboard' => [
        [
            ['text' => 'Ya, Setuju', 'callback_data' => 'vote_yes'],
            ['text' => 'Tidak Setuju', 'callback_data' => 'vote_no']
        ],
        [
            ['text' => 'Baca Lebih Lanjut', 'url' => 'https://banghasan.com']
        ]
    ]
];

$reply_markup = json_encode($keyboard);

apiRequest('sendMessage', [
    'chat_id' => $chat_id,
    'text' => 'Apakah Anda setuju dengan kebijakan ini?',
    'reply_markup' => $reply_markup
]);
```

#### 5.4. Menangani `callback_query`

Data `callback_query` diterima oleh bot sebagai jenis pembaruan yang berbeda dari pesan biasa.

1.  **Mendeteksi `callback_query`:** Periksa apakah array `$update` memiliki kunci `callback_query`.
2.  **Mengambil Data:** Ambil `callback_data` dan `id` dari `callback_query`.
3.  **Menjawab Query:** Setelah memproses, Anda **harus** memanggil metode `answerCallbackQuery` untuk menghilangkan status "loading" pada tombol pengguna.

```php
// Dalam skrip webhook.php
// ...
if (isset($update['callback_query'])) {
    $callback_query_id = $update['callback_query']['id'];
    $callback_data = $update['callback_query']['data'];
    $chat_id = $update['callback_query']['message']['chat']['id'];
    $message_id = $update['callback_query']['message']['message_id'];
    
    $alert_text = '';
    
    switch ($callback_data) {
        case 'vote_yes':
            $alert_text = 'Anda memilih Ya!';
            $new_text = 'Anda telah memilih: **Ya**';
            break;
        case 'vote_no':
            $alert_text = 'Anda memilih Tidak!';
            $new_text = 'Anda telah memilih: **Tidak**';
            break;
    }
    
    // 1. Menjawab Callback Query (menampilkan notifikasi pop-up)
    apiRequest('answerCallbackQuery', [
        'callback_query_id' => $callback_query_id,
        'text' => $alert_text,
        'show_alert' => false // Jika true, akan muncul pop-up besar
    ]);
    
    // 2. Mengedit Pesan (opsional, untuk menunjukkan perubahan status)
    apiRequest('editMessageText', [
        'chat_id' => $chat_id,
        'message_id' => $message_id,
        'text' => $new_text,
        'parse_mode' => 'Markdown',
        // Hapus reply_markup agar tombol tidak bisa ditekan lagi
    ]);
}
// ...
?>
```

### Bab 6: Bot Inline (Inline Mode)

Bot Inline memungkinkan pengguna untuk berinteraksi dengan bot Anda langsung dari kolom input pesan di obrolan mana pun, tanpa perlu menambahkan bot ke grup atau mengirim pesan langsung. Pengguna hanya perlu mengetik `@usernamebot` diikuti dengan kueri mereka.

#### 6.1. Mengaktifkan Inline Mode pada Bot

Inline Mode harus diaktifkan melalui @BotFather:
1.  Ketik `/setinline` dan pilih bot Anda.
2.  Pilih teks placeholder yang akan muncul di kolom input pengguna (misalnya, "Cari di bot ini...").

#### 6.2. Memahami `inline_query`

Ketika pengguna mengetik `@usernamebot kueri`, bot Anda akan menerima pembaruan jenis `inline_query`. Pembaruan ini berisi:
*   `id`: ID unik dari kueri inline.
*   `query`: Teks yang diketik pengguna setelah username bot.
*   `from`: Informasi pengguna yang membuat kueri.

#### 6.3. Mengirim Hasil Pencarian dengan `answerInlineQuery`

Untuk merespons `inline_query`, Anda harus memanggil metode `answerInlineQuery`. Metode ini memerlukan dua parameter utama:
1.  `inline_query_id`: ID kueri yang diterima.
2.  `results`: Array JSON dari hasil yang akan ditampilkan kepada pengguna.

Setiap hasil dalam array `results` harus memiliki:
*   `type`: Jenis hasil (misalnya, `article`, `photo`, `gif`).
*   `id`: ID unik untuk hasil tersebut (harus berupa string).
*   `input_message_content`: Konten pesan yang akan dikirim ke obrolan jika pengguna memilih hasil ini.

#### 6.4. Tipe-tipe Hasil Inline

Telegram mendukung berbagai jenis hasil inline. Yang paling umum adalah:

| Tipe Hasil | Deskripsi | Parameter Wajib |
| :--- | :--- | :--- |
| `article` | Pesan teks sederhana. | `title`, `input_message_content` |
| `photo` | Gambar. | `photo_url`, `thumb_url` |
| `gif` | Animasi GIF. | `gif_url`, `thumb_url` |

**Contoh Implementasi Inline Query Handler:**

```php
// Dalam skrip webhook.php
// ...
if (isset($update['inline_query'])) {
    $inline_query_id = $update['inline_query']['id'];
    $query_text = $update['inline_query']['query'];
    
    // Logika sederhana: Balas dengan hasil artikel
    $results = [];
    
    // Hasil 1: Echo Teks
    $results[] = [
        'type' => 'article',
        'id' => '1',
        'title' => 'Echo: ' . $query_text,
        'input_message_content' => [
            'message_text' => 'Anda mengetik: *' . $query_text . '*',
            'parse_mode' => 'Markdown'
        ]
    ];
    
    // Hasil 2: Informasi Penulis
    $results[] = [
        'type' => 'article',
        'id' => '2',
        'title' => 'Tentang Penulis',
        'input_message_content' => [
            'message_text' => "Penulis: Hasanudin H Syafaat\nEmail: banghasan@gmail.com",
            'parse_mode' => 'Markdown'
        ]
    ];
    
    apiRequest('answerInlineQuery', [
        'inline_query_id' => $inline_query_id,
        'results' => json_encode($results), // Array hasil harus di-encode ke JSON
        'cache_time' => 0 // Jangan cache hasil (untuk pengembangan)
    ]);
}
// ...
```

---

## Bagian III: Membangun Framework Bot Sederhana

Meskipun fungsi `apiRequest` kita sudah berfungsi, kode bot akan menjadi berantakan dan sulit dikelola seiring bertambahnya fitur. Kita akan menerapkan konsep **Pemrograman Berorientasi Objek (OOP)** untuk membuat framework sederhana.

### Bab 7: Merancang Kelas Bot Sederhana (Simple Framework)

#### 7.1. Konsep Dasar OOP untuk Bot

OOP memungkinkan kita untuk mengelompokkan data (properti) dan fungsi (metode) yang terkait ke dalam sebuah objek (kelas). Dalam kasus bot, kita akan memiliki satu kelas utama yang menangani semua komunikasi dengan Telegram API dan pemrosesan pembaruan.

#### 7.2. Struktur Kelas Utama (`SimpleTelegramBot`)

Kita akan membuat kelas `SimpleTelegramBot` yang akan menjadi inti dari bot kita.

```php
<?php
class SimpleTelegramBot {
    protected $token;
    protected $api_url;
    protected $update;

    /**
     * Konstruktor: Inisialisasi token dan URL API
     * @param string $token Token bot dari @BotFather
     */
    public function __construct($token) {
        $this->token = $token;
        $this->api_url = 'https://api.telegram.org/bot' . $this->token . '/';
    }

    /**
     * Metode untuk mendapatkan data pembaruan (Update) dari Webhook
     */
    public function getUpdate() {
        $content = file_get_contents("php://input");
        $this->update = json_decode($content, true);
        return $this->update;
    }

    // ... Metode lain akan ditambahkan di Bab 8
}
?>
```

#### 7.3. Metode Inti: Wrapper cURL

Kita akan memindahkan fungsi `apiRequest` ke dalam kelas sebagai metode `_request` (dengan underscore untuk menandakan bahwa ini adalah metode internal/protected).

```php
    /**
     * Wrapper cURL untuk memanggil metode API Telegram
     * @param string $method Nama metode API
     * @param array $params Parameter yang akan dikirimkan
     * @return array Hasil respons dari API
     */
    protected function _request($method, $params = []) {
        $url = $this->api_url . $method;
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
```

### Bab 8: Implementasi Update Handler dan Metode Utama

#### 8.1. Metode `isCommand($command)` dan `getCommand()`

Untuk mempermudah penanganan perintah (misalnya, `/start`, `/help`), kita tambahkan metode utilitas.

```php
    /**
     * Memeriksa apakah pembaruan saat ini adalah pesan dan dimulai dengan perintah
     * @param string $command Perintah yang dicari (tanpa '/')
     * @return bool
     */
    public function isCommand($command) {
        if (isset($this->update['message']['text'])) {
            $text = $this->update['message']['text'];
            return strtolower($text) === '/' . strtolower($command);
        }
        return false;
    }

    /**
     * Mendapatkan ID Obrolan (Chat ID) dari pembaruan
     * @return int|null
     */
    public function getChatId() {
        if (isset($this->update['message']['chat']['id'])) {
            return $this->update['message']['chat']['id'];
        }
        if (isset($this->update['callback_query']['message']['chat']['id'])) {
            return $this->update['callback_query']['message']['chat']['id'];
        }
        return null;
    }
```

#### 8.2. Metode Aksi Cepat

Kita buat metode publik yang lebih mudah dibaca untuk fungsi-fungsi API yang sering digunakan.

```php
    /**
     * Mengirim pesan teks
     * @param int $chat_id ID Obrolan tujuan
     * @param string $text Isi pesan
     * @param array $options Opsi tambahan (reply_markup, parse_mode, dll.)
     * @return array Hasil respons API
     */
    public function sendMessage($chat_id, $text, $options = []) {
        $params = array_merge([
            'chat_id' => $chat_id,
            'text' => $text,
            'parse_mode' => 'Markdown'
        ], $options);
        
        return $this->_request('sendMessage', $params);
    }

    /**
     * Mengirim foto
     * @param int $chat_id ID Obrolan tujuan
     * @param string $photo URL atau path file foto
     * @param array $options Opsi tambahan
     * @return array Hasil respons API
     */
    public function sendPhoto($chat_id, $photo, $options = []) {
        $params = array_merge([
            'chat_id' => $chat_id,
            'photo' => $photo
        ], $options);
        
        // Catatan: Untuk upload file lokal, cURL memerlukan penanganan multipart/form-data
        // Untuk framework sederhana ini, kita asumsikan $photo adalah URL atau file_id
        return $this->_request('sendPhoto', $params);
    }
}
```

#### 8.3. Contoh Penggunaan Framework: Bot Echo dan Perintah Sederhana

Berikut adalah contoh skrip `webhook.php` yang menggunakan kelas `SimpleTelegramBot`.

```php
<?php
// File: SimpleTelegramBot.php (berisi definisi kelas di atas)
require_once 'SimpleTelegramBot.php';

// Ganti dengan token bot Anda
$bot_token = 'GANTI_DENGAN_TOKEN_BOT_ANDA';
$bot = new SimpleTelegramBot($bot_token);

// 1. Dapatkan pembaruan
$update = $bot->getUpdate();

// 2. Logika Penanganan Perintah
$chat_id = $bot->getChatId();

if ($chat_id) {
    if ($bot->isCommand('start')) {
        $bot->sendMessage($chat_id, "Selamat datang di Bot Sederhana!\nKetik /echo [pesan] untuk mengulang pesan Anda.");
    } elseif (isset($update['message']['text'])) {
        $text = $update['message']['text'];
        
        // Penanganan perintah /echo
        if (strpos($text, '/echo') === 0) {
            $echo_text = trim(substr($text, 5));
            $bot->sendMessage($chat_id, "Echo: " . $echo_text);
        } else {
            // Echo default
            $bot->sendMessage($chat_id, "Anda mengirim: " . $text);
        }
    }
}

// 3. Penanganan Callback Query (jika ada)
if (isset($update['callback_query'])) {
    // Logika penanganan callback query di sini
    // ...
}

// Penting: Pastikan skrip selesai tanpa output tambahan
?>
```

---

## Bab 9: Penutup

#### 9.1. Ringkasan Materi

Ebook ini telah memandu Anda dari dasar-dasar interaksi dengan Telegram Bot API menggunakan PHP dan cURL hingga implementasi fitur-fitur lanjutan seperti Inline Keyboard dan Inline Mode. Puncak dari pembelajaran ini adalah perancangan dan penggunaan kelas `SimpleTelegramBot` yang menyederhanakan komunikasi API, meletakkan fondasi untuk pengembangan bot yang lebih terstruktur dan mudah dikelola.

#### 9.2. Langkah Selanjutnya

Untuk mengembangkan bot Anda lebih jauh, pertimbangkan langkah-langkah berikut:
*   **Database:** Integrasikan database (misalnya, MySQL atau PostgreSQL) untuk menyimpan data pengguna, sesi, dan konfigurasi bot.
*   **Hosting:** Pindahkan bot Anda ke server hosting yang mendukung Webhook (memiliki domain publik dan SSL).
*   **Skalabilitas:** Untuk bot dengan volume tinggi, pertimbangkan untuk menggunakan *queue* (antrian) seperti Redis atau RabbitMQ untuk memproses pembaruan secara asinkron.

#### 9.3. Informasi Penulis dan Diskusi

Terima kasih telah membaca ebook ini. Semoga panduan ini bermanfaat dalam perjalanan Anda membangun bot Telegram.

*   **Penulis:** Hasanudin H Syafaat
*   **Email:** banghasan@gmail.com
*   **Diskusi:** Bergabunglah dengan komunitas di **@botindonesia** untuk berbagi pengetahuan dan mendapatkan bantuan.

---
**Lampiran A: Daftar Metode API Telegram yang Sering Digunakan**

| Metode | Deskripsi | Kategori |
| :--- | :--- | :--- |
| `getMe` | Menguji token bot dan mendapatkan informasi dasar. | Dasar |
| `sendMessage` | Mengirim pesan teks. | Pesan |
| `sendPhoto` | Mengirim foto. | Pesan |
| `setWebhook` | Mendaftarkan URL Webhook. | Updates |
| `deleteWebhook` | Menghapus Webhook yang terdaftar. | Updates |
| `getUpdates` | Mengambil pembaruan menggunakan Polling. | Updates |
| `answerCallbackQuery` | Menanggapi Callback Query dari Inline Keyboard. | Interaktif |
| `editMessageText` | Mengedit pesan teks yang sudah terkirim. | Interaktif |
| `answerInlineQuery` | Menanggapi kueri dari Inline Mode. | Inline |

**Lampiran B: Contoh Lengkap Kode Webhook Handler**

Lihat file `SimpleTelegramBot.php` dan contoh penggunaan di Bab 8 untuk implementasi Webhook Handler yang lengkap dan terstruktur.

```php 
<?php
/**
 * SimpleTelegramBot Class
 * Framework sederhana untuk berinteraksi dengan Telegram Bot API menggunakan cURL.
 * Penulis: Hasanudin H Syafaat
 */
class SimpleTelegramBot {
    protected $token;
    protected $api_url;
    protected $update;

    /**
     * Konstruktor: Inisialisasi token dan URL API
     * @param string $token Token bot dari @BotFather
     */
    public function __construct($token) {
        $this->token = $token;
        $this->api_url = 'https://api.telegram.org/bot' . $this->token . '/';
    }

    /**
     * Metode untuk mendapatkan data pembaruan (Update) dari Webhook
     */
    public function getUpdate() {
        $content = file_get_contents("php://input");
        $this->update = json_decode($content, true);
        return $this->update;
    }

    /**
     * Wrapper cURL untuk memanggil metode API Telegram
     * @param string $method Nama metode API
     * @param array $params Parameter yang akan dikirimkan
     * @return array Hasil respons dari API
     */
    protected function _request($method, $params = []) {
        $url = $this->api_url . $method;
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }

    /**
     * Memeriksa apakah pembaruan saat ini adalah pesan dan dimulai dengan perintah
     * @param string $command Perintah yang dicari (tanpa '/')
     * @return bool
     */
    public function isCommand($command) {
        if (isset($this->update['message']['text'])) {
            $text = $this->update['message']['text'];
            return strtolower($text) === '/' . strtolower($command);
        }
        return false;
    }

    /**
     * Mendapatkan ID Obrolan (Chat ID) dari pembaruan
     * @return int|null
     */
    public function getChatId() {
        if (isset($this->update['message']['chat']['id'])) {
            return $this->update['message']['chat']['id'];
        }
        if (isset($this->update['callback_query']['message']['chat']['id'])) {
            return $this->update['callback_query']['message']['chat']['id'];
        }
        return null;
    }

    /**
     * Mengirim pesan teks
     * @param int $chat_id ID Obrolan tujuan
     * @param string $text Isi pesan
     * @param array $options Opsi tambahan (reply_markup, parse_mode, dll.)
     * @return array Hasil respons API
     */
    public function sendMessage($chat_id, $text, $options = []) {
        $params = array_merge([
            'chat_id' => $chat_id,
            'text' => $text,
            'parse_mode' => 'Markdown'
        ], $options);
        
        return $this->_request('sendMessage', $params);
    }

    /**
     * Mengirim foto
     * @param int $chat_id ID Obrolan tujuan
     * @param string $photo URL atau path file foto
     * @param array $options Opsi tambahan
     * @return array Hasil respons API
     */
    public function sendPhoto($chat_id, $photo, $options = []) {
        $params = array_merge([
            'chat_id' => $chat_id,
            'photo' => $photo
        ], $options);
        
        // Catatan: Untuk upload file lokal, cURL memerlukan penanganan multipart/form-data
        // Untuk framework sederhana ini, kita asumsikan $photo adalah URL atau file_id
        return $this->_request('sendPhoto', $params);
    }
}
?>
```
