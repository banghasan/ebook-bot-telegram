// giscus.js

// 1. FUNGSI DETEKSI TEMA MD BOOK (TIDAK BERUBAH)
function getThemeName() {
  const htmlClass = document.documentElement.className;

  if (htmlClass.includes("ayu")) {
    return "dark_dimmed";
  }

  if (htmlClass.includes("rust")) {
    return "fro"; // Tema Giscus untuk Rust
  }

  if (
    htmlClass.includes("navy") ||
    htmlClass.includes("coal") ||
    htmlClass.includes("dark")
  ) {
    return "dark"; // Tema Giscus untuk gelap umum
  }

  return "light"; // Tema Giscus untuk terang umum
}

// 2. FUNGSI MENGGANTI TEMA SAAT PERGANTIAN DINAMIS (TIDAK BERUBAH)
function changeGiscusTheme() {
  const iframe = document.querySelector("iframe.giscus-frame");

  // Hapus pesan warning "Retrying..." yang mengganggu jika iframe tidak ada,
  // karena kita sudah memastikan fungsi ini hanya dipanggil pada halaman yang tidak dikecualikan.
  if (!iframe) {
    console.warn("Giscus iframe not found during theme change.");
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

// 3. FUNGSI MEMUAT GISCUS & MEMULAI OBSERVER (FUNGSI UTAMA BARU)
async function loadGiscusAndStartObserver() {
  // 1. Ambil File Exclude JSON & Cek Pengecualian
  try {
    const response = await fetch("/giscus-exclude.json");
    const config = await response.json();
    const EXCLUDED_PATHS = config.excludedPaths || [];

    const currentPath = window.location.pathname;

    if (EXCLUDED_PATHS.includes(currentPath)) {
      // JIKA DIKECUALIKAN: Hentikan semua logic (Termasuk Observer dan Fallback)
      console.log(
        `Giscus excluded on path: ${currentPath}. Theme sync skipped.`,
      );
      return;
    }
  } catch (error) {
    console.warn(
      "Giscus: Failed to load giscus-exclude.json. Proceeding without exclusions.",
    );
    // Lanjutkan jika file tidak ditemukan
  }

  // --- INISIASI GISCUS (INJEKSI DOM) ---

  const mainElement = document.querySelector("main");
  if (!mainElement) {
    console.error(
      "Main content area (<main>) not found. Cannot inject Giscus.",
    );
    return;
  }

  // Buat HR, Wrapper, dan Script
  const wrapper = document.createElement("div");
  wrapper.id = "giscus-wrapper";
  const hr = document.createElement("hr");

  // Sisipkan elemen di luar tag <main>
  mainElement.insertAdjacentElement("afterend", wrapper);
  mainElement.insertAdjacentElement("afterend", hr);

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
  wrapper.appendChild(giscusScript);

  // --- MEMULAI LOGIC SINKRONISASI TEMA (Hanya jika Giscus dimuat) ---

  const htmlElement = document.documentElement;

  // 1. Mutation Observer
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

  // 2. Fallback Pemuatan Awal (3 detik)
  setTimeout(() => {
    console.log("Applying initial theme forcefully after 3s delay.");
    // Ganti dengan changeGiscusTheme() yang sudah disederhanakan
    changeGiscusTheme();
  }, 3000);
}

// --- INI ADALAH SATU-SATUNYA LISTENER DOMContentLoaded YANG TERSISA ---
document.addEventListener("DOMContentLoaded", loadGiscusAndStartObserver);
