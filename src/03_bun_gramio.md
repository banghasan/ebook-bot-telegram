# Membangun Bot Telegram dengan Bun dan GramIO

**Panduan (Semoga) Lengkap dari Pemula hingga Lanjutan**

**Penulis:** Hasanudin H Syafaat
**Release:** Desember 2025
**Versi:** `0.0.1`

---

## Metadata Penulis

*   **Penulis:** Hasanudin H Syafaat (bangHasan)
*   **Email:** banghasan@gmail.com
*   **Website:** [banghasan.com](https://banghasan.com)
*   **Grup Diskusi Telegram:** [@botindonesia](https://t.me/botindonesia)

## Desain Cover Buku (Representasi Teks)

```markdown
======================================================================
[HEADER - Warna Cyan Blue]
  Membangun Bot Telegram
  dengan Bun dan GramIO
[SUBTITLE - Warna Putih]
  Panduan (Semoga) Lengkap dari Pemula hingga Lanjutan
======================================================================

[VISUAL ELEMENT - Ilustrasi Abstrak Bun (Petir), Telegram (Pesawat Kertas), dan Kode (Sirkuit)]

[FOOTER - Warna Electric Green]
  Penulis: bangHasan
  Desember 2025
  
  Email: banghasan@gmail.com
  Web: https://banghasan.com
  Diskusi: @botindonesia (Telegram)
======================================================================
```

---

## Pengantar

Selamat datang di panduan komprehensif yang akan membawa Anda dari nol hingga lanjutan dalam membangun bot Telegram yang modern dan berkinerja tinggi. Kita akan memanfaatkan dua teknologi mutakhir: **Bun**, runtime JavaScript yang terkenal dengan kecepatannya, dan **GramIO**, framework Telegram Bot API yang dirancang untuk *type-safety* dan skalabilitas.

Buku ini bukan hanya panduan teknis; ini adalah peta jalan untuk menguasai ekosistem pengembangan bot yang efisien. Kami akan membahas setiap detail, mulai dari arsitektur internal Bun hingga strategi deployment bot siap produksi.

> 💡 **Kutipan Motivasi:** "Perjalanan seribu mil dimulai dengan satu langkah. Langkah pertama Anda adalah menguasai alat yang tepat." - bangHasan

---

## Bagian I: Memulai dengan Bun (The Modern JavaScript Runtime)

### Bab 1: Pengantar Bun: Arsitektur dan Filosofi

#### 1.1. Apa itu Bun? (Definisi, Visi, dan Tujuan)

**Bun** adalah runtime JavaScript, TypeScript, dan JSX yang serba ada (*all-in-one*) yang dirancang untuk kecepatan dan efisiensi. Bun bukan sekadar alternatif Node.js; ia adalah re-imajinasi dari seluruh *toolchain* pengembangan JavaScript.

Bun menggabungkan empat alat utama menjadi satu eksekusi tunggal:
1.  **Runtime:** Menjalankan kode JavaScript/TypeScript.
2.  **Package Manager:** Mengelola dependensi (`bun install`).
3.  **Bundler & Transpiler:** Mengemas dan mengubah kode untuk produksi (`bun build`).
4.  **Test Runner:** Menjalankan pengujian unit dan integrasi (`bun test`).

Visi Bun adalah untuk menghilangkan kompleksitas konfigurasi dan mempercepat setiap aspek alur kerja pengembang, dari instalasi paket hingga eksekusi kode.

> 💡 **Kutipan Motivasi:** "Kecepatan adalah raja. Dalam dunia bot, Bun adalah mahkotanya." - bangHasan

#### 1.2. Mengapa Bun? (Kecepatan, All-in-One Toolkit, JavaScriptCore) ⚡️

Keunggulan Bun terletak pada arsitektur internalnya yang unik:

##### 1.2.1. Mesin JavaScriptCore dan Bahasa Zig

Bun tidak menggunakan mesin V8 (seperti Node.js dan Chrome), melainkan menggunakan **JavaScriptCore (JSC)**, mesin yang dikembangkan oleh Apple untuk Safari. JSC dikenal memiliki waktu *startup* yang sangat cepat dan konsumsi memori yang lebih rendah.

Lebih lanjut, Bun ditulis dalam bahasa pemrograman tingkat rendah **Zig**, bukan C++ seperti Node.js. Zig memungkinkan kontrol memori yang sangat presisi dan menghasilkan *binary* yang sangat efisien, yang berkontribusi pada performa Bun yang superior.

##### 1.2.2. All-in-One Toolkit: Menyederhanakan Toolchain

Bun secara fundamental menyederhanakan *toolchain* JavaScript. Anda tidak lagi memerlukan kombinasi `npm`, `webpack`, `babel`, dan `jest`. Semua fungsi ini sudah *built-in* dan dioptimalkan untuk bekerja sama.

| Fitur Bun | Manfaat bagi Pengembang Bot |
| :--- | :--- |
| **Package Manager Cepat** | Instalasi dependensi yang hampir instan, mengurangi waktu *setup* proyek. |
| **Dukungan TypeScript Native** | Menjalankan file `.ts` tanpa *transpiler* terpisah, ideal untuk *type-safety* GramIO. |
| **Bundler Bawaan** | Mengemas kode bot untuk deployment dengan mudah dan cepat. |
| **API yang Dioptimalkan** | Menyediakan API I/O yang sangat cepat (misalnya `bun:file`, `bun:sqlite`). |

#### 1.3. Perbandingan Bun vs. Node.js: Analisis Mendalam

Meskipun Bun kompatibel dengan API Node.js, penting untuk memahami perbedaan mendasar yang memengaruhi performa bot Anda.

| Fitur | Bun | Node.js | Dampak pada Bot Telegram |
| :--- | :--- | :--- | :--- |
| **Mesin JavaScript** | JavaScriptCore (JSC) | V8 | JSC lebih cepat dalam *startup* dan I/O, menghasilkan respons bot yang lebih cepat. |
| **Bahasa Inti** | Zig | C++ | Zig memungkinkan Bun memiliki *binary* yang lebih kecil dan manajemen memori yang lebih efisien. |
| **Package Manager** | `bun install` (Sangat Cepat) | `npm`, `yarn` (Relatif Lambat) | Waktu *deployment* dan *setup* yang jauh lebih singkat. |
| **Dukungan TypeScript** | Native (Zero-Config) | Membutuhkan `ts-node` atau `tsc` | Mengurangi kompleksitas *toolchain* dan mempercepat siklus pengembangan. |
| **I/O API** | `bun:file`, `bun:serve` (Dioptimalkan) | `fs`, `http` (Standar) | Operasi file dan jaringan yang lebih cepat, penting untuk bot yang menangani banyak media atau data. |

### Bab 2: Instalasi dan Menguasai Tooling Bun

#### 2.1. Cara Instalasi Bun (Linux/macOS/WSL) 🛠️

Bun dirancang untuk sistem operasi berbasis Unix. Untuk menginstal Bun, Anda dapat menggunakan *shell script* resmi.

**Langkah 1: Jalankan Instalasi**

Buka terminal Anda dan jalankan perintah berikut:

```bash
curl -fsSL https://bun.sh/install | bash
```

**Langkah 2: Verifikasi Instalasi**

Setelah instalasi selesai, pastikan Bun telah ditambahkan ke `$PATH` Anda (Anda mungkin perlu me-restart terminal atau menjalankan `source ~/.bashrc`).

```bash
bun --version
```

Jika Anda melihat nomor versi, instalasi berhasil.

#### 2.2. Menguasai Package Manager: `bun install`

`bun install` adalah salah satu fitur Bun yang paling revolusioner. Ia dapat menginstal paket hingga 20x lebih cepat daripada `npm` atau `yarn`.

**Fitur Utama `bun install`:**
*   **Instalasi Cepat:** Menggunakan *native code* dan *caching* yang agresif.
*   **Kompatibilitas Node.js:** Mampu membaca dan menulis file `package.json` dan `node_modules` standar.
*   **Lockfile Tunggal:** Menggunakan `bun.lockb` yang merupakan *binary lockfile* yang sangat cepat.

| Perintah | Deskripsi |
| :--- | :--- |
| `bun install` | Menginstal semua dependensi dari `package.json`. |
| `bun add <package>` | Menginstal paket baru dan menyimpannya sebagai `dependencies`. |
| `bun add -d <package>` | Menginstal paket sebagai `devDependencies`. |
| `bun remove <package>` | Menghapus paket dari proyek. |

#### 2.3. Menguasai Runtime: `bun run`

Perintah `bun run` digunakan untuk menjalankan file JavaScript/TypeScript atau *script* yang didefinisikan di `package.json`.

**Menjalankan File:**

```bash
# Menjalankan file TypeScript tanpa konfigurasi tambahan
bun run src/bot.ts 
```

**Menjalankan Script dari `package.json`:**

Jika Anda memiliki `package.json` seperti ini:
```json
{
  "scripts": {
    "start": "bun run src/bot.ts",
    "dev": "bun --watch src/bot.ts"
  }
}
```
Anda dapat menjalankannya dengan:
```bash
bun start
bun dev # Menggunakan fitur hot-reloading bawaan Bun
```

#### 2.4. Menguasai Bundler: `bun build`

Untuk deployment, Anda perlu mengemas kode Anda menjadi satu file JavaScript yang dioptimalkan.

```bash
bun build ./src/bot.ts --outdir ./dist --target node
```
Perintah ini akan:
1.  Mengambil `src/bot.ts` sebagai *entry point*.
2.  Mengemas semua dependensi menjadi satu file.
3.  Menyimpannya di direktori `./dist`.
4.  Menargetkan lingkungan Node.js (untuk kompatibilitas *hosting* yang lebih luas).

### Bab 3: Dasar-dasar Pemrograman dengan Bun API

#### 3.1. Membuat Proyek Bot Awal

Kita akan memulai proyek bot kita dengan struktur yang bersih.

```bash
mkdir telegram-bot-gramio
cd telegram-bot-gramio
bun init -y
bun add gramio @gramio/session node-cron @types/node-cron bun-types
```

**Catatan:** Kita menambahkan `bun-types` untuk *autocomplete* yang lebih baik di editor kode Anda.

#### 3.2. Menggunakan `bun:file` untuk Operasi I/O Cepat

Bun menyediakan API I/O yang dioptimalkan. Mari kita lihat bagaimana Bun menangani operasi file secara asinkron.

```typescript
import { file } from "bun";

const filePath = "data/log.txt";

// Menulis data ke file
async function writeLog(message: string) {
  const content = `${new Date().toISOString()} - ${message}\n`;
  // Bun.write adalah cara yang sangat cepat untuk menulis file
  await Bun.write(filePath, content, { append: true });
}

// Membaca data dari file
async function readLog() {
  try {
    const logFile = file(filePath);
    const content = await logFile.text();
    console.log("Isi Log:\n", content);
  } catch (error) {
    console.error("File log belum ada.");
  }
}

writeLog("Aplikasi dimulai.");
readLog();
```

#### 3.3. Menggunakan `bun:serve` untuk Webhook (Lanjutan)

Meskipun kita akan fokus pada Long Polling, penting untuk mengetahui bahwa Bun memiliki server HTTP bawaan yang sangat cepat, ideal untuk *webhook* Telegram.

```typescript
// Contoh sederhana server webhook
Bun.serve({
  port: 3000,
  fetch(req: Request) {
    const url = new URL(req.url);
    if (req.method === "POST" && url.pathname === "/webhook") {
      // Di sini Anda akan memproses update Telegram
      return new Response("OK", { status: 200 });
    }
    return new Response("Not Found", { status: 404 });
  },
});
```

Ini mengakhiri Bagian I. Kita telah meletakkan dasar yang kuat dengan memahami dan menguasai Bun sebagai *toolchain* utama kita.

---

---

## Bagian II: Pengenalan GramIO dan Bot Telegram

### Bab 4: Memahami Ekosistem Bot Telegram

#### 4.1. Apa itu Bot Telegram? (Konsep Dasar) ✈️

Bot Telegram adalah akun otomatis yang berinteraksi dengan pengguna melalui API Telegram. Bot ini adalah program yang berjalan di server Anda, bukan di Telegram.

##### 4.1.1. Perbedaan Bot dan Akun Pengguna Biasa

| Fitur | Bot | Akun Pengguna Biasa |
| :--- | :--- | :--- |
| **Pendaftaran** | Melalui BotFather, tidak perlu nomor telepon. | Membutuhkan nomor telepon yang valid. |
| **Interaksi** | Hanya dapat memulai percakapan jika pengguna mengirim pesan pertama atau menambahkannya ke grup. | Dapat memulai percakapan kapan saja. |
| **Status Online** | Tidak memiliki status "Last Seen" atau "Online". | Memiliki status "Last Seen" atau "Online". |
| **API** | Menggunakan **Bot API** (HTTP/Webhook). | Menggunakan **Telegram API** (MTProto) untuk aplikasi klien. |

#### 4.2. Mendapatkan Token Bot dari BotFather: Kunci Rahasia Anda

Token API adalah string unik yang berfungsi sebagai kata sandi bot Anda. Token ini digunakan oleh GramIO untuk mengautentikasi permintaan ke server Telegram.

**Langkah-langkah Mendapatkan Token:**
1.  Cari **@BotFather** di Telegram.
2.  Ketik `/newbot`.
3.  Ikuti instruksi untuk memilih nama tampilan (misalnya, "Bot Buku Bun") dan *username* (harus diakhiri dengan `bot`, misalnya, `BotBukuBun_bot`).
4.  BotFather akan memberikan Anda Token API.

> **Peringatan Keamanan:** Token API harus diperlakukan sebagai informasi rahasia. **JANGAN PERNAH** menyimpannya langsung di kode sumber atau membagikannya di repositori publik. Selalu gunakan *Environment Variable*.

#### 4.3. Konsep Dasar Telegram Bot API: Updates, Methods, dan Types

Memahami GramIO berarti memahami cara kerja API Telegram:

1.  **Updates:** Setiap interaksi pengguna (pesan, klik tombol, pengguna bergabung) dikirimkan ke bot Anda sebagai objek `Update`. GramIO bertugas menerima dan memproses *update* ini.
2.  **Methods:** Ini adalah fungsi yang Anda panggil untuk memerintahkan bot melakukan sesuatu (misalnya, `sendMessage`, `editMessageText`). GramIO menyediakan antarmuka yang *type-safe* untuk semua *methods* ini.
3.  **Types:** Ini adalah struktur data yang digunakan oleh Telegram (misalnya, `Message`, `User`, `Chat`). GramIO, berkat TypeScript, secara otomatis menyediakan definisi tipe untuk semua objek ini.

### Bab 5: Pengantar GramIO Framework: Type-Safety dan Middleware

#### 5.1. Apa itu GramIO? (Fitur Utama, Keunggulan) ✨

**GramIO** adalah framework Telegram Bot API yang dibangun dengan fokus pada *type-safety* dan arsitektur *middleware* yang fleksibel.

##### 5.1.1. Keunggulan Type-Safety

Karena GramIO ditulis dalam TypeScript, Anda mendapatkan *autocompletion* dan pemeriksaan kesalahan tipe saat Anda menulis kode. Ini sangat mengurangi *bug* saat berinteraksi dengan struktur data Telegram yang kompleks.

##### 5.1.2. Arsitektur Middleware

GramIO mengadopsi pola desain *middleware* (mirip dengan Express.js atau Koa.js). Setiap *update* melewati serangkaian fungsi (middleware) sebelum mencapai *handler* akhir. Ini memungkinkan Anda untuk:
*   **Pre-processing:** Melakukan logging, autentikasi, atau *rate limiting*.
*   **Modifikasi Konteks:** Menambahkan data sesi atau database ke objek `Context`.
*   **Filtering:** Menghentikan pemrosesan jika *update* tidak relevan.

#### 5.2. Setup Proyek GramIO Pertama dengan Bun

Kita akan menggunakan Bun untuk menginstal GramIO dan menjalankan bot.

**Langkah 1: Instalasi Dependensi**

```bash
bun add gramio @gramio/session node-cron @types/node-cron
```

**Langkah 2: Konfigurasi Environment Variable**

Buat file `.env` di root proyek Anda. Bun akan memuatnya secara otomatis saat Anda menggunakan `bun run`.

**File: `.env`**
```
BOT_TOKEN="TOKEN_ANDA_DARI_BOTFATHER"
```

**Langkah 3: Inisialisasi Bot**

**File: `src/bot.ts`**
```typescript
import { Bot } from "gramio";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN tidak ditemukan. Pastikan Anda mengatur environment variable.");
}

// Inisialisasi Bot GramIO
const bot = new Bot({
  token: BOT_TOKEN,
  // Opsi lain: mode polling (default) atau webhook
});

// Menjalankan bot dalam mode Long Polling
bot.start();
console.log("Bot GramIO sedang berjalan di Bun...");
```

### Bab 6: Bot Pertama: Reaksi dan Respons

#### 6.1. Konsep `Context` (Ctx): Jantung Bot Anda

Objek `Context` adalah objek yang dibuat GramIO untuk setiap *update*. Ini adalah objek yang Anda gunakan untuk:
*   Mengakses data pesan (`context.text`, `context.from`, `context.chat`).
*   Memanggil *methods* API Telegram (`context.send`, `context.reply`, `context.editMessageText`).
*   Mengakses data sesi (`context.session`).

#### 6.2. Menangani Perintah (`bot.command`)

Perintah adalah pesan yang dimulai dengan `/` (misalnya, `/start`, `/help`).

```typescript
// Menangani perintah /start
bot.command("start", (context) => {
  // context.send adalah shortcut untuk bot.api.sendMessage
  return context.send("Selamat datang di Bot Bun + GramIO!");
});

// Menangani perintah dengan argumen
bot.command("echo", (context) => {
  // context.text akan berisi '/echo pesan saya'
  const message = context.text.replace("/echo", "").trim();
  if (message) {
    return context.reply(`Anda meminta saya mengulang: ${message}`);
  }
  return context.send("Gunakan: /echo [pesan]");
});
```

#### 6.3. Menangani Pesan Teks dan Filter (`bot.on` dan `bot.hears`)

*   `bot.on("text")`: Menangani semua pesan teks.
*   `bot.hears(regex)`: Menangani pesan teks yang cocok dengan ekspresi reguler.

```typescript
// Echo Bot Sederhana
bot.on("text", (context) => {
  // Pastikan bot tidak merespons perintah lain
  if (!context.text.startsWith("/")) {
    return context.reply(`Saya menerima pesan Anda: "${context.text}"`);
  }
});

// Menangani kata kunci spesifik
bot.hears(/bun/i, (context) => {
  return context.send("Bun adalah runtime JavaScript tercepat!");
});
```

---

## Bagian III: Pengembangan Bot Tingkat Menengah

### Bab 7: Menguasai Middleware dan Aliran Kontrol 🔄

#### 7.1. Struktur Middleware: `context` dan `next()`

Middleware adalah fungsi dengan tanda tangan `(context: Ctx, next: Next) => Promise<void> | void`.

*   **`context`**: Objek konteks *update* saat ini.
*   **`next()`**: Fungsi yang harus dipanggil untuk meneruskan kontrol ke middleware berikutnya atau *handler* akhir.

#### 7.2. Contoh Middleware: Autentikasi Admin

Middleware ini memastikan hanya pengguna dengan ID tertentu yang dapat mengakses *handler* berikutnya.

```typescript
const ADMIN_ID = 123456789; // ID Admin Anda

const adminOnlyMiddleware = (context: any, next: any) => {
  if (context.from?.id === ADMIN_ID) {
    // Lanjutkan ke handler berikutnya
    return next();
  } else {
    // Hentikan pemrosesan dan kirim pesan penolakan
    return context.send("Akses ditolak. Perintah ini hanya untuk admin.");
  }
};

// Menerapkan middleware hanya pada perintah /secret
bot.command("secret", adminOnlyMiddleware, (context) => {
  context.send("Selamat datang di ruang rahasia admin!");
});
```

#### 7.3. Aliran Kontrol Lanjutan: `bot.use` dan `bot.filter`

*   **`bot.use(middleware)`**: Menerapkan middleware secara global untuk SEMUA *update*.
*   **`bot.filter(filterFunction)`**: Menerapkan *handler* hanya jika fungsi filter mengembalikan `true`.

```typescript
// Contoh: Hanya memproses pesan dari grup, bukan dari chat pribadi
bot.filter((context) => context.chat.type === "group" || context.chat.type === "supergroup", (context) => {
    context.send("Terima kasih telah menggunakan bot ini di grup!");
});
```

### Bab 8: Interaksi Kaya: Media dan Callback Queries

#### 8.1. Menangani Media dengan Filter Spesifik

GramIO menyediakan objek `Filter` untuk menangani berbagai jenis media dengan mudah.

```typescript
import { Filter } from "gramio";

// Menangani foto
bot.on(Filter.photo, (context) => {
  const photo = context.photo.pop(); // Ambil resolusi tertinggi
  context.reply(`Foto diterima! File ID: ${photo?.file_id}`);
});

// Menangani video
bot.on(Filter.video, (context) => {
  context.reply(`Video diterima! Judul: ${context.video?.file_name}`);
});

// Menangani pesan yang berisi stiker
bot.on(Filter.sticker, (context) => {
  context.reply("Stiker lucu! Saya akan membalas dengan stiker yang sama.");
  context.sendSticker({ sticker: context.sticker.file_id });
});
```

#### 8.2. Menggunakan Inline Keyboard: Interaksi Non-Intrusif

Inline Keyboard adalah tombol yang melekat pada pesan dan tidak memenuhi layar pengguna.

```typescript
import { InlineKeyboard } from "gramio";

bot.command("poll", (context) => {
  const pollKeyboard = new InlineKeyboard()
    .text("Pilihan A", "vote_A")
    .text("Pilihan B", "vote_B")
    .row() // Baris baru
    .url("Lihat Hasil", "https://example.com/results");

  context.send("Pilih opsi favorit Anda:", {
    reply_markup: pollKeyboard,
  });
});

// Menangani Callback Query
bot.callbackQuery("vote_A", (context) => {
  // Mengirim notifikasi pop-up ke pengguna
  context.answerCallbackQuery({ text: "Anda memilih Pilihan A. Terima kasih!" });
  
  // Mengedit pesan asli untuk menunjukkan bahwa pengguna telah memilih
  context.editMessageText(`Pilihan A telah dipilih oleh ${context.from.first_name}.`);
});
```

### Bab 9: Keyboard Kustom dan Pengelolaan Pesan

#### 9.1. Reply Keyboard: Menu Utama yang Nyaman

Reply Keyboard menggantikan keyboard standar Telegram dan ideal untuk menu utama.

```typescript
import { Keyboard } from "gramio";

bot.command("menu", (context) => {
  const menuKeyboard = new Keyboard()
    .text("Mulai Pendaftaran")
    .text("Cek Saldo DB")
    .row()
    .text("Bantuan")
    .text("Inline Menu")
    .oneTime(); // Keyboard akan hilang setelah digunakan

  context.send("Pilih aksi Anda:", {
    reply_markup: menuKeyboard,
  });
});
```

#### 9.2. Mengedit dan Menghapus Pesan

Bot dapat mengedit pesan yang dikirimnya sendiri, yang penting untuk *stateful* UI (misalnya, menu navigasi).

```typescript
bot.callbackQuery("navigate_to_help", (context) => {
  // Mengedit teks pesan yang berisi keyboard inline
  context.editMessageText("Ini adalah halaman Bantuan. Pilih menu lain di bawah:", {
    reply_markup: new InlineKeyboard().text("Kembali ke Menu Utama", "main_menu"),
  });
  context.answerCallbackQuery(); // Selalu jawab callback query
});
```

---

---

## Bagian IV: Pengembangan Bot Tingkat Lanjut dan Produksi

### Bab 10: State Management dan Persistent Storage 💾

#### 10.1. Konsep Sesi (Session) dalam GramIO: Mengingat Pengguna

Sesi adalah mekanisme untuk menyimpan data spesifik pengguna di antara interaksi. Tanpa sesi, bot Anda akan "lupa" apa yang terjadi di langkah sebelumnya.

##### 10.1.1. Session Middleware dan Tipe Data

GramIO menggunakan plugin `@gramio/session` untuk mengelola sesi. Anda harus mendefinisikan tipe data sesi Anda (jika menggunakan TypeScript) dan memilih *storage* yang sesuai.

```typescript
import { session, MemorySessionStorage } from "@gramio/session";

// 1. Definisikan Tipe Data Sesi
interface SessionData {
  step: "idle" | "waiting_for_name" | "waiting_for_age";
  name?: string;
  cart: string[]; // Contoh: Keranjang belanja
}

// 2. Terapkan Middleware
bot.use(
  session<SessionData>({
    // MemorySessionStorage hanya untuk pengembangan. Data akan hilang saat bot restart.
    storage: new MemorySessionStorage(), 
    initial: () => ({ step: "idle", cart: [] }), // Nilai awal
  })
);

// 3. Gunakan di Handler
bot.command("add_to_cart", (context) => {
    context.session.cart.push("Item Baru");
    context.send(`Item ditambahkan. Total item di keranjang: ${context.session.cart.length}`);
});
```

#### 10.2. Integrasi Database dengan `bun:sqlite`: Penyimpanan Lokal yang Cepat 🗄️

Untuk bot yang berjalan dalam mode Long Polling dan membutuhkan penyimpanan data lokal yang cepat dan persisten, `bun:sqlite` adalah pilihan yang sangat baik. Bun menyediakan API yang sangat cepat untuk berinteraksi dengan database SQLite.

##### 10.2.1. Setup dan Operasi Dasar SQLite

```typescript
import { Database } from "bun:sqlite";

// Buka atau buat database file. File 'bot_data.sqlite' akan dibuat.
const db = new Database("bot_data.sqlite"); 

// Membuat tabel jika belum ada
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    balance REAL DEFAULT 0.0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Fungsi untuk menyimpan atau memperbarui saldo pengguna
function saveUserBalance(userId: number, username: string, balance: number) {
  // Menggunakan prepared statement untuk keamanan dan performa
  const query = db.query(`
    INSERT INTO users (id, username, balance) 
    VALUES (?, ?, ?) 
    ON CONFLICT(id) DO UPDATE SET 
      username=excluded.username, 
      balance=excluded.balance
  `);
  query.run(userId, username, balance);
}

// Fungsi untuk mendapatkan saldo
function getUserBalance(userId: number): number {
  const query = db.query("SELECT balance FROM users WHERE id = ?");
  const result = query.get(userId) as { balance: number } | null;
  return result ? result.balance : 0;
}
```

##### 10.2.2. Mengintegrasikan SQLite ke Bot

```typescript
// Handler untuk mengecek saldo
bot.hears("Cek Saldo DB", (context) => {
    const balance = getUserBalance(context.from.id);
    context.send(`Saldo Anda saat ini: Rp ${balance.toLocaleString('id-ID')}`);
});

// Contoh: Setelah pendaftaran selesai
// ...
// saveUserBalance(context.from.id, context.from.username || context.from.first_name, 100); 
// ...
```

### Bab 11: Bot Terjadwal (Cron/Scheduler): Menjadi Proaktif ⏰

Bot terjadwal memungkinkan bot Anda untuk melakukan tugas tanpa dipicu oleh pesan pengguna.

> 💡 **Kutipan Motivasi:** "Jangan biarkan bot Anda tidur. Jadwalkan kesuksesan, dan biarkan kode Anda bekerja saat Anda beristirahat." - bangHasan

#### 11.1. Memahami Ekspresi Cron

Ekspresi Cron adalah string yang mendefinisikan kapan tugas harus dijalankan. Format yang umum digunakan adalah 5 atau 6 bidang:

| Posisi | Deskripsi | Nilai yang Diizinkan | Contoh |
| :--- | :--- | :--- | :--- |
| 1 | Menit | 0-59 | `30` (Menit ke-30) |
| 2 | Jam | 0-23 | `10` (Pukul 10 pagi) |
| 3 | Hari dalam Bulan | 1-31 | `*` (Setiap hari) |
| 4 | Bulan | 1-12 | `*` (Setiap bulan) |
| 5 | Hari dalam Minggu | 0-7 (0 atau 7 = Minggu) | `1-5` (Senin sampai Jumat) |

| Ekspresi Cron | Artinya |
| :--- | :--- |
| `* * * * *` | Setiap menit. |
| `0 9 * * *` | Setiap hari pada pukul 9:00 pagi. |
| `0 18 * * 1-5` | Setiap hari kerja pada pukul 6:00 sore. |

#### 11.2. Implementasi Cron Job dengan `node-cron`

Meskipun Bun tidak memiliki *scheduler* bawaan, library `node-cron` bekerja dengan sangat baik di Bun.

**Langkah 1: Instalasi**
```bash
bun add node-cron @types/node-cron
```

**Langkah 2: Membuat Tugas Terjadwal**

```typescript
import * as cron from 'node-cron';

// Fungsi untuk mengirim pesan ke semua pengguna (simulasi)
async function sendMassNotification(botInstance: Bot) {
    console.log('Memulai pengiriman notifikasi massal...');
    
    // Ambil semua ID pengguna dari database (simulasi)
    const userIds = [123456789, 987654321]; // Ganti dengan hasil query DB

    for (const userId of userIds) {
        try {
            await botInstance.api.sendMessage({
                chat_id: userId,
                text: "📢 Notifikasi Harian: Bot Anda aktif dan siap melayani!",
            });
            console.log(`Notifikasi terkirim ke user ${userId}`);
        } catch (error) {
            console.error(`Gagal mengirim ke user ${userId}:`, error);
        }
    }
}

// Jadwal: Setiap hari pada pukul 10:00 pagi
cron.schedule('0 10 * * *', () => {
  // Pastikan bot sudah terinisialisasi sebelum memanggil API
  if (bot.api) {
      sendMassNotification(bot);
  }
}, {
    // Tentukan zona waktu agar jadwal akurat
    timezone: "Asia/Jakarta" 
});

console.log("Cron job terjadwal: Notifikasi harian pada 10:00 AM (Asia/Jakarta).");
```

### Bab 12: Deployment dan Produksi: Menjadikan Bot Anda Hidup ☁️

Deployment adalah langkah krusial untuk memastikan bot Anda berjalan 24/7 dan dapat diakses oleh pengguna.

> 💡 **Kutipan Motivasi:** "Kode yang hebat tanpa deployment yang andal hanyalah puisi. Jadikan puisi Anda nyata di cloud." - bangHasan

#### 12.1. Persiapan Produksi dengan Bun

Sebelum *deployment*, pastikan Anda:
1.  Menggunakan `bun build` untuk mengoptimalkan kode (lihat Bab 2.4).
2.  Mengatur *Environment Variable* (`BOT_TOKEN`) dengan benar.
3.  Menggunakan penyimpanan sesi yang persisten (misalnya Redis atau database, bukan `MemorySessionStorage`).

#### 12.2. Strategi Deployment: Memilih yang Tepat

| Platform | Metode Bot | Kelebihan | Kekurangan | Cocok untuk |
| :--- | :--- | :--- | :--- | :--- |
| **VPS/VM** | Long Polling / Webhook | Kontrol penuh, dapat menggunakan `bun:sqlite` secara lokal. | Membutuhkan manajemen OS (Linux), perlu *process manager* (PM2). | Bot dengan kebutuhan I/O tinggi atau database lokal. |
| **Railway** | Long Polling | Sangat mudah, integrasi Git, *zero-config* untuk Bun. | Biaya bisa meningkat seiring penggunaan, tidak ideal untuk Webhook. | Bot Long Polling skala kecil hingga menengah. |
| **Docker** | Long Polling / Webhook | Portabilitas tinggi, lingkungan terisolasi. | Membutuhkan pemahaman Docker, file `bun.lockb` harus disertakan. | Bot skala besar, arsitektur *microservices*. |
| **Vercel/Serverless** | Webhook | Skala otomatis, bayar sesuai penggunaan. | Tidak mendukung Long Polling, tidak dapat menggunakan `bun:sqlite` (karena *stateless*). | Bot yang hanya menggunakan Webhook dan database eksternal. |

#### 12.3. Deployment dengan PM2 di VPS

PM2 adalah *process manager* yang populer untuk aplikasi Node.js/Bun. Ia memastikan bot Anda tetap berjalan dan otomatis *restart* jika terjadi *crash*.

**Langkah-langkah di VPS:**
1.  Instal PM2 secara global: `npm install -g pm2` (atau `bun add -g pm2`).
2.  Jalankan bot Anda:
    ```bash
    pm2 start --name "telegram-bot-bun" bun -- run src/bot.ts
    ```
3.  Simpan konfigurasi agar otomatis *restart* saat server *reboot*: `pm2 save`.

#### 12.4. Deployment dengan Docker

Menggunakan Docker adalah cara terbaik untuk memastikan lingkungan produksi Anda sama dengan lingkungan pengembangan.

**File: `Dockerfile`**
```dockerfile
# Tahap 1: Build
FROM oven/bun:latest AS builder

WORKDIR /app

# Salin file yang diperlukan untuk instalasi
COPY package.json bun.lockb ./

# Instal dependensi
RUN bun install --frozen-lockfile

# Salin kode sumber
COPY . .

# Tahap 2: Final
FROM oven/bun:latest

WORKDIR /app

# Salin hasil instalasi dan kode dari tahap builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bot_data.sqlite ./bot_data.sqlite # Jika menggunakan SQLite

# Perintah untuk menjalankan bot
CMD ["bun", "run", "src/bot.ts"]
```

**Membangun dan Menjalankan:**
```bash
docker build -t my-bun-bot .
docker run -d --name bun-bot-prod -e BOT_TOKEN="YOUR_TOKEN" my-bun-bot
```

---

## Penutup

Selamat! Anda telah menyelesaikan panduan komprehensif ini. Anda kini tidak hanya menguasai dasar-dasar bot Telegram, tetapi juga telah memahami bagaimana memanfaatkan kecepatan Bun, struktur GramIO, dan teknik-teknik tingkat lanjut seperti manajemen sesi, database SQLite, penjadwalan Cron, dan strategi deployment modern.

Kombinasi Bun dan GramIO menempatkan Anda di garis depan pengembangan bot yang cepat, andal, dan *type-safe*.

> 💡 **Kutipan Motivasi:** "Belajar adalah proses tanpa akhir. Teruslah bereksperimen, teruslah membangun, dan biarkan bot Anda menjadi karya terbaik Anda." - bangHasan

---

## Lampiran

### A. Referensi Cepat Perintah Bun

| Perintah | Deskripsi |
| :--- | :--- |
| `bun install` | Menginstal dependensi dari `package.json`. |
| `bun add <package>` | Menambahkan paket baru. |
| `bun run <file>` | Menjalankan file JavaScript/TypeScript. |
| `bun start` | Menjalankan *script* `start` di `package.json`. |
| `bun build <file> --outdir ./dist` | Mem-bundle kode untuk produksi. |

### B. Referensi Cepat GramIO API

| Fitur | Metode GramIO | Deskripsi |
| :--- | :--- | :--- |
| **Inisialisasi** | `new Bot({ token: ... })` | Membuat instance bot. |
| **Mulai** | `bot.start()` | Memulai Long Polling. |
| **Middleware** | `bot.use(middleware)` | Menerapkan middleware global. |
| **Handler** | `bot.on("text", ...)` | Menangani *update* berdasarkan tipe. |
| **Perintah** | `bot.command("start", ...)` | Menangani perintah `/start`. |
| **Konteks** | `context.send(...)` | Mengirim pesan balasan. |
| **Keyboard** | `new InlineKeyboard()` | Membuat keyboard inline. |
| **Sesi** | `session(...)` | Middleware untuk manajemen state. |

### C. Kode Sumber Lengkap (src/bot.ts)

```typescript
import { Bot, Filter, InlineKeyboard, Keyboard } from "gramio";
import { session, MemorySessionStorage } from "@gramio/session";
import { Database } from "bun:sqlite";
import * as cron from 'node-cron'; 

// --- Konfigurasi ---
const BOT_TOKEN = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE"; 
const ADMIN_ID = 123456789; // Ganti dengan ID Telegram Admin Anda

if (BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
  console.warn("PERINGATAN: Menggunakan token placeholder. Bot tidak akan terhubung ke Telegram.");
}

// --- Inisialisasi Bot ---
const bot = new Bot({ token: BOT_TOKEN });

// --- Konfigurasi Database Sederhana (bun:sqlite) ---
const db = new Database("bot_data.sqlite"); 
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, balance REAL DEFAULT 0.0)");

function saveUserBalance(userId: number, username: string, balance: number) {
  const query = db.query(`
    INSERT INTO users (id, username, balance) 
    VALUES (?, ?, ?) 
    ON CONFLICT(id) DO UPDATE SET 
      username=excluded.username, 
      balance=excluded.balance
  `);
  query.run(userId, username, balance);
}

function getUserBalance(userId: number): number {
  const query = db.query("SELECT balance FROM users WHERE id = ?");
  const result = query.get(userId) as { balance: number } | null;
  return result ? result.balance : 0;
}

// --- Middleware Logging ---
const loggingMiddleware = (context: any, next: any) => {
  const user = context.from?.username || context.from?.first_name || "Unknown User";
  console.log(`[LOG] Pesan dari @${user}: ${context.text || '[Non-text message]'}`);
  return next();
};

bot.use(loggingMiddleware);

// --- Middleware Sesi ---
interface SessionData {
  step: "idle" | "waiting_for_name" | "waiting_for_age";
  name?: string;
}

bot.use(
  session<SessionData>({
    storage: new MemorySessionStorage(),
    initial: () => ({ step: "idle" }),
  })
);

// --- Handler Perintah Dasar ---
bot.command("start", (context) => {
  return context.send("Halo! Saya adalah bot GramIO yang berjalan di Bun. Ketik /menu untuk melihat opsi.");
});

// --- Handler Perintah Admin ---
const adminOnlyMiddleware = (context: any, next: any) => {
  const ADMIN_ID = 123456789; // Ganti dengan ID Admin Anda
  if (context.from?.id === ADMIN_ID) {
    return next();
  } else {
    return context.send("Akses ditolak. Perintah ini hanya untuk admin.");
  }
};

bot.command("admin", adminOnlyMiddleware, (context) => {
  context.send("Selamat datang, Admin!");
});

// --- Handler Keyboard Kustom ---
bot.command("menu", (context) => {
  const menuKeyboard = new Keyboard()
    .text("Mulai Pendaftaran")
    .text("Inline Menu")
    .row()
    .text("Cek Saldo DB");

  context.send("Pilih salah satu opsi di bawah:", {
    reply_markup: menuKeyboard,
  });
});

// --- Handler Database ---
bot.hears("Cek Saldo DB", (context) => {
    const balance = getUserBalance(context.from.id);
    context.send(`Saldo Anda saat ini: Rp ${balance.toLocaleString('id-ID')}`);
});

// --- Handler Keyboard Inline ---
bot.hears("Inline Menu", (context) => {
  const inlineKeyboard = new InlineKeyboard()
    .text("Beli Sekarang", "buy_item")
    .url("Kunjungi GramIO", "https://gramio.dev")
    .row()
    .text("Tutup Menu", "close_message");

  context.send("Ini adalah tombol inline:", {
    reply_markup: inlineKeyboard,
  });
});

// --- Handler Callback Query ---
bot.callbackQuery("buy_item", (context) => {
  context.answerCallbackQuery({ text: "Item berhasil dibeli! (Simulasi)" });
  context.editMessageText("Terima kasih atas pembelian Anda! (Pesan telah diedit)");
});

bot.callbackQuery("close_message", (context) => {
  context.editMessageReplyMarkup({ reply_markup: undefined });
  context.answerCallbackQuery({ text: "Menu ditutup." });
});

// --- Handler Sesi Pendaftaran ---
bot.hears("Mulai Pendaftaran", (context) => {
  context.session.step = "waiting_for_name";
  context.send("Selamat datang! Siapa nama Anda?");
});

bot.on("text", (context) => {
  if (context.session.step === "waiting_for_name") {
    context.session.name = context.text;
    context.session.step = "waiting_for_age";
    context.send(`Halo, ${context.session.name}! Berapa usia Anda?`);
  } else if (context.session.step === "waiting_for_age") {
    const age = parseInt(context.text);
    if (isNaN(age)) {
      return context.send("Mohon masukkan usia dalam angka.");
    }
    // Simpan ke DB
    saveUserBalance(context.from.id, context.from.username || context.from.first_name, 100); 
    
    context.session.step = "idle";
    context.send(`Terima kasih, ${context.session.name}, usia Anda ${age} tahun. Pendaftaran selesai! Saldo awal Anda 100.`);
  } else if (context.session.step === "idle") {
    // Echo Bot
    const originalText = context.text;
    return context.send(`Anda berkata: "${originalText}"`);
  }
});

// --- Handler Inline Query ---
bot.on("inline_query", async (context) => {
  const query = context.inlineQuery.query;
  
  const results = [
    {
      type: "article",
      id: "1",
      title: `Echo Inline: ${query}`,
      input_message_content: {
        message_text: `Hasil Inline Query: ${query}`,
      },
    },
  ];

  await context.answerInlineQuery(results, {
    cache_time: 0,
  });
});

// --- Bot Terjadwal (Cron Job) ---
// Jadwal: Setiap hari pada pukul 10:00 pagi (Asia/Jakarta)
cron.schedule('0 10 * * *', async () => {
    const TEST_CHAT_ID = 123456789; // Ganti dengan ID chat yang valid
    console.log('Menjalankan tugas cron: Notifikasi harian.');
    
    // Contoh: Mengirim notifikasi ke TEST_CHAT_ID
    // await bot.api.sendMessage({
    //     chat_id: TEST_CHAT_ID,
    //     text: "📢 Notifikasi Harian: Bot Anda aktif dan siap melayani!",
    // });
}, {
    timezone: "Asia/Jakarta" 
});


// --- Mulai Bot ---
bot.start();
console.log("Bot GramIO sedang berjalan di Bun...");
console.log("Untuk menguji, ganti BOT_TOKEN di src/bot.ts dengan token Anda.");
```
