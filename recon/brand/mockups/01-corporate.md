# brand/mockups/01 — Corporate Dashboards

Mockups for the B2B Manager corporate dashboard (MVP and Dreams scope), the wrapper that loads them, and the shared React helpers.

## Files included
- assets/mockups/corporate_assets_mvp.html  (B2B Dashboard — MVP scope)
- assets/mockups/corporate_assets_full.html (B2B Dashboard — Dreams scope)
- assets/mockups/corporate-assets.html      (React wrapper that loads MVP+Full as tabs)
- assets/mockups/corp-shared.jsx            (Shared React components for the corporate dashboards)

===== FILE: assets/mockups/corporate_assets_mvp.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>עוז · ניהול נכסי תאגיד · MVP</title>
<link rel="stylesheet" href="corporate-assets/colors_and_type.css"/>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg-page);color:var(--ink);font-family:var(--font-sans)}
  a{cursor:pointer}

  /* Layout */
  .app{display:grid;grid-template-columns:236px 1fr;min-height:100vh}

  /* Icons */
  .i{width:18px;height:18px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round;flex:none}
  .i-sm{width:14px;height:14px}
  .i-md{width:20px;height:20px}

  /* ========== Sidebar ========== */
  .side{background:#1B3A6B;color:#fff;padding:22px 14px;display:flex;flex-direction:column;gap:18px;position:sticky;top:0;height:100vh}
  .brand{display:flex;align-items:center;gap:9px;font-size:17px;font-weight:800;padding:0 6px 16px;border-bottom:1px solid rgba(255,255,255,.1)}
  .brand .o{width:30px;height:30px;border-radius:8px;background:#E07B39;display:inline-flex;align-items:center;justify-content:center;color:#fff}
  .brand .sub{font-size:10px;font-weight:600;color:rgba(210,229,250,.65);letter-spacing:.04em;display:block}
  .org{padding:10px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:12px;display:flex;align-items:center;gap:8px;justify-content:space-between}
  .org .l{font-size:10px;color:rgba(210,229,250,.6);font-weight:600;letter-spacing:.04em}
  .org .n{font-weight:700}
  .nav-section{display:flex;flex-direction:column;gap:2px}
  .nav-section .label{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:rgba(210,229,250,.5);padding:0 10px 6px;font-weight:700}
  .nav-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:13.5px;font-weight:500;color:rgba(255,255,255,.85);cursor:pointer;border:0;background:transparent;width:100%;text-align:right;font-family:inherit}
  .nav-link:hover{background:rgba(255,255,255,.08);color:#fff}
  .nav-link.active{background:#E07B39;color:#fff;font-weight:700}
  .nav-link .badge{margin-inline-start:auto;background:rgba(255,255,255,.18);font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:9999px}
  .nav-link.active .badge{background:rgba(255,255,255,.25)}
  .me{margin-top:auto;padding:11px;background:rgba(255,255,255,.06);border-radius:10px;display:flex;align-items:center;gap:10px}
  .me .av{width:34px;height:34px;border-radius:50%;background:#52A375;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}
  .me .who{font-size:12.5px;font-weight:700}
  .me .role{font-size:10.5px;color:rgba(210,229,250,.7)}

  /* ========== Main ========== */
  .main{padding:22px 30px 60px;display:flex;flex-direction:column;gap:20px;min-width:0}
  .topbar{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap}
  .topbar h1{margin:0;font-size:24px;font-weight:800;letter-spacing:-.02em}
  .topbar .sub{font-size:12.5px;color:var(--fg-muted);margin-top:3px}
  .topbar .actions{display:flex;gap:10px;align-items:center}

  /* Buttons */
  .btn-cta{background:#E07B39;color:#fff;padding:10px 18px;border-radius:10px;font-weight:700;font-size:13px;border:0;cursor:pointer;box-shadow:var(--shadow-orange);font-family:inherit;display:inline-flex;align-items:center;gap:7px;transition:transform 150ms ease,background 150ms ease}
  .btn-cta:hover{background:#C26A2C;transform:translateY(-1px)}
  .btn-ghost{background:#fff;color:#1B3A6B;padding:9px 14px;border-radius:10px;font-weight:700;font-size:13px;border:1px solid var(--border-default);cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:7px}
  .btn-ghost:hover{border-color:#1B3A6B}

  /* ========== KPIs ========== */
  .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .kpi{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:6px;box-shadow:var(--shadow-sm);position:relative;min-width:0}
  .kpi .label{font-size:12px;color:var(--fg-muted);font-weight:600}
  .kpi .value{font-size:28px;font-weight:800;letter-spacing:-.02em;line-height:1.1}
  .kpi .delta{font-size:11.5px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--fg-muted)}
  .kpi .delta.up{color:#2D6A4F}
  .kpi .delta.down{color:#dc2626}
  .kpi .ic{position:absolute;top:14px;left:14px;width:36px;height:36px;border-radius:10px;background:#D2E5FA;color:#1B3A6B;display:flex;align-items:center;justify-content:center}

  /* ========== Sections ========== */
  .panel{background:#fff;border:1px solid #eef0f3;border-radius:14px;box-shadow:var(--shadow-sm);overflow:hidden;min-width:0}
  .panel .ph{padding:16px 20px;border-bottom:1px solid #eef0f3;display:flex;align-items:center;justify-content:space-between;gap:12px}
  .panel h2{margin:0;font-size:15.5px;font-weight:800}
  .panel .ph small{font-size:12px;color:var(--fg-muted)}
  .panel .ph .pa{display:flex;gap:6px;align-items:center}
  .link-btn{font-size:12px;font-weight:700;color:#1B3A6B;display:inline-flex;align-items:center;gap:4px;padding:6px 8px;border-radius:8px}
  .link-btn:hover{background:#D2E5FA}

  .cols-2{display:grid;grid-template-columns:1.6fr 1fr;gap:18px}
  .cols-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}

  /* ========== Tables ========== */
  table{width:100%;border-collapse:collapse}
  thead th{font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg-muted);font-weight:700;text-align:right;padding:10px 18px;background:#fafbfc;border-bottom:1px solid #eef0f3;white-space:nowrap}
  tbody td{padding:13px 18px;border-bottom:1px solid #f3f4f6;font-size:13px;vertical-align:middle}
  tbody tr:last-child td{border-bottom:0}
  tbody tr{transition:background 150ms ease}
  tbody tr:hover{background:#fafbfc}

  /* row decorations */
  .row-prop{display:flex;align-items:center;gap:10px}
  .thumb{width:50px;height:38px;border-radius:8px;background-size:cover;background-position:center;flex:none;border:1px solid rgba(0,0,0,.06)}
  .thumb.ph-blue{background:#D2E5FA;color:#1B3A6B;display:flex;align-items:center;justify-content:center}
  .row-prop .t{font-weight:700}
  .row-prop .m{font-size:11.5px;color:var(--fg-muted)}

  /* Pills */
  .pill{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:9999px;font-size:11px;font-weight:700;white-space:nowrap}
  .pill.compact{padding:2px 8px;font-size:10.5px;gap:4px}
  .pill.compact .i-sm{width:11px;height:11px}
  .pill.ver{background:#2D6A4F;color:#fff}
  .pill.ver-b{background:#52A375;color:#fff}
  .pill.ver-c{background:#9CA3AF;color:#fff}
  .pill.pen{background:#fef3e8;color:#E07B39}
  .pill.exp{background:#fef2f2;color:#dc2626}
  .pill.info{background:#D2E5FA;color:#1B3A6B}
  .pill.muted{background:#f3f4f6;color:#6B7280}
  .pill.gray{background:#eef0f3;color:#374151}

  /* Capacity bar */
  .cap{display:flex;flex-direction:column;gap:4px;min-width:80px}
  .cap-bar{height:5px;background:#eef0f3;border-radius:9999px;overflow:hidden}
  .cap-bar > i{display:block;height:100%;background:#2D6A4F;border-radius:inherit}
  .cap-bar > i.warn{background:#E07B39}
  .cap-bar > i.full{background:#52A375}
  .cap .num{font-size:11.5px;color:var(--fg-muted);font-weight:600}

  /* Action buttons */
  .row-act{display:flex;gap:6px;justify-content:flex-end}
  .ico-btn{width:28px;height:28px;border-radius:7px;background:#F7F8FA;color:var(--fg-muted);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #eef0f3;transition:all 150ms ease}
  .ico-btn:hover{background:#fff;color:#1B3A6B;border-color:#D2E5FA}

  /* ========== Activity feed ========== */
  .act{display:flex;flex-direction:column}
  .item{display:flex;gap:10px;padding:13px 18px;border-bottom:1px solid #f3f4f6;align-items:flex-start}
  .item:last-child{border-bottom:0}
  .item .ic{flex:none;width:30px;height:30px;border-radius:8px;background:#D2E5FA;color:#1B3A6B;display:inline-flex;align-items:center;justify-content:center}
  .item .ic.ver{background:rgba(45,106,79,.12);color:#2D6A4F}
  .item .ic.alert{background:#fef2f2;color:#dc2626}
  .item .ic.cta{background:#fef3e8;color:#E07B39}
  .item .text{font-size:12.5px;line-height:1.55;color:var(--ink)}
  .item .when{font-size:10.5px;color:var(--fg-faint);margin-top:2px}

  /* ========== Workers / Properties grid cards ========== */
  .stat-card{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:18px;box-shadow:var(--shadow-sm)}
  .stat-card h3{margin:0 0 12px;font-size:14px;font-weight:800;display:flex;justify-content:space-between;align-items:center}
  .seg{display:flex;justify-content:space-between;font-size:12px;padding:8px 0;border-bottom:1px solid #f3f4f6}
  .seg:last-child{border-bottom:0}
  .seg .v{font-weight:700}
  .seg.total{font-weight:800;padding-top:12px;border-top:2px solid #eef0f3;border-bottom:0;margin-top:4px}

  /* Deal card row */
  .deal{padding:14px 18px;border-bottom:1px solid #f3f4f6;display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center}
  .deal:last-child{border-bottom:0}
  .deal .l-h{font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px}
  .deal .l-m{font-size:11.5px;color:var(--fg-muted);margin-top:3px}
  .deal-sx{display:flex;gap:8px;align-items:center}
  .deal-amt{text-align:left;min-width:80px}
  .deal-amt .a{font-weight:800;font-size:13.5px}
  .deal-amt .s{font-size:10.5px;color:var(--fg-muted)}

  /* Stage progress */
  .stage{display:flex;gap:3px;align-items:center;font-size:10.5px;color:var(--fg-muted)}
  .stage i{display:block;width:14px;height:4px;border-radius:9999px;background:#eef0f3}
  .stage i.on{background:#1B3A6B}
  .stage i.cur{background:#E07B39}

  /* Filters */
  .filters{display:flex;gap:8px;align-items:center;padding:12px 18px;background:#fafbfc;border-bottom:1px solid #eef0f3;flex-wrap:wrap}
  .chip{padding:6px 12px;border-radius:9999px;border:1px solid #eef0f3;font-size:12px;font-weight:600;color:var(--fg-muted);background:#fff;cursor:pointer;display:inline-flex;align-items:center;gap:5px;font-family:inherit}
  .chip:hover{border-color:#1B3A6B;color:#1B3A6B}
  .chip.on{background:#1B3A6B;color:#fff;border-color:#1B3A6B}
  .chip .c{background:rgba(255,255,255,.2);padding:0 6px;border-radius:9999px;font-size:10.5px}
  .chip:not(.on) .c{background:#eef0f3;color:#6B7280}
  .search{flex:1;min-width:200px;display:flex;align-items:center;gap:8px;padding:7px 12px;background:#fff;border:1px solid #eef0f3;border-radius:9999px;color:var(--fg-muted);font-size:12.5px}
  .search input{border:0;outline:0;font-family:inherit;font-size:12.5px;flex:1;background:transparent;color:var(--ink)}

  /* Audit Pack callout */
  .audit-cta{display:flex;align-items:center;gap:14px;padding:14px 18px;background:linear-gradient(180deg,#f5f9f6,#fff);border-bottom:1px solid #eef0f3}
  .audit-cta .ic{flex:none;width:38px;height:38px;border-radius:10px;background:#2D6A4F;color:#fff;display:inline-flex;align-items:center;justify-content:center}
  .audit-cta .t{font-size:13px;font-weight:800;color:#2D6A4F}
  .audit-cta .d{font-size:11.5px;color:var(--fg-muted);margin-top:2px}
  .audit-cta button{margin-inline-start:auto}

  /* Attention banner */
  .attn{display:flex;gap:12px;padding:14px 18px;background:#fff8f1;border:1px solid #f7d4b0;border-radius:12px;align-items:center}
  .attn .ic{width:32px;height:32px;border-radius:9px;background:#E07B39;color:#fff;display:inline-flex;align-items:center;justify-content:center;flex:none}
  .attn .t{font-size:13px;font-weight:800;color:#1B3A6B}
  .attn .d{font-size:11.5px;color:var(--fg-muted);margin-top:2px}
  .attn .b{margin-inline-start:auto;display:flex;gap:8px}

  /* Responsive */
  @media (max-width: 980px){
    .app{grid-template-columns:1fr}
    .side{position:static;height:auto}
    .kpis{grid-template-columns:repeat(2,1fr)}
    .cols-2,.cols-3{grid-template-columns:1fr}
  }
</style>
</head>
<body>

<!-- Lucide icon library (MIT) -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></symbol>
    <symbol id="i-building" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></symbol>
    <symbol id="i-coins" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></symbol>
    <symbol id="i-package" viewBox="0 0 24 24"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></symbol>
    <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-edit" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
    <symbol id="i-bed" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></symbol>
    <symbol id="i-arrow-up" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></symbol>
    <symbol id="i-arrow-down" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></symbol>
    <symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></symbol>
    <symbol id="i-chev-down" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
  </defs>
</svg>

<div class="app">

  <!-- ============ Sidebar ============ -->
  <aside class="side">
    <div class="brand">
      <span class="o"><svg class="i" style="stroke:#fff"><use href="#i-hard-hat"/></svg></span>
      <div>עוז · תאגידים<span class="sub">CORPORATE</span></div>
    </div>

    <div class="org">
      <div>
        <div class="l">תאגיד</div>
        <div class="n">ש.אברהמי קבלנות</div>
      </div>
      <svg class="i-sm i" style="opacity:.6"><use href="#i-chev-down"/></svg>
    </div>

    <div class="nav-section">
      <div class="label">סקירה</div>
      <button class="nav-link active"><svg class="i"><use href="#i-grid"/></svg> דאשבורד</button>
      <button class="nav-link"><svg class="i"><use href="#i-building"/></svg> נכסים <span class="badge">8</span></button>
      <button class="nav-link"><svg class="i"><use href="#i-users"/></svg> עובדים <span class="badge">87</span></button>
    </div>
    <div class="nav-section">
      <div class="label">פעילות</div>
      <button class="nav-link"><svg class="i"><use href="#i-handshake"/></svg> עסקאות <span class="badge">3</span></button>
      <button class="nav-link"><svg class="i"><use href="#i-coins"/></svg> תשלומים</button>
      <button class="nav-link"><svg class="i"><use href="#i-package"/></svg> מסמכים</button>
    </div>

    <div class="me">
      <div class="av">אב</div>
      <div><div class="who">איציק אברהמי</div><div class="role">מנהל לוגיסטיקה</div></div>
    </div>
  </aside>

  <!-- ============ Main ============ -->
  <main class="main">

    <!-- Topbar -->
    <div class="topbar">
      <div>
        <h1>שלום איציק 👋 — 87 עובדים, 8 נכסים פעילים</h1>
        <div class="sub">פיילוט גוש דן · 28/04/2026 · עדכון אחרון לפני 4 דק׳</div>
      </div>
      <div class="actions">
        <button class="btn-ghost"><svg class="i"><use href="#i-download"/></svg> ייצא דו"ח</button>
        <button class="btn-cta"><svg class="i" style="stroke:#fff"><use href="#i-plus"/></svg> חפש דיור חדש</button>
      </div>
    </div>

    <!-- Attention banner — actionable single-line -->
    <div class="attn">
      <div class="ic"><svg class="i" style="stroke:#fff"><use href="#i-alert"/></svg></div>
      <div>
        <div class="t">2 חוזים מסתיימים בעוד פחות מ-30 יום</div>
        <div class="d">פתח-תקווה מרכז (פג 19/05) · חולון אגרובנק (פג 22/05). יש להתחיל חידוש או למצוא חלופה.</div>
      </div>
      <div class="b">
        <button class="btn-ghost">הצג</button>
      </div>
    </div>

    <!-- KPIs -->
    <section class="kpis">
      <div class="kpi">
        <div class="ic"><svg class="i-md i"><use href="#i-building"/></svg></div>
        <div class="label">נכסים פעילים</div>
        <div class="value">8</div>
        <div class="delta up"><svg class="i-sm i"><use href="#i-arrow-up"/></svg> +1 החודש</div>
      </div>
      <div class="kpi">
        <div class="ic" style="background:rgba(45,106,79,.12);color:#2D6A4F"><svg class="i-md i"><use href="#i-bed"/></svg></div>
        <div class="label">תפוסת מיטות</div>
        <div class="value">87 / 96</div>
        <div class="delta up">90.6% · 9 מיטות פנויות</div>
      </div>
      <div class="kpi">
        <div class="ic" style="background:#fef3e8;color:#E07B39"><svg class="i-md i"><use href="#i-coins"/></svg></div>
        <div class="label">עלות חודשית</div>
        <div class="value">128,400₪</div>
        <div class="delta">≈ 1,476₪/עובד</div>
      </div>
      <div class="kpi">
        <div class="ic" style="background:#fef2f2;color:#dc2626"><svg class="i-md i"><use href="#i-alert"/></svg></div>
        <div class="label">דורש פעולה</div>
        <div class="value">3</div>
        <div class="delta down">2 חוזים · 1 ביקורת</div>
      </div>
    </section>

    <!-- Properties + Activity feed -->
    <section class="cols-2">
      <div class="panel">
        <div class="ph">
          <div>
            <h2>הנכסים שלי</h2>
            <small>8 פעילים · 96 מיטות סה"כ</small>
          </div>
          <div class="pa">
            <a class="link-btn">הצג הכל ←</a>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters">
          <button class="chip on">הכל <span class="c">8</span></button>
          <button class="chip">פעיל <span class="c">6</span></button>
          <button class="chip">בתהליך <span class="c">1</span></button>
          <button class="chip">דורש חידוש <span class="c">2</span></button>
          <div class="search">
            <svg class="i-sm i"><use href="#i-search"/></svg>
            <input type="text" placeholder="חפש לפי עיר, קבלן, מספר חוזה…"/>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>נכס</th>
              <th>סטטוס</th>
              <th>תפוסה</th>
              <th>עלות/חודש</th>
              <th>סיום חוזה</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div class="row-prop">
                <div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=320&h=240&fit=crop')"></div>
                <div><div class="t">תל-אביב צפון · 10 מיטות</div><div class="m">דירה 4 · רחוב אבן גבירול</div></div>
              </div></td>
              <td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> A</span></td>
              <td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">10/10 · מלא</div></div></td>
              <td><strong>13,500₪</strong></td>
              <td>15/03/2027</td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop">
                <div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=320&h=240&fit=crop')"></div>
                <div><div class="t">רמת-גן בורסה · 16 מיטות</div><div class="m">דירת גן · רחוב ז'בוטינסקי</div></div>
              </div></td>
              <td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> A</span></td>
              <td><div class="cap"><div class="cap-bar"><i style="width:87%"></i></div><div class="num">14/16</div></div></td>
              <td><strong>19,600₪</strong></td>
              <td>02/11/2026</td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop">
                <div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=320&h=240&fit=crop')"></div>
                <div><div class="t">פתח-תקווה מרכז · 12 מיטות</div><div class="m">קומה 3 · ההסתדרות 14</div></div>
              </div></td>
              <td><span class="pill exp compact"><svg class="i-sm i"><use href="#i-alert"/></svg> פג 21י׳</span></td>
              <td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">12/12</div></div></td>
              <td><strong>15,600₪</strong></td>
              <td><span style="color:#dc2626;font-weight:700">19/05/2026</span></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop">
                <div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=320&h=240&fit=crop')"></div>
                <div><div class="t">חולון אגרובנק · 8 מיטות</div><div class="m">דירת חצר · אילת 22</div></div>
              </div></td>
              <td><span class="pill exp compact"><svg class="i-sm i"><use href="#i-alert"/></svg> פג 24י׳</span></td>
              <td><div class="cap"><div class="cap-bar"><i style="width:75%" class="warn"></i></div><div class="num">6/8</div></div></td>
              <td><strong>10,400₪</strong></td>
              <td><span style="color:#dc2626;font-weight:700">22/05/2026</span></td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop">
                <div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1460317442991-0ec209397118?w=320&h=240&fit=crop')"></div>
                <div><div class="t">ראשון-לציון מערב · 14 מיטות</div><div class="m">פנטהאוז · ההגנה 8</div></div>
              </div></td>
              <td><span class="pill ver-b compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> B</span></td>
              <td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">14/14</div></div></td>
              <td><strong>17,500₪</strong></td>
              <td>05/01/2027</td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
            <tr>
              <td><div class="row-prop">
                <div class="thumb ph-blue"><svg class="i"><use href="#i-building"/></svg></div>
                <div><div class="t">בני-ברק · 12 מיטות</div><div class="m">בקרוב · נחתם חוזה 24/04</div></div>
              </div></td>
              <td><span class="pill pen compact"><svg class="i-sm i"><use href="#i-clock"/></svg> בקליטה</span></td>
              <td><div class="cap"><div class="cap-bar"><i style="width:0%"></i></div><div class="num">0/12</div></div></td>
              <td><strong>14,400₪</strong></td>
              <td>23/04/2027</td>
              <td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-edit"/></svg></span></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="panel">
        <div class="ph"><h2>פעילות אחרונה</h2><small>היום</small></div>
        <div class="audit-cta">
          <div class="ic"><svg class="i" style="stroke:#fff"><use href="#i-package"/></svg></div>
          <div>
            <div class="t">דו"ח חודשי מוכן</div>
            <div class="d">אפריל 2026 · PDF + נספחי אימות</div>
          </div>
          <button class="btn-ghost"><svg class="i-sm i"><use href="#i-download"/></svg> הורד</button>
        </div>
        <div class="act">
          <div class="item">
            <div class="ic cta"><svg class="i-sm i"><use href="#i-handshake"/></svg></div>
            <div><div class="text">הצעת מחיר חדשה — <strong>בני-ברק 12 מיטות</strong>. ממתינה לאישור מנכ"ל.</div><div class="when">לפני 14 דק׳</div></div>
          </div>
          <div class="item">
            <div class="ic ver"><svg class="i-sm i"><use href="#i-check"/></svg></div>
            <div><div class="text">אימות פיזי <strong>הושלם</strong> — רמת-גן בורסה. רמה A · בתוקף עד 02/11/2026.</div><div class="when">לפני 2 שעות</div></div>
          </div>
          <div class="item">
            <div class="ic alert"><svg class="i-sm i"><use href="#i-alert"/></svg></div>
            <div><div class="text"><strong>חולון אגרובנק</strong> — חוזה פג בעוד 24 ימים. תזמן חידוש או חיפוש חלופה.</div><div class="when">היום, 09:14</div></div>
          </div>
          <div class="item">
            <div class="ic"><svg class="i-sm i"><use href="#i-users"/></svg></div>
            <div><div class="text">3 עובדים חדשים שובצו ל-<strong>תל-אביב צפון</strong>. הוקצו מיטות ומפתחות נמסרו.</div><div class="when">אתמול</div></div>
          </div>
          <div class="item">
            <div class="ic"><svg class="i-sm i"><use href="#i-coins"/></svg></div>
            <div><div class="text">תשלום ל<strong>חברת ניהול א.</strong> בוצע — 19,600₪ עבור רמת-גן בורסה.</div><div class="when">אתמול, 16:42</div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Workers / Cities / Active deals row -->
    <section class="cols-3">

      <!-- Workers breakdown -->
      <div class="stat-card">
        <h3>פיזור עובדים <a class="link-btn" style="font-size:11px">פירוט ←</a></h3>
        <div class="seg"><span>סין 🇨🇳</span><span class="v">38</span></div>
        <div class="seg"><span>הודו 🇮🇳</span><span class="v">22</span></div>
        <div class="seg"><span>טורקיה 🇹🇷</span><span class="v">15</span></div>
        <div class="seg"><span>מולדובה 🇲🇩</span><span class="v">9</span></div>
        <div class="seg"><span>אחר</span><span class="v">3</span></div>
        <div class="seg total"><span>סה"כ</span><span class="v">87</span></div>
      </div>

      <!-- Cities -->
      <div class="stat-card">
        <h3>פיזור גיאוגרפי <a class="link-btn" style="font-size:11px">מפה ←</a></h3>
        <div class="seg"><span><svg class="i-sm i" style="display:inline;vertical-align:-2px"><use href="#i-pin"/></svg> תל-אביב</span><span class="v">10</span></div>
        <div class="seg"><span><svg class="i-sm i" style="display:inline;vertical-align:-2px"><use href="#i-pin"/></svg> רמת-גן</span><span class="v">14</span></div>
        <div class="seg"><span><svg class="i-sm i" style="display:inline;vertical-align:-2px"><use href="#i-pin"/></svg> פתח-תקווה</span><span class="v">12</span></div>
        <div class="seg"><span><svg class="i-sm i" style="display:inline;vertical-align:-2px"><use href="#i-pin"/></svg> חולון</span><span class="v">6</span></div>
        <div class="seg"><span><svg class="i-sm i" style="display:inline;vertical-align:-2px"><use href="#i-pin"/></svg> ראשון-לציון</span><span class="v">14</span></div>
        <div class="seg total"><span>5 ערים</span><span class="v">87 / 96</span></div>
      </div>

      <!-- Active deals -->
      <div class="stat-card" style="padding:0">
        <div style="padding:18px 18px 0"><h3 style="margin:0">עסקאות בתהליך <a class="link-btn" style="font-size:11px">Deal-room ←</a></h3></div>
        <div style="padding-top:8px">
          <div class="deal">
            <div>
              <div class="l-h">בני-ברק · 12 מיטות <span class="pill compact info">הצעה</span></div>
              <div class="l-m">בעל נכס: גורן השקעות · מועד צפוי: 04/05</div>
              <div class="stage" style="margin-top:6px"><i class="on"></i><i class="cur"></i><i></i><i></i><i></i></div>
            </div>
            <div class="deal-amt"><div class="a">14,400₪</div><div class="s">ש"ח/חודש</div></div>
          </div>
          <div class="deal">
            <div>
              <div class="l-h">פתח-תקווה (חידוש) <span class="pill compact pen">חוזה</span></div>
              <div class="l-m">בעל נכס: ה. כהן · ממתין לחתימה</div>
              <div class="stage" style="margin-top:6px"><i class="on"></i><i class="on"></i><i class="cur"></i><i></i><i></i></div>
            </div>
            <div class="deal-amt"><div class="a">15,600₪</div><div class="s">ש"ח/חודש</div></div>
          </div>
          <div class="deal">
            <div>
              <div class="l-h">חולון (חלופה) <span class="pill compact muted">חיפוש</span></div>
              <div class="l-m">3 הצעות · בדיקת התאמה (4 מ"ר)</div>
              <div class="stage" style="margin-top:6px"><i class="cur"></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div class="deal-amt"><div class="a">~10,400₪</div><div class="s">הערכה</div></div>
          </div>
        </div>
      </div>
    </section>

  </main>
</div>

<!-- ============ Tweaks panel ============ -->
<script>
(function(){
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "density": "comfortable",
    "primaryAccent": "#E07B39",
    "rtlGutter": 30
  }/*EDITMODE-END*/;

  let active = false;
  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;bottom:20px;left:20px;width:280px;background:#fff;border:1px solid #eef0f3;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.18);padding:16px;font-family:inherit;z-index:9999;display:none';
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <strong style="font-size:13px;color:#1B3A6B">Tweaks</strong>
      <button id="tw-close" style="border:0;background:#F7F8FA;width:24px;height:24px;border-radius:6px;cursor:pointer;font-family:inherit">✕</button>
    </div>
    <label style="display:block;font-size:11px;color:#6B7280;font-weight:600;margin-bottom:6px">צפיפות</label>
    <div id="tw-density" style="display:flex;gap:4px;margin-bottom:14px">
      <button data-v="compact" style="flex:1;padding:6px 10px;border:1px solid #eef0f3;border-radius:7px;background:#fff;font-family:inherit;font-size:12px;cursor:pointer">קומפקטי</button>
      <button data-v="comfortable" style="flex:1;padding:6px 10px;border:1px solid #eef0f3;border-radius:7px;background:#fff;font-family:inherit;font-size:12px;cursor:pointer">רגיל</button>
    </div>
    <label style="display:block;font-size:11px;color:#6B7280;font-weight:600;margin-bottom:6px">צבע פעולה (כתום הוא ברירת מחדל)</label>
    <input id="tw-color" type="color" value="#E07B39" style="width:100%;height:36px;border:1px solid #eef0f3;border-radius:7px;cursor:pointer"/>
    <div style="font-size:11px;color:#9CA3AF;margin-top:14px;line-height:1.5">לפי מערכת העיצוב, כתום שמור ל-CTA בלבד. שינוי צבע ישפיע רק על כפתורי הפעולה הראשיים.</div>
  `;
  document.body.appendChild(panel);

  function applyDensity(v){
    document.body.style.setProperty('--row-pad', v === 'compact' ? '8px 14px' : '13px 18px');
    document.querySelectorAll('tbody td').forEach(td => td.style.padding = v === 'compact' ? '9px 14px' : '');
    document.querySelectorAll('.kpi').forEach(k => k.style.padding = v === 'compact' ? '14px' : '');
  }
  function applyColor(c){
    document.documentElement.style.setProperty('--orange', c);
    document.querySelectorAll('.btn-cta, .nav-link.active').forEach(el => el.style.background = c);
  }

  let state = Object.assign({}, DEFAULTS);
  applyDensity(state.density); applyColor(state.primaryAccent);

  panel.querySelector('#tw-close').addEventListener('click', () => {
    panel.style.display='none'; active=false;
    window.parent.postMessage({type:'__edit_mode_dismissed'}, '*');
  });
  panel.querySelector('#tw-density').addEventListener('click', e => {
    if(e.target.dataset.v){
      state.density = e.target.dataset.v;
      applyDensity(state.density);
      window.parent.postMessage({type:'__edit_mode_set_keys', edits:{density:state.density}}, '*');
    }
  });
  panel.querySelector('#tw-color').addEventListener('input', e => {
    state.primaryAccent = e.target.value;
    applyColor(state.primaryAccent);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits:{primaryAccent:state.primaryAccent}}, '*');
  });

  window.addEventListener('message', (ev) => {
    if(ev.data?.type === '__activate_edit_mode'){ panel.style.display='block'; active=true; }
    if(ev.data?.type === '__deactivate_edit_mode'){ panel.style.display='none'; active=false; }
  });
  window.parent.postMessage({type:'__edit_mode_available'}, '*');
})();
</script>

</body>
</html>
===== END FILE =====

===== FILE: assets/mockups/corporate_assets_full.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>עוז · ניהול נכסי תאגיד · גרסה מלאה</title>
<link rel="stylesheet" href="corporate-assets/colors_and_type.css"/>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg-page);color:var(--ink);font-family:var(--font-sans)}
  button{font-family:inherit}
  .app{display:grid;grid-template-columns:248px 1fr;min-height:100vh}
  .i{width:18px;height:18px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round;flex:none}
  .i-sm{width:14px;height:14px}
  .i-md{width:20px;height:20px}

  /* Sidebar */
  .side{background:#1B3A6B;color:#fff;padding:22px 14px;display:flex;flex-direction:column;gap:14px;position:sticky;top:0;height:100vh;overflow-y:auto}
  .brand{display:flex;align-items:center;gap:9px;font-size:16px;font-weight:800;padding:0 6px 12px;border-bottom:1px solid rgba(255,255,255,.1)}
  .brand .o{width:30px;height:30px;border-radius:8px;background:#E07B39;display:inline-flex;align-items:center;justify-content:center}
  .brand .sub{font-size:10px;font-weight:600;color:rgba(210,229,250,.6);letter-spacing:.04em;display:block}
  .org{padding:9px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:12px;display:flex;align-items:center;gap:8px;justify-content:space-between;cursor:pointer}
  .org .l{font-size:10px;color:rgba(210,229,250,.6);font-weight:600;letter-spacing:.04em}
  .org .n{font-weight:700}
  .nav-section{display:flex;flex-direction:column;gap:2px}
  .nav-section .label{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:rgba(210,229,250,.5);padding:0 10px 5px;font-weight:700;margin-top:6px}
  .nav-link{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;font-size:13px;font-weight:500;color:rgba(255,255,255,.85);cursor:pointer;border:0;background:transparent;width:100%;text-align:right}
  .nav-link:hover{background:rgba(255,255,255,.08);color:#fff}
  .nav-link.active{background:#E07B39;color:#fff;font-weight:700}
  .nav-link .badge{margin-inline-start:auto;background:rgba(255,255,255,.18);font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:9999px}
  .nav-link.active .badge{background:rgba(255,255,255,.25)}
  .nav-link .dot{margin-inline-start:auto;width:8px;height:8px;background:#E07B39;border-radius:50%}
  .me{margin-top:auto;padding:10px;background:rgba(255,255,255,.06);border-radius:10px;display:flex;align-items:center;gap:10px}
  .me .av{width:32px;height:32px;border-radius:50%;background:#52A375;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}
  .me .who{font-size:12.5px;font-weight:700}
  .me .role{font-size:10.5px;color:rgba(210,229,250,.7)}

  /* Main */
  .main{padding:20px 28px 60px;display:flex;flex-direction:column;gap:18px;min-width:0}
  .topbar{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap}
  .topbar h1{margin:0;font-size:22px;font-weight:800;letter-spacing:-.02em}
  .topbar .sub{font-size:12.5px;color:var(--fg-muted);margin-top:3px}
  .topbar .actions{display:flex;gap:10px;align-items:center}

  .btn-cta{background:#E07B39;color:#fff;padding:9px 16px;border-radius:10px;font-weight:700;font-size:13px;border:0;cursor:pointer;box-shadow:var(--shadow-orange);display:inline-flex;align-items:center;gap:6px}
  .btn-cta:hover{background:#C26A2C}
  .btn-ghost{background:#fff;color:#1B3A6B;padding:8px 13px;border-radius:10px;font-weight:700;font-size:13px;border:1px solid var(--border-default);cursor:pointer;display:inline-flex;align-items:center;gap:6px}
  .btn-ghost:hover{border-color:#1B3A6B}
  .btn-blue{background:#1B3A6B;color:#fff;padding:8px 13px;border-radius:10px;font-weight:700;font-size:13px;border:0;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
  .btn-mini{padding:5px 10px;font-size:12px}

  .tabs{display:flex;gap:2px;padding:4px;background:#fff;border:1px solid #eef0f3;border-radius:11px;width:fit-content}
  .tab{padding:7px 13px;border-radius:8px;font-size:12px;font-weight:700;color:var(--fg-muted);cursor:pointer;border:0;background:transparent;display:inline-flex;align-items:center;gap:5px}
  .tab.on{background:#1B3A6B;color:#fff}
  .tab .c{font-size:10.5px;background:rgba(255,255,255,.2);padding:1px 6px;border-radius:9999px}
  .tab:not(.on) .c{background:#eef0f3;color:#6B7280}

  /* KPIs */
  .kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
  .kpi{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:5px;box-shadow:var(--shadow-sm);position:relative;min-width:0}
  .kpi .label{font-size:11.5px;color:var(--fg-muted);font-weight:600}
  .kpi .value{font-size:23px;font-weight:800;letter-spacing:-.02em;line-height:1.1}
  .kpi .delta{font-size:11px;font-weight:700;color:var(--fg-muted)}
  .kpi .delta.up{color:#2D6A4F}
  .kpi .delta.down{color:#dc2626}
  .kpi .ic{position:absolute;top:12px;left:12px;width:30px;height:30px;border-radius:8px;background:#D2E5FA;color:#1B3A6B;display:flex;align-items:center;justify-content:center}

  /* Panels */
  .panel{background:#fff;border:1px solid #eef0f3;border-radius:14px;box-shadow:var(--shadow-sm);overflow:hidden;min-width:0}
  .panel .ph{padding:13px 18px;border-bottom:1px solid #eef0f3;display:flex;align-items:center;justify-content:space-between;gap:10px}
  .panel h2{margin:0;font-size:14px;font-weight:800}
  .panel .ph small{font-size:11.5px;color:var(--fg-muted)}
  .panel .ph .pa{display:flex;gap:6px;align-items:center}
  .link-btn{font-size:12px;font-weight:700;color:#1B3A6B;padding:5px 8px;border-radius:7px;background:transparent;border:0;cursor:pointer}

  .cols-3-2{display:grid;grid-template-columns:1.6fr 1fr;gap:16px}
  .cols-eq-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .cols-eq-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}

  table{width:100%;border-collapse:collapse}
  thead th{font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg-muted);font-weight:700;text-align:right;padding:9px 16px;background:#fafbfc;border-bottom:1px solid #eef0f3;white-space:nowrap}
  tbody td{padding:11px 16px;border-bottom:1px solid #f3f4f6;font-size:13px}
  tbody tr:hover{background:#fafbfc}

  .row-prop{display:flex;align-items:center;gap:10px}
  .thumb{width:42px;height:32px;border-radius:7px;background-size:cover;background-position:center;flex:none;border:1px solid rgba(0,0,0,.06)}
  .thumb.ph-blue{background:#D2E5FA;color:#1B3A6B;display:flex;align-items:center;justify-content:center}
  .row-prop .t{font-weight:700;font-size:13px}
  .row-prop .m{font-size:11.5px;color:var(--fg-muted)}

  .av-c{width:28px;height:28px;border-radius:50%;background:#52A375;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex:none}
  .av-c.b{background:#1B3A6B}.av-c.o{background:#E07B39}.av-c.g{background:#9CA3AF}
  .av-c.sm{width:22px;height:22px;font-size:10px}
  .av-stack{display:flex}
  .av-stack > *{margin-inline-end:-6px;border:2px solid #fff}

  .pill{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:9999px;font-size:11px;font-weight:700;white-space:nowrap}
  .pill.compact{padding:2px 8px;font-size:10.5px;gap:4px}
  .pill.compact .i-sm{width:11px;height:11px}
  .pill.ver{background:#2D6A4F;color:#fff}
  .pill.ver-b{background:#52A375;color:#fff}
  .pill.pen{background:#fef3e8;color:#E07B39}
  .pill.exp{background:#fef2f2;color:#dc2626}
  .pill.info{background:#D2E5FA;color:#1B3A6B}
  .pill.muted{background:#f3f4f6;color:#6B7280}
  .pill.success{background:rgba(45,106,79,.12);color:#2D6A4F}

  .cap{display:flex;flex-direction:column;gap:4px;min-width:80px}
  .cap-bar{height:5px;background:#eef0f3;border-radius:9999px;overflow:hidden}
  .cap-bar > i{display:block;height:100%;background:#2D6A4F}
  .cap-bar > i.warn{background:#E07B39}
  .cap-bar > i.full{background:#52A375}
  .cap .num{font-size:11.5px;color:var(--fg-muted);font-weight:600}

  .row-act{display:flex;gap:6px;justify-content:flex-end}
  .ico-btn{width:28px;height:28px;border-radius:7px;background:#F7F8FA;color:var(--fg-muted);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #eef0f3}
  .ico-btn:hover{background:#fff;color:#1B3A6B;border-color:#D2E5FA}

  /* Activity */
  .act .item{display:flex;gap:10px;padding:11px 16px;border-bottom:1px solid #f3f4f6;align-items:flex-start}
  .act .item:last-child{border-bottom:0}
  .act .item .ic{flex:none;width:28px;height:28px;border-radius:8px;background:#D2E5FA;color:#1B3A6B;display:inline-flex;align-items:center;justify-content:center}
  .act .item .ic.ver{background:rgba(45,106,79,.12);color:#2D6A4F}
  .act .item .ic.alert{background:#fef2f2;color:#dc2626}
  .act .item .ic.cta{background:#fef3e8;color:#E07B39}
  .act .item .text{font-size:12.5px;line-height:1.5}
  .act .item .when{font-size:10.5px;color:var(--fg-faint);margin-top:2px}

  /* Charts */
  .chart-wrap{padding:16px;display:flex;flex-direction:column;gap:10px}
  .chart-grid{position:relative;height:190px}
  .chart-grid svg{width:100%;height:100%;display:block}
  .legend{display:flex;gap:14px;font-size:11.5px;color:var(--fg-muted);font-weight:600;flex-wrap:wrap}
  .legend .ch{display:inline-flex;align-items:center;gap:5px}
  .legend .sw{width:10px;height:10px;border-radius:3px}

  .donut-wrap{display:flex;align-items:center;gap:18px;padding:16px}
  .donut-wrap svg{width:130px;height:130px;flex:none}
  .donut-legend{flex:1;display:flex;flex-direction:column;gap:5px;font-size:12.5px}
  .donut-legend .row{display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #f3f4f6}
  .donut-legend .row:last-child{border-bottom:0}
  .donut-legend .l{display:inline-flex;align-items:center;gap:7px;font-weight:600}
  .donut-legend .sw{width:10px;height:10px;border-radius:3px}
  .donut-legend .v{font-weight:800}

  .filters{display:flex;gap:8px;align-items:center;padding:11px 16px;background:#fafbfc;border-bottom:1px solid #eef0f3;flex-wrap:wrap}
  .chip{padding:6px 12px;border-radius:9999px;border:1px solid #eef0f3;font-size:12px;font-weight:600;color:var(--fg-muted);background:#fff;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
  .chip.on{background:#1B3A6B;color:#fff;border-color:#1B3A6B}
  .chip .c{background:rgba(255,255,255,.2);padding:0 6px;border-radius:9999px;font-size:10.5px}
  .chip:not(.on) .c{background:#eef0f3;color:#6B7280}
  .search{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;padding:6px 12px;background:#fff;border:1px solid #eef0f3;border-radius:9999px;color:var(--fg-muted);font-size:12.5px}
  .search input{border:0;outline:0;font-family:inherit;font-size:12.5px;flex:1;background:transparent}

  .worker-row{display:grid;grid-template-columns:auto 1fr auto auto auto;gap:14px;align-items:center;padding:11px 16px;border-bottom:1px solid #f3f4f6}
  .worker-row .nm{font-weight:700;font-size:13px}
  .worker-row .meta{font-size:11.5px;color:var(--fg-muted);margin-top:2px}

  .attn{display:flex;gap:12px;padding:13px 16px;background:#fff8f1;border:1px solid #f7d4b0;border-radius:12px;align-items:center}
  .attn .ic{width:32px;height:32px;border-radius:9px;background:#E07B39;color:#fff;display:inline-flex;align-items:center;justify-content:center;flex:none}
  .attn .t{font-size:13px;font-weight:800;color:#1B3A6B}
  .attn .d{font-size:11.5px;color:var(--fg-muted);margin-top:2px}
  .attn .b{margin-inline-start:auto;display:flex;gap:8px}

  /* Map */
  .map-wrap{position:relative;height:380px;background:#eef4fb;overflow:hidden}
  .map-wrap > svg.bg{width:100%;height:100%;display:block}
  .map-pin{position:absolute;transform:translate(-50%,-100%);cursor:pointer}
  .pin-bubble{background:#1B3A6B;color:#fff;padding:5px 10px;border-radius:9999px;font-size:11.5px;font-weight:800;white-space:nowrap;box-shadow:0 4px 10px rgba(27,58,107,.35)}
  .pin-bubble.warn{background:#E07B39;box-shadow:0 4px 10px rgba(224,123,57,.4)}
  .pin-bubble.ver{background:#2D6A4F;box-shadow:0 4px 10px rgba(45,106,79,.35)}
  .pin-tail{width:9px;height:9px;background:inherit;transform:rotate(45deg);margin:-7px auto 0;position:relative;z-index:-1}
  .map-legend{position:absolute;bottom:14px;right:14px;background:#fff;border-radius:10px;padding:10px 12px;box-shadow:var(--shadow-sm);font-size:11.5px;display:flex;flex-direction:column;gap:5px;border:1px solid #eef0f3}
  .map-legend .row{display:inline-flex;align-items:center;gap:6px;font-weight:600}
  .map-legend .sw{width:10px;height:10px;border-radius:50%}

  /* Deal-room */
  .deal-board{display:grid;grid-template-columns:repeat(5,minmax(210px,1fr));gap:12px;padding:16px;overflow-x:auto}
  .deal-col{background:#f7f8fa;border:1px solid #eef0f3;border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;min-width:0}
  .deal-col-h{display:flex;justify-content:space-between;align-items:center;padding:4px 4px 8px;font-size:11px;font-weight:800;color:#1B3A6B;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #eef0f3}
  .deal-col-h .c{background:#1B3A6B;color:#fff;padding:1px 7px;border-radius:9999px;font-size:10px}
  .deal-card{background:#fff;border:1px solid #eef0f3;border-radius:10px;padding:10px;font-size:12px;cursor:grab}
  .deal-card:hover{border-color:#1B3A6B;box-shadow:var(--shadow-sm)}
  .deal-card .h{font-weight:800;font-size:12.5px;margin-bottom:5px}
  .deal-card .m{font-size:11px;color:var(--fg-muted);line-height:1.4}
  .deal-card .ft{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px dashed #eef0f3;font-size:11px}
  .deal-card .ft .a{font-weight:800;color:#1B3A6B}

  /* Calendar */
  .cal{padding:14px;display:grid;grid-template-columns:repeat(7,1fr);gap:4px;font-size:12px}
  .cal-h{text-align:center;font-size:10.5px;color:var(--fg-muted);font-weight:700;padding:4px 0;text-transform:uppercase;letter-spacing:.04em}
  .cal-d{aspect-ratio:1;border:1px solid #eef0f3;border-radius:8px;padding:5px;display:flex;flex-direction:column;gap:2px;font-size:11px;background:#fff;position:relative}
  .cal-d.dim{color:#cbd5e0;background:#fafbfc}
  .cal-d.today{border-color:#E07B39;border-width:2px}
  .cal-d .n{font-weight:700}
  .cal-evt{font-size:9px;font-weight:700;padding:1px 4px;border-radius:4px;background:#D2E5FA;color:#1B3A6B;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cal-evt.warn{background:#fef3e8;color:#E07B39}
  .cal-evt.exp{background:#fef2f2;color:#dc2626}
  .cal-evt.ok{background:rgba(45,106,79,.12);color:#2D6A4F}

  /* Compliance */
  .compliance-row{display:grid;grid-template-columns:auto 1fr auto auto;gap:14px;align-items:center;padding:11px 16px;border-bottom:1px solid #f3f4f6}
  .compliance-row .ck{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex:none}
  .compliance-row .ck.on{background:rgba(45,106,79,.12);color:#2D6A4F}
  .compliance-row .ck.warn{background:#fef3e8;color:#E07B39}
  .compliance-row .nm{font-size:13px;font-weight:700}
  .compliance-row .desc{font-size:11.5px;color:var(--fg-muted)}

  /* Chat */
  .chat{display:grid;grid-template-rows:1fr auto;height:430px}
  .chat-msgs{padding:14px 18px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;background:#fafbfc}
  .msg{display:flex;gap:8px;max-width:78%}
  .msg .b{background:#fff;border:1px solid #eef0f3;border-radius:12px;padding:8px 12px;font-size:12.5px;line-height:1.5}
  .msg.me{margin-inline-start:auto;flex-direction:row-reverse}
  .msg.me .b{background:#1B3A6B;color:#fff;border-color:#1B3A6B}
  .msg .ts{font-size:10px;color:var(--fg-faint);margin-top:3px}
  .chat-comp{padding:11px 16px;border-top:1px solid #eef0f3;display:flex;gap:8px;align-items:center;background:#fff}
  .chat-comp input{flex:1;border:1px solid #eef0f3;border-radius:9999px;padding:8px 14px;font-size:13px;outline:0;font-family:inherit;background:#f7f8fa}

  .view{display:none;flex-direction:column;gap:18px}
  .view.on{display:flex}

  @media (max-width:1180px){ .kpis{grid-template-columns:repeat(3,1fr)} }
  @media (max-width:980px){
    .app{grid-template-columns:1fr}
    .side{position:static;height:auto}
    .kpis{grid-template-columns:repeat(2,1fr)}
    .cols-3-2,.cols-eq-2,.cols-eq-3{grid-template-columns:1fr}
  }
</style>
</head>
<body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></symbol>
    <symbol id="i-building" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="M3 4h8"/></symbol>
    <symbol id="i-coins" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/></symbol>
    <symbol id="i-package" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></symbol>
    <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
    <symbol id="i-bed" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></symbol>
    <symbol id="i-arrow-up" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></symbol>
    <symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></symbol>
    <symbol id="i-chev-down" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></symbol>
    <symbol id="i-chev-right" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></symbol>
    <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>
    <symbol id="i-msg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
    <symbol id="i-scale" viewBox="0 0 24 24"><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
    <symbol id="i-chart" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></symbol>
    <symbol id="i-send" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></symbol>
    <symbol id="i-paperclip" viewBox="0 0 24 24"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></symbol>
    <symbol id="i-filter" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></symbol>
    <symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><line x1="10.85" y1="12.15" x2="19" y2="4"/><line x1="18" y1="5" x2="20" y2="7"/></symbol>
  </defs>
</svg>

<div class="app">

  <!-- Sidebar -->
  <aside class="side">
    <div class="brand">
      <span class="o"><svg class="i" style="stroke:#fff"><use href="#i-hard-hat"/></svg></span>
      <div>עוז · תאגידים<span class="sub">CORPORATE</span></div>
    </div>
    <div class="org">
      <div><div class="l">תאגיד</div><div class="n">ש.אברהמי קבלנות</div></div>
      <svg class="i-sm i" style="opacity:.6"><use href="#i-chev-down"/></svg>
    </div>
    <div class="nav-section">
      <div class="label">סקירה</div>
      <button class="nav-link active" data-view="dashboard"><svg class="i"><use href="#i-grid"/></svg> דאשבורד</button>
      <button class="nav-link" data-view="properties"><svg class="i"><use href="#i-building"/></svg> נכסים <span class="badge">8</span></button>
      <button class="nav-link" data-view="workers"><svg class="i"><use href="#i-users"/></svg> עובדים <span class="badge">87</span></button>
      <button class="nav-link" data-view="map"><svg class="i"><use href="#i-pin"/></svg> מפה</button>
    </div>
    <div class="nav-section">
      <div class="label">פעילות</div>
      <button class="nav-link" data-view="dealroom"><svg class="i"><use href="#i-handshake"/></svg> Deal-room <span class="badge">3</span></button>
      <button class="nav-link" data-view="chat"><svg class="i"><use href="#i-msg"/></svg> תקשורת <span class="dot"></span></button>
      <button class="nav-link" data-view="calendar"><svg class="i"><use href="#i-cal"/></svg> לוח שנה</button>
    </div>
    <div class="nav-section">
      <div class="label">מסחר וציות</div>
      <button class="nav-link" data-view="finance"><svg class="i"><use href="#i-coins"/></svg> תשלומים</button>
      <button class="nav-link" data-view="compliance"><svg class="i"><use href="#i-scale"/></svg> ציות וחוק</button>
      <button class="nav-link" data-view="reports"><svg class="i"><use href="#i-chart"/></svg> דוחות</button>
      <button class="nav-link" data-view="docs"><svg class="i"><use href="#i-package"/></svg> Audit Pack</button>
    </div>
    <div class="me">
      <div class="av">אב</div>
      <div><div class="who">איציק אברהמי</div><div class="role">מנהל לוגיסטיקה</div></div>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">

    <div class="topbar">
      <div>
        <h1 id="page-title">דאשבורד · סקירה כללית</h1>
        <div class="sub">פיילוט גוש דן · 28/04/2026 · עדכון אחרון לפני 4 דק׳</div>
      </div>
      <div class="actions">
        <button class="btn-ghost"><svg class="i"><use href="#i-bell"/></svg></button>
        <button class="btn-ghost"><svg class="i"><use href="#i-download"/></svg> ייצא</button>
        <button class="btn-cta"><svg class="i" style="stroke:#fff"><use href="#i-plus"/></svg> חפש דיור חדש</button>
      </div>
    </div>

    <!-- DASHBOARD -->
    <div class="view on" id="v-dashboard">
      <div class="attn">
        <div class="ic"><svg class="i" style="stroke:#fff"><use href="#i-alert"/></svg></div>
        <div>
          <div class="t">2 חוזים מסתיימים בעוד פחות מ-30 יום</div>
          <div class="d">פתח-תקווה מרכז (פג 19/05) · חולון אגרובנק (פג 22/05). יש להתחיל חידוש או למצוא חלופה.</div>
        </div>
        <div class="b"><button class="btn-ghost btn-mini">הצג</button><button class="btn-cta btn-mini">פתח עסקת חידוש</button></div>
      </div>

      <section class="kpis">
        <div class="kpi"><div class="ic"><svg class="i-md i"><use href="#i-building"/></svg></div><div class="label">נכסים פעילים</div><div class="value">8</div><div class="delta up">+1 החודש</div></div>
        <div class="kpi"><div class="ic" style="background:rgba(45,106,79,.12);color:#2D6A4F"><svg class="i-md i"><use href="#i-bed"/></svg></div><div class="label">תפוסת מיטות</div><div class="value">87 / 96</div><div class="delta up">90.6%</div></div>
        <div class="kpi"><div class="ic" style="background:#fef3e8;color:#E07B39"><svg class="i-md i"><use href="#i-coins"/></svg></div><div class="label">עלות חודשית</div><div class="value">128,400₪</div><div class="delta">≈ 1,476₪/עובד</div></div>
        <div class="kpi"><div class="ic"><svg class="i-md i"><use href="#i-handshake"/></svg></div><div class="label">עסקאות פתוחות</div><div class="value">3</div><div class="delta">~40,400₪</div></div>
        <div class="kpi"><div class="ic" style="background:#fef2f2;color:#dc2626"><svg class="i-md i"><use href="#i-alert"/></svg></div><div class="label">דורש פעולה</div><div class="value">3</div><div class="delta down">2 חוזים · 1 ביקורת</div></div>
      </section>

      <section class="cols-3-2">
        <div class="panel">
          <div class="ph">
            <div><h2>תפוסה · 6 חודשים אחרונים</h2><small>נובמבר 2025 — אפריל 2026</small></div>
            <div class="tabs"><button class="tab on">תפוסה</button><button class="tab">עלות</button></div>
          </div>
          <div class="chart-wrap">
            <div class="chart-grid">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                <line x1="0" y1="40" x2="600" y2="40" stroke="#eef0f3"/>
                <line x1="0" y1="80" x2="600" y2="80" stroke="#eef0f3"/>
                <line x1="0" y1="120" x2="600" y2="120" stroke="#eef0f3"/>
                <line x1="0" y1="160" x2="600" y2="160" stroke="#eef0f3"/>
                <path d="M40,140 L130,110 L220,90 L310,80 L400,55 L490,30 L490,180 L40,180 Z" fill="#D2E5FA" opacity="0.5"/>
                <path d="M40,140 L130,110 L220,90 L310,80 L400,55 L490,30" stroke="#1B3A6B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <circle cx="40" cy="140" r="4" fill="#1B3A6B"/><circle cx="130" cy="110" r="4" fill="#1B3A6B"/><circle cx="220" cy="90" r="4" fill="#1B3A6B"/><circle cx="310" cy="80" r="4" fill="#1B3A6B"/><circle cx="400" cy="55" r="4" fill="#1B3A6B"/>
                <circle cx="490" cy="30" r="5" fill="#E07B39" stroke="#fff" stroke-width="2"/>
                <line x1="0" y1="22" x2="600" y2="22" stroke="#2D6A4F" stroke-dasharray="4 4" opacity="0.6"/>
                <text x="540" y="18" fill="#2D6A4F" font-size="10" font-weight="700">יעד 95%</text>
                <g fill="#9CA3AF" font-size="11" font-weight="600" text-anchor="middle">
                  <text x="40" y="195">נוב׳</text><text x="130" y="195">דצ׳</text><text x="220" y="195">ינו׳</text><text x="310" y="195">פבר׳</text><text x="400" y="195">מרץ</text><text x="490" y="195">אפר׳</text>
                </g>
              </svg>
            </div>
            <div class="legend">
              <span class="ch"><span class="sw" style="background:#1B3A6B"></span>תפוסה</span>
              <span class="ch"><span class="sw" style="background:#2D6A4F;opacity:.6"></span>יעד 95%</span>
              <span class="ch"><span class="sw" style="background:#E07B39"></span>חודש נוכחי · 90.6%</span>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="ph"><h2>פיזור עובדים</h2><small>87 פעילים</small></div>
          <div class="donut-wrap">
            <svg viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="#fff"/>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#1B3A6B" stroke-width="6" stroke-dasharray="43.7 56.3" stroke-dashoffset="25" transform="rotate(-90 21 21)"/>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#52A375" stroke-width="6" stroke-dasharray="25.3 74.7" stroke-dashoffset="-18.7" transform="rotate(-90 21 21)"/>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E07B39" stroke-width="6" stroke-dasharray="17.2 82.8" stroke-dashoffset="-44" transform="rotate(-90 21 21)"/>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#D2E5FA" stroke-width="6" stroke-dasharray="10.3 89.7" stroke-dashoffset="-61.2" transform="rotate(-90 21 21)"/>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#9CA3AF" stroke-width="6" stroke-dasharray="3.5 96.5" stroke-dashoffset="-71.5" transform="rotate(-90 21 21)"/>
              <text x="21" y="22" text-anchor="middle" font-size="6" font-weight="800" fill="#1E1E2E">87</text>
              <text x="21" y="26.5" text-anchor="middle" font-size="2.5" fill="#6B7280" font-weight="600">עובדים</text>
            </svg>
            <div class="donut-legend">
              <div class="row"><span class="l"><span class="sw" style="background:#1B3A6B"></span>סין</span><span class="v">38</span></div>
              <div class="row"><span class="l"><span class="sw" style="background:#52A375"></span>הודו</span><span class="v">22</span></div>
              <div class="row"><span class="l"><span class="sw" style="background:#E07B39"></span>טורקיה</span><span class="v">15</span></div>
              <div class="row"><span class="l"><span class="sw" style="background:#D2E5FA"></span>מולדובה</span><span class="v">9</span></div>
              <div class="row"><span class="l"><span class="sw" style="background:#9CA3AF"></span>אחר</span><span class="v">3</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="cols-3-2">
        <div class="panel">
          <div class="ph">
            <div><h2>הנכסים שלי</h2><small>8 פעילים · 96 מיטות</small></div>
            <button class="link-btn">הצג הכל ←</button>
          </div>
          <table>
            <thead><tr><th>נכס</th><th>סטטוס</th><th>תפוסה</th><th>עלות</th><th>סיום חוזה</th></tr></thead>
            <tbody>
              <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=320&h=240&fit=crop')"></div><div><div class="t">תל-אביב צפון · 10 מיטות</div><div class="m">אבן גבירול</div></div></div></td><td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> A</span></td><td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">10/10</div></div></td><td><strong>13,500₪</strong></td><td>15/03/2027</td></tr>
              <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=320&h=240&fit=crop')"></div><div><div class="t">רמת-גן בורסה · 16 מיטות</div><div class="m">ז'בוטינסקי</div></div></div></td><td><span class="pill ver compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> A</span></td><td><div class="cap"><div class="cap-bar"><i style="width:87%"></i></div><div class="num">14/16</div></div></td><td><strong>19,600₪</strong></td><td>02/11/2026</td></tr>
              <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=320&h=240&fit=crop')"></div><div><div class="t">פתח-תקווה מרכז · 12 מיטות</div><div class="m">ההסתדרות 14</div></div></div></td><td><span class="pill exp compact"><svg class="i-sm i"><use href="#i-alert"/></svg> פג 21י׳</span></td><td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">12/12</div></div></td><td><strong>15,600₪</strong></td><td><span style="color:#dc2626;font-weight:700">19/05/2026</span></td></tr>
              <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=320&h=240&fit=crop')"></div><div><div class="t">חולון אגרובנק · 8 מיטות</div><div class="m">אילת 22</div></div></div></td><td><span class="pill exp compact"><svg class="i-sm i"><use href="#i-alert"/></svg> פג 24י׳</span></td><td><div class="cap"><div class="cap-bar"><i style="width:75%" class="warn"></i></div><div class="num">6/8</div></div></td><td><strong>10,400₪</strong></td><td><span style="color:#dc2626;font-weight:700">22/05/2026</span></td></tr>
              <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1460317442991-0ec209397118?w=320&h=240&fit=crop')"></div><div><div class="t">ראשון-לציון מערב · 14 מיטות</div><div class="m">ההגנה 8</div></div></div></td><td><span class="pill ver-b compact"><svg class="i-sm i" style="stroke:#fff"><use href="#i-check"/></svg> B</span></td><td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">14/14</div></div></td><td><strong>17,500₪</strong></td><td>05/01/2027</td></tr>
            </tbody>
          </table>
        </div>

        <div class="panel">
          <div class="ph"><h2>פעילות אחרונה</h2><small>היום</small></div>
          <div class="act">
            <div class="item"><div class="ic cta"><svg class="i-sm i"><use href="#i-handshake"/></svg></div><div><div class="text">הצעת מחיר חדשה — <strong>בני-ברק 12 מיטות</strong>. ממתינה לאישור מנכ"ל.</div><div class="when">לפני 14 דק׳</div></div></div>
            <div class="item"><div class="ic ver"><svg class="i-sm i"><use href="#i-check"/></svg></div><div><div class="text">אימות פיזי <strong>הושלם</strong> — רמת-גן בורסה. רמה A.</div><div class="when">לפני 2 שעות</div></div></div>
            <div class="item"><div class="ic alert"><svg class="i-sm i"><use href="#i-alert"/></svg></div><div><div class="text"><strong>חולון אגרובנק</strong> — חוזה פג בעוד 24 ימים.</div><div class="when">היום, 09:14</div></div></div>
            <div class="item"><div class="ic"><svg class="i-sm i"><use href="#i-users"/></svg></div><div><div class="text">3 עובדים חדשים שובצו ל-<strong>תל-אביב צפון</strong>.</div><div class="when">אתמול</div></div></div>
            <div class="item"><div class="ic"><svg class="i-sm i"><use href="#i-coins"/></svg></div><div><div class="text">תשלום לחברת ניהול א. — 19,600₪.</div><div class="when">אתמול, 16:42</div></div></div>
          </div>
        </div>
      </section>
    </div>

    <!-- MAP -->
    <div class="view" id="v-map">
      <div class="panel">
        <div class="ph">
          <div><h2>מפת נכסים · גוש דן</h2><small>8 נכסים פעילים · 87 עובדים משובצים</small></div>
          <div class="tabs"><button class="tab on">הכל <span class="c">8</span></button><button class="tab">מאומת A <span class="c">3</span></button><button class="tab">דורש חידוש <span class="c">2</span></button></div>
        </div>
        <div class="map-wrap">
          <svg class="bg" viewBox="0 0 800 400" preserveAspectRatio="none">
            <rect x="0" y="0" width="800" height="400" fill="#e8f1fb"/>
            <path d="M180,0 Q200,50 220,80 Q260,140 300,180 Q360,220 380,260 Q420,320 440,380 L800,380 L800,0 Z" fill="#f7f8fa" stroke="#d6deea"/>
            <path d="M260,90 L420,150 L560,250 L720,360" stroke="#cfd8e6" stroke-width="2" fill="none" stroke-dasharray="4 6"/>
            <path d="M340,40 L380,200 L440,360" stroke="#cfd8e6" stroke-width="2" fill="none" stroke-dasharray="4 6"/>
            <g font-size="11" fill="#94a3b8" font-weight="600">
              <text x="350" y="120">תל-אביב</text><text x="500" y="170">רמת-גן</text><text x="600" y="120">בני-ברק</text><text x="640" y="220">פתח-תקווה</text><text x="380" y="280">חולון</text><text x="430" y="350">ראשון-לציון</text>
            </g>
          </svg>
          <div class="map-pin" style="top:38%;left:48%"><div class="pin-bubble ver">תל-אביב · 10/10</div><div class="pin-tail" style="background:#2D6A4F"></div></div>
          <div class="map-pin" style="top:48%;left:62%"><div class="pin-bubble ver">רמת-גן · 14/16</div><div class="pin-tail" style="background:#2D6A4F"></div></div>
          <div class="map-pin" style="top:36%;left:73%"><div class="pin-bubble">בני-ברק · 0/12</div><div class="pin-tail" style="background:#1B3A6B"></div></div>
          <div class="map-pin" style="top:60%;left:78%"><div class="pin-bubble warn">פ"ת · פג 21י׳</div><div class="pin-tail" style="background:#E07B39"></div></div>
          <div class="map-pin" style="top:74%;left:50%"><div class="pin-bubble warn">חולון · פג 24י׳</div><div class="pin-tail" style="background:#E07B39"></div></div>
          <div class="map-pin" style="top:88%;left:56%"><div class="pin-bubble">ראשל"צ · 14/14</div><div class="pin-tail" style="background:#1B3A6B"></div></div>
          <div class="map-legend">
            <div class="row"><span class="sw" style="background:#2D6A4F"></span>מאומת A</div>
            <div class="row"><span class="sw" style="background:#E07B39"></span>דורש חידוש</div>
            <div class="row"><span class="sw" style="background:#1B3A6B"></span>פעיל / בקליטה</div>
          </div>
        </div>
      </div>

      <section class="cols-eq-2">
        <div class="panel">
          <div class="ph"><h2>זמני נסיעה לאתרי בנייה</h2><small>5 אתרים</small></div>
          <div style="padding:6px 16px">
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px"><span><strong>אתר נווה צדק</strong> · ת"א</span><span class="pill compact success">12 דק׳</span></div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px"><span><strong>אתר הקריה</strong> · ר"ג</span><span class="pill compact success">18 דק׳</span></div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px"><span><strong>אתר מתחם דרבי</strong> · פ"ת</span><span class="pill compact pen">35 דק׳</span></div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px"><span><strong>אתר חוף הכרמל</strong> · ראשל"צ</span><span class="pill compact pen">42 דק׳</span></div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;font-size:13px"><span><strong>אתר אגרובנק</strong> · חולון</span><span class="pill compact success">8 דק׳</span></div>
          </div>
        </div>
        <div class="panel">
          <div class="ph"><h2>תפוסה לפי אזור</h2><small>אפריל 2026</small></div>
          <div style="padding:14px 18px">
            <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px"><strong>תל-אביב</strong><span class="pill compact ver">100%</span></div><div class="cap-bar"><i style="width:100%" class="full"></i></div></div>
            <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px"><strong>רמת-גן</strong><span class="pill compact success">87%</span></div><div class="cap-bar"><i style="width:87%"></i></div></div>
            <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px"><strong>פתח-תקווה</strong><span class="pill compact ver">100%</span></div><div class="cap-bar"><i style="width:100%" class="full"></i></div></div>
            <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px"><strong>חולון</strong><span class="pill compact pen">75%</span></div><div class="cap-bar"><i style="width:75%" class="warn"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px"><strong>ראשון-לציון</strong><span class="pill compact ver">100%</span></div><div class="cap-bar"><i style="width:100%" class="full"></i></div></div>
          </div>
        </div>
      </section>
    </div>

    <!-- DEAL ROOM -->
    <div class="view" id="v-dealroom">
      <div class="panel">
        <div class="ph">
          <div><h2>Deal-room · ניהול מחזור עסקה</h2><small>3 עסקאות פתוחות · ערך מצטבר ~40,400₪/חודש</small></div>
          <button class="btn-cta btn-mini"><svg class="i-sm i" style="stroke:#fff"><use href="#i-plus"/></svg> עסקה חדשה</button>
        </div>
        <div class="filters">
          <button class="chip on">הכל <span class="c">3</span></button>
          <button class="chip">חידושים <span class="c">2</span></button>
          <button class="chip">דיור חדש <span class="c">1</span></button>
          <div class="search"><svg class="i-sm i"><use href="#i-search"/></svg><input type="text" placeholder="חפש לפי בעל נכס, עיר…"/></div>
        </div>
        <div class="deal-board">
          <div class="deal-col">
            <div class="deal-col-h">פנייה <span class="c">2</span></div>
            <div class="deal-card"><div class="h">חולון · 8 מיטות (חלופה)</div><div class="m">3 הצעות · ב.בן-עמי, ע.ח, נדל"ן הצפון</div><div class="m" style="margin-top:5px">בדיקת התאמה: 4 מ"ר ✓</div><div class="ft"><div class="av-stack"><div class="av-c sm o">אב</div><div class="av-c sm b">דב</div></div><div class="a">~10,400₪</div></div></div>
            <div class="deal-card"><div class="h">ראשון-לציון מזרח · 8 מיטות</div><div class="m">בעל נכס: ק.רכושים</div><div class="m" style="margin-top:5px">סיור מתוכנן: 02/05</div><div class="ft"><div class="av-stack"><div class="av-c sm o">אב</div></div><div class="a">~9,200₪</div></div></div>
          </div>
          <div class="deal-col">
            <div class="deal-col-h">בדיקה <span class="c">1</span></div>
            <div class="deal-card"><div class="h">בני-ברק · 12 מיטות 🆕</div><div class="m">בעל נכס: גורן השקעות</div><div class="m" style="margin-top:5px">ביקורת בוצעה 27/04 · A תלויה</div><div class="ft"><div class="av-stack"><div class="av-c sm b">דב</div></div><div class="a">14,400₪</div></div></div>
          </div>
          <div class="deal-col">
            <div class="deal-col-h">הצעה <span class="c">1</span></div>
            <div class="deal-card"><div class="h">בני-ברק · 12 מיטות</div><div class="m">14,400₪/חודש · 24 חודשים</div><div class="m" style="margin-top:5px">ממתין לאישור מנכ"ל</div><div class="ft"><div class="av-stack"><div class="av-c sm o">אב</div></div><div class="a">14,400₪</div></div></div>
          </div>
          <div class="deal-col">
            <div class="deal-col-h">חוזה <span class="c">1</span></div>
            <div class="deal-card"><div class="h">פתח-תקווה (חידוש)</div><div class="m">ה.כהן · 24 חודשים נוספים</div><div class="m" style="margin-top:5px">חוזה דיגיטלי · 2/3 חתמו</div><div class="ft"><div class="av-stack"><div class="av-c sm b">דב</div><div class="av-c sm o">אב</div></div><div class="a">15,600₪</div></div></div>
          </div>
          <div class="deal-col">
            <div class="deal-col-h">הושלם השבוע <span class="c">2</span></div>
            <div class="deal-card" style="opacity:.85"><div class="h">תל-אביב צפון · חידוש</div><div class="m">חתום 22/04 · עמלה שולמה</div><div class="ft"><span class="pill compact ver">✓</span><div class="a">13,500₪</div></div></div>
            <div class="deal-card" style="opacity:.85"><div class="h">רמת-גן · ביקורת</div><div class="m">אומת A · בתוקף 02/11/2026</div><div class="ft"><span class="pill compact ver">✓</span><div class="a">—</div></div></div>
          </div>
        </div>
      </div>

      <section class="cols-3-2">
        <div class="panel">
          <div class="ph"><h2>בני-ברק · תיק עסקה</h2><small>נפתחה 21/04 · 7 ימי פעילות</small></div>
          <div style="padding:14px 18px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
            <div><div style="font-size:11px;color:var(--fg-muted);font-weight:600;margin-bottom:4px">בעל נכס</div><div style="font-weight:700;font-size:13px">גורן השקעות</div></div>
            <div><div style="font-size:11px;color:var(--fg-muted);font-weight:600;margin-bottom:4px">סוג עסקה</div><div style="font-weight:700;font-size:13px">B2B · נכס שלם</div></div>
            <div><div style="font-size:11px;color:var(--fg-muted);font-weight:600;margin-bottom:4px">משך חוזה</div><div style="font-weight:700;font-size:13px">24 חודשים</div></div>
            <div><div style="font-size:11px;color:var(--fg-muted);font-weight:600;margin-bottom:4px">מחיר חודשי</div><div style="font-weight:700;font-size:13px">14,400₪</div></div>
            <div><div style="font-size:11px;color:var(--fg-muted);font-weight:600;margin-bottom:4px">עמלת עוז</div><div style="font-weight:700;font-size:13px">5%</div></div>
            <div><div style="font-size:11px;color:var(--fg-muted);font-weight:600;margin-bottom:4px">מתחיל</div><div style="font-weight:700;font-size:13px">04/05/2026</div></div>
          </div>
          <div style="border-top:1px solid #eef0f3;padding:14px 18px;display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;align-items:center;gap:10px;font-size:12.5px"><span style="width:22px;height:22px;border-radius:50%;background:rgba(45,106,79,.12);color:#2D6A4F;display:inline-flex;align-items:center;justify-content:center"><svg class="i-sm i"><use href="#i-check"/></svg></span><strong>פנייה התקבלה</strong> · 21/04</div>
            <div style="display:flex;align-items:center;gap:10px;font-size:12.5px"><span style="width:22px;height:22px;border-radius:50%;background:rgba(45,106,79,.12);color:#2D6A4F;display:inline-flex;align-items:center;justify-content:center"><svg class="i-sm i"><use href="#i-check"/></svg></span><strong>סיור פיזי</strong> · 23/04 — 4.2 מ"ר/עובד ✓</div>
            <div style="display:flex;align-items:center;gap:10px;font-size:12.5px"><span style="width:22px;height:22px;border-radius:50%;background:rgba(45,106,79,.12);color:#2D6A4F;display:inline-flex;align-items:center;justify-content:center"><svg class="i-sm i"><use href="#i-check"/></svg></span><strong>בדיקת רישוי</strong> · 25/04 ✓</div>
            <div style="display:flex;align-items:center;gap:10px;font-size:12.5px;color:#E07B39"><span style="width:22px;height:22px;border-radius:50%;background:#fef3e8;color:#E07B39;display:inline-flex;align-items:center;justify-content:center"><svg class="i-sm i"><use href="#i-clock"/></svg></span><strong>ממתין לאישור מנכ"ל</strong> · נשלח 27/04</div>
            <div style="display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--fg-faint)"><span style="width:22px;height:22px;border-radius:50%;background:#f3f4f6"></span>חתימה דיגיטלית</div>
            <div style="display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--fg-faint)"><span style="width:22px;height:22px;border-radius:50%;background:#f3f4f6"></span>תשלום ראשון</div>
          </div>
          <div style="border-top:1px solid #eef0f3;padding:12px 18px;display:flex;gap:10px;justify-content:flex-end">
            <button class="btn-ghost btn-mini">צפייה בחוזה</button>
            <button class="btn-blue btn-mini">תזכורת למנכ"ל</button>
            <button class="btn-cta btn-mini">אישור והמשך</button>
          </div>
        </div>

        <div class="panel">
          <div class="ph"><h2>מסמכים בעסקה</h2><small>5 קבצים</small></div>
          <div class="act">
            <div class="item"><div class="ic"><svg class="i-sm i"><use href="#i-file"/></svg></div><div><div class="text"><strong>הצעת מחיר v2.pdf</strong></div><div class="when">27/04 · 248 KB</div></div></div>
            <div class="item"><div class="ic ver"><svg class="i-sm i"><use href="#i-check"/></svg></div><div><div class="text"><strong>דו"ח ביקורת פיזית.pdf</strong></div><div class="when">23/04 · אומת</div></div></div>
            <div class="item"><div class="ic"><svg class="i-sm i"><use href="#i-file"/></svg></div><div><div class="text"><strong>טופס 4 — בני-ברק.pdf</strong></div><div class="when">25/04 · 320 KB</div></div></div>
            <div class="item"><div class="ic"><svg class="i-sm i"><use href="#i-file"/></svg></div><div><div class="text"><strong>תעודת זיהוי בעל נכס.pdf</strong></div><div class="when">22/04</div></div></div>
            <div class="item"><div class="ic"><svg class="i-sm i"><use href="#i-file"/></svg></div><div><div class="text"><strong>חוזה שכירות — טיוטה.docx</strong></div><div class="when">26/04</div></div></div>
          </div>
        </div>
      </section>
    </div>

    <!-- WORKERS -->
    <div class="view" id="v-workers">
      <div class="panel">
        <div class="ph">
          <div><h2>עובדים · 87 פעילים</h2><small>לחץ עובד לפרטים — אשרה, חוזה, מיטה</small></div>
          <div class="pa"><button class="btn-ghost btn-mini">ייבוא Excel</button><button class="btn-cta btn-mini"><svg class="i-sm i" style="stroke:#fff"><use href="#i-plus"/></svg> עובד חדש</button></div>
        </div>
        <div class="filters">
          <button class="chip on">פעיל <span class="c">87</span></button>
          <button class="chip">בקליטה <span class="c">3</span></button>
          <button class="chip">אשרה פגה תוך 60י׳ <span class="c">5</span></button>
          <div class="search"><svg class="i-sm i"><use href="#i-search"/></svg><input type="text" placeholder="חפש שם / מס׳ דרכון…"/></div>
        </div>
        <div>
          <div class="worker-row"><div class="av-c b">CL</div><div><div class="nm">Chen Liwei · 陈立伟</div><div class="meta">דרכון EA8472193 · סין · אשרה: עד 02/2027</div></div><div><span class="pill compact info">תל-אביב צפון · מיטה 3</span></div><div><span class="pill compact ver">פעיל</span></div><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span></div></div>
          <div class="worker-row"><div class="av-c o">RS</div><div><div class="nm">Raj Singh · राज सिंह</div><div class="meta">דרכון N3491823 · הודו · אשרה: עד 11/2026</div></div><div><span class="pill compact info">רמת-גן · מיטה 7</span></div><div><span class="pill compact ver">פעיל</span></div><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span></div></div>
          <div class="worker-row"><div class="av-c b">MK</div><div><div class="nm">Mehmet Kara</div><div class="meta">דרכון U22918374 · טורקיה · אשרה: עד 06/2026</div></div><div><span class="pill compact info">פתח-תקווה · מיטה 11</span></div><div><span class="pill compact pen">אשרה ב-46י׳</span></div><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span></div></div>
          <div class="worker-row"><div class="av-c g">DO</div><div><div class="nm">Dimitri Ostrowski</div><div class="meta">דרכון M7843921 · מולדובה · אשרה: עד 03/2027</div></div><div><span class="pill compact info">חולון · מיטה 2</span></div><div><span class="pill compact ver">פעיל</span></div><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span></div></div>
          <div class="worker-row"><div class="av-c o">WX</div><div><div class="nm">Wang Xiaoming · 王小明</div><div class="meta">דרכון EE9128473 · סין · אשרה: עד 09/2026</div></div><div><span class="pill compact info">ראשל"צ · מיטה 12</span></div><div><span class="pill compact ver">פעיל</span></div><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span></div></div>
          <div class="worker-row"><div class="av-c b">PK</div><div><div class="nm">Priya Kumar</div><div class="meta">דרכון N7621534 · הודו · אשרה: עד 04/2027</div></div><div><span class="pill compact muted">לא משובצת</span></div><div><span class="pill compact pen">בקליטה</span></div><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span></div></div>
        </div>
      </div>
    </div>

    <!-- COMPLIANCE -->
    <div class="view" id="v-compliance">
      <div class="panel">
        <div class="ph">
          <div><h2>ציות וחוק · 8 נכסים</h2><small>בדיקה אוטומטית · עודכן 28/04 06:00</small></div>
          <button class="btn-cta btn-mini"><svg class="i-sm i" style="stroke:#fff"><use href="#i-package"/></svg> ייצא Audit Pack</button>
        </div>
        <div class="compliance-row" style="background:#f5f9f6"><span class="ck on"><svg class="i-sm i"><use href="#i-check"/></svg></span><div><div class="nm">דרישת מינ׳ 4 מ"ר/עובד · כל הנכסים</div><div class="desc">96 מיטות · ממוצע 4.7 מ"ר · ערך נמוך 4.1 מ"ר</div></div><span class="pill compact success">עומד</span><button class="link-btn">פירוט ←</button></div>
        <div class="compliance-row"><span class="ck warn"><svg class="i-sm i"><use href="#i-alert"/></svg></span><div><div class="nm">תוקף אימות פיזי · 2 פגים תוך 30י׳</div><div class="desc">פתח-תקווה (19/05) · חולון (22/05). תזמן ביקורת חידוש.</div></div><span class="pill compact pen">דרוש פעולה</span><button class="link-btn">תזמן ←</button></div>
        <div class="compliance-row"><span class="ck on"><svg class="i-sm i"><use href="#i-check"/></svg></span><div><div class="nm">חשבוניות מס B2B · 12 חודשים</div><div class="desc">12/12 חודשים · 1,540,800₪ · מוכן לקיזוז מע"מ</div></div><span class="pill compact success">עומד</span><button class="link-btn">הורד ←</button></div>
        <div class="compliance-row"><span class="ck on"><svg class="i-sm i"><use href="#i-check"/></svg></span><div><div class="nm">אשרות עבודה תקפות · 87 עובדים</div><div class="desc">82 תקפות מעל 6 חודשים · 5 פגות תוך 60י׳</div></div><span class="pill compact success">עומד</span><button class="link-btn">פירוט ←</button></div>
        <div class="compliance-row"><span class="ck on"><svg class="i-sm i"><use href="#i-check"/></svg></span><div><div class="nm">טופס 4 / רישוי לכל נכס</div><div class="desc">8/8 נכסים — תיוק דיגיטלי</div></div><span class="pill compact success">עומד</span><button class="link-btn">צפייה ←</button></div>
        <div class="compliance-row"><span class="ck warn"><svg class="i-sm i"><use href="#i-alert"/></svg></span><div><div class="nm">בדיקת בטיחות אש שנתית · 1 נכס</div><div class="desc">חולון אגרובנק — בדיקה אחרונה 06/2025. נדרש חידוש 06/2026.</div></div><span class="pill compact pen">בקרוב</span><button class="link-btn">תזמן ←</button></div>
      </div>
    </div>

    <!-- CHAT -->
    <div class="view" id="v-chat">
      <section class="cols-eq-2">
        <div class="panel">
          <div class="ph"><h2>שיחות פעילות</h2><small>4 שיחות · 2 לא נקראו</small></div>
          <div class="act">
            <div class="item" style="background:#fff8f1"><div class="av-c o">גה</div><div style="flex:1"><div class="text"><strong>גורן השקעות</strong> · בעל נכס</div><div class="when">"מחיר נראה סביר. מתי נסגור?" · לפני 12 דק׳</div></div></div>
            <div class="item"><div class="av-c b">ער</div><div style="flex:1"><div class="text"><strong>ערן רותם</strong> · עוז ops</div><div class="when">דו"ח אימות ר"ג מצורף · לפני שעה</div></div></div>
            <div class="item"><div class="av-c g">הכ</div><div style="flex:1"><div class="text"><strong>ה.כהן</strong> · בעל נכס פ"ת</div><div class="when">"החוזה אצל עו"ד עד מחר" · אתמול</div></div></div>
            <div class="item"><div class="av-c b">צו</div><div style="flex:1"><div class="text"><strong>צוות רישוי</strong> · עוז</div><div class="when">פגישה תוקנעה ל-04/05 · אתמול</div></div></div>
          </div>
        </div>
        <div class="panel">
          <div class="ph">
            <div style="display:flex;align-items:center;gap:10px"><div class="av-c o">גה</div><div><h2 style="font-size:13.5px">גורן השקעות</h2><small>בעל נכס · בני-ברק 12 מיטות</small></div></div>
          </div>
          <div class="chat">
            <div class="chat-msgs">
              <div class="msg"><div class="av-c sm o">גה</div><div><div class="b">שלום איציק, ראיתי שהבדיקה הפיזית עברה. כבר חתמתם פנימית?</div><div class="ts">10:42</div></div></div>
              <div class="msg me"><div><div class="b">היי, חכה רגע — אני מעלה לאישור המנכ"ל הבוקר. תשובה תוך יום-יומיים.</div><div class="ts">11:08</div></div></div>
              <div class="msg"><div class="av-c sm o">גה</div><div><div class="b">בסדר. שלחתי לך טופס 4 מעודכן + ביטוח מבנה. הכל ב-Deal-room.</div><div class="ts">11:14</div></div></div>
              <div class="msg me"><div><div class="b">מצוין, ראיתי. הציוד שכבר הוזמן (מקררים + ארונות) יגיע 03/05.</div><div class="ts">11:20</div></div></div>
              <div class="msg"><div class="av-c sm o">גה</div><div><div class="b">מחיר נראה סביר. מתי נסגור?</div><div class="ts">14:32</div></div></div>
            </div>
            <div class="chat-comp">
              <button class="ico-btn"><svg class="i-sm i"><use href="#i-paperclip"/></svg></button>
              <input type="text" placeholder="כתוב הודעה…"/>
              <button class="btn-cta btn-mini"><svg class="i-sm i" style="stroke:#fff"><use href="#i-send"/></svg></button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- CALENDAR -->
    <div class="view" id="v-calendar">
      <div class="panel">
        <div class="ph">
          <div><h2>לוח שנה · מאי 2026</h2><small>ביקורות, חתימות, סיומי חוזה</small></div>
          <div class="pa">
            <button class="ico-btn"><svg class="i-sm i"><use href="#i-chev-right"/></svg></button>
            <span style="font-size:13px;font-weight:700;padding:0 10px">מאי 2026</span>
            <button class="ico-btn"><svg class="i-sm i"><use href="#i-chev-left"/></svg></button>
          </div>
        </div>
        <div class="cal">
          <div class="cal-h">א׳</div><div class="cal-h">ב׳</div><div class="cal-h">ג׳</div><div class="cal-h">ד׳</div><div class="cal-h">ה׳</div><div class="cal-h">ו׳</div><div class="cal-h">ש׳</div>
          <div class="cal-d dim"><div class="n">26</div></div>
          <div class="cal-d dim"><div class="n">27</div></div>
          <div class="cal-d today"><div class="n">28</div><div class="cal-evt">סקירת שבוע</div></div>
          <div class="cal-d"><div class="n">29</div><div class="cal-evt warn">תזכורת מנכ"ל</div></div>
          <div class="cal-d"><div class="n">30</div></div>
          <div class="cal-d dim"><div class="n">1</div><div class="cal-evt">חג</div></div>
          <div class="cal-d dim"><div class="n">2</div><div class="cal-evt">סיור ראשל"צ</div></div>
          <div class="cal-d"><div class="n">3</div><div class="cal-evt ok">אספקת ציוד · ב"ב</div></div>
          <div class="cal-d"><div class="n">4</div><div class="cal-evt ok">חתימת חוזה ב"ב</div></div>
          <div class="cal-d"><div class="n">5</div></div>
          <div class="cal-d"><div class="n">6</div><div class="cal-evt">שיבוץ 12 עובדים</div></div>
          <div class="cal-d"><div class="n">7</div></div>
          <div class="cal-d dim"><div class="n">8</div></div>
          <div class="cal-d dim"><div class="n">9</div></div>
          <div class="cal-d"><div class="n">10</div></div>
          <div class="cal-d"><div class="n">11</div><div class="cal-evt warn">ביקורת חידוש פ"ת</div></div>
          <div class="cal-d"><div class="n">12</div></div>
          <div class="cal-d"><div class="n">13</div><div class="cal-evt warn">ביקורת חידוש חולון</div></div>
          <div class="cal-d"><div class="n">14</div></div>
          <div class="cal-d dim"><div class="n">15</div></div>
          <div class="cal-d dim"><div class="n">16</div></div>
          <div class="cal-d"><div class="n">17</div></div>
          <div class="cal-d"><div class="n">18</div></div>
          <div class="cal-d"><div class="n">19</div><div class="cal-evt exp">סיום חוזה פ"ת</div></div>
          <div class="cal-d"><div class="n">20</div></div>
          <div class="cal-d"><div class="n">21</div></div>
          <div class="cal-d dim"><div class="n">22</div><div class="cal-evt exp">סיום חוזה חולון</div></div>
          <div class="cal-d dim"><div class="n">23</div></div>
          <div class="cal-d"><div class="n">24</div></div>
          <div class="cal-d"><div class="n">25</div><div class="cal-evt">דו"ח חודשי</div></div>
          <div class="cal-d"><div class="n">26</div></div>
          <div class="cal-d"><div class="n">27</div></div>
          <div class="cal-d"><div class="n">28</div></div>
          <div class="cal-d dim"><div class="n">29</div></div>
          <div class="cal-d dim"><div class="n">30</div></div>
        </div>
      </div>
    </div>

    <!-- FINANCE -->
    <div class="view" id="v-finance">
      <section class="kpis" style="grid-template-columns:repeat(4,1fr)">
        <div class="kpi"><div class="ic" style="background:#fef3e8;color:#E07B39"><svg class="i-md i"><use href="#i-coins"/></svg></div><div class="label">חשבונית חודשית</div><div class="value">128,400₪</div><div class="delta up">+5.2% מ-3/26</div></div>
        <div class="kpi"><div class="ic" style="background:rgba(45,106,79,.12);color:#2D6A4F"><svg class="i-md i"><use href="#i-check"/></svg></div><div class="label">שולם החודש</div><div class="value">128,400₪</div><div class="delta up">100% בזמן</div></div>
        <div class="kpi"><div class="ic"><svg class="i-md i"><use href="#i-package"/></svg></div><div class="label">קיזוז מע"מ צפוי</div><div class="value">21,828₪</div><div class="delta">17%</div></div>
        <div class="kpi"><div class="ic" style="background:#fef2f2;color:#dc2626"><svg class="i-md i"><use href="#i-clock"/></svg></div><div class="label">בהמתנה</div><div class="value">0</div><div class="delta">הכל בזמן</div></div>
      </section>
      <div class="panel">
        <div class="ph"><h2>תשלומים אחרונים</h2><small>אפריל 2026 · 8 חיובים</small></div>
        <table>
          <thead><tr><th>תאריך</th><th>נכס / בעל נכס</th><th>סכום</th><th>חשבונית</th><th>סטטוס</th></tr></thead>
          <tbody>
            <tr><td>22/04</td><td><strong>תל-אביב צפון</strong> · א.שרון נדל"ן</td><td><strong>13,500₪</strong></td><td>INV-2604-001</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>רמת-גן בורסה</strong> · גורן השקעות</td><td><strong>19,600₪</strong></td><td>INV-2604-002</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>פתח-תקווה</strong> · ה.כהן</td><td><strong>15,600₪</strong></td><td>INV-2604-003</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>חולון אגרובנק</strong> · ב.בן-עמי</td><td><strong>10,400₪</strong></td><td>INV-2604-004</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>ראשל"צ מערב</strong> · דקלאור</td><td><strong>17,500₪</strong></td><td>INV-2604-005</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>תל-אביב יפו</strong> · ק.רכושים</td><td><strong>12,800₪</strong></td><td>INV-2604-006</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>ר"ג מערב</strong> · ע.ח קבלנות</td><td><strong>14,600₪</strong></td><td>INV-2604-007</td><td><span class="pill compact ver">שולם</span></td></tr>
            <tr><td>22/04</td><td><strong>חולון מזרח</strong> · נדל"ן הצפון</td><td><strong>24,400₪</strong></td><td>INV-2604-008</td><td><span class="pill compact ver">שולם</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- REPORTS -->
    <div class="view" id="v-reports">
      <section class="cols-eq-2">
        <div class="panel">
          <div class="ph"><h2>עלות ממוצעת לעובד</h2><small>12 חודשים</small></div>
          <div class="chart-wrap">
            <div class="chart-grid">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                <line x1="0" y1="40" x2="600" y2="40" stroke="#eef0f3"/>
                <line x1="0" y1="80" x2="600" y2="80" stroke="#eef0f3"/>
                <line x1="0" y1="120" x2="600" y2="120" stroke="#eef0f3"/>
                <line x1="0" y1="160" x2="600" y2="160" stroke="#eef0f3"/>
                <g fill="#1B3A6B">
                  <rect x="20" y="80" width="32" height="100" rx="3"/><rect x="68" y="70" width="32" height="110" rx="3"/><rect x="116" y="74" width="32" height="106" rx="3"/><rect x="164" y="64" width="32" height="116" rx="3"/><rect x="212" y="60" width="32" height="120" rx="3"/><rect x="260" y="50" width="32" height="130" rx="3"/><rect x="308" y="44" width="32" height="136" rx="3"/><rect x="356" y="40" width="32" height="140" rx="3"/><rect x="404" y="38" width="32" height="142" rx="3"/><rect x="452" y="42" width="32" height="138" rx="3"/><rect x="500" y="46" width="32" height="134" rx="3"/>
                </g>
                <rect x="548" y="50" width="32" height="130" rx="3" fill="#E07B39"/>
              </svg>
            </div>
            <div class="legend"><span class="ch"><span class="sw" style="background:#1B3A6B"></span>עלות ממוצעת/עובד</span><span class="ch"><span class="sw" style="background:#E07B39"></span>חודש נוכחי · 1,476₪</span></div>
          </div>
        </div>
        <div class="panel">
          <div class="ph"><h2>שביעות רצון מנכ"ל</h2><small>14 עסקאות שהושלמו ב-2026</small></div>
          <div style="padding:16px 18px">
            <div style="font-size:38px;font-weight:800;color:#1B3A6B;letter-spacing:-.02em">4.7<span style="font-size:15px;color:#9CA3AF;font-weight:600">/5</span></div>
            <div style="font-size:12px;color:var(--fg-muted);margin-bottom:14px">ניקוד פנימי לפי עסקאות</div>
            <div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><strong>זמן עד דיור</strong><span>4.9</span></div><div class="cap-bar"><i style="width:98%" class="full"></i></div></div>
            <div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><strong>תאימות חוקית</strong><span>5.0</span></div><div class="cap-bar"><i style="width:100%" class="full"></i></div></div>
            <div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><strong>איכות מגורים</strong><span>4.6</span></div><div class="cap-bar"><i style="width:92%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><strong>תהליך תשלום</strong><span>4.4</span></div><div class="cap-bar"><i style="width:88%"></i></div></div>
          </div>
        </div>
      </section>
      <div class="panel">
        <div class="ph"><h2>דוחות זמינים</h2><small>הורדה ב-PDF / Excel</small></div>
        <div class="cols-eq-3" style="padding:18px;gap:14px">
          <div style="border:1px solid #eef0f3;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px"><svg class="i" style="color:#1B3A6B"><use href="#i-chart"/></svg><strong style="font-size:13.5px">דו"ח חודשי</strong><small>תפוסה, עלות, אירועים · אפריל 2026</small><button class="btn-ghost btn-mini" style="margin-top:6px;justify-content:center"><svg class="i-sm i"><use href="#i-download"/></svg> PDF</button></div>
          <div style="border:1px solid #eef0f3;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px"><svg class="i" style="color:#2D6A4F"><use href="#i-scale"/></svg><strong style="font-size:13.5px">דו"ח ציות שנתי</strong><small>2025 · 100% עומד</small><button class="btn-ghost btn-mini" style="margin-top:6px;justify-content:center"><svg class="i-sm i"><use href="#i-download"/></svg> PDF</button></div>
          <div style="border:1px solid #eef0f3;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px"><svg class="i" style="color:#E07B39"><use href="#i-coins"/></svg><strong style="font-size:13.5px">חשבוניות לקיזוז</strong><small>Q1 2026 · 12 חשבוניות · 384,200₪</small><button class="btn-ghost btn-mini" style="margin-top:6px;justify-content:center"><svg class="i-sm i"><use href="#i-download"/></svg> Excel</button></div>
        </div>
      </div>
    </div>

    <!-- DOCS -->
    <div class="view" id="v-docs">
      <div class="panel">
        <div class="ph">
          <div><h2>Audit Pack · ארכיון מלא</h2><small>92 קבצים · 248 MB · עודכן 28/04 06:00</small></div>
          <button class="btn-cta btn-mini"><svg class="i-sm i" style="stroke:#fff"><use href="#i-download"/></svg> הורד הכל (ZIP)</button>
        </div>
        <div class="filters">
          <button class="chip on">כל הקבצים <span class="c">92</span></button>
          <button class="chip">חוזים <span class="c">8</span></button>
          <button class="chip">אימותים <span class="c">14</span></button>
          <button class="chip">חשבוניות <span class="c">48</span></button>
          <button class="chip">טפסים <span class="c">22</span></button>
          <div class="search"><svg class="i-sm i"><use href="#i-search"/></svg><input type="text" placeholder="חפש מסמך…"/></div>
        </div>
        <table>
          <thead><tr><th>שם קובץ</th><th>נכס</th><th>סוג</th><th>גודל</th><th>תאריך</th><th></th></tr></thead>
          <tbody>
            <tr><td><strong>חוזה שכירות — תל-אביב צפון.pdf</strong></td><td>תל-אביב צפון</td><td><span class="pill compact info">חוזה</span></td><td>312 KB</td><td>15/03/2026</td><td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-download"/></svg></span></div></td></tr>
            <tr><td><strong>אימות פיזי A — רמת-גן.pdf</strong></td><td>רמת-גן בורסה</td><td><span class="pill compact ver">אימות</span></td><td>1.2 MB</td><td>02/05/2025</td><td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-download"/></svg></span></div></td></tr>
            <tr><td><strong>חשבונית מס INV-2604-002.pdf</strong></td><td>רמת-גן</td><td><span class="pill compact pen">חשבונית</span></td><td>148 KB</td><td>22/04/2026</td><td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-download"/></svg></span></div></td></tr>
            <tr><td><strong>טופס 4 — חולון אגרובנק.pdf</strong></td><td>חולון</td><td><span class="pill compact muted">טופס</span></td><td>420 KB</td><td>11/06/2025</td><td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-download"/></svg></span></div></td></tr>
            <tr><td><strong>דו"ח בטיחות אש — חולון.pdf</strong></td><td>חולון</td><td><span class="pill compact muted">בטיחות</span></td><td>2.8 MB</td><td>14/06/2025</td><td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-download"/></svg></span></div></td></tr>
            <tr><td><strong>חוזה שכירות — בני-ברק (טיוטה).docx</strong></td><td>בני-ברק</td><td><span class="pill compact info">חוזה</span></td><td>95 KB</td><td>26/04/2026</td><td><div class="row-act"><span class="ico-btn"><svg class="i-sm i"><use href="#i-eye"/></svg></span><span class="ico-btn"><svg class="i-sm i"><use href="#i-download"/></svg></span></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PROPERTIES -->
    <div class="view" id="v-properties">
      <div class="panel">
        <div class="ph"><div><h2>הנכסים שלי · 8 פעילים</h2><small>96 מיטות · ערך חוזי מצטבר 1.85M ₪</small></div><button class="btn-cta btn-mini"><svg class="i-sm i" style="stroke:#fff"><use href="#i-plus"/></svg> חפש דיור</button></div>
        <div class="filters">
          <button class="chip on">הכל <span class="c">8</span></button>
          <button class="chip">פעיל <span class="c">6</span></button>
          <button class="chip">בקליטה <span class="c">1</span></button>
          <button class="chip">דורש חידוש <span class="c">2</span></button>
          <div class="search"><svg class="i-sm i"><use href="#i-search"/></svg><input type="text" placeholder="חפש…"/></div>
        </div>
        <table>
          <thead><tr><th>נכס</th><th>אימות</th><th>תפוסה</th><th>עלות</th><th>בעל נכס</th><th>סיום חוזה</th></tr></thead>
          <tbody>
            <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=320&h=240&fit=crop')"></div><div><div class="t">תל-אביב צפון · 10</div><div class="m">אבן גבירול</div></div></div></td><td><span class="pill ver compact">A</span></td><td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">10/10</div></div></td><td><strong>13,500₪</strong></td><td>א.שרון</td><td>15/03/2027</td></tr>
            <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=320&h=240&fit=crop')"></div><div><div class="t">רמת-גן בורסה · 16</div><div class="m">ז'בוטינסקי</div></div></div></td><td><span class="pill ver compact">A</span></td><td><div class="cap"><div class="cap-bar"><i style="width:87%"></i></div><div class="num">14/16</div></div></td><td><strong>19,600₪</strong></td><td>גורן השקעות</td><td>02/11/2026</td></tr>
            <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=320&h=240&fit=crop')"></div><div><div class="t">פתח-תקווה · 12</div><div class="m">ההסתדרות 14</div></div></div></td><td><span class="pill exp compact">פג 21י׳</span></td><td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">12/12</div></div></td><td><strong>15,600₪</strong></td><td>ה.כהן</td><td><span style="color:#dc2626;font-weight:700">19/05/2026</span></td></tr>
            <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=320&h=240&fit=crop')"></div><div><div class="t">חולון אגרובנק · 8</div><div class="m">אילת 22</div></div></div></td><td><span class="pill exp compact">פג 24י׳</span></td><td><div class="cap"><div class="cap-bar"><i style="width:75%" class="warn"></i></div><div class="num">6/8</div></div></td><td><strong>10,400₪</strong></td><td>ב.בן-עמי</td><td><span style="color:#dc2626;font-weight:700">22/05/2026</span></td></tr>
            <tr><td><div class="row-prop"><div class="thumb" style="background-image:url('https://images.unsplash.com/photo-1460317442991-0ec209397118?w=320&h=240&fit=crop')"></div><div><div class="t">ראשון-לציון · 14</div><div class="m">ההגנה 8</div></div></div></td><td><span class="pill ver-b compact">B</span></td><td><div class="cap"><div class="cap-bar"><i style="width:100%" class="full"></i></div><div class="num">14/14</div></div></td><td><strong>17,500₪</strong></td><td>דקלאור</td><td>05/01/2027</td></tr>
            <tr><td><div class="row-prop"><div class="thumb ph-blue"><svg class="i"><use href="#i-building"/></svg></div><div><div class="t">בני-ברק · 12</div><div class="m">בקליטה</div></div></div></td><td><span class="pill pen compact">בקליטה</span></td><td><div class="cap"><div class="cap-bar"><i style="width:0%"></i></div><div class="num">0/12</div></div></td><td><strong>14,400₪</strong></td><td>גורן השקעות</td><td>23/04/2027</td></tr>
          </tbody>
        </table>
      </div>
    </div>

  </main>
</div>

<script>
(function(){
  const links = document.querySelectorAll('.nav-link[data-view]');
  const views = document.querySelectorAll('.view');
  const title = document.getElementById('page-title');
  const titles = {
    dashboard:'דאשבורד · סקירה כללית',
    properties:'הנכסים שלי',
    workers:'עובדים · 87 פעילים',
    map:'מפת נכסים',
    dealroom:'Deal-room · עסקאות פעילות',
    chat:'תקשורת · בעלי נכסים וצוות עוז',
    calendar:'לוח שנה · אירועים ופעולות',
    finance:'תשלומים וחשבוניות',
    compliance:'ציות וחוק',
    reports:'דוחות ואנליטיקה',
    docs:'Audit Pack · ארכיון מסמכים'
  };
  links.forEach(l => l.addEventListener('click', () => {
    links.forEach(x => x.classList.remove('active'));
    l.classList.add('active');
    const id = l.dataset.view;
    views.forEach(v => v.classList.toggle('on', v.id === 'v-' + id));
    if(title && titles[id]) title.textContent = titles[id];
    window.scrollTo({top:0,behavior:'instant'});
  }));
})();
</script>

<script>
(function(){
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "density": "comfortable",
    "primaryAccent": "#E07B39",
    "kpiVariant": "cards",
    "showAttention": true
  }/*EDITMODE-END*/;

  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;bottom:20px;left:20px;width:300px;background:#fff;border:1px solid #eef0f3;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.18);padding:16px;font-family:inherit;z-index:9999;display:none';
  panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><strong style="font-size:13px;color:#1B3A6B">Tweaks · גרסה מלאה</strong><button id="tw-close" style="border:0;background:#F7F8FA;width:24px;height:24px;border-radius:6px;cursor:pointer">✕</button></div><label style="display:block;font-size:11px;color:#6B7280;font-weight:600;margin-bottom:6px">צפיפות שורות</label><div id="tw-density" style="display:flex;gap:4px;margin-bottom:14px"><button data-v="compact" style="flex:1;padding:6px;border:1px solid #eef0f3;border-radius:7px;background:#fff;font-size:12px;cursor:pointer">קומפקטי</button><button data-v="comfortable" style="flex:1;padding:6px;border:1px solid #1B3A6B;border-radius:7px;background:#1B3A6B;color:#fff;font-size:12px;cursor:pointer">רגיל</button></div><label style="display:block;font-size:11px;color:#6B7280;font-weight:600;margin-bottom:6px">סגנון KPI</label><div id="tw-kpi" style="display:flex;gap:4px;margin-bottom:14px"><button data-v="cards" style="flex:1;padding:6px;border:1px solid #1B3A6B;border-radius:7px;background:#1B3A6B;color:#fff;font-size:12px;cursor:pointer">כרטיסים</button><button data-v="minimal" style="flex:1;padding:6px;border:1px solid #eef0f3;border-radius:7px;background:#fff;font-size:12px;cursor:pointer">מינימלי</button></div><label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:#1E1E2E;cursor:pointer;margin-bottom:14px"><input id="tw-attn" type="checkbox" checked style="cursor:pointer"/> הצג באנר התראות</label><label style="display:block;font-size:11px;color:#6B7280;font-weight:600;margin-bottom:6px">צבע פעולה ראשי (CTA)</label><input id="tw-color" type="color" value="#E07B39" style="width:100%;height:36px;border:1px solid #eef0f3;border-radius:7px;cursor:pointer"/><div style="font-size:10.5px;color:#9CA3AF;margin-top:10px;line-height:1.5">לפי מערכת העיצוב, כתום שמור ל-CTA בלבד.</div>';
  document.body.appendChild(panel);

  let state = Object.assign({}, DEFAULTS);

  function applyDensity(v){
    document.querySelectorAll('tbody td').forEach(td => td.style.padding = v === 'compact' ? '8px 14px' : '');
    document.querySelectorAll('.worker-row, .compliance-row').forEach(r => r.style.padding = v === 'compact' ? '8px 14px' : '');
    document.querySelectorAll('.kpi').forEach(k => k.style.padding = v === 'compact' ? '11px' : '');
  }
  function applyColor(c){
    document.querySelectorAll('.btn-cta').forEach(el => el.style.background = c);
  }
  function applyKpiVariant(v){
    document.querySelectorAll('.kpi').forEach(k => {
      if(v === 'minimal'){
        k.style.boxShadow='none'; k.style.background='transparent'; k.style.borderColor='transparent';
        k.querySelectorAll('.ic').forEach(ic => ic.style.display='none');
      } else {
        k.style.boxShadow=''; k.style.background=''; k.style.borderColor='';
        k.querySelectorAll('.ic').forEach(ic => ic.style.display='');
      }
    });
  }
  function applyAttn(v){
    document.querySelectorAll('.attn').forEach(el => el.style.display = v ? '' : 'none');
  }

  applyDensity(state.density); applyColor(state.primaryAccent); applyKpiVariant(state.kpiVariant); applyAttn(state.showAttention);

  function highlight(group, v){
    panel.querySelectorAll('#'+group+' button').forEach(b => {
      const on = b.dataset.v === v;
      b.style.background = on ? '#1B3A6B' : '#fff';
      b.style.color = on ? '#fff' : '#1E1E2E';
      b.style.borderColor = on ? '#1B3A6B' : '#eef0f3';
    });
  }

  panel.querySelector('#tw-close').addEventListener('click', () => {
    panel.style.display='none';
    window.parent.postMessage({type:'__edit_mode_dismissed'}, '*');
  });
  panel.querySelector('#tw-density').addEventListener('click', e => {
    if(e.target.dataset.v){ state.density = e.target.dataset.v; applyDensity(state.density); highlight('tw-density', state.density); window.parent.postMessage({type:'__edit_mode_set_keys', edits:{density:state.density}}, '*'); }
  });
  panel.querySelector('#tw-kpi').addEventListener('click', e => {
    if(e.target.dataset.v){ state.kpiVariant = e.target.dataset.v; applyKpiVariant(state.kpiVariant); highlight('tw-kpi', state.kpiVariant); window.parent.postMessage({type:'__edit_mode_set_keys', edits:{kpiVariant:state.kpiVariant}}, '*'); }
  });
  panel.querySelector('#tw-attn').addEventListener('change', e => {
    state.showAttention = e.target.checked; applyAttn(state.showAttention); window.parent.postMessage({type:'__edit_mode_set_keys', edits:{showAttention:state.showAttention}}, '*');
  });
  panel.querySelector('#tw-color').addEventListener('input', e => {
    state.primaryAccent = e.target.value; applyColor(state.primaryAccent); window.parent.postMessage({type:'__edit_mode_set_keys', edits:{primaryAccent:state.primaryAccent}}, '*');
  });

  window.addEventListener('message', (ev) => {
    if(ev.data && ev.data.type === '__activate_edit_mode'){ panel.style.display='block'; }
    if(ev.data && ev.data.type === '__deactivate_edit_mode'){ panel.style.display='none'; }
  });
  window.parent.postMessage({type:'__edit_mode_available'}, '*');
})();
</script>

</body>
</html>
===== END FILE =====

===== FILE: assets/mockups/corporate-assets.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>עוז · ניהול נכסי תאגיד — MVP + Full</title>
<link rel="stylesheet" href="styles.css"/>
<style>
  html, body { height: 100%; background: #faf7f2; }
  body { font-family: 'Assistant', system-ui, sans-serif; }
  /* canvas-specific tweaks */
  .artboard-frame { background: #F7F8FA; min-width: 1280px; }
  .artboard-frame .app { min-height: 100%; }
</style>
</head>
<body>
<!-- Icon sprite -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<defs>
<symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></symbol>
<symbol id="i-building" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
<symbol id="i-coins" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
<symbol id="i-tool" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
<symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></symbol>
<symbol id="i-sparkle" viewBox="0 0 24 24"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3ZM5 3v4M19 17v4M3 5h4M17 19h4"/></symbol>
<symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1zM10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5M4 15v-3a6 6 0 0 1 6-6M14 6a6 6 0 0 1 6 6v3"/></symbol>
<symbol id="i-package" viewBox="0 0 24 24"><path d="M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/></symbol>
<symbol id="i-cog" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
<symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
<symbol id="i-upload" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
<symbol id="i-check-circle" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></symbol>
<symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
<symbol id="i-alert-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
<symbol id="i-arrow-up" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></symbol>
<symbol id="i-arrow-down" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></symbol>
<symbol id="i-chev-down" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></symbol>
<symbol id="i-chev-left" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></symbol>
<symbol id="i-chev-right" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
<symbol id="i-filter" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></symbol>
<symbol id="i-list" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></symbol>
<symbol id="i-cards" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></symbol>
<symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>
<symbol id="i-edit" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></symbol>
<symbol id="i-more" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></symbol>
<symbol id="i-trend-up" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></symbol>
<symbol id="i-trend-down" viewBox="0 0 24 24"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></symbol>
<symbol id="i-bed" viewBox="0 0 24 24"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
<symbol id="i-zap" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>
<symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></symbol>
<symbol id="i-camera" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></symbol>
<symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>
<symbol id="i-mic" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></symbol>
</defs>
</svg>

<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

<script type="text/babel" src="design-canvas.jsx"></script>
<script type="text/babel" src="corp-shared.jsx"></script>
<script type="text/babel" src="corp-mvp.jsx"></script>
<script type="text/babel" src="corp-full.jsx"></script>
<script type="text/babel" src="corp-app.jsx"></script>

</body>
</html>
===== END FILE =====

===== FILE: assets/mockups/corp-shared.jsx =====
/* global React */
const { useState, useMemo, Fragment } = React;

// ============== ICONS ==============
const Icon = ({ name, sz = 18, cls = '' }) => (
  <svg className={`i ${cls}`} style={{ width: sz, height: sz }}>
    <use href={`#i-${name}`} />
  </svg>
);

// ============== SHARED DATA ==============
const PROPERTIES = [
  { id: 'P-014', name: 'רמת גן · ביאליק 47', city: 'רמת גן', beds: 12, occ: 12, status: 'פעיל', owner: 'דוד כהן', rent: 18900, tier: 'A', img: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&q=70' },
  { id: 'P-018', name: 'בני ברק · רבי עקיבא 122', city: 'בני ברק', beds: 10, occ: 9, status: 'פעיל', owner: 'מרים לוי', rent: 15600, tier: 'A', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=70' },
  { id: 'P-021', name: 'פתח תקווה · ז׳בוטינסקי 8', city: 'פתח תקווה', beds: 14, occ: 14, status: 'פעיל', owner: 'יוסף אברהם', rent: 21800, tier: 'A', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=70' },
  { id: 'P-024', name: 'תל אביב · לבונטין 3', city: 'תל אביב', beds: 8, occ: 6, status: 'פעיל', owner: 'רחל גולן', rent: 13400, tier: 'B', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=70' },
  { id: 'P-028', name: 'חולון · סוקולוב 31', city: 'חולון', beds: 10, occ: 10, status: 'פעיל', owner: 'אברהם פרץ', rent: 16200, tier: 'A', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=70' },
  { id: 'P-031', name: 'ראשל״צ · רוטשילד 60', city: 'ראשל״צ', beds: 12, occ: 11, status: 'פעיל', owner: 'שרה דהן', rent: 19000, tier: 'A', img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=70' }
];

const WORKERS = [
  { id: 'W-1142', name: 'Ravi Kumar', he: 'ראווי קומאר', country: '🇮🇳', flag: 'IN', role: 'בנאי', site: 'הרצליה Hi-Tech', prop: 'P-014', visa: 'B/1', visaExp: '2026-08-12', daysLeft: 106 },
  { id: 'W-1156', name: 'Suresh Yadav', he: 'סורש יאדאב', country: '🇮🇳', flag: 'IN', role: 'בנאי', site: 'הרצליה Hi-Tech', prop: 'P-014', visa: 'B/1', visaExp: '2026-05-22', daysLeft: 24 },
  { id: 'W-1183', name: 'Chen Wei', he: 'צ׳ן וויי', country: '🇨🇳', flag: 'CN', role: 'גמרים', site: 'תל אביב North', prop: 'P-018', visa: 'B/1', visaExp: '2027-01-05', daysLeft: 252 },
  { id: 'W-1201', name: 'Andrei Popescu', he: 'אנדריי פופסקו', country: '🇷🇴', flag: 'RO', role: 'מסגר', site: 'פ״ת Site 2', prop: 'P-021', visa: 'B/1', visaExp: '2026-04-28', daysLeft: 0 },
  { id: 'W-1217', name: 'Somchai Promkaew', he: 'סומצ׳אי פרומקאיו', country: '🇹🇭', flag: 'TH', role: 'חשמלאי', site: 'תל אביב North', prop: 'P-024', visa: 'B/1', visaExp: '2026-09-30', daysLeft: 155 },
  { id: 'W-1233', name: 'Vikram Singh', he: 'ויקראם סינג', country: '🇮🇳', flag: 'IN', role: 'בנאי', site: 'חולון East', prop: 'P-028', visa: 'B/1', visaExp: '2026-06-15', daysLeft: 48 }
];

const Flag = ({ code }) => {
  const colors = { IN: ['#FF9933','#fff','#138808'], CN: ['#DE2910','#DE2910','#DE2910'], RO: ['#002B7F','#FCD116','#CE1126'], TH: ['#A51931','#F4F5F8','#2D2A4A'], MD: ['#0046AE','#FFD200','#CC092F'] }[code] || ['#999','#bbb','#777'];
  return (
    <span className="flag" style={{ background: `linear-gradient(90deg, ${colors[0]} 33%, ${colors[1]} 33% 66%, ${colors[2]} 66%)` }} />
  );
};

const Avatar = ({ name, color, sz = 'md' }) => {
  const initials = name.split(' ').map(n => n[0]).slice(0,2).join('');
  const palette = ['#1B3A6B','#2D6A4F','#E07B39','#6d28d9','#0891b2','#b45309'];
  const bg = color || palette[name.charCodeAt(0) % palette.length];
  return <span className={`av ${sz==='sm'?'sm':sz==='lg'?'lg':''}`} style={{ background: bg }}>{initials}</span>;
};

// ============== SIDEBAR ==============
const Sidebar = ({ active, mvp = false }) => {
  const fullNav = [
    { sec: 'תפעול', items: [
      { id: 'overview', label: 'סקירה כללית', icon: 'grid' },
      { id: 'props', label: 'נכסים', icon: 'building', badge: '6' },
      { id: 'workers', label: 'עובדים', icon: 'users', badge: '74' },
      { id: 'visas', label: 'ויזות ומסמכים', icon: 'shield', badgeAlert: '3' },
      { id: 'tickets', label: 'תקלות ותחזוקה', icon: 'tool', badge: '8' },
    ]},
    { sec: 'פיננסי', items: [
      { id: 'finance', label: 'כספים ו־P&L', icon: 'coins' },
      { id: 'expenses', label: 'הוצאות וקבלות', icon: 'file' },
      { id: 'reports', label: 'דוחות ו־AI', icon: 'sparkle' },
    ]},
    { sec: 'תאגיד', items: [
      { id: 'sites', label: 'אתרי בנייה', icon: 'hard-hat' },
      { id: 'vendors', label: 'ספקים', icon: 'package' },
      { id: 'team', label: 'הצוות שלי', icon: 'users' },
      { id: 'settings', label: 'הגדרות', icon: 'cog' },
    ]}
  ];
  const mvpNav = [
    { sec: 'תפעול', items: [
      { id: 'overview', label: 'סקירה כללית', icon: 'grid' },
      { id: 'props', label: 'נכסים', icon: 'building', badge: '6' },
      { id: 'workers', label: 'עובדים', icon: 'users', badge: '74' },
      { id: 'visas', label: 'ויזות', icon: 'shield', badgeAlert: '3' },
    ]},
    { sec: 'אחר', items: [
      { id: 'finance', label: 'כספים', icon: 'coins' },
      { id: 'settings', label: 'הגדרות', icon: 'cog' },
    ]}
  ];
  const nav = mvp ? mvpNav : fullNav;
  return (
    <aside className="side">
      <div className="brand">
        <span className="o"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h20M4 18V8l8-5 8 5v10"/><path d="M9 18v-6h6v6"/></svg></span>
        <div>
          <div className="name">עוז · WorkerHome</div>
          <div className="sub">ניהול נכסי תאגיד {mvp && '· MVP'}</div>
        </div>
      </div>
      <div className="tenant">
        <span className="logo">ש״ב</span>
        <div className="body">
          <div className="label">תאגיד</div>
          <div className="biz">שיכון ובניין דרום</div>
        </div>
        <Icon name="chev-down" sz={14} cls="chev" />
      </div>
      {nav.map(s => (
        <div className="nav-section" key={s.sec}>
          <div className="label">{s.sec}</div>
          {s.items.map(it => (
            <div key={it.id} className={`nav-link ${active===it.id?'active':''}`}>
              <Icon name={it.icon} sz={17} />
              <span>{it.label}</span>
              {it.badge && <span className="badge">{it.badge}</span>}
              {it.badgeAlert && <span className="badge alert">{it.badgeAlert}</span>}
            </div>
          ))}
        </div>
      ))}
      <div className="me">
        <span className="av" style={{ background: '#52A375' }}>אא</span>
        <div className="body" style={{ flex: 1 }}>
          <div className="who">אבי אזולאי</div>
          <div className="role">סמנכ״ל תפעול</div>
        </div>
        <Icon name="chev-down" sz={14} cls="muted" />
      </div>
    </aside>
  );
};

// ============== TOPBAR ==============
const Topbar = ({ title, sub, actions }) => (
  <div className="topbar">
    <div>
      <h1>{title}</h1>
      {sub && <div className="sub">{sub}</div>}
    </div>
    <div className="actions">
      <div className="search">
        <Icon name="search" sz={15} />
        <input placeholder="חפש נכס, עובד, חוזה…" />
        <kbd>⌘K</kbd>
      </div>
      <button className="btn-ghost"><Icon name="bell" sz={15}/><span style={{ background:'#dc2626', color:'#fff', fontSize:10, padding:'1px 6px', borderRadius:9999, fontWeight:800 }}>5</span></button>
      {actions}
    </div>
  </div>
);

// ============== KPI ==============
const KPI = ({ icon, iconCls = '', label, value, unit, delta, deltaDir = 'up', children }) => (
  <div className="kpi">
    <div className={`ic ${iconCls}`}><Icon name={icon} sz={17} /></div>
    <div className="label" style={{ paddingInlineStart: 44, minHeight: 18 }}>{label}</div>
    <div className="value">{value}{unit && <span className="unit">{unit}</span>}</div>
    {delta && <div className={`delta ${deltaDir}`}><Icon name={deltaDir==='up'?'arrow-up':deltaDir==='down'?'arrow-down':'arrow-up'} sz={12}/>{delta}</div>}
    {children}
  </div>
);

// ============== SPARKLINE ==============
const Sparkline = ({ data, color = '#1B3A6B', fill = true, h = 38 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const pts = data.map((v,i) => `${(i/(data.length-1))*w},${h - ((v-min)/range)*(h-8) - 4}`).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {fill && <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} fillOpacity="0.08" stroke="none"/>}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ============== OVERVIEW (used in MVP + Full) ==============
const OverviewScreen = ({ mvp = false }) => (
  <Fragment>
    <Topbar
      title="סקירה כללית"
      sub={`שלום אבי · יום שלישי, 28 באפריל 2026 · ${mvp?'MVP · ':''}שיכון ובניין דרום`}
      actions={!mvp && <button className="btn-cta"><Icon name="plus" sz={14}/>פעולה חדשה</button>}
    />

    {/* Alerts */}
    <div className="alert-strip red">
      <Icon name="alert-circle" sz={18} cls="ic" />
      <div style={{ flex: 1 }}>
        <div className="t">3 ויזות פגות תוקף ב־30 הימים הקרובים</div>
        <div className="d">Andrei Popescu · פג היום · Suresh Yadav · 24 ימים · 1 נוסף</div>
      </div>
      <button className="btn-ghost btn-sm">צפה בויזות</button>
    </div>

    <div className={`kpis ${mvp?'k4':'k6'}`}>
      <KPI icon="building" label="נכסים פעילים" value="6" delta="+1 החודש" deltaDir="up" />
      <KPI icon="users" iconCls="green" label="עובדים מאוכלסים" value="62" unit="/ 66" delta="94% תפוסה" deltaDir="up" />
      <KPI icon="shield" iconCls="amber" label="ויזות בסיכון ≤60 יום" value="3" delta="פעולה נדרשת" deltaDir="down" />
      <KPI icon="coins" iconCls="orange" label="עלות חודשית" value="₪104,900" delta="−4.2% מהחודש שעבר" deltaDir="down" />
      {!mvp && <KPI icon="tool" iconCls="red" label="תקלות פתוחות" value="8" delta="2 חורגות SLA" deltaDir="down" />}
      {!mvp && <KPI icon="file" iconCls="violet" label="חוזים בחתימה" value="2" delta="ממתינים לעובד" deltaDir="flat" />}
    </div>

    <div className="cols-2">
      {/* LEFT — Properties + occupancy */}
      <div className="panel">
        <div className="ph">
          <div>
            <h2>תפוסה לפי נכס</h2>
            <small>62 מתוך 66 מיטות מאוכלסות · 94%</small>
          </div>
          <div className="actions">
            <button className="btn-ghost btn-sm">ייצא</button>
            <button className="btn-ghost btn-sm"><Icon name="filter" sz={13}/>סנן</button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr><th>נכס</th><th>עיר</th><th>תפוסה</th><th>שכ״ד חודשי</th><th>תג</th><th></th></tr>
          </thead>
          <tbody>
            {PROPERTIES.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="row-prop">
                    <div className="thumb" style={{ backgroundImage:`url(${p.img})` }} />
                    <div>
                      <div className="t">{p.name.split(' · ')[1]}</div>
                      <div className="m">{p.id} · בעלים: {p.owner}</div>
                    </div>
                  </div>
                </td>
                <td>{p.city}</td>
                <td>
                  <div className="bar-row">
                    <div className="bar" style={{ width: 80 }}><div style={{ width: `${(p.occ/p.beds)*100}%`, background: p.occ===p.beds?'#52A375':'#1B3A6B' }}/></div>
                    <span className="lbl">{p.occ}/{p.beds}</span>
                  </div>
                </td>
                <td className="num">₪{p.rent.toLocaleString()}</td>
                <td><span className={`pill compact ${p.tier==='A'?'green-deep':'blue-soft'}`}>תג {p.tier}</span></td>
                <td><Icon name="chev-left" sz={14} cls="muted"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {!mvp && (
          <div className="ai-banner">
            <div className="icbox"><Icon name="sparkle" sz={22}/></div>
            <div className="body">
              <h3>דוח חודשי מוכן</h3>
              <p>NotebookLM ניתח את אפריל 2026 · 4 תובנות · 2 חריגות</p>
            </div>
            <button className="btn-cta btn-sm">פתח</button>
          </div>
        )}

        <div className="panel">
          <div className="ph"><h2>פעילות אחרונה</h2><small>חי</small></div>
          <div className="feed">
            <div className="item">
              <div className="ic green"><Icon name="check" sz={15}/></div>
              <div style={{ flex: 1 }}>
                <div className="text"><b>Ravi Kumar</b> שובץ לנכס <b>P-014</b> · ביאליק 47</div>
                <div className="when">לפני 12 דקות · ע״י דנה</div>
              </div>
            </div>
            <div className="item">
              <div className="ic alert"><Icon name="alert" sz={14}/></div>
              <div style={{ flex: 1 }}>
                <div className="text"><b>תקלת חשמל</b> דווחה בנכס <b>P-021</b> ע״י רכז שטח</div>
                <div className="when">לפני 47 דקות · SLA: 4 שעות</div>
              </div>
            </div>
            <div className="item">
              <div className="ic"><Icon name="file" sz={14}/></div>
              <div style={{ flex: 1 }}>
                <div className="text">חוזה דיגיטלי נחתם ע״י <b>שרה דהן</b> (P-031)</div>
                <div className="when">היום · 09:14</div>
              </div>
            </div>
            <div className="item">
              <div className="ic amber"><Icon name="clock" sz={14}/></div>
              <div style={{ flex: 1 }}>
                <div className="text">תזכורת ויזה: <b>Suresh Yadav</b> פג בעוד 24 יום</div>
                <div className="when">לפני שעה</div>
              </div>
            </div>
            <div className="item">
              <div className="ic gray"><Icon name="coins" sz={14}/></div>
              <div style={{ flex: 1 }}>
                <div className="text">תשלום חודשי בוצע · 6 בעלי נכסים · ₪104,900</div>
                <div className="when">אתמול · 18:30</div>
              </div>
            </div>
          </div>
        </div>

        {!mvp && (
          <div className="panel pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
              <div>
                <div className="t-xs muted xb" style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}>מגמה — 30 ימים</div>
                <div className="t-2xl xb tnum">₪104,900</div>
                <div className="t-xs" style={{ color: '#2D6A4F', fontWeight: 700 }}>↘ −4.2% הוזלת חוזים</div>
              </div>
              <div style={{ width: 140 }}>
                <Sparkline data={[110,108,109,107,110,108,106,105,107,104,103,105]} color="#2D6A4F"/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </Fragment>
);

window.OverviewScreen = OverviewScreen;
window.Sidebar = Sidebar;
window.Topbar = Topbar;
window.Icon = Icon;
window.Avatar = Avatar;
window.Flag = Flag;
window.Sparkline = Sparkline;
window.PROPERTIES = PROPERTIES;
window.WORKERS = WORKERS;
window.KPI = KPI;
===== END FILE =====
