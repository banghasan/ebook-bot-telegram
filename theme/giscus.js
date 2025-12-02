// theme/custom.js

function setGiscusTheme(themeName) {
  // Cari iframe Giscus
  const iframe = document.querySelector("iframe.giscus-frame");

  // Keluar jika tidak ditemukan
  if (!iframe) {
    console.warn("Giscus iframe not found. Theme change skipped.");
    return;
  }

  // Pemetaan Tema mdBook ke Tema Giscus
  let giscusTheme;
  switch (themeName) {
    case "rust":
    case "coal":
    case "navy":
      giscusTheme = "dark"; // Tema gelap Giscus
      break;
    case "ayu":
      giscusTheme = "dark_dimmed";
      break;
    case "light":
    case "default":
    default:
      giscusTheme = "light"; // Tema terang Giscus
  }

  // Kirim postMessage tanpa retry logic yang kompleks
  iframe.contentWindow.postMessage(
    { giscus: { setTheme: giscusTheme } },
    "https://giscus.app",
  );
  console.log("Giscus theme command sent:", giscusTheme);
}

// ----------------------------------------------------
// Observer untuk mendeteksi perubahan class pada tag <html>
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.documentElement;

  // Observer harus dijalankan segera.
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const classes = htmlElement.className.split(" ");
        const currentTheme = classes.find(
          (cls) =>
            cls === "light" ||
            cls === "rust" ||
            cls === "coal" ||
            cls === "navy" ||
            cls === "ayu" ||
            cls === "default",
        );

        if (currentTheme) {
          // Jeda 50ms (sangat singkat) untuk memastikan Giscus sempat merespons postMessage
          setTimeout(() => setGiscusTheme(currentTheme), 50);
        }
      }
    }
  });

  // Mulai pengawasan pada tag <html> untuk perubahan atribut 'class'
  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Set tema awal saat dimuat. Beri jeda 3 detik agar Giscus pasti sudah selesai dimuat.
  // Ini adalah fallback terkuat untuk loading awal.
  setTimeout(() => {
    const initialTheme = localStorage.getItem("mdbook-theme") || "default";
    setGiscusTheme(initialTheme);
  }, 3000);
});
