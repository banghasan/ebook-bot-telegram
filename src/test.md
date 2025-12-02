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
    Teks Pojok
</div>

![](https://blog.banghasan.com/assets/images/BOCAH/014.png)


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
