# brand/mockups/03 — Hostel Booking Engine

Hostel booking-engine SPA (current iteration plus earlier v1).

## Files included
- assets/mockups/AM_Hostels_Booking_System.html     (Hostel booking — current iteration)
- assets/mockups/AM_Hostels_Booking_System_v1.html  (Hostel booking — earlier iteration, archive)

===== FILE: assets/mockups/AM_Hostels_Booking_System.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>AM HOSTELS — מערכת לינה לעובדים</title>
<link rel="stylesheet" href="colors_and_type.css"/>
<style>
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg-page); color:var(--ink); font-family:var(--font-sans); }
  button { font-family: inherit; cursor: pointer; border: 0; background: none; }
  input, select, textarea { font-family: inherit; }
  a { color: inherit; }

  /* ===== Top Nav ===== */
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: var(--blue-deep); color: #fff;
    padding: 14px 28px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .nav .links { display: flex; gap: 22px; font-size: 14px; font-weight: 500; align-items: center; }
  .nav .links a { color: rgba(255,255,255,.92); cursor: pointer; }
  .nav .links a.on { color: #fff; font-weight: 700; }
  .nav .links .sep { color: rgba(255,255,255,.25); }
  .nav .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 19px; cursor: pointer; }
  .nav .logo .glyph {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px; background: var(--orange);
    font-size: 15px;
  }
  .nav .logo .sub { font-size: 11px; font-weight: 600; opacity: .7; letter-spacing: .08em; }
  .nav-pill {
    font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px;
    background: rgba(210,229,250,.12); color: #D2E5FA;
    border: 1px solid rgba(210,229,250,.2);
  }

  .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .container-narrow { max-width: 880px; margin: 0 auto; padding: 0 24px; }

  /* ===== HERO (home) ===== */
  .hero {
    background: var(--blue-deep); color: #fff;
    padding: 56px 28px 80px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ""; position: absolute; inset: 0;
    background:
      radial-gradient(circle at 18% 40%, rgba(224,123,57,.12), transparent 50%),
      radial-gradient(circle at 82% 20%, rgba(82,163,117,.10), transparent 45%);
    pointer-events: none;
  }
  .hero .inner { max-width: 1024px; margin: 0 auto; position: relative; }
  .hero .pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 999px;
    background: rgba(82,163,117,.18); color: #C9E8D6;
    border: 1px solid rgba(82,163,117,.35);
    font-size: 13px; font-weight: 700; margin-bottom: 18px;
  }
  .hero .pill .dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--green-light);
    animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
  }
  @keyframes pulse { 50% { opacity: .35; } }
  .hero h1 {
    font-size: 48px; font-weight: 800; letter-spacing: -.025em;
    line-height: 1.08; margin: 0 0 14px; color: #fff; max-width: 800px;
  }
  .hero .lead {
    font-size: 18px; color: #D2E5FA; opacity: .92;
    margin: 0 0 28px; max-width: 620px; line-height: 1.55;
  }
  .hero .meta {
    display: flex; gap: 22px; flex-wrap: wrap; font-size: 14px;
    color: rgba(255,255,255,.85);
  }
  .hero .meta b { color: #fff; font-weight: 700; }

  /* ===== Search Bar (overlapping hero) ===== */
  .searchbar { max-width: 1024px; margin: -36px auto 0; padding: 0 28px; position: relative; z-index: 5; }
  .searchbar .box {
    background: #fff; border-radius: 16px; box-shadow: var(--shadow-md);
    padding: 14px; display: grid;
    grid-template-columns: 1.4fr 1.2fr 1fr 1fr auto; gap: 10px; align-items: stretch;
    border: 1px solid var(--border-default);
  }
  .field { display: flex; flex-direction: column; gap: 2px; padding: 6px 12px; border-radius: 10px; cursor: pointer; }
  .field:hover { background: var(--bg-soft); }
  .field label { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; }
  .field .val { font-size: 14px; font-weight: 600; color: var(--ink); }
  .field .val.muted { color: var(--gray-400); font-weight: 500; }
  .searchbar select, .searchbar input {
    border: 0; background: transparent; outline: none;
    font-size: 14px; font-weight: 600; color: var(--ink);
    padding: 0; margin: 0;
  }
  .btn-cta {
    background: var(--orange); color: #fff;
    padding: 12px 26px; border-radius: 12px;
    font-weight: 700; font-size: 14px;
    box-shadow: var(--shadow-orange);
    transition: transform 150ms ease, background 150ms ease;
  }
  .btn-cta:hover { background: var(--orange-hover); transform: translateY(-1px); }
  .btn-cta:active { transform: scale(.97); }
  .btn-cta.lg { padding: 14px 30px; font-size: 15px; border-radius: 14px; }
  .btn-cta.full { width: 100%; padding: 14px; font-size: 15px; }

  .btn-out {
    background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.4);
    padding: 12px 26px; border-radius: 12px; font-weight: 700; font-size: 14px;
    transition: background 150ms ease;
  }
  .btn-out:hover { background: rgba(255,255,255,.08); }

  .btn-ghost {
    background: #fff; color: var(--blue-deep);
    border: 1.5px solid var(--border-default);
    padding: 11px 18px; border-radius: 12px; font-weight: 700; font-size: 14px;
    transition: border-color 150ms ease;
  }
  .btn-ghost:hover { border-color: var(--blue-deep); }

  /* ===== Section Heading ===== */
  .h2 { display: flex; align-items: baseline; gap: 14px; margin: 56px 0 20px; }
  .h2 h2 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -.01em; }
  .h2 small { font-size: 13px; color: var(--fg-muted); font-weight: 500; }
  .h2 .more { margin-inline-start: auto; font-size: 14px; font-weight: 700; color: var(--blue-deep); cursor: pointer; }

  /* ===== Hostel Cube Cards (home) ===== */
  .hostels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 32px; }
  @media (max-width: 1024px) { .hostels { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 580px) { .hostels { grid-template-columns: 1fr; } }
  .hcube {
    background: #fff; border-radius: 20px; overflow: hidden;
    border: 1px solid var(--border-default); box-shadow: var(--shadow-sm);
    transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
    cursor: pointer; display: flex; flex-direction: column;
  }
  .hcube:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--blue-deep); }
  .hcube:hover .hcube-img::after { opacity: .7; }
  .hcube-img {
    aspect-ratio: 4/3; position: relative; overflow: hidden;
    display: flex; align-items: flex-end; padding: 14px;
  }
  .hcube-img::before {
    content: ""; position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform 400ms ease;
  }
  .hcube:hover .hcube-img::before { transform: scale(1.06); }
  .hcube-img::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,.65) 100%);
    transition: opacity 200ms ease;
  }
  .hcube[data-key="jerusalem"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(27,58,107,.55), rgba(27,58,107,.85)),
      url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80');
  }
  .hcube[data-key="tel"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(45,106,79,.45), rgba(45,106,79,.85)),
      url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80');
  }
  .hcube[data-key="haifa"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(30,30,46,.5), rgba(30,30,46,.85)),
      url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80');
  }
  .hcube[data-key="beer"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(82,163,117,.45), rgba(27,58,107,.85)),
      url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80');
  }
  .hcube-tag {
    position: absolute; top: 14px; inset-inline-start: 14px; z-index: 1;
    font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
    background: rgba(255,255,255,.95); color: var(--blue-deep);
  }
  .hcube-status {
    position: absolute; top: 14px; inset-inline-end: 14px; z-index: 1;
    font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
    background: var(--green-light); color: #fff;
    display: inline-flex; align-items: center; gap: 5px;
  }
  .hcube-status .dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; animation: pulse 2s ease infinite; }
  .hcube-titlewrap { position: relative; z-index: 1; color: #fff; }
  .hcube-titlewrap .glyph { font-size: 24px; }
  .hcube-titlewrap h3 { margin: 4px 0 0; font-size: 22px; font-weight: 800; letter-spacing: -.01em; line-height: 1.15; }
  .hcube-titlewrap .city { font-size: 13px; opacity: .9; margin-top: 2px; }
  .hcube-body { padding: 16px 18px 14px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .hcube-body .desc { font-size: 13px; color: var(--gray-600); line-height: 1.5; min-height: 60px; }
  .hcube-stats { display: flex; gap: 14px; font-size: 12px; color: var(--gray-500); padding-top: 6px; border-top: 1px dashed var(--border-default); }
  .hcube-stats b { color: var(--ink); font-weight: 700; }
  .hcube-foot {
    padding: 12px 18px 16px; display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--border-default);
  }
  .hcube-price b { font-size: 18px; font-weight: 800; color: var(--ink); }
  .hcube-price small { font-size: 12px; color: var(--gray-500); font-weight: 500; }
  .hcube-cta {
    background: var(--orange); color: #fff;
    font-size: 13px; font-weight: 700; padding: 9px 16px; border-radius: 10px;
    transition: background 150ms ease;
  }
  .hcube-cta:hover { background: var(--orange-hover); }

  /* ===== Trust band ===== */
  .trust-band {
    background: rgba(45,106,79,.08); border: 1px solid rgba(45,106,79,.2);
    border-radius: 14px; padding: 18px 22px;
    display: flex; align-items: center; gap: 16px; margin: 28px 0;
  }
  .trust-band .ic { font-size: 26px; flex: none; }
  .trust-band .t { font-weight: 700; font-size: 15px; color: var(--green-deep); }
  .trust-band .d { font-size: 13px; color: var(--fg-muted); margin-top: 2px; }

  /* ===== How It Works ===== */
  .how { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
  @media (max-width: 800px) { .how { grid-template-columns: repeat(2, 1fr); } }
  .step {
    background: #fff; border-radius: 16px; padding: 20px;
    border: 1px solid var(--border-default);
  }
  .step .n {
    width: 32px; height: 32px; border-radius: 999px;
    background: var(--blue-light); color: var(--blue-deep);
    font-weight: 800; font-size: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
  }
  .step h4 { margin: 0 0 6px; font-size: 16px; font-weight: 700; }
  .step p { font-size: 13px; color: var(--gray-600); margin: 0; line-height: 1.5; }

  /* ===== Footer ===== */
  footer {
    background: #15264a; color: rgba(255,255,255,.7); padding: 36px 28px;
    margin-top: 60px;
  }
  footer .inner { max-width: 1024px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; font-size: 13px; }
  footer .logo { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 800; font-size: 18px; }
  footer .logo .glyph {
    width: 30px; height: 30px; border-radius: 8px; background: var(--orange);
    display: inline-flex; align-items: center; justify-content: center;
  }
  footer a { color: rgba(255,255,255,.7); }
  footer .links { display: flex; gap: 18px; }

  /* ===== Hostel Detail Page ===== */
  .hd-hero {
    position: relative; height: 360px; overflow: hidden;
    background-size: cover; background-position: center;
  }
  .hd-hero::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.65) 100%);
  }
  .hd-hero .crumbs {
    position: absolute; top: 18px; inset-inline-start: 0; right: 0; z-index: 2;
    max-width: 1180px; margin: 0 auto; padding: 0 24px;
    color: rgba(255,255,255,.85); font-size: 13px; font-weight: 500;
  }
  .hd-hero .crumbs a { color: rgba(255,255,255,.85); cursor: pointer; }
  .hd-hero .crumbs span { margin: 0 8px; }
  .hd-hero .title-wrap {
    position: absolute; bottom: 28px; inset-inline-start: 0; right: 0; z-index: 2;
    max-width: 1180px; margin: 0 auto; padding: 0 24px;
    color: #fff;
  }
  .hd-hero h1 { color: #fff; font-size: 44px; font-weight: 800; letter-spacing: -.02em; margin: 6px 0; }
  .hd-hero .city { font-size: 15px; opacity: .92; }
  .hd-hero .badges { display: flex; gap: 8px; margin-top: 8px; }
  .hd-hero .badges .b {
    font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px;
    background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25);
  }
  .hd-hero .badges .b.ver { background: var(--green-deep); border-color: var(--green-deep); }

  .hd-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; margin-top: 36px; align-items: start; }
  @media (max-width: 920px) { .hd-grid { grid-template-columns: 1fr; } }

  .hd-section h2 { font-size: 22px; font-weight: 800; margin: 0 0 12px; }
  .hd-desc { font-size: 15px; line-height: 1.7; color: var(--gray-700); }

  .amenities { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 18px; }
  @media (max-width: 600px) { .amenities { grid-template-columns: repeat(2, 1fr); } }
  .amenities .a {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 12px; padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; font-weight: 500;
  }
  .amenities .a .ic { font-size: 18px; }

  /* Room types */
  .rooms { display: flex; flex-direction: column; gap: 14px; margin-top: 12px; }
  .room {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 16px; padding: 18px;
    display: grid; grid-template-columns: 110px 1fr auto; gap: 16px; align-items: center;
  }
  @media (max-width: 600px) { .room { grid-template-columns: 1fr; } }
  .room.selected { border-color: var(--blue-deep); box-shadow: 0 0 0 3px rgba(27,58,107,.08); }
  .room .icon-wrap {
    aspect-ratio: 1/1; border-radius: 12px;
    background: var(--blue-light); color: var(--blue-deep);
    display: flex; align-items: center; justify-content: center;
    font-size: 38px;
  }
  .room.dorm .icon-wrap { background: rgba(82,163,117,.15); color: var(--green-deep); }
  .room.capsule .icon-wrap { background: rgba(224,123,57,.15); color: var(--orange-hover); }
  .room h4 { margin: 0 0 4px; font-size: 17px; font-weight: 700; }
  .room .meta { font-size: 13px; color: var(--gray-600); }
  .room .feats { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .room .feats span {
    font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 999px;
    background: var(--bg-soft); color: var(--gray-700); border: 1px solid var(--border-default);
  }
  .room .price-side { text-align: end; }
  .room .price-side .num { font-size: 22px; font-weight: 800; }
  .room .price-side .per { font-size: 12px; color: var(--gray-500); }
  .room .price-side .avail { font-size: 12px; color: var(--green-deep); font-weight: 700; margin-top: 6px; }
  .room .price-side .avail.low { color: var(--orange-hover); }
  .room .price-side button { margin-top: 8px; }

  /* Booking sidebar (sticky) */
  .book-side {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 18px; padding: 22px; box-shadow: var(--shadow-md);
    position: sticky; top: 90px;
  }
  .book-side h3 { margin: 0 0 4px; font-size: 16px; font-weight: 700; color: var(--gray-500); font-weight: 600; }
  .book-side .price-now { font-size: 28px; font-weight: 800; color: var(--ink); }
  .book-side .price-now small { font-size: 14px; color: var(--gray-500); font-weight: 500; }
  .book-side .row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
  .book-side .inp {
    border: 1px solid var(--border-default); border-radius: 10px; padding: 10px 12px;
    font-size: 13px; display: flex; flex-direction: column; gap: 2px;
  }
  .book-side .inp label { font-size: 10px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; }
  .book-side .inp input, .book-side .inp select { border: 0; padding: 0; font-size: 14px; font-weight: 600; color: var(--ink); background: transparent; outline: none; }
  .book-side .summary { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-default); display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
  .book-side .summary .ln { display: flex; justify-content: space-between; color: var(--gray-700); }
  .book-side .summary .total { display: flex; justify-content: space-between; font-size: 17px; font-weight: 800; color: var(--ink); padding-top: 8px; border-top: 1px dashed var(--border-default); }
  .book-side .micro { font-size: 12px; color: var(--gray-500); margin-top: 12px; line-height: 1.5; text-align: center; }

  /* ===== Booking flow steps ===== */
  .stepper {
    display: flex; gap: 0; margin: 28px 0; align-items: center;
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 14px; padding: 6px;
  }
  .stepper .s {
    flex: 1; display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px; font-size: 14px; font-weight: 600;
    color: var(--gray-500);
  }
  .stepper .s.on { background: var(--blue-light); color: var(--blue-deep); font-weight: 700; }
  .stepper .s.done { color: var(--green-deep); }
  .stepper .s .n {
    width: 24px; height: 24px; border-radius: 999px;
    background: var(--bg-soft); color: var(--gray-500);
    font-weight: 800; font-size: 12px;
    display: inline-flex; align-items: center; justify-content: center;
    border: 1px solid var(--border-default);
  }
  .stepper .s.on .n { background: var(--blue-deep); color: #fff; border-color: var(--blue-deep); }
  .stepper .s.done .n { background: var(--green-deep); color: #fff; border-color: var(--green-deep); }
  .stepper .arrow { color: var(--gray-300); font-size: 14px; }

  /* Calendar */
  .calwrap { background: #fff; border: 1px solid var(--border-default); border-radius: 16px; padding: 20px; }
  .calhead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .calhead h3 { margin: 0; font-size: 16px; font-weight: 700; }
  .calhead .nav-btn { background: var(--bg-soft); border-radius: 8px; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; }
  .cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .cal .dow { font-size: 11px; font-weight: 700; color: var(--gray-500); text-align: center; padding: 6px 0; }
  .cal .d {
    aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 500; border-radius: 8px;
    cursor: pointer; transition: background 100ms ease;
  }
  .cal .d:hover { background: var(--bg-soft); }
  .cal .d.dim { color: var(--gray-300); cursor: default; }
  .cal .d.in { background: var(--blue-deep); color: #fff; font-weight: 700; }
  .cal .d.out { background: var(--blue-deep); color: #fff; font-weight: 700; }
  .cal .d.range { background: var(--blue-light); color: var(--blue-deep); border-radius: 0; }
  .cal .d.range.first { border-radius: 8px 0 0 8px; }
  .cal .d.range.last { border-radius: 0 8px 8px 0; }
  .cal .d.blocked { background: rgba(239,68,68,.08); color: var(--red-500); cursor: not-allowed; text-decoration: line-through; }

  /* Form */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
  .field-block { display: flex; flex-direction: column; gap: 6px; }
  .field-block label { font-size: 13px; font-weight: 700; color: var(--gray-700); }
  .field-block .inp, .field-block input, .field-block select, .field-block textarea {
    border: 1px solid var(--border-default); border-radius: 10px;
    padding: 11px 14px; font-size: 14px; background: #fff; outline: none;
    transition: border-color 150ms ease;
  }
  .field-block .inp:focus, .field-block input:focus, .field-block select:focus, .field-block textarea:focus { border-color: var(--blue-deep); }
  .field-block .hint { font-size: 12px; color: var(--gray-500); }
  .field-block.full { grid-column: 1 / -1; }

  .checkbox-row {
    display: flex; gap: 12px; align-items: flex-start;
    background: var(--bg-soft); border: 1px solid var(--border-default);
    border-radius: 12px; padding: 14px;
  }
  .checkbox-row input { margin-top: 2px; }
  .checkbox-row .t { font-size: 13px; color: var(--gray-700); line-height: 1.5; }
  .checkbox-row .t b { color: var(--ink); }
  .checkbox-row a { color: var(--blue-deep); font-weight: 700; }

  /* Payment section */
  .pay-card {
    background: #fff; border: 2px dashed var(--border-default);
    border-radius: 16px; padding: 24px; text-align: center;
  }
  .pay-card .lock { font-size: 32px; margin-bottom: 8px; }
  .pay-card h4 { margin: 0 0 4px; font-size: 17px; }
  .pay-card p { font-size: 13px; color: var(--gray-600); margin: 0 0 16px; }
  .stripe-mark {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; color: var(--gray-500);
    background: var(--bg-soft); padding: 6px 12px; border-radius: 999px;
  }

  /* Success */
  .succ {
    background: #fff; border-radius: 18px; padding: 40px;
    border: 1px solid var(--border-default); text-align: center;
  }
  .succ .check {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(82,163,117,.15); color: var(--green-deep);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 36px; margin-bottom: 16px;
  }
  .succ h2 { margin: 0 0 6px; font-size: 26px; }
  .succ .lead { font-size: 15px; color: var(--gray-600); margin: 0 0 20px; }
  .succ .code-card {
    display: inline-block; background: var(--blue-deep); color: #fff;
    padding: 14px 28px; border-radius: 14px; font-family: 'IBM Plex Mono', monospace;
    font-size: 22px; font-weight: 800; letter-spacing: .04em; margin-bottom: 24px;
  }
  .succ .details { text-align: start; max-width: 420px; margin: 0 auto; background: var(--bg-soft); border-radius: 12px; padding: 18px; }
  .succ .details .ln { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; border-bottom: 1px solid var(--border-default); }
  .succ .details .ln:last-child { border-bottom: 0; }
  .succ .details .ln .k { color: var(--gray-600); }
  .succ .details .ln .v { font-weight: 700; }

  /* ===== Operator Layout ===== */
  .op-shell { display: grid; grid-template-columns: 240px 1fr; min-height: calc(100vh - 60px); }
  @media (max-width: 800px) { .op-shell { grid-template-columns: 1fr; } }
  .op-side {
    background: var(--blue-deep); color: rgba(255,255,255,.85);
    padding: 24px 16px; border-inline-end: 1px solid rgba(0,0,0,.05);
  }
  .op-side .label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.45); text-transform: uppercase; letter-spacing: .05em; padding: 0 12px; margin: 18px 0 8px; }
  .op-side .label:first-of-type { margin-top: 0; }
  .op-side a {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 10px; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,.85); cursor: pointer; margin-bottom: 2px;
  }
  .op-side a .ic { font-size: 16px; width: 20px; }
  .op-side a:hover { background: rgba(255,255,255,.06); }
  .op-side a.on { background: rgba(255,255,255,.1); color: #fff; font-weight: 700; }
  .op-side .who {
    margin-top: auto; padding: 12px; border-radius: 10px; background: rgba(255,255,255,.05);
    font-size: 12px;
  }
  .op-side .who b { color: #fff; font-weight: 700; display: block; font-size: 13px; }
  .op-main { padding: 28px 32px; background: var(--bg-soft); }
  @media (max-width: 600px) { .op-main { padding: 20px 16px; } }
  .op-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  .op-head h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -.01em; }
  .op-head .sub { font-size: 14px; color: var(--gray-600); margin-top: 4px; }

  /* KPI cards */
  .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
  @media (max-width: 800px) { .kpis { grid-template-columns: repeat(2, 1fr); } }
  .kpi {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 16px; padding: 18px;
  }
  .kpi .label { font-size: 12px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; }
  .kpi .num { font-size: 32px; font-weight: 800; line-height: 1.1; margin-top: 6px; letter-spacing: -.01em; }
  .kpi .delta { font-size: 12px; font-weight: 600; margin-top: 4px; color: var(--green-deep); }
  .kpi .delta.neg { color: var(--red-500); }
  .kpi .delta.neutral { color: var(--gray-500); }

  /* Tables */
  .panel { background: #fff; border: 1px solid var(--border-default); border-radius: 16px; overflow: hidden; }
  .panel-head { padding: 16px 20px; border-bottom: 1px solid var(--border-default); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
  .panel-head h3 { margin: 0; font-size: 16px; font-weight: 700; }
  .panel-head .tools { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .input-sm {
    border: 1px solid var(--border-default); border-radius: 9px;
    padding: 7px 12px; font-size: 13px; outline: none; background: #fff;
  }
  .chip {
    font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 999px;
    background: #fff; color: var(--gray-700); border: 1px solid var(--border-default); cursor: pointer;
  }
  .chip.on { background: var(--blue-deep); color: #fff; border-color: var(--blue-deep); }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { padding: 13px 20px; text-align: start; border-bottom: 1px solid var(--border-default); }
  th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--gray-500); font-weight: 700; background: var(--bg-soft); }
  tr:last-child td { border-bottom: 0; }
  tr.row-hover:hover { background: var(--bg-soft); cursor: pointer; }
  .booking-code { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13px; color: var(--blue-deep); }

  .status-pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: .03em;
  }
  .status-pill .dot { width: 6px; height: 6px; border-radius: 50%; }
  .st-confirmed { background: rgba(45,106,79,.12); color: var(--green-deep); }
  .st-confirmed .dot { background: var(--green-deep); }
  .st-pending { background: #fffbeb; color: #92400e; }
  .st-pending .dot { background: var(--amber-500); }
  .st-checked_in { background: var(--blue-light); color: var(--blue-deep); }
  .st-checked_in .dot { background: var(--blue-deep); }
  .st-checked_out { background: var(--gray-100); color: var(--gray-600); }
  .st-checked_out .dot { background: var(--gray-400); }
  .st-cancelled { background: rgba(239,68,68,.1); color: var(--red-600); }
  .st-cancelled .dot { background: var(--red-500); }
  .st-no_show { background: rgba(239,68,68,.1); color: var(--red-600); }
  .st-no_show .dot { background: var(--red-500); }

  .btn-mini {
    background: var(--blue-deep); color: #fff;
    font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 8px;
  }
  .btn-mini:hover { background: var(--blue-deep-hover); }
  .btn-mini.ghost { background: #fff; color: var(--gray-700); border: 1px solid var(--border-default); }
  .btn-mini.ghost:hover { border-color: var(--blue-deep); color: var(--blue-deep); }
  .btn-mini.success { background: var(--green-deep); }
  .btn-mini.success:hover { background: #1f5640; }

  /* Two-column op layout */
  .op-2col { display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; }
  @media (max-width: 1000px) { .op-2col { grid-template-columns: 1fr; } }

  /* Activity feed */
  .feed { padding: 8px 4px; }
  .feed .item { display: flex; gap: 12px; padding: 12px 16px; border-radius: 10px; }
  .feed .item:hover { background: var(--bg-soft); }
  .feed .item .ic { width: 34px; height: 34px; border-radius: 10px; background: var(--blue-light); color: var(--blue-deep); display: inline-flex; align-items: center; justify-content: center; font-size: 16px; flex: none; }
  .feed .item.green .ic { background: rgba(45,106,79,.12); color: var(--green-deep); }
  .feed .item.orange .ic { background: rgba(224,123,57,.12); color: var(--orange-hover); }
  .feed .item.red .ic { background: rgba(239,68,68,.1); color: var(--red-600); }
  .feed .item .body { flex: 1; }
  .feed .item .body .t { font-size: 14px; font-weight: 600; }
  .feed .item .body .m { font-size: 12px; color: var(--gray-500); margin-top: 2px; }

  /* Calendar grid (operator) */
  .occgrid { overflow-x: auto; }
  .occgrid table { min-width: 720px; }
  .occgrid td.day-cell { text-align: center; padding: 6px; font-weight: 700; font-size: 13px; }
  .occgrid td.day-cell .pct { display: inline-block; padding: 4px 8px; border-radius: 6px; min-width: 36px; }
  .occgrid td.day-cell.lo .pct { background: rgba(82,163,117,.15); color: var(--green-deep); }
  .occgrid td.day-cell.md .pct { background: rgba(245,158,11,.15); color: #92400e; }
  .occgrid td.day-cell.hi .pct { background: rgba(239,68,68,.12); color: var(--red-600); }
  .occgrid td.day-cell.full .pct { background: var(--blue-deep); color: #fff; }
  .occgrid td.label-cell { font-weight: 600; font-size: 13px; min-width: 150px; }

  /* Tabs */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border-default); margin-bottom: 20px; }
  .tabs a { padding: 10px 16px; font-size: 14px; font-weight: 600; color: var(--gray-600); border-bottom: 2px solid transparent; cursor: pointer; }
  .tabs a.on { color: var(--blue-deep); border-bottom-color: var(--blue-deep); }

  /* Login */
  .login-shell { min-height: calc(100vh - 60px); display: flex; align-items: center; justify-content: center; padding: 24px; background: var(--bg-soft); }
  .login-card { background: #fff; border-radius: 18px; padding: 36px; width: 100%; max-width: 420px; box-shadow: var(--shadow-md); }
  .login-card h2 { margin: 0 0 8px; font-size: 22px; }
  .login-card .lead { font-size: 14px; color: var(--gray-600); margin: 0 0 22px; }

  /* Misc */
  .row-flex { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .lang-toggle { display: inline-flex; background: rgba(255,255,255,.08); border-radius: 999px; padding: 3px; border: 1px solid rgba(255,255,255,.12); }
  .lang-toggle button { padding: 4px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; color: rgba(255,255,255,.7); }
  .lang-toggle button.on { background: rgba(255,255,255,.15); color: #fff; }

  /* Hide on responsive */
  @media (max-width: 800px) { .desk-only { display: none !important; } }

</style>
</head>
<body>

<div id="app"></div>

<script>
/* ============================================================
   AM HOSTELS — Booking System (single-file SPA, hash-routed)
   Surfaces:
     #/                 Home (4 hostel cubes)
     #/hostels/:slug    Hostel detail
     #/book/:slug/:step Booking flow (step 1-3)
     #/booking/:code    Confirmation
     #/operator         Operator dashboard
     #/operator/bookings, /calendar, /blocks, /manual
     #/admin            Admin overview
     #/admin/bookings, /properties, /staff, /refunds, /reports
   ============================================================ */

const HOSTELS = [
  {
    slug: 'jerusalem',
    glyph: '🏗️',
    name_he: 'AM ירושלים',
    name_en: 'AM Jerusalem',
    city: 'ירושלים',
    city_en: 'Jerusalem',
    address: 'אזור תעשייה תלפיות, ירושלים',
    tagline: 'לינה לעובדים — קרוב לאתרי הבנייה במרכז ירושלים.',
    short: 'מתחם לינה ייעודי לעובדי בנייה. גישה נוחה לאתרים בכל ירושלים, חניה למשאיות וטנדרים, מטבח תעשייתי, מכבסה.',
    long: 'מתחם AM ירושלים ממוקם באזור תעשייה תלפיות, עם גישה ישירה לכל אתרי הבנייה במרכז ירושלים והסביבה. המתחם כולל חדרי שינה ל־4 ו־6 עובדים, מקלחות ושירותים מרובים, מטבח משותף, פינת אוכל, מכבסה, ארוניות אישיות עם מנעול לכל עובד, וחניה רחבה לכלי רכב כבדים. צוות אבטחה 24/7.',
    from_price: 65,
    capacity: 96,
    rooms_total: 18,
    direct_alloc: 18,
    amenities: [
      ['📶','WiFi חופשי'], ['❄️','מיזוג בכל החדרים'], ['🍳','מטבח משותף'],
      ['🧺','מכבסה במקום'], ['🔒','ארוניות אישיות עם מנעול'], ['🅿️','חניה לטנדרים ומשאיות'],
      ['🛡️','אבטחה 24/7'], ['🚿','מקלחות מרובות'], ['🚌','קרוב לתחבורה ציבורית']
    ],
    rooms: [
      { code: 'workers-4',  cat: 'dorm',    title: 'חדר ל־4 עובדים', meta: '2 מיטות קומותיים · ארונית עם מנעול לכל אחד · מיזוג', price: 65, per: 'מיטה', avail: 8, total: 12, feats: ['ארונית אישית','מיזוג','שקעים ליד המיטה'] },
      { code: 'workers-6',  cat: 'dorm',    title: 'חדר ל־6 עובדים', meta: '3 מיטות קומותיים · ארונית עם מנעול · מיזוג', price: 55, per: 'מיטה', avail: 14, total: 24, feats: ['ארונית אישית','מיזוג','חסכוני'] },
      { code: 'foreman',    cat: 'private', title: 'חדר מנהל עבודה', meta: 'מיטה יחיד · שולחן עבודה · WC צמוד', price: 180, per: 'לילה', avail: 3, total: 4, feats: ['פרטי','שולחן עבודה','WC צמוד'] },
    ]
  },
  {
    slug: 'tel-aviv',
    glyph: '🏗️',
    name_he: 'AM תל אביב',
    name_en: 'AM Tel Aviv',
    city: 'תל אביב',
    city_en: 'Tel Aviv',
    address: 'אזור תעשייה גלילות, תל אביב',
    tagline: 'לינה לעובדים בלב גוש דן — דקות מהאתרים הגדולים.',
    short: 'מתחם 120 מיטות באזור גלילות. גישה לכבישים מהירים, חניה רחבה, מטבח, מכבסה, סדרי לינה לעובדים זרים.',
    long: 'AM תל אביב הוא המתחם הגדול ביותר ברשת — 120 מיטות באזור תעשייה גלילות. גישה ישירה לאיילון ולכביש 5, מרחק 10–20 דקות לאתרי הבנייה בתל אביב, רמת גן, גבעתיים, בני ברק, פתח תקווה והסביבה. כולל חדרים ל־4–8 עובדים, מטבח גדול, פינת אוכל, 2 מכבסות, ארוניות אישיות, חניה למעל 30 כלי רכב.',
    from_price: 55,
    capacity: 120,
    rooms_total: 22,
    direct_alloc: 22,
    amenities: [
      ['📶','WiFi חופשי'], ['❄️','מיזוג בכל החדרים'], ['🍳','מטבח גדול'],
      ['🧺','2 מכבסות'], ['🔒','ארוניות אישיות'], ['🅿️','חניה רחבה'],
      ['🛡️','אבטחה 24/7'], ['🚿','מקלחות מרובות'], ['📋','קליטה מהירה']
    ],
    rooms: [
      { code: 'workers-4',  cat: 'dorm',    title: 'חדר ל־4 עובדים', meta: '2 מיטות קומותיים · ארונית עם מנעול · מיזוג', price: 65, per: 'מיטה', avail: 6, total: 16, feats: ['ארונית אישית','מיזוג'] },
      { code: 'workers-6',  cat: 'dorm',    title: 'חדר ל־6 עובדים', meta: '3 מיטות קומותיים · ארונית · מיזוג', price: 55, per: 'מיטה', avail: 18, total: 30, feats: ['ארונית אישית','מיזוג'] },
      { code: 'workers-8',  cat: 'dorm',    title: 'חדר ל־8 עובדים', meta: '4 מיטות קומותיים · ארונית · מיזוג', price: 48, per: 'מיטה', avail: 24, total: 32, feats: ['חסכוני','ארונית','מיזוג'] },
      { code: 'foreman',    cat: 'private', title: 'חדר מנהל עבודה', meta: 'מיטה יחיד · שולחן · WC צמוד', price: 180, per: 'לילה', avail: 2, total: 4, feats: ['פרטי','WC צמוד'] },
    ]
  },
  {
    slug: 'haifa',
    glyph: '🏗️',
    name_he: 'AM חיפה',
    name_en: 'AM Haifa',
    city: 'חיפה',
    city_en: 'Haifa',
    address: 'אזור תעשייה צ׳ק פוסט, חיפה',
    tagline: 'לינה לעובדים בצפון — קרוב לאתרי הבנייה במפרץ.',
    short: 'מתחם בצ׳ק פוסט. גישה ישירה לחיפה, מפרץ חיפה, קריות, נשר וטירת כרמל. חדרי עובדים, מטבח, מכבסה, חניה.',
    long: 'AM חיפה ממוקם באזור תעשייה צ׳ק פוסט עם גישה לכל אתרי הבנייה במפרץ חיפה — מהקריות ועד טירת הכרמל. המתחם כולל חדרי שינה ל־4–6 עובדים, מטבח משותף עם 2 כיריים תעשייתיות, מכבסה, ארוניות אישיות, חניה לכלי רכב כבדים, ופתרון מובנה לעובדים זרים כולל קליטה רב־לשונית.',
    from_price: 55,
    capacity: 72,
    rooms_total: 14,
    direct_alloc: 14,
    amenities: [
      ['📶','WiFi חופשי'], ['❄️','מיזוג בכל החדרים'], ['🍳','מטבח משותף'],
      ['🧺','מכבסה במקום'], ['🔒','ארוניות אישיות'], ['🅿️','חניה רחבה'],
      ['🛡️','אבטחה 24/7'], ['🌐','קליטה רב־לשונית']
    ],
    rooms: [
      { code: 'workers-4',  cat: 'dorm',    title: 'חדר ל־4 עובדים', meta: '2 מיטות קומותיים · ארונית עם מנעול · מיזוג', price: 65, per: 'מיטה', avail: 5, total: 8, feats: ['ארונית','מיזוג'] },
      { code: 'workers-6',  cat: 'dorm',    title: 'חדר ל־6 עובדים', meta: '3 מיטות קומותיים · ארונית · מיזוג', price: 55, per: 'מיטה', avail: 12, total: 18, feats: ['ארונית','מיזוג'] },
      { code: 'foreman',    cat: 'private', title: 'חדר מנהל עבודה', meta: 'מיטה יחיד · שולחן · WC צמוד', price: 170, per: 'לילה', avail: 2, total: 3, feats: ['פרטי','WC צמוד'] },
    ]
  },
  {
    slug: 'tiberias',
    glyph: '🏗️',
    name_he: 'AM טבריה',
    name_en: 'AM Tiberias',
    city: 'טבריה',
    city_en: 'Tiberias',
    address: 'אזור תעשייה דרום, טבריה',
    tagline: 'לינה לעובדים בצפון המזרחי — בקעת הירדן וגליל תחתון.',
    short: 'מתחם בטבריה. גישה לאתרי בנייה בבקעת הירדן, גליל תחתון, עפולה, צפת. חניה, מטבח משותף, מכבסה.',
    long: 'AM טבריה משרת את פרויקטי הבנייה בצפון המזרחי. המתחם ממוקם באזור תעשייה דרומי בטבריה, עם גישה ישירה לכביש 90 ולכביש 65. כולל חדרי לינה ל־4 ו־6 עובדים, מטבח משותף, מכבסה, ארוניות אישיות עם מנעול, חניה רחבה לכלי רכב, ושירותי קליטה לעובדים זרים.',
    from_price: 55,
    capacity: 64,
    rooms_total: 12,
    direct_alloc: 12,
    amenities: [
      ['📶','WiFi חופשי'], ['❄️','מיזוג בכל החדרים'], ['🍳','מטבח משותף'],
      ['🧺','מכבסה'], ['🔒','ארוניות אישיות'], ['🅿️','חניה רחבה'],
      ['🛡️','אבטחה 24/7'], ['🌐','קליטה רב־לשונית']
    ],
    rooms: [
      { code: 'workers-4',  cat: 'dorm',    title: 'חדר ל־4 עובדים', meta: '2 מיטות קומותיים · ארונית · מיזוג', price: 65, per: 'מיטה', avail: 6, total: 8, feats: ['ארונית','מיזוג'] },
      { code: 'workers-6',  cat: 'dorm',    title: 'חדר ל־6 עובדים', meta: '3 מיטות קומותיים · ארונית · מיזוג', price: 55, per: 'מיטה', avail: 10, total: 18, feats: ['ארונית','מיזוג'] },
      { code: 'foreman',    cat: 'private', title: 'חדר מנהל עבודה', meta: 'מיטה יחיד · WC צמוד', price: 165, per: 'לילה', avail: 2, total: 2, feats: ['פרטי','WC צמוד'] },
    ]
  }
];

const STATUSES_HE = {
  pending: 'ממתין',
  confirmed: 'מאושר',
  checked_in: 'נכנס',
  checked_out: 'יצא',
  cancelled: 'בוטל',
  no_show: 'לא הופיע'
};

// sample bookings (for operator/admin views)
// B2B bookings — corporate manpower agencies booking beds for foreign workers in construction
const BOOKINGS = [
  { code: 'AMH-3F2A9B', hostel: 'jerusalem', room: 'חדר ל־6 עובדים', name: 'אלעד בנייה ופיתוח בע"מ', email: 'orders@elad-build.co.il', phone: '03-9876543', country: '🇮🇱', in: '01.05', out: '31.05', nights: 30, units: 6, total: 9900, status: 'confirmed',  paid: true,  src: 'b2b',    synced: true,  created: 'לפני 2 שעות' },
  { code: 'AMH-7K1L2M', hostel: 'jerusalem', room: 'חדר מנהל עבודה',  name: 'אלעד בנייה ופיתוח בע"מ', email: 'orders@elad-build.co.il', phone: '03-9876543', country: '🇮🇱', in: '01.05', out: '31.05', nights: 30, units: 1, total: 5400, status: 'confirmed',  paid: true,  src: 'b2b',    synced: false, created: 'לפני 5 שעות' },
  { code: 'AMH-9P3Q4R', hostel: 'tel-aviv',  room: 'חדר ל־8 עובדים',  name: 'דוראן כוח אדם בע"מ',     email: 'lina@duran-hr.co.il',     phone: '03-5556677', country: '🇮🇱', in: '01.05', out: '14.05', nights: 14, units: 8, total: 5376, status: 'pending',    paid: false, src: 'b2b',    synced: false, created: 'לפני 12 דק׳' },
  { code: 'AMH-2X8Y5Z', hostel: 'haifa',     room: 'חדר ל־4 עובדים',  name: 'נורת\' בנייה בע"מ',       email: 'amira@northbuild.co.il',  phone: '04-8112233', country: '🇮🇱', in: '30.04', out: '30.06', nights: 61, units: 4, total: 15860, status: 'checked_in', paid: true, src: 'b2b',    synced: true,  created: 'אתמול' },
  { code: 'AMH-1A2B3C', hostel: 'tiberias', room: 'חדר ל־6 עובדים',  name: 'הגליל בנייה בע"מ',     email: 'tal@galil-bld.co.il',     phone: '04-6660011', country: '🇮🇱', in: '03.05', out: '02.06', nights: 30, units: 6, total: 9900, status: 'confirmed',  paid: true,  src: 'b2b',    synced: false, created: 'אתמול' },
  { code: 'AMH-5H6J7K', hostel: 'tel-aviv',  room: 'חדר ל־4 עובדים',  name: 'אלעד בנייה ופיתוח בע"מ', email: 'orders@elad-build.co.il', phone: '03-9876543', country: '🇮🇱', in: '28.04', out: '28.05', nights: 30, units: 4, total: 7800, status: 'checked_out',paid: true,  src: 'b2b',    synced: true,  created: 'לפני 5 ימים' },
  { code: 'AMH-8N9M0L', hostel: 'jerusalem', room: 'חדר ל־4 עובדים',  name: 'נחושתן בנייה בע"מ',       email: 'admin@nehushtan.co.il',   phone: '02-6543210', country: '🇮🇱', in: '29.04', out: '29.05', nights: 30, units: 4, total: 7800, status: 'cancelled',  paid: true,  src: 'b2b',    synced: true,  created: 'לפני 3 ימים' },
  { code: 'AMH-4D5E6F', hostel: 'haifa',     room: 'חדר ל־6 עובדים',  name: 'דוראן כוח אדם בע"מ',     email: 'lina@duran-hr.co.il',     phone: '03-5556677', country: '🇮🇱', in: '02.05', out: '02.07', nights: 61, units: 6, total: 20130, status: 'pending',    paid: false, src: 'b2b',    synced: false, created: 'לפני 30 דק׳' },
];

const findHostel = (slug) => HOSTELS.find(h => h.slug === slug) || HOSTELS[0];

// ============ ROUTING ============
function parseHash() {
  const h = (location.hash || '#/').replace(/^#/, '');
  const parts = h.split('/').filter(Boolean);
  return parts;
}

function nav(path) { location.hash = '#' + path; }

function render() {
  const p = parseHash();
  const root = document.getElementById('app');
  root.innerHTML = '';
  if (!p[0]) return root.appendChild(renderHome());
  if (p[0] === 'hostels' && p[1]) return root.appendChild(renderHostel(p[1]));
  if (p[0] === 'book' && p[1]) {
    const step = p[2] || '1';
    return root.appendChild(renderBook(p[1], step));
  }
  if (p[0] === 'booking' && p[1]) return root.appendChild(renderConfirm(p[1]));
  if (p[0] === 'operator') {
    const sub = p[1] || 'dashboard';
    return root.appendChild(renderOperator(sub, p[2]));
  }
  if (p[0] === 'admin') {
    const sub = p[1] || 'overview';
    return root.appendChild(renderAdmin(sub));
  }
  return root.appendChild(renderHome());
}

window.addEventListener('hashchange', render);

// ============ HELPERS ============
function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k === 'html') e.innerHTML = attrs[k];
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
    else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
    else e.setAttribute(k, attrs[k]);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  });
  return e;
}

// simple toast for non-navigating buttons (export/refresh/email actions etc.)
function toast(msg, kind) {
  let host = document.getElementById('toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toast-host';
    Object.assign(host.style, {
      position: 'fixed', bottom: '24px', insetInlineEnd: '24px',
      display: 'flex', flexDirection: 'column', gap: '8px', zIndex: '9999',
      pointerEvents: 'none', maxWidth: '360px',
    });
    document.body.appendChild(host);
  }
  const t = document.createElement('div');
  const color = kind === 'success' ? '#2d6a4f' : (kind === 'warn' ? '#c2410c' : '#1b3a6b');
  Object.assign(t.style, {
    background: '#fff', color: '#1f2937',
    border: '1px solid rgba(0,0,0,.08)', borderInlineStart: '4px solid ' + color,
    borderRadius: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '600',
    boxShadow: '0 12px 32px rgba(15,23,42,.18)', opacity: '0', transform: 'translateY(8px)',
    transition: 'opacity .2s ease, transform .2s ease', pointerEvents: 'auto',
    fontFamily: 'inherit', direction: 'rtl',
  });
  t.textContent = msg;
  host.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateY(8px)';
    setTimeout(() => t.remove(), 220);
  }, 2400);
}

function renderTopNav(active) {
  const nav = el('nav', { class: 'nav' });
  const links = el('div', { class: 'links' });
  const linkData = [
    ['/', 'בית'],
    ['/hostels/jerusalem', 'מתחמים'],
    ['/operator/dashboard', 'אזור צוות'],
    ['/admin/overview', 'אדמין'],
  ];
  linkData.forEach(([href, label]) => {
    const a = el('a', { class: active === href ? 'on' : '', onclick: () => location.hash = '#' + href }, label);
    links.appendChild(a);
  });
  const lt = el('div', { class: 'lang-toggle desk-only' }, [
    el('button', { class: 'on' }, 'עב'),
    el('button', {}, 'EN'),
    el('button', {}, 'RU'),
  ]);
  links.appendChild(lt);

  const logo = el('div', { class: 'logo', onclick: () => location.hash = '#/' }, [
    el('span', { class: 'glyph' }, '🛏'),
    el('div', {}, [
      el('div', {}, 'AM HOSTELS'),
      el('div', { class: 'sub' }, 'BOOKING'),
    ])
  ]);
  nav.appendChild(links);
  nav.appendChild(logo);
  return nav;
}

function renderFooter() {
  return el('footer', {}, [
    el('div', { class: 'inner' }, [
      el('div', {}, [
        el('div', { class: 'logo' }, [
          el('span', { class: 'glyph' }, '🛏'),
          'AM HOSTELS',
        ]),
        el('div', { style: 'margin-top:8px;font-size:12px;' }, '4 מתחמי לינה · ירושלים · תל אביב · חיפה · טבריה')
      ]),
      el('div', { class: 'links' }, [
        el('a', {}, 'הסכם מסגרת'),
        el('a', {}, 'תקנון לינה'),
        el('a', {}, 'מדיניות ביטול'),
        el('a', {}, 'יצירת קשר'),
      ]),
      el('div', {}, '© AM HOSTELS 2026 · book.amhostels.co.il')
    ])
  ]);
}

// ============ HOME ============
function renderHome() {
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/'));

  const hero = el('section', { class: 'hero' }, [
    el('div', { class: 'inner' }, [
      el('span', { class: 'pill' }, [el('span', { class: 'dot' }), 'B2B · קבלן/קבלן־משנה · חוזה חודשי או יומי']),
      el('h1', {}, 'לינה לעובדים זרים.\u200E כל אתר בארץ — דקות מהמתחם.'),
      el('p', { class: 'lead' }, 'AM HOSTELS היא רשת מתחמי לינה ייעודיים לעובדי בנייה. 4 מתחמים בערים המרכזיות, חניה לטנדרים ומשאיות, מטבחים, מכבסות וצוות אבטחה 24/7. ניהול מרוכז למספר עובדים, חשבונית אחת בחודש.'),
      el('div', { class: 'meta' }, [
        el('div', {}, ['🏗️ ', el('b', {}, '4'), ' מתחמים']),
        el('div', {}, ['🛏️ ', el('b', {}, '350+'), ' מיטות']),
        el('div', {}, ['📅 ', el('b', {}, 'יומי / חודשי'), '']),
        el('div', {}, ['🧾 ', el('b', {}, 'חשבונית אחת'), ' בחודש']),
      ])
    ])
  ]);
  wrap.appendChild(hero);

  // search bar
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  const fmt = d => `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
  const sb = el('div', { class: 'searchbar' }, [
    el('div', { class: 'box' }, [
      el('div', { class: 'field' }, [
        el('label', {}, '📍 מתחם'),
        el('div', { class: 'val' }, 'כל המתחמים'),
      ]),
      el('div', { class: 'field' }, [
        el('label', {}, '📅 כניסה'),
        el('div', { class: 'val' }, fmt(today)),
      ]),
      el('div', { class: 'field' }, [
        el('label', {}, '📅 יציאה'),
        el('div', { class: 'val' }, fmt(tomorrow)),
      ]),
      el('div', { class: 'field' }, [
        el('label', {}, '👷 כמות עובדים'),
        el('div', { class: 'val' }, '6 עובדים'),
      ]),
      el('button', { class: 'btn-cta', onclick: () => nav('/hostels/jerusalem') }, 'בדוק זמינות'),
    ])
  ]);
  wrap.appendChild(sb);

  const cont = el('div', { class: 'container' });
  // Section title
  cont.appendChild(el('div', { class: 'h2' }, [
    el('h2', {}, 'בחרו מתחם'),
    el('small', {}, '4 ערים · קליטה תוך 24 שעות · חוזה יומי או חודשי'),
  ]));

  const grid = el('div', { class: 'hostels' });
  HOSTELS.forEach(h => {
    const card = el('article', { class: 'hcube', 'data-key': h.slug.split('-')[0], onclick: () => nav('/hostels/' + h.slug) }, [
      el('div', { class: 'hcube-img' }, [
        el('span', { class: 'hcube-tag' }, h.city),
        el('span', { class: 'hcube-status' }, [el('span', { class: 'dot' }), 'פעיל']),
        el('div', { class: 'hcube-titlewrap' }, [
          el('div', { class: 'glyph' }, h.glyph),
          el('h3', {}, h.name_he),
          el('div', { class: 'city' }, h.address.split(',')[0]),
        ])
      ]),
      el('div', { class: 'hcube-body' }, [
        el('div', { class: 'desc' }, h.short),
        el('div', { class: 'hcube-stats' }, [
          el('div', {}, [el('b', {}, h.capacity + ''), ' מיטות']),
          el('div', {}, [el('b', {}, h.rooms_total + ''), ' חדרים']),
          el('div', {}, ['חניה ', el('b', {}, 'כן')]),
        ])
      ]),
      el('div', { class: 'hcube-foot' }, [
        el('div', { class: 'hcube-price' }, [
          el('small', {}, 'החל מ־'),
          el('br'),
          el('b', {}, '₪' + h.from_price),
          el('small', {}, ' / לילה'),
        ]),
        el('button', { class: 'hcube-cta', onclick: (e) => { e.stopPropagation(); nav('/hostels/' + h.slug); } }, 'הזמנה ←')
      ])
    ]);
    grid.appendChild(card);
  });
  cont.appendChild(grid);

  cont.appendChild(el('div', { class: 'trust-band' }, [
    el('div', { class: 'ic' }, '🧾'),
    el('div', {}, [
      el('div', { class: 't' }, 'מותאם לתאגידי כוח אדם וקבלני בנייה'),
      el('div', { class: 'd' }, 'חשבונית מס אחת בחודש · תשלום שוטף+30 · מנהל לקוחות אישי · החלפת עובדים ללא קנס · דוח לינה חודשי לבקרה'),
    ])
  ]));

  cont.appendChild(el('div', { class: 'h2' }, [el('h2', {}, 'איך זה עובד')]));
  cont.appendChild(el('div', { class: 'how' }, [
    ['1','בוחרים מתחם','4 ערים — לפי קרבה לאתר הבנייה. חדרים ל־4, 6 או 8 עובדים, או חדר מנהל עבודה פרטי.'],
    ['2','מזינים תאריכים וכמות','חוזה יומי או חודשי. כניסה מ־14:00, יציאה עד 11:00. מינימום לילה אחד.'],
    ['3','מאשרים את ההזמנה','חתימה דיגיטלית על הסכם מסגרת. תשלום שוטף+30 או באשראי דרך Stripe.'],
    ['4','קולטים את העובדים','שולחים רשימת שמות + ת״ז/דרכון, אנחנו קולטים מול הצוות במתחם תוך 24 שעות.'],
  ].map(([n,t,d]) => el('div', { class: 'step' }, [
    el('span', { class: 'n' }, n),
    el('h4', {}, t),
    el('p', {}, d),
  ]))));

  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ HOSTEL DETAIL ============
function renderHostel(slug) {
  const h = findHostel(slug);
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/hostels/' + slug));

  const hbg = {
    'jerusalem':  "linear-gradient(135deg, rgba(27,58,107,.7), rgba(27,58,107,.9)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80')",
    'tel-aviv':   "linear-gradient(135deg, rgba(45,106,79,.6), rgba(45,106,79,.9)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
    'haifa':      "linear-gradient(135deg, rgba(30,30,46,.6), rgba(30,30,46,.9)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80')",
    'tiberias':   "linear-gradient(135deg, rgba(82,163,117,.55), rgba(27,58,107,.9)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
  };
  // legacy keys removed below — keep for compatibility
  const _keep = {
  };

  const hero = el('div', { class: 'hd-hero', style: { backgroundImage: hbg[h.slug] || '' } }, [
    el('div', { class: 'crumbs' }, [
      el('a', { onclick: () => nav('/') }, 'בית'),
      el('span', {}, ' › '),
      el('span', {}, 'אכסניות'),
      el('span', {}, ' › '),
      el('span', { style: 'color:#fff;font-weight:700' }, h.name_he),
    ]),
    el('div', { class: 'title-wrap' }, [
      el('div', { style: 'font-size:38px' }, h.glyph),
      el('h1', {}, h.name_he),
      el('div', { class: 'city' }, '📍 ' + h.address),
      el('div', { class: 'badges' }, [
        el('span', { class: 'b ver' }, '✓ מתחם רשמי AM HOSTELS'),
        el('span', { class: 'b' }, 'לינה לעובדי בנייה'),
        el('span', { class: 'b' }, h.capacity + ' מיטות'),
      ])
    ])
  ]);
  wrap.appendChild(hero);

  const cont = el('div', { class: 'container' });
  const grid = el('div', { class: 'hd-grid' });

  // ---- Left side ----
  const left = el('div');
  left.appendChild(el('div', { class: 'hd-section' }, [
    el('h2', {}, h.tagline),
    el('p', { class: 'hd-desc' }, h.long),
  ]));

  left.appendChild(el('div', { class: 'hd-section', style: 'margin-top:32px' }, [
    el('h2', {}, 'מתקנים'),
    (() => {
      const a = el('div', { class: 'amenities' });
      h.amenities.forEach(([ic, label]) => a.appendChild(el('div', { class: 'a' }, [el('span', { class: 'ic' }, ic), label])));
      return a;
    })(),
  ]));

  // Rooms
  const roomsSection = el('div', { class: 'hd-section', style: 'margin-top:36px' }, [
    el('h2', {}, 'בחירת חדר'),
    el('div', { style: 'font-size:14px;color:var(--gray-600);margin-bottom:16px' }, '30 לילות · 6 עובדים · מחירים לא כוללים מע״מ'),
  ]);
  const roomsList = el('div', { class: 'rooms' });
  h.rooms.forEach((r, i) => {
    const card = el('div', { class: 'room ' + r.cat });
    const iconMap = { dorm: '🛏️', private: '🚪', capsule: '🟦' };
    const availClass = r.avail <= 2 ? 'low' : '';
    const availText = r.avail === 1 ? 'נותרה יחידה אחת!' : (r.avail <= 2 ? `נותרו ${r.avail} בלבד` : `${r.avail} פנויים`);
    card.appendChild(el('div', { class: 'icon-wrap' }, iconMap[r.cat] || '🛏️'));
    card.appendChild(el('div', {}, [
      el('h4', {}, r.title),
      el('div', { class: 'meta' }, r.meta),
      (() => {
        const f = el('div', { class: 'feats' });
        r.feats.forEach(x => f.appendChild(el('span', {}, x)));
        return f;
      })(),
    ]));
    card.appendChild(el('div', { class: 'price-side' }, [
      el('div', { class: 'num' }, '₪' + r.price),
      el('div', { class: 'per' }, '/ ' + r.per + ' / לילה'),
      el('div', { class: 'avail ' + availClass }, availText),
      el('button', { class: 'btn-cta', style: 'padding:8px 18px;font-size:13px', onclick: () => nav('/book/' + h.slug + '/1?room=' + r.code) }, 'בחר חדר'),
    ]));
    roomsList.appendChild(card);
  });
  roomsSection.appendChild(roomsList);
  left.appendChild(roomsSection);

  // House rules
  left.appendChild(el('div', { class: 'hd-section', style: 'margin-top:36px' }, [
    el('h2', {}, 'כללי בית'),
    el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:14px' }, [
      el('div', {}, '🕒 צ׳ק־אין: 15:00–22:00'),
      el('div', {}, '🕒 צ׳ק־אאוט: עד 11:00'),
      el('div', {}, '🚭 ללא עישון בתוך הבניין'),
      el('div', {}, '🐕 חיות מחמד אסורות'),
      el('div', {}, '🔇 שקט: 23:00–07:00'),
      el('div', {}, '🆔 דרכון/ת.ז. נדרש בכניסה'),
    ])
  ]));

  // Cancellation
  left.appendChild(el('div', { class: 'trust-band', style: 'margin-top:28px' }, [
    el('div', { class: 'ic' }, '↩️'),
    el('div', {}, [
      el('div', { class: 't' }, 'מדיניות ביטול גמישה'),
      el('div', { class: 'd' }, 'ביטול עד 48 שעות לפני הצ׳ק־אין → החזר מלא. ביטול תוך 48 שעות → חיוב לילה ראשון בלבד.'),
    ])
  ]));

  grid.appendChild(left);

  // ---- Right sticky booking widget ----
  const right = el('div');
  const box = el('div', { class: 'book-side' }, [
    el('h3', {}, 'מחיר התחלתי'),
    el('div', { class: 'price-now' }, ['₪' + h.from_price, el('small', {}, ' / לילה')]),
    el('div', { class: 'row' }, [
      el('div', { class: 'inp' }, [el('label', {}, 'צ׳ק־אין'), el('input', { type: 'text', value: '01.05.2026' })]),
      el('div', { class: 'inp' }, [el('label', {}, 'צ׳ק־אאוט'), el('input', { type: 'text', value: '04.05.2026' })]),
    ]),
    el('div', { class: 'row', style: 'grid-template-columns:1fr' }, [
      el('div', { class: 'inp' }, [el('label', {}, 'כמות עובדים'),
        (() => { const s = el('select'); ['1 עובד','4 עובדים','6 עובדים','8 עובדים','12 עובדים','20+ עובדים'].forEach((x,i) => s.appendChild(el('option', { selected: i===2 ? 'selected' : null }, x))); return s; })()
      ]),
    ]),
    el('div', { class: 'summary' }, [
      el('div', { class: 'ln' }, [el('span', {}, '₪' + h.from_price + ' × 3 לילות'), el('span', {}, '₪' + (h.from_price * 3))]),
      el('div', { class: 'ln' }, [el('span', {}, 'דמי ניקיון'), el('span', {}, 'כלולים')]),
      el('div', { class: 'ln' }, [el('span', {}, 'מע״מ 17%'), el('span', {}, 'כלול')]),
      el('div', { class: 'total' }, [el('span', {}, 'סה״כ'), el('span', {}, '₪' + (h.from_price * 3))]),
    ]),
    el('button', { class: 'btn-cta full', style: 'margin-top:16px', onclick: () => nav('/book/' + h.slug + '/1') }, 'המשך להזמנה'),
    el('div', { class: 'micro' }, '🔒 תשלום מאובטח · ביטול חינם עד 7 ימים לפני הכניסה'),
  ]);
  right.appendChild(box);

  grid.appendChild(right);
  cont.appendChild(grid);
  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ BOOKING FLOW ============
function renderBook(slug, step) {
  const h = findHostel(slug);
  const wrap = el('div');
  wrap.appendChild(renderTopNav(''));
  const cont = el('div', { class: 'container-narrow' });

  // breadcrumb
  cont.appendChild(el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:24px' }, [
    el('a', { style: 'cursor:pointer', onclick: () => nav('/') }, 'בית'),
    ' › ',
    el('a', { style: 'cursor:pointer', onclick: () => nav('/hostels/' + slug) }, h.name_he),
    ' › ',
    el('span', { style: 'color:var(--ink);font-weight:700' }, 'הזמנה'),
  ]));

  // stepper
  const steps = [['1','תאריכים וחדר'],['2','פרטי החברה'],['3','תשלום']];
  const stepper = el('div', { class: 'stepper' });
  steps.forEach(([n, label], i) => {
    const cls = +step > +n ? 'done' : (+step === +n ? 'on' : '');
    stepper.appendChild(el('div', { class: 's ' + cls }, [
      el('span', { class: 'n' }, +step > +n ? '✓' : n),
      el('span', {}, label),
    ]));
    if (i < steps.length - 1) stepper.appendChild(el('span', { class: 'arrow' }, '←'));
  });
  cont.appendChild(stepper);

  // ----- step 1: dates + room -----
  if (step === '1') {
    cont.appendChild(el('h1', { style: 'font-size:24px;font-weight:800;margin:24px 0 4px' }, 'בחירת תאריכים'));
    cont.appendChild(el('div', { style: 'color:var(--gray-600);font-size:14px;margin-bottom:20px' }, h.name_he + ' · ' + h.city));

    const grid = el('div', { style: 'display:grid;grid-template-columns:1.4fr 1fr;gap:20px' });

    // calendar
    const cal = el('div', { class: 'calwrap' }, [
      el('div', { class: 'calhead' }, [
        el('button', { class: 'nav-btn' }, '→'),
        el('h3', {}, 'מאי 2026'),
        el('button', { class: 'nav-btn' }, '←'),
      ]),
      (() => {
        const c = el('div', { class: 'cal' });
        ['א','ב','ג','ד','ה','ו','ש'].forEach(d => c.appendChild(el('div', { class: 'dow' }, d)));
        // Fri May 1, 2026 -> day index? we'll just dump 31 days with first cell at col index 5 (Fri = ש=6 he calendar but in he week starts Sun)
        // Sun=0 ... Sat=6. May 1 2026 is Friday => col 5
        for (let i = 0; i < 5; i++) c.appendChild(el('div', { class: 'd dim' }, (26 + i) + ''));
        for (let d = 1; d <= 31; d++) {
          let cls = 'd';
          if (d === 1) cls += ' in';
          else if (d === 4) cls += ' out';
          else if (d > 1 && d < 4) cls += ' range';
          if (d === 15 || d === 22) cls += ' blocked';
          c.appendChild(el('div', { class: cls }, d + ''));
        }
        return c;
      })(),
      el('div', { style: 'display:flex;gap:14px;font-size:12px;color:var(--gray-500);margin-top:14px;padding-top:14px;border-top:1px solid var(--border-default)' }, [
        el('div', {}, [el('span', { style: 'display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--blue-deep);margin-inline-end:5px;vertical-align:middle' }), 'נבחר']),
        el('div', {}, [el('span', { style: 'display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--blue-light);margin-inline-end:5px;vertical-align:middle' }), 'בטווח']),
        el('div', {}, [el('span', { style: 'display:inline-block;width:10px;height:10px;border-radius:3px;background:rgba(239,68,68,.2);margin-inline-end:5px;vertical-align:middle' }), 'לא זמין']),
      ])
    ]);
    grid.appendChild(cal);

    // selected room summary
    const r = h.rooms[0];
    const summary = el('div', { class: 'book-side', style: 'position:static' }, [
      el('div', { style: 'font-size:13px;color:var(--gray-500);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px' }, 'חדר נבחר'),
      el('div', { style: 'font-size:17px;font-weight:800' }, r.title),
      el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:4px' }, r.meta),
      el('a', { onclick: () => nav('/hostels/' + slug), style: 'color:var(--blue-deep);font-size:13px;font-weight:700;cursor:pointer;display:inline-block;margin-top:8px' }, 'שנה חדר'),
      el('div', { class: 'summary' }, [
        el('div', { class: 'ln' }, [el('span', {}, 'צ׳ק־אין'), el('span', { style: 'font-weight:700' }, '01.05.2026')]),
        el('div', { class: 'ln' }, [el('span', {}, 'צ׳ק־אאוט'), el('span', { style: 'font-weight:700' }, '04.05.2026')]),
        el('div', { class: 'ln' }, [el('span', {}, 'לילות'), el('span', { style: 'font-weight:700' }, '3')]),
        el('div', { class: 'ln' }, [el('span', {}, '₪' + r.price + ' × 3'), el('span', {}, '₪' + (r.price * 3))]),
        el('div', { class: 'total' }, [el('span', {}, 'סה״כ'), el('span', {}, '₪' + (r.price * 3))]),
      ]),
      el('button', { class: 'btn-cta full', style: 'margin-top:14px', onclick: () => nav('/book/' + slug + '/2') }, 'המשך לפרטי החברה ←'),
    ]);
    grid.appendChild(summary);
    cont.appendChild(grid);
  }

  // ----- step 2: company details -----
  if (step === '2') {
    cont.appendChild(el('h1', { style: 'font-size:24px;font-weight:800;margin:24px 0 4px' }, 'פרטי החברה ואיש קשר'),);
    cont.appendChild(el('div', { style: 'color:var(--gray-600);font-size:14px;margin-bottom:20px' }, 'הפרטים ישמשו להנפקת חשבונית מס ולתיאום הקליטה של העובדים.'));

    const card = el('div', { class: 'panel', style: 'padding:24px' }, [
      el('div', { class: 'form-grid' }, [
        el('div', { class: 'field-block' }, [el('label', {}, 'שם החברה*'), el('input', { type: 'text', placeholder: 'אלעד בנייה ופיתוח בע"מ' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'ח.פ. / ת.ז.*'), el('input', { type: 'text', placeholder: '514938201' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'איש קשר — שם מלא*'), el('input', { type: 'text', placeholder: 'דוד לוי' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'טלפון איש קשר*'), el('input', { type: 'tel', placeholder: '050-1234567' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'אימייל הזמנות*'), el('input', { type: 'email', placeholder: 'orders@elad-build.co.il' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'אימייל חשבונות*'), el('input', { type: 'email', placeholder: 'finance@elad-build.co.il' })]),
        el('div', { class: 'field-block full' }, [
          el('label', {}, 'מדיניות תשלום*'),
          (() => { const s = el('select'); ['תשלום שוטף+30 (חשבונית מס)','תשלום שוטף+45','כרטיס אשראי מראש (Stripe)','העברה בנקאית לפני כניסה'].forEach(x => s.appendChild(el('option', {}, x))); return s; })(),
        ]),
        el('div', { class: 'field-block full' }, [el('label', {}, 'הערות למתחם (אופציונלי)'), el('textarea', { rows: '3', placeholder: 'מספר פרויקט / אתר הבנייה / דרישות מיוחדות (למשל — משמרת כשרות)' })]),
      ]),
      el('div', { style: 'border-top:1px solid var(--border-default);margin-top:20px;padding-top:20px;display:flex;flex-direction:column;gap:10px' }, [
        el('div', { class: 'checkbox-row' }, [
          el('input', { type: 'checkbox', id: 'agr1' }),
          el('div', { class: 't' }, [
            el('b', {}, 'תנאי ביטול להזמנות חודשיות: '),
            'ביטול עד 7 ימים לפני תחילת החודש — החזר מלא. ביטול תוך החודש — חיוב לילות שמומשו. ',
            el('a', {}, 'הסכם מסגרת מלא'),
          ]),
        ]),
        el('div', { class: 'checkbox-row' }, [
          el('input', { type: 'checkbox', id: 'agr2' }),
          el('div', { class: 't' }, [
            'אני מאשר/ת שהעובדים מועסקים לגיתימין בישראל ובהחזקת אשרה תקפה לתקופת השהות.',
          ]),
        ]),
      ]),
    ]);
    cont.appendChild(card);
    cont.appendChild(el('div', { style: 'display:flex;justify-content:space-between;margin-top:20px' }, [
      el('button', { class: 'btn-ghost', onclick: () => nav('/book/' + slug + '/1') }, '→ חזור'),
      el('button', { class: 'btn-cta lg', onclick: () => nav('/book/' + slug + '/3') }, 'המשך לתשלום ←'),
    ]));
  }

  // ----- step 3: payment -----
  if (step === '3') {
    cont.appendChild(el('h1', { style: 'font-size:24px;font-weight:800;margin:24px 0 4px' }, 'תשלום'));
    cont.appendChild(el('div', { style: 'color:var(--gray-600);font-size:14px;margin-bottom:20px' }, 'אנו מנותבים אותך ל־Stripe לתשלום מאובטח.'));

    const r = h.rooms[0];
    const grid = el('div', { style: 'display:grid;grid-template-columns:1.2fr 1fr;gap:20px' });

    // Stripe placeholder
    const left = el('div', { class: 'pay-card' }, [
      el('div', { class: 'lock' }, '🔒'),
      el('h4', {}, 'תשלום מאובטח דרך Stripe'),
      el('p', {}, 'בלחיצה על "אשר ושלם" תועברו לדף תשלום מאובטח של Stripe. אנו לא שומרים פרטי אשראי.'),
      el('div', { style: 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:14px 0 20px' }, [
        el('span', { class: 'stripe-mark' }, ['💳 ', 'Visa']),
        el('span', { class: 'stripe-mark' }, ['💳 ', 'Mastercard']),
        el('span', { class: 'stripe-mark' }, ['💳 ', 'Amex']),
        el('span', { class: 'stripe-mark' }, ['🍎 ', 'Apple Pay']),
      ]),
      el('button', { class: 'btn-cta lg', onclick: () => nav('/booking/AMH-NEW7X9') }, 'אשר ושלם — ₪' + (r.price * 3)),
      el('div', { style: 'font-size:11px;color:var(--gray-500);margin-top:14px' }, 'מצב Test Mode פעיל · אישור בוצע ללא חיוב אמיתי'),
    ]);
    grid.appendChild(left);

    const summary = el('div', { class: 'book-side', style: 'position:static' }, [
      el('div', { style: 'font-size:13px;color:var(--gray-500);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px' }, 'סיכום הזמנה'),
      el('div', { style: 'font-size:17px;font-weight:800' }, h.name_he),
      el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:2px' }, r.title),
      el('div', { class: 'summary' }, [
        el('div', { class: 'ln' }, [el('span', {}, 'תאריכים'), el('span', { style: 'font-weight:700' }, '01.05 → 04.05')]),
        el('div', { class: 'ln' }, [el('span', {}, 'עובדים'), el('span', { style: 'font-weight:700' }, '6')]),
        el('div', { class: 'ln' }, [el('span', {}, '₪' + r.price + ' × 6 עובדים × 30 לילות'), el('span', {}, '₪' + (r.price * 6 * 30).toLocaleString())]),
        el('div', { class: 'ln' }, [el('span', {}, 'מע״מ 17%'), el('span', {}, 'כלול')]),
        el('div', { class: 'total' }, [el('span', {}, 'סה״כ לתשלום'), el('span', {}, '₪' + (r.price * 6 * 30).toLocaleString())]),
      ]),
      el('div', { class: 'micro', style: 'background:rgba(45,106,79,.08);color:var(--green-deep);padding:10px;border-radius:10px;margin-top:14px' }, '✓ ביטול חינם עד 29.04.2026'),
    ]);
    grid.appendChild(summary);

    cont.appendChild(grid);
    cont.appendChild(el('div', { style: 'display:flex;justify-content:flex-start;margin-top:20px' }, [
      el('button', { class: 'btn-ghost', onclick: () => nav('/book/' + slug + '/2') }, '→ חזור'),
    ]));
  }

  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ CONFIRMATION ============
function renderConfirm(code) {
  const wrap = el('div');
  wrap.appendChild(renderTopNav(''));
  const h = HOSTELS[0];
  const cont = el('div', { class: 'container-narrow', style: 'padding-top:36px;padding-bottom:60px' });

  cont.appendChild(el('div', { class: 'succ' }, [
    el('div', { class: 'check' }, '✓'),
    el('h2', {}, 'ההזמנה אושרה!'),
    el('div', { class: 'lead' }, 'מייל אישור עם כל הפרטים נשלח אליך. נתראה ב־' + h.name_he + '.'),
    el('div', { class: 'code-card' }, code),
    el('div', { class: 'details' }, [
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'אכסנייה'), el('span', { class: 'v' }, h.name_he)]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'חדר'), el('span', { class: 'v' }, h.rooms[0].title)]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'צ׳ק־אין'), el('span', { class: 'v' }, '01.05.2026 · 15:00')]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'צ׳ק־אאוט'), el('span', { class: 'v' }, '04.05.2026 · 11:00')]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'עובדים'), el('span', { class: 'v' }, '6')]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'סה״כ שולם'), el('span', { class: 'v' }, '₪' + (h.rooms[0].price * 3))]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'כתובת'), el('span', { class: 'v', style: 'font-size:12px;text-align:end' }, h.address)]),
    ]),
    el('div', { style: 'margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap' }, [
      el('button', { class: 'btn-ghost', onclick: () => toast('נשלח קישור לאימייל נוסף', 'success') }, '📧 שליחה למייל נוסף'),
      el('button', { class: 'btn-ghost', onclick: () => toast('נפתח בהתקשרות המוצפנה · WhatsApp', 'success') }, '📱 פתח ב־WhatsApp'),
      el('button', { class: 'btn-cta', onclick: () => nav('/') }, 'חזור לבית'),
    ]),
  ]));

  // What's next
  cont.appendChild(el('div', { style: 'margin-top:32px' }, [
    el('h2', { style: 'font-size:20px;margin:0 0 14px' }, 'מה הלאה?'),
    el('div', { class: 'how' }, [
      ['📧','קיבלת מייל','אישור הזמנה עם הפרטים המלאים והוראות הגעה.'],
      ['📅','24 שעות לפני','נשלח לך תזכורת + מספר WhatsApp של הצוות.'],
      ['🛬','ביום הצ׳ק־אין','הציגו ת.ז./דרכון בקבלה. צ׳ק־אין מ־15:00.'],
      ['💬','שאלות?','יצירת קשר ישירה עם הצוות, בכל שעה.'],
    ].map(([ic,t,d]) => el('div', { class: 'step' }, [
      el('div', { style: 'font-size:24px' }, ic),
      el('h4', { style: 'margin-top:6px' }, t),
      el('p', {}, d),
    ])))
  ]));

  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ OPERATOR ============
function renderOperator(sub, id) {
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/operator/dashboard'));

  const shell = el('div', { class: 'op-shell' });

  const side = el('div', { class: 'op-side' }, [
    el('div', { class: 'label' }, 'אכסנייה'),
    el('div', { style: 'background:rgba(255,255,255,.08);padding:12px;border-radius:10px;margin-bottom:12px' }, [
      el('div', { style: 'font-size:18px;margin-bottom:2px' }, '🏗️'),
      el('div', { style: 'font-weight:700;color:#fff;font-size:14px' }, 'AM ירושלים'),
      el('div', { style: 'font-size:12px;opacity:.7' }, 'אזור תעשייה תלפיות'),
    ]),
    el('div', { class: 'label' }, 'תפעול'),
    ...[
      ['dashboard','📊','דשבורד'],
      ['bookings','📋','הזמנות'],
      ['calendar','🗓️','לוח שנה'],
      ['blocks','🚫','חסימות'],
      ['manual','➕','הזמנה ידנית'],
    ].map(([k,ic,label]) => el('a', { class: sub === k ? 'on' : '', onclick: () => nav('/operator/' + k) }, [el('span', { class: 'ic' }, ic), label])),
    el('div', { class: 'who' }, [
      el('b', {}, '👤 אדיר אם־סלם'),
      'מנהל מתחם · AM ירושלים',
    ]),
  ]);
  shell.appendChild(side);

  const main = el('div', { class: 'op-main' });

  if (sub === 'dashboard') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'בוקר טוב, אדיר 👋'),
        el('div', { class: 'sub' }, 'יום שלישי · 29.04.2026 · AM ירושלים'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost', onclick: () => toast('נתונים מעודכנים · הזמנות חדשות נטענו', 'success') }, '🔄 רענן'),
        el('button', { class: 'btn-cta', onclick: () => nav('/operator/manual') }, '+ הזמנה ידנית'),
      ])
    ]));

    main.appendChild(el('div', { class: 'kpis' }, [
      ['צ׳ק־אינים היום', '7', '+2 מאתמול'],
      ['צ׳ק־אאוטים היום', '4', '0', 'neutral'],
      ['תפוסה כעת', '83%', '54/64 מיטות', 'neutral'],
      ['הכנסה היום', '₪3,840', '+18% מאתמול'],
    ].map(([l,n,d,cls]) => el('div', { class: 'kpi' }, [
      el('div', { class: 'label' }, l),
      el('div', { class: 'num' }, n),
      el('div', { class: 'delta ' + (cls || '') }, d),
    ]))));

    const two = el('div', { class: 'op-2col' });

    // arrivals today
    const arrivalsBox = el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [
        el('h3', {}, '🛬 צ׳ק־אינים היום'),
        el('div', { class: 'tools' }, [el('span', { style: 'font-size:13px;color:var(--gray-500)' }, '7 מצופים')]),
      ]),
      (() => {
        const t = el('table');
        t.appendChild(el('thead', {}, el('tr', {}, [
          el('th', {}, 'לקוח'),
          el('th', {}, 'חדר'),
          el('th', {}, 'לילות'),
          el('th', {}, 'סטטוס'),
          el('th', {}, ''),
        ])));
        const tb = el('tbody');
        BOOKINGS.filter(b => b.hostel === 'jerusalem').slice(0, 5).forEach(b => {
          tb.appendChild(el('tr', { class: 'row-hover' }, [
            el('td', {}, [
              el('div', { style: 'font-weight:700' }, [b.country + ' ', b.name]),
              el('div', { class: 'booking-code' }, b.code),
            ]),
            el('td', {}, b.room),
            el('td', {}, b.nights + ' לילות'),
            el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
            el('td', {}, b.status === 'confirmed'
              ? el('button', { class: 'btn-mini success' }, '✓ צ׳ק־אין')
              : el('button', { class: 'btn-mini ghost' }, 'פרטים')),
          ]));
        });
        t.appendChild(tb);
        return t;
      })(),
    ]);
    two.appendChild(arrivalsBox);

    // Activity feed
    two.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, '⚡ פעילות אחרונה')]),
      el('div', { class: 'feed' }, [
        ['green','✓','הזמנה חדשה אושרה','AMH-3F2A9B · מיכל לוי · ₪360 · לפני 12 דק׳'],
        ['orange','💳','תשלום התקבל','AMH-7K1L2M · ₪5,400 · לפני 5 שעות'],
        ['','📧','מייל אישור נשלח','AMH-7K1L2M · orders@elad-build.co.il · לפני 5 שעות'],
        ['red','✕','ביטול לקוח','AMH-8N9M0L · נחושתן בנייה · החזר ₪7,800 בעיבוד'],
        ['','🔄','סנכרון FDM','3 הזמנות סומנו ידנית · אתמול 21:30'],
        ['green','🔑','כניסה למתחם','AMH-2X8Y5Z · נורת\' בנייה · 4 עובדים · אתמול 16:42'],
      ].map(([cls,ic,t,m]) => el('div', { class: 'item ' + cls }, [
        el('div', { class: 'ic' }, ic),
        el('div', { class: 'body' }, [
          el('div', { class: 't' }, t),
          el('div', { class: 'm' }, m),
        ])
      ])))
    ]));

    main.appendChild(two);
  }

  if (sub === 'bookings') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'הזמנות'),
        el('div', { class: 'sub' }, 'הזמנות חוזות של תאגידי כוח אדם · AM ירושלים'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost', onclick: () => toast('קובץ CSV הורד · bookings_29-04-2026.csv', 'success') }, '⬇ ייצוא CSV'),
        el('button', { class: 'btn-cta', onclick: () => nav('/operator/manual') }, '+ הזמנה ידנית'),
      ])
    ]));

    const filterRow = el('div', { class: 'row-flex', style: 'margin-bottom:16px' }, [
      el('input', { class: 'input-sm', placeholder: '🔍 חיפוש שם / קוד / מייל', style: 'min-width:280px' }),
      el('span', { class: 'chip on' }, 'הכל · 24'),
      el('span', { class: 'chip' }, 'ממתין · 3'),
      el('span', { class: 'chip' }, 'מאושר · 12'),
      el('span', { class: 'chip' }, 'נכנס · 6'),
      el('span', { class: 'chip' }, 'בוטל · 3'),
      el('input', { class: 'input-sm', type: 'date' }),
    ]);
    main.appendChild(filterRow);

    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','לקוח','חדר','כניסה','לילות','סכום','סטטוס','FDM','פעולות'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    BOOKINGS.filter(b => b.hostel === 'jerusalem').forEach(b => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { class: 'booking-code' }, b.code),
        el('td', {}, [
          el('div', { style: 'font-weight:700' }, b.country + ' ' + b.name),
          el('div', { style: 'font-size:12px;color:var(--gray-500)' }, b.email),
        ]),
        el('td', {}, b.room),
        el('td', {}, b.in + ' › ' + b.out),
        el('td', {}, b.nights),
        el('td', {}, '₪' + b.total.toLocaleString()),
        el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
        el('td', {}, b.synced
          ? el('span', { style: 'color:var(--green-deep);font-weight:700;font-size:12px' }, '✓')
          : el('span', { style: 'color:var(--amber-500);font-weight:700;font-size:12px' }, '⏳ ממתין')),
        el('td', {}, el('div', { class: 'row-flex' }, [
          el('button', { class: 'btn-mini ghost' }, 'פרטים'),
          b.status === 'confirmed' ? el('button', { class: 'btn-mini success' }, 'צ׳ק־אין') : null,
        ])),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'calendar') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'לוח תפוסה'),
        el('div', { class: 'sub' }, 'מאי 2026 · AM ירושלים · הקצאה ישירה בלבד'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost', onclick: () => toast('מעבר לאפריל 2026') }, '→ אפריל'),
        el('button', { class: 'btn-ghost' }, 'מאי 2026'),
        el('button', { class: 'btn-ghost', onclick: () => toast('מעבר ליוני 2026') }, 'יוני ←'),
      ])
    ]));

    main.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [
        el('h3', {}, 'תפוסה לפי סוג חדר · 14 הימים הבאים'),
        el('div', { class: 'tools' }, [
          el('span', { style: 'font-size:12px;color:var(--gray-500)' }, '🟩 פנוי · 🟧 מתמלא · 🟥 כמעט מלא · ◾ מלא'),
        ]),
      ]),
      (() => {
        const w = el('div', { class: 'occgrid', style: 'padding:6px 12px' });
        const t = el('table');
        const days = Array.from({ length: 14 }, (_, i) => i + 1);
        const head = el('tr', {}, [el('th', {}, 'סוג חדר')].concat(days.map(d => el('th', { style: 'text-align:center' }, d + ''))));
        t.appendChild(el('thead', {}, head));
        const tb = el('tbody');
        const rooms = HOSTELS[0].rooms;
        rooms.forEach(r => {
          const tr = el('tr', {}, [el('td', { class: 'label-cell' }, [
            el('div', { style: 'font-weight:700' }, r.title),
            el('div', { style: 'font-size:11px;color:var(--gray-500)' }, r.total + ' יחידות · ' + Math.ceil(r.total * 0.6) + ' להזמנה ישירה')
          ])]);
          days.forEach((d, di) => {
            const seed = (r.title.length + d) % 100;
            const occ = (seed % 100);
            let cls = 'lo'; let pct = '';
            if (occ < 35) { cls = 'lo'; pct = (3 + (di % 2)); }
            else if (occ < 65) { cls = 'md'; pct = '50%'; }
            else if (occ < 85) { cls = 'hi'; pct = '85%'; }
            else { cls = 'full'; pct = '✓'; }
            const text = cls === 'lo' ? (3 + (di % 3)) + ' פנ׳' : (cls === 'md' ? '50%' : (cls === 'hi' ? '85%' : 'מלא'));
            tr.appendChild(el('td', { class: 'day-cell ' + cls }, el('span', { class: 'pct' }, text)));
          });
          tb.appendChild(tr);
        });
        t.appendChild(tb);
        w.appendChild(t);
        return w;
      })()
    ]));

    main.appendChild(el('div', { style: 'margin-top:20px' }, [
      el('div', { class: 'trust-band' }, [
        el('div', { class: 'ic' }, '⚙️'),
        el('div', {}, [
          el('div', { class: 't' }, 'הקצאה ישירה: 13 / 24 יחידות'),
          el('div', { class: 'd' }, 'שאר 11 היחידות מנוהלות ב־FrontDeskMaster ומועברות ל־OTAs (Booking.com, Hostelworld, Expedia). שינוי בהקצאה דרך מסך אדמין.'),
        ])
      ])
    ]));
  }

  if (sub === 'blocks') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'חסימות חדרים'),
        el('div', { class: 'sub' }, 'חסום חדר/מיטה לתחזוקה, אירועים פרטיים או שימוש פנימי.'),
      ]),
      el('button', { class: 'btn-cta', onclick: () => toast('התחל טופס חסימה חדשה · בחר חדר ותאריכים', 'success') }, '+ חסימה חדשה'),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['חדר','יחידות','התחלה','סיום','סיבה','נוצר ע״י',''].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['חדר ל־6 עובדים', 1, '15.05', '17.05', '🔧 תחזוקה — מיזוג', 'אדיר אם־סלם'],
      ['חדר ל־8 עובדים', 2, '22.05', '23.05', '🧹 חיטוי יסודי והדברת מזעים', 'אדיר אם־סלם'],
      ['חדר מנהל עבודה', 1, '01.06', '04.06', '🛏️ שימוש פנימי — הדרכת צוות', 'נטע ש.'],
    ].forEach(r => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { style: 'font-weight:700' }, r[0]),
        el('td', {}, r[1] + ''),
        el('td', {}, r[2]),
        el('td', {}, r[3]),
        el('td', {}, r[4]),
        el('td', {}, r[5]),
        el('td', {}, el('button', { class: 'btn-mini ghost' }, 'הסר חסימה')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'manual') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'הזמנה ידנית'),
        el('div', { class: 'sub' }, 'Walk-in / טלפון / WhatsApp — ללא Stripe.'),
      ]),
    ]));
    main.appendChild(el('div', { class: 'panel', style: 'padding:24px' }, [
      el('div', { class: 'form-grid' }, [
        el('div', { class: 'field-block' }, [el('label', {}, 'שם החברה*'), el('input', { type: 'text' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'טלפון איש קשר*'), el('input', { type: 'tel' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'אימייל'), el('input', { type: 'email' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'מס׳ עובדים'), el('input', { type: 'number', value: '6' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'סוג חדר'), (() => { const s = el('select'); HOSTELS[0].rooms.forEach(r => s.appendChild(el('option', {}, r.title + ' · ₪' + r.price))); return s; })()]),
        el('div', { class: 'field-block' }, [el('label', {}, 'מקור'), (() => { const s = el('select'); ['טלפון','WhatsApp','מייל','Walk-in','אחר'].forEach(x => s.appendChild(el('option', {}, x))); return s; })()]),
        el('div', { class: 'field-block' }, [el('label', {}, 'צ׳ק־אין'), el('input', { type: 'date' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'צ׳ק־אאוט'), el('input', { type: 'date' })]),
        el('div', { class: 'field-block full' }, [el('label', {}, 'הערות פנימיות'), el('textarea', { rows: '3', placeholder: 'אופן תשלום, בקשות, וכו׳' })]),
      ]),
      el('div', { style: 'margin-top:18px;display:flex;gap:10px;justify-content:flex-end' }, [
        el('button', { class: 'btn-ghost', onclick: () => nav('/operator/dashboard') }, 'ביטול'),
        el('button', { class: 'btn-cta', onclick: () => { toast('ההזמנה נוצרה בהצלחה', 'success'); setTimeout(() => nav('/operator/bookings'), 700); } }, 'צור הזמנה'),
      ])
    ]));
  }

  shell.appendChild(main);
  wrap.appendChild(shell);
  return wrap;
}

// ============ ADMIN ============
function renderAdmin(sub) {
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/admin/overview'));

  const shell = el('div', { class: 'op-shell' });

  const side = el('div', { class: 'op-side' }, [
    el('div', { class: 'label' }, 'הקבוצה'),
    el('div', { style: 'background:rgba(224,123,57,.15);padding:12px;border-radius:10px;margin-bottom:12px;border:1px solid rgba(224,123,57,.3)' }, [
      el('div', { style: 'font-weight:700;color:#fff;font-size:14px' }, '🏨 AM HOSTELS'),
      el('div', { style: 'font-size:12px;opacity:.7' }, '4 אכסניות · אדמין'),
    ]),
    el('div', { class: 'label' }, 'ניהול'),
    ...[
      ['overview','📊','מבט־על'],
      ['bookings','📋','כל ההזמנות'],
      ['properties','🏨','אכסניות'],
      ['rooms','🛏️','חדרים ומחירים'],
      ['staff','👥','צוות'],
      ['refunds','💸','החזרים'],
      ['reports','📈','דוחות'],
      ['audit','🔐','Audit Log'],
    ].map(([k,ic,label]) => el('a', { class: sub === k ? 'on' : '', onclick: () => nav('/admin/' + k) }, [el('span', { class: 'ic' }, ic), label])),
    el('div', { class: 'who' }, [
      el('b', {}, '👤 אדיר אם־סלם'),
      'מנהל קבוצה · אדמין רוחבי',
    ]),
  ]);
  shell.appendChild(side);

  const main = el('div', { class: 'op-main' });

  if (sub === 'overview') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'מבט־על · אפריל 2026'),
        el('div', { class: 'sub' }, '4 אכסניות · 28 ימים אחרונים'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost', onclick: () => toast('דוח מבט⯧על התחל הורד · overview_apr-2026.pdf', 'success') }, '⬇ ייצוא דוח'),
        el('select', { class: 'input-sm' }, [el('option', {}, 'אפריל 2026'), el('option', {}, 'מרץ 2026'), el('option', {}, 'פברואר 2026')]),
      ])
    ]));

    main.appendChild(el('div', { class: 'kpis' }, [
      ['הכנסה החודש', '₪148,320', '+22% מחודש קודם'],
      ['הזמנות החודש', '412', '+18% מחודש קודם'],
      ['תפוסה ממוצעת', '76%', '+8 נק׳'],
      ['ביטולים', '24 (5.8%)', '−1.2 נק׳'],
    ].map(([l,n,d]) => el('div', { class: 'kpi' }, [
      el('div', { class: 'label' }, l),
      el('div', { class: 'num' }, n),
      el('div', { class: 'delta' }, d),
    ]))));

    // 4-property breakdown
    main.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [
        el('h3', {}, 'ביצועים לפי אכסנייה'),
        el('div', { class: 'tools' }, [el('span', { class: 'chip on' }, 'הכנסה'), el('span', { class: 'chip' }, 'תפוסה'), el('span', { class: 'chip' }, 'הזמנות')]),
      ]),
      (() => {
        const t = el('table');
        t.appendChild(el('thead', {}, el('tr', {}, ['אכסנייה','עיר','הכנסה','הזמנות','תפוסה','שינוי','סטטוס'].map(h => el('th', {}, h)))));
        const tb = el('tbody');
        const data = [
          { h: HOSTELS[0], rev: 52800, bk: 148, occ: 84 },
          { h: HOSTELS[1], rev: 41200, bk: 122, occ: 79 },
          { h: HOSTELS[2], rev: 32600, bk: 88,  occ: 71 },
          { h: HOSTELS[3], rev: 21720, bk: 54,  occ: 58 },
        ];
        data.forEach(d => {
          tb.appendChild(el('tr', { class: 'row-hover' }, [
            el('td', { style: 'font-weight:700' }, [d.h.glyph + ' ', d.h.name_he]),
            el('td', {}, d.h.city),
            el('td', { style: 'font-weight:700' }, '₪' + d.rev.toLocaleString()),
            el('td', {}, d.bk + ''),
            el('td', {}, [
              el('div', { style: 'display:flex;align-items:center;gap:8px' }, [
                el('div', { style: 'flex:1;height:6px;background:var(--bg-soft);border-radius:999px;overflow:hidden;min-width:80px' }, [
                  el('div', { style: 'height:100%;width:' + d.occ + '%;background:' + (d.occ > 80 ? 'var(--green-deep)' : (d.occ > 65 ? 'var(--orange)' : 'var(--amber-500)')) }, ''),
                ]),
                el('span', { style: 'font-weight:700;font-size:13px' }, d.occ + '%'),
              ])
            ]),
            el('td', {}, el('span', { style: 'color:var(--green-deep);font-weight:700;font-size:13px' }, '↑ +' + (12 + d.occ % 9) + '%')),
            el('td', {}, el('span', { class: 'status-pill st-confirmed' }, [el('span', { class: 'dot' }), 'פעיל'])),
          ]));
        });
        t.appendChild(tb);
        return t;
      })()
    ]));

    // Recent + alerts
    const two = el('div', { class: 'op-2col', style: 'margin-top:20px' });
    two.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, '📋 הזמנות אחרונות')]),
      (() => {
        const t = el('table');
        t.appendChild(el('thead', {}, el('tr', {}, ['קוד','מתחם','לקוח','סכום','סטטוס'].map(h => el('th', {}, h)))));
        const tb = el('tbody');
        BOOKINGS.slice(0, 5).forEach(b => {
          const h = findHostel(b.hostel);
          tb.appendChild(el('tr', { class: 'row-hover' }, [
            el('td', { class: 'booking-code' }, b.code),
            el('td', {}, h.glyph + ' ' + h.city),
            el('td', {}, b.country + ' ' + b.name),
            el('td', {}, '₪' + b.total.toLocaleString()),
            el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
          ]));
        });
        t.appendChild(tb);
        return t;
      })()
    ]));

    two.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, '🔔 התראות')]),
      el('div', { class: 'feed' }, [
        ['orange','⚠','3 הזמנות לא סונכרנו ל־FDM','AM ירושלים · ראה ב־calendar'],
        ['red','🚨','חסימה פגה היום','AM תל אביב · חדר 8 · בדוק תחזוקה'],
        ['','💸','בקשת החזר','AMH-8N9M0L · ₪360 · ממתין לאישור'],
        ['green','✓','פיילוט Stripe Test פעיל','כל ההזמנות במצב test · אין חיוב אמיתי'],
      ].map(([cls,ic,t,m]) => el('div', { class: 'item ' + cls }, [
        el('div', { class: 'ic' }, ic),
        el('div', { class: 'body' }, [el('div', { class: 't' }, t), el('div', { class: 'm' }, m)])
      ])))
    ]));
    main.appendChild(two);
  }

  if (sub === 'bookings') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'כל ההזמנות'),
        el('div', { class: 'sub' }, '4 אכסניות · ' + BOOKINGS.length + ' תוצאות'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost', onclick: () => toast('קובץ CSV הורד · all_bookings_apr-2026.csv', 'success') }, '⬇ ייצוא CSV'),
      ])
    ]));

    main.appendChild(el('div', { class: 'row-flex', style: 'margin-bottom:16px' }, [
      el('input', { class: 'input-sm', placeholder: '🔍 חיפוש שם / קוד / מייל', style: 'min-width:280px' }),
      el('select', { class: 'input-sm' }, ['כל האכסניות', ...HOSTELS.map(h => h.name_he)].map(x => el('option', {}, x))),
      el('span', { class: 'chip on' }, 'הכל'),
      el('span', { class: 'chip' }, 'מאושר'),
      el('span', { class: 'chip' }, 'נכנס'),
      el('span', { class: 'chip' }, 'בוטל'),
    ]));

    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','מתחם','לקוח','חדר','תאריכים','לילות','סכום','סטטוס','תשלום'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    BOOKINGS.forEach(b => {
      const h = findHostel(b.hostel);
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { class: 'booking-code' }, b.code),
        el('td', {}, h.glyph + ' ' + h.city),
        el('td', {}, [
          el('div', { style: 'font-weight:700' }, b.country + ' ' + b.name),
          el('div', { style: 'font-size:12px;color:var(--gray-500)' }, b.email),
        ]),
        el('td', { style: 'font-size:13px' }, b.room),
        el('td', {}, b.in + ' › ' + b.out),
        el('td', {}, b.nights + ''),
        el('td', { style: 'font-weight:700' }, '₪' + b.total.toLocaleString()),
        el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
        el('td', {}, b.paid ? el('span', { style: 'color:var(--green-deep);font-weight:700;font-size:12px' }, '✓ שולם') : el('span', { style: 'color:var(--amber-500);font-weight:700;font-size:12px' }, '⏳ ממתין')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'properties') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'אכסניות'),
        el('div', { class: 'sub' }, 'עריכת פרטים, גלריות, מחירים, פרטי קשר'),
      ]),
      el('button', { class: 'btn-cta', onclick: () => toast('התחל טופס הוספת מתחם חדש') }, '+ אכסנייה חדשה'),
    ]));

    const grid = el('div', { style: 'display:grid;grid-template-columns:repeat(2,1fr);gap:18px' });
    HOSTELS.forEach(h => {
      grid.appendChild(el('div', { class: 'panel', style: 'padding:0' }, [
        el('div', { style: 'padding:20px;border-bottom:1px solid var(--border-default);display:flex;justify-content:space-between;align-items:flex-start' }, [
          el('div', {}, [
            el('div', { style: 'font-size:30px' }, h.glyph),
            el('div', { style: 'font-weight:800;font-size:18px;margin-top:4px' }, h.name_he),
            el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:2px' }, '📍 ' + h.address),
          ]),
          el('span', { class: 'status-pill st-confirmed' }, [el('span', { class: 'dot' }), 'פעיל']),
        ]),
        el('div', { style: 'padding:16px 20px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;font-size:13px' }, [
          el('div', {}, [el('div', { style: 'color:var(--gray-500);font-weight:600' }, 'מיטות'), el('div', { style: 'font-size:18px;font-weight:800' }, h.capacity)]),
          el('div', {}, [el('div', { style: 'color:var(--gray-500);font-weight:600' }, 'חדרים'), el('div', { style: 'font-size:18px;font-weight:800' }, h.rooms_total)]),
          el('div', {}, [el('div', { style: 'color:var(--gray-500);font-weight:600' }, 'הקצאה ישירה'), el('div', { style: 'font-size:18px;font-weight:800;color:var(--orange-hover)' }, h.direct_alloc + ' / ' + h.rooms_total)]),
        ]),
        el('div', { style: 'padding:14px 20px;border-top:1px solid var(--border-default);display:flex;gap:8px;justify-content:flex-end' }, [
          el('button', { class: 'btn-mini ghost' }, '✏ ערוך פרטים'),
          el('button', { class: 'btn-mini ghost' }, '🛏 חדרים'),
          el('button', { class: 'btn-mini' }, 'נהל →'),
        ])
      ]));
    });
    main.appendChild(grid);
  }

  if (sub === 'rooms') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'חדרים ומחירים'),
        el('div', { class: 'sub' }, 'הקצאה ישירה — שינוי משפיע על זמינות באתר'),
      ]),
    ]));
    main.appendChild(el('div', { class: 'tabs' }, HOSTELS.map((h, i) => el('a', { class: i===0?'on':'' }, h.glyph + ' ' + h.name_he))));

    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','שם','קטגוריה','סה״כ יחידות','הקצאה ישירה','OTAs','מחיר','פעולות'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    HOSTELS[0].rooms.forEach(r => {
      const direct = Math.ceil(r.total * 0.6);
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { style: 'font-family: monospace; font-size:12px;color:var(--gray-600)' }, r.code),
        el('td', { style: 'font-weight:700' }, r.title),
        el('td', {}, el('span', { class: 'status-pill', style: 'background:var(--bg-soft);color:var(--gray-700)' }, r.cat)),
        el('td', {}, r.total + ''),
        el('td', {}, el('div', { style: 'display:flex;align-items:center;gap:8px' }, [
          el('input', { type: 'number', class: 'input-sm', value: direct + '', style: 'width:60px' }),
          el('span', { style: 'font-size:12px;color:var(--gray-500)' }, '/ ' + r.total),
        ])),
        el('td', {}, el('span', { style: 'color:var(--gray-600)' }, (r.total - direct) + ' (FDM)')),
        el('td', {}, [
          el('span', { style: 'font-weight:700' }, '₪' + r.price),
          el('span', { style: 'font-size:11px;color:var(--gray-500)' }, ' / ' + r.per),
        ]),
        el('td', {}, el('button', { class: 'btn-mini ghost' }, '✏ ערוך')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'staff') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'צוות'),
        el('div', { class: 'sub' }, 'אופרטורים ואדמינים — הקצאה לפי אכסנייה'),
      ]),
      el('button', { class: 'btn-cta', onclick: () => toast('התחל הוספת איש צוות חדש') }, '+ הוסף איש צוות'),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['שם','אימייל','תפקיד','אכסנייה','כניסה אחרונה','סטטוס',''].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['אדיר אם־סלם', 'adir@amhostels.co.il', 'admin', 'כל האכסניות', 'לפני 12 דק׳', true],
      ['נטע שלום', 'neta@amhostels.co.il', 'operator', '🏗️ AM ירושלים', 'לפני שעה', true],
      ['Daniel Roth', 'daniel@amhostels.co.il', 'operator', '🏗️ AM תל אביב', 'אתמול 23:14', true],
      ['Maya Klein', 'maya@amhostels.co.il', 'operator', '🏗️ AM חיפה', 'לפני 3 ימים', true],
      ['Yossi Mor', 'yossi@amhostels.co.il', 'operator', '🏗️ AM טבריה', 'לפני שבוע', false],
    ].forEach(r => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { style: 'font-weight:700' }, '👤 ' + r[0]),
        el('td', {}, r[1]),
        el('td', {}, el('span', { class: 'status-pill', style: r[2] === 'admin' ? 'background:rgba(224,123,57,.15);color:var(--orange-hover)' : 'background:var(--blue-light);color:var(--blue-deep)' }, r[2])),
        el('td', {}, r[3]),
        el('td', { style: 'font-size:13px;color:var(--gray-600)' }, r[4]),
        el('td', {}, r[5] ? el('span', { class: 'status-pill st-confirmed' }, [el('span', { class: 'dot' }), 'פעיל']) : el('span', { class: 'status-pill st-cancelled' }, [el('span', { class: 'dot' }), 'מושעה'])),
        el('td', {}, el('div', { class: 'row-flex' }, [el('button', { class: 'btn-mini ghost' }, '🔑 איפוס'), el('button', { class: 'btn-mini ghost' }, '✏')])),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'refunds') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'בקשות החזר'),
        el('div', { class: 'sub' }, 'אישור ידני — Stripe refund נשלח לאחר אישור'),
      ]),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','לקוח','מתחם','סכום מקור','סכום החזר','סיבה','בקשה','סטטוס','פעולות'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['AMH-8N9M0L','נחושתן בנייה בע"מ','🏗️ AM ירושלים',7800,7800,'ביטול מוקדם (מעל 7 ימים)','לפני 3 ימים','ממתין לאישור', true],
      ['AMH-2L9P4Q','דוראן כוח אדם בע"מ','🏗️ AM תל אביב', 5376,2688,'ביטול תוך החודש — חיוב לילות שמומשו','אתמול','אושר', false],
      ['AMH-6T8U2W','אלעד בנייה בע"מ',  '🏗️ AM חיפה',  15860,15860,'תקלה במתחם','לפני שבוע','שולם', false],
    ].forEach(r => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { class: 'booking-code' }, r[0]),
        el('td', { style: 'font-weight:700' }, r[1]),
        el('td', {}, r[2]),
        el('td', {}, '₪' + r[3]),
        el('td', { style: 'font-weight:700; color: var(--orange-hover)' }, '₪' + r[4]),
        el('td', { style: 'font-size:13px' }, r[5]),
        el('td', { style: 'font-size:13px;color:var(--gray-600)' }, r[6]),
        el('td', {}, el('span', { class: 'status-pill ' + (r[7] === 'אושר' || r[7] === 'שולם' ? 'st-confirmed' : 'st-pending') }, [el('span', { class: 'dot' }), r[7]])),
        el('td', {}, r[8] ? el('div', { class: 'row-flex' }, [el('button', { class: 'btn-mini success' }, '✓ אשר'), el('button', { class: 'btn-mini ghost' }, '✕')]) : el('span', { style: 'font-size:12px;color:var(--gray-500)' }, '—')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'reports') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'דוחות חודשיים'),
        el('div', { class: 'sub' }, 'הכנסות, תפוסה, ביטולים — לחשבונאות'),
      ]),
      el('button', { class: 'btn-cta', onclick: () => toast('דוח PDF הורד · financial_apr-2026.pdf', 'success') }, '⬇ ייצוא PDF'),
    ]));
    main.appendChild(el('div', { class: 'kpis' }, [
      ['סה״כ הכנסה','₪148,320','אפריל 2026'],
      ['חיוב מע״מ 17%','₪25,214','בנפרד'],
      ['עמלות Stripe','₪3,708','2.5%'],
      ['ביטולים והחזרים','₪7,440','5.0%'],
    ].map(([l,n,d]) => el('div', { class: 'kpi' }, [
      el('div', { class: 'label' }, l),
      el('div', { class: 'num' }, n),
      el('div', { class: 'delta neutral' }, d),
    ]))));

    main.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, 'הכנסה לפי אכסנייה — אפריל 2026')]),
      el('div', { style: 'padding:24px' }, (() => {
        const data = [['🏗️ AM ירושלים', 52800, 'var(--blue-deep)'], ['🏗️ AM תל אביב', 41200, 'var(--green-deep)'], ['🏗️ AM חיפה', 32600, 'var(--orange)'], ['🏗️ AM טבריה', 21720, 'var(--blue-light)']];
        const max = Math.max(...data.map(d => d[1]));
        const wrap = el('div', { style: 'display:flex;flex-direction:column;gap:14px' });
        data.forEach(([label, val, color]) => {
          wrap.appendChild(el('div', {}, [
            el('div', { style: 'display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-bottom:6px' }, [el('span', {}, label), el('span', {}, '₪' + val.toLocaleString())]),
            el('div', { style: 'height:14px;background:var(--bg-soft);border-radius:999px;overflow:hidden' }, [
              el('div', { style: 'height:100%;width:' + (val/max*100) + '%;background:' + color + ';border-radius:999px;transition:width 600ms ease' }, ''),
            ]),
          ]));
        });
        return wrap;
      })())
    ]));
  }

  if (sub === 'audit') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'Audit Log'),
        el('div', { class: 'sub' }, 'תיעוד פעולות רגישות — refunds, שינויי מחיר, מחיקות'),
      ]),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['זמן','משתמש','פעולה','משאב','שינוי','IP'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['29.04 14:32', 'אדיר אם־סלם', 'admin', 'price.update', 'חדר 6 עובדים · ₪55 → ₪60', '82.81.x.x'],
      ['29.04 11:18', 'אדיר אם־סלם', 'admin', 'booking.refund', 'AMH-8N9M0L · ₪7,800', '82.81.x.x'],
      ['29.04 09:42', 'נטע שלום',    'operator', 'booking.cancel', 'AMH-8N9M0L · בקשת לקוח', '212.x.x.x'],
      ['28.04 22:15', 'אדיר אם־סלם', 'admin', 'staff.create', 'Yossi Mor · operator · טבריה', '82.81.x.x'],
      ['28.04 18:04', 'אדיר אם־סלם', 'admin', 'allocation.update', 'ירושלים · חדר 6 · 2 → 3', '82.81.x.x'],
      ['28.04 14:50', 'אדיר אם־סלם', 'admin', 'login', 'אדמין · session start', '82.81.x.x'],
    ].forEach(r => {
      tb.appendChild(el('tr', {}, [
        el('td', { style: 'font-family:monospace;font-size:12px;color:var(--gray-600)' }, r[0]),
        el('td', { style: 'font-weight:700' }, '👤 ' + r[1]),
        el('td', {}, el('span', { class: 'status-pill', style: r[2] === 'admin' ? 'background:rgba(224,123,57,.15);color:var(--orange-hover)' : 'background:var(--blue-light);color:var(--blue-deep)' }, r[2])),
        el('td', { style: 'font-family:monospace;font-size:12px' }, r[3]),
        el('td', { style: 'font-size:13px' }, r[4]),
        el('td', { style: 'font-family:monospace;font-size:12px;color:var(--gray-500)' }, r[5]),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  shell.appendChild(main);
  wrap.appendChild(shell);
  return wrap;
}

// initial
render();
</script>

</body>
</html>
===== END FILE =====

===== FILE: assets/mockups/AM_Hostels_Booking_System_v1.html =====
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>AM HOSTELS — מערכת הזמנות</title>
<link rel="stylesheet" href="colors_and_type.css"/>
<style>
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg-page); color:var(--ink); font-family:var(--font-sans); }
  button { font-family: inherit; cursor: pointer; border: 0; background: none; }
  input, select, textarea { font-family: inherit; }
  a { color: inherit; }

  /* ===== Top Nav ===== */
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: var(--blue-deep); color: #fff;
    padding: 14px 28px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .nav .links { display: flex; gap: 22px; font-size: 14px; font-weight: 500; align-items: center; }
  .nav .links a { color: rgba(255,255,255,.92); cursor: pointer; }
  .nav .links a.on { color: #fff; font-weight: 700; }
  .nav .links .sep { color: rgba(255,255,255,.25); }
  .nav .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 19px; cursor: pointer; }
  .nav .logo .glyph {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px; background: var(--orange);
    font-size: 15px;
  }
  .nav .logo .sub { font-size: 11px; font-weight: 600; opacity: .7; letter-spacing: .08em; }
  .nav-pill {
    font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px;
    background: rgba(210,229,250,.12); color: #D2E5FA;
    border: 1px solid rgba(210,229,250,.2);
  }

  .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .container-narrow { max-width: 880px; margin: 0 auto; padding: 0 24px; }

  /* ===== HERO (home) ===== */
  .hero {
    background: var(--blue-deep); color: #fff;
    padding: 56px 28px 80px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ""; position: absolute; inset: 0;
    background:
      radial-gradient(circle at 18% 40%, rgba(224,123,57,.12), transparent 50%),
      radial-gradient(circle at 82% 20%, rgba(82,163,117,.10), transparent 45%);
    pointer-events: none;
  }
  .hero .inner { max-width: 1024px; margin: 0 auto; position: relative; }
  .hero .pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 999px;
    background: rgba(82,163,117,.18); color: #C9E8D6;
    border: 1px solid rgba(82,163,117,.35);
    font-size: 13px; font-weight: 700; margin-bottom: 18px;
  }
  .hero .pill .dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--green-light);
    animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
  }
  @keyframes pulse { 50% { opacity: .35; } }
  .hero h1 {
    font-size: 48px; font-weight: 800; letter-spacing: -.025em;
    line-height: 1.08; margin: 0 0 14px; color: #fff; max-width: 800px;
  }
  .hero .lead {
    font-size: 18px; color: #D2E5FA; opacity: .92;
    margin: 0 0 28px; max-width: 620px; line-height: 1.55;
  }
  .hero .meta {
    display: flex; gap: 22px; flex-wrap: wrap; font-size: 14px;
    color: rgba(255,255,255,.85);
  }
  .hero .meta b { color: #fff; font-weight: 700; }

  /* ===== Search Bar (overlapping hero) ===== */
  .searchbar { max-width: 1024px; margin: -36px auto 0; padding: 0 28px; position: relative; z-index: 5; }
  .searchbar .box {
    background: #fff; border-radius: 16px; box-shadow: var(--shadow-md);
    padding: 14px; display: grid;
    grid-template-columns: 1.4fr 1.2fr 1fr 1fr auto; gap: 10px; align-items: stretch;
    border: 1px solid var(--border-default);
  }
  .field { display: flex; flex-direction: column; gap: 2px; padding: 6px 12px; border-radius: 10px; cursor: pointer; }
  .field:hover { background: var(--bg-soft); }
  .field label { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; }
  .field .val { font-size: 14px; font-weight: 600; color: var(--ink); }
  .field .val.muted { color: var(--gray-400); font-weight: 500; }
  .searchbar select, .searchbar input {
    border: 0; background: transparent; outline: none;
    font-size: 14px; font-weight: 600; color: var(--ink);
    padding: 0; margin: 0;
  }
  .btn-cta {
    background: var(--orange); color: #fff;
    padding: 12px 26px; border-radius: 12px;
    font-weight: 700; font-size: 14px;
    box-shadow: var(--shadow-orange);
    transition: transform 150ms ease, background 150ms ease;
  }
  .btn-cta:hover { background: var(--orange-hover); transform: translateY(-1px); }
  .btn-cta:active { transform: scale(.97); }
  .btn-cta.lg { padding: 14px 30px; font-size: 15px; border-radius: 14px; }
  .btn-cta.full { width: 100%; padding: 14px; font-size: 15px; }

  .btn-out {
    background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.4);
    padding: 12px 26px; border-radius: 12px; font-weight: 700; font-size: 14px;
    transition: background 150ms ease;
  }
  .btn-out:hover { background: rgba(255,255,255,.08); }

  .btn-ghost {
    background: #fff; color: var(--blue-deep);
    border: 1.5px solid var(--border-default);
    padding: 11px 18px; border-radius: 12px; font-weight: 700; font-size: 14px;
    transition: border-color 150ms ease;
  }
  .btn-ghost:hover { border-color: var(--blue-deep); }

  /* ===== Section Heading ===== */
  .h2 { display: flex; align-items: baseline; gap: 14px; margin: 56px 0 20px; }
  .h2 h2 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -.01em; }
  .h2 small { font-size: 13px; color: var(--fg-muted); font-weight: 500; }
  .h2 .more { margin-inline-start: auto; font-size: 14px; font-weight: 700; color: var(--blue-deep); cursor: pointer; }

  /* ===== Hostel Cube Cards (home) ===== */
  .hostels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 32px; }
  @media (max-width: 1024px) { .hostels { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 580px) { .hostels { grid-template-columns: 1fr; } }
  .hcube {
    background: #fff; border-radius: 20px; overflow: hidden;
    border: 1px solid var(--border-default); box-shadow: var(--shadow-sm);
    transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
    cursor: pointer; display: flex; flex-direction: column;
  }
  .hcube:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--blue-deep); }
  .hcube:hover .hcube-img::after { opacity: .7; }
  .hcube-img {
    aspect-ratio: 4/3; position: relative; overflow: hidden;
    display: flex; align-items: flex-end; padding: 14px;
  }
  .hcube-img::before {
    content: ""; position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform 400ms ease;
  }
  .hcube:hover .hcube-img::before { transform: scale(1.06); }
  .hcube-img::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,.65) 100%);
    transition: opacity 200ms ease;
  }
  .hcube[data-key="cinema"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(27,58,107,.55), rgba(27,58,107,.85)),
      url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80');
  }
  .hcube[data-key="jungle"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(45,106,79,.45), rgba(45,106,79,.85)),
      url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80');
  }
  .hcube[data-key="haifa"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(30,30,46,.5), rgba(30,30,46,.85)),
      url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80');
  }
  .hcube[data-key="tiberias"] .hcube-img::before {
    background-image: linear-gradient(135deg, rgba(82,163,117,.45), rgba(27,58,107,.85)),
      url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80');
  }
  .hcube-tag {
    position: absolute; top: 14px; inset-inline-start: 14px; z-index: 1;
    font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
    background: rgba(255,255,255,.95); color: var(--blue-deep);
  }
  .hcube-status {
    position: absolute; top: 14px; inset-inline-end: 14px; z-index: 1;
    font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
    background: var(--green-light); color: #fff;
    display: inline-flex; align-items: center; gap: 5px;
  }
  .hcube-status .dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; animation: pulse 2s ease infinite; }
  .hcube-titlewrap { position: relative; z-index: 1; color: #fff; }
  .hcube-titlewrap .glyph { font-size: 24px; }
  .hcube-titlewrap h3 { margin: 4px 0 0; font-size: 22px; font-weight: 800; letter-spacing: -.01em; line-height: 1.15; }
  .hcube-titlewrap .city { font-size: 13px; opacity: .9; margin-top: 2px; }
  .hcube-body { padding: 16px 18px 14px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .hcube-body .desc { font-size: 13px; color: var(--gray-600); line-height: 1.5; min-height: 60px; }
  .hcube-stats { display: flex; gap: 14px; font-size: 12px; color: var(--gray-500); padding-top: 6px; border-top: 1px dashed var(--border-default); }
  .hcube-stats b { color: var(--ink); font-weight: 700; }
  .hcube-foot {
    padding: 12px 18px 16px; display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--border-default);
  }
  .hcube-price b { font-size: 18px; font-weight: 800; color: var(--ink); }
  .hcube-price small { font-size: 12px; color: var(--gray-500); font-weight: 500; }
  .hcube-cta {
    background: var(--orange); color: #fff;
    font-size: 13px; font-weight: 700; padding: 9px 16px; border-radius: 10px;
    transition: background 150ms ease;
  }
  .hcube-cta:hover { background: var(--orange-hover); }

  /* ===== Trust band ===== */
  .trust-band {
    background: rgba(45,106,79,.08); border: 1px solid rgba(45,106,79,.2);
    border-radius: 14px; padding: 18px 22px;
    display: flex; align-items: center; gap: 16px; margin: 28px 0;
  }
  .trust-band .ic { font-size: 26px; flex: none; }
  .trust-band .t { font-weight: 700; font-size: 15px; color: var(--green-deep); }
  .trust-band .d { font-size: 13px; color: var(--fg-muted); margin-top: 2px; }

  /* ===== How It Works ===== */
  .how { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
  @media (max-width: 800px) { .how { grid-template-columns: repeat(2, 1fr); } }
  .step {
    background: #fff; border-radius: 16px; padding: 20px;
    border: 1px solid var(--border-default);
  }
  .step .n {
    width: 32px; height: 32px; border-radius: 999px;
    background: var(--blue-light); color: var(--blue-deep);
    font-weight: 800; font-size: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
  }
  .step h4 { margin: 0 0 6px; font-size: 16px; font-weight: 700; }
  .step p { font-size: 13px; color: var(--gray-600); margin: 0; line-height: 1.5; }

  /* ===== Footer ===== */
  footer {
    background: #15264a; color: rgba(255,255,255,.7); padding: 36px 28px;
    margin-top: 60px;
  }
  footer .inner { max-width: 1024px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; font-size: 13px; }
  footer .logo { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 800; font-size: 18px; }
  footer .logo .glyph {
    width: 30px; height: 30px; border-radius: 8px; background: var(--orange);
    display: inline-flex; align-items: center; justify-content: center;
  }
  footer a { color: rgba(255,255,255,.7); }
  footer .links { display: flex; gap: 18px; }

  /* ===== Hostel Detail Page ===== */
  .hd-hero {
    position: relative; height: 360px; overflow: hidden;
    background-size: cover; background-position: center;
  }
  .hd-hero::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.65) 100%);
  }
  .hd-hero .crumbs {
    position: absolute; top: 18px; inset-inline-start: 0; right: 0; z-index: 2;
    max-width: 1180px; margin: 0 auto; padding: 0 24px;
    color: rgba(255,255,255,.85); font-size: 13px; font-weight: 500;
  }
  .hd-hero .crumbs a { color: rgba(255,255,255,.85); cursor: pointer; }
  .hd-hero .crumbs span { margin: 0 8px; }
  .hd-hero .title-wrap {
    position: absolute; bottom: 28px; inset-inline-start: 0; right: 0; z-index: 2;
    max-width: 1180px; margin: 0 auto; padding: 0 24px;
    color: #fff;
  }
  .hd-hero h1 { color: #fff; font-size: 44px; font-weight: 800; letter-spacing: -.02em; margin: 6px 0; }
  .hd-hero .city { font-size: 15px; opacity: .92; }
  .hd-hero .badges { display: flex; gap: 8px; margin-top: 8px; }
  .hd-hero .badges .b {
    font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px;
    background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25);
  }
  .hd-hero .badges .b.ver { background: var(--green-deep); border-color: var(--green-deep); }

  .hd-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; margin-top: 36px; align-items: start; }
  @media (max-width: 920px) { .hd-grid { grid-template-columns: 1fr; } }

  .hd-section h2 { font-size: 22px; font-weight: 800; margin: 0 0 12px; }
  .hd-desc { font-size: 15px; line-height: 1.7; color: var(--gray-700); }

  .amenities { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 18px; }
  @media (max-width: 600px) { .amenities { grid-template-columns: repeat(2, 1fr); } }
  .amenities .a {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 12px; padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; font-weight: 500;
  }
  .amenities .a .ic { font-size: 18px; }

  /* Room types */
  .rooms { display: flex; flex-direction: column; gap: 14px; margin-top: 12px; }
  .room {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 16px; padding: 18px;
    display: grid; grid-template-columns: 110px 1fr auto; gap: 16px; align-items: center;
  }
  @media (max-width: 600px) { .room { grid-template-columns: 1fr; } }
  .room.selected { border-color: var(--blue-deep); box-shadow: 0 0 0 3px rgba(27,58,107,.08); }
  .room .icon-wrap {
    aspect-ratio: 1/1; border-radius: 12px;
    background: var(--blue-light); color: var(--blue-deep);
    display: flex; align-items: center; justify-content: center;
    font-size: 38px;
  }
  .room.dorm .icon-wrap { background: rgba(82,163,117,.15); color: var(--green-deep); }
  .room.capsule .icon-wrap { background: rgba(224,123,57,.15); color: var(--orange-hover); }
  .room h4 { margin: 0 0 4px; font-size: 17px; font-weight: 700; }
  .room .meta { font-size: 13px; color: var(--gray-600); }
  .room .feats { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .room .feats span {
    font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 999px;
    background: var(--bg-soft); color: var(--gray-700); border: 1px solid var(--border-default);
  }
  .room .price-side { text-align: end; }
  .room .price-side .num { font-size: 22px; font-weight: 800; }
  .room .price-side .per { font-size: 12px; color: var(--gray-500); }
  .room .price-side .avail { font-size: 12px; color: var(--green-deep); font-weight: 700; margin-top: 6px; }
  .room .price-side .avail.low { color: var(--orange-hover); }
  .room .price-side button { margin-top: 8px; }

  /* Booking sidebar (sticky) */
  .book-side {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 18px; padding: 22px; box-shadow: var(--shadow-md);
    position: sticky; top: 90px;
  }
  .book-side h3 { margin: 0 0 4px; font-size: 16px; font-weight: 700; color: var(--gray-500); font-weight: 600; }
  .book-side .price-now { font-size: 28px; font-weight: 800; color: var(--ink); }
  .book-side .price-now small { font-size: 14px; color: var(--gray-500); font-weight: 500; }
  .book-side .row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
  .book-side .inp {
    border: 1px solid var(--border-default); border-radius: 10px; padding: 10px 12px;
    font-size: 13px; display: flex; flex-direction: column; gap: 2px;
  }
  .book-side .inp label { font-size: 10px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; }
  .book-side .inp input, .book-side .inp select { border: 0; padding: 0; font-size: 14px; font-weight: 600; color: var(--ink); background: transparent; outline: none; }
  .book-side .summary { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-default); display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
  .book-side .summary .ln { display: flex; justify-content: space-between; color: var(--gray-700); }
  .book-side .summary .total { display: flex; justify-content: space-between; font-size: 17px; font-weight: 800; color: var(--ink); padding-top: 8px; border-top: 1px dashed var(--border-default); }
  .book-side .micro { font-size: 12px; color: var(--gray-500); margin-top: 12px; line-height: 1.5; text-align: center; }

  /* ===== Booking flow steps ===== */
  .stepper {
    display: flex; gap: 0; margin: 28px 0; align-items: center;
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 14px; padding: 6px;
  }
  .stepper .s {
    flex: 1; display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px; font-size: 14px; font-weight: 600;
    color: var(--gray-500);
  }
  .stepper .s.on { background: var(--blue-light); color: var(--blue-deep); font-weight: 700; }
  .stepper .s.done { color: var(--green-deep); }
  .stepper .s .n {
    width: 24px; height: 24px; border-radius: 999px;
    background: var(--bg-soft); color: var(--gray-500);
    font-weight: 800; font-size: 12px;
    display: inline-flex; align-items: center; justify-content: center;
    border: 1px solid var(--border-default);
  }
  .stepper .s.on .n { background: var(--blue-deep); color: #fff; border-color: var(--blue-deep); }
  .stepper .s.done .n { background: var(--green-deep); color: #fff; border-color: var(--green-deep); }
  .stepper .arrow { color: var(--gray-300); font-size: 14px; }

  /* Calendar */
  .calwrap { background: #fff; border: 1px solid var(--border-default); border-radius: 16px; padding: 20px; }
  .calhead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .calhead h3 { margin: 0; font-size: 16px; font-weight: 700; }
  .calhead .nav-btn { background: var(--bg-soft); border-radius: 8px; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; }
  .cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .cal .dow { font-size: 11px; font-weight: 700; color: var(--gray-500); text-align: center; padding: 6px 0; }
  .cal .d {
    aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 500; border-radius: 8px;
    cursor: pointer; transition: background 100ms ease;
  }
  .cal .d:hover { background: var(--bg-soft); }
  .cal .d.dim { color: var(--gray-300); cursor: default; }
  .cal .d.in { background: var(--blue-deep); color: #fff; font-weight: 700; }
  .cal .d.out { background: var(--blue-deep); color: #fff; font-weight: 700; }
  .cal .d.range { background: var(--blue-light); color: var(--blue-deep); border-radius: 0; }
  .cal .d.range.first { border-radius: 8px 0 0 8px; }
  .cal .d.range.last { border-radius: 0 8px 8px 0; }
  .cal .d.blocked { background: rgba(239,68,68,.08); color: var(--red-500); cursor: not-allowed; text-decoration: line-through; }

  /* Form */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
  .field-block { display: flex; flex-direction: column; gap: 6px; }
  .field-block label { font-size: 13px; font-weight: 700; color: var(--gray-700); }
  .field-block .inp, .field-block input, .field-block select, .field-block textarea {
    border: 1px solid var(--border-default); border-radius: 10px;
    padding: 11px 14px; font-size: 14px; background: #fff; outline: none;
    transition: border-color 150ms ease;
  }
  .field-block .inp:focus, .field-block input:focus, .field-block select:focus, .field-block textarea:focus { border-color: var(--blue-deep); }
  .field-block .hint { font-size: 12px; color: var(--gray-500); }
  .field-block.full { grid-column: 1 / -1; }

  .checkbox-row {
    display: flex; gap: 12px; align-items: flex-start;
    background: var(--bg-soft); border: 1px solid var(--border-default);
    border-radius: 12px; padding: 14px;
  }
  .checkbox-row input { margin-top: 2px; }
  .checkbox-row .t { font-size: 13px; color: var(--gray-700); line-height: 1.5; }
  .checkbox-row .t b { color: var(--ink); }
  .checkbox-row a { color: var(--blue-deep); font-weight: 700; }

  /* Payment section */
  .pay-card {
    background: #fff; border: 2px dashed var(--border-default);
    border-radius: 16px; padding: 24px; text-align: center;
  }
  .pay-card .lock { font-size: 32px; margin-bottom: 8px; }
  .pay-card h4 { margin: 0 0 4px; font-size: 17px; }
  .pay-card p { font-size: 13px; color: var(--gray-600); margin: 0 0 16px; }
  .stripe-mark {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; color: var(--gray-500);
    background: var(--bg-soft); padding: 6px 12px; border-radius: 999px;
  }

  /* Success */
  .succ {
    background: #fff; border-radius: 18px; padding: 40px;
    border: 1px solid var(--border-default); text-align: center;
  }
  .succ .check {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(82,163,117,.15); color: var(--green-deep);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 36px; margin-bottom: 16px;
  }
  .succ h2 { margin: 0 0 6px; font-size: 26px; }
  .succ .lead { font-size: 15px; color: var(--gray-600); margin: 0 0 20px; }
  .succ .code-card {
    display: inline-block; background: var(--blue-deep); color: #fff;
    padding: 14px 28px; border-radius: 14px; font-family: 'IBM Plex Mono', monospace;
    font-size: 22px; font-weight: 800; letter-spacing: .04em; margin-bottom: 24px;
  }
  .succ .details { text-align: start; max-width: 420px; margin: 0 auto; background: var(--bg-soft); border-radius: 12px; padding: 18px; }
  .succ .details .ln { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; border-bottom: 1px solid var(--border-default); }
  .succ .details .ln:last-child { border-bottom: 0; }
  .succ .details .ln .k { color: var(--gray-600); }
  .succ .details .ln .v { font-weight: 700; }

  /* ===== Operator Layout ===== */
  .op-shell { display: grid; grid-template-columns: 240px 1fr; min-height: calc(100vh - 60px); }
  @media (max-width: 800px) { .op-shell { grid-template-columns: 1fr; } }
  .op-side {
    background: var(--blue-deep); color: rgba(255,255,255,.85);
    padding: 24px 16px; border-inline-end: 1px solid rgba(0,0,0,.05);
  }
  .op-side .label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.45); text-transform: uppercase; letter-spacing: .05em; padding: 0 12px; margin: 18px 0 8px; }
  .op-side .label:first-of-type { margin-top: 0; }
  .op-side a {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 10px; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,.85); cursor: pointer; margin-bottom: 2px;
  }
  .op-side a .ic { font-size: 16px; width: 20px; }
  .op-side a:hover { background: rgba(255,255,255,.06); }
  .op-side a.on { background: rgba(255,255,255,.1); color: #fff; font-weight: 700; }
  .op-side .who {
    margin-top: auto; padding: 12px; border-radius: 10px; background: rgba(255,255,255,.05);
    font-size: 12px;
  }
  .op-side .who b { color: #fff; font-weight: 700; display: block; font-size: 13px; }
  .op-main { padding: 28px 32px; background: var(--bg-soft); }
  @media (max-width: 600px) { .op-main { padding: 20px 16px; } }
  .op-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  .op-head h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -.01em; }
  .op-head .sub { font-size: 14px; color: var(--gray-600); margin-top: 4px; }

  /* KPI cards */
  .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
  @media (max-width: 800px) { .kpis { grid-template-columns: repeat(2, 1fr); } }
  .kpi {
    background: #fff; border: 1px solid var(--border-default);
    border-radius: 16px; padding: 18px;
  }
  .kpi .label { font-size: 12px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; }
  .kpi .num { font-size: 32px; font-weight: 800; line-height: 1.1; margin-top: 6px; letter-spacing: -.01em; }
  .kpi .delta { font-size: 12px; font-weight: 600; margin-top: 4px; color: var(--green-deep); }
  .kpi .delta.neg { color: var(--red-500); }
  .kpi .delta.neutral { color: var(--gray-500); }

  /* Tables */
  .panel { background: #fff; border: 1px solid var(--border-default); border-radius: 16px; overflow: hidden; }
  .panel-head { padding: 16px 20px; border-bottom: 1px solid var(--border-default); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
  .panel-head h3 { margin: 0; font-size: 16px; font-weight: 700; }
  .panel-head .tools { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .input-sm {
    border: 1px solid var(--border-default); border-radius: 9px;
    padding: 7px 12px; font-size: 13px; outline: none; background: #fff;
  }
  .chip {
    font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 999px;
    background: #fff; color: var(--gray-700); border: 1px solid var(--border-default); cursor: pointer;
  }
  .chip.on { background: var(--blue-deep); color: #fff; border-color: var(--blue-deep); }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { padding: 13px 20px; text-align: start; border-bottom: 1px solid var(--border-default); }
  th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--gray-500); font-weight: 700; background: var(--bg-soft); }
  tr:last-child td { border-bottom: 0; }
  tr.row-hover:hover { background: var(--bg-soft); cursor: pointer; }
  .booking-code { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13px; color: var(--blue-deep); }

  .status-pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: .03em;
  }
  .status-pill .dot { width: 6px; height: 6px; border-radius: 50%; }
  .st-confirmed { background: rgba(45,106,79,.12); color: var(--green-deep); }
  .st-confirmed .dot { background: var(--green-deep); }
  .st-pending { background: #fffbeb; color: #92400e; }
  .st-pending .dot { background: var(--amber-500); }
  .st-checked_in { background: var(--blue-light); color: var(--blue-deep); }
  .st-checked_in .dot { background: var(--blue-deep); }
  .st-checked_out { background: var(--gray-100); color: var(--gray-600); }
  .st-checked_out .dot { background: var(--gray-400); }
  .st-cancelled { background: rgba(239,68,68,.1); color: var(--red-600); }
  .st-cancelled .dot { background: var(--red-500); }
  .st-no_show { background: rgba(239,68,68,.1); color: var(--red-600); }
  .st-no_show .dot { background: var(--red-500); }

  .btn-mini {
    background: var(--blue-deep); color: #fff;
    font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 8px;
  }
  .btn-mini:hover { background: var(--blue-deep-hover); }
  .btn-mini.ghost { background: #fff; color: var(--gray-700); border: 1px solid var(--border-default); }
  .btn-mini.ghost:hover { border-color: var(--blue-deep); color: var(--blue-deep); }
  .btn-mini.success { background: var(--green-deep); }
  .btn-mini.success:hover { background: #1f5640; }

  /* Two-column op layout */
  .op-2col { display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; }
  @media (max-width: 1000px) { .op-2col { grid-template-columns: 1fr; } }

  /* Activity feed */
  .feed { padding: 8px 4px; }
  .feed .item { display: flex; gap: 12px; padding: 12px 16px; border-radius: 10px; }
  .feed .item:hover { background: var(--bg-soft); }
  .feed .item .ic { width: 34px; height: 34px; border-radius: 10px; background: var(--blue-light); color: var(--blue-deep); display: inline-flex; align-items: center; justify-content: center; font-size: 16px; flex: none; }
  .feed .item.green .ic { background: rgba(45,106,79,.12); color: var(--green-deep); }
  .feed .item.orange .ic { background: rgba(224,123,57,.12); color: var(--orange-hover); }
  .feed .item.red .ic { background: rgba(239,68,68,.1); color: var(--red-600); }
  .feed .item .body { flex: 1; }
  .feed .item .body .t { font-size: 14px; font-weight: 600; }
  .feed .item .body .m { font-size: 12px; color: var(--gray-500); margin-top: 2px; }

  /* Calendar grid (operator) */
  .occgrid { overflow-x: auto; }
  .occgrid table { min-width: 720px; }
  .occgrid td.day-cell { text-align: center; padding: 6px; font-weight: 700; font-size: 13px; }
  .occgrid td.day-cell .pct { display: inline-block; padding: 4px 8px; border-radius: 6px; min-width: 36px; }
  .occgrid td.day-cell.lo .pct { background: rgba(82,163,117,.15); color: var(--green-deep); }
  .occgrid td.day-cell.md .pct { background: rgba(245,158,11,.15); color: #92400e; }
  .occgrid td.day-cell.hi .pct { background: rgba(239,68,68,.12); color: var(--red-600); }
  .occgrid td.day-cell.full .pct { background: var(--blue-deep); color: #fff; }
  .occgrid td.label-cell { font-weight: 600; font-size: 13px; min-width: 150px; }

  /* Tabs */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border-default); margin-bottom: 20px; }
  .tabs a { padding: 10px 16px; font-size: 14px; font-weight: 600; color: var(--gray-600); border-bottom: 2px solid transparent; cursor: pointer; }
  .tabs a.on { color: var(--blue-deep); border-bottom-color: var(--blue-deep); }

  /* Login */
  .login-shell { min-height: calc(100vh - 60px); display: flex; align-items: center; justify-content: center; padding: 24px; background: var(--bg-soft); }
  .login-card { background: #fff; border-radius: 18px; padding: 36px; width: 100%; max-width: 420px; box-shadow: var(--shadow-md); }
  .login-card h2 { margin: 0 0 8px; font-size: 22px; }
  .login-card .lead { font-size: 14px; color: var(--gray-600); margin: 0 0 22px; }

  /* Misc */
  .row-flex { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .lang-toggle { display: inline-flex; background: rgba(255,255,255,.08); border-radius: 999px; padding: 3px; border: 1px solid rgba(255,255,255,.12); }
  .lang-toggle button { padding: 4px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; color: rgba(255,255,255,.7); }
  .lang-toggle button.on { background: rgba(255,255,255,.15); color: #fff; }

  /* Hide on responsive */
  @media (max-width: 800px) { .desk-only { display: none !important; } }

</style>
</head>
<body>

<div id="app"></div>

<script>
/* ============================================================
   AM HOSTELS — Booking System (single-file SPA, hash-routed)
   Surfaces:
     #/                 Home (4 hostel cubes)
     #/hostels/:slug    Hostel detail
     #/book/:slug/:step Booking flow (step 1-3)
     #/booking/:code    Confirmation
     #/operator         Operator dashboard
     #/operator/bookings, /calendar, /blocks, /manual
     #/admin            Admin overview
     #/admin/bookings, /properties, /staff, /refunds, /reports
   ============================================================ */

const HOSTELS = [
  {
    slug: 'cinema-jerusalem',
    glyph: '🕌',
    name_he: 'Cinema Hostel ירושלים',
    name_en: 'Cinema Hostel Jerusalem',
    city: 'ירושלים',
    city_en: 'Jerusalem',
    address: 'רחוב שמאי 4, ירושלים 9463104',
    tagline: 'ישנים בקולנוע. בלב העיר העתיקה.',
    short: 'בנוי בתוך בניין קולנוע אוריון ההיסטורי משנות ה־20. חדרים בעיצוב סרטים, בר Orion, גג עם נוף.',
    long: 'Cinema Hostel ממוקם בתוך בניין קולנוע אוריון ההיסטורי משנות ה-20. 5 דקות הליכה לשוק מחנה יהודה, 10 דקות לעיר העתיקה. החדרים מעוצבים בנושא סרטים, יש בר Orion עם 20% הנחה לאורחים, מטבח משותף, וגג עם נוף.',
    age: '18–45',
    from_price: 120,
    capacity: 64,
    rooms_total: 24,
    direct_alloc: 13,
    amenities: [
      ['📶','WiFi חינם'], ['❄️','מיזוג'], ['🍳','מטבח משותף'],
      ['🍳','ארוחת בוקר'], ['🧺','מכבסה'], ['🧳','אכסון מזוודות'],
      ['🍷','בר Orion'], ['🎬','חדר קולנוע'], ['🛗','מעלית']
    ],
    rooms: [
      { code: 'mixed-dorm-6',  cat: 'dorm',    title: 'דורם מעורב 6 מיטות', meta: '6 מיטות · WC משותף · ארונית אישית', price: 120, per: 'מיטה', avail: 4, total: 6, feats: ['מיזוג','ארונית','קריאה'] },
      { code: 'mixed-dorm-12', cat: 'dorm',    title: 'דורם מעורב 12 מיטות', meta: '12 מיטות · 2 WC · ארונית אישית', price: 120, per: 'מיטה', avail: 9, total: 12, feats: ['מיזוג','ארונית','קריאה'] },
      { code: 'female-dorm-6', cat: 'dorm',    title: 'דורם נשים 6 מיטות', meta: '6 מיטות · WC נשים בלבד · ארונית', price: 120, per: 'מיטה', avail: 2, total: 6, feats: ['נשים בלבד','מיזוג','ארונית'] },
      { code: 'capsule-single',cat: 'capsule', title: 'קפסולה יחיד', meta: 'קפסולה פרטית · אור · USB · ארונית', price: 180, per: 'לילה', avail: 3, total: 4, feats: ['פרטיות','USB','קריאה'] },
      { code: 'capsule-double',cat: 'capsule', title: 'קפסולה זוגית', meta: '2 מיטות צמודות · ארונית · USB', price: 280, per: 'לילה', avail: 1, total: 2, feats: ['זוגי','USB','ארונית'] },
      { code: 'private-double',cat: 'private', title: 'חדר פרטי זוגי', meta: 'מיטה זוגית · WC צמוד · טלוויזיה', price: 320, per: 'לילה', avail: 2, total: 3, feats: ['פרטי','WC צמוד','TV'] },
    ]
  },
  {
    slug: 'jungle-jaffa',
    glyph: '🌊',
    name_he: 'Jungle Jaffa תל אביב',
    name_en: 'Jungle Jaffa Hostel',
    city: 'תל אביב/יפו',
    city_en: 'Tel Aviv-Yafo',
    address: 'שארית ישראל 31, תל אביב 6816517',
    tagline: 'ג׳ונגל באמצע יפו. אוכל, מוסיקה, חברים.',
    short: 'בית קהילה בלב יפו. 10 דקות לים, גג נוף, ארוחת ערב חינם כל יום, יוגה בבקרים, מסיבות שישי.',
    long: 'Jungle Jaffa הוא בית קהילה בלב יפו. 10 דקות הליכה לים, ליד פלורנטין. גג נוף, ארוחת ערב חינם כל יום, יוגה בבקרים, מסיבות שישי. קהילה צעירה גילאי 18-45.',
    age: '18–45',
    from_price: 120,
    capacity: 48,
    rooms_total: 18,
    direct_alloc: 10,
    amenities: [
      ['📶','WiFi חינם'], ['❄️','מיזוג'], ['🍝','ארוחת ערב חינם'],
      ['🍳','ארוחת בוקר ₪20'], ['🍳','מטבח משותף'], ['🍷','בר על הגג'],
      ['🧘','יוגה בבקרים'], ['🎵','מסיבות שישי'], ['🌊','10 דקות לים']
    ],
    rooms: [
      { code: 'mixed-dorm-8',  cat: 'dorm',    title: 'דורם מעורב 8 מיטות', meta: '8 מיטות · WC משותף · ארונית', price: 120, per: 'מיטה', avail: 3, total: 8, feats: ['מיזוג','ארונית'] },
      { code: 'mixed-dorm-10', cat: 'dorm',    title: 'דורם מעורב 10 מיטות', meta: '10 מיטות · 2 WC · ארונית', price: 120, per: 'מיטה', avail: 6, total: 10, feats: ['מיזוג','ארונית'] },
      { code: 'female-dorm-8', cat: 'dorm',    title: 'דורם נשים 8 מיטות', meta: '8 מיטות · WC נשים · ארונית', price: 120, per: 'מיטה', avail: 4, total: 8, feats: ['נשים בלבד','מיזוג'] },
      { code: 'private-double',cat: 'private', title: 'חדר פרטי זוגי', meta: 'מיטה זוגית · WC צמוד', price: 320, per: 'לילה', avail: 2, total: 4, feats: ['פרטי','WC צמוד'] },
      { code: 'private-twin',  cat: 'private', title: 'חדר פרטי טווין', meta: '2 מיטות יחיד · WC משותף', price: 290, per: 'לילה', avail: 1, total: 2, feats: ['פרטי','2 מיטות'] },
    ]
  },
  {
    slug: 'haifa',
    glyph: '⚓',
    name_he: 'Haifa Hostel',
    name_en: 'Haifa Hostel',
    city: 'חיפה',
    city_en: 'Haifa',
    address: 'בן גוריון 1, חיפה 3341334',
    tagline: 'שלווה במושבה הגרמנית. נוף לים.',
    short: 'בן גוריון 1, לב המושבה הגרמנית. דקות מגני הבהאים, מבנה עות׳מאני משופץ, מסעדה במקום.',
    long: 'Haifa Hostel ממוקם בבן גוריון 1, לב המושבה הגרמנית. דקות מגני הבהאים, עם נוף לים. בניין עות׳מאני משופץ, חדרים נקיים, מסעדה במקום. אידיאלי כנקודת זינוק לצפון.',
    age: '18–60',
    from_price: 120,
    capacity: 38,
    rooms_total: 14,
    direct_alloc: 8,
    amenities: [
      ['📶','WiFi חינם'], ['❄️','מיזוג'], ['🍳','מטבח משותף'],
      ['🍽️','מסעדה במקום'], ['🅿️','חניה חינם'], ['🌅','גג עם נוף'],
      ['🧳','אכסון מזוודות'], ['🌳','קרוב לגני הבהאים']
    ],
    rooms: [
      { code: 'mixed-dorm-6',  cat: 'dorm',    title: 'דורם מעורב 6 מיטות', meta: '6 מיטות · WC משותף · ארונית', price: 120, per: 'מיטה', avail: 5, total: 6, feats: ['מיזוג','ארונית'] },
      { code: 'mixed-dorm-8',  cat: 'dorm',    title: 'דורם מעורב 8 מיטות', meta: '8 מיטות · 2 WC · ארונית', price: 120, per: 'מיטה', avail: 6, total: 8, feats: ['מיזוג','ארונית'] },
      { code: 'private-double',cat: 'private', title: 'חדר פרטי זוגי + נוף', meta: 'מיטה זוגית · WC צמוד · נוף לים', price: 340, per: 'לילה', avail: 2, total: 4, feats: ['נוף לים','פרטי','WC צמוד'] },
      { code: 'private-family',cat: 'private', title: 'חדר משפחתי 4 מיטות', meta: '4 מיטות · WC צמוד · מטבחון', price: 480, per: 'לילה', avail: 1, total: 2, feats: ['משפחתי','מטבחון'] },
    ]
  },
  {
    slug: 'tiberias',
    glyph: '🏞️',
    name_he: 'Tiberias Hostel',
    name_en: 'Tiberias Hostel',
    city: 'טבריה',
    city_en: 'Tiberias',
    address: 'הגליל 14, טבריה',
    tagline: 'הכינרת מהחלון. שלווה הצפון.',
    short: 'דקות הליכה לטיילת הכינרת. חבילות סוף שבוע, ערבי מנגל, מסלולי טיולים.',
    long: 'Tiberias Hostel ממוקם דקות הליכה מטיילת הכינרת. אווירה משפחתית, חבילות סוף שבוע, ערבי מנגל, מסלולי טיולים מאורגנים בצפון.',
    age: '18–60',
    from_price: 120,
    capacity: 32,
    rooms_total: 12,
    direct_alloc: 7,
    amenities: [
      ['📶','WiFi חינם'], ['❄️','מיזוג'], ['🍳','מטבח משותף'],
      ['🅿️','חניה חינם'], ['🏊','קרוב לכינרת'], ['🔥','מנגלים בחצר'],
      ['🚲','השכרת אופניים'], ['🥾','מסלולי טיולים']
    ],
    rooms: [
      { code: 'mixed-dorm-6',  cat: 'dorm',    title: 'דורם מעורב 6 מיטות', meta: '6 מיטות · WC משותף', price: 120, per: 'מיטה', avail: 4, total: 6, feats: ['מיזוג'] },
      { code: 'private-double',cat: 'private', title: 'חדר פרטי זוגי', meta: 'מיטה זוגית · WC צמוד', price: 320, per: 'לילה', avail: 3, total: 4, feats: ['פרטי','WC צמוד'] },
      { code: 'private-family',cat: 'private', title: 'חדר משפחתי 4 מיטות', meta: '4 מיטות · WC צמוד', price: 460, per: 'לילה', avail: 2, total: 2, feats: ['משפחתי'] },
    ]
  }
];

const STATUSES_HE = {
  pending: 'ממתין',
  confirmed: 'מאושר',
  checked_in: 'נכנס',
  checked_out: 'יצא',
  cancelled: 'בוטל',
  no_show: 'לא הופיע'
};

// sample bookings (for operator/admin views)
const BOOKINGS = [
  { code: 'AMH-3F2A9B', hostel: 'cinema-jerusalem', room: 'דורם מעורב 6 מיטות', name: 'מיכל לוי',     email: 'michal.l@gmail.com',  phone: '050-1234567', country: '🇮🇱', age: 28, in: '01.05', out: '04.05', nights: 3, units: 1, total: 360,  status: 'confirmed',  paid: true,  src: 'website', synced: true,  created: 'לפני 2 שעות' },
  { code: 'AMH-7K1L2M', hostel: 'cinema-jerusalem', room: 'חדר פרטי זוגי',         name: 'David Cohen',  email: 'davidc@example.com',  phone: '054-9988776', country: '🇺🇸', age: 34, in: '02.05', out: '06.05', nights: 4, units: 1, total: 1280, status: 'confirmed',  paid: true,  src: 'website', synced: false, created: 'לפני 5 שעות' },
  { code: 'AMH-9P3Q4R', hostel: 'jungle-jaffa',     room: 'דורם מעורב 10 מיטות',   name: 'Anna Petrov',  email: 'anna.p@example.ru',   phone: '+7 999 123', country: '🇷🇺', age: 24, in: '01.05', out: '03.05', nights: 2, units: 2, total: 480,  status: 'pending',    paid: false, src: 'website', synced: false, created: 'לפני 12 דק׳' },
  { code: 'AMH-2X8Y5Z', hostel: 'haifa',            room: 'חדר פרטי זוגי + נוף',  name: 'Sarah Klein',  email: 'sarah.k@gmail.com',   phone: '052-7654321', country: '🇩🇪', age: 41, in: '30.04', out: '02.05', nights: 2, units: 1, total: 680,  status: 'checked_in', paid: true,  src: 'website', synced: true,  created: 'אתמול' },
  { code: 'AMH-1A2B3C', hostel: 'tiberias',         room: 'חדר משפחתי 4 מיטות',    name: 'משפחת בר',     email: 'bar.family@gmail.com', phone: '050-1112233', country: '🇮🇱', age: 38, in: '03.05', out: '06.05', nights: 3, units: 1, total: 1380, status: 'confirmed',  paid: true,  src: 'website', synced: false, created: 'אתמול' },
  { code: 'AMH-5H6J7K', hostel: 'jungle-jaffa',     room: 'חדר פרטי זוגי',         name: 'Tom Brown',    email: 'tom.b@example.com',   phone: '+44 770 555', country: '🇬🇧', age: 29, in: '28.04', out: '30.04', nights: 2, units: 1, total: 640,  status: 'checked_out',paid: true,  src: 'website', synced: true,  created: 'לפני 5 ימים' },
  { code: 'AMH-8N9M0L', hostel: 'cinema-jerusalem', room: 'קפסולה יחיד',           name: 'Yuki Tanaka',  email: 'yuki.t@example.jp',   phone: '+81 90 555',  country: '🇯🇵', age: 31, in: '29.04', out: '01.05', nights: 2, units: 1, total: 360,  status: 'cancelled',  paid: true,  src: 'website', synced: true,  created: 'לפני 3 ימים' },
  { code: 'AMH-4D5E6F', hostel: 'haifa',            room: 'דורם מעורב 6 מיטות',    name: 'Carlos M.',    email: 'carlos@example.es',   phone: '+34 600 555', country: '🇪🇸', age: 26, in: '02.05', out: '05.05', nights: 3, units: 1, total: 360,  status: 'pending',    paid: false, src: 'website', synced: false, created: 'לפני 30 דק׳' },
];

const findHostel = (slug) => HOSTELS.find(h => h.slug === slug) || HOSTELS[0];

// ============ ROUTING ============
function parseHash() {
  const h = (location.hash || '#/').replace(/^#/, '');
  const parts = h.split('/').filter(Boolean);
  return parts;
}

function nav(path) { location.hash = '#' + path; }

function render() {
  const p = parseHash();
  const root = document.getElementById('app');
  root.innerHTML = '';
  if (!p[0]) return root.appendChild(renderHome());
  if (p[0] === 'hostels' && p[1]) return root.appendChild(renderHostel(p[1]));
  if (p[0] === 'book' && p[1]) {
    const step = p[2] || '1';
    return root.appendChild(renderBook(p[1], step));
  }
  if (p[0] === 'booking' && p[1]) return root.appendChild(renderConfirm(p[1]));
  if (p[0] === 'operator') {
    const sub = p[1] || 'dashboard';
    return root.appendChild(renderOperator(sub, p[2]));
  }
  if (p[0] === 'admin') {
    const sub = p[1] || 'overview';
    return root.appendChild(renderAdmin(sub));
  }
  return root.appendChild(renderHome());
}

window.addEventListener('hashchange', render);

// ============ HELPERS ============
function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k === 'html') e.innerHTML = attrs[k];
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
    else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
    else e.setAttribute(k, attrs[k]);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  });
  return e;
}

function renderTopNav(active) {
  const nav = el('nav', { class: 'nav' });
  const links = el('div', { class: 'links' });
  const linkData = [
    ['/', 'בית'],
    ['/hostels/cinema-jerusalem', 'אכסניות'],
    ['/operator/dashboard', 'אזור צוות'],
    ['/admin/overview', 'אדמין'],
  ];
  linkData.forEach(([href, label]) => {
    const a = el('a', { class: active === href ? 'on' : '', onclick: () => location.hash = '#' + href }, label);
    links.appendChild(a);
  });
  const lt = el('div', { class: 'lang-toggle desk-only' }, [
    el('button', { class: 'on' }, 'עב'),
    el('button', {}, 'EN'),
    el('button', {}, 'RU'),
  ]);
  links.appendChild(lt);

  const logo = el('div', { class: 'logo', onclick: () => location.hash = '#/' }, [
    el('span', { class: 'glyph' }, '🛏'),
    el('div', {}, [
      el('div', {}, 'AM HOSTELS'),
      el('div', { class: 'sub' }, 'BOOKING'),
    ])
  ]);
  nav.appendChild(links);
  nav.appendChild(logo);
  return nav;
}

function renderFooter() {
  return el('footer', {}, [
    el('div', { class: 'inner' }, [
      el('div', {}, [
        el('div', { class: 'logo' }, [
          el('span', { class: 'glyph' }, '🛏'),
          'AM HOSTELS',
        ]),
        el('div', { style: 'margin-top:8px;font-size:12px;' }, '4 אכסניות · ירושלים · תל אביב · חיפה · טבריה')
      ]),
      el('div', { class: 'links' }, [
        el('a', {}, 'אודות'),
        el('a', {}, 'תקנון'),
        el('a', {}, 'מדיניות ביטול'),
        el('a', {}, 'יצירת קשר'),
      ]),
      el('div', {}, '© AM HOSTELS 2026 · book.amhostels.co.il')
    ])
  ]);
}

// ============ HOME ============
function renderHome() {
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/'));

  const hero = el('section', { class: 'hero' }, [
    el('div', { class: 'inner' }, [
      el('span', { class: 'pill' }, [el('span', { class: 'dot' }), 'הזמנה ישירה · ללא עמלות · אישור מיידי']),
      el('h1', {}, '4 אכסניות. עיר אחת בלחיצה.'),
      el('p', { class: 'lead' }, 'הזמינו ישירות מאיתנו ב־AM HOSTELS — ירושלים, תל אביב, חיפה וטבריה. מחיר אחיד של ₪120 למיטה בדורם, ללא תוספות נסתרות.'),
      el('div', { class: 'meta' }, [
        el('div', {}, ['🏨 ', el('b', {}, '4'), ' אכסניות']),
        el('div', {}, ['🛏️ ', el('b', {}, '180+'), ' מיטות']),
        el('div', {}, ['🌐 ', el('b', {}, '3'), ' שפות']),
        el('div', {}, ['⚡ ', el('b', {}, '< 3 דק׳'), ' להזמנה']),
      ])
    ])
  ]);
  wrap.appendChild(hero);

  // search bar
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  const fmt = d => `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
  const sb = el('div', { class: 'searchbar' }, [
    el('div', { class: 'box' }, [
      el('div', { class: 'field' }, [
        el('label', {}, '📍 יעד'),
        el('div', { class: 'val' }, 'כל האכסניות'),
      ]),
      el('div', { class: 'field' }, [
        el('label', {}, '📅 צ׳ק־אין'),
        el('div', { class: 'val' }, fmt(today)),
      ]),
      el('div', { class: 'field' }, [
        el('label', {}, '📅 צ׳ק־אאוט'),
        el('div', { class: 'val' }, fmt(tomorrow)),
      ]),
      el('div', { class: 'field' }, [
        el('label', {}, '👥 אורחים'),
        el('div', { class: 'val' }, '2 אורחים · חדר 1'),
      ]),
      el('button', { class: 'btn-cta', onclick: () => nav('/hostels/cinema-jerusalem') }, 'חפש זמינות'),
    ])
  ]);
  wrap.appendChild(sb);

  const cont = el('div', { class: 'container' });
  // Section title
  cont.appendChild(el('div', { class: 'h2' }, [
    el('h2', {}, 'בחרו אכסנייה'),
    el('small', {}, '4 ערים · אישור מיידי · ביטול חינם עד 48 שעות'),
  ]));

  const grid = el('div', { class: 'hostels' });
  HOSTELS.forEach(h => {
    const card = el('article', { class: 'hcube', 'data-key': h.slug.split('-')[0], onclick: () => nav('/hostels/' + h.slug) }, [
      el('div', { class: 'hcube-img' }, [
        el('span', { class: 'hcube-tag' }, h.city),
        el('span', { class: 'hcube-status' }, [el('span', { class: 'dot' }), 'פעיל']),
        el('div', { class: 'hcube-titlewrap' }, [
          el('div', { class: 'glyph' }, h.glyph),
          el('h3', {}, h.name_he),
          el('div', { class: 'city' }, h.address.split(',')[0]),
        ])
      ]),
      el('div', { class: 'hcube-body' }, [
        el('div', { class: 'desc' }, h.short),
        el('div', { class: 'hcube-stats' }, [
          el('div', {}, [el('b', {}, h.capacity + ''), ' מיטות']),
          el('div', {}, [el('b', {}, h.rooms_total + ''), ' חדרים']),
          el('div', {}, ['גילאי ', el('b', {}, h.age)]),
        ])
      ]),
      el('div', { class: 'hcube-foot' }, [
        el('div', { class: 'hcube-price' }, [
          el('small', {}, 'החל מ־'),
          el('br'),
          el('b', {}, '₪' + h.from_price),
          el('small', {}, ' / לילה'),
        ]),
        el('button', { class: 'hcube-cta', onclick: (e) => { e.stopPropagation(); nav('/hostels/' + h.slug); } }, 'הזמנה ←')
      ])
    ]);
    grid.appendChild(card);
  });
  cont.appendChild(grid);

  cont.appendChild(el('div', { class: 'trust-band' }, [
    el('div', { class: 'ic' }, '🔒'),
    el('div', {}, [
      el('div', { class: 't' }, 'הזמנה ישירה = הכי משתלם, הכי בטוח'),
      el('div', { class: 'd' }, 'ללא עמלות OTA · החזר מלא עד 48 שעות לפני · יצירת קשר ישירה עם הצוות בכל שעה'),
    ])
  ]));

  cont.appendChild(el('div', { class: 'h2' }, [el('h2', {}, 'איך זה עובד')]));
  cont.appendChild(el('div', { class: 'how' }, [
    ['1','בוחרים אכסנייה','4 ערים, חדרים מסוגים שונים — דורם, פרטי, קפסולה.'],
    ['2','בוחרים תאריכים','צ׳ק־אין מ־15:00, צ׳ק־אאוט עד 11:00. מינימום לילה אחד.'],
    ['3','משלמים בבטחה','Stripe מאובטח, חשבונית בדוא״ל, אישור מיידי.'],
    ['4','מתארחים','קוד הזמנה במייל, פרטי קשר עם האכסנייה, ברוכים הבאים.'],
  ].map(([n,t,d]) => el('div', { class: 'step' }, [
    el('span', { class: 'n' }, n),
    el('h4', {}, t),
    el('p', {}, d),
  ]))));

  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ HOSTEL DETAIL ============
function renderHostel(slug) {
  const h = findHostel(slug);
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/hostels/' + slug));

  const hbg = {
    'cinema-jerusalem': "linear-gradient(135deg, rgba(27,58,107,.55), rgba(27,58,107,.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')",
    'jungle-jaffa':    "linear-gradient(135deg, rgba(45,106,79,.45), rgba(45,106,79,.85)), url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80')",
    'haifa':           "linear-gradient(135deg, rgba(30,30,46,.5), rgba(30,30,46,.85)), url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80')",
    'tiberias':        "linear-gradient(135deg, rgba(82,163,117,.45), rgba(27,58,107,.85)), url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80')",
  };

  const hero = el('div', { class: 'hd-hero', style: { backgroundImage: hbg[h.slug] || '' } }, [
    el('div', { class: 'crumbs' }, [
      el('a', { onclick: () => nav('/') }, 'בית'),
      el('span', {}, ' › '),
      el('span', {}, 'אכסניות'),
      el('span', {}, ' › '),
      el('span', { style: 'color:#fff;font-weight:700' }, h.name_he),
    ]),
    el('div', { class: 'title-wrap' }, [
      el('div', { style: 'font-size:38px' }, h.glyph),
      el('h1', {}, h.name_he),
      el('div', { class: 'city' }, '📍 ' + h.address),
      el('div', { class: 'badges' }, [
        el('span', { class: 'b ver' }, '✓ אכסנייה רשמית AM HOSTELS'),
        el('span', { class: 'b' }, 'גילאי ' + h.age),
        el('span', { class: 'b' }, h.capacity + ' מיטות'),
      ])
    ])
  ]);
  wrap.appendChild(hero);

  const cont = el('div', { class: 'container' });
  const grid = el('div', { class: 'hd-grid' });

  // ---- Left side ----
  const left = el('div');
  left.appendChild(el('div', { class: 'hd-section' }, [
    el('h2', {}, h.tagline),
    el('p', { class: 'hd-desc' }, h.long),
  ]));

  left.appendChild(el('div', { class: 'hd-section', style: 'margin-top:32px' }, [
    el('h2', {}, 'מתקנים'),
    (() => {
      const a = el('div', { class: 'amenities' });
      h.amenities.forEach(([ic, label]) => a.appendChild(el('div', { class: 'a' }, [el('span', { class: 'ic' }, ic), label])));
      return a;
    })(),
  ]));

  // Rooms
  const roomsSection = el('div', { class: 'hd-section', style: 'margin-top:36px' }, [
    el('h2', {}, 'בחירת חדר'),
    el('div', { style: 'font-size:14px;color:var(--gray-600);margin-bottom:16px' }, '3 לילות · 2 אורחים · מחירים כוללים מע״מ'),
  ]);
  const roomsList = el('div', { class: 'rooms' });
  h.rooms.forEach((r, i) => {
    const card = el('div', { class: 'room ' + r.cat });
    const iconMap = { dorm: '🛏️', private: '🚪', capsule: '🟦' };
    const availClass = r.avail <= 2 ? 'low' : '';
    const availText = r.avail === 1 ? 'נותרה יחידה אחת!' : (r.avail <= 2 ? `נותרו ${r.avail} בלבד` : `${r.avail} פנויים`);
    card.appendChild(el('div', { class: 'icon-wrap' }, iconMap[r.cat] || '🛏️'));
    card.appendChild(el('div', {}, [
      el('h4', {}, r.title),
      el('div', { class: 'meta' }, r.meta),
      (() => {
        const f = el('div', { class: 'feats' });
        r.feats.forEach(x => f.appendChild(el('span', {}, x)));
        return f;
      })(),
    ]));
    card.appendChild(el('div', { class: 'price-side' }, [
      el('div', { class: 'num' }, '₪' + r.price),
      el('div', { class: 'per' }, '/ ' + r.per + ' / לילה'),
      el('div', { class: 'avail ' + availClass }, availText),
      el('button', { class: 'btn-cta', style: 'padding:8px 18px;font-size:13px', onclick: () => nav('/book/' + h.slug + '/1?room=' + r.code) }, 'בחר חדר'),
    ]));
    roomsList.appendChild(card);
  });
  roomsSection.appendChild(roomsList);
  left.appendChild(roomsSection);

  // House rules
  left.appendChild(el('div', { class: 'hd-section', style: 'margin-top:36px' }, [
    el('h2', {}, 'כללי בית'),
    el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:14px' }, [
      el('div', {}, '🕒 צ׳ק־אין: 15:00–22:00'),
      el('div', {}, '🕒 צ׳ק־אאוט: עד 11:00'),
      el('div', {}, '🚭 ללא עישון בתוך הבניין'),
      el('div', {}, '🐕 חיות מחמד אסורות'),
      el('div', {}, '🔇 שקט: 23:00–07:00'),
      el('div', {}, '🆔 דרכון/ת.ז. נדרש בכניסה'),
    ])
  ]));

  // Cancellation
  left.appendChild(el('div', { class: 'trust-band', style: 'margin-top:28px' }, [
    el('div', { class: 'ic' }, '↩️'),
    el('div', {}, [
      el('div', { class: 't' }, 'מדיניות ביטול גמישה'),
      el('div', { class: 'd' }, 'ביטול עד 48 שעות לפני הצ׳ק־אין → החזר מלא. ביטול תוך 48 שעות → חיוב לילה ראשון בלבד.'),
    ])
  ]));

  grid.appendChild(left);

  // ---- Right sticky booking widget ----
  const right = el('div');
  const box = el('div', { class: 'book-side' }, [
    el('h3', {}, 'מחיר התחלתי'),
    el('div', { class: 'price-now' }, ['₪' + h.from_price, el('small', {}, ' / לילה')]),
    el('div', { class: 'row' }, [
      el('div', { class: 'inp' }, [el('label', {}, 'צ׳ק־אין'), el('input', { type: 'text', value: '01.05.2026' })]),
      el('div', { class: 'inp' }, [el('label', {}, 'צ׳ק־אאוט'), el('input', { type: 'text', value: '04.05.2026' })]),
    ]),
    el('div', { class: 'row', style: 'grid-template-columns:1fr' }, [
      el('div', { class: 'inp' }, [el('label', {}, 'אורחים'),
        (() => { const s = el('select'); ['1 אורח','2 אורחים','3 אורחים','4 אורחים'].forEach((x,i) => s.appendChild(el('option', { selected: i===1 ? 'selected' : null }, x))); return s; })()
      ]),
    ]),
    el('div', { class: 'summary' }, [
      el('div', { class: 'ln' }, [el('span', {}, '₪' + h.from_price + ' × 3 לילות'), el('span', {}, '₪' + (h.from_price * 3))]),
      el('div', { class: 'ln' }, [el('span', {}, 'דמי ניקיון'), el('span', {}, 'כלולים')]),
      el('div', { class: 'ln' }, [el('span', {}, 'מע״מ 17%'), el('span', {}, 'כלול')]),
      el('div', { class: 'total' }, [el('span', {}, 'סה״כ'), el('span', {}, '₪' + (h.from_price * 3))]),
    ]),
    el('button', { class: 'btn-cta full', style: 'margin-top:16px', onclick: () => nav('/book/' + h.slug + '/1') }, 'המשך להזמנה'),
    el('div', { class: 'micro' }, '🔒 תשלום מאובטח · ביטול חינם עד 48 שעות'),
  ]);
  right.appendChild(box);

  grid.appendChild(right);
  cont.appendChild(grid);
  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ BOOKING FLOW ============
function renderBook(slug, step) {
  const h = findHostel(slug);
  const wrap = el('div');
  wrap.appendChild(renderTopNav(''));
  const cont = el('div', { class: 'container-narrow' });

  // breadcrumb
  cont.appendChild(el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:24px' }, [
    el('a', { style: 'cursor:pointer', onclick: () => nav('/') }, 'בית'),
    ' › ',
    el('a', { style: 'cursor:pointer', onclick: () => nav('/hostels/' + slug) }, h.name_he),
    ' › ',
    el('span', { style: 'color:var(--ink);font-weight:700' }, 'הזמנה'),
  ]));

  // stepper
  const steps = [['1','תאריכים וחדר'],['2','פרטי אורח'],['3','תשלום']];
  const stepper = el('div', { class: 'stepper' });
  steps.forEach(([n, label], i) => {
    const cls = +step > +n ? 'done' : (+step === +n ? 'on' : '');
    stepper.appendChild(el('div', { class: 's ' + cls }, [
      el('span', { class: 'n' }, +step > +n ? '✓' : n),
      el('span', {}, label),
    ]));
    if (i < steps.length - 1) stepper.appendChild(el('span', { class: 'arrow' }, '←'));
  });
  cont.appendChild(stepper);

  // ----- step 1: dates + room -----
  if (step === '1') {
    cont.appendChild(el('h1', { style: 'font-size:24px;font-weight:800;margin:24px 0 4px' }, 'בחירת תאריכים'));
    cont.appendChild(el('div', { style: 'color:var(--gray-600);font-size:14px;margin-bottom:20px' }, h.name_he + ' · ' + h.city));

    const grid = el('div', { style: 'display:grid;grid-template-columns:1.4fr 1fr;gap:20px' });

    // calendar
    const cal = el('div', { class: 'calwrap' }, [
      el('div', { class: 'calhead' }, [
        el('button', { class: 'nav-btn' }, '→'),
        el('h3', {}, 'מאי 2026'),
        el('button', { class: 'nav-btn' }, '←'),
      ]),
      (() => {
        const c = el('div', { class: 'cal' });
        ['א','ב','ג','ד','ה','ו','ש'].forEach(d => c.appendChild(el('div', { class: 'dow' }, d)));
        // Fri May 1, 2026 -> day index? we'll just dump 31 days with first cell at col index 5 (Fri = ש=6 he calendar but in he week starts Sun)
        // Sun=0 ... Sat=6. May 1 2026 is Friday => col 5
        for (let i = 0; i < 5; i++) c.appendChild(el('div', { class: 'd dim' }, (26 + i) + ''));
        for (let d = 1; d <= 31; d++) {
          let cls = 'd';
          if (d === 1) cls += ' in';
          else if (d === 4) cls += ' out';
          else if (d > 1 && d < 4) cls += ' range';
          if (d === 15 || d === 22) cls += ' blocked';
          c.appendChild(el('div', { class: cls }, d + ''));
        }
        return c;
      })(),
      el('div', { style: 'display:flex;gap:14px;font-size:12px;color:var(--gray-500);margin-top:14px;padding-top:14px;border-top:1px solid var(--border-default)' }, [
        el('div', {}, [el('span', { style: 'display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--blue-deep);margin-inline-end:5px;vertical-align:middle' }), 'נבחר']),
        el('div', {}, [el('span', { style: 'display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--blue-light);margin-inline-end:5px;vertical-align:middle' }), 'בטווח']),
        el('div', {}, [el('span', { style: 'display:inline-block;width:10px;height:10px;border-radius:3px;background:rgba(239,68,68,.2);margin-inline-end:5px;vertical-align:middle' }), 'לא זמין']),
      ])
    ]);
    grid.appendChild(cal);

    // selected room summary
    const r = h.rooms[0];
    const summary = el('div', { class: 'book-side', style: 'position:static' }, [
      el('div', { style: 'font-size:13px;color:var(--gray-500);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px' }, 'חדר נבחר'),
      el('div', { style: 'font-size:17px;font-weight:800' }, r.title),
      el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:4px' }, r.meta),
      el('a', { onclick: () => nav('/hostels/' + slug), style: 'color:var(--blue-deep);font-size:13px;font-weight:700;cursor:pointer;display:inline-block;margin-top:8px' }, 'שנה חדר'),
      el('div', { class: 'summary' }, [
        el('div', { class: 'ln' }, [el('span', {}, 'צ׳ק־אין'), el('span', { style: 'font-weight:700' }, '01.05.2026')]),
        el('div', { class: 'ln' }, [el('span', {}, 'צ׳ק־אאוט'), el('span', { style: 'font-weight:700' }, '04.05.2026')]),
        el('div', { class: 'ln' }, [el('span', {}, 'לילות'), el('span', { style: 'font-weight:700' }, '3')]),
        el('div', { class: 'ln' }, [el('span', {}, '₪' + r.price + ' × 3'), el('span', {}, '₪' + (r.price * 3))]),
        el('div', { class: 'total' }, [el('span', {}, 'סה״כ'), el('span', {}, '₪' + (r.price * 3))]),
      ]),
      el('button', { class: 'btn-cta full', style: 'margin-top:14px', onclick: () => nav('/book/' + slug + '/2') }, 'המשך לפרטי האורח ←'),
    ]);
    grid.appendChild(summary);
    cont.appendChild(grid);
  }

  // ----- step 2: guest details -----
  if (step === '2') {
    cont.appendChild(el('h1', { style: 'font-size:24px;font-weight:800;margin:24px 0 4px' }, 'פרטי האורח'),);
    cont.appendChild(el('div', { style: 'color:var(--gray-600);font-size:14px;margin-bottom:20px' }, 'נצטרך פרטים אלו ליצירת ההזמנה ולשליחת אישור.'));

    const card = el('div', { class: 'panel', style: 'padding:24px' }, [
      el('div', { class: 'form-grid' }, [
        el('div', { class: 'field-block' }, [el('label', {}, 'שם מלא*'), el('input', { type: 'text', placeholder: 'מיכל לוי' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'אימייל*'), el('input', { type: 'email', placeholder: 'name@example.com' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'טלפון*'), el('input', { type: 'tel', placeholder: '050-1234567' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'מדינה*'), (() => { const s = el('select'); ['ישראל','ארה״ב','גרמניה','בריטניה','צרפת','רוסיה','יפן','אחר'].forEach(x => s.appendChild(el('option', {}, x))); return s; })()]),
        el('div', { class: 'field-block' }, [
          el('label', {}, 'גיל* (אכסנייה זו: ' + h.age + ')'),
          el('input', { type: 'number', placeholder: '28', min: '18', max: '99' }),
          el('div', { class: 'hint' }, h.age.includes('45') ? 'אכסנייה זו מיועדת לגילאי ' + h.age + ' בלבד.' : 'אנא הזינו גיל מדויק'),
        ]),
        el('div', { class: 'field-block' }, [el('label', {}, 'מס׳ אורחים*'), (() => { const s = el('select'); ['1','2','3','4'].forEach(x => s.appendChild(el('option', { selected: x==='2' ? 'selected' : null }, x))); return s; })()]),
        el('div', { class: 'field-block full' }, [el('label', {}, 'בקשות מיוחדות (אופציונלי)'), el('textarea', { rows: '3', placeholder: 'מיטה תחתונה / שעת הגעה משוערת / כל בקשה אחרת' })]),
      ]),
      el('div', { style: 'border-top:1px solid var(--border-default);margin-top:20px;padding-top:20px;display:flex;flex-direction:column;gap:10px' }, [
        el('div', { class: 'checkbox-row' }, [
          el('input', { type: 'checkbox', id: 'agr1' }),
          el('div', { class: 't' }, [
            el('b', {}, 'מדיניות ביטול: '),
            'ביטול עד 48 שעות לפני הצ׳ק־אין — החזר מלא. ביטול תוך 48 שעות — חיוב לילה ראשון בלבד. אישוש זה הצהרה שקראתי והבנתי. ',
            el('a', {}, 'קרא תקנון מלא'),
          ]),
        ]),
        el('div', { class: 'checkbox-row' }, [
          el('input', { type: 'checkbox', id: 'agr2' }),
          el('div', { class: 't' }, [
            'אני מאשר/ת קבלת מיילים מ־AM HOSTELS עם פרטי ההזמנה ועדכונים שירותיים בלבד.',
          ]),
        ]),
      ]),
    ]);
    cont.appendChild(card);
    cont.appendChild(el('div', { style: 'display:flex;justify-content:space-between;margin-top:20px' }, [
      el('button', { class: 'btn-ghost', onclick: () => nav('/book/' + slug + '/1') }, '→ חזור'),
      el('button', { class: 'btn-cta lg', onclick: () => nav('/book/' + slug + '/3') }, 'המשך לתשלום ←'),
    ]));
  }

  // ----- step 3: payment -----
  if (step === '3') {
    cont.appendChild(el('h1', { style: 'font-size:24px;font-weight:800;margin:24px 0 4px' }, 'תשלום'));
    cont.appendChild(el('div', { style: 'color:var(--gray-600);font-size:14px;margin-bottom:20px' }, 'אנו מנותבים אותך ל־Stripe לתשלום מאובטח.'));

    const r = h.rooms[0];
    const grid = el('div', { style: 'display:grid;grid-template-columns:1.2fr 1fr;gap:20px' });

    // Stripe placeholder
    const left = el('div', { class: 'pay-card' }, [
      el('div', { class: 'lock' }, '🔒'),
      el('h4', {}, 'תשלום מאובטח דרך Stripe'),
      el('p', {}, 'בלחיצה על "אשר ושלם" תועברו לדף תשלום מאובטח של Stripe. אנו לא שומרים פרטי אשראי.'),
      el('div', { style: 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:14px 0 20px' }, [
        el('span', { class: 'stripe-mark' }, ['💳 ', 'Visa']),
        el('span', { class: 'stripe-mark' }, ['💳 ', 'Mastercard']),
        el('span', { class: 'stripe-mark' }, ['💳 ', 'Amex']),
        el('span', { class: 'stripe-mark' }, ['🍎 ', 'Apple Pay']),
      ]),
      el('button', { class: 'btn-cta lg', onclick: () => nav('/booking/AMH-NEW7X9') }, 'אשר ושלם — ₪' + (r.price * 3)),
      el('div', { style: 'font-size:11px;color:var(--gray-500);margin-top:14px' }, 'מצב Test Mode פעיל · אישור בוצע ללא חיוב אמיתי'),
    ]);
    grid.appendChild(left);

    const summary = el('div', { class: 'book-side', style: 'position:static' }, [
      el('div', { style: 'font-size:13px;color:var(--gray-500);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px' }, 'סיכום הזמנה'),
      el('div', { style: 'font-size:17px;font-weight:800' }, h.name_he),
      el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:2px' }, r.title),
      el('div', { class: 'summary' }, [
        el('div', { class: 'ln' }, [el('span', {}, 'תאריכים'), el('span', { style: 'font-weight:700' }, '01.05 → 04.05')]),
        el('div', { class: 'ln' }, [el('span', {}, 'אורחים'), el('span', { style: 'font-weight:700' }, '2')]),
        el('div', { class: 'ln' }, [el('span', {}, '₪' + r.price + ' × 3 לילות'), el('span', {}, '₪' + (r.price * 3))]),
        el('div', { class: 'ln' }, [el('span', {}, 'מע״מ 17%'), el('span', {}, 'כלול')]),
        el('div', { class: 'total' }, [el('span', {}, 'סה״כ לתשלום'), el('span', {}, '₪' + (r.price * 3))]),
      ]),
      el('div', { class: 'micro', style: 'background:rgba(45,106,79,.08);color:var(--green-deep);padding:10px;border-radius:10px;margin-top:14px' }, '✓ ביטול חינם עד 29.04.2026'),
    ]);
    grid.appendChild(summary);

    cont.appendChild(grid);
    cont.appendChild(el('div', { style: 'display:flex;justify-content:flex-start;margin-top:20px' }, [
      el('button', { class: 'btn-ghost', onclick: () => nav('/book/' + slug + '/2') }, '→ חזור'),
    ]));
  }

  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ CONFIRMATION ============
function renderConfirm(code) {
  const wrap = el('div');
  wrap.appendChild(renderTopNav(''));
  const h = HOSTELS[0];
  const cont = el('div', { class: 'container-narrow', style: 'padding-top:36px;padding-bottom:60px' });

  cont.appendChild(el('div', { class: 'succ' }, [
    el('div', { class: 'check' }, '✓'),
    el('h2', {}, 'ההזמנה אושרה!'),
    el('div', { class: 'lead' }, 'מייל אישור עם כל הפרטים נשלח אליך. נתראה ב־' + h.name_he + '.'),
    el('div', { class: 'code-card' }, code),
    el('div', { class: 'details' }, [
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'אכסנייה'), el('span', { class: 'v' }, h.name_he)]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'חדר'), el('span', { class: 'v' }, h.rooms[0].title)]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'צ׳ק־אין'), el('span', { class: 'v' }, '01.05.2026 · 15:00')]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'צ׳ק־אאוט'), el('span', { class: 'v' }, '04.05.2026 · 11:00')]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'אורחים'), el('span', { class: 'v' }, '2')]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'סה״כ שולם'), el('span', { class: 'v' }, '₪' + (h.rooms[0].price * 3))]),
      el('div', { class: 'ln' }, [el('span', { class: 'k' }, 'כתובת'), el('span', { class: 'v', style: 'font-size:12px;text-align:end' }, h.address)]),
    ]),
    el('div', { style: 'margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap' }, [
      el('button', { class: 'btn-ghost' }, '📧 שליחה למייל נוסף'),
      el('button', { class: 'btn-ghost' }, '📱 פתח ב־WhatsApp'),
      el('button', { class: 'btn-cta', onclick: () => nav('/') }, 'חזור לבית'),
    ]),
  ]));

  // What's next
  cont.appendChild(el('div', { style: 'margin-top:32px' }, [
    el('h2', { style: 'font-size:20px;margin:0 0 14px' }, 'מה הלאה?'),
    el('div', { class: 'how' }, [
      ['📧','קיבלת מייל','אישור הזמנה עם הפרטים המלאים והוראות הגעה.'],
      ['📅','24 שעות לפני','נשלח לך תזכורת + מספר WhatsApp של הצוות.'],
      ['🛬','ביום הצ׳ק־אין','הציגו ת.ז./דרכון בקבלה. צ׳ק־אין מ־15:00.'],
      ['💬','שאלות?','יצירת קשר ישירה עם הצוות, בכל שעה.'],
    ].map(([ic,t,d]) => el('div', { class: 'step' }, [
      el('div', { style: 'font-size:24px' }, ic),
      el('h4', { style: 'margin-top:6px' }, t),
      el('p', {}, d),
    ])))
  ]));

  wrap.appendChild(cont);
  wrap.appendChild(renderFooter());
  return wrap;
}

// ============ OPERATOR ============
function renderOperator(sub, id) {
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/operator/dashboard'));

  const shell = el('div', { class: 'op-shell' });

  const side = el('div', { class: 'op-side' }, [
    el('div', { class: 'label' }, 'אכסנייה'),
    el('div', { style: 'background:rgba(255,255,255,.08);padding:12px;border-radius:10px;margin-bottom:12px' }, [
      el('div', { style: 'font-size:18px;margin-bottom:2px' }, '🕌'),
      el('div', { style: 'font-weight:700;color:#fff;font-size:14px' }, 'Cinema Hostel'),
      el('div', { style: 'font-size:12px;opacity:.7' }, 'ירושלים'),
    ]),
    el('div', { class: 'label' }, 'תפעול'),
    ...[
      ['dashboard','📊','דשבורד'],
      ['bookings','📋','הזמנות'],
      ['calendar','🗓️','לוח שנה'],
      ['blocks','🚫','חסימות'],
      ['manual','➕','הזמנה ידנית'],
    ].map(([k,ic,label]) => el('a', { class: sub === k ? 'on' : '', onclick: () => nav('/operator/' + k) }, [el('span', { class: 'ic' }, ic), label])),
    el('div', { class: 'who' }, [
      el('b', {}, '👤 אדיר אם־סלם'),
      'מנהל אכסנייה · Cinema',
    ]),
  ]);
  shell.appendChild(side);

  const main = el('div', { class: 'op-main' });

  if (sub === 'dashboard') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'בוקר טוב, אדיר 👋'),
        el('div', { class: 'sub' }, 'יום שלישי · 29.04.2026 · Cinema Hostel ירושלים'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost' }, '🔄 רענן'),
        el('button', { class: 'btn-cta', onclick: () => nav('/operator/manual') }, '+ הזמנה ידנית'),
      ])
    ]));

    main.appendChild(el('div', { class: 'kpis' }, [
      ['צ׳ק־אינים היום', '7', '+2 מאתמול'],
      ['צ׳ק־אאוטים היום', '4', '0', 'neutral'],
      ['תפוסה כעת', '83%', '54/64 מיטות', 'neutral'],
      ['הכנסה היום', '₪3,840', '+18% מאתמול'],
    ].map(([l,n,d,cls]) => el('div', { class: 'kpi' }, [
      el('div', { class: 'label' }, l),
      el('div', { class: 'num' }, n),
      el('div', { class: 'delta ' + (cls || '') }, d),
    ]))));

    const two = el('div', { class: 'op-2col' });

    // arrivals today
    const arrivalsBox = el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [
        el('h3', {}, '🛬 צ׳ק־אינים היום'),
        el('div', { class: 'tools' }, [el('span', { style: 'font-size:13px;color:var(--gray-500)' }, '7 מצופים')]),
      ]),
      (() => {
        const t = el('table');
        t.appendChild(el('thead', {}, el('tr', {}, [
          el('th', {}, 'אורח'),
          el('th', {}, 'חדר'),
          el('th', {}, 'לילות'),
          el('th', {}, 'סטטוס'),
          el('th', {}, ''),
        ])));
        const tb = el('tbody');
        BOOKINGS.filter(b => b.hostel === 'cinema-jerusalem').slice(0, 5).forEach(b => {
          tb.appendChild(el('tr', { class: 'row-hover' }, [
            el('td', {}, [
              el('div', { style: 'font-weight:700' }, [b.country + ' ', b.name]),
              el('div', { class: 'booking-code' }, b.code),
            ]),
            el('td', {}, b.room),
            el('td', {}, b.nights + ' לילות'),
            el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
            el('td', {}, b.status === 'confirmed'
              ? el('button', { class: 'btn-mini success' }, '✓ צ׳ק־אין')
              : el('button', { class: 'btn-mini ghost' }, 'פרטים')),
          ]));
        });
        t.appendChild(tb);
        return t;
      })(),
    ]);
    two.appendChild(arrivalsBox);

    // Activity feed
    two.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, '⚡ פעילות אחרונה')]),
      el('div', { class: 'feed' }, [
        ['green','✓','הזמנה חדשה אושרה','AMH-3F2A9B · מיכל לוי · ₪360 · לפני 12 דק׳'],
        ['orange','💳','תשלום התקבל','AMH-7K1L2M · ₪1,280 · לפני 5 שעות'],
        ['','📧','מייל אישור נשלח','AMH-7K1L2M · davidc@example.com · לפני 5 שעות'],
        ['red','✕','ביטול אורח','AMH-8N9M0L · Yuki Tanaka · החזר ₪360 בעיבוד'],
        ['','🔄','סנכרון FDM','3 הזמנות סומנו ידנית · אתמול 21:30'],
        ['green','🔑','צ׳ק־אין','AMH-2X8Y5Z · Sarah Klein · אתמול 16:42'],
      ].map(([cls,ic,t,m]) => el('div', { class: 'item ' + cls }, [
        el('div', { class: 'ic' }, ic),
        el('div', { class: 'body' }, [
          el('div', { class: 't' }, t),
          el('div', { class: 'm' }, m),
        ])
      ])))
    ]));

    main.appendChild(two);
  }

  if (sub === 'bookings') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'הזמנות'),
        el('div', { class: 'sub' }, 'הזמנות ישירות של Cinema Hostel ירושלים'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost' }, '⬇ ייצוא CSV'),
        el('button', { class: 'btn-cta', onclick: () => nav('/operator/manual') }, '+ הזמנה ידנית'),
      ])
    ]));

    const filterRow = el('div', { class: 'row-flex', style: 'margin-bottom:16px' }, [
      el('input', { class: 'input-sm', placeholder: '🔍 חיפוש שם / קוד / מייל', style: 'min-width:280px' }),
      el('span', { class: 'chip on' }, 'הכל · 24'),
      el('span', { class: 'chip' }, 'ממתין · 3'),
      el('span', { class: 'chip' }, 'מאושר · 12'),
      el('span', { class: 'chip' }, 'נכנס · 6'),
      el('span', { class: 'chip' }, 'בוטל · 3'),
      el('input', { class: 'input-sm', type: 'date' }),
    ]);
    main.appendChild(filterRow);

    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','אורח','חדר','צ׳ק־אין','לילות','סכום','סטטוס','FDM','פעולות'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    BOOKINGS.filter(b => b.hostel === 'cinema-jerusalem').forEach(b => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { class: 'booking-code' }, b.code),
        el('td', {}, [
          el('div', { style: 'font-weight:700' }, b.country + ' ' + b.name),
          el('div', { style: 'font-size:12px;color:var(--gray-500)' }, b.email),
        ]),
        el('td', {}, b.room),
        el('td', {}, b.in + ' › ' + b.out),
        el('td', {}, b.nights),
        el('td', {}, '₪' + b.total.toLocaleString()),
        el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
        el('td', {}, b.synced
          ? el('span', { style: 'color:var(--green-deep);font-weight:700;font-size:12px' }, '✓')
          : el('span', { style: 'color:var(--amber-500);font-weight:700;font-size:12px' }, '⏳ ממתין')),
        el('td', {}, el('div', { class: 'row-flex' }, [
          el('button', { class: 'btn-mini ghost' }, 'פרטים'),
          b.status === 'confirmed' ? el('button', { class: 'btn-mini success' }, 'צ׳ק־אין') : null,
        ])),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'calendar') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'לוח תפוסה'),
        el('div', { class: 'sub' }, 'מאי 2026 · Cinema Hostel ירושלים · הקצאה ישירה בלבד'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost' }, '→ אפריל'),
        el('button', { class: 'btn-ghost' }, 'מאי 2026'),
        el('button', { class: 'btn-ghost' }, 'יוני ←'),
      ])
    ]));

    main.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [
        el('h3', {}, 'תפוסה לפי סוג חדר · 14 הימים הבאים'),
        el('div', { class: 'tools' }, [
          el('span', { style: 'font-size:12px;color:var(--gray-500)' }, '🟩 פנוי · 🟧 מתמלא · 🟥 כמעט מלא · ◾ מלא'),
        ]),
      ]),
      (() => {
        const w = el('div', { class: 'occgrid', style: 'padding:6px 12px' });
        const t = el('table');
        const days = Array.from({ length: 14 }, (_, i) => i + 1);
        const head = el('tr', {}, [el('th', {}, 'סוג חדר')].concat(days.map(d => el('th', { style: 'text-align:center' }, d + ''))));
        t.appendChild(el('thead', {}, head));
        const tb = el('tbody');
        const rooms = HOSTELS[0].rooms;
        rooms.forEach(r => {
          const tr = el('tr', {}, [el('td', { class: 'label-cell' }, [
            el('div', { style: 'font-weight:700' }, r.title),
            el('div', { style: 'font-size:11px;color:var(--gray-500)' }, r.total + ' יחידות · ' + Math.ceil(r.total * 0.6) + ' להזמנה ישירה')
          ])]);
          days.forEach((d, di) => {
            const seed = (r.title.length + d) % 100;
            const occ = (seed % 100);
            let cls = 'lo'; let pct = '';
            if (occ < 35) { cls = 'lo'; pct = (3 + (di % 2)); }
            else if (occ < 65) { cls = 'md'; pct = '50%'; }
            else if (occ < 85) { cls = 'hi'; pct = '85%'; }
            else { cls = 'full'; pct = '✓'; }
            const text = cls === 'lo' ? (3 + (di % 3)) + ' פנ׳' : (cls === 'md' ? '50%' : (cls === 'hi' ? '85%' : 'מלא'));
            tr.appendChild(el('td', { class: 'day-cell ' + cls }, el('span', { class: 'pct' }, text)));
          });
          tb.appendChild(tr);
        });
        t.appendChild(tb);
        w.appendChild(t);
        return w;
      })()
    ]));

    main.appendChild(el('div', { style: 'margin-top:20px' }, [
      el('div', { class: 'trust-band' }, [
        el('div', { class: 'ic' }, '⚙️'),
        el('div', {}, [
          el('div', { class: 't' }, 'הקצאה ישירה: 13 / 24 יחידות'),
          el('div', { class: 'd' }, 'שאר 11 היחידות מנוהלות ב־FrontDeskMaster ומועברות ל־OTAs (Booking.com, Hostelworld, Expedia). שינוי בהקצאה דרך מסך אדמין.'),
        ])
      ])
    ]));
  }

  if (sub === 'blocks') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'חסימות חדרים'),
        el('div', { class: 'sub' }, 'חסום חדר/מיטה לתחזוקה, אירועים פרטיים או שימוש פנימי.'),
      ]),
      el('button', { class: 'btn-cta' }, '+ חסימה חדשה'),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['חדר','יחידות','התחלה','סיום','סיבה','נוצר ע״י',''].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['קפסולה זוגית', 1, '15.05', '17.05', '🔧 תחזוקה — מיזוג', 'אדיר אם־סלם'],
      ['דורם נשים 6', 2, '22.05', '23.05', '🎉 אירוע פרטי', 'אדיר אם־סלם'],
      ['חדר פרטי זוגי', 1, '01.06', '04.06', '🛏️ שימוש פנימי — הדרכה', 'נטע ש.'],
    ].forEach(r => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { style: 'font-weight:700' }, r[0]),
        el('td', {}, r[1] + ''),
        el('td', {}, r[2]),
        el('td', {}, r[3]),
        el('td', {}, r[4]),
        el('td', {}, r[5]),
        el('td', {}, el('button', { class: 'btn-mini ghost' }, 'הסר חסימה')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'manual') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'הזמנה ידנית'),
        el('div', { class: 'sub' }, 'Walk-in / טלפון / WhatsApp — ללא Stripe.'),
      ]),
    ]));
    main.appendChild(el('div', { class: 'panel', style: 'padding:24px' }, [
      el('div', { class: 'form-grid' }, [
        el('div', { class: 'field-block' }, [el('label', {}, 'שם האורח*'), el('input', { type: 'text' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'טלפון*'), el('input', { type: 'tel' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'אימייל'), el('input', { type: 'email' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'מס׳ אורחים'), el('input', { type: 'number', value: '1' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'סוג חדר'), (() => { const s = el('select'); HOSTELS[0].rooms.forEach(r => s.appendChild(el('option', {}, r.title + ' · ₪' + r.price))); return s; })()]),
        el('div', { class: 'field-block' }, [el('label', {}, 'מקור'), (() => { const s = el('select'); ['Walk-in','טלפון','WhatsApp','אחר'].forEach(x => s.appendChild(el('option', {}, x))); return s; })()]),
        el('div', { class: 'field-block' }, [el('label', {}, 'צ׳ק־אין'), el('input', { type: 'date' })]),
        el('div', { class: 'field-block' }, [el('label', {}, 'צ׳ק־אאוט'), el('input', { type: 'date' })]),
        el('div', { class: 'field-block full' }, [el('label', {}, 'הערות פנימיות'), el('textarea', { rows: '3', placeholder: 'אופן תשלום, בקשות, וכו׳' })]),
      ]),
      el('div', { style: 'margin-top:18px;display:flex;gap:10px;justify-content:flex-end' }, [
        el('button', { class: 'btn-ghost' }, 'ביטול'),
        el('button', { class: 'btn-cta' }, 'צור הזמנה'),
      ])
    ]));
  }

  shell.appendChild(main);
  wrap.appendChild(shell);
  return wrap;
}

// ============ ADMIN ============
function renderAdmin(sub) {
  const wrap = el('div');
  wrap.appendChild(renderTopNav('/admin/overview'));

  const shell = el('div', { class: 'op-shell' });

  const side = el('div', { class: 'op-side' }, [
    el('div', { class: 'label' }, 'הקבוצה'),
    el('div', { style: 'background:rgba(224,123,57,.15);padding:12px;border-radius:10px;margin-bottom:12px;border:1px solid rgba(224,123,57,.3)' }, [
      el('div', { style: 'font-weight:700;color:#fff;font-size:14px' }, '🏨 AM HOSTELS'),
      el('div', { style: 'font-size:12px;opacity:.7' }, '4 אכסניות · אדמין'),
    ]),
    el('div', { class: 'label' }, 'ניהול'),
    ...[
      ['overview','📊','מבט־על'],
      ['bookings','📋','כל ההזמנות'],
      ['properties','🏨','אכסניות'],
      ['rooms','🛏️','חדרים ומחירים'],
      ['staff','👥','צוות'],
      ['refunds','💸','החזרים'],
      ['reports','📈','דוחות'],
      ['audit','🔐','Audit Log'],
    ].map(([k,ic,label]) => el('a', { class: sub === k ? 'on' : '', onclick: () => nav('/admin/' + k) }, [el('span', { class: 'ic' }, ic), label])),
    el('div', { class: 'who' }, [
      el('b', {}, '👤 אדיר אם־סלם'),
      'מנהל קבוצה · אדמין רוחבי',
    ]),
  ]);
  shell.appendChild(side);

  const main = el('div', { class: 'op-main' });

  if (sub === 'overview') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'מבט־על · אפריל 2026'),
        el('div', { class: 'sub' }, '4 אכסניות · 28 ימים אחרונים'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost' }, '⬇ ייצוא דוח'),
        el('select', { class: 'input-sm' }, [el('option', {}, 'אפריל 2026'), el('option', {}, 'מרץ 2026'), el('option', {}, 'פברואר 2026')]),
      ])
    ]));

    main.appendChild(el('div', { class: 'kpis' }, [
      ['הכנסה החודש', '₪148,320', '+22% מחודש קודם'],
      ['הזמנות החודש', '412', '+18% מחודש קודם'],
      ['תפוסה ממוצעת', '76%', '+8 נק׳'],
      ['ביטולים', '24 (5.8%)', '−1.2 נק׳'],
    ].map(([l,n,d]) => el('div', { class: 'kpi' }, [
      el('div', { class: 'label' }, l),
      el('div', { class: 'num' }, n),
      el('div', { class: 'delta' }, d),
    ]))));

    // 4-property breakdown
    main.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [
        el('h3', {}, 'ביצועים לפי אכסנייה'),
        el('div', { class: 'tools' }, [el('span', { class: 'chip on' }, 'הכנסה'), el('span', { class: 'chip' }, 'תפוסה'), el('span', { class: 'chip' }, 'הזמנות')]),
      ]),
      (() => {
        const t = el('table');
        t.appendChild(el('thead', {}, el('tr', {}, ['אכסנייה','עיר','הכנסה','הזמנות','תפוסה','שינוי','סטטוס'].map(h => el('th', {}, h)))));
        const tb = el('tbody');
        const data = [
          { h: HOSTELS[0], rev: 52800, bk: 148, occ: 84 },
          { h: HOSTELS[1], rev: 41200, bk: 122, occ: 79 },
          { h: HOSTELS[2], rev: 32600, bk: 88,  occ: 71 },
          { h: HOSTELS[3], rev: 21720, bk: 54,  occ: 58 },
        ];
        data.forEach(d => {
          tb.appendChild(el('tr', { class: 'row-hover' }, [
            el('td', { style: 'font-weight:700' }, [d.h.glyph + ' ', d.h.name_he]),
            el('td', {}, d.h.city),
            el('td', { style: 'font-weight:700' }, '₪' + d.rev.toLocaleString()),
            el('td', {}, d.bk + ''),
            el('td', {}, [
              el('div', { style: 'display:flex;align-items:center;gap:8px' }, [
                el('div', { style: 'flex:1;height:6px;background:var(--bg-soft);border-radius:999px;overflow:hidden;min-width:80px' }, [
                  el('div', { style: 'height:100%;width:' + d.occ + '%;background:' + (d.occ > 80 ? 'var(--green-deep)' : (d.occ > 65 ? 'var(--orange)' : 'var(--amber-500)')) }, ''),
                ]),
                el('span', { style: 'font-weight:700;font-size:13px' }, d.occ + '%'),
              ])
            ]),
            el('td', {}, el('span', { style: 'color:var(--green-deep);font-weight:700;font-size:13px' }, '↑ +' + (12 + d.occ % 9) + '%')),
            el('td', {}, el('span', { class: 'status-pill st-confirmed' }, [el('span', { class: 'dot' }), 'פעיל'])),
          ]));
        });
        t.appendChild(tb);
        return t;
      })()
    ]));

    // Recent + alerts
    const two = el('div', { class: 'op-2col', style: 'margin-top:20px' });
    two.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, '📋 הזמנות אחרונות')]),
      (() => {
        const t = el('table');
        t.appendChild(el('thead', {}, el('tr', {}, ['קוד','אכסנייה','אורח','סכום','סטטוס'].map(h => el('th', {}, h)))));
        const tb = el('tbody');
        BOOKINGS.slice(0, 5).forEach(b => {
          const h = findHostel(b.hostel);
          tb.appendChild(el('tr', { class: 'row-hover' }, [
            el('td', { class: 'booking-code' }, b.code),
            el('td', {}, h.glyph + ' ' + h.city),
            el('td', {}, b.country + ' ' + b.name),
            el('td', {}, '₪' + b.total.toLocaleString()),
            el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
          ]));
        });
        t.appendChild(tb);
        return t;
      })()
    ]));

    two.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, '🔔 התראות')]),
      el('div', { class: 'feed' }, [
        ['orange','⚠','3 הזמנות לא סונכרנו ל־FDM','Cinema Hostel · ראה ב־calendar'],
        ['red','🚨','חסימה פגה היום','Jungle Jaffa · דורם 8 · בדוק תחזוקה'],
        ['','💸','בקשת החזר','AMH-8N9M0L · ₪360 · ממתין לאישור'],
        ['green','✓','פיילוט Stripe Test פעיל','כל ההזמנות במצב test · אין חיוב אמיתי'],
      ].map(([cls,ic,t,m]) => el('div', { class: 'item ' + cls }, [
        el('div', { class: 'ic' }, ic),
        el('div', { class: 'body' }, [el('div', { class: 't' }, t), el('div', { class: 'm' }, m)])
      ])))
    ]));
    main.appendChild(two);
  }

  if (sub === 'bookings') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'כל ההזמנות'),
        el('div', { class: 'sub' }, '4 אכסניות · ' + BOOKINGS.length + ' תוצאות'),
      ]),
      el('div', { class: 'row-flex' }, [
        el('button', { class: 'btn-ghost' }, '⬇ ייצוא CSV'),
      ])
    ]));

    main.appendChild(el('div', { class: 'row-flex', style: 'margin-bottom:16px' }, [
      el('input', { class: 'input-sm', placeholder: '🔍 חיפוש שם / קוד / מייל', style: 'min-width:280px' }),
      el('select', { class: 'input-sm' }, ['כל האכסניות', ...HOSTELS.map(h => h.name_he)].map(x => el('option', {}, x))),
      el('span', { class: 'chip on' }, 'הכל'),
      el('span', { class: 'chip' }, 'מאושר'),
      el('span', { class: 'chip' }, 'נכנס'),
      el('span', { class: 'chip' }, 'בוטל'),
    ]));

    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','אכסנייה','אורח','חדר','תאריכים','לילות','סכום','סטטוס','תשלום'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    BOOKINGS.forEach(b => {
      const h = findHostel(b.hostel);
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { class: 'booking-code' }, b.code),
        el('td', {}, h.glyph + ' ' + h.city),
        el('td', {}, [
          el('div', { style: 'font-weight:700' }, b.country + ' ' + b.name),
          el('div', { style: 'font-size:12px;color:var(--gray-500)' }, b.email),
        ]),
        el('td', { style: 'font-size:13px' }, b.room),
        el('td', {}, b.in + ' › ' + b.out),
        el('td', {}, b.nights + ''),
        el('td', { style: 'font-weight:700' }, '₪' + b.total.toLocaleString()),
        el('td', {}, el('span', { class: 'status-pill st-' + b.status }, [el('span', { class: 'dot' }), STATUSES_HE[b.status]])),
        el('td', {}, b.paid ? el('span', { style: 'color:var(--green-deep);font-weight:700;font-size:12px' }, '✓ שולם') : el('span', { style: 'color:var(--amber-500);font-weight:700;font-size:12px' }, '⏳ ממתין')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'properties') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'אכסניות'),
        el('div', { class: 'sub' }, 'עריכת פרטים, גלריות, גילאים, פרטי קשר'),
      ]),
      el('button', { class: 'btn-cta' }, '+ אכסנייה חדשה'),
    ]));

    const grid = el('div', { style: 'display:grid;grid-template-columns:repeat(2,1fr);gap:18px' });
    HOSTELS.forEach(h => {
      grid.appendChild(el('div', { class: 'panel', style: 'padding:0' }, [
        el('div', { style: 'padding:20px;border-bottom:1px solid var(--border-default);display:flex;justify-content:space-between;align-items:flex-start' }, [
          el('div', {}, [
            el('div', { style: 'font-size:30px' }, h.glyph),
            el('div', { style: 'font-weight:800;font-size:18px;margin-top:4px' }, h.name_he),
            el('div', { style: 'font-size:13px;color:var(--gray-600);margin-top:2px' }, '📍 ' + h.address),
          ]),
          el('span', { class: 'status-pill st-confirmed' }, [el('span', { class: 'dot' }), 'פעיל']),
        ]),
        el('div', { style: 'padding:16px 20px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;font-size:13px' }, [
          el('div', {}, [el('div', { style: 'color:var(--gray-500);font-weight:600' }, 'מיטות'), el('div', { style: 'font-size:18px;font-weight:800' }, h.capacity)]),
          el('div', {}, [el('div', { style: 'color:var(--gray-500);font-weight:600' }, 'חדרים'), el('div', { style: 'font-size:18px;font-weight:800' }, h.rooms_total)]),
          el('div', {}, [el('div', { style: 'color:var(--gray-500);font-weight:600' }, 'הקצאה ישירה'), el('div', { style: 'font-size:18px;font-weight:800;color:var(--orange-hover)' }, h.direct_alloc + ' / ' + h.rooms_total)]),
        ]),
        el('div', { style: 'padding:14px 20px;border-top:1px solid var(--border-default);display:flex;gap:8px;justify-content:flex-end' }, [
          el('button', { class: 'btn-mini ghost' }, '✏ ערוך פרטים'),
          el('button', { class: 'btn-mini ghost' }, '🛏 חדרים'),
          el('button', { class: 'btn-mini' }, 'נהל →'),
        ])
      ]));
    });
    main.appendChild(grid);
  }

  if (sub === 'rooms') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'חדרים ומחירים'),
        el('div', { class: 'sub' }, 'הקצאה ישירה — שינוי משפיע על זמינות באתר'),
      ]),
    ]));
    main.appendChild(el('div', { class: 'tabs' }, HOSTELS.map((h, i) => el('a', { class: i===0?'on':'' }, h.glyph + ' ' + h.name_he))));

    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','שם','קטגוריה','סה״כ יחידות','הקצאה ישירה','OTAs','מחיר','פעולות'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    HOSTELS[0].rooms.forEach(r => {
      const direct = Math.ceil(r.total * 0.6);
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { style: 'font-family: monospace; font-size:12px;color:var(--gray-600)' }, r.code),
        el('td', { style: 'font-weight:700' }, r.title),
        el('td', {}, el('span', { class: 'status-pill', style: 'background:var(--bg-soft);color:var(--gray-700)' }, r.cat)),
        el('td', {}, r.total + ''),
        el('td', {}, el('div', { style: 'display:flex;align-items:center;gap:8px' }, [
          el('input', { type: 'number', class: 'input-sm', value: direct + '', style: 'width:60px' }),
          el('span', { style: 'font-size:12px;color:var(--gray-500)' }, '/ ' + r.total),
        ])),
        el('td', {}, el('span', { style: 'color:var(--gray-600)' }, (r.total - direct) + ' (FDM)')),
        el('td', {}, [
          el('span', { style: 'font-weight:700' }, '₪' + r.price),
          el('span', { style: 'font-size:11px;color:var(--gray-500)' }, ' / ' + r.per),
        ]),
        el('td', {}, el('button', { class: 'btn-mini ghost' }, '✏ ערוך')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'staff') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'צוות'),
        el('div', { class: 'sub' }, 'אופרטורים ואדמינים — הקצאה לפי אכסנייה'),
      ]),
      el('button', { class: 'btn-cta' }, '+ הוסף איש צוות'),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['שם','אימייל','תפקיד','אכסנייה','כניסה אחרונה','סטטוס',''].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['אדיר אם־סלם', 'adir@amhostels.co.il', 'admin', 'כל האכסניות', 'לפני 12 דק׳', true],
      ['נטע שלום', 'neta@amhostels.co.il', 'operator', '🕌 Cinema ירושלים', 'לפני שעה', true],
      ['Daniel Roth', 'daniel@amhostels.co.il', 'operator', '🌊 Jungle Jaffa', 'אתמול 23:14', true],
      ['Maya Klein', 'maya@amhostels.co.il', 'operator', '⚓ Haifa', 'לפני 3 ימים', true],
      ['Yossi Mor', 'yossi@amhostels.co.il', 'operator', '🏞️ Tiberias', 'לפני שבוע', false],
    ].forEach(r => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { style: 'font-weight:700' }, '👤 ' + r[0]),
        el('td', {}, r[1]),
        el('td', {}, el('span', { class: 'status-pill', style: r[2] === 'admin' ? 'background:rgba(224,123,57,.15);color:var(--orange-hover)' : 'background:var(--blue-light);color:var(--blue-deep)' }, r[2])),
        el('td', {}, r[3]),
        el('td', { style: 'font-size:13px;color:var(--gray-600)' }, r[4]),
        el('td', {}, r[5] ? el('span', { class: 'status-pill st-confirmed' }, [el('span', { class: 'dot' }), 'פעיל']) : el('span', { class: 'status-pill st-cancelled' }, [el('span', { class: 'dot' }), 'מושעה'])),
        el('td', {}, el('div', { class: 'row-flex' }, [el('button', { class: 'btn-mini ghost' }, '🔑 איפוס'), el('button', { class: 'btn-mini ghost' }, '✏')])),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'refunds') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'בקשות החזר'),
        el('div', { class: 'sub' }, 'אישור ידני — Stripe refund נשלח לאחר אישור'),
      ]),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['קוד','אורח','אכסנייה','סכום מקור','סכום החזר','סיבה','בקשה','סטטוס','פעולות'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['AMH-8N9M0L','Yuki Tanaka','🕌 Cinema',360,360,'ביטול עד 48ש׳','לפני 3 ימים','ממתין לאישור', true],
      ['AMH-2L9P4Q','משה כהן',    '🌊 Jungle', 480,240,'ביטול תוך 48ש׳ — לילה ראשון','אתמול','אושר', false],
      ['AMH-6T8U2W','Lisa Brown',  '⚓ Haifa',  1280,1280,'תקלה באכסנייה','לפני שבוע','שולם', false],
    ].forEach(r => {
      tb.appendChild(el('tr', { class: 'row-hover' }, [
        el('td', { class: 'booking-code' }, r[0]),
        el('td', { style: 'font-weight:700' }, r[1]),
        el('td', {}, r[2]),
        el('td', {}, '₪' + r[3]),
        el('td', { style: 'font-weight:700; color: var(--orange-hover)' }, '₪' + r[4]),
        el('td', { style: 'font-size:13px' }, r[5]),
        el('td', { style: 'font-size:13px;color:var(--gray-600)' }, r[6]),
        el('td', {}, el('span', { class: 'status-pill ' + (r[7] === 'אושר' || r[7] === 'שולם' ? 'st-confirmed' : 'st-pending') }, [el('span', { class: 'dot' }), r[7]])),
        el('td', {}, r[8] ? el('div', { class: 'row-flex' }, [el('button', { class: 'btn-mini success' }, '✓ אשר'), el('button', { class: 'btn-mini ghost' }, '✕')]) : el('span', { style: 'font-size:12px;color:var(--gray-500)' }, '—')),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  if (sub === 'reports') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'דוחות חודשיים'),
        el('div', { class: 'sub' }, 'הכנסות, תפוסה, ביטולים — לחשבונאות'),
      ]),
      el('button', { class: 'btn-cta' }, '⬇ ייצוא PDF'),
    ]));
    main.appendChild(el('div', { class: 'kpis' }, [
      ['סה״כ הכנסה','₪148,320','אפריל 2026'],
      ['חיוב מע״מ 17%','₪25,214','בנפרד'],
      ['עמלות Stripe','₪3,708','2.5%'],
      ['ביטולים והחזרים','₪7,440','5.0%'],
    ].map(([l,n,d]) => el('div', { class: 'kpi' }, [
      el('div', { class: 'label' }, l),
      el('div', { class: 'num' }, n),
      el('div', { class: 'delta neutral' }, d),
    ]))));

    main.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'panel-head' }, [el('h3', {}, 'הכנסה לפי אכסנייה — אפריל 2026')]),
      el('div', { style: 'padding:24px' }, (() => {
        const data = [['🕌 Cinema ירושלים', 52800, 'var(--blue-deep)'], ['🌊 Jungle Jaffa', 41200, 'var(--green-deep)'], ['⚓ Haifa', 32600, 'var(--orange)'], ['🏞️ Tiberias', 21720, 'var(--blue-light)']];
        const max = Math.max(...data.map(d => d[1]));
        const wrap = el('div', { style: 'display:flex;flex-direction:column;gap:14px' });
        data.forEach(([label, val, color]) => {
          wrap.appendChild(el('div', {}, [
            el('div', { style: 'display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-bottom:6px' }, [el('span', {}, label), el('span', {}, '₪' + val.toLocaleString())]),
            el('div', { style: 'height:14px;background:var(--bg-soft);border-radius:999px;overflow:hidden' }, [
              el('div', { style: 'height:100%;width:' + (val/max*100) + '%;background:' + color + ';border-radius:999px;transition:width 600ms ease' }, ''),
            ]),
          ]));
        });
        return wrap;
      })())
    ]));
  }

  if (sub === 'audit') {
    main.appendChild(el('div', { class: 'op-head' }, [
      el('div', {}, [
        el('h1', {}, 'Audit Log'),
        el('div', { class: 'sub' }, 'תיעוד פעולות רגישות — refunds, שינויי מחיר, מחיקות'),
      ]),
    ]));
    const panel = el('div', { class: 'panel' });
    const t = el('table');
    t.appendChild(el('thead', {}, el('tr', {}, ['זמן','משתמש','פעולה','משאב','שינוי','IP'].map(h => el('th', {}, h)))));
    const tb = el('tbody');
    [
      ['29.04 14:32', 'אדיר אם־סלם', 'admin', 'price.update', 'דורם 6 · ₪115 → ₪120', '82.81.x.x'],
      ['29.04 11:18', 'אדיר אם־סלם', 'admin', 'booking.refund', 'AMH-8N9M0L · ₪360', '82.81.x.x'],
      ['29.04 09:42', 'נטע שלום',    'operator', 'booking.cancel', 'AMH-8N9M0L · בקשת אורח', '212.x.x.x'],
      ['28.04 22:15', 'אדיר אם־סלם', 'admin', 'staff.create', 'Yossi Mor · operator · Tiberias', '82.81.x.x'],
      ['28.04 18:04', 'אדיר אם־סלם', 'admin', 'allocation.update', 'Cinema · דורם 6 · 2 → 3', '82.81.x.x'],
      ['28.04 14:50', 'אדיר אם־סלם', 'admin', 'login', 'אדמין · session start', '82.81.x.x'],
    ].forEach(r => {
      tb.appendChild(el('tr', {}, [
        el('td', { style: 'font-family:monospace;font-size:12px;color:var(--gray-600)' }, r[0]),
        el('td', { style: 'font-weight:700' }, '👤 ' + r[1]),
        el('td', {}, el('span', { class: 'status-pill', style: r[2] === 'admin' ? 'background:rgba(224,123,57,.15);color:var(--orange-hover)' : 'background:var(--blue-light);color:var(--blue-deep)' }, r[2])),
        el('td', { style: 'font-family:monospace;font-size:12px' }, r[3]),
        el('td', { style: 'font-size:13px' }, r[4]),
        el('td', { style: 'font-family:monospace;font-size:12px;color:var(--gray-500)' }, r[5]),
      ]));
    });
    t.appendChild(tb);
    panel.appendChild(t);
    main.appendChild(panel);
  }

  shell.appendChild(main);
  wrap.appendChild(shell);
  return wrap;
}

// initial
render();
</script>

</body>
</html>
===== END FILE =====
