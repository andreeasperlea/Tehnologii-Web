const API_URL = "http://universities.hipolabs.com/search?country=Romania";
const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("export-btn");

let all = [];
let filtered = []; 

function setStatus(text) {
  status.textContent = text;
}

function render(data) {
  tbody.innerHTML = data.map(u => {
    const site = u.web_pages?.[0]
      ? `<a href="${u.web_pages[0]}" target="_blank">${u.web_pages[0]}</a>`
      : "";
    return `
      <tr>
        <td>${u.name || ""}</td>
        <td>${u.country || ""}</td>
        <td>${site}</td>
      </tr>
    `;
  }).join("");
}

async function loadUniversities() {
  setStatus("Se încarcă…");
  tbody.innerHTML = "";
  exportBtn.disabled = true;
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    all = data;
    filtered = all; 
    render(filtered);
    setStatus(`Încărcat (${all.length} rezultate).`);
    exportBtn.disabled = false;
  } catch {
    setStatus("Eroare la încărcare. Încearcă din nou.");
  }
}

qInput.addEventListener("input", () => {
  const q = qInput.value.trim().toLowerCase();
  filtered = q
    ? all.filter(u => (u.name || "").toLowerCase().includes(q))
    : all;
  render(filtered);
  setStatus(`Filtrate: ${filtered.length} din ${all.length}.`);
});

exportBtn.addEventListener("click", () => {
  exportCSV(filtered); 
});

loadUniversities();

function exportCSV(data) {
  if (!data.length) return alert("Nu există date de exportat.");
  const header = ["Nume", "Țară", "Website"];
  const rows = data.map(u => [
    u.name || "",
    u.country || "",
    (u.web_pages && u.web_pages[0]) || ""
  ]);

  const csvContent = [header, ...rows]
    .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "universitati_filtrate.csv";
  a.click();
  URL.revokeObjectURL(url);
}
