# 🛠️ Job Order Management App – Backend

Tento repozitář obsahuje serverovou část aplikace pro správu zakázek a jejich úkolů (Job Orders & Tasks). Backend je vytvořen pomocí **Node.js** a **Express.js** a pracuje s lokálním JSON storage (bez databáze).

> 🔧 Projekt vznikl jako součást zadání pro předmět **BCAA25S – Backend Homework (Unicorn Vysoká škola)**.

---

## 📦 Struktura projektu

```
.
├── app.js                     # Hlavní vstupní bod aplikace (Express)
├── controller/
│   ├── order.js              # Router pro objednávky (Job Orders)
│   └── task.js               # Router pro úkoly (Tasks)
├── abl/
│   ├── order/                # Business logika pro objednávky
│   └── task/                 # Business logika pro úkoly
├── dao/
│   ├── order-dao.js          # Práce s JSON soubory pro objednávky
│   ├── task-dao.js           # Práce s JSON soubory pro úkoly                        
│   └── storage/
│     ├── orderList/          # Uložené objednávky ve formě JSON
│     └── taskList/           # Uložené úkoly ve formě JSON
.
```

---

## ⚙️ Spuštění projektu

1. **Klonuj repozitář:**
   ```bash
   git clone https://github.com/tvoje-jmeno/job-order-backend.git
   cd job-order-backend
   cd server
   ```

2. **Nainstaluj závislosti:**
   ```bash
   npm install
   ```

3. **Spusť aplikaci:**
   ```bash
   node app.js
   ```

4. **Server běží na:**
   ```
   http://localhost:8888
   ```

---

## 🧪 API Endpointy (v současné verzi)

| Metoda | Endpoint           | Popis                         |
|--------|--------------------|-------------------------------|
| POST   | `/order/create`    | Vytvoření nové zakázky        |
| POST   | `/order/delete`    | Smazání zakázky + jejích úkolů|
| POST   | `/task/create`     | Přidání úkolu k zakázce       |
| POST   | `/task/delete`     | Smazání konkrétního úkolu     |

📌 *Validace vstupů je zajištěna pomocí knihovny [AJV](https://ajv.js.org/).*

---

## 🔮 Budoucí vývoj

- [ ] **Client-side část** (React, případně UAF / uuApp)

---

## 📁 Dokumentace

📄 Dokumentace řešení a popis business scénářů je dostupná v souboru:

[BCAA25S Zeman Vít - Homework Solution - backend](https://uuapp.plus4u.net/uu-managementkit-maing02/38744216cb324edca986789798259ba9/document?oid=67b6fff224292539ed15f3fe&pageOid=67b700016eb2b55bf788a1a7)  
[BCAA25S Zeman Vít - Homework Solution - Business model](https://uuapp.plus4u.net/uu-managementkit-maing02/38744216cb324edca986789798259ba9/document?oid=67b6fff224292539ed15f3fe&pageOid=67b6fffe6eb2b55bf788a176)
---

## 👤 Autor

**Vít Zeman**  
_Unicorn Vysoká škola – BCAA 2025 Summer_

---

## 📜 Licence

Tento projekt je určen pouze ke studijním účelům a plnění zadání v rámci VŠ.
