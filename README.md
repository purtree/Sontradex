[README.md](https://github.com/user-attachments/files/27174036/README.md)
# Sontradex — Holding Page

Minimalistická holding stránka pro **sontradex.com**.  
Trilingual (CZ / DE / EN) · Newsletter → Google Sheets · GitHub & Vercel ready.

---

## Struktura souborů

```
├── index.html              ← Celý web (HTML + CSS + JS, vše inline)
├── logo.png                ← Sem vlož logo (průhledné PNG, výška ~72px)
├── vercel.json             ← Vercel konfigurace
├── google-apps-script.js   ← Kód pro Google Sheets
└── README.md
```

---

## Deploy na Vercel (doporučeno)

```
1. Nahraj tuto složku na GitHub (nový repozitář)
2. vercel.com → Add New → Import Git Repository
3. Framework Preset: Other  (static)
4. Deploy ✅
```

## Deploy na GitHub Pages

```
1. Settings → Pages
2. Source: Deploy from branch → main → / (root)
3. Save ✅
```

---

## Google Sheets — napojení newsletteru

### Krok 1 — Google Sheet
Otevři `sheets.google.com` → nový prázdný list.

### Krok 2 — Apps Script
- `Extensions` → `Apps Script`
- Nahraď celý obsah editoru kódem z `google-apps-script.js`
- Ulož (💾)

### Krok 3 — Deploy jako Web App
- `Deploy` → `New deployment`
- **Type:** Web app
- **Execute as:** Me
- **Who has access:** Anyone
- Klikni **Deploy** → zkopíruj **Web App URL**
  (vypadá jako `https://script.google.com/macros/s/XYZ.../exec`)

### Krok 4 — Vlož URL do index.html
Najdi tento řádek a nahraď placeholder:
```javascript
const GS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
// → nahraď za:
const GS_URL = 'https://script.google.com/macros/s/TVOJE-ID.../exec';
```

### Výsledek v Google Sheets
List `subscribers` se sloupci:
| Timestamp | Email | Language | Source |
Duplikáty jsou automaticky odfiltrovány.

---

## Logo

Vlož `logo.png` do kořene projektu.
- Výška: **72px** (144px @ 2× Retina)
- Formát: PNG s průhledným pozadím
- Pokud soubor chybí → zobrazí se wordmark **Sontradex** (Fraunces, weight 200)

---

## Firma

| | |
|---|---|
| **Sontradex s.r.o.** | Praha, Česká republika |
| IČO | 26486857 |
| DIČ | CZ26486857 |
| Datum vzniku | 6. 11. 2001 |

*© 2026 Sontradex s.r.o.*
