# Halaman Uji Coba

![](https://blog.banghasan.com/assets/images/BOCAH/014.png)

Halaman ini sengaja dibuat sebagai ruang eksperimen supaya setiap fungsi dapat diuji sebelum diterapkan ke halaman lain.

## Untuk Developer

- Menguji command atau fitur baru tanpa mengganggu konten utama.
- Menuliskan snippet kode untuk mengecek syntax highlighting.
- Menyimpan catatan hasil uji coba sementara.

## Untuk Pengunjung

- Mencoba meninggalkan komentar sebagai bagian dari proses testing.
- Mengeksplorasi contoh format markdown yang disediakan di bawah.

---

## Contoh Format Markdown

### Paragraf & Penegasan
Markdown mendukung *italic*, **bold**, dan `inline code` untuk memberi penekanan pada teks.

### Daftar
1. Langkah pertama
2. Langkah kedua
3. Langkah ketiga

- Item bebas
- Item dengan **teks tebal**
- Item dengan [tautan](https://example.com)

### Blockquote
> Ini contoh blockquote untuk mencatat catatan singkat atau highlight komentar.

### Tabel
| Fitur | Status | Catatan |
| --- | --- | --- |
| Command A | ✅ | Sudah diuji |
| Command B | ⚠️ | Masih butuh verifikasi |
| Command C | ❌ | Belum berjalan sesuai ekspektasi |

### Kode
```bash
# Contoh command yang bisa dicoba developer
./serve.sh --open
```

```javascript
function cobaFitur(nama) {
  return `Halo ${nama}, fitur berhasil dijalankan!`;
}
```

### Checklist
- [ ] Tulis komentar percobaan
- [ ] Uji upload gambar di komentar
- [ ] Laporkan hasilnya di kanal dev

### Admonition (jika tema mendukung)
!!! note "Tip"
    Bagian ini bisa dipakai untuk mengingatkan developer maupun pengunjung tentang hal penting tertentu saat melakukan testing.

Silakan gunakan halaman ini sesuka hati untuk mencoba berbagai format dan memastikan semuanya berjalan baik sebelum dipublikasikan.

## MdBook Plugins

### Katex

Bagian ini membantu menguji apakah KaTeX bekerja sebagaimana mestinya. Gunakan teks di bawah untuk menyalin, memodifikasi, lalu melihat hasil render secara langsung.

Here is an inline example, $ \pi(\theta) $,

an equation,

$$ \nabla f(x) \in \mathbb{R}^n, $$

and a regular \$ symbol.

Tambahan contoh:

- Inline integral: $ \int_{0}^{1} x^2 \, dx = \frac{1}{3} $.
- Rumus kuadrat dalam block math:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

- Matriks sederhana:

$$
\mathbf{M} =
\begin{bmatrix}
1 & 0 & 0 \\\\
0 & 1 & 0 \\\\
0 & 0 & 1
\end{bmatrix}
$$

Silakan ubah parameter atau tambahkan simbol lain untuk menguji dukungan KaTeX yang lebih kompleks.

### Admonish

A custom title can be provided:

````
```admonish warning title="Data loss"
The following steps can lead to irrecoverable data corruption.
```
````

```admonish warning title="Data loss"
The following steps can lead to irrecoverable data corruption.
```


```admonish quote collapsible=true, title='A title that really <span style="color: #e70073">pops</span>'
To really <b><span style="color: #e70073">grab</span></b> your reader's attention.
```

All supported directives are listed below.

Custom directives can be added via the `custom` config option above.

`note`

```admonish note
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`abstract`, `summary`, `tldr`

```admonish abstract
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`info`, `todo`

```admonish info
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`tip`, `hint`, `important`

```admonish tip
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`success`, `check`, `done`

```admonish success
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`question`, `help`, `faq`

```admonish question
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`warning`, `caution`, `attention`

```admonish warning
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`failure`, `fail`, `missing`

```admonish failure
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`danger`, `error`

```admonish danger
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`bug`

```admonish bug
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`example`

```admonish example
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```

`quote`, `cite`

```admonish quote
Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
```
