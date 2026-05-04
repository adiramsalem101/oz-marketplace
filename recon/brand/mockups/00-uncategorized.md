# brand/mockups/00 — Uncategorized

Files under docs/brand/ that don't fit the named mockup groups (corporate / marketplace / hostels / mobile).

## Index

| Path | First H1 / identifier |
|---|---|
| assets/mockups/dashboard_ui_kit.html | <title>OZ — Dashboard UI Kit</title> (no H1; component library showcase used by both corporate and marketplace teams) |
| assets/mockups/design-canvas.jsx | // DesignCanvas.jsx — Figma-ish design canvas wrapper (meta tooling — Figma-style canvas wrapper, not a product mockup) |

===== FILE: assets/mockups/dashboard_ui_kit.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>OZ — Dashboard UI Kit</title>
<link rel="stylesheet" href="colors_and_type.css"/>
<style>
  /* Lucide-style stroke icons (free, MIT). Sourced from lucide.dev. */
  body{margin:0;background:var(--bg-page);color:var(--ink);font-family:var(--font-sans)}
  .app{display:grid;grid-template-columns:240px 1fr;min-height:100vh}
  /* Icons */
  .i{width:18px;height:18px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round;flex:none}
  .i-sm{width:14px;height:14px}
  .i-md{width:20px;height:20px}
  /* Sidebar */
  .side{background:#1B3A6B;color:#fff;padding:22px 16px;display:flex;flex-direction:column;gap:18px}
  .brand{display:flex;align-items:center;gap:8px;font-size:18px;font-weight:800;padding:0 6px 16px;border-bottom:1px solid rgba(255,255,255,.1)}
  .brand .o{width:28px;height:28px;border-radius:7px;background:#E07B39;display:inline-flex;align-items:center;justify-content:center;color:#fff}
  .nav-section{display:flex;flex-direction:column;gap:2px}
  .nav-section .label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:rgba(210,229,250,.5);padding:0 10px 6px;font-weight:700}
  .nav-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;font-size:14px;font-weight:500;color:rgba(255,255,255,.85);cursor:pointer}
  .nav-link:hover{background:rgba(255,255,255,.08);color:#fff}
  .nav-link.active{background:#E07B39;color:#fff;font-weight:700}
  .nav-link .badge{margin-inline-start:auto;background:rgba(255,255,255,.18);font-size:11px;font-weight:700;padding:2px 8px;border-radius:9999px}
  .me{margin-top:auto;padding:12px;background:rgba(255,255,255,.06);border-radius:10px;display:flex;align-items:center;gap:10px}
  .me .av{width:36px;height:36px;border-radius:50%;background:#52A375;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:13px}
  .me .who{font-size:13px;font-weight:700}
  .me .role{font-size:11px;color:rgba(210,229,250,.7)}
  /* Main */
  .main{padding:24px 32px;display:flex;flex-direction:column;gap:22px}
  .topbar{display:flex;align-items:center;justify-content:space-between}
  .topbar h1{margin:0;font-size:26px;font-weight:800;letter-spacing:-.02em}
  .topbar .sub{font-size:13px;color:var(--fg-muted);margin-top:4px}
  .topbar .actions{display:flex;gap:10px;align-items:center}
  .btn-cta{background:#E07B39;color:#fff;padding:10px 20px;border-radius:10px;font-weight:700;font-size:13px;border:0;cursor:pointer;box-shadow:var(--shadow-orange);font-family:inherit;display:inline-flex;align-items:center;gap:7px}
  .btn-cta:hover{background:#C26A2C}
  .btn-ghost{background:#fff;color:#1B3A6B;padding:10px 16px;border-radius:10px;font-weight:700;font-size:13px;border:1px solid var(--border-default);cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:7px}
  /* KPIs */
  .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .kpi{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:6px;box-shadow:var(--shadow-sm);position:relative}
  .kpi .label{font-size:12px;color:var(--fg-muted);font-weight:600}
  .kpi .value{font-size:28px;font-weight:800;letter-spacing:-.02em}
  .kpi .delta{font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px}
  .kpi .delta.up{color:#2D6A4F}
  .kpi .delta.down{color:#dc2626}
  .kpi .ic{position:absolute;top:14px;left:14px;width:36px;height:36px;border-radius:10px;background:#D2E5FA;color:#1B3A6B;display:flex;align-items:center;justify-content:center}
  /* Two cols */
  .cols{display:grid;grid-template-columns:2fr 1fr;gap:18px}
  .panel{background:#fff;border:1px solid #eef0f3;border-radius:14px;box-shadow:var(--shadow-sm);overflow:hidden}
  .panel .ph{padding:16px 20px;border-bottom:1px solid #eef0f3;display:flex;align-items:center;justify-content:space-between}
  .panel h2{margin:0;font-size:16px;font-weight:800}
  .panel .ph small{font-size:12px;color:var(--fg-muted)}
  /* Listings table */
  table{width:100%;border-collapse:collapse;table-layout:fixed}
  thead th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg-muted);font-weight:700;text-align:right;padding:10px 20px;background:#fafbfc;border-bottom:1px solid #eef0f3}
  thead th:nth-child(1){width:auto}
  thead th:nth-child(2){width:96px}
  thead th:nth-child(3){width:84px}
  thead th:nth-child(4){width:116px}
  thead th:nth-child(5){width:76px}
  tbody td{overflow:hidden;text-overflow:ellipsis}
  .pill.compact{padding:2px 8px;font-size:10.5px;gap:4px}
  .pill.compact .i-sm{width:11px;height:11px}
  tbody td{padding:14px 20px;border-bottom:1px solid #f3f4f6;font-size:13px;vertical-align:middle}
  tbody tr:last-child td{border-bottom:0}
  .row-prop{display:flex;align-items:center;gap:10px}
  .thumb{width:52px;height:40px;border-radius:8px;background-size:cover;background-position:center;flex:none;border:1px solid rgba(0,0,0,.06)}
  .row-prop .t{font-weight:700}
  .row-prop .m{font-size:11.5px;color:var(--fg-muted)}
  .pill{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:9999px;font-size:11px;font-weight:700;white-space:nowrap}
  .pill.ver{background:#2D6A4F;color:#fff}
  .pill.pen{background:#fef3e8;color:#E07B39}
  .pill.exp{background:#fef2f2;color:#dc2626}
  .row-act{display:flex;gap:6px}
  .ico-btn{width:28px;height:28px;border-radius:7px;background:#F7F8FA;color:var(--fg-muted);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #eef0f3}
  .ico-btn:hover{background:#fff;color:#1B3A6B;border-color:#D2E5FA}
  /* Activity */
  .audit{display:flex;align-items:flex-start;gap:10px;padding:14px 20px;background:linear-gradient(180deg,#f5f9f6,#fff);border-bottom:1px solid #eef0f3}
  .audit .ic{flex:none;width:34px;height:34px;border-radius:9px;background:#2D6A4F;color:#fff;display:inline-flex;align-items:center;justify-content:center}
  .audit .t{font-size:13px;font-weight:700;color:#2D6A4F}
  .audit .d{font-size:11.5px;color:var(--fg-muted)}
  .act{display:flex;flex-direction:column}
  .item{display:flex;gap:10px;padding:12px 20px;border-bottom:1px solid #f3f4f6;align-items:flex-start}
  .item:last-child{border-bottom:0}
  .item .ic{flex:none;width:30px;height:30px;border-radius:8px;background:#D2E5FA;color:#1B3A6B;display:inline-flex;align-items:center;justify-content:center}
  .item .ic.ver{background:rgba(45,106,79,.12);color:#2D6A4F}
  .item .ic.alert{background:#fef2f2;color:#dc2626}
  .item .text{font-size:13px;line-height:1.5;color:var(--ink)}
  .item .when{font-size:11px;color:var(--fg-faint);margin-top:2px}
</style>
</head>
<body>

<!-- Lucide icon symbol library (MIT-licensed). Reused via <svg><use href="#i-name"/></svg>. -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></symbol>
    <symbol id="i-building" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></symbol>
    <symbol id="i-package" viewBox="0 0 24 24"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></symbol>
    <symbol id="i-message" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
    <symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></symbol>
    <symbol id="i-scale" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
    <symbol id="i-coins" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></symbol>
    <symbol id="i-trend" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-edit" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
    <symbol id="i-bed" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></symbol>
    <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></symbol>
    <symbol id="i-arrow-up" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></symbol>
    <symbol id="i-arrow-down" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></symbol>
    <symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></symbol>
  </defs>
</svg>

<div class="app">
  <aside class="side">
    <div class="brand"><span class="o"><svg class="i" style="stroke:#fff"><use href="#i-hard-hat"/></svg></span> עוז · ניהול</div>

    <div class="nav-section">
      <div class="label">סקירה</div>
      <a class="nav-link active"><svg class="i"><use href="#i-grid"/></svg> דאשבורד</a>
      <a class="nav-link"><svg class="i"><use href="#i-building"/></svg> הנכסים שלי <span class="badge">12</span></a>
      <a class="nav-link"><svg class="i"><use href="#i-package"/></svg> Audit Packs</a>
    </div>
    <div class="nav-section">
      <div class="label">פעילות</div>
      <a class="nav-link"><svg class="i"><use href="#i-message"/></svg> פניות <span class="badge">3</span></a>
      <a class="nav-link"><svg class="i"><use href="#i-handshake"/></svg> Deal-room</a>
      <a class="nav-link"><svg class="i"><use href="#i-scale"/></svg> ציות וחוק</a>
    </div>
    <div class="nav-section">
      <div class="label">מסחר</div>
      <a class="nav-link"><svg class="i"><use href="#i-coins"/></svg> תשלומים</a>
      <a class="nav-link"><svg class="i"><use href="#i-trend"/></svg> דוחות</a>
    </div>

    <div class="me">
      <div class="av">דב</div>
      <div><div class="who">דב לוי</div><div class="role">בעל נכסים · 12</div></div>
    </div>
  </aside>

  <main class="main">
    <div class="topbar">
      <div>
        <h1>שלום דב, יש לך 3 פניות חדשות</h1>
        <div class="sub">פיילוט גוש דן · 25/02/2026</div>
      </div>
      <div class="actions">
        <button class="btn-ghost"><svg class="i"><use href="#i-download"/></svg> ייצא Audit Pack</button>
        <button class="btn-cta"><svg class="i" style="stroke:#fff"><use href="#i-plus"/></svg> פרסם נכס חדש</button>
      </div>
    </div>

    <section class="kpis">
      <div class="kpi">
        <div class="ic"><svg class="i-md i"><use href="#i-building"/></svg></div>
        <div class="label">נכסים פעילים</div>
        <div class="value">12</div>
        <div class="delta up"><svg class="i-sm i"><use href="#i-arrow-up"/></svg> 2 השבוע</div>
      </div>
      <div class="kpi">
        <div class="ic" style="background:rgba(45,106,79,.12);color:#2D6A4F"><svg class="i-md i"><use href="#i-bed"/></svg></div>
        <div class="label">תפוסה</div>
        <div class="value">87%</div>
        <div class="delta up"><svg class="i-sm i"><use href="#i-arrow-up"/></svg> 12% מהממוצע</div>
      </div>
      <div class="kpi">
        <div class="ic" style="background:#fef3e8;color:#E07B39"><svg class="i-md i"><use href="#i-coins"/></svg></div>
        <div class="label">הכנסה חודשית</div>
        <div class="value">186,400₪</div>
        <div class="delta up"><svg class="i-sm i"><use href="#i-arrow-up"/></svg> 80% ממחיר שוק</div>
      </div>
      <div class="kpi">
        <div class="ic" style="background:#fef2f2;color:#dc2626"><svg class="i-md i"><use href="#i-alert"/></svg></div>
        <div class="label">נדרשת פעולה</div>
        <div class="value">2</div>
        <div class="delta down">חידוש אימות</div>
      </div>
    </section>

    <section class="cols">
      <div class="panel">
        <div class="ph"><h2>הנכסים שלי</h2><small>12 פעילים · 2 נדרשים חידוש</small></div>
        <table>
          <thead><tr><th>נכס</th><th>סטטוס</th><th>תפוסה</th><th>הכנסה/חודש</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=320&h=240&fit=crop')"></div><div><div class="t">תל-אביב צפון · 10 מיטות</div><div class="m">B2B · קבלן: ש.אברהמי</div></div></div></td>
              <td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> A</span></td>
              <td><strong>10/10</strong></td>
              <td><strong>13,500₪</strong></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=320&h=240&fit=crop')"></div><div><div class="t">רמת-גן בורסה · 16 מיטות</div><div class="m">B2B · קבלן: ע.ז קבלנות</div></div></div></td>
              <td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> A</span></td>
              <td><strong>14/16</strong></td>
              <td><strong>19,600₪</strong></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=320&h=240&fit=crop')"></div><div><div class="t">פתח-תקווה מרכז · 12 מיטות</div><div class="m">B2C · 3 שוכרים פרטיים</div></div></div></td>
              <td><span class="pill pen compact"><svg class="i-sm i"><use href="#i-clock"/></svg> בתהליך</span></td>
              <td><strong>9/12</strong></td>
              <td><strong>10,800₪</strong></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=320&h=240&fit=crop')"></div><div><div class="t">חולון אגרובנק · 8 מיטות</div><div class="m">B2B · ממתין שיוך</div></div></div></td>
              <td><span class="pill exp compact"><svg class="i-sm i"><use href="#i-alert"/></svg> פג ב‑7י׳</span></td>
              <td><strong>6/8</strong></td>
              <td><strong>8,400₪</strong></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1460317442991-0ec209397118?w=320&h=240&fit=crop')"></div><div><div class="t">ראשל״צ מערב · 14 מיטות</div><div class="m">B2B · קבלן: דקלאור</div></div></div></td>
              <td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> B</span></td>
              <td><strong>14/14</strong></td>
              <td><strong>17,500₪</strong></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="panel">
        <div class="ph"><h2>פעילות אחרונה</h2><small>היום</small></div>
        <div class="audit">
          <div class="ic"><svg class="i" style="stroke:#fff"><use href="#i-package"/></svg></div>
          <div>
            <div class="t">Audit Pack מוכן להורדה</div>
            <div class="d">תל-אביב צפון · 25/02/2026 · PDF + נספחים</div>
          </div>
        </div>
        <div class="act">
          <div class="item">
            <div class="ic"><svg class="i-sm i"><use href="#i-message"/></svg></div>
            <div><div class="text"><strong>ש.אברהמי קבלנות</strong> ביקש הצעת מחיר ל-10 מיטות בתל-אביב צפון.</div><div class="when">לפני 12 דק׳</div></div>
          </div>
          <div class="item">
            <div class="ic ver"><svg class="i-sm i"><use href="#i-check"/></svg></div>
            <div><div class="text">אימות פיזי <strong>הושלם</strong> — רמת-גן בורסה. רמה A · בתוקף עד 25/08/2026.</div><div class="when">לפני 2 שעות</div></div>
          </div>
          <div class="item">
            <div class="ic alert"><svg class="i-sm i"><use href="#i-alert"/></svg></div>
            <div><div class="text">חולון אגרובנק — אימות פג <strong>בעוד 7 ימים</strong>. תזמן ביקורת.</div><div class="when">היום, 09:14</div></div>
          </div>
          <div class="item">
            <div class="ic"><svg class="i-sm i"><use href="#i-coins"/></svg></div>
            <div><div class="text">תשלום עמלה (5%) <strong>זוכה</strong> — 980₪ עבור עסקת רמת-גן.</div><div class="when">אתמול</div></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
</body>
</html>
===== END FILE =====

===== FILE: assets/mockups/design-canvas.jsx =====

// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), labels/titles are inline-editable,
// and any artboard can be opened in a fullscreen focus overlay (←/→/Esc).
// State persists to a .design-canvas.state.json sidecar via the host
// bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = [
    '.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}',
    '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}',
    '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}',
    '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}',
    '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
    '.dc-card{transition:box-shadow .15s,transform .15s}',
    '.dc-card *{scrollbar-width:none}',
    '.dc-card *::-webkit-scrollbar{display:none}',
    '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px}',
    '.dc-grip{cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s}',
    '.dc-grip:hover{background:rgba(0,0,0,.08)}',
    '.dc-grip:active{cursor:grabbing}',
    '.dc-labeltext{cursor:pointer;border-radius:4px;padding:3px 6px;display:flex;align-items:center;transition:background .12s}',
    '.dc-labeltext:hover{background:rgba(0,0,0,.05)}',
    '.dc-expand{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s,background .12s;',
    '  width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;',
    '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}',
    '.dc-expand:hover{background:rgba(0,0,0,.06);color:#2a251f}',
    '[data-dc-slot]:hover .dc-expand{opacity:1}',
  ].join('\n');
  document.head.appendChild(s);
}

const DCCtx = React.createContext(null);

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, focused
// artboard). Order/titles/labels persist to a .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';

function DesignCanvas({ children, minScale, maxScale, style }) {
  const [state, setState] = React.useState({ sections: {}, focus: null });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);

  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE)
      .then((r) => (r.ok ? r.json() : null))
      .then((saved) => {
        if (off || !saved || !saved.sections) return;
        skipNextWrite.current = true;
        setState((s) => ({ ...s, sections: saved.sections }));
      })
      .catch(() => {})
      .finally(() => { didRead.current = true; if (!off) setReady(true); });
    const t = setTimeout(() => { if (!off) setReady(true); }, 150);
    return () => { off = true; clearTimeout(t); };
  }, []);

  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) { skipNextWrite.current = false; return; }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({ sections: state.sections })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Only direct DCSection > DCArtboard children are
  // walked — wrapping them in other elements opts out of focus/reorder.
  const registry = {};     // slotId -> { sectionId, artboard }
  const sectionMeta = {};  // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  React.Children.forEach(children, (sec) => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const srcIds = [];
    React.Children.forEach(sec.props.children, (ab) => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (!aid) return;
      registry[`${sid}/${aid}`] = { sectionId: sid, artboard: ab };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter((k) => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter((k) => !kept.includes(k))],
    };
  });

  const api = React.useMemo(() => ({
    state,
    section: (id) => state.sections[id] || {},
    patchSection: (id, p) => setState((s) => ({
      ...s,
      sections: { ...s.sections, [id]: { ...s.sections[id], ...(typeof p === 'function' ? p(s.sections[id] || {}) : p) } },
    })),
    setFocus: (slotId) => setState((s) => ({ ...s, focus: slotId })),
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') api.setFocus(null); };
    const onPd = (e) => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);

  return (
    <DCCtx.Provider value={api}>
      <DCViewport minScale={minScale} maxScale={maxScale} style={style}>{ready && children}</DCViewport>
      {state.focus && registry[state.focus] && (
        <DCFocusOverlay entry={registry[state.focus]} sectionMeta={sectionMeta} sectionOrder={sectionOrder} />
      )}
    </DCCtx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({ children, minScale = 0.1, maxScale = 8, style = {} }) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({ x: 0, y: 0, scale: 1 });

  const apply = React.useCallback(() => {
    const { x, y, scale } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);

  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = (e) =>
      e.deltaMode !== 0 ||
      (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40);

    const onWheel = (e) => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = (e) => { e.preventDefault(); isGesturing = true; gsBase = tf.current.scale; };
    const onGestureChange = (e) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, (gsBase * e.scale) / tf.current.scale);
    };
    const onGestureEnd = (e) => { e.preventDefault(); isGesturing = false; };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = (e) => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || (e.button === 0 && onBg))) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX; drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    vp.addEventListener('wheel', onWheel, { passive: false });
    vp.addEventListener('gesturestart', onGestureStart, { passive: false });
    vp.addEventListener('gesturechange', onGestureChange, { passive: false });
    vp.addEventListener('gestureend', onGestureEnd, { passive: false });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);

  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return (
    <div
      ref={vpRef}
      className="design-canvas"
      style={{
        height: '100vh', width: '100vw',
        background: DC.bg,
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        position: 'relative',
        fontFamily: DC.font,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        ref={worldRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          transformOrigin: '0 0',
          willChange: 'transform',
          width: 'max-content', minWidth: '100%',
          minHeight: '100%',
          padding: '60px 0 80px',
        }}
      >
        <div style={{ position: 'absolute', inset: -6000, backgroundImage: gridSvg, backgroundSize: '120px 120px', pointerEvents: 'none', zIndex: -1 }} />
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({ id, title, subtitle, children, gap = 48 }) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(children);
  const artboards = all.filter((c) => c && c.type === DCArtboard);
  const rest = all.filter((c) => !(c && c.type === DCArtboard));
  const srcOrder = artboards.map((a) => a.props.id ?? a.props.label);
  const sec = (ctx && sid && ctx.section(sid)) || {};

  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter((k) => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter((k) => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);

  const byId = Object.fromEntries(artboards.map((a) => [a.props.id ?? a.props.label, a]));

  return (
    <div data-dc-section={sid} style={{ marginBottom: 80, position: 'relative' }}>
      <div style={{ padding: '0 60px 56px' }}>
        <DCEditable tag="div" value={sec.title ?? title}
          onChange={(v) => ctx && sid && ctx.patchSection(sid, { title: v })}
          style={{ fontSize: 28, fontWeight: 600, color: DC.title, letterSpacing: -0.4, marginBottom: 6, display: 'inline-block' }} />
        {subtitle && <div style={{ fontSize: 16, color: DC.subtitle }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', gap, padding: '0 60px', alignItems: 'flex-start', width: 'max-content' }}>
        {order.map((k) => (
          <DCArtboardFrame key={k} sectionId={sid} artboard={byId[k]} order={order}
            label={(sec.labels || {})[k] ?? byId[k].props.label}
            onRename={(v) => ctx && ctx.patchSection(sid, (x) => ({ labels: { ...x.labels, [k]: v } }))}
            onReorder={(next) => ctx && ctx.patchSection(sid, { order: next })}
            onFocus={() => ctx && ctx.setFocus(`${sid}/${k}`)} />
        ))}
      </div>
      {rest}
    </div>
  );
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() { return null; }

function DCArtboardFrame({ sectionId, artboard, label, order, onRename, onReorder, onFocus }) {
  const { id: rawId, label: rawLabel, width = 260, height = 480, children, style = {} } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = (e) => {
    e.preventDefault(); e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map((el) => ({ el, id: el.dataset.dcSlot, x: el.getBoundingClientRect().left }));
    const slotXs = homes.map((h) => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');

    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };

    const move = (ev) => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0, best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) { best = d; nearest = i; }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter((k) => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };

    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) { h.el.style.transition = 'none'; h.el.style.transform = ''; }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  return (
    <div ref={ref} data-dc-slot={id} style={{ position: 'relative', flexShrink: 0 }}>
      <div className="dc-labelrow" style={{ position: 'absolute', bottom: '100%', left: -4, marginBottom: 4, color: DC.label }}>
        <div className="dc-grip" onPointerDown={onGripDown} title="Drag to reorder">
          <svg width="9" height="13" viewBox="0 0 9 13" fill="currentColor"><circle cx="2" cy="2" r="1.1"/><circle cx="7" cy="2" r="1.1"/><circle cx="2" cy="6.5" r="1.1"/><circle cx="7" cy="6.5" r="1.1"/><circle cx="2" cy="11" r="1.1"/><circle cx="7" cy="11" r="1.1"/></svg>
        </div>
        <div className="dc-labeltext" onClick={onFocus} title="Click to focus">
          <DCEditable value={label} onChange={onRename} onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 15, fontWeight: 500, color: DC.label, lineHeight: 1 }} />
        </div>
      </div>
      <button className="dc-expand" onClick={onFocus} onPointerDown={(e) => e.stopPropagation()} title="Focus">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"/></svg>
      </button>
      <div className="dc-card"
        style={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)', overflow: 'hidden', width, height, background: '#fff', ...style }}>
        {children || <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13, fontFamily: DC.font }}>{id}</div>}
      </div>
    </div>
  );
}

// Inline rename — commits on blur or Enter.
function DCEditable({ value, onChange, style, tag = 'span', onClick }) {
  const T = tag;
  return (
    <T className="dc-editable" contentEditable suppressContentEditableWarning
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      onBlur={(e) => onChange && onChange(e.currentTarget.textContent)}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } }}
      style={style}>{value}</T>
  );
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({ entry, sectionMeta, sectionOrder }) {
  const ctx = React.useContext(DCCtx);
  const { sectionId, artboard } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);

  const go = (d) => { const n = peers[(idx + d + peers.length) % peers.length]; if (n) ctx.setFocus(`${sectionId}/${n}`); };
  const goSection = (d) => {
    const ns = sectionOrder[(secIdx + d + sectionOrder.length) % sectionOrder.length];
    const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
    if (first) ctx.setFocus(`${ns}/${first}`);
  };

  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goSection(-1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); goSection(1); }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });

  const { width = 260, height = 480, children } = artboard.props;
  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => { const r = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));

  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({ dir, onClick }) => (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{ position: 'absolute', top: '50%', [dir]: 28, transform: 'translateY(-50%)',
        border: 'none', background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.9)',
        width: 44, height: 44, borderRadius: 22, fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} /></svg>
    </button>
  );

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(
    <div onClick={() => ctx.setFocus(null)}
      onWheel={(e) => e.preventDefault()}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(24,20,16,.6)', backdropFilter: 'blur(14px)',
        fontFamily: DC.font, color: '#fff' }}>

      {/* top bar: section dropdown (left) · close (right) */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, display: 'flex', alignItems: 'flex-start', padding: '16px 20px 0', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setDd((o) => !o)}
            style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', padding: '6px 8px',
              borderRadius: 6, textAlign: 'left', fontFamily: 'inherit' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{meta.title}</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ opacity: .7 }}><path d="M2 4l3.5 3.5L9 4"/></svg>
            </span>
            {meta.subtitle && <span style={{ display: 'block', fontSize: 13, opacity: .6, fontWeight: 400, marginTop: 2 }}>{meta.subtitle}</span>}
          </button>
          {ddOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#2a251f', borderRadius: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,.4)', padding: 4, minWidth: 200, zIndex: 10 }}>
              {sectionOrder.map((sid) => (
                <button key={sid} onClick={() => { setDd(false); const f = sectionMeta[sid].slotIds[0]; if (f) ctx.setFocus(`${sid}/${f}`); }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                    background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent', color: '#fff',
                    padding: '8px 12px', borderRadius: 5, fontSize: 14, fontWeight: sid === sectionId ? 600 : 400, fontFamily: 'inherit' }}>
                  {sectionMeta[sid].title}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => ctx.setFocus(null)}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.7)', width: 32, height: 32,
            borderRadius: 16, fontSize: 20, cursor: 'pointer', lineHeight: 1, transition: 'background .12s' }}>×</button>
      </div>

      {/* card centered, label + index below — only the card itself stops
          propagation so any backdrop click (including the margins around
          the card) exits focus */}
      <div
        style={{ position: 'absolute', top: 64, bottom: 56, left: 100, right: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: width * scale, height: height * scale, position: 'relative' }}>
          <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', background: '#fff', borderRadius: 2, overflow: 'hidden',
            boxShadow: '0 20px 80px rgba(0,0,0,.4)' }}>
            {children || <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>{aid}</div>}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 500, opacity: .85, textAlign: 'center' }}>
          {(sec.labels || {})[aid] ?? artboard.props.label}
          <span style={{ opacity: .5, marginLeft: 10, fontVariantNumeric: 'tabular-nums' }}>{idx + 1} / {peers.length}</span>
        </div>
      </div>

      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      {/* dots */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {peers.map((p, i) => (
          <button key={p} onClick={() => ctx.setFocus(`${sectionId}/${p}`)}
            style={{ border: 'none', padding: 0, cursor: 'pointer', width: 6, height: 6, borderRadius: 3,
              background: i === idx ? '#fff' : 'rgba(255,255,255,.3)' }} />
        ))}
      </div>
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({ children, top, left, right, bottom, rotate = -2, width = 180 }) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom, width,
      background: DC.postitBg, padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14, lineHeight: 1.4, color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5,
    }}>{children}</div>
  );
}

Object.assign(window, { DesignCanvas, DCSection, DCArtboard, DCPostIt });

===== END FILE =====
