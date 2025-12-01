# Halaman Uji Coba

<style>
    .mdbook-version {
        position: absolute;
        right: 20px;
        top: 60px;
        background-color: var(--theme-popup-bg);
        border-radius: 8px;
        padding: 2px 5px 2px 5px;
        border: 1px solid var(--theme-popup-border);
        font-size: 0.9em;
    }
</style>

<div class="mdbook-version">
    Catatan Pojok
</div>

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

## Link Penting

- [MdBook](https://github.com/rust-lang/mdBook) ![crates.io](https://img.shields.io/crates/v/mdbook.svg) program utama
- <https://projects.localizethedocs.org/mdbook-docs-l10n/en-us/master/index.html>
- <https://github.com/rust-lang/mdBook/wiki/Third-party-plugins>

### Plugins 

Nunggu update agar support versi `0.5.x`
- [mdbook-embedify](https://github.com/MR-Addict/mdbook-embedify): `v0.2.18` ![Crates.io](https://img.shields.io/crates/v/mdbook-embedify)
- [mdbook-admonish](https://github.com/tommilligan/mdbook-admonish): `v1.20.0` [![Latest version](https://img.shields.io/crates/v/mdbook-admonish.svg)](https://crates.io/crates/mdbook-admonish)
- [mdbook-repl](https://github.com/MR-Addict/mdbook-repl)

Support, tapi tidak terpakai:
- [mdbook-pagetoc](https://github.com/slowsage/mdbook-pagetoc)

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

## LaTeX

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

Silakan ubah parameter atau tambahkan simbol lain untuk menguji dukungan LaTeX yang lebih kompleks.

## Icons

- Bisa ditemukan di <https://fontawesome.com/v6/search?ic=free-collection>

```
<i class="fa-solid fa-book"></i>
```

Hasil

- <i class="fa-solid fa-book"></i> Buku

## Alerts

Ada di [admonitions](https://rust-lang.github.io/mdBook/format/markdown.html#admonitions)

```
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
