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
