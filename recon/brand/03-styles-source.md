# brand/03 — Styles Source

Verbatim component-level CSS.

===== FILE: assets/styles.css =====
/* OZ Corporate Asset Mgmt — extends colors_and_type.css */
@import url('./colors_and_type.css');

* { box-sizing: border-box; }
body { margin: 0; }

/* ===== Icon system (lucide-style) ===== */
.i { width: 18px; height: 18px; stroke: currentColor; stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; flex: none; }
.i-sm { width: 14px; height: 14px; }
.i-md { width: 20px; height: 20px; }
.i-lg { width: 24px; height: 24px; }

/* ===== Layout ===== */
.app { display: grid; grid-template-columns: 248px 1fr; min-height: 100%; background: var(--bg-page); }
.app.compact { grid-template-columns: 220px 1fr; }

/* ===== Sidebar ===== */
.side { background: #1B3A6B; color: #fff; padding: 22px 14px; display: flex; flex-direction: column; gap: 14px; position: relative; }
.brand { display: flex; align-items: center; gap: 10px; padding: 0 6px 16px; border-bottom: 1px solid rgba(255,255,255,.1); }
.brand .o { width: 32px; height: 32px; border-radius: 8px; background: #E07B39; display: inline-flex; align-items: center; justify-content: center; color: #fff; }
.brand .name { font-weight: 800; font-size: 17px; line-height: 1; }
.brand .sub { font-size: 10.5px; color: rgba(210,229,250,.7); margin-top: 3px; font-weight: 500; }
.tenant { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 10px 12px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
.tenant .logo { width: 32px; height: 32px; border-radius: 7px; background: linear-gradient(135deg,#E07B39,#C26A2C); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex: none; }
.tenant .body { flex: 1; min-width: 0; }
.tenant .label { font-size: 10px; color: rgba(210,229,250,.55); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
.tenant .biz { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tenant .chev { color: rgba(255,255,255,.4); }

.nav-section { display: flex; flex-direction: column; gap: 1px; }
.nav-section .label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; color: rgba(210,229,250,.45); padding: 0 12px 6px; font-weight: 700; margin-top: 8px; }
.nav-link { display: flex; align-items: center; gap: 11px; padding: 9px 12px; border-radius: 8px; font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,.85); cursor: pointer; transition: background .15s, color .15s; }
.nav-link:hover { background: rgba(255,255,255,.08); color: #fff; }
.nav-link.active { background: #E07B39; color: #fff; font-weight: 700; box-shadow: 0 4px 12px -2px rgba(224,123,57,.4); }
.nav-link .badge { margin-inline-start: auto; background: rgba(255,255,255,.18); font-size: 10.5px; font-weight: 700; padding: 2px 7px; border-radius: 9999px; min-width: 18px; text-align: center; }
.nav-link.active .badge { background: rgba(255,255,255,.28); }
.nav-link .badge.alert { background: #dc2626; color: #fff; }

.me { margin-top: auto; padding: 11px; background: rgba(255,255,255,.06); border-radius: 10px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
.me:hover { background: rgba(255,255,255,.1); }
.me .av { width: 34px; height: 34px; border-radius: 50%; background: #52A375; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex: none; }
.me .who { font-size: 13px; font-weight: 700; }
.me .role { font-size: 10.5px; color: rgba(210,229,250,.7); }

/* ===== Main ===== */
.main { padding: 22px 28px 60px; display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
.topbar h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -.02em; line-height: 1.2; }
.topbar .sub { font-size: 13px; color: var(--fg-muted); margin-top: 5px; }
.topbar .actions { display: flex; gap: 8px; align-items: center; flex: none; }

.search { background: #fff; border: 1px solid var(--border-default); border-radius: 10px; padding: 8px 12px; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--fg-muted); width: 280px; }
.search input { border: 0; outline: 0; background: transparent; font-family: inherit; font-size: 13px; flex: 1; color: var(--ink); }
.search kbd { font-size: 10px; padding: 2px 6px; background: var(--gray-100); border-radius: 4px; font-family: ui-monospace, monospace; color: var(--fg-muted); }

/* ===== Buttons ===== */
.btn-cta { background: #E07B39; color: #fff; padding: 9px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; border: 0; cursor: pointer; box-shadow: var(--shadow-orange); font-family: inherit; display: inline-flex; align-items: center; gap: 7px; transition: transform .15s, box-shadow .15s, background .15s; }
.btn-cta:hover { background: #C26A2C; transform: translateY(-1px); }
.btn-cta:active { transform: scale(.97); }
.btn-ghost { background: #fff; color: #1B3A6B; padding: 9px 14px; border-radius: 10px; font-weight: 600; font-size: 13px; border: 1px solid var(--border-default); cursor: pointer; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; transition: border-color .15s, color .15s; }
.btn-ghost:hover { border-color: #1B3A6B; color: #1B3A6B; }
.btn-blue { background: #1B3A6B; color: #fff; padding: 9px 16px; border-radius: 10px; font-weight: 700; font-size: 13px; border: 0; cursor: pointer; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; }
.btn-blue:hover { background: #15305A; }
.btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }

/* ===== Tabs ===== */
.tabs { display: flex; gap: 2px; border-bottom: 1px solid var(--border-default); margin-bottom: -1px; overflow-x: auto; }
.tab { padding: 11px 18px; font-size: 13.5px; font-weight: 600; color: var(--fg-muted); cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: color .15s, border-color .15s; display: inline-flex; align-items: center; gap: 7px; background: none; border-top: 0; border-left: 0; border-right: 0; font-family: inherit; }
.tab:hover { color: var(--ink); }
.tab.active { color: #1B3A6B; border-bottom-color: #1B3A6B; font-weight: 700; }
.tab .badge { background: var(--gray-100); color: var(--fg-muted); font-size: 10.5px; padding: 1px 7px; border-radius: 9999px; font-weight: 700; }
.tab.active .badge { background: #D2E5FA; color: #1B3A6B; }

/* ===== KPI ===== */
.kpis { display: grid; gap: 12px; }
.kpis.k4 { grid-template-columns: repeat(4, 1fr); }
.kpis.k5 { grid-template-columns: repeat(5, 1fr); }
.kpis.k6 { grid-template-columns: repeat(6, 1fr); }
.kpi { background: #fff; border: 1px solid #eef0f3; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 5px; box-shadow: var(--shadow-sm); position: relative; }
.kpi .ic { position: absolute; top: 14px; left: 14px; width: 34px; height: 34px; border-radius: 9px; background: #D2E5FA; color: #1B3A6B; display: flex; align-items: center; justify-content: center; }
.kpi .label { font-size: 11.5px; color: var(--fg-muted); font-weight: 600; }
.kpi .value { font-size: 26px; font-weight: 800; letter-spacing: -.02em; line-height: 1.1; }
.kpi .value .unit { font-size: 14px; font-weight: 600; color: var(--fg-muted); margin-inline-start: 4px; }
.kpi .delta { font-size: 11.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; }
.kpi .delta.up { color: #206A4F; }
.kpi .delta.down { color: #dc2626; }
.kpi .delta.flat { color: var(--fg-muted); }
.kpi .ic.green { background: rgba(32,106,79,.12); color: #206A4F; }
.kpi .ic.orange { background: #fef3e8; color: #E07B39; }
.kpi .ic.red { background: #fef2f2; color: #dc2626; }
.kpi .ic.amber { background: #fffbeb; color: #b45309; }
.kpi .ic.violet { background: #ede9fe; color: #6d28d9; }

/* ===== Panels ===== */
.cols-2 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
.cols-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cols-12 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.panel { background: #fff; border: 1px solid #eef0f3; border-radius: 14px; box-shadow: var(--shadow-sm); overflow: hidden; }
.panel.pad { padding: 18px 20px; }
.panel.dark { background: #1B3A6B; color: #fff; border-color: rgba(255,255,255,.1); }
.panel.dark .ph { border-bottom-color: rgba(255,255,255,.1); }
.panel.dark h2 { color: #fff; }
.panel.dark small { color: rgba(210,229,250,.7); }
.ph { padding: 14px 18px; border-bottom: 1px solid #eef0f3; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.ph h2 { margin: 0; font-size: 15px; font-weight: 800; }
.ph small { font-size: 12px; color: var(--fg-muted); }
.ph .actions { display: flex; gap: 6px; align-items: center; }

/* ===== Tables ===== */
table.tbl { width: 100%; border-collapse: collapse; }
.tbl thead th { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--fg-muted); font-weight: 700; text-align: right; padding: 10px 18px; background: #fafbfc; border-bottom: 1px solid #eef0f3; white-space: nowrap; }
.tbl tbody td { padding: 13px 18px; border-bottom: 1px solid #f3f4f6; font-size: 13px; vertical-align: middle; }
.tbl tbody tr:last-child td { border-bottom: 0; }
.tbl tbody tr:hover { background: #fafbfc; }
.tbl .num { font-variant-numeric: tabular-nums; font-weight: 600; }
.tbl .num.strong { font-weight: 800; }

/* ===== Pills / badges ===== */
.pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 9999px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.pill.compact { padding: 2px 8px; font-size: 10.5px; }
.pill.green-deep { background: #206A4F; color: #fff; }
.pill.green-soft { background: rgba(32,106,79,.12); color: #206A4F; }
.pill.blue-deep { background: #1B3A6B; color: #fff; }
.pill.blue-soft { background: #D2E5FA; color: #1B3A6B; }
.pill.orange-soft { background: #fef3e8; color: #E07B39; }
.pill.orange-deep { background: #E07B39; color: #fff; }
.pill.red-soft { background: #fef2f2; color: #dc2626; }
.pill.amber-soft { background: #fffbeb; color: #b45309; }
.pill.gray { background: #f3f4f6; color: #4b5563; }
.pill.dot::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; }
.pill.live { background: rgba(32,106,79,.12); color: #206A4F; }
.pill.live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #52A375; display: inline-block; animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }

@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

/* ===== Avatar ===== */
.av { width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; color: #fff; flex: none; }
.av.sm { width: 26px; height: 26px; font-size: 10.5px; }
.av.lg { width: 44px; height: 44px; font-size: 15px; }
.av-stack { display: inline-flex; }
.av-stack .av { border: 2px solid #fff; margin-inline-end: -8px; }

/* ===== Property row ===== */
.row-prop { display: flex; align-items: center; gap: 11px; }
.row-prop .thumb { width: 56px; height: 42px; border-radius: 8px; background-size: cover; background-position: center; flex: none; border: 1px solid rgba(0,0,0,.06); }
.row-prop .t { font-weight: 700; }
.row-prop .m { font-size: 11.5px; color: var(--fg-muted); margin-top: 2px; }

/* ===== Progress / occupancy bars ===== */
.bar { height: 6px; border-radius: 9999px; background: #f3f4f6; overflow: hidden; min-width: 60px; }
.bar > div { height: 100%; background: #1B3A6B; }
.bar.green > div { background: #52A375; }
.bar.orange > div { background: #E07B39; }
.bar.red > div { background: #dc2626; }
.bar-row { display: flex; align-items: center; gap: 8px; }
.bar-row .lbl { font-size: 11.5px; color: var(--fg-muted); font-weight: 600; min-width: 38px; text-align: end; font-variant-numeric: tabular-nums; }

/* ===== Activity / feed ===== */
.feed { display: flex; flex-direction: column; }
.feed .item { display: flex; gap: 11px; padding: 12px 18px; border-bottom: 1px solid #f3f4f6; align-items: flex-start; }
.feed .item:last-child { border-bottom: 0; }
.feed .item .ic { flex: none; width: 30px; height: 30px; border-radius: 8px; background: #D2E5FA; color: #1B3A6B; display: inline-flex; align-items: center; justify-content: center; }
.feed .item .ic.green { background: rgba(32,106,79,.12); color: #206A4F; }
.feed .item .ic.alert { background: #fef2f2; color: #dc2626; }
.feed .item .ic.amber { background: #fffbeb; color: #b45309; }
.feed .item .ic.gray { background: #f3f4f6; color: #6b7280; }
.feed .item .text { font-size: 13px; line-height: 1.5; color: var(--ink); }
.feed .item .when { font-size: 11px; color: var(--fg-faint); margin-top: 2px; }

/* ===== Alert panel ===== */
.alert-strip { display: flex; gap: 11px; padding: 12px 14px; border-radius: 10px; align-items: flex-start; border: 1px solid; }
.alert-strip.red { background: #fef2f2; border-color: #fecaca; color: #991b1b; }
.alert-strip.amber { background: #fffbeb; border-color: #fde68a; color: #92400e; }
.alert-strip.blue { background: #eff6ff; border-color: #bfdbfe; color: #1e3a8a; }
.alert-strip .ic { flex: none; }
.alert-strip .t { font-size: 13px; font-weight: 700; }
.alert-strip .d { font-size: 12px; opacity: .85; margin-top: 2px; }

/* ===== Filter chips ===== */
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { background: #fff; border: 1px solid var(--border-default); padding: 5px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--fg-muted); cursor: pointer; display: inline-flex; align-items: center; gap: 5px; }
.chip:hover { border-color: #1B3A6B; color: #1B3A6B; }
.chip.active { background: #1B3A6B; color: #fff; border-color: #1B3A6B; }
.chip .x { opacity: .5; font-size: 14px; line-height: 1; }

/* ===== Cards generic ===== */
.card { background: #fff; border: 1px solid #eef0f3; border-radius: 14px; padding: 16px; box-shadow: var(--shadow-sm); }
.card.outline { box-shadow: none; }
.card.elevated { box-shadow: var(--shadow-md); }

/* ===== Charts (CSS-only) ===== */
.chart-line { position: relative; width: 100%; height: 180px; }
.chart-bars { display: flex; align-items: flex-end; gap: 6px; height: 140px; padding: 8px 0 0; }
.chart-bars .b { flex: 1; background: linear-gradient(180deg,#1B3A6B,#3a5d99); border-radius: 5px 5px 0 0; position: relative; min-width: 14px; }
.chart-bars .b.orange { background: linear-gradient(180deg,#E07B39,#f0a06b); }
.chart-bars .b.green { background: linear-gradient(180deg,#206A4F,#52A375); }
.chart-bars .b.muted { background: #e5e7eb; }
.chart-x { display: flex; gap: 6px; padding-top: 6px; }
.chart-x span { flex: 1; font-size: 10px; color: var(--fg-muted); text-align: center; font-weight: 600; }

/* Donut */
.donut { width: 140px; height: 140px; border-radius: 50%; display: grid; place-items: center; position: relative; }
.donut .center { text-align: center; }
.donut .center .v { font-size: 22px; font-weight: 800; }
.donut .center .l { font-size: 10px; color: var(--fg-muted); font-weight: 600; }

/* ===== Worker row ===== */
.flag { width: 22px; height: 16px; border-radius: 3px; flex: none; display: inline-block; }

/* ===== AI / NotebookLM ===== */
.ai-banner { background: linear-gradient(135deg,#1B3A6B 0%,#2a4d8a 100%); color: #fff; border-radius: 14px; padding: 18px 22px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-blue); position: relative; overflow: hidden; }
.ai-banner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 90% 50%,rgba(224,123,57,.15) 0%,transparent 50%); pointer-events: none; }
.ai-banner .icbox { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,.12); display: inline-flex; align-items: center; justify-content: center; flex: none; backdrop-filter: blur(6px); }
.ai-banner .body { flex: 1; }
.ai-banner h3 { margin: 0 0 4px; font-size: 16px; font-weight: 800; color: #fff; }
.ai-banner p { margin: 0; font-size: 12.5px; color: rgba(210,229,250,.85); }
.ai-banner .btn-cta { background: #E07B39; }

.nblm-template { background: #fff; border: 1px solid var(--border-default); border-radius: 12px; padding: 14px; cursor: pointer; transition: border-color .15s, box-shadow .15s; display: flex; flex-direction: column; gap: 6px; }
.nblm-template:hover { border-color: #1B3A6B; box-shadow: var(--shadow-md); }
.nblm-template .ic { width: 36px; height: 36px; border-radius: 9px; background: #ede9fe; color: #6d28d9; display: inline-flex; align-items: center; justify-content: center; }
.nblm-template .t { font-size: 13.5px; font-weight: 800; }
.nblm-template .d { font-size: 11.5px; color: var(--fg-muted); line-height: 1.45; }
.nblm-template .meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--fg-faint); margin-top: 4px; }

/* ===== Form ===== */
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 12px; font-weight: 600; color: var(--ink); }
.field input, .field select, .field textarea { font: inherit; padding: 9px 12px; border-radius: 8px; border: 1px solid var(--border-default); background: #fff; color: var(--ink); outline: none; }
.field input:focus { border-color: #1B3A6B; box-shadow: 0 0 0 3px rgba(27,58,107,.12); }
.field .hint { font-size: 11px; color: var(--fg-faint); }

/* ===== Steps wizard ===== */
.steps { display: flex; align-items: center; gap: 0; }
.step { display: flex; align-items: center; gap: 10px; flex: 1; }
.step .num { width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; background: #f3f4f6; color: var(--fg-muted); border: 2px solid #f3f4f6; flex: none; }
.step.done .num { background: #206A4F; color: #fff; border-color: #206A4F; }
.step.active .num { background: #fff; color: #1B3A6B; border-color: #1B3A6B; box-shadow: 0 0 0 4px rgba(27,58,107,.1); }
.step .lbl { font-size: 12px; font-weight: 600; color: var(--fg-muted); }
.step.active .lbl { color: var(--ink); font-weight: 700; }
.step.done .lbl { color: var(--ink); }
.step .conn { flex: 1; height: 2px; background: #f3f4f6; min-width: 16px; }
.step.done .conn { background: #206A4F; }

/* Mobile field card */
.field-card { background: linear-gradient(135deg,#1B3A6B,#15305A); border-radius: 24px; padding: 18px; color: #fff; box-shadow: var(--shadow-lg); }

/* utility */
.flex { display: flex; }
.row { display: flex; align-items: center; gap: 8px; }
.col { display: flex; flex-direction: column; gap: 8px; }
.gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
.space { flex: 1; }
.muted { color: var(--fg-muted); }
.faint { color: var(--fg-faint); }
.b { font-weight: 700; } .xb { font-weight: 800; }
.t-xs { font-size: 11px; } .t-sm { font-size: 12px; } .t-md { font-size: 13px; } .t-lg { font-size: 15px; } .t-xl { font-size: 18px; } .t-2xl { font-size: 22px; }
.center { text-align: center; }
.tnum { font-variant-numeric: tabular-nums; }
.right { text-align: end; }
.divider { height: 1px; background: var(--border-default); margin: 8px 0; }
.divider.v { width: 1px; height: 100%; background: var(--border-default); margin: 0 8px; }

/* sparkline */
.spark { width: 100%; height: 38px; }
===== END FILE =====
