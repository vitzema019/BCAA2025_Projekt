# JOM – Frontend

Tato aplikace představuje frontendovou část systému pro správu zakázek a úkolů (orders & tasks). Je vytvořená v Reactu a využívá komponenty z `react-bootstrap`. Backendová API volání jsou směrována přes proxy na port `8000`.

## 📁 Struktura projektu

Projekt je rozdělen do složek dle doménových entit:

```
src/
│
├── order/               # Komponenty pro správu zakázek
│   ├── dashboard-content.jsx
│   ├── dashboard.jsx
│   ├── order-delete-dialog.jsx
│   ├── order-item-form.jsx
│   ├── order-list-provider.jsx
│   ├── order-list.jsx
│   └── pending-item.jsx
│
├── task/                # Komponenty pro správu úkolů
│   ├── dashboard-content.jsx
│   ├── dashboard.jsx
│   ├── order-task-list.jsx
│   ├── task-delete-dialog.jsx
│   ├── task-item-form.jsx
│   ├── task-list-provider.jsx
│   ├── task-list-readonly.jsx
│   └── task-list.jsx
│
├── fetch-helper.js      # Pomocné funkce pro volání backend API
├── index.js             # Vstupní bod aplikace
├── layout.jsx           # Hlavní rozložení stránky
├── navbar.jsx           # Navigační lišta
└── setupProxy.js        # Proxy pro vývojové prostředí
```

## 🚀 Spuštění projektu

### 1. Instalace závislostí

```bash
npm install
```

### 2. Spuštění vývojového serveru

```bash
npm start
```

Tímto se spustí aplikace na `http://localhost:3000/`, přičemž všechna volání na `/api/*` budou proxyfikována na backend běžící na `http://localhost:8000`.

## 🔄 Navigace

- `/` – Hlavní dashboard se seznamem zakázek
- `/taskList` – Samostatný přehled všech úkolů (readonly)

## 📦 Funkcionalita

### Zakázky (Orders)

- ✅ Vytvoření, úprava, smazání zakázky
- ✅ Zobrazení seznamu všech zakázek
- ✅ Zobrazení úkolů navázaných na zakázku

### Úkoly (Tasks)

- ✅ Navázání úkolů na konkrétní zakázku (`orderId`)
- ✅ Přidávání, úprava a mazání úkolů
- ✅ Samostatný přehled všech úkolů s názvem zakázky (readonly režim)

## ⚙️ Proxy konfigurace

Soubor `setupProxy.js` zajišťuje přesměrování API požadavků na backend:

```javascript
'/api' => 'http://localhost:8000'
```

To umožňuje bezproblémovou komunikaci mezi frontendem a backendem během vývoje.

## 🧱 Použité technologie

- React
- React Bootstrap
- React Router DOM
- Context API (pro správu stavů)
- Fetch API (`fetch-helper.js`)
- Moderní JavaScript (ES6+)