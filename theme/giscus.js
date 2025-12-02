// theme/custom.js

function setGiscusTheme(themeName) {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe) return;

  // Peta Tema mdBook ke Tema Giscus
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

  iframe.contentWindow.postMessage(
    { giscus: { setTheme: giscusTheme } },
    "https://giscus.app",
  );
  console.log("Giscus theme updated to:", giscusTheme);
}

// ----------------------------------------------------
// Observer untuk mendeteksi perubahan class pada tag <html>
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.documentElement;

  // Pastikan Giscus iframe ada sebelum kita memulai observer
  // Beri sedikit jeda agar Giscus punya waktu untuk membuat iframe-nya
  setTimeout(() => {
    const giscusIframe = document.querySelector("iframe.giscus-frame");
    if (giscusIframe) {
      console.log("Giscus iframe ditemukan, mulai pengawasan tema.");
    } else {
      console.warn(
        "Giscus iframe belum ditemukan. Giscus mungkin tidak akan disinkronkan.",
      );
      // Anda mungkin perlu meningkatkan jeda (delay) di sini jika iframe dimuat sangat lambat
    }
  }, 1500); // Jeda 1.5 detik

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        // Ambil semua class dari tag <html>
        const classes = htmlElement.className.split(" ");
        // Filter class tema yang dikenali mdBook (e.g., light, rust, navy)
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
          setGiscusTheme(currentTheme);
        }
      }
    }
  });

  // Mulai pengawasan pada tag <html> untuk perubahan atribut 'class'
  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Panggil sekali saat dimuat untuk tema awal (jika tema bukan 'default_theme')
  const initialTheme = localStorage.getItem("mdbook-theme") || "default";
  setGiscusTheme(initialTheme);
});
