// === Настройка: замените на реальный номер в формате, например, 77271234567 (только цифры, код страны +7) ===
const WHATSAPP_PHONE = "87478349345";

function openWhatsAppMessage(text) {
  if (!WHATSAPP_PHONE || WHATSAPP_PHONE === "PHONE_NUMBER") {
    return;
  }
  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
  window.open(url, "_blank");
}

// header quick button
document.getElementById("whBtn").addEventListener("click", () => {
  openWhatsAppMessage("Здравствуйте! Хочу сделать заказ.");
});
document.getElementById("quickOrder").addEventListener("click", () => {
  openWhatsAppMessage(
    "Здравствуйте! Хочу сделать заказ. Подскажите, пожалуйста, ассортимент и время подготовки."
  );
});

// product quantity controls
function increase(btn) {
  const qtyEl = btn.parentElement.querySelector(".qty");
  qtyEl.textContent = String(Number(qtyEl.textContent) + 1);
}
function decrease(btn) {
  const qtyEl = btn.parentElement.querySelector(".qty");
  const cur = Number(qtyEl.textContent);
  if (cur > 1) qtyEl.textContent = String(cur - 1);
}

// order from product card
function orderProduct(btn) {
  // Открываем WhatsApp с тем же сообщением, что и быстрый заказ
  openWhatsAppMessage("Здравствуйте! Хочу сделать заказ.");
}

// category filter
document.querySelectorAll(".cat").forEach((el) => {
  el.addEventListener("click", () => {
    document
      .querySelectorAll(".cat")
      .forEach((c) => c.classList.remove("active"));
    el.classList.add("active");
    filterProducts(el.getAttribute("data-filter"));
  });
});
document.querySelectorAll("nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll("nav a")
      .forEach((x) => x.classList.remove("active"));
    a.classList.add("active");
    const cat = a.getAttribute("data-cat");
    document
      .querySelectorAll(".cat")
      .forEach((c) => c.classList.remove("active"));
    const el = document.querySelector(`.cat[data-filter="${cat}"]`);
    if (el) el.classList.add("active");
    filterProducts(cat);
  });
});

function filterProducts(filter) {
  const cards = document.querySelectorAll("#productGrid .card");
  cards.forEach((card) => {
    if (filter === "all" || !filter) card.style.display = "";
    else if (card.dataset.category === filter) card.style.display = "";
    else card.style.display = "none";
  });
}

// search (basic)
document.getElementById("searchBtn").addEventListener("click", () => {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  document.querySelectorAll("#productGrid .card").forEach((card) => {
    const name = (
      card.dataset.name || card.querySelector(".title").textContent
    ).toLowerCase();
    const descr = card.querySelector(".desc").textContent.toLowerCase();
    if (!q || name.includes(q) || descr.includes(q)) card.style.display = "";
    else card.style.display = "none";
  });
});

// === Theme toggle ===
(function () {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
      if (btn) btn.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      if (btn) btn.textContent = "🌙";
    }
  }

  // Инициализация из localStorage или системных настроек
  const saved = localStorage.getItem("dm_theme");
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      const theme = isDark ? "dark" : "light";
      localStorage.setItem("dm_theme", theme);
      applyTheme(theme);
    });
  }
})();
