// theme/custom.js

// 1. FUNGSI DETEKSI TEMA MD BOOK (TIDAK BERUBAH)
function getThemeName() {
  const htmlClass = document.documentElement.className;

  // Pemetaan Tema Spesifik (Sesuai Permintaan)
  if (htmlClass.includes("ayu")) {
    return "dark_dimmed";
  }

  if (htmlClass.includes("rust")) {
    return "gruvbox_dark";
  }

  // Pemetaan Tema Gelap Umum (Coal, Navy, atau default dark lainnya)
  if (
    htmlClass.includes("navy") ||
    htmlClass.includes("coal") ||
    htmlClass.includes("dark")
  ) {
    return "catppuccin_macchiato";
  }

  // Default untuk Light dan tema tanpa class spesifik
  return "catppuccin_latte";
}

// 2. FUNGSI MEMUAT GISCUS SAAT PERTAMA KALI (MODIFIKASI UTAMA)
function loadGiscus() {
  // Cari lokasi penyematan: Setelah tag <main>
  const mainElement = document.querySelector("main");
  if (!mainElement) {
    console.error(
      "Main content area (<main>) not found. Cannot inject Giscus.",
    );
    return;
  }

  // --- A. Buat DIV WRAPPER (OPSIONAL TAPI DISARANKAN untuk CSS) ---
  // Meskipun Anda tidak ingin mengubah index.hbs, Anda tetap membutuhkan div wrapper
  // agar CSS kustom Anda (max-width, margin: auto) tetap berfungsi.
  const wrapper = document.createElement("div");
  wrapper.id = "giscus-wrapper";
  // Terapkan CSS kustom Anda (optional: buat HR di sini)
  const hr = document.createElement("hr");
  mainElement.insertAdjacentElement("afterend", wrapper);
  mainElement.insertAdjacentElement("afterend", hr); // Sisipkan HR setelah <main>

  // --- B. Buat Script Giscus ---
  let giscusAttributes = {
    src: "https://giscus.app/client.js",
    "data-repo": "banghasan/ebook-bot-telegram",
    "data-repo-id": "R_kgDOQfTNjg",
    "data-category": "Announcements",
    "data-category-id": "DIC_kwDOQfTNjs4CzMgm",
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
  // Masukkan script ke dalam wrapper yang baru dibuat
  wrapper.appendChild(giscusScript);
}

// 3. FUNGSI MENGGANTI TEMA SAAT PERGANTIAN DINAMIS (TIDAK BERUBAH)
function changeGiscusTheme() {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe) {
    console.warn(
      "Giscus iframe not yet available for theme change. Retrying...",
    );
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

// 4. MENDETEKSI PERUBAHAN TEMA MD BOOK MENGGUNAKAN MUTATION OBSERVER (TIDAK BERUBAH)
document.addEventListener("DOMContentLoaded", () => {
  // Muat Giscus saat DOM siap
  loadGiscus();

  const htmlElement = document.documentElement;

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        setTimeout(changeGiscusTheme, 100);
      }
    }
  });

  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Panggil changeGiscusTheme setelah loading awal selesai (Fallback terkuat)
  setTimeout(() => {
    console.log("Applying initial theme forcefully after 3s delay.");
    changeGiscusTheme();
  }, 3000);
});
