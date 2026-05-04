# brand/mockups/02 — Marketplace & Owner-facing

Marketplace landing, listings, and the owner onboarding journey.

## Files included
- assets/mockups/marketplace_ui_kit.html      (B2C marketplace landing — hero + search + listings + trust band)
- assets/mockups/supply_a_owner_roadmap.html  (Private property owner onboarding journey / B2C onboarding flow)

===== FILE: assets/mockups/marketplace_ui_kit.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>OZ — Marketplace UI Kit</title>
<link rel="stylesheet" href="colors_and_type.css"/>
<style>
  body{margin:0;background:var(--bg-page);color:var(--ink);font-family:var(--font-sans)}
  .page{max-width:1280px;margin:0 auto}
  /* Nav */
  .nav{position:sticky;top:0;z-index:10;background:#1B3A6B;color:#fff;padding:14px 28px;display:flex;justify-content:space-between;align-items:center}
  .nav .logo{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:800}
  .nav .logo .o{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:#E07B39;font-size:14px}
  .nav .links{display:flex;gap:26px;font-size:14px;font-weight:500}
  .nav .links a{color:rgba(255,255,255,.92)}
  .nav .cta{background:#E07B39;color:#fff;padding:9px 18px;border-radius:8px;font-weight:700;font-size:13px}
  /* Hero */
  .hero{background:#1B3A6B;color:#fff;padding:64px 28px 80px;position:relative;overflow:hidden}
  .hero::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 30%, rgba(210,229,250,.08), transparent 50%);pointer-events:none}
  .hero .inner{max-width:1024px;margin:0 auto;position:relative}
  .pill{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;background:rgba(210,229,250,.12);border:1px solid rgba(210,229,250,.25);color:#D2E5FA;font-size:13px;font-weight:700;margin-bottom:18px}
  .pill .dot{width:8px;height:8px;border-radius:50%;background:#52A375;animation:p 2s ease-in-out infinite}
  @keyframes p{50%{opacity:.4}}
  .hero h1{font-size:48px;font-weight:800;letter-spacing:-.025em;line-height:1.1;margin:0 0 14px;color:#fff;max-width:860px}
  .hero .lead{font-size:18px;color:#D2E5FA;opacity:.92;margin:0 0 28px;max-width:640px;line-height:1.55}
  .hero .ctas{display:flex;gap:12px;flex-wrap:wrap}
  .btn-cta{background:#E07B39;color:#fff;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px;border:0;cursor:pointer;box-shadow:var(--shadow-orange);font-family:inherit}
  .btn-cta:hover{background:#C26A2C}
  .btn-out{background:transparent;color:#fff;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px;border:2px solid rgba(255,255,255,.4);cursor:pointer;font-family:inherit}
  .btn-out:hover{background:rgba(255,255,255,.08)}
  /* Search bar */
  .searchbar{max-width:1024px;margin:-32px auto 0;padding:0 28px;position:relative;z-index:5}
  .searchbar .box{background:#fff;border-radius:16px;box-shadow:var(--shadow-md);padding:16px;display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:10px;align-items:center}
  .searchbar input,.searchbar select{font-family:inherit;border:1px solid var(--border-default);border-radius:10px;padding:12px 14px;font-size:14px;color:var(--ink);background:#fff}
  .searchbar .btn-cta{padding:13px 22px;font-size:14px}
  /* Filters */
  .filters{max-width:1024px;margin:32px auto 0;padding:0 28px;display:flex;gap:8px;flex-wrap:wrap}
  .chip{font-size:12px;font-weight:700;padding:6px 14px;border-radius:9999px;background:#fff;color:#374151;border:1px solid var(--border-default);cursor:pointer}
  .chip.on{background:#1B3A6B;color:#fff;border-color:#1B3A6B}
  .chip.ver{background:#2D6A4F;color:#fff;border-color:#2D6A4F}
  /* Listings */
  .listings{max-width:1024px;margin:24px auto;padding:0 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .card{background:#fff;border-radius:16px;border:1px solid #eef0f3;box-shadow:var(--shadow-sm);overflow:hidden;display:flex;flex-direction:column;transition:transform .2s, box-shadow .2s}
  .card:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
  .card .img{aspect-ratio:16/10;background:linear-gradient(135deg,#D2E5FA,#1B3A6B);position:relative;display:flex;align-items:flex-start;justify-content:space-between;padding:12px}
  .card .img.alt{background:linear-gradient(135deg,#52A375,#2D6A4F)}
  .card .img.gray{background:linear-gradient(135deg,#E5E7EB,#9CA3AF)}
  .card .badges{display:flex;gap:6px;flex-wrap:wrap}
  .card .badge{font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;background:rgba(255,255,255,.95);color:#1B3A6B}
  .card .badge.ver{background:#2D6A4F;color:#fff}
  .card .body{padding:16px;display:flex;flex-direction:column;gap:6px;flex:1}
  .card h3{margin:0;font-size:16px;font-weight:800}
  .card .meta{font-size:13px;color:var(--fg-muted)}
  .card .price{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}
  .card .price .num{font-size:22px;font-weight:800;color:var(--ink)}
  .card .price .num small{font-size:12px;font-weight:500;color:var(--fg-muted)}
  .card .b2b{font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;background:#D2E5FA;color:#1B3A6B}
  .card .b2c{font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;background:#F3F4F6;color:#374151}
  .card .actions{display:flex;gap:8px;padding:0 16px 16px}
  .card .btn{flex:1;background:#E07B39;color:#fff;border:0;padding:11px;border-radius:12px;font-weight:700;font-size:13px;font-family:inherit;cursor:pointer}
  .card .btn:hover{background:#C26A2C}
  .card .btn-ghost{flex:none;background:#fff;color:#1B3A6B;border:1.5px solid var(--border-default);padding:11px 14px;border-radius:12px;font-weight:700;font-size:13px;font-family:inherit;cursor:pointer}
  /* Trust band */
  .trust{max-width:1024px;margin:24px auto;padding:18px 22px;background:var(--green-deep-soft);border:1px solid rgba(45,106,79,.2);border-radius:14px;display:flex;align-items:center;gap:14px}
  .trust .ic{font-size:22px;flex:none}
  .trust .t{font-weight:700;font-size:14px;color:#2D6A4F}
  .trust .d{font-size:13px;color:var(--fg-muted)}
  /* Section heading */
  .h2{max-width:1024px;margin:36px auto 12px;padding:0 28px;display:flex;align-items:baseline;gap:14px}
  .h2 h2{margin:0;font-size:22px;font-weight:800}
  .h2 small{font-size:13px;color:var(--fg-muted);font-weight:400}
  footer{background:#1B3A6B;color:rgba(255,255,255,.65);padding:32px 28px;font-size:13px;text-align:center;margin-top:48px}
</style>
</head>
<body>
<nav class="nav">
  <div class="links">
    <a href="#">מחשבון התאמה</a>
    <a href="#">בעלי נכסים</a>
    <a href="#">נכסים</a>
    <span class="cta">הצטרף כתאגיד</span>
  </div>
  <div class="logo"><span class="o">🏗</span> עוז</div>
</nav>

<section class="hero">
  <div class="inner">
    <span class="pill"><span class="dot"></span> פיילוט גוש דן פעיל</span>
    <h1>דיור לעובדים זרים — עומד בחוק, מנוהל בשטח</h1>
    <p class="lead">קבלני בנייה: מצאו דיור מאומת תוך 48 שעות. בעלי נכסים: הגדילו הכנסה ב-80%+ ממחיר שוק.</p>
    <div class="ctas">
      <button class="btn-cta">חפש נכס מתאים ←</button>
      <button class="btn-out">פרסם נכס</button>
    </div>
  </div>
</section>

<div class="searchbar">
  <div class="box">
    <input placeholder="📍 עיר / איזור (תל אביב, ראשל״צ…)"/>
    <select><option>כל מספרי המיטות</option><option>4-10 מיטות</option><option>10-20 מיטות</option><option>20+ מיטות</option></select>
    <select><option>טווח מחירים</option><option>עד 1,200₪/מיטה</option><option>1,200-1,500₪</option><option>1,500₪+</option></select>
    <button class="btn-cta">חפש</button>
  </div>
</div>

<div class="filters">
  <span class="chip on">הכל</span>
  <span class="chip ver">✓ מאומתים בלבד</span>
  <span class="chip">B2B</span>
  <span class="chip">B2C</span>
  <span class="chip">פנוי מיידית</span>
  <span class="chip">קרוב לאתר עבודה</span>
</div>

<div class="h2">
  <h2>נכסים זמינים</h2>
  <small>24 תוצאות · גוש דן</small>
</div>

<div class="listings">
  <article class="card">
    <div class="img"><div class="badges"><span class="badge ver">✓ מאומת</span><span class="badge">A</span></div></div>
    <div class="body">
      <h3>מתחם תל-אביב צפון</h3>
      <div class="meta">📍 תל אביב · 10 מיטות · 4.2 מ"ר/עובד</div>
      <div class="price"><div class="num">1,350₪ <small>/ מיטה</small></div><span class="b2b">B2B</span></div>
    </div>
    <div class="actions"><button class="btn">לפרטים</button><button class="btn-ghost">💬</button></div>
  </article>
  <article class="card">
    <div class="img alt"><div class="badges"><span class="badge ver">✓ מאומת</span><span class="badge">A</span></div></div>
    <div class="body">
      <h3>מתחם רמת-גן בורסה</h3>
      <div class="meta">📍 רמת גן · 16 מיטות · 4.5 מ"ר/עובד</div>
      <div class="price"><div class="num">1,400₪ <small>/ מיטה</small></div><span class="b2b">B2B</span></div>
    </div>
    <div class="actions"><button class="btn">לפרטים</button><button class="btn-ghost">💬</button></div>
  </article>
  <article class="card">
    <div class="img gray"><div class="badges"><span class="badge">B</span></div></div>
    <div class="body">
      <h3>דירת 4 חדרים — ראשל״צ</h3>
      <div class="meta">📍 ראשון לציון · 12 מיטות · 4.0 מ"ר/עובד</div>
      <div class="price"><div class="num">1,200₪ <small>/ מיטה</small></div><span class="b2c">B2C</span></div>
    </div>
    <div class="actions"><button class="btn">לפרטים</button><button class="btn-ghost">💬</button></div>
  </article>
</div>

<div class="trust">
  <div class="ic">✓</div>
  <div>
    <div class="t">כל נכס מאומת עומד בדרישות חוק עובדים זרים</div>
    <div class="d">מינימום 4 מ"ר לעובד · אוורור · שירותים תקניים · בדיקה פיזית כל 6 חודשים</div>
  </div>
</div>

<footer>עוז · WorkerHome — דיור עובדים מאומת · גוש דן 2026</footer>
</body>
</html>
===== END FILE =====

===== FILE: assets/mockups/supply_a_owner_roadmap.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>Supply Side A — Private Property Owner Roadmap</title>
<link rel="stylesheet" href="colors_and_type.css"/>
<style>
  body{margin:0;background:var(--bg-page);color:var(--ink);font-family:var(--font-sans);padding:32px 28px}
  .page{max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:28px}
  /* Header */
  .head{background:#1B3A6B;color:#fff;border-radius:18px;padding:28px 32px;position:relative;overflow:hidden}
  .head::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 10% 20%, rgba(210,229,250,.12), transparent 55%);pointer-events:none}
  .crumbs{font-size:12px;color:#D2E5FA;opacity:.75;font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px}
  .head h1{margin:0 0 8px;font-size:30px;font-weight:800;letter-spacing:-.02em;line-height:1.15}
  .head .sub{margin:0;font-size:15px;color:#D2E5FA;opacity:.92;max-width:780px;line-height:1.55}
  .head .meta{display:flex;gap:18px;font-size:12px;color:#D2E5FA;opacity:.75;margin-top:14px;flex-wrap:wrap}
  .head .meta b{color:#fff;font-weight:700;opacity:1}
  /* Persona row */
  .persona{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .pcard{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:18px 20px;box-shadow:var(--shadow-sm)}
  .pcard h3{margin:0 0 6px;font-size:14px;font-weight:800}
  .pcard p{margin:0;font-size:13px;color:var(--fg-muted);line-height:1.5}
  .pcard .tag{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;background:#D2E5FA;color:#1B3A6B;margin-bottom:8px}
  .pcard.alt .tag{background:#F3F4F6;color:#374151}
  /* Section heading */
  .sec{display:flex;align-items:baseline;gap:14px;justify-content:space-between}
  .sec-l{display:flex;align-items:baseline;gap:14px}
  .sec h2{margin:0;font-size:22px;font-weight:800;letter-spacing:-.015em}
  .sec .count{font-size:12px;font-weight:700;padding:4px 12px;border-radius:9999px;background:#D2E5FA;color:#1B3A6B}
  .sec .count.future{background:#FEF3E8;color:#E07B39}
  .sec .legend{font-size:13px;color:var(--fg-muted)}
  /* Feature grid */
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .feat{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:10px;box-shadow:var(--shadow-sm);position:relative;transition:transform .15s, box-shadow .15s}
  .feat:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
  .feat .num{position:absolute;top:14px;left:14px;width:26px;height:26px;border-radius:8px;background:#F7F8FA;color:var(--fg-muted);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;font-variant-numeric:tabular-nums}
  .feat .ic{width:42px;height:42px;border-radius:11px;background:#D2E5FA;color:#1B3A6B;display:inline-flex;align-items:center;justify-content:center;font-size:20px}
  .feat h3{margin:0;font-size:14.5px;font-weight:800;line-height:1.3}
  .feat p{margin:0;font-size:12.5px;color:var(--fg-muted);line-height:1.5}
  .feat .meta{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto;padding-top:6px}
  .chip{font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:9999px;background:#F3F4F6;color:#374151;letter-spacing:.02em}
  .chip.ver{background:rgba(45,106,79,.1);color:#2D6A4F}
  .chip.pen{background:#FFFBEB;color:#92400E;border:1px solid #FDE68A}
  .chip.lock{background:#FEF3E8;color:#E07B39}
  /* Future variant */
  .feat.future{background:#FFFEFB;border:1.5px dashed #FDE0BF}
  .feat.future .ic{background:#FEF3E8;color:#E07B39}
  /* Tier card */
  .tiers{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
  .tier{border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:8px;border:1px solid #eef0f3;background:#fff;box-shadow:var(--shadow-sm)}
  .tier .lbl{font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-faint)}
  .tier .name{font-size:18px;font-weight:800}
  .tier .desc{font-size:13px;color:var(--fg-muted);line-height:1.5;margin:0}
  .tier .price{font-size:13px;font-weight:700;margin-top:auto;padding-top:8px;border-top:1px dashed #eef0f3}
  .tier.t1{border-color:#E5E7EB}
  .tier.t1 .name{color:var(--fg-default)}
  .tier.t2{border-color:#52A375;background:linear-gradient(180deg,rgba(82,163,117,.06),#fff 60%)}
  .tier.t2 .name{color:#2D6A4F}
  .tier.t3{border:1.5px dashed #FDE0BF;background:#FFFEFB}
  .tier.t3 .name{color:#E07B39}
  .tier .badge{align-self:flex-start;font-size:11px;font-weight:800;padding:3px 10px;border-radius:9999px}
  .tier.t1 .badge{background:#F3F4F6;color:#374151}
  .tier.t2 .badge{background:#2D6A4F;color:#fff}
  .tier.t3 .badge{background:#FEF3E8;color:#E07B39}
  /* Trust panel */
  .trust{display:grid;grid-template-columns:1.4fr 1fr;gap:14px}
  .panel{background:#fff;border:1px solid #eef0f3;border-radius:14px;padding:22px 24px;box-shadow:var(--shadow-sm)}
  .panel h3{margin:0 0 4px;font-size:16px;font-weight:800}
  .panel .lead{margin:0 0 12px;font-size:13px;color:var(--fg-muted);line-height:1.55}
  .signals{display:flex;flex-direction:column;gap:10px}
  .sig{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;background:var(--green-deep-soft);border:1px solid rgba(45,106,79,.18);border-radius:10px}
  .sig .si{flex:none;width:32px;height:32px;border-radius:9px;background:#2D6A4F;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:800}
  .sig .st{font-weight:700;font-size:13.5px;color:var(--ink);margin:0 0 2px}
  .sig .sd{font-size:12.5px;color:var(--fg-muted);margin:0;line-height:1.45}
  .future-note{background:#FFFEFB;border:1.5px dashed #FDE0BF;border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:8px}
  .future-note h4{margin:0;font-size:13px;font-weight:800;color:#E07B39;text-transform:uppercase;letter-spacing:.04em}
  .future-note p{margin:0;font-size:12.5px;color:var(--fg-muted);line-height:1.5}
  /* Open question callout */
  .oq{background:#FFFBEB;border:1px solid #FDE68A;border-radius:14px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start}
  .oq .qi{flex:none;width:36px;height:36px;border-radius:10px;background:#F59E0B;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:18px}
  .oq h4{margin:0 0 4px;font-size:13px;font-weight:800;color:#92400E;text-transform:uppercase;letter-spacing:.04em}
  .oq p{margin:0;font-size:13px;color:#78350F;line-height:1.55}
  /* Footer meta */
  .foot{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:#fff;border:1px solid #eef0f3;border-radius:12px;font-size:12.5px;color:var(--fg-muted)}
  .foot b{color:var(--ink);font-weight:700}
  /* Inline pending tag for OQ */
  .pending-inline{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:9999px;background:#FFFBEB;color:#92400E;border:1px solid #FDE68A;margin-inline-start:8px;vertical-align:middle;text-transform:uppercase;letter-spacing:.04em}
</style>
</head>
<body>
<div class="page">

  <header class="head">
    <div class="crumbs">Supply Side A · B2C</div>
    <h1>Private Property Owner — Dashboard & Workflows</h1>
    <p class="sub">בעלי דירה פרטיים שמשכירים דיור לעובדים זרים. ההבחנה מ-Supply Side B (Property Managers) היא היקף וכוונה מקצועית — לא הגבלת מספר נכסים במערכת.</p>
    <div class="meta">
      <div><b>Persona:</b> Individual property owners</div>
      <div><b>Last updated:</b> 27/04/2026</div>
      <div><b>Owner:</b> Adir Amsalem</div>
      <div><b>MVP:</b> 8 features · <b>Future:</b> 5 features</div>
    </div>
  </header>

  <!-- Persona distinction -->
  <section class="persona">
    <div class="pcard">
      <span class="tag">Supply Side A · B2C · MVP</span>
      <h3>Private Property Owner</h3>
      <p>בעל דירה אחת או כמה. מנהל בעצמו, לא מקצועי. נכנס למערכת כדי להגדיל תשואה — לא במקום עבודה.</p>
    </div>
    <div class="pcard alt">
      <span class="tag">Supply Side B · Future scope</span>
      <h3>Property Manager</h3>
      <p>תיק נכסים מקצועי, scale-driven. אותן יכולות בסיס, אבל עם כלים מתקדמים יותר (bulk ops, sub-accounts) — לא ב-MVP.</p>
    </div>
  </section>

  <!-- Open question banner #1 -->
  <div class="oq">
    <div class="qi">?</div>
    <div>
      <h4>Open question · Persona</h4>
      <p>האם "Private Owner" ו-"Property Manager" צריכים להתמזג בעתיד לפרסונה אחת עם progressive feature unlocks? סומן לבדיקה — לא חוסם MVP.</p>
    </div>
  </div>

  <!-- MVP grid -->
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="sec">
      <div class="sec-l"><h2>MVP — Phase 1</h2><span class="count">8 features</span></div>
      <span class="legend">בליבה: רישום נכס · אימות בסיסי · ניהול שוכרים · תקשורת · ציות</span>
    </div>
    <div class="grid">
      <article class="feat">
        <div class="num">01</div>
        <div class="ic">🪪</div>
        <h3>Onboarding & Identity</h3>
        <p>הרשמה (Google OAuth / SMS OTP), אימות ת"ז ישראלית, הקמת פרופיל.</p>
        <div class="meta"><span class="chip">Auth</span><span class="chip ver">✓ Verified ID</span></div>
      </article>
      <article class="feat">
        <div class="num">02</div>
        <div class="ic">🏠</div>
        <h3>Property Listing</h3>
        <p>יצירה / עריכה / השהיה / הסרה. תמונות, תיאור, שירותים, חוקי בית, קיבולת.</p>
        <div class="meta"><span class="chip">CRUD</span><span class="chip">Photos</span></div>
      </article>
      <article class="feat">
        <div class="num">03</div>
        <div class="ic">✓</div>
        <h3>Property Verification</h3>
        <p>Tier 1 (default unverified) + Tier 2 (remote attestation: מימדים + תמונות).</p>
        <div class="meta"><span class="chip">Tier 1</span><span class="chip ver">Tier 2</span></div>
      </article>
      <article class="feat">
        <div class="num">04</div>
        <div class="ic">💸</div>
        <h3>Yield Calculator & Pricing</h3>
        <p>הרצת המחשבון, קבלת מחיר/מיטה מומלץ, קביעת מחיר רישום.</p>
        <div class="meta"><span class="chip">Calc</span><span class="chip">Pricing</span></div>
      </article>
      <article class="feat">
        <div class="num">05</div>
        <div class="ic">👥</div>
        <h3>Tenant & Tenancy Management</h3>
        <p>צפייה בתאגיד שוכר + עובדים משויכים. כניסה / יציאה, תפוסה.</p>
        <div class="meta"><span class="chip">Occupancy</span></div>
      </article>
      <article class="feat">
        <div class="num">06</div>
        <div class="ic">💬</div>
        <h3>Communication</h3>
        <p>תיבת דואר עם תאגידים. העדפות התראה (אימייל / SMS).</p>
        <div class="meta"><span class="chip">Inbox</span><span class="chip">Notifications</span></div>
      </article>
      <article class="feat">
        <div class="num">07</div>
        <div class="ic">⚖️</div>
        <h3>Compliance Documentation</h3>
        <p>תיק תיעוד ציות נכס, התראות רגולטוריות.</p>
        <div class="meta"><span class="chip">Compliance</span><span class="chip">Alerts</span></div>
      </article>
      <article class="feat">
        <div class="num">08</div>
        <div class="ic">⚙️</div>
        <h3>Account, Settings & Support</h3>
        <p>פרופיל, התראות, ייצוא נתונים, מחיקת חשבון, עזרה / תמיכה.</p>
        <div class="meta"><span class="chip">Settings</span><span class="chip">GDPR</span></div>
      </article>
    </div>
  </section>

  <!-- Verification Tiers -->
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="sec">
      <div class="sec-l"><h2>Verification Tiers</h2></div>
      <span class="legend">משלב Tier 1/2 ב-MVP, מתרחב ל-Tier 3 (Future)</span>
    </div>
    <div class="tiers">
      <div class="tier t1">
        <span class="lbl">Tier 1 · MVP</span>
        <div class="name">Unverified — Default</div>
        <span class="badge">Default</span>
        <p class="desc">כל בעל נכס מתחיל פה. ת"ז מאומתת, אבל הנכס עדיין לא הוכח.</p>
        <div class="price">ללא עלות</div>
      </div>
      <div class="tier t2">
        <span class="lbl">Tier 2 · MVP</span>
        <div class="name">Remote Attestation</div>
        <span class="badge">✓ Verified</span>
        <p class="desc">בעל הנכס מצהיר על מימדים + מעלה תמונות. בדיקה אוטומטית + מדגם ידני.</p>
        <div class="price">ללא עלות · self-serve</div>
      </div>
      <div class="tier t3">
        <span class="lbl">Tier 3 · Future</span>
        <div class="name">On-site Inspection</div>
        <span class="badge">🔮 Future</span>
        <p class="desc">ביקור פיזי מאומת על ידי המערכת. רמה הגבוהה ביותר של אמון לקבלן.</p>
        <div class="price">₪750 ראשוני · ₪500 חוזר</div>
      </div>
    </div>
  </section>

  <!-- Future grid -->
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="sec">
      <div class="sec-l"><h2>Future — Phase 2 / Post-MVP</h2><span class="count future">5 features</span></div>
      <span class="legend">תלוי בהפעלת ה-Marketplace הציבורי</span>
    </div>
    <div class="grid">
      <article class="feat future">
        <div class="num">09</div>
        <div class="ic">🏗</div>
        <h3>Verification — Tier 3</h3>
        <p>ביקורת פיזית בתשלום (₪750 ראשוני / ₪500 חוזר).</p>
        <div class="meta"><span class="chip lock">🔮 Future</span><span class="chip">Paid</span></div>
      </article>
      <article class="feat future">
        <div class="num">10</div>
        <div class="ic">🔍</div>
        <h3>Marketplace Visibility</h3>
        <p>רישום ציבורי בחיפוש קבלנים. פניות, instant-book vs request.</p>
        <div class="meta"><span class="chip lock">🔮 Future</span><span class="chip">Public</span></div>
      </article>
      <article class="feat future">
        <div class="num">11</div>
        <div class="ic">📝</div>
        <h3>Deal Closing & Contracts <span class="pending-inline">? Pending</span></h3>
        <p>חוזה תקני 12 חודשים + flow חתימה אלקטרונית.</p>
        <div class="meta"><span class="chip lock">🔮 Future</span><span class="chip pen">Decision pending</span></div>
      </article>
      <article class="feat future">
        <div class="num">12</div>
        <div class="ic">📈</div>
        <h3>Earnings & Payouts <span class="pending-inline">? Pending</span></h3>
        <p>דאשבורד הכנסות, תשלומים, דוחות חודשיים, מסמכים לרשויות.</p>
        <div class="meta"><span class="chip lock">🔮 Future</span><span class="chip pen">Decision pending</span></div>
      </article>
      <article class="feat future">
        <div class="num">13</div>
        <div class="ic">⭐</div>
        <h3>Ratings & Reviews</h3>
        <p>דירוגים דו-כיווניים תאגיד ↔ בעל נכס. תג "verified owner".</p>
        <div class="meta"><span class="chip lock">🔮 Future</span><span class="chip">Public</span></div>
      </article>
    </div>
  </section>

  <!-- Open question banner #2 -->
  <div class="oq">
    <div class="qi">?</div>
    <div>
      <h4>Open question · Phase boundary</h4>
      <p>פיצ'רים 11 (Deal Closing) ו-12 (Earnings) משויכים ל-Future כי הם משלימים את Marketplace Visibility (Phase 2). שאלה פתוחה: האם להעביר אחד מהם ל-MVP עבור בעלי נכסים שעובדים off-marketplace ישירות?</p>
    </div>
  </div>

  <!-- Trust signals -->
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="sec">
      <div class="sec-l"><h2>MVP Trust Signals</h2></div>
      <span class="legend">בהיעדר ratings & reviews ב-MVP</span>
    </div>
    <div class="trust">
      <div class="panel">
        <h3>איך בעל נכס בונה אמון לפני שיש דירוגים?</h3>
        <p class="lead">שלושה אותות שעובדים יחד. כשהקבלן רואה את שלושתם — האמון מתבסס גם בלי reviews.</p>
        <div class="signals">
          <div class="sig">
            <div class="si">✓</div>
            <div><p class="st">Verification badge — Tier 1 vs Tier 2</p><p class="sd">תג ויזואלי קבוע על הכרטיס. Tier 2 = ירוק כהה, Tier 1 = ניטרלי. הקבלן רואה את הסטטוס מיד בחיפוש.</p></div>
          </div>
          <div class="sig">
            <div class="si">🪪</div>
            <div><p class="st">Identity verification — ת"ז ישראלית</p><p class="sd">מאומת בעת ההרשמה. הקבלן יודע שמולו אדם אמיתי, לא חשבון מזויף.</p></div>
          </div>
          <div class="sig">
            <div class="si">📋</div>
            <div><p class="st">Listing completeness</p><p class="sd">תמונות, תיאור, שירותים, חוקי בית. progress bar בדאשבורד של הבעלים — מעודד למלא הכל.</p></div>
          </div>
        </div>
      </div>
      <div class="future-note">
        <h4>Forward-compatible by design</h4>
        <p>ה-badge component ושדה verification status מתוכננים מראש להכיל Tier 3 + ratings. כשהפיצ'רים יושקו ב-Phase 2 — אין refactor. רק הוספה.</p>
        <p style="margin-top:6px"><b>Implication:</b> מבנה הנתונים של ה-listing כולל מראש שדות לדירוג ו-Tier 3, גם אם לא מוצגים ב-UI כרגע.</p>
      </div>
    </div>
  </section>

  <!-- Acceptance Criteria placeholder -->
  <div class="panel" style="display:flex;align-items:center;gap:14px">
    <div style="flex:none;width:42px;height:42px;border-radius:10px;background:#D2E5FA;color:#1B3A6B;display:inline-flex;align-items:center;justify-content:center;font-size:20px">📋</div>
    <div style="flex:1">
      <h3 style="margin:0 0 2px">Acceptance Criteria — Pending</h3>
      <p style="margin:0;font-size:13px;color:var(--fg-muted)">יוגדר feature-by-feature: <b>Feature → User Story → AC checklist → Edge cases / Open questions</b>. ה-MVP יפורט קודם, בסדר מספרי אלא אם יוקבע אחרת.</p>
    </div>
    <span class="chip pen">Pending</span>
  </div>

  <div class="foot">
    <span><b>Last updated:</b> 27/04/2026</span>
    <span><b>Owner:</b> Adir Amsalem</span>
    <span><b>Related:</b> PROJECT_SPECS.md</span>
  </div>

</div>
</body>
</html>
===== END FILE =====
