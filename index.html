<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Controle de Materiais de Empréstimo - Plano & Plano</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <style>
    /* ── Reset & Base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --blue-dark:  #1F3864;
      --blue-mid:   #2E75B6;
      --blue-light: #DDEEFF;
      --accent:     #E84545;
      --success:    #27AE60;
      --warning:    #F5A623;
      --bg:         #F0F4FA;
      --card:       #FFFFFF;
      --text:       #1a2340;
      --muted:      #6b7a99;
      --radius:     14px;
      --shadow:     0 4px 24px rgba(31,56,100,.10);
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    /* ── LOGIN SCREEN ── */
    #login-screen {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-mid) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
    }
    #login-screen.hidden {
      display: none;
    }
    .login-container {
      background: var(--card);
      border-radius: var(--radius);
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 3rem 2rem;
      width: 100%;
      max-width: 420px;
      text-align: center;
    }
    .login-logo {
      margin-bottom: 2rem;
    }
    .login-logo img {
      height: 80px;
      width: auto;
      object-fit: contain;
      display:block;
      margin:0 auto;
    }
    .login-container h1 {
      font-size: 1.8rem;
      color: var(--blue-dark);
      margin-bottom: 0.5rem;
      font-weight: 800;
    }
    .login-container p {
      color: var(--muted);
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .login-form .form-group {
      text-align: left;
    }
    .login-form label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--blue-dark);
      font-size: 0.9rem;
    }
    .login-form input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #c8d6ea;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: all 0.2s;
    }
    .login-form input:focus {
      border-color: var(--blue-mid);
      box-shadow: 0 0 0 4px rgba(46,117,182,0.1);
    }
    .login-form button {
      padding: 0.85rem 1.5rem;
      background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-mid) 100%);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
    }
    .login-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(31,56,100,0.3);
    }
    .login-form button:active {
      transform: translateY(0);
    }
    .login-error {
      color: var(--accent);
      font-size: 0.85rem;
      margin-top: 1rem;
      display: none;
    }
    .login-error.show {
      display: block;
    }

    /* ── Header ── */
    header {
      background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-mid) 100%);
      color: #fff;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    header::before {
      content: '';
      position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .header-content {
      display:flex;
      align-items:center;
      gap:1.5rem;
      position:relative;
      z-index:1;
      flex:1;
    }
    .logo-container { flex-shrink:0; }
    .logo-container img { height:60px; width:auto; object-fit:contain; display:block; }
    .header-text h1 { font-size: 1.8rem; font-weight: 700; letter-spacing: .5px; margin: 0; }
    .header-text p  { margin: 0.25rem 0 0 0; opacity: .85; font-size: 0.95rem; }

    /* ── Nav pills ── */
    nav {
      display: flex; justify-content: center; gap: .75rem;
      padding: 1.25rem 1rem;
      background: var(--card);
      box-shadow: 0 2px 8px rgba(31,56,100,.08);
      flex-wrap: wrap;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    nav button {
      background: var(--blue-light);
      color: var(--blue-dark);
      border: none; border-radius: 50px;
      padding: .5rem 1.4rem;
      font-size: .92rem; font-weight: 600;
      cursor: pointer; transition: all .2s;
    }
    nav button:hover, nav button.active {
      background: var(--blue-mid);
      color: #fff;
      box-shadow: 0 4px 12px rgba(46,117,182,.35);
    }


    /* ── 3D PRÉDIO ── */
    .predio3d-toolbar { display:flex; flex-wrap:wrap; gap:.75rem; align-items:center; margin-bottom:1rem; }
    .predio3d-layout { display:grid; grid-template-columns:minmax(360px,1fr) 360px; gap:1.25rem; align-items:start; }
    .predio3d-stage { min-height:680px; background:linear-gradient(180deg,#edf3fb 0%,#f8fbff 54%,#f4f8fd 100%); border-radius:22px; overflow:hidden; position:relative; box-shadow:var(--shadow); border:1px solid #dbe7f7; }
    .predio3d-help { position:absolute; top:12px; left:12px; z-index:3; background:rgba(255,255,255,.94); border-radius:999px; padding:.48rem .85rem; font-size:.82rem; color:var(--muted); box-shadow:0 4px 14px rgba(31,56,100,.08); }
    .predio3d-viewport { perspective:1500px; perspective-origin:50% 42%; width:100%; min-height:680px; display:flex; align-items:center; justify-content:center; touch-action:none; cursor:grab; user-select:none; padding:2rem 1rem 2.25rem; }
    .predio3d-viewport.dragging { cursor:grabbing; }
    .predio3d-scene { position:relative; width:100%; min-height:620px; transform-style:preserve-3d; display:flex; align-items:flex-end; justify-content:center; }
    .predio3d-building { position:relative; width:100%; max-width:860px; height:620px; transform-style:preserve-3d; transition:transform .08s linear; transform-origin:center bottom; }
    .predio3d-podium { position:absolute; left:50%; bottom:44px; width:520px; height:26px; transform:translateX(-50%) translateZ(0); transform-style:preserve-3d; }
    .predio3d-podium .face { position:absolute; box-sizing:border-box; border:1px solid rgba(50,66,92,.08); }
    .predio3d-podium .top { inset:0; background:linear-gradient(180deg,#f7f9fc 0%,#e5edf7 100%); border-radius:10px; transform:translateZ(10px); box-shadow:0 18px 26px rgba(31,56,100,.1); }
    .predio3d-podium .front { left:0; bottom:-10px; width:520px; height:10px; background:#d7e1ef; transform:rotateX(-90deg); transform-origin:top; }
    .predio3d-podium .back { left:0; top:-10px; width:520px; height:10px; background:#c7d5e8; transform:rotateX(90deg); transform-origin:bottom; }
    .predio3d-podium .left { left:-10px; top:0; width:10px; height:26px; background:#ced8e7; transform:rotateY(-90deg); transform-origin:right; }
    .predio3d-podium .right { right:-10px; top:0; width:10px; height:26px; background:#c2cede; transform:rotateY(90deg); transform-origin:left; }
    .predio3d-ground { position:absolute; left:50%; bottom:10px; width:620px; height:42px; transform:translateX(-50%); border-radius:999px; background:radial-gradient(circle at center, rgba(161,184,213,.42) 0%, rgba(161,184,213,.18) 48%, rgba(161,184,213,0) 78%); filter:blur(2px); }
    .predio3d-tower { position:absolute; bottom:70px; width:188px; transform-style:preserve-3d; }
    .predio3d-tower.tower-a { left:calc(50% - 205px); }
    .predio3d-tower.tower-b { left:calc(50% + 17px); }
    .predio3d-single .predio3d-tower { left:50% !important; transform:translateX(-50%); }
    .predio3d-floor { position:absolute; left:0; width:188px; height:28px; transform-style:preserve-3d; }
    .predio3d-floor .face { position:absolute; box-sizing:border-box; border:1px solid rgba(27,39,65,.08); overflow:hidden; }
    .predio3d-floor .front, .predio3d-floor .back { width:188px; height:28px; display:flex; align-items:center; justify-content:space-between; padding:0 .72rem; font-weight:700; font-size:.8rem; }
    .predio3d-floor .front { transform:translateZ(26px); border-radius:7px; box-shadow:0 9px 16px rgba(31,56,100,.12); cursor:pointer; }
    .predio3d-floor .back { transform:rotateY(180deg) translateZ(26px); border-radius:7px; }
    .predio3d-floor .left, .predio3d-floor .right { width:52px; height:28px; }
    .predio3d-floor .left { left:-26px; transform:rotateY(-90deg); transform-origin:right center; }
    .predio3d-floor .right { right:-26px; transform:rotateY(90deg); transform-origin:left center; }
    .predio3d-floor .top { width:188px; height:52px; top:-26px; transform:rotateX(90deg); transform-origin:bottom center; }
    .predio3d-floor .bottom { width:188px; height:52px; bottom:-26px; transform:rotateX(-90deg); transform-origin:top center; }
    .predio3d-floor .label-back { opacity:.35; }
    .predio3d-floor.active .front { outline:3px solid rgba(255,255,255,.95); box-shadow:0 0 0 4px rgba(31,56,100,.16), 0 12px 24px rgba(31,56,100,.18); }
    .predio3d-windows { position:absolute; inset:4px 14px; background-size:28px 14px; opacity:.9; pointer-events:none; }
    .predio3d-front-windows { background-image:linear-gradient(90deg, transparent 0 6px, rgba(66,196,255,.95) 6px 16px, transparent 16px 28px), linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,.16) 3px 5px, transparent 5px 14px); }
    .predio3d-side-windows { inset:4px 6px; background-size:18px 14px; background-image:linear-gradient(90deg, transparent 0 3px, rgba(66,196,255,.9) 3px 10px, transparent 10px 18px), linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,.14) 3px 5px, transparent 5px 14px); }
    .predio3d-verde .front, .predio3d-verde .back, .predio3d-dot.verde { background:linear-gradient(180deg,#35bf73 0%,#23985a 100%); color:#fff; }
    .predio3d-verde .top { background:#45c67e; }
    .predio3d-verde .left, .predio3d-verde .right { background:#229556; }
    .predio3d-verde .bottom { background:#1f7f4a; }
    .predio3d-amarelo .front, .predio3d-amarelo .back, .predio3d-dot.amarelo { background:linear-gradient(180deg,#f6b23a 0%,#e6941a 100%); color:#1a2340; }
    .predio3d-amarelo .top { background:#ffc65c; }
    .predio3d-amarelo .left, .predio3d-amarelo .right { background:#d48716; }
    .predio3d-amarelo .bottom { background:#c47710; }
    .predio3d-vermelho .front, .predio3d-vermelho .back, .predio3d-dot.vermelho { background:linear-gradient(180deg,#f06060 0%,#d43f3f 100%); color:#fff; }
    .predio3d-vermelho .top { background:#f37676; }
    .predio3d-vermelho .left, .predio3d-vermelho .right { background:#c43939; }
    .predio3d-vermelho .bottom { background:#aa2f2f; }
    .predio3d-cinza .front, .predio3d-cinza .back, .predio3d-dot.cinza { background:linear-gradient(180deg,#b0bcc2 0%,#8a9ba0 100%); color:#fff; }
    .predio3d-cinza .top { background:#bcc7cc; }
    .predio3d-cinza .left, .predio3d-cinza .right { background:#7f9096; }
    .predio3d-cinza .bottom { background:#738388; }
    .predio3d-floorlabel { display:flex; align-items:center; justify-content:space-between; gap:.5rem; width:100%; position:relative; z-index:2; }
    .predio3d-legend { display:flex; flex-wrap:wrap; gap:.8rem; margin:.35rem 0 1rem; }
    .predio3d-legend-item { display:flex; align-items:center; gap:.4rem; font-size:.85rem; color:var(--muted); }
    .predio3d-dot { width:12px; height:12px; border-radius:999px; }
    .predio3d-panel .metric { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; margin-bottom:1rem; }
    .predio3d-panel .metric-card { background:#f7fbff; border:1px solid #dbe7f7; border-radius:14px; padding:.85rem; }
    .predio3d-panel .metric-card .num { font-size:1.35rem; font-weight:800; color:var(--blue-dark); }
    .predio3d-floor-list { max-height:300px; overflow:auto; border:1px solid #e3edf9; border-radius:14px; }
    .predio3d-floor-group-title { padding:.6rem 1rem; background:#f4f8ff; color:var(--blue-dark); font-weight:800; font-size:.82rem; border-bottom:1px solid #eef3fb; position:sticky; top:0; z-index:1; }
    .predio3d-floor-item { display:flex; align-items:center; justify-content:space-between; gap:.75rem; padding:.8rem 1rem; border-bottom:1px solid #eef3fb; cursor:pointer; }
    .predio3d-floor-item:last-child { border-bottom:none; }
    .predio3d-floor-item.active { background:#eef5ff; }
    .predio3d-badge { display:inline-flex; align-items:center; gap:.35rem; padding:.25rem .55rem; border-radius:999px; font-size:.78rem; font-weight:700; background:#eef3fb; color:var(--blue-dark); }
    .predio3d-details-list { display:grid; gap:.6rem; max-height:300px; overflow:auto; }
    .predio3d-details-item { background:#f8fbff; border:1px solid #e3edf9; border-radius:12px; padding:.75rem; }
    .predio3d-empty { padding:2rem; text-align:center; color:var(--muted); }
    @media (max-width:980px) { .predio3d-layout { grid-template-columns:1fr; } .predio3d-stage, .predio3d-viewport { min-height:560px; } .predio3d-building { max-width:100%; } .predio3d-podium { width:360px; } .predio3d-podium .front, .predio3d-podium .back { width:360px; } .predio3d-ground { width:430px; } .predio3d-tower { width:150px; } .predio3d-floor, .predio3d-floor .front, .predio3d-floor .back, .predio3d-floor .top, .predio3d-floor .bottom { width:150px; } .predio3d-floor .left, .predio3d-floor .right { width:42px; } .predio3d-tower.tower-a { left:calc(50% - 165px); } .predio3d-tower.tower-b { left:calc(50% + 15px); } }

    /* ── Main layout ── */
    main { max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

    /* ── KPI Cards ── */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }
    .kpi {
      background: var(--card);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1.5rem 1.25rem;
      display: flex; flex-direction: column; align-items: center;
      border-top: 4px solid var(--blue-mid);
      transition: transform .2s;
    }
    .kpi:hover { transform: translateY(-4px); }
    .kpi .icon { font-size: 2rem; margin-bottom: .5rem; }
    .kpi .value { font-size: 2.2rem; font-weight: 800; color: var(--blue-dark); }
    .kpi .label { font-size: .82rem; color: var(--muted); text-align: center; margin-top: .25rem; text-transform: uppercase; letter-spacing: .5px; }

    /* ── Section ── */
    section { display: none; }
    section.active { display: block; }

    /* ── Cards ── */
    .card {
      background: var(--card);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1.75rem;
      margin-bottom: 2rem;
    }
    .card h2 {
      font-size: 1.15rem; font-weight: 700;
      color: var(--blue-dark);
      margin-bottom: 1.25rem;
      padding-bottom: .6rem;
      border-bottom: 2px solid var(--blue-light);
      display: flex; align-items: center; gap: .5rem;
    }

    /* ── Chart grid ── */
    .chart-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .chart-wrap { position: relative; height: 300px; }

    /* ── Buttons ── */
    .btn-group {
      display: flex; gap: .75rem; flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }
    button.btn {
      padding: .6rem 1.2rem;
      border: none;
      border-radius: 8px;
      font-size: .92rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
      display: flex; align-items: center; gap: .4rem;
    }
    button.btn-primary { background: var(--blue-mid); color: #fff; }
    button.btn-primary:hover { background: var(--blue-dark); box-shadow: 0 4px 12px rgba(31,56,100,.3); }
    button.btn-success { background: var(--success); color: #fff; }
    button.btn-success:hover { background: #1e8449; }
    button.btn-danger { background: var(--accent); color: #fff; }
    button.btn-danger:hover { background: #c73535; }
    button.btn-secondary { background: #95a5a6; color: #fff; }
    button.btn-secondary:hover { background: #7f8c8d; }
    button.btn-warning { background: var(--warning); color: #fff; }
    button.btn-warning:hover { background: #e0941f; }
    .status-inline-select {
      width: 100%;
      min-width: 170px;
      padding: .55rem .75rem;
      border: 1.5px solid #c8d6ea;
      border-radius: 10px;
      background: #fff;
      color: var(--text);
      font-weight: 600;
      font-size: .9rem;
      outline: none;
    }
    .status-inline-select:focus {
      border-color: var(--blue-mid);
      box-shadow: 0 0 0 3px rgba(46,117,182,.12);
    }
    #planejamento-rt .card, #rt-dia-dia .card {
      border: 1px solid #e6edf7;
    }
    #planejamento-rt .table-wrap table tbody tr:hover,
    #rt-dia-dia .table-wrap table tbody tr:hover {
      background: #f7fbff;
    }

    /* ── Modal ── */
    .modal {
      display: none;
      position: fixed; inset: 0;
      background: rgba(0,0,0,.5);
      z-index: 1000;
      align-items: center; justify-content: center;
      overflow-y: auto;
    }
    .modal.active { display: flex; }
    .modal-content {
      background: var(--card);
      border-radius: var(--radius);
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0,0,0,.3);
      margin: auto;
    }
    .modal-content h3 { font-size: 1.3rem; color: var(--blue-dark); margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-weight: 600; margin-bottom: .4rem; color: var(--blue-dark); font-size: .9rem; }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      padding: .6rem .8rem;
      border: 1.5px solid #c8d6ea;
      border-radius: 8px;
      font-size: .92rem;
      outline: none;
      transition: border-color .2s;
      font-family: inherit;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--blue-mid); box-shadow: 0 0 0 3px rgba(46,117,182,.1); }
    .modal-buttons { display: flex; gap: .75rem; justify-content: flex-end; margin-top: 1.75rem; }

    /* ── Table ── */
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: .93rem; }
    thead tr { background: var(--blue-dark); color: #fff; }
    thead th { padding: .85rem 1rem; text-align: left; font-weight: 600; white-space: nowrap; }
    tbody tr { border-bottom: 1px solid #e8edf5; transition: background .15s; }
    tbody tr:hover { background: var(--blue-light); }
    tbody td { padding: .75rem 1rem; }
    .badge { display: inline-block; padding: .3rem .75rem; border-radius: 50px; font-size: .78rem; font-weight: 700; cursor: pointer; transition: all .2s; }
    .badge-aberto { background: #ffeaea; color: var(--accent); }
    .badge-aberto:hover { background: #ffcccc; }
    .badge-parcial { background: #fff3cd; color: #856404; }
    .badge-parcial:hover { background: #ffe69c; }
    .badge-concluido { background: #d4edda; color: #155724; }
    .badge-concluido:hover { background: #c3e6cb; }
    .action-btns { display: flex; gap: .5rem; }
    .action-btns button {
      padding: .35rem .6rem;
      font-size: .8rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all .2s;
    }
    .action-btns .edit-btn { background: #3498db; color: #fff; }
    .action-btns .edit-btn:hover { background: #2980b9; }
    .action-btns .delete-btn { background: var(--accent); color: #fff; }
    .action-btns .delete-btn:hover { background: #c73535; }

    /* ── Search / Filter ── */
    .filter-bar { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
    .filter-bar input, .filter-bar select {
      padding: .55rem 1rem;
      border: 1.5px solid #c8d6ea;
      border-radius: 8px;
      font-size: .92rem;
      outline: none;
      transition: border-color .2s;
      flex: 1; min-width: 160px;
    }
    .filter-bar input:focus, .filter-bar select:focus { border-color: var(--blue-mid); }

    /* ── Progress bars ── */
    .progress-list { display: flex; flex-direction: column; gap: 1rem; }
    .progress-item label {
      display: flex; justify-content: space-between;
      font-size: .9rem; font-weight: 600; margin-bottom: .3rem;
      color: var(--blue-dark);
    }
    .progress-track { background: var(--blue-light); border-radius: 50px; height: 14px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 50px; background: linear-gradient(90deg, var(--blue-mid), #5ba4e0); transition: width 1s ease; }

    /* ── Alert ── */
    .alert { padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1rem; display: none; }
    .alert.show { display: block; }
    .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .alert-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

    /* ── PDF Report ── */
    .pdf-report { background: #fff; padding: 2rem; border-radius: var(--radius); margin-top: 2rem; }
    .pdf-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 3px solid var(--blue-mid); }
    .pdf-header img { height: 50px; width: auto; }
    .pdf-header-text { flex: 1; margin-left: 1rem; }
    .pdf-header-text h2 { margin: 0; color: var(--blue-dark); font-size: 1.5rem; }
    .pdf-header-text p { margin: 0.25rem 0 0 0; color: var(--muted); font-size: 0.9rem; }
    .pdf-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .pdf-stat-box { background: var(--blue-light); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--blue-mid); text-align: center; }
    .pdf-stat-box .value { font-size: 2.5rem; font-weight: 800; color: var(--blue-dark); display: block; margin-bottom: 0.5rem; }
    .pdf-stat-box .label { font-size: 0.9rem; color: var(--muted); font-weight: 600; }
    .pdf-section { margin-bottom: 2rem; }
    .pdf-section h3 { color: var(--blue-dark); font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--blue-light); }

    /* ── Materiais Grid ── */
    .materiais-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .material-card {
      background: var(--card);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .material-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(31,56,100,.15);
    }
    .material-card-image {
      width: 100%;
      height: 200px;
      background: var(--blue-light);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      overflow: hidden;
    }
    .material-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .material-card-content {
      padding: 1.25rem;
    }
    .material-card-content h3 {
      font-size: 1.1rem;
      color: var(--blue-dark);
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .material-card-content p {
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 0.75rem;
    }
    .material-qty {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--blue-light);
    }
    .material-qty-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--blue-mid);
    }
    .material-qty-label {
      font-size: 0.8rem;
      color: var(--muted);
      text-transform: uppercase;
    }
    .material-date {
      font-size: 0.8rem;
      color: var(--muted);
      margin-bottom: 1rem;
    }
    .material-actions {
      display: flex;
      gap: 0.5rem;
    }
    .material-actions button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .material-actions .edit-btn {
      background: #3498db;
      color: #fff;
    }
    .material-actions .edit-btn:hover {
      background: #2980b9;
    }
    .material-actions .delete-btn {
      background: var(--accent);
      color: #fff;
    }
    .material-actions .delete-btn:hover {
      background: #c73535;
    }

    /* ── Image Preview ── */
    .image-preview {
      width: 100%;
      height: 150px;
      background: var(--blue-light);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.5rem;
      overflow: hidden;
    }
    .image-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ── Footer ── */
    footer { text-align: center; padding: 1.5rem; color: var(--muted); font-size: .82rem; border-top: 1px solid #dde4f0; margin-top: 2rem; }

    /* ── Print ── */
    @media print {
      nav, .btn-group, .filter-bar, .logout-btn, .material-actions { display: none !important; }
      .pdf-report { box-shadow: none; border: none; }
      .materiais-grid { grid-template-columns: repeat(2, 1fr); }
      .material-card { page-break-inside: avoid; }
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      header { flex-direction: column; text-align: center; }
      .header-content { flex-direction: column; gap: 1rem; }
      .header-text h1 { font-size: 1.4rem; }
      .kpi .value { font-size: 1.7rem; }
      .modal-content { width: 95%; }
      .pdf-header { flex-direction: column; text-align: center; }
      .pdf-header-text { margin-left: 0; margin-top: 1rem; }
      .logout-btn { margin-top: 1rem; width: 100%; }
      .materiais-grid { grid-template-columns: 1fr; }
    }
  
    .camera-helper {
      display:block;
      color: var(--muted);
      margin-top: .35rem;
      margin-bottom: .85rem;
      line-height: 1.45;
      font-size: .86rem;
    }
    .camera-actions {
      display:grid;
      grid-template-columns: repeat(2, minmax(0,1fr));
      gap: .85rem;
      margin-top: .35rem;
    }
    .camera-actions .btn {
      min-height: 62px;
      border-radius: 16px;
      justify-content: center;
      flex-direction: column;
      gap: .25rem;
      box-shadow: 0 8px 24px rgba(31,56,100,.12);
      font-size: .92rem;
      font-weight: 700;
      width: 100%;
    }
    .camera-btn-icon { font-size: 1.35rem; line-height: 1; }
    .gallery-btn {
      background: #eef5ff;
      color: var(--blue-dark);
      border: 1px solid #cfe0fb;
    }
    .gallery-btn:hover { background: #e3efff; }
    .capture-btn {
      background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-mid) 100%);
      color: #fff;
      border: none;
    }
    .capture-btn:hover { filter: brightness(1.03); }
    .image-preview-app {
      margin-top: 1rem;
      border: 2px dashed #c8d6ea;
      border-radius: 16px;
      height: 220px;
      background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%);
    }
    .image-preview-app img { border-radius: 12px; }
    @media (max-width: 768px) {
      .camera-actions { grid-template-columns: 1fr; }
      .camera-actions .btn { min-height: 58px; flex-direction: row; }
      .image-preview-app { height: 200px; }
    }

  

    /* ── Planejamento RT / RT Dia a Dia Mobile ── */
    .danger-zone-note { font-size: .82rem; color: var(--muted); margin-top: .5rem; }
    @media (max-width: 768px) {
      #planejamento-rt .filter-bar,
      #rt-dia-dia .filter-bar {
        grid-template-columns: 1fr !important;
      }
      #planejamento-rt .btn-group,
      #rt-dia-dia .btn-group {
        flex-direction: column;
      }
      #planejamento-rt .btn-group .btn,
      #rt-dia-dia .btn-group .btn {
        width: 100%;
        justify-content: center;
      }
      #planejamento-rt .table-wrap,
      #rt-dia-dia .table-wrap {
        overflow: visible !important;
      }
      #planejamento-rt table,
      #rt-dia-dia table {
        width: 100%;
        border-collapse: separate;
      }
      #planejamento-rt thead,
      #rt-dia-dia thead {
        display: none;
      }
      #planejamento-rt tbody,
      #rt-dia-dia tbody,
      #planejamento-rt tr,
      #rt-dia-dia tr,
      #planejamento-rt td,
      #rt-dia-dia td {
        display: block;
        width: 100%;
      }
      #planejamento-rt tr,
      #rt-dia-dia tr {
        background: #fff;
        border: 1px solid #dbe5f3;
        border-radius: 12px;
        padding: .75rem;
        margin-bottom: .9rem;
        box-shadow: 0 2px 10px rgba(31,56,100,.08);
      }
      #planejamento-rt td,
      #rt-dia-dia td {
        border: 0 !important;
        padding: .45rem 0 !important;
        text-align: left !important;
      }
      #planejamento-rt td::before,
      #rt-dia-dia td::before {
        content: attr(data-label);
        display: block;
        font-weight: 700;
        color: var(--blue-dark);
        margin-bottom: .2rem;
      }
      #planejamento-rt td[data-label="Ações"] .btn-group,
      #rt-dia-dia td[data-label="Ações"] .btn-group {
        flex-direction: column;
        width: 100%;
      }
      #planejamento-rt td[data-label="Ações"] .btn,
      #rt-dia-dia td[data-label="Ações"] .btn {
        width: 100%;
        justify-content: center;
      }
      #planejamento-rt .status-inline-select,
      #rt-dia-dia .status-inline-select {
        width: 100%;
        min-width: 0;
      }
      #planejamento-rt .card,
      #rt-dia-dia .card {
        padding: 1rem;
      }
    }

</style>
</head>
<body>

<!-- ── LOGIN SCREEN ── -->
<div id="login-screen">
  <div class="login-container">
    <div class="login-logo">
      <img src="./logo.png" alt="Plano & Plano" />
    </div>
    <h1>Acesso Restrito</h1>
    <p>Faça login para acessar o controle de materiais</p>
    <form class="login-form" onsubmit="auth.login(event)">
      <div class="form-group">
        <label for="login-input">Login</label>
        <input type="text" id="login-input" required autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="password-input">Senha</label>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <input type="password" id="password-input" placeholder="Digite sua senha" required autocomplete="off" style="flex: 1;" />
          <button type="button" onclick="auth.toggleSenha()" style="padding: 0.6rem 0.8rem; background: #ddeeff; border: 1px solid #c8d6ea; border-radius: 8px; cursor: pointer; font-size: 1rem;">👁️</button>
        </div>
      </div>
      <button type="submit">Acessar Sistema</button>
      <div id="login-error" class="login-error">❌ Login ou senha incorretos! Tente novamente.</div>
    </form>
  </div>
</div>

<!-- ── MAIN APP ── -->
<header>
  <div class="header-content">
    <div class="logo-container">
      <img src="./logo.png" alt="Plano & Plano" />
    </div>
    <div class="header-text">
      <h1>Controle de Materiais</h1>
      <p>Gestão profissional de empréstimos e estoque - Plano & Plano</p>
    </div>
  </div>
  <div class="user-area" id="userArea" style="position:relative; z-index:1; text-align:right; min-width:220px;">
    <div id="currentUserLabel" style="font-weight:700; font-size:0.95rem;"></div>
    <div id="currentUserRole" style="opacity:.85; font-size:0.85rem; margin-top:0.25rem;"></div>
    <button class="btn btn-secondary" style="margin-top:0.6rem;" onclick="auth.logout()">Sair</button>
  </div>

</header>

<nav>
  <button class="active" data-section="visao-geral" onclick="app.showSection('visao-geral', this)">Visão Geral</button>
  <button data-section="por-empresa" onclick="app.showSection('por-empresa', this)">Por Empresa</button>
  <button data-section="por-material" onclick="app.showSection('por-material', this)">Por Material</button>
  <button data-section="registros" onclick="app.showSection('registros', this)">Gerenciar Registros</button>
  <button data-section="materiais-obra" onclick="app.showSection('materiais-obra', this)">Controle de Materiais</button>
  <button data-section="planejamento-rt" onclick="app.showSection('planejamento-rt', this)">Planejamento RT</button>
  <button data-section="predio-3d" onclick="app.showSection('predio-3d', this)">3D PRÉDIO</button>
  <button data-section="rt-dia-dia" onclick="app.showSection('rt-dia-dia', this)">RT Dia a Dia</button>
  <button data-section="rastreabilidade" onclick="app.showSection('rastreabilidade', this)">Rastreabilidade</button>
  <button data-section="relatorio" onclick="app.showSection('relatorio', this)">Relatório Visual</button>
  <button data-section="relatorio-dia" onclick="app.showSection('relatorio-dia', this)">Relatório do Dia</button>
</nav>

<button id="mobileHomeBtn" class="mobile-home-btn" onclick="voltarParaInicio()">← Voltar ao início</button>

<main>

  <!-- Alert ── -->
  <div id="alert" class="alert"></div>

  <!-- KPIs sempre visíveis -->
  <div id="globalKpiGrid" class="kpi-grid">
    <div class="kpi">
      <div class="icon">📦</div>
      <div class="value" id="kpiTotal">0</div>
      <div class="label">Total de Itens</div>
    </div>
    <div class="kpi">
      <div class="icon">🏢</div>
      <div class="value" id="kpiEmpresas">0</div>
      <div class="label">Empresas</div>
    </div>
    <div class="kpi">
      <div class="icon">🔨</div>
      <div class="value" id="kpiMateriais">0</div>
      <div class="label">Tipos de Material</div>
    </div>
    <div class="kpi">
      <div class="icon">✅</div>
      <div class="value" id="kpiConcluidos">0</div>
      <div class="label">Concluídos</div>
    </div>
  </div>

  <!-- ── VISÃO GERAL ── -->
  <section id="visao-geral" class="active">
    <div class="card">
      <h2>📊 Resumo Geral</h2>
      <div class="chart-grid">
        <div class="chart-wrap"><canvas id="chartData"></canvas></div>
        <div class="chart-wrap"><canvas id="chartStatus"></canvas></div>
      </div>
    </div>
  </section>

  <!-- ── POR EMPRESA ── -->
  <section id="por-empresa">
    <div class="card">
      <h2>🏢 Participação por Empresa</h2>
      <div class="progress-list" id="progressEmpresas"></div>
    </div>
    <div class="card">
      <h2>📈 Comparativo de Empresas</h2>
      <div class="chart-wrap" style="height:320px"><canvas id="chartEmpresaBar"></canvas></div>
    </div>
  </section>

  <!-- ── POR MATERIAL ── -->
  <section id="por-material">
    <div class="card">
      <h2>🔨 Participação por Material</h2>
      <div class="progress-list" id="progressMateriais"></div>
    </div>
    <div class="card">
      <h2>📈 Comparativo de Materiais</h2>
      <div class="chart-wrap" style="height:300px"><canvas id="chartMaterialBar"></canvas></div>
    </div>
  </section>

  <!-- ── REGISTROS ── -->
  <section id="registros">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">📝 Voltar para início</button></div>
    <div class="card">
      <h2>📝 Gerenciar Registros</h2>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="app.abrirModalNovo()">
          ➕ Novo Registro
        </button>
        <button class="btn btn-success" onclick="app.exportarCSV()">
          💾 Exportar CSV
        </button>
        <button class="btn btn-warning" onclick="app.showSection('relatorio', document.querySelectorAll('nav button')[5])">
          📊 Gerar Relatório
        </button>
        <button class="btn btn-secondary" onclick="app.resetarDados()">
          🔄 Resetar Dados
        </button>
      </div>
      <div class="filter-bar">
        <input type="text" id="searchInput" placeholder="🔍 Buscar por empresa ou material..." oninput="app.filtrarTabela()" />
        <select id="filterEmpresa" onchange="app.filtrarTabela()">
          <option value="">Todas as empresas</option>
        </select>
        <select id="filterMaterial" onchange="app.filtrarTabela()">
          <option value="">Todos os materiais</option>
        </select>
        <select id="filterStatus" onchange="app.filtrarTabela()">
          <option value="">Todos os status</option>
          <option value="Em Aberto">Em Aberto</option>
          <option value="Parcial">Parcial</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Empresa</th>
              <th>Material</th>
              <th>Data do Empréstimo</th>
              <th>Quantidade</th>
              <th>Status (Clique para mudar)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tabelaRegistros"></tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ── CONTROLE DE MATERIAIS DA OBRA ── -->
  <section id="materiais-obra">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">📦 Voltar para início</button></div>
    <div class="card">
      <h2>🏗️ Controle de Materiais da Obra</h2>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="appMateriais.abrirModalNovo()">
          ➕ Novo Material
        </button>
        <button class="btn btn-success" onclick="appMateriais.gerarRelatorioDia()">
          📋 Relatório do Dia
        </button>
        <button class="btn btn-warning" onclick="appMateriais.gerarRelatorioCompleto()">
          📊 Relatório Completo
        </button>
        <button class="btn btn-secondary" onclick="appMateriais.buscarMateriais()">
          🔄 Atualizar
        </button>
      </div>
      <div class="filter-bar">
        <input type="text" id="searchMateriais" placeholder="🔍 Buscar material..." oninput="appMateriais.filtrarMateriais()" />
        <input type="date" id="filterDataMateriais" onchange="appMateriais.filtrarMateriais()" />
      </div>
      <div id="materiaisContainer" class="materiais-grid"></div>
    </div>
  </section>


  <!-- ── PLANEJAMENTO RT ── -->
  <section id="planejamento-rt">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">📅 Voltar para início</button></div>
    <div class="card">
      <h2>📅 Planejamento RT da Escadinha</h2>
      <p style="color:#6b7a99;margin:.35rem 0 1rem 0;">Acesso liberado para Admin, GO e Almoxarife (somente entrega).</p>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="appRT.abrirModalNovo()">➕ Novo Planejamento</button>
        <button class="btn btn-warning" onclick="appRT.verPrioridadesDoMes()">🚨 Ver Prioridades do Mês</button>
        <button class="btn btn-secondary" onclick="appRT.renderizar()">🔄 Atualizar</button>
        <button class="btn btn-danger" onclick="appRT.excluirTudoPlanejamento()">🗑️ Excluir todo planejamento</button>
        <button class="btn btn-success" onclick="appRT.gerarPdfPlanejamento()">📄 PDF dos Status</button>
      </div>
      <div class="filter-bar">
        <select id="rtMesFiltro" onchange="appRT.renderizar()">
          <option value="">Todos os meses</option>
        </select>
        <select id="rtStatusFiltro" onchange="appRT.renderizar()">
          <option value="">Todos os status</option>
          <option value="Planejado">Planejado</option>
          <option value="Pedir agora">Pedir agora</option>
          <option value="RT lançada">RT lançada</option>
          <option value="Em suprimentos">Em suprimentos</option>
                    <option value="Aguardando entrega">Aguardando entrega</option>
          <option value="Entregue">Entregue</option>
          <option value="Concluído">Concluído</option>
        </select>
        <select id="rtTorreFiltro" onchange="appRT.renderizar()">
          <option value="">Todas as torres</option>
        </select>
        <select id="rtServicoFiltro" onchange="appRT.renderizar()">
          <option value="">Todos os serviços</option>
        </select>
        <input type="text" id="rtBusca" placeholder="🔍 Buscar serviço, material ou pavimento..." oninput="appRT.renderizar()" />
      </div>
      <div id="rtResumo" class="kpi-grid" style="margin-top:1rem;"></div>
      <div id="rtPrioridadesMes" style="margin-top:1rem;"></div>
    </div>

    <div class="card">
      <h2>🗂️ Planejamento por Mês</h2>
      <div id="rtPlanejamentoContainer"></div>
    </div>
  </section>


  <!-- ── RT DIA A DIA ── -->

  <!-- ── 3D PRÉDIO ── -->
  <section id="predio-3d">
    <div class="card">
      <h2>🏢 3D PRÉDIO</h2>
      <div class="predio3d-legend">
        <div class="predio3d-legend-item"><span class="predio3d-dot verde"></span> Concluído</div>
        <div class="predio3d-legend-item"><span class="predio3d-dot amarelo"></span> Em andamento</div>
        <div class="predio3d-legend-item"><span class="predio3d-dot vermelho"></span> Atrasado</div>
        <div class="predio3d-legend-item"><span class="predio3d-dot cinza"></span> Sem dados</div>
      </div>
      <div class="predio3d-toolbar">
        <div class="form-group" style="min-width:220px; margin:0;">
          <label for="predio3dTower">Torre</label>
          <select id="predio3dTower" onchange="predio3D.render()"></select>
        </div>
        <button class="btn btn-secondary" onclick="predio3D.resetView()">↺ Resetar visão</button>
        <button class="btn btn-success" onclick="predio3D.gerarPdf()">📄 PDF do 3D PRÉDIO</button>
      </div>
      <div class="predio3d-layout">
        <div class="predio3d-stage">
          <div class="predio3d-help">Arraste para girar • Role para zoom • Clique no pavimento</div>
          <div id="predio3dViewport" class="predio3d-viewport">
            <div class="predio3d-scene">
              <div id="predio3dBuilding" class="predio3d-building"></div>
            </div>
          </div>
        </div>
        <div class="card predio3d-panel" style="margin:0;">
          <h2 style="margin-bottom:.9rem;">Detalhes do Pavimento</h2>
          <div class="metric">
            <div class="metric-card"><div class="num" id="predio3dCountFloors">0</div><div class="label">Pavimentos</div></div>
            <div class="metric-card"><div class="num" id="predio3dCountCritical">0</div><div class="label">Atrasados</div></div>
          </div>
          <div class="predio3d-floor-list" id="predio3dFloorList"></div>
          <div style="margin-top:1rem;">
            <div class="predio3d-badge" id="predio3dSelectedLabel">Selecione um pavimento</div>
            <div class="predio3d-details-list" id="predio3dDetails" style="margin-top:.85rem;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="rt-dia-dia">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">📝 Voltar para início</button></div>
    <div class="card">
      <h2>📝 RT do Dia a Dia</h2>
      <p style="color:#6b7a99;margin:.35rem 0 1rem 0;">Use esta área para RTs avulsas, emergenciais e acompanhamentos fora da escadinha. Acesso liberado para Admin, GO e Almoxarife (somente entrega).</p>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="appRT.abrirModalNovoDiaDia()">➕ Nova RT Dia a Dia</button>
        <button class="btn btn-warning" onclick="appRT.verPrioridadesDiaDia()">🚨 Ver RTs Críticas</button>
        <button class="btn btn-secondary" onclick="appRT.renderizarDiaDia()">🔄 Atualizar</button>
        <button class="btn btn-success" onclick="appRT.gerarPdfDiaDia()">📄 PDF dos Status</button>
      </div>
      <div class="filter-bar">
        <select id="rtDiaStatusFiltro" onchange="appRT.renderizarDiaDia()">
          <option value="">Todos os status</option>
          <option value="Planejado">Planejado</option>
          <option value="Pedir agora">Pedir agora</option>
          <option value="RT lançada">RT lançada</option>
          <option value="Em suprimentos">Em suprimentos</option>
                    <option value="Aguardando entrega">Aguardando entrega</option>
          <option value="Entregue">Entregue</option>
          <option value="Concluído">Concluído</option>
        </select>
        <select id="rtDiaTorreFiltro" onchange="appRT.renderizarDiaDia()">
          <option value="">Todas as torres</option>
        </select>
        <select id="rtDiaServicoFiltro" onchange="appRT.renderizarDiaDia()">
          <option value="">Todos os serviços</option>
        </select>
        <input type="text" id="rtDiaBusca" placeholder="🔍 Buscar RT avulsa, material, torre ou observação..." oninput="appRT.renderizarDiaDia()" />
      </div>
      <div id="rtDiaResumo" class="kpi-grid" style="margin-top:1rem;"></div>
      <div id="rtDiaCriticas" style="margin-top:1rem;"></div>
    </div>
    <div class="card">
      <h2>📋 Acompanhamento Diário de RTs</h2>
      <div id="rtDiaDiaContainer"></div>
    </div>
  </section>


  <!-- ── RELATÓRIO DO DIA ── -->
  <section id="relatorio-dia">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">📋 Voltar para início</button></div>
    <div class="card">
      <h2>📋 Relatório do Dia</h2>
      <div class="btn-group">
        <button class="btn btn-success" onclick="appMateriais.gerarRelatorioDia()">📋 Abrir Relatório para Impressão</button>
        <button class="btn btn-warning" onclick="appMateriais.gerarRelatorioCompleto()">📊 Abrir Relatório Completo</button>
        <button class="btn btn-secondary" onclick="appMateriais.renderizarRelatorioDia()">🔄 Atualizar Painel</button>
      </div>
      <div id="painelRelatorioDia"></div>
    </div>
  </section>

  <!-- ── RASTREABILIDADE COMPLETA ── -->
  <section id="rastreabilidade">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">🧾 Voltar para início</button></div>
    <div class="card">
      <h2>🧾 Lançamento de Rastreabilidade</h2>
      <form id="formRastreabilidade" onsubmit="appMateriais.salvarRastreabilidadeManual(event)">
        <div class="form-row">
          <div class="form-group">
            <label for="rastMaterialNome">Material *</label>
            <input type="text" id="rastMaterialNome" list="rastMateriaisList" placeholder="Ex: Cimento CP II" required />
            <datalist id="rastMateriaisList"></datalist>
          </div>
          <div class="form-group">
            <label for="rastQuantidade">Quantidade *</label>
            <input type="number" id="rastQuantidade" min="1" step="1" placeholder="Ex: 10" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="rastResponsavel">Quem retirou *</label>
            <input type="text" id="rastResponsavel" placeholder="Nome de quem retirou" required />
          </div>
          <div class="form-group">
            <label for="rastDataHora">Data e hora *</label>
            <input type="datetime-local" id="rastDataHora" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="rastFuncao">Função</label>
            <input type="text" id="rastFuncao" placeholder="Ex: Pedreiro" />
          </div>
          <div class="form-group">
            <label for="rastSetor">Setor</label>
            <input type="text" id="rastSetor" placeholder="Ex: Estrutura" />
          </div>
        </div>
        <div class="form-group">
          <label for="rastMotivo">Motivo *</label>
          <input type="text" id="rastMotivo" placeholder="Ex: Concretagem da laje" required />
        </div>
        <div class="form-group">
          <label for="rastObservacoes">Observações</label>
          <textarea id="rastObservacoes" rows="3" placeholder="Informações adicionais"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-success" type="submit">➕ Salvar Rastreabilidade</button>
          <button class="btn btn-secondary" type="button" onclick="appMateriais.preencherDataRastreabilidade()">🕒 Usar data/hora atual</button>
        </div>
      </form>
    </div>

    <div class="card">
      <h2>📋 Rastreabilidade Completa</h2>
      <div class="btn-group">
        <button class="btn btn-warning" onclick="appMateriais.gerarRelatorioRastreabilidadeCompleta()">🧾 Relatório de Rastreabilidade</button>
        <button class="btn btn-secondary" onclick="appMateriais.renderizarRastreabilidadeCompleta()">🔄 Atualizar</button>
      </div>
      <div class="filter-bar">
        <input type="date" id="rastFiltroData" onchange="appMateriais.renderizarRastreabilidadeCompleta()" />
        <input type="text" id="rastFiltroMaterial" placeholder="🔍 Buscar material..." oninput="appMateriais.renderizarRastreabilidadeCompleta()" />
        <input type="text" id="rastFiltroPessoa" placeholder="👤 Buscar quem retirou..." oninput="appMateriais.renderizarRastreabilidadeCompleta()" />
        <input type="text" id="rastFiltroSetor" placeholder="🏗️ Buscar setor/função..." oninput="appMateriais.renderizarRastreabilidadeCompleta()" />
      </div>
      <div id="rastreabilidadeCompletaContainer"></div>
    </div>
  </section>

  <!-- ── RELATÓRIO VISUAL ── -->
  <section id="relatorio">
    <div class="mobile-section-back"><button class="btn btn-secondary" type="button" onclick="voltarParaInicio()">📊 Voltar para início</button></div>
    <div class="card">
      <h2>📊 Relatório Visual para Apresentação</h2>
      <div class="btn-group">
        <button class="btn btn-success" onclick="app.exportarPDF()">
          📥 Baixar Relatório PDF
        </button>
        <button class="btn btn-secondary" onclick="window.print()">
          🖨️ Imprimir
        </button>
      </div>
      <div id="pdf-container" class="pdf-report">
        <!-- Relatório será gerado aqui -->
      </div>
    </div>
  </section>

</main>

<!-- ── MODAL EMPRÉSTIMOS ── -->
<div id="modal" class="modal">
  <div class="modal-content">
    <div class="modal-topbar"><button type="button" class="btn btn-secondary" onclick="app.fecharModal()">← Voltar</button><span style="font-weight:700;color:var(--blue-dark);">Empréstimos</span></div>
    <h3 id="modalTitle">Novo Registro</h3>
    <form id="formRegistro" onsubmit="app.salvarRegistro(event)">
      <div class="form-group">
        <label for="empresa">Empresa *</label>
        <input type="text" id="empresa" required placeholder="Ex: Felipe Agosti" />
      </div>
      <div class="form-group">
        <label for="material">Material *</label>
        <input type="text" id="material" required placeholder="Ex: Pontalete" />
      </div>
      <div class="form-group">
        <label for="data">Data do Empréstimo *</label>
        <input type="date" id="data" required />
      </div>
      <div class="form-group">
        <label for="quantidade">Quantidade *</label>
        <input type="number" id="quantidade" required min="1" placeholder="Ex: 20" />
      </div>
      <div class="modal-buttons">
        <button type="button" class="btn btn-secondary" onclick="app.fecharModal()">Cancelar</button>
        <button type="submit" class="btn btn-success">Salvar</button>
      </div>
    </form>
  </div>
</div>

<!-- ── MODAL MATERIAIS DA OBRA ── -->
<div id="modalMateriais" class="modal">
  <div class="modal-content">
    <div class="modal-topbar"><button type="button" class="btn btn-secondary" onclick="appMateriais.fecharModal()">← Voltar</button><span style="font-weight:700;color:var(--blue-dark);">Controle de Materiais</span></div>
    <h3 id="modalMateriaisTitle">Novo Material</h3>
    <form id="formMateriais" onsubmit="appMateriais.salvarMaterial(event)">
      <div class="form-group">
        <label for="nomeMaterial">Nome do Material *</label>
        <input type="text" id="nomeMaterial" required placeholder="Ex: Cimento, Areia, Tijolos..." />
      </div>
      <div class="form-group">
        <label for="quantidadeMaterial">Quantidade *</label>
        <input type="number" id="quantidadeMaterial" required min="1" placeholder="Ex: 50" />
      </div>
      <div class="form-group">
        <label for="especificacoes">Especificações / Descrição</label>
        <textarea id="especificacoes" placeholder="Ex: Cimento Portland 50kg, Areia média, etc..." rows="3"></textarea>
      </div>
      
<div class="form-group">
  <label for="fotoMaterial">Foto do Material</label>
  <small class="camera-helper">A imagem será comprimida automaticamente. No celular, use <strong>Galeria</strong> para escolher uma imagem salva ou <strong>Câmera</strong> para tirar a foto na hora.</small>

  <input type="file" id="fotoMaterial" accept="image/*" style="display:none;" />
  <input type="file" id="fotoMaterialCamera" accept="image/*" capture="environment" style="display:none;" />

  <div class="camera-actions">
    <button type="button" class="btn gallery-btn" onclick="document.getElementById('fotoMaterial').click()">
      <span class="camera-btn-icon">🖼️</span>
      <span>Escolher da Galeria</span>
    </button>
    <button type="button" class="btn capture-btn" onclick="document.getElementById('fotoMaterialCamera').click()">
      <span class="camera-btn-icon">📷</span>
      <span>Tirar Foto</span>
    </button>
  </div>

  <div id="imagemPreview" class="image-preview image-preview-app" style="display: none;">
    <img id="imagemPreviewImg" src="" alt="Preview" />
  </div>
</div>

      <div class="modal-buttons">
        <button type="button" class="btn btn-secondary" onclick="appMateriais.fecharModal()">Cancelar</button>
        <button type="submit" class="btn btn-success">Salvar Material</button>
      </div>
    </form>
  </div>
</div>


<!-- ── MODAL RETIRADA DE MATERIAL ── -->
<div id="modalRetirada" class="modal">
  <div class="modal-content">
    <div class="modal-topbar"><button type="button" class="btn btn-secondary" onclick="appMateriais.fecharModalRetirada()">← Voltar</button><span style="font-weight:700;color:var(--blue-dark);">Rastreabilidade</span></div>
    <h3>Registrar Retirada</h3>
    <form id="formRetirada" onsubmit="appMateriais.salvarRetirada(event)">
      <input type="hidden" id="retiradaMaterialId" />
      <div class="form-group">
        <label for="retiradaMaterialNome">Material</label>
        <input type="text" id="retiradaMaterialNome" readonly />
      </div>
      <div class="form-group">
        <label for="retiradaQuantidade">Quantidade retirada *</label>
        <input type="number" id="retiradaQuantidade" min="1" required />
      </div>
      <div class="form-group">
        <label for="retiradaResponsavel">Quem retirou *</label>
        <input type="text" id="retiradaResponsavel" required placeholder="Nome de quem retirou" />
      </div>
      <div class="form-group">
        <label for="retiradaFuncao">Função</label>
        <input type="text" id="retiradaFuncao" placeholder="Ex: Pedreiro, Encarregado" />
      </div>
      <div class="form-group">
        <label for="retiradaSetor">Setor</label>
        <input type="text" id="retiradaSetor" placeholder="Ex: Engenharia, Canteiro" />
      </div>
      <div class="form-group">
        <label for="retiradaMotivo">Motivo da retirada *</label>
        <textarea id="retiradaMotivo" rows="3" required placeholder="Descreva o motivo da retirada"></textarea>
      </div>
      <div class="form-group">
        <label for="retiradaObservacoes">Observações</label>
        <textarea id="retiradaObservacoes" rows="2" placeholder="Opcional"></textarea>
      </div>
      <div class="modal-buttons">
        <button type="button" class="btn btn-secondary" onclick="appMateriais.fecharModalRetirada()">Cancelar</button>
        <button type="submit" class="btn btn-success">Salvar Retirada</button>
      </div>
    </form>
  </div>
</div>

<!-- ── MODAL RT DIA A DIA ── -->
<div id="modalRTDiaDia" class="modal">
  <div class="modal-content">
    <div class="modal-topbar"><button type="button" class="btn btn-secondary" onclick="appRT.fecharModalDiaDia()">← Voltar</button><span style="font-weight:700;color:var(--blue-dark);">RT Dia a Dia</span></div>
    <h3 id="modalRTDiaDiaTitle">Nova RT Dia a Dia</h3>
    <form id="formRTDiaDia" onsubmit="appRT.salvarDiaDia(event)">
      <div class="form-row">
        <div class="form-group">
          <label for="rtDiaServico">Serviço *</label>
          <select id="rtDiaServico" required></select>
        </div>
        <div class="form-group">
          <label for="rtDiaMaterial">Material / RT *</label>
          <input type="text" id="rtDiaMaterial" required placeholder="Ex: Argamassa AC2 / Porta de Madeira" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtDiaTorre">Torre</label>
          <input type="text" id="rtDiaTorre" placeholder="Ex: Torre A" />
        </div>
        <div class="form-group">
          <label for="rtDiaPavimento">Pavimento</label>
          <input type="text" id="rtDiaPavimento" placeholder="Ex: 5º Pavto" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtDiaQuantidade">Quantidade</label>
          <input type="number" id="rtDiaQuantidade" min="0" step="1" placeholder="Ex: 100" />
        </div>
        <div class="form-group">
          <label for="rtDiaDataNecessidade">Data da necessidade *</label>
          <input type="date" id="rtDiaDataNecessidade" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtDiaLeadTime">Lead time (dias) *</label>
          <input type="number" id="rtDiaLeadTime" min="1" step="1" value="20" required />
        </div>
        <div class="form-group">
          <label for="rtDiaStatus">Status *</label>
          <select id="rtDiaStatus" required></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtDiaPrioridadeManual">Prioridade manual</label>
          <select id="rtDiaPrioridadeManual">
            <option value="">Automática</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
        <div class="form-group">
          <label>Datas automáticas</label>
          <div id="rtDiaStatusResumo" class="status-resumo-box">As datas serão registradas automaticamente conforme você alterar o status.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="rtDiaObservacoes">Observações</label>
        <textarea id="rtDiaObservacoes" rows="3" placeholder="Ex: necessidade emergencial identificada na obra / acompanhamento via e-mail"></textarea>
      </div>
      <div class="modal-buttons">
        <button type="button" class="btn btn-secondary" onclick="appRT.fecharModalDiaDia()">Cancelar</button>
        <button type="submit" class="btn btn-success">Salvar RT Dia a Dia</button>
      </div>
    </form>
  </div>
</div>

<!-- ── MODAL PLANEJAMENTO RT ── -->
<div id="modalPlanejamentoRT" class="modal">
  <div class="modal-content">
    <div class="modal-topbar"><button type="button" class="btn btn-secondary" onclick="appRT.fecharModal()">← Voltar</button><span style="font-weight:700;color:var(--blue-dark);">Planejamento RT</span></div>
    <h3 id="modalPlanejamentoRTTitle">Novo Planejamento RT</h3>
    <form id="formPlanejamentoRT" onsubmit="appRT.salvar(event)">
      <div class="form-row">
        <div class="form-group">
          <label for="rtMes">Mês da Escadinha *</label>
          <select id="rtMes" required></select>
        </div>
        <div class="form-group">
          <label for="rtServico">Serviço *</label>
          <select id="rtServico" required></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtTorre">Torre</label>
          <input type="text" id="rtTorre" placeholder="Ex: Torre A" />
        </div>
        <div class="form-group">
          <label for="rtPavimento">Pavimento</label>
          <input type="text" id="rtPavimento" placeholder="Ex: 1º Pavto" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtMaterial">Material / Nome na planilha *</label>
          <input type="text" id="rtMaterial" required placeholder="Ex: Argamassa AC2" />
        </div>
        <div class="form-group">
          <label for="rtQuantidade">Quantidade</label>
          <input type="number" id="rtQuantidade" min="0" step="1" placeholder="Ex: 100" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtDataServico">Data prevista do serviço *</label>
          <input type="date" id="rtDataServico" required />
        </div>
        <div class="form-group">
          <label for="rtLeadTime">Lead time (dias) *</label>
          <input type="number" id="rtLeadTime" min="1" step="1" value="20" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtStatus">Status *</label>
          <select id="rtStatus" required></select>
        </div>
        <div class="form-group">
          <label for="rtPrioridadeManual">Prioridade manual</label>
          <select id="rtPrioridadeManual">
            <option value="">Automática</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rtDataRT">Data da RT</label>
          <input type="date" id="rtDataRT" />
        </div>
        <div class="form-group">
          <label>Datas automáticas do acompanhamento</label>
          <div id="rtStatusResumo" class="status-resumo-box">Aprovação de suprimentos, autorização e entrega serão registradas automaticamente conforme você alterar o status.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="rtObservacoes">Observações</label>
        <textarea id="rtObservacoes" rows="3" placeholder="Ex: antecipado para não travar a escadinha"></textarea>
      </div>
      <div class="modal-buttons">
        <button type="button" class="btn btn-secondary" onclick="appRT.fecharModal()">Cancelar</button>
        <button type="submit" class="btn btn-success">Salvar Planejamento</button>
      </div>
    </form>
  </div>
</div>


<footer>
  Controle de Materiais de Empréstimo e Estoque — Plano & Plano &mdash; Dados salvos automaticamente
</footer>

<!-- Firebase bridge -->
<script type="module">
  import {
    salvarNaNuvem,
    carregarDaNuvem,
    escutarMudancas,
    salvarMateriaisNaNuvem,
    carregarMateriaisDaNuvem,
    escutarMudancasMateriais,
    salvarMovimentacoesNaNuvem,
    carregarMovimentacoesDaNuvem,
    escutarMudancasMovimentacoes,
    salvarPlanejamentoRTNaNuvem,
    carregarPlanejamentoRTDaNuvem,
    escutarMudancasPlanejamentoRT,
    salvarRTDiaDiaNaNuvem,
    carregarRTDiaDiaDaNuvem,
    escutarMudancasRTDiaDia
  } from "./firebase-controle-usuarios.js";

  window.__fb = {
    salvarNaNuvem,
    carregarDaNuvem,
    escutarMudancas,
    salvarMateriaisNaNuvem,
    carregarMateriaisDaNuvem,
    escutarMudancasMateriais,
    salvarMovimentacoesNaNuvem,
    carregarMovimentacoesDaNuvem,
    escutarMudancasMovimentacoes,
    salvarPlanejamentoRTNaNuvem,
    carregarPlanejamentoRTDaNuvem,
    escutarMudancasPlanejamentoRT,
    salvarRTDiaDiaNaNuvem,
    carregarRTDiaDiaDaNuvem,
    escutarMudancasRTDiaDia
  };
</script>

<script>

function atualizarBotaoMobile(sectionId) {
  const btn = document.getElementById('mobileHomeBtn');
  if (!btn) return;
  const isLogged = document.getElementById('login-screen')?.classList.contains('hidden');
  const activeSection = sectionId || document.querySelector('section.active')?.id || 'visao-geral';
  const hasOpenModal = document.querySelector('.modal.active');
  const isHome = activeSection === 'visao-geral';
  const show = window.innerWidth <= 768 && isLogged && (!isHome || hasOpenModal);
  btn.style.display = show ? 'flex' : 'none';
}

function voltarParaInicio() {
  const modal = document.getElementById('modal');
  const modalMateriais = document.getElementById('modalMateriais');
  const modalRetirada = document.getElementById('modalRetirada');
  if (modal && modal.classList.contains('active') && window.app?.fecharModal) window.app.fecharModal();
  if (modalMateriais && modalMateriais.classList.contains('active') && window.appMateriais?.fecharModal) window.appMateriais.fecharModal();
  if (modalRetirada && modalRetirada.classList.contains('active') && window.appMateriais?.fecharModalRetirada) window.appMateriais.fecharModalRetirada();
  const btn = document.querySelector('nav button[data-section="visao-geral"]');
  if (window.app?.showSection && btn) {
    window.app.showSection('visao-geral', btn);
  } else {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('visao-geral')?.classList.add('active');
  }
  atualizarBotaoMobile('visao-geral');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('resize', () => atualizarBotaoMobile());

// ── AUTENTICAÇÃO / PERFIS ──
const auth = {
  USUARIOS: {
    admin: { senha: 'Admin@123', nome: 'Administrador', role: 'admin' },
    engenharia: { senha: 'Eng@123', nome: 'Engenharia/Canteiro', role: 'engenharia' },
    canteiro: { senha: 'Cant@123', nome: 'Engenharia/Canteiro', role: 'engenharia' },
    go: { senha: 'Go@123', nome: 'Gerente de Obras', role: 'go' },
    almoxarife: { senha: 'Almox@123', nome: 'Almoxarife', role: 'almoxarife' }
  },
  SESSION_KEY: 'plano_session_auth_v2',

  verificarSessao() {
    const sessao = this.obterSessao();
    if (sessao && sessao.role) {
      this.mostrarApp(sessao);
      return;
    }
    document.getElementById('login-screen').classList.remove('hidden');
    document.querySelector('header').style.display = 'none';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    atualizarBotaoMobile('visao-geral');
  },

  obterSessao() {
    try {
      return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null');
    } catch (e) {
      return null;
    }
  },

  login(e) {
    e.preventDefault();
    const login = document.getElementById('login-input').value.toLowerCase().trim();
    const senha = document.getElementById('password-input').value.trim();
    const usuario = this.USUARIOS[login];

    if (usuario && senha === usuario.senha) {
      const sessao = { username: login, nome: usuario.nome, role: usuario.role, loginAt: new Date().toISOString() };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessao));
      document.getElementById('login-error').classList.remove('show');
      this.mostrarApp(sessao);
    } else {
      document.getElementById('login-error').classList.add('show');
      document.getElementById('password-input').value = '';
      document.getElementById('login-input').focus();
    }
  },

  toggleSenha() {
    const input = document.getElementById('password-input');
    input.type = (input.type === 'password') ? 'text' : 'password';
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.reload();
  },

  roleLabel(role) {
    return ({ admin: 'Administrador', engenharia: 'Engenharia/Canteiro', go: 'GO', almoxarife: 'Almoxarife' })[role] || role;
  },

  aplicarPermissoes(sessao) {
    const role = sessao?.role || 'admin';
    document.body.dataset.role = role;
    document.getElementById('currentUserLabel').textContent = `Usuário: ${sessao.username}`;
    document.getElementById('currentUserRole').textContent = `Perfil: ${this.roleLabel(role)}`;

    const permitidas = {
      admin: ['visao-geral','por-empresa','por-material','registros','materiais-obra','planejamento-rt','predio-3d','rt-dia-dia','rastreabilidade','relatorio','relatorio-dia'],
      almoxarife: ['materiais-obra','planejamento-rt','rt-dia-dia','rastreabilidade','relatorio','relatorio-dia'],
      go: ['materiais-obra','planejamento-rt','predio-3d','rt-dia-dia','rastreabilidade','relatorio','relatorio-dia'],
      engenharia: ['materiais-obra','relatorio','relatorio-dia']
    }[role] || ['relatorio-dia'];

    document.querySelectorAll('nav button').forEach((btn) => {
      const section = btn.dataset.section;
      btn.style.display = permitidas.includes(section) ? 'inline-flex' : 'none';
    });

    document.querySelector('.kpi-grid').style.display = (role === 'admin') ? 'grid' : 'none';

    const firstBtn = [...document.querySelectorAll('nav button')].find(btn => btn.style.display !== 'none');
    if (firstBtn) {
      app.showSection(firstBtn.dataset.section, firstBtn);
    }
  },

  mostrarApp(sessao = this.obterSessao()) {
    window.currentUser = sessao || { username: 'admin', role: 'admin', nome: 'Administrador' };
    document.getElementById('login-screen').classList.add('hidden');
    document.querySelector('header').style.display = 'flex';
    document.querySelector('nav').style.display = 'flex';
    document.querySelector('main').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    this.aplicarPermissoes(window.currentUser);
    app.init();
    appMateriais.init();
    appRT.init();
    predio3D.render();
    setTimeout(() => atualizarBotaoMobile('visao-geral'), 50);
  },

  pode(acao) {
    const role = window.currentUser?.role || 'admin';
    const mapa = {
      admin: ['editar_emprestimos','editar_materiais','deletar_materiais','registrar_retirada','ver_rastreabilidade','ver_relatorio_dia','excluir_rastreabilidade','ver_relatorio_completo','ver_planejamento_rt','editar_planejamento_rt','ver_predio_3d','ver_rt_dia_dia','editar_rt_dia_dia'],
      almoxarife: ['editar_materiais','deletar_materiais','registrar_retirada','ver_rastreabilidade','ver_relatorio_dia','ver_relatorio_completo','ver_planejamento_rt','ver_rt_dia_dia'],
      go: ['ver_rastreabilidade','ver_relatorio_dia','ver_relatorio_completo','ver_planejamento_rt','editar_planejamento_rt','ver_predio_3d','ver_rt_dia_dia','editar_rt_dia_dia'],
      engenharia: ['ver_relatorio_dia','ver_relatorio_completo']
    };
    return (mapa[role] || []).includes(acao);
  }
};


// ── 3D PRÉDIO ──
const predio3D = {
  state: { rotateX: -18, rotateY: -34, scale: 1, selected: null, tower: 'all', dragging: false, startX: 0, startY: 0, baseRotateX: -18, baseRotateY: -34 },
  controlsBound: false,

  getItensBase() {
    const planejamento = (window.appRT?.itens || []).map(item => ({ ...item, origem: 'planejamento' }));
    const diaDia = (window.appRT?.itensDiaDia || []).map(item => ({ ...item, origem: 'dia-dia' }));
    return [...planejamento, ...diaDia];
  },

  getCanonicalTowerMap() {
    const base = this.getItensBase();
    const grouped = {};
    const addFloor = (tower, floor) => {
      if (!tower || !floor) return;
      grouped[tower] = grouped[tower] || new Set();
      grouped[tower].add(floor);
    };
    base.forEach(item => addFloor(item.torre || 'Sem torre', item.pavimento || 'Sem pavimento'));

    const knownMax = { 'Torre A': 18, 'Torre B': 20 };
    Object.entries(knownMax).forEach(([tower, maxFloor]) => {
      grouped[tower] = grouped[tower] || new Set();
      grouped[tower].add('Térreo');
      for (let i = 1; i <= maxFloor; i++) grouped[tower].add(`${i}º Pavto`);
    });

    return Object.fromEntries(Object.entries(grouped).map(([tower, floors]) => [tower, Array.from(floors).sort((a, b) => this.pavimentoOrder(a) - this.pavimentoOrder(b))]));
  },

  torresDisponiveis() {
    const towers = Object.keys(this.getCanonicalTowerMap()).filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    return ['all', ...towers];
  },

  pavimentoOrder(label) {
    const txt = String(label || '').toLowerCase();
    if (txt.includes('subsolo')) return -100;
    if (txt.includes('térreo') || txt.includes('terreo')) return 0;
    if (txt.includes('cobertura')) return 999;
    const m = txt.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 500;
  },

  parseDate(v) {
    if (!v) return null;
    try {
      if (/^\d{4}-\d{2}-\d{2}/.test(v)) return new Date(v + 'T12:00:00');
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
        const [d,m,y] = v.split('/');
        return new Date(`${y}-${m}-${d}T12:00:00`);
      }
    } catch (e) {}
    return null;
  },

  statusLabel(status) {
    return ({ verde: 'Concluído', amarelo: 'Em andamento', vermelho: 'Atrasado', cinza: 'Sem dados' })[status] || 'Sem dados';
  },

  buildTowerSelect() {
    const sel = document.getElementById('predio3dTower');
    if (!sel) return;
    const current = this.state.tower;
    sel.innerHTML = this.torresDisponiveis().map(t => `<option value="${t}">${t === 'all' ? 'Todas as torres' : t}</option>`).join('');
    sel.value = this.torresDisponiveis().includes(current) ? current : 'all';
    this.state.tower = sel.value || 'all';
  },

  getTowerFloorsData() {
    const items = this.getItensBase();
    const towerMap = this.getCanonicalTowerMap();
    const selectedTowers = this.state.tower === 'all' ? Object.keys(towerMap).filter(t => !['Outros', 'Sem torre'].includes(t)) : [this.state.tower];
    const result = selectedTowers.map(tower => {
      const floors = (towerMap[tower] || []).map(floor => {
        const floorItems = items.filter(i => (i.torre || 'Sem torre') === tower && (i.pavimento || 'Sem pavimento') === floor);
        return {
          id: `${tower}|||${floor}`,
          tower,
          floor,
          items: floorItems,
          status: this.computeFloorStatus(floorItems)
        };
      });
      return { tower, floors };
    }).filter(group => group.floors.length);

    if (this.state.tower === 'all' && !result.length) {
      return Object.entries(towerMap).map(([tower, floors]) => ({
        tower,
        floors: floors.map(floor => ({ id: `${tower}|||${floor}`, tower, floor, items: [], status: 'cinza' }))
      }));
    }
    return result;
  },

  computeFloorStatus(items) {
    const validItems = Array.isArray(items) ? items : [];
    if (!validItems.length) return 'cinza';
    const statuses = validItems.map(i => String(i.status || '').trim()).filter(Boolean);
    const today = new Date();
    const allConcluidos = statuses.length > 0 && statuses.every(s => s === 'Concluído');
    const andamento = validItems.some(i => ['Pedir agora','RT lançada','Em suprimentos','Aguardando entrega','Entregue'].includes(String(i.status || '').trim()));
    const atrasado = validItems.some(i => {
      const dt = this.parseDate(i.dataServico || i['Início Planejado'] || i.dataNecessidade || '');
      const st = String(i.status || '').trim();
      return dt && dt < today && st !== 'Concluído';
    });
    if (allConcluidos) return 'verde';
    if (atrasado) return 'vermelho';
    if (andamento) return 'amarelo';
    return 'cinza';
  },

  ensureSelected(towersData) {
    const allFloors = towersData.flatMap(group => group.floors);
    if (!this.state.selected && allFloors.length) this.state.selected = allFloors[allFloors.length - 1].id;
    if (this.state.selected && !allFloors.some(f => f.id === this.state.selected)) this.state.selected = allFloors.length ? allFloors[allFloors.length - 1].id : null;
  },

  floorLabelHtml(floorObj) {
    return `<div class="predio3d-floorlabel"><span>${floorObj.floor}</span><span>${this.statusLabel(floorObj.status)}</span></div>`;
  },

  renderTower(building, towerGroup, index, total) {
    const tower = document.createElement('div');
    tower.className = `predio3d-tower tower-${towerGroup.tower.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    if (total === 1) building.classList.add('predio3d-single');

    const floors = towerGroup.floors;
    const floorHeight = 28;
    const gap = 2;
    const maxY = 14;

    floors.forEach((floorObj, idx) => {
      const y = maxY + idx * (floorHeight + gap);
      const floor = document.createElement('div');
      const isActive = this.state.selected === floorObj.id;
      floor.className = `predio3d-floor predio3d-${floorObj.status}${isActive ? ' active' : ''}`;
      floor.style.bottom = `${y}px`;
      floor.innerHTML = `
        <div class="face front" onclick='predio3D.selectFloor(${JSON.stringify(floorObj.id)})'>
          ${this.floorLabelHtml(floorObj)}
          <div class="predio3d-windows predio3d-front-windows"></div>
        </div>
        <div class="face back">
          <div class="predio3d-floorlabel label-back"><span>${floorObj.floor}</span><span>${towerGroup.tower}</span></div>
          <div class="predio3d-windows predio3d-front-windows"></div>
        </div>
        <div class="face left"><div class="predio3d-windows predio3d-side-windows"></div></div>
        <div class="face right"><div class="predio3d-windows predio3d-side-windows"></div></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
      `;
      tower.appendChild(floor);
    });

    const crown = document.createElement('div');
    crown.style.cssText = `position:absolute;left:18px;bottom:${maxY + floors.length * (floorHeight + gap) + 6}px;width:152px;height:18px;transform-style:preserve-3d;`;
    crown.innerHTML = `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#8b4e2f 0%,#5a2b14 100%);border-radius:6px;transform:translateZ(26px);"></div>
      <div style="position:absolute;left:50%;top:-38px;transform:translateX(-50%) translateZ(26px);width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:38px solid #6f240f;"></div>
    `;
    tower.appendChild(crown);

    const towerLabel = document.createElement('div');
    towerLabel.style.cssText = 'position:absolute;left:50%;bottom:-28px;transform:translateX(-50%);background:rgba(255,255,255,.94);border:1px solid #dbe7f7;border-radius:999px;padding:.35rem .8rem;font-size:.82rem;font-weight:800;color:var(--blue-dark);box-shadow:0 8px 16px rgba(31,56,100,.08);';
    towerLabel.textContent = towerGroup.tower;
    tower.appendChild(towerLabel);

    building.appendChild(tower);
  },

  render() {
    this.buildTowerSelect();
    const towersData = this.getTowerFloorsData();
    const allFloors = towersData.flatMap(group => group.floors);
    this.ensureSelected(towersData);

    const building = document.getElementById('predio3dBuilding');
    const floorList = document.getElementById('predio3dFloorList');
    const details = document.getElementById('predio3dDetails');
    const selectedLabel = document.getElementById('predio3dSelectedLabel');
    const countFloors = document.getElementById('predio3dCountFloors');
    const countCritical = document.getElementById('predio3dCountCritical');
    if (!building || !floorList || !details || !selectedLabel || !countFloors || !countCritical) return;

    countFloors.textContent = String(allFloors.length);
    countCritical.textContent = String(allFloors.filter(f => f.status === 'vermelho').length);

    building.classList.toggle('predio3d-single', towersData.length <= 1);
    building.innerHTML = `
      <div class="predio3d-ground"></div>
      <div class="predio3d-podium">
        <div class="face top"></div>
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face left"></div>
        <div class="face right"></div>
      </div>
    `;
    building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    towersData.forEach((group, index) => this.renderTower(building, group, index, towersData.length));

    floorList.innerHTML = allFloors.length ? towersData.map(group => `
      <div>
        <div class="predio3d-floor-group-title">${group.tower}</div>
        ${group.floors.slice().reverse().map(f => `
          <div class="predio3d-floor-item ${this.state.selected === f.id ? 'active' : ''}" onclick='predio3D.selectFloor(${JSON.stringify(f.id)})'>
            <div>
              <div style="font-weight:700;color:var(--blue-dark)">${f.floor}</div>
              <div style="font-size:.82rem;color:var(--muted)">${f.items.length} item(ns)</div>
            </div>
            <span class="predio3d-badge">${this.statusLabel(f.status)}</span>
          </div>
        `).join('')}
      </div>
    `).join('') : '<div class="predio3d-empty">Nenhum pavimento encontrado.</div>';

    const selected = allFloors.find(f => f.id === this.state.selected);
    if (!selected) {
      selectedLabel.textContent = 'Selecione um pavimento';
      details.innerHTML = '<div class="predio3d-empty">Nenhum pavimento disponível.</div>';
    } else {
      selectedLabel.textContent = `${selected.tower} • ${selected.floor} • ${this.statusLabel(selected.status)}`;
      details.innerHTML = selected.items.length ? selected.items.map(item => `
        <div class="predio3d-details-item">
          <div style="display:flex;justify-content:space-between;gap:.8rem;">
            <strong>${item.servico || 'Serviço não informado'}</strong>
            <span class="predio3d-badge">${item.status || 'Planejado'}</span>
          </div>
          <div style="margin-top:.35rem;font-size:.88rem;color:var(--muted);">
            Torre: ${item.torre || selected.tower} • Pavimento: ${item.pavimento || selected.floor}
          </div>
          <div style="margin-top:.35rem;font-size:.88rem;color:var(--muted);">
            Material: ${item.material || '-'} • Início: ${item.dataServico || item['Início Planejado'] || item.dataNecessidade || '-'}
          </div>
        </div>
      `).join('') : `<div class="predio3d-empty" style="padding:1.25rem;">${selected.tower} • ${selected.floor}<br><span style="font-size:.9rem;">Ainda não há RT cadastrada para este pavimento.</span></div>`;
    }

    this.ensureControls();
  },

  selectFloor(floorId) {
    this.state.selected = floorId;
    this.render();
  },

  resetView() {
    this.state.rotateX = -18;
    this.state.rotateY = -34;
    this.state.scale = 1;
    this.render();
  },

  ensureControls() {
    if (this.controlsBound) return;
    const viewport = document.getElementById('predio3dViewport');
    if (!viewport) return;
    this.controlsBound = true;

    const onDown = (x, y) => {
      this.state.dragging = true;
      this.state.startX = x;
      this.state.startY = y;
      this.state.baseRotateX = this.state.rotateX;
      this.state.baseRotateY = this.state.rotateY;
      viewport.classList.add('dragging');
    };
    const onMove = (x, y) => {
      if (!this.state.dragging) return;
      const dx = x - this.state.startX;
      const dy = y - this.state.startY;
      this.state.rotateY = this.state.baseRotateY + dx * 0.3;
      this.state.rotateX = Math.max(-60, Math.min(8, this.state.baseRotateX - dy * 0.22));
      const building = document.getElementById('predio3dBuilding');
      if (building) building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    };
    const onUp = () => {
      this.state.dragging = false;
      viewport.classList.remove('dragging');
    };

    viewport.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    viewport.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);
    viewport.addEventListener('touchstart', (e) => { const t = e.touches[0]; onDown(t.clientX, t.clientY); }, { passive: true });
    viewport.addEventListener('touchmove', (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener('touchend', onUp);
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const next = this.state.scale + (e.deltaY < 0 ? 0.06 : -0.06);
      this.state.scale = Math.max(0.72, Math.min(1.52, next));
      const building = document.getElementById('predio3dBuilding');
      if (building) building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    }, { passive: false });
  },

  gerarPdf() {
    const floors = this.groupFloors();
    const rows = floors.map(f => `
      <tr>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${this.state.tower === 'all' ? '-' : this.state.tower}</td>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${f.floor}</td>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${this.statusLabel(f.status)}</td>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${f.items.length}</td>
      </tr>
    `).join('');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div style="font-family:Segoe UI,Arial,sans-serif;padding:22px;color:#1a2340;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2E75B6;padding-bottom:12px;margin-bottom:18px;">
          <div>
            <h1 style="margin:0;color:#1F3864;font-size:24px;">3D PRÉDIO</h1>
            <p style="margin:6px 0 0 0;color:#6b7a99;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          <div style="font-weight:700;color:#1F3864;">Plano & Plano</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:#1F3864;color:#fff;">
              <th style="padding:.6rem;border:1px solid #d7e2f2;">Torre</th>
              <th style="padding:.6rem;border:1px solid #d7e2f2;">Pavimento</th>
              <th style="padding:.6rem;border:1px solid #d7e2f2;">Status</th>
              <th style="padding:.6rem;border:1px solid #d7e2f2;">Itens</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="4" style="padding:.55rem;border:1px solid #d7e2f2;">Sem dados</td></tr>'}</tbody>
        </table>
      </div>
    `;
    html2pdf().set({
      margin: 0.35,
      filename: '3d-predio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).from(wrapper).save();
  }
};

// ── Aplicação Principal (Empréstimos) ──
const app = {
  STORAGE_KEY: 'controle_emprestimos_dados_final',
  STORAGE_KEY_MATERIAIS: 'controle_materiais_obra_dados',
  CORES: ["#2E75B6","#1F3864","#5BA4E0","#E84545","#F5A623","#27AE60","#8E44AD"],
  dados: [],
  editandoId: null,
  charts: {},
  _unsub: null,
  _isApplyingRemote: false,

  init() {
    console.log('Inicializando aplicação de empréstimos...');
    this.carregarDados().then(() => {
      this.atualizarUI();
      this.setupEventListeners();
      this.iniciarSyncAoVivo();
      console.log('Aplicação de empréstimos inicializada!');
    });
  },

  iniciarSyncAoVivo() {
    try {
      if (!window.__fb || !window.__fb.escutarMudancas) return;
      if (this._unsub) this._unsub();
      this._unsub = window.__fb.escutarMudancas((registros) => {
        if (this._isApplyingRemote) return;
        this._isApplyingRemote = true;
        this.dados = Array.isArray(registros) ? registros : [];
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados)); } catch(e) {}
        this.atualizarUI();
        this._isApplyingRemote = false;
      });
    } catch (e) {
      console.warn('Sync ao vivo indisponível:', e);
    }
  },

  setupEventListeners() {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal') this.fecharModal();
    });
  },

  async carregarDados() {
    try {
      if (window.__fb && window.__fb.carregarDaNuvem) {
        const cloud = await window.__fb.carregarDaNuvem();
        if (cloud && Array.isArray(cloud) && cloud.length) {
          this.dados = cloud;
          console.log('Dados de empréstimos carregados do Firebase:', this.dados.length);
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados)); } catch(e) {}
          return;
        }
      }

      const salvos = localStorage.getItem(this.STORAGE_KEY);
      if (salvos) {
        this.dados = JSON.parse(salvos);
        console.log('Dados de empréstimos carregados do localStorage:', this.dados.length);
        this.salvarDados();
        return;
      }

      this.dados = [
        { id:1, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:2, empresa:"Felipe Agosti", material:"Chapa de Madeirite OSB", data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:3, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-02-12", quantidade:150, status:"Em Aberto" },
        { id:4, empresa:"Felipe Agosti", material:"Tábua 30cm",             data:"2026-02-12", quantidade:50,  status:"Em Aberto" },
        { id:5, empresa:"Murilo",        material:"Pontalete",              data:"2026-02-04", quantidade:220, status:"Em Aberto" },
        { id:6, empresa:"Spera Urban",   material:"Pontalete",              data:"2025-02-03", quantidade:100, status:"Em Aberto" },
        { id:7, empresa:"Plano Purus",   material:"Tábua de 30cm",          data:"2026-02-06", quantidade:100, status:"Em Aberto" },
      ];
      this.salvarDados();
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      this.mostrarAlerta('Erro ao carregar dados. Usando dados padrão.', 'error');
    }
  },

  salvarDados() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados));
    } catch (e) {
      console.warn('Falha ao salvar cache local:', e);
    }

    try {
      if (this._isApplyingRemote) return;
      if (window.__fb && window.__fb.salvarNaNuvem) {
        window.__fb.salvarNaNuvem(this.dados).then(() => {
          console.log('Dados salvos no Firebase!');
        }).catch((e) => {
          console.error('Erro ao salvar no Firebase:', e);
        });
      }
    } catch (e) {
      console.warn('Falha ao salvar na nuvem:', e);
    }
  },

  mostrarAlerta(msg, tipo) {
    const alert = document.getElementById('alert');
    alert.textContent = msg;
    alert.className = `alert show alert-${tipo}`;
    setTimeout(() => alert.classList.remove('show'), 3000);
  },

  showSection(id, btn) {
    if (id === 'planejamento-rt' && !auth.pode('ver_planejamento_rt')) {
      app.mostrarAlerta('Somente Admin e GO podem acessar o Planejamento RT.', 'error');
      id = 'materiais-obra';
      btn = document.querySelector('nav button[data-section="materiais-obra"]');
    }
    if (id === 'rt-dia-dia' && !auth.pode('ver_rt_dia_dia')) {
      app.mostrarAlerta('Somente Admin e GO podem acessar RT do Dia a Dia.', 'error');
      id = 'materiais-obra';
      btn = document.querySelector('nav button[data-section="materiais-obra"]');
    }
    if (id === 'predio-3d' && !auth.pode('ver_predio_3d')) {
      app.mostrarAlerta('Somente Admin e GO podem acessar o 3D PRÉDIO.', 'error');
      id = 'materiais-obra';
      btn = document.querySelector('nav button[data-section="materiais-obra"]');
    }

    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const section = document.getElementById(id);
    if (section) section.classList.add('active');
    if (btn) btn.classList.add('active');

    const globalKpiGrid = document.getElementById('globalKpiGrid');
    if (globalKpiGrid) {
      globalKpiGrid.style.display = ['planejamento-rt','predio-3d','rt-dia-dia','materiais-obra','rastreabilidade'].includes(id) ? 'none' : 'grid';
    }

    if (id === 'relatorio') {
      this.gerarRelatorioPDF();
    }
    if (id === 'relatorio-dia' && window.appMateriais && typeof window.appMateriais.renderizarRelatorioDia === 'function') {
      window.appMateriais.renderizarRelatorioDia();
    }
    if (id === 'rastreabilidade' && window.appMateriais && typeof window.appMateriais.renderizarRastreabilidadeCompleta === 'function') {
      window.appMateriais.renderizarRastreabilidadeCompleta();
    }
    if (id === 'planejamento-rt' && window.appRT && typeof window.appRT.renderizar === 'function') {
      window.appRT.renderizar();
    }
    if (id === 'rt-dia-dia' && window.appRT && typeof window.appRT.renderizarDiaDia === 'function') {
      window.appRT.renderizarDiaDia();
    }
    if (id === 'predio-3d' && window.predio3D && typeof window.predio3D.render === 'function') {
      window.predio3D.render();
    }
    atualizarBotaoMobile(id);
  },

  abrirModalNovo() {
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode cadastrar materiais.', 'error');
      return;
    }
    this.editandoId = null;
    document.getElementById('modalTitle').textContent = 'Novo Registro';
    document.getElementById('formRegistro').reset();
    document.getElementById('modal').classList.add('active');
    atualizarBotaoMobile();
  },

  abrirModalEditar(id) {
    if (!auth.pode('editar_emprestimos')) {
      this.mostrarAlerta('Seu perfil não pode editar registros de empréstimo.', 'error');
      return;
    }
    const reg = this.dados.find(d => d.id === id);
    if (!reg) return;
    this.editandoId = id;
    document.getElementById('modalTitle').textContent = 'Editar Registro';
    document.getElementById('empresa').value = reg.empresa;
    document.getElementById('material').value = reg.material;
    document.getElementById('data').value = reg.data;
    document.getElementById('quantidade').value = reg.quantidade;
    document.getElementById('modal').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModal() {
    document.getElementById('modal').classList.remove('active');
    this.editandoId = null;
    atualizarBotaoMobile();
  },

  salvarRegistro(e) {
    e.preventDefault();
    const empresa = document.getElementById('empresa').value.trim();
    const material = document.getElementById('material').value.trim();
    const data = document.getElementById('data').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (!empresa || !material || !data || !quantidade) {
      this.mostrarAlerta('Preencha todos os campos!', 'error');
      return;
    }

    if (this.editandoId) {
      const idx = this.dados.findIndex(d => d.id === this.editandoId);
      if (idx !== -1) {
        this.dados[idx] = { ...this.dados[idx], empresa, material, data, quantidade };
      }
    } else {
      const novoId = Math.max(...this.dados.map(d => d.id), 0) + 1;
      this.dados.push({ id: novoId, empresa, material, data, quantidade, status: "Em Aberto" });
    }

    this.fecharModal();
    this.salvarDados();
    this.atualizarUI();
    this.mostrarAlerta('Registro salvo com sucesso!', 'success');
  },

  deletarRegistro(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
      this.dados = this.dados.filter(d => d.id !== id);
      this.salvarDados();
      this.atualizarUI();
      this.mostrarAlerta('Registro deletado com sucesso!', 'success');
    }
  },

  alterarStatus(id) {
    const reg = this.dados.find(d => d.id === id);
    if (!reg) return;
    
    const statusOpcoes = ["Em Aberto", "Parcial", "Concluído"];
    const indiceAtual = statusOpcoes.indexOf(reg.status);
    reg.status = statusOpcoes[(indiceAtual + 1) % statusOpcoes.length];
    
    this.salvarDados();
    this.atualizarUI();
    this.mostrarAlerta(`Status alterado para: ${reg.status}`, 'success');
  },

  agrupar(campo) {
    return this.dados.reduce((acc, d) => {
      acc[d[campo]] = (acc[d[campo]] || 0) + d.quantidade;
      return acc;
    }, {});
  },

  filtrarTabela() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filterEmpresa = document.getElementById('filterEmpresa').value;
    const filterMaterial = document.getElementById('filterMaterial').value;
    const filterStatus = document.getElementById('filterStatus').value;

    const filtrados = this.dados.filter(d => {
      const matchSearch = d.empresa.toLowerCase().includes(search) || d.material.toLowerCase().includes(search);
      const matchEmpresa = !filterEmpresa || d.empresa === filterEmpresa;
      const matchMaterial = !filterMaterial || d.material === filterMaterial;
      const matchStatus = !filterStatus || d.status === filterStatus;
      return matchSearch && matchEmpresa && matchMaterial && matchStatus;
    });

    this.renderizarTabela(filtrados);
  },

  renderizarTabela(dados = this.dados) {
    const tbody = document.getElementById('tabelaRegistros');
    tbody.innerHTML = '';

    dados.forEach((d, i) => {
      const dataFormatada = new Date(d.data + 'T00:00:00').toLocaleDateString('pt-BR');
      const statusClass = `badge-${d.status.toLowerCase().replace('á', 'a').replace('í', 'i')}`;
      
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.empresa}</td>
          <td>${d.material}</td>
          <td>${dataFormatada}</td>
          <td>${d.quantidade}</td>
          <td><span class="badge ${statusClass}" onclick="app.alterarStatus(${d.id})">${d.status}</span></td>
          <td>
            <div class="action-btns">
              <button class="edit-btn" onclick="app.abrirModalEditar(${d.id})">✏️ Editar</button>
              <button class="delete-btn" onclick="app.deletarRegistro(${d.id})">🗑️ Deletar</button>
            </div>
          </td>
        </tr>
      `;
    });
  },

  atualizarUI() {
    const total = this.dados.reduce((s, d) => s + d.quantidade, 0);
    const empresas = new Set(this.dados.map(d => d.empresa)).size;
    const materiais = new Set(this.dados.map(d => d.material)).size;
    const concluidos = this.dados.filter(d => d.status === "Concluído").length;

    document.getElementById('kpiTotal').textContent = total;
    document.getElementById('kpiEmpresas').textContent = empresas;
    document.getElementById('kpiMateriais').textContent = materiais;
    document.getElementById('kpiConcluidos').textContent = concluidos;

    this.renderizarTabela();
    this.atualizarFiltros();
    this.atualizarGraficos();
  },

  atualizarFiltros() {
    const empresas = [...new Set(this.dados.map(d => d.empresa))].sort();
    const materiais = [...new Set(this.dados.map(d => d.material))].sort();

    const filterEmpresa = document.getElementById('filterEmpresa');
    const filterMaterial = document.getElementById('filterMaterial');

    filterEmpresa.innerHTML = '<option value="">Todas as empresas</option>';
    filterMaterial.innerHTML = '<option value="">Todos os materiais</option>';

    empresas.forEach(e => {
      filterEmpresa.innerHTML += `<option value="${e}">${e}</option>`;
    });

    materiais.forEach(m => {
      filterMaterial.innerHTML += `<option value="${m}">${m}</option>`;
    });
  },

  atualizarGraficos() {
    if (!document.getElementById('chartData')) return;

    const porEmpresa  = this.agrupar('empresa');
    const porMaterial = this.agrupar('material');
    const total = this.dados.reduce((s, d) => s + d.quantidade, 0);

    Object.values(this.charts).forEach(c => c?.destroy?.());
    this.charts = {};

    const porData = this.dados.reduce((acc, d) => {
      const key = `${d.data} – ${d.empresa}`;
      acc[key] = (acc[key] || 0) + d.quantidade;
      return acc;
    }, {});

    this.charts.data = new Chart(document.getElementById('chartData'), {
      type: 'bar',
      data: { labels: Object.keys(porData),
        datasets: [{ label: 'Quantidade', data: Object.values(porData), backgroundColor: this.CORES, borderRadius: 8, borderSkipped: false }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { font: { size: 10 }, maxRotation: 30 }, grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#e8edf5' } }
        }
      }
    });

    const statusCounts = {
      'Em Aberto': this.dados.filter(d => d.status === 'Em Aberto').length,
      'Parcial': this.dados.filter(d => d.status === 'Parcial').length,
      'Concluído': this.dados.filter(d => d.status === 'Concluído').length
    };

    this.charts.status = new Chart(document.getElementById('chartStatus'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#E84545', '#F5A623', '#27AE60'],
          borderRadius: 8
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });

    this.charts.empresaBar = new Chart(document.getElementById('chartEmpresaBar'), {
      type: 'bar',
      data: { labels: Object.keys(porEmpresa),
        datasets: [{ label: 'Total de Itens', data: Object.values(porEmpresa), backgroundColor: this.CORES, borderRadius: 10, borderSkipped: false }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, grid: { color: '#e8edf5' } }, y: { grid: { display: false } } }
      }
    });

    this.charts.materialBar = new Chart(document.getElementById('chartMaterialBar'), {
      type: 'bar',
      data: { labels: Object.keys(porMaterial),
        datasets: [{ label: 'Total de Itens', data: Object.values(porMaterial), backgroundColor: this.CORES, borderRadius: 10, borderSkipped: false }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, grid: { color: '#e8edf5' } }, y: { grid: { display: false } } }
      }
    });

    const peDiv = document.getElementById('progressEmpresas');
    peDiv.innerHTML = '';
    Object.entries(porEmpresa).sort((a,b) => b[1]-a[1]).forEach(([emp, qtd], i) => {
      const pct = (qtd/total*100).toFixed(1);
      peDiv.innerHTML += `
        <div class="progress-item">
          <label><span>${emp}</span><span>${qtd} itens (${pct}%)</span></label>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%; background: linear-gradient(90deg, ${this.CORES[i]}, ${this.CORES[(i+1)%this.CORES.length]})"></div>
          </div>
        </div>`;
    });

    const pmDiv = document.getElementById('progressMateriais');
    pmDiv.innerHTML = '';
    Object.entries(porMaterial).sort((a,b) => b[1]-a[1]).forEach(([mat, qtd], i) => {
      const pct = (qtd/total*100).toFixed(1);
      pmDiv.innerHTML += `
        <div class="progress-item">
          <label><span>${mat}</span><span>${qtd} itens (${pct}%)</span></label>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%; background: linear-gradient(90deg, ${this.CORES[i]}, ${this.CORES[(i+1)%this.CORES.length]})"></div>
          </div>
        </div>`;
    });
  },

  gerarRelatorioPDF() {
    const porEmpresa  = this.agrupar('empresa');
    const porMaterial = this.agrupar('material');
    const total = this.dados.reduce((s, d) => s + d.quantidade, 0);
    const abertos = this.dados.filter(d => d.status === "Em Aberto").length;
    const parciais = this.dados.filter(d => d.status === "Parcial").length;
    const concluidos = this.dados.filter(d => d.status === "Concluído").length;

    let html = `
      <div class="pdf-header">
        <img src="./logo.png" alt="Plano & Plano" />
        <div class="pdf-header-text">
          <h2>Relatório de Materiais em Empréstimo</h2>
          <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </div>

      <div class="pdf-stats">
        <div class="pdf-stat-box"><span class="value">${total}</span><span class="label">Total de Itens</span></div>
        <div class="pdf-stat-box"><span class="value">${abertos}</span><span class="label">Em Aberto</span></div>
        <div class="pdf-stat-box"><span class="value">${parciais}</span><span class="label">Parcial</span></div>
        <div class="pdf-stat-box"><span class="value">${concluidos}</span><span class="label">Concluído</span></div>
      </div>

      <div class="pdf-section">
        <h3>Principais Empresas Credoras</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #1F3864; color: #fff;">
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Empresa</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Quantidade</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Percentual</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(porEmpresa).sort((a,b) => b[1]-a[1]).map(([emp, qtd]) => `
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #ddd;">${emp}</td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;"><strong>${qtd}</strong></td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">${(qtd/total*100).toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pdf-section">
        <h3>Materiais em Circulação</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #1F3864; color: #fff;">
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Material</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Quantidade</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Percentual</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(porMaterial).sort((a,b) => b[1]-a[1]).map(([mat, qtd]) => `
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #ddd;">${mat}</td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;"><strong>${qtd}</strong></td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">${(qtd/total*100).toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pdf-section">
        <h3>Todos os Registros</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #1F3864; color: #fff;">
              <th style="padding: 0.6rem; text-align: left; border: 1px solid #ddd;">Empresa</th>
              <th style="padding: 0.6rem; text-align: left; border: 1px solid #ddd;">Material</th>
              <th style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">Data</th>
              <th style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">Qtd</th>
              <th style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.dados.map(d => {
              const dataFormatada = new Date(d.data + 'T00:00:00').toLocaleDateString('pt-BR');
              return `
              <tr>
                <td style="padding: 0.6rem; border: 1px solid #ddd;">${d.empresa}</td>
                <td style="padding: 0.6rem; border: 1px solid #ddd;">${d.material}</td>
                <td style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">${dataFormatada}</td>
                <td style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;"><strong>${d.quantidade}</strong></td>
                <td style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">${d.status}</td>
              </tr>
            `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pdf-container').innerHTML = html;
  },

  exportarPDF() {
    const elemento = document.getElementById('pdf-container');
    const opt = {
      margin: 10,
      filename: `relatorio_materiais_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(elemento).save();
    this.mostrarAlerta('PDF gerado com sucesso!', 'success');
  },

  exportarCSV() {
    let csv = 'ID,Empresa,Material,Data do Empréstimo,Quantidade,Status\n';
    this.dados.forEach(d => {
      csv += `${d.id},"${d.empresa}","${d.material}","${d.data}",${d.quantidade},"${d.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `controle_emprestimos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    this.mostrarAlerta('Arquivo CSV exportado com sucesso!', 'success');
  },

  resetarDados() {
    if (confirm('Tem certeza que deseja resetar TODOS os dados para o padrão inicial? Esta ação não pode ser desfeita!')) {
      try { localStorage.removeItem(this.STORAGE_KEY); } catch(e) {}
      this.dados = [
        { id:1, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:2, empresa:"Felipe Agosti", material:"Chapa de Madeirite OSB", data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:3, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-02-12", quantidade:150, status:"Em Aberto" },
        { id:4, empresa:"Felipe Agosti", material:"Tábua 30cm",             data:"2026-02-12", quantidade:50,  status:"Em Aberto" },
        { id:5, empresa:"Murilo",        material:"Pontalete",              data:"2026-02-04", quantidade:220, status:"Em Aberto" },
        { id:6, empresa:"Spera Urban",   material:"Pontalete",              data:"2025-02-03", quantidade:100, status:"Em Aberto" },
        { id:7, empresa:"Plano Purus",   material:"Tábua de 30cm",          data:"2026-02-06", quantidade:100, status:"Em Aberto" },
      ];
      this.salvarDados();
      this.atualizarUI();
      this.mostrarAlerta('Dados resetados para o padrão inicial!', 'success');
    }
  }
};

// ── Aplicação de Controle de Materiais da Obra ──
const appMateriais = {
  STORAGE_KEY: 'controle_materiais_obra_dados',
  STORAGE_KEY_MOV: 'controle_materiais_movimentacoes',
  materiais: [],
  movimentacoes: [],
  editandoId: null,
  _unsub: null,
  _unsubMov: null,

  init() {
    console.log('Inicializando aplicação de materiais da obra...');
    Promise.all([this.carregarMateriais(), this.carregarMovimentacoes()]).then(() => {
      this.setupEventListeners();
      this.buscarMateriais();
      this.preencherMateriaisRastreabilidade();
      this.preencherDataRastreabilidade();
      this.renderizarRelatorioDia();
      this.aplicarPermissoesVisuais();
      this.iniciarSyncAoVivo();
    });
  },

  iniciarSyncAoVivo() {
    try {
      if (window.__fb && window.__fb.escutarMudancasMateriais) {
        if (this._unsub) this._unsub();
        this._unsub = window.__fb.escutarMudancasMateriais((materiais) => {
          this.materiais = Array.isArray(materiais) ? materiais : [];
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.materiais)); } catch(e) {}
          this.buscarMateriais();
          this.preencherMateriaisRastreabilidade();
          this.renderizarRelatorioDia();
        });
      }
      if (window.__fb && window.__fb.escutarMudancasMovimentacoes) {
        if (this._unsubMov) this._unsubMov();
        this._unsubMov = window.__fb.escutarMudancasMovimentacoes((movimentacoes) => {
          this.movimentacoes = Array.isArray(movimentacoes) ? movimentacoes : [];
          try { localStorage.setItem(this.STORAGE_KEY_MOV, JSON.stringify(this.movimentacoes)); } catch(e) {}
          this.renderizarRelatorioDia();
          this.renderizarMovimentacoes();
          this.renderizarRastreabilidadeCompleta();
        });
      }
    } catch (e) {
      console.warn('Sync ao vivo de materiais indisponível:', e);
    }
  },

  setupEventListeners() {
    const modal = document.getElementById('modalMateriais');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modalMateriais') this.fecharModal();
    });
    const modalRetirada = document.getElementById('modalRetirada');
    if (modalRetirada) {
      modalRetirada.addEventListener('click', (e) => {
        if (e.target.id === 'modalRetirada') this.fecharModalRetirada();
      });
    }

    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');
    if (fotoInput) fotoInput.addEventListener('change', (e) => this.previewImagem(e));
    if (fotoInputCamera) fotoInputCamera.addEventListener('change', (e) => this.previewImagem(e));
  },

  async carregarMateriais() {
    try {
      if (window.__fb && window.__fb.carregarMateriaisDaNuvem) {
        const cloud = await window.__fb.carregarMateriaisDaNuvem();
        if (Array.isArray(cloud) && cloud.length) {
          this.materiais = cloud;
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.materiais)); } catch(e) {}
          console.log('Materiais carregados do Firebase:', this.materiais.length);
          return;
        }
      }
      const salvos = localStorage.getItem(this.STORAGE_KEY);
      if (salvos) {
        this.materiais = JSON.parse(salvos);
        console.log('Materiais carregados do localStorage:', this.materiais.length);
      } else {
        this.materiais = [];
      }
    } catch (e) {
      console.error('Erro ao carregar materiais:', e);
      this.materiais = [];
    }
  },


  async carregarMovimentacoes() {
    try {
      if (window.__fb && window.__fb.carregarMovimentacoesDaNuvem) {
        const cloud = await window.__fb.carregarMovimentacoesDaNuvem();
        if (Array.isArray(cloud)) {
          this.movimentacoes = cloud;
          try { localStorage.setItem(this.STORAGE_KEY_MOV, JSON.stringify(this.movimentacoes)); } catch(e) {}
          return;
        }
      }
      const salvos = localStorage.getItem(this.STORAGE_KEY_MOV);
      this.movimentacoes = salvos ? JSON.parse(salvos) : [];
    } catch (e) {
      console.error('Erro ao carregar movimentações:', e);
      this.movimentacoes = [];
    }
  },

  async salvarMovimentacoes() {
    try {
      localStorage.setItem(this.STORAGE_KEY_MOV, JSON.stringify(this.movimentacoes));
      if (window.__fb && window.__fb.salvarMovimentacoesNaNuvem) {
        await window.__fb.salvarMovimentacoesNaNuvem(this.movimentacoes);
      }
    } catch (e) {
      console.error('Erro ao salvar movimentações:', e);
      app.mostrarAlerta('Erro ao salvar rastreabilidade!', 'error');
    }
  },

  aplicarPermissoesVisuais() {
    const role = window.currentUser?.role || 'admin';
    const materiaisSection = document.getElementById('materiais-obra');
    if (!materiaisSection) return;
    const btnNovo = materiaisSection.querySelector('.btn.btn-primary');
    const btnRelDia = materiaisSection.querySelector('.btn.btn-success');
    const btnRelCompleto = materiaisSection.querySelector('.btn.btn-warning');
    if (btnNovo) btnNovo.style.display = auth.pode('editar_materiais') ? 'inline-flex' : 'none';
    if (btnRelDia) btnRelDia.style.display = auth.pode('ver_relatorio_dia') ? 'inline-flex' : 'none';
    if (btnRelCompleto) btnRelCompleto.style.display = auth.pode('ver_relatorio_completo') ? 'inline-flex' : 'none';
    const search = document.getElementById('searchMateriais');
    const filterData = document.getElementById('filterDataMateriais');
    if (search) search.disabled = false;
    if (filterData) filterData.disabled = false;
  },

  async salvarMateriais() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.materiais));
      if (window.__fb && window.__fb.salvarMateriaisNaNuvem) {
        await window.__fb.salvarMateriaisNaNuvem(this.materiais);
      }
      console.log('Materiais salvos com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar materiais:', e);
      app.mostrarAlerta('Erro ao salvar materiais!', 'error');
    }
  },

  async comprimirImagem(file) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const maxWidth = 900;
            const maxHeight = 900;
            let { width, height } = img;

            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.72;
            let output = canvas.toDataURL('image/jpeg', quality);
            while (output.length > 350000 && quality > 0.45) {
              quality -= 0.07;
              output = canvas.toDataURL('image/jpeg', quality);
            }
            resolve(output);
          };
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  },

  previewImagem(e) {
    const file = e.target.files && e.target.files[0];
    const preview = document.getElementById('imagemPreview');
    const previewImg = document.getElementById('imagemPreviewImg');

    if (!file) {
      previewImg.src = '';
      preview.style.display = 'none';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      previewImg.src = event.target.result;
      preview.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  },

  abrirModalNovo() {
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode cadastrar materiais.', 'error');
      return;
    }
    this.editandoId = null;
    document.getElementById('modalMateriaisTitle').textContent = 'Novo Material';
    document.getElementById('formMateriais').reset();
    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');
    if (fotoInput) fotoInput.value = '';
    if (fotoInputCamera) fotoInputCamera.value = '';
    document.getElementById('imagemPreviewImg').src = '';
    document.getElementById('imagemPreview').style.display = 'none';
    document.getElementById('modalMateriais').classList.add('active');
    atualizarBotaoMobile();
  },

  abrirModalEditar(id) {
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode editar materiais.', 'error');
      return;
    }
    const mat = this.materiais.find(m => m.id === id);
    if (!mat) return;
    
    this.editandoId = id;
    document.getElementById('modalMateriaisTitle').textContent = 'Editar Material';
    document.getElementById('nomeMaterial').value = mat.nome;
    document.getElementById('quantidadeMaterial').value = mat.quantidade;
    document.getElementById('especificacoes').value = mat.especificacoes || '';
    
    if (mat.foto) {
      const previewImg = document.getElementById('imagemPreviewImg');
      previewImg.src = mat.foto;
      document.getElementById('imagemPreview').style.display = 'flex';
    }
    
    document.getElementById('modalMateriais').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModal() {
    document.getElementById('modalMateriais').classList.remove('active');
    atualizarBotaoMobile();
    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');
    if (fotoInput) fotoInput.value = '';
    if (fotoInputCamera) fotoInputCamera.value = '';
    this.editandoId = null;
  },

  async salvarMaterial(e) {
    e.preventDefault();
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode salvar materiais.', 'error');
      return;
    }
    const nome = document.getElementById('nomeMaterial').value.trim();
    const quantidade = parseInt(document.getElementById('quantidadeMaterial').value);
    const especificacoes = document.getElementById('especificacoes').value.trim();
    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');

    if (!nome || !quantidade) {
      app.mostrarAlerta('Preencha os campos obrigatórios!', 'error');
      return;
    }

    const arquivoSelecionado =
      (fotoInput && fotoInput.files && fotoInput.files[0]) ||
      (fotoInputCamera && fotoInputCamera.files && fotoInputCamera.files[0]);

    let foto = null;
    if (arquivoSelecionado) {
      try {
        foto = await this.comprimirImagem(arquivoSelecionado);
        this.finalizarSalvamento(nome, quantidade, especificacoes, foto);
      } catch (error) {
        console.error('Erro ao comprimir imagem:', error);
        app.mostrarAlerta('Não foi possível processar a imagem.', 'error');
      }
    } else if (this.editandoId) {
      const mat = this.materiais.find(m => m.id === this.editandoId);
      foto = mat?.foto || null;
      this.finalizarSalvamento(nome, quantidade, especificacoes, foto);
    } else {
      this.finalizarSalvamento(nome, quantidade, especificacoes, null);
    }
  },

  finalizarSalvamento(nome, quantidade, especificacoes, foto) {
    if (this.editandoId) {
      const idx = this.materiais.findIndex(m => m.id === this.editandoId);
      if (idx !== -1) {
        this.materiais[idx] = {
          ...this.materiais[idx],
          nome,
          quantidade,
          especificacoes,
          foto: foto || this.materiais[idx].foto,
          dataAtualizacao: new Date().toISOString()
        };
      }
    } else {
      const novoId = Math.max(...this.materiais.map(m => m.id || 0), 0) + 1;
      this.materiais.push({
        id: novoId,
        nome,
        quantidade,
        especificacoes,
        foto,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      });
    }

    this.fecharModal();
    this.salvarMateriais().then(() => {
      this.buscarMateriais();
      app.mostrarAlerta('Material salvo com sucesso!', 'success');
    });
  },

  deletarMaterial(id) {
    if (!auth.pode('deletar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode deletar materiais.', 'error');
      return;
    }
    if (confirm('Tem certeza que deseja deletar este material?')) {
      this.materiais = this.materiais.filter(m => m.id !== id);
      this.salvarMateriais().then(() => {
        this.buscarMateriais();
        app.mostrarAlerta('Material deletado com sucesso!', 'success');
      });
    }
  },

  filtrarMateriais() {
    const search = document.getElementById('searchMateriais').value.toLowerCase();
    const data = document.getElementById('filterDataMateriais').value;

    const filtrados = this.materiais.filter(m => {
      const matchSearch = m.nome.toLowerCase().includes(search);
      const matchData = !data || m.dataAtualizacao.split('T')[0] === data;
      return matchSearch && matchData;
    });

    this.renderizarMateriais(filtrados);
  },

  buscarMateriais() {
    this.renderizarMateriais(this.materiais);
  },

  renderizarMateriais(materiais = this.materiais) {
    const container = document.getElementById('materiaisContainer');
    
    if (materiais.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">Nenhum material cadastrado.</p>';
      return;
    }

    const podeEditar = auth.pode('editar_materiais');
    const podeRetirar = auth.pode('registrar_retirada');

    container.innerHTML = materiais.map(m => {
      const dataFormatada = new Date(m.dataAtualizacao).toLocaleDateString('pt-BR');
      const horaFormatada = new Date(m.dataAtualizacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const ultimaMov = this.movimentacoes.filter(x => x.materialId === m.id).sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora))[0];
      
      return `
        <div class="material-card">
          <div class="material-card-image">
            ${m.foto ? `<img src="${m.foto}" alt="${m.nome}" />` : '📦'}
          </div>
          <div class="material-card-content">
            <h3>${m.nome}</h3>
            ${m.especificacoes ? `<p>${m.especificacoes}</p>` : ''}
            <div class="material-qty">
              <div>
                <div class="material-qty-value">${m.quantidade}</div>
                <div class="material-qty-label">Saldo em estoque</div>
              </div>
            </div>
            <div class="material-date">📅 ${dataFormatada} às ${horaFormatada}</div>
            ${ultimaMov ? `<div class="material-date">🧾 Última retirada: ${ultimaMov.responsavel} - ${ultimaMov.quantidade} un.</div>` : ''}
            <div class="material-actions">
              ${podeRetirar ? `<button class="btn btn-warning" onclick="appMateriais.abrirModalRetirada(${m.id})">📤 Registrar Retirada</button>` : ''}
              ${podeEditar ? `<button class="edit-btn" onclick="appMateriais.abrirModalEditar(${m.id})">✏️ Editar</button>` : ''}
              ${podeEditar ? `<button class="delete-btn" onclick="appMateriais.deletarMaterial(${m.id})">🗑️ Deletar</button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.renderizarMovimentacoes();
  },

  abrirModalRetirada(id) {
    if (!auth.pode('registrar_retirada')) {
      app.mostrarAlerta('Seu perfil não pode registrar retiradas.', 'error');
      return;
    }
    const mat = this.materiais.find(m => m.id === id);
    if (!mat) return;
    document.getElementById('retiradaMaterialId').value = mat.id;
    document.getElementById('retiradaMaterialNome').value = `${mat.nome} (saldo: ${mat.quantidade})`;
    document.getElementById('formRetirada').reset();
    document.getElementById('retiradaMaterialId').value = mat.id;
    document.getElementById('retiradaMaterialNome').value = `${mat.nome} (saldo: ${mat.quantidade})`;
    document.getElementById('modalRetirada').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModalRetirada() {
    document.getElementById('modalRetirada').classList.remove('active');
    atualizarBotaoMobile();
    document.getElementById('formRetirada').reset();
  },

  async salvarRetirada(e) {
    e.preventDefault();
    if (!auth.pode('registrar_retirada')) {
      app.mostrarAlerta('Seu perfil não pode registrar retiradas.', 'error');
      return;
    }
    const materialId = Number(document.getElementById('retiradaMaterialId').value);
    const quantidade = Number(document.getElementById('retiradaQuantidade').value);
    const responsavel = document.getElementById('retiradaResponsavel').value.trim();
    const funcao = document.getElementById('retiradaFuncao').value.trim();
    const setor = document.getElementById('retiradaSetor').value.trim();
    const motivo = document.getElementById('retiradaMotivo').value.trim();
    const observacoes = document.getElementById('retiradaObservacoes').value.trim();
    const material = this.materiais.find(m => m.id === materialId);
    if (!material) {
      app.mostrarAlerta('Material não encontrado.', 'error');
      return;
    }
    if (!quantidade || quantidade < 1 || quantidade > Number(material.quantidade || 0)) {
      app.mostrarAlerta('Quantidade inválida para retirada.', 'error');
      return;
    }
    if (!responsavel || !motivo) {
      app.mostrarAlerta('Informe quem retirou e o motivo.', 'error');
      return;
    }

    material.quantidade = Number(material.quantidade || 0) - quantidade;
    material.dataAtualizacao = new Date().toISOString();

    const novaMov = {
      id: Date.now(),
      materialId: material.id,
      materialNome: material.nome,
      quantidade,
      responsavel,
      funcao,
      setor,
      motivo,
      observacoes,
      dataHora: new Date().toISOString(),
      lancadoPor: window.currentUser?.username || 'sistema'
    };

    this.movimentacoes.unshift(novaMov);
    await this.salvarMateriais();
    await this.salvarMovimentacoes();
    this.fecharModalRetirada();
    this.buscarMateriais();
    this.renderizarRelatorioDia();
    app.mostrarAlerta('Retirada registrada com sucesso!', 'success');
  },

  renderizarMovimentacoes() {
    const section = document.getElementById('materiais-obra');
    if (!section) return;
    let box = document.getElementById('movimentacoesContainer');
    if (!box) {
      box = document.createElement('div');
      box.id = 'movimentacoesContainer';
      box.className = 'card';
      section.appendChild(box);
    }
    if (!auth.pode('ver_rastreabilidade')) {
      box.style.display = 'none';
      return;
    }
    box.style.display = 'block';
    const itens = this.movimentacoes.slice().sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora)).slice(0, 20);
    box.innerHTML = `<h2>🧾 Últimas Retiradas</h2>
      <div class="btn-group" style="margin-bottom:1rem;">
        ${auth.pode('ver_relatorio_completo') ? `<button class="btn btn-warning" onclick="appMateriais.gerarRelatorioCompleto()">📊 Relatório Completo</button>` : ''}
        <button class="btn btn-secondary" onclick="app.showSection('rastreabilidade', document.querySelector('nav button[data-section=&quot;rastreabilidade&quot;]'))">📋 Ver Rastreabilidade Completa</button>
      </div>
      ${itens.length ? `<div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Material</th><th>Qtd.</th><th>Quem retirou</th><th>Função/Setor</th><th>Motivo</th><th>Lançado por</th><th>Ações</th></tr></thead><tbody>${itens.map(m => `<tr><td>${new Date(m.dataHora).toLocaleString('pt-BR')}</td><td>${m.materialNome}</td><td>${m.quantidade}</td><td>${m.responsavel}</td><td>${[m.funcao,m.setor].filter(Boolean).join(' / ') || '-'}</td><td>${m.motivo}${m.observacoes ? `<br><small>${m.observacoes}</small>` : ''}</td><td>${m.lancadoPor}</td><td>${auth.pode('excluir_rastreabilidade') ? `<button class="btn btn-danger" onclick="appMateriais.excluirMovimentacao(${m.id})">Excluir</button>` : `<span style="color:#6b7a99;">Somente admin</span>`}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhuma retirada registrada ainda.</p>`}`;
  },

  obterMovimentacoesFiltradas() {
    const data = document.getElementById('rastFiltroData')?.value || '';
    const material = (document.getElementById('rastFiltroMaterial')?.value || '').toLowerCase().trim();
    const pessoa = (document.getElementById('rastFiltroPessoa')?.value || '').toLowerCase().trim();
    const setor = (document.getElementById('rastFiltroSetor')?.value || '').toLowerCase().trim();
    return this.movimentacoes.slice().sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora)).filter(m => {
      const dataOk = !data || (m.dataHora || '').split('T')[0] === data;
      const materialOk = !material || (m.materialNome || '').toLowerCase().includes(material);
      const pessoaOk = !pessoa || (m.responsavel || '').toLowerCase().includes(pessoa) || (m.lancadoPor || '').toLowerCase().includes(pessoa);
      const setorTexto = [m.setor, m.funcao].filter(Boolean).join(' ').toLowerCase();
      const setorOk = !setor || setorTexto.includes(setor);
      return dataOk && materialOk && pessoaOk && setorOk;
    });
  },

  preencherDataRastreabilidade() {
    const input = document.getElementById('rastDataHora');
    if (!input) return;
    const agora = new Date();
    const local = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000).toISOString().slice(0,16);
    input.value = local;
  },

  preencherMateriaisRastreabilidade() {
    const list = document.getElementById('rastMateriaisList');
    if (!list) return;
    list.innerHTML = this.materiais
      .slice()
      .sort((a,b) => String(a.nome || '').localeCompare(String(b.nome || ''), 'pt-BR', { sensitivity: 'base' }))
      .map(m => `<option value="${String(m.nome || '').replace(/"/g, '&quot;')}"></option>`)
      .join('');
  },

  async salvarRastreabilidadeManual(e) {
    e.preventDefault();
    if (!auth.pode('registrar_retirada')) {
      app.mostrarAlerta('Seu perfil não pode lançar rastreabilidade.', 'error');
      return;
    }

    const materialNome = document.getElementById('rastMaterialNome').value.trim();
    const quantidade = Number(document.getElementById('rastQuantidade').value);
    const responsavel = document.getElementById('rastResponsavel').value.trim();
    const dataHoraRaw = document.getElementById('rastDataHora').value;
    const funcao = document.getElementById('rastFuncao').value.trim();
    const setor = document.getElementById('rastSetor').value.trim();
    const motivo = document.getElementById('rastMotivo').value.trim();
    const observacoes = document.getElementById('rastObservacoes').value.trim();

    if (!materialNome || !quantidade || quantidade < 1 || !responsavel || !dataHoraRaw || !motivo) {
      app.mostrarAlerta('Preencha os campos obrigatórios da rastreabilidade.', 'error');
      return;
    }

    const materialEncontrado = this.materiais.find(m => String(m.nome || '').toLowerCase() === materialNome.toLowerCase());
    const novaMov = {
      id: Date.now(),
      materialId: materialEncontrado ? materialEncontrado.id : null,
      materialNome,
      quantidade,
      responsavel,
      funcao,
      setor,
      motivo,
      observacoes,
      dataHora: new Date(dataHoraRaw).toISOString(),
      lancadoPor: window.currentUser?.username || 'sistema',
      origem: 'rastreabilidade_manual'
    };

    this.movimentacoes.unshift(novaMov);
    await this.salvarMovimentacoes();
    const form = document.getElementById('formRastreabilidade');
    if (form) form.reset();
    this.preencherDataRastreabilidade();
    this.renderizarMovimentacoes();
    this.renderizarRastreabilidadeCompleta();
    this.renderizarRelatorioDia();
    app.mostrarAlerta('Rastreabilidade lançada com sucesso!', 'success');
  },

  renderizarRastreabilidadeCompleta() {
    const container = document.getElementById('rastreabilidadeCompletaContainer');
    if (!container) return;
    const formRast = document.getElementById('formRastreabilidade');
    if (formRast) formRast.closest('.card').style.display = auth.pode('registrar_retirada') ? '' : 'none';
    if (!auth.pode('ver_rastreabilidade')) {
      container.innerHTML = '<p style="color:#6b7a99;">Seu perfil não tem acesso à rastreabilidade.</p>';
      return;
    }
    const itens = this.obterMovimentacoesFiltradas();
    container.innerHTML = `
      <div class="btn-group" style="margin-bottom:1rem;">
        <span class="btn btn-primary" style="cursor:default;">🧾 ${itens.length} registros</span>
        ${auth.pode('ver_relatorio_completo') ? `<button class="btn btn-warning" onclick="appMateriais.gerarRelatorioCompleto()">📊 Relatório Completo</button>` : ''}
      </div>
      ${itens.length ? `<div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Material</th><th>Qtd.</th><th>Quem retirou</th><th>Função</th><th>Setor</th><th>Motivo</th><th>Observações</th><th>Lançado por</th><th>Ações</th></tr></thead><tbody>${itens.map(m => `<tr><td>${new Date(m.dataHora).toLocaleString('pt-BR')}</td><td>${m.materialNome}</td><td>${m.quantidade}</td><td>${m.responsavel}</td><td>${m.funcao || '-'}</td><td>${m.setor || '-'}</td><td>${m.motivo || '-'}</td><td>${m.observacoes || '-'}</td><td>${m.lancadoPor || '-'}</td><td>${auth.pode('excluir_rastreabilidade') ? `<button class="btn btn-danger" onclick="appMateriais.excluirMovimentacao(${m.id})">Excluir</button>` : `<span style="color:#6b7a99;">Somente admin</span>`}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhuma movimentação encontrada com os filtros informados.</p>`}`;
  },

  async excluirMovimentacao(id) {
    if (!auth.pode('excluir_rastreabilidade')) {
      app.mostrarAlerta('Somente o administrador pode excluir rastreabilidade.', 'error');
      return;
    }
    if (!confirm('Deseja realmente excluir este registro de rastreabilidade?')) return;
    this.movimentacoes = this.movimentacoes.filter(m => m.id !== id);
    await this.salvarMovimentacoes();
    this.renderizarMovimentacoes();
    this.renderizarRastreabilidadeCompleta();
    this.renderizarRelatorioDia();
    this.buscarMateriais();
    app.mostrarAlerta('Rastreabilidade excluída com sucesso!', 'success');
  },

  renderizarRelatorioDia() {
    const painel = document.getElementById('painelRelatorioDia');
    if (!painel) return;
    const hoje = new Date().toISOString().split('T')[0];
    const materiaisDia = this.materiais.filter(m => (m.dataAtualizacao || '').split('T')[0] === hoje);
    const totalItens = materiaisDia.reduce((s, m) => s + Number(m.quantidade || 0), 0);
    painel.innerHTML = `
      <div class="btn-group" style="margin-bottom:1rem;">
        <span class="btn btn-primary" style="cursor:default;">📅 ${new Date().toLocaleDateString('pt-BR')}</span>
        <span class="btn btn-secondary" style="cursor:default;">📦 ${materiaisDia.length} materiais atualizados</span>
        <span class="btn btn-success" style="cursor:default;">🔢 saldo total ${totalItens}</span>
      </div>
      ${materiaisDia.length ? `<div class="table-wrap"><table><thead><tr><th>Material</th><th>Quantidade</th><th>Especificações</th><th>Atualização</th></tr></thead><tbody>${materiaisDia.map(m => `<tr><td>${m.nome}</td><td>${m.quantidade}</td><td>${m.especificacoes || '-'}</td><td>${new Date(m.dataAtualizacao).toLocaleString('pt-BR')}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhum material atualizado hoje.</p>`}
    `;
  },

  abrirJanelaRelatorio({ titulo, subtitulo, materiais, movimentacoes }) {
    const totalItens = materiais.reduce((s, m) => s + Number(m.quantidade || 0), 0);
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titulo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, sans-serif; margin: 0; color: #1a2340; background: #fff; }
    .page { max-width: 1100px; margin: 0 auto; padding: 24px; }
    .header { display:flex; align-items:center; gap:16px; border-bottom:3px solid #1F3864; padding-bottom:16px; margin-bottom:24px; }
    .header img { height:60px; width:auto; display:block; }
    .header h1 { margin:0; color:#1F3864; font-size:28px; }
    .muted { color:#6b7a99; margin-top:6px; }
    .stats { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:16px; margin: 20px 0 28px; }
    .stat { background:#DDEEFF; border-left:4px solid #2E75B6; border-radius:10px; padding:16px; }
    .stat .value { font-size:30px; font-weight:700; color:#1F3864; }
    .section-title { color:#1F3864; font-size:20px; margin: 0 0 12px 0; }
    table { width:100%; border-collapse:collapse; margin-bottom:28px; }
    thead tr { background:#1F3864; color:#fff; }
    th, td { border:1px solid #d9e3f0; padding:12px; text-align:left; vertical-align:top; }
    th.center, td.center { text-align:center; }
    .cards { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:16px; }
    .card { border:1px solid #d9e3f0; border-radius:12px; overflow:hidden; background:#fff; }
    .card-media { height:180px; background:#f5f7fb; display:flex; align-items:center; justify-content:center; }
    .card-media img { max-width:100%; max-height:100%; object-fit:cover; display:block; }
    .card-body { padding:14px; }
    .card-title { font-weight:700; color:#1F3864; margin-bottom:6px; font-size:18px; }
    .qty { color:#2E75B6; font-weight:700; margin-bottom:6px; }
    .footer { text-align:center; color:#6b7a99; border-top:1px solid #d9e3f0; padding-top:14px; margin-top:28px; font-size:13px; }
    .actions { margin: 0 0 20px 0; }
    .btn { background:#1F3864; color:#fff; border:none; border-radius:8px; padding:10px 16px; cursor:pointer; font-weight:700; }
    @media print { .actions { display:none; } .page { max-width:none; padding:0; } body { margin: 0; } }
    @media (max-width: 800px) { .stats, .cards { grid-template-columns: 1fr; } .header { flex-direction:column; align-items:flex-start; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="actions">
      <button class="btn" onclick="window.print()">🖨️ Imprimir Relatório</button>
    </div>

    <div class="header">
      <img src="./logo.png" alt="Plano & Plano" />
      <div>
        <h1>${titulo}</h1>
        <div class="muted">${subtitulo}</div>
        <div class="muted">Gerado em ${dataFormatada} às ${horaFormatada}</div>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><div class="value">${materiais.length}</div><div>${materiais.length ? 'Materiais listados' : 'Materiais no relatório'}</div></div>
      <div class="stat"><div class="value">${materiais.length ? totalItens : movimentacoes.reduce((s, m) => s + Number(m.quantidade || 0), 0)}</div><div>${materiais.length ? 'Saldo total' : 'Total retirado'}</div></div>
      <div class="stat"><div class="value">${movimentacoes.length}</div><div>Registros de rastreabilidade</div></div>
    </div>

    ${materiais.length ? `
    <h2 class="section-title">Lista de Materiais</h2>
    <table><thead><tr><th>Material</th><th class="center">Quantidade</th><th>Especificações</th><th class="center">Última atualização</th></tr></thead><tbody>${materiais.map(m => `<tr><td><strong>${m.nome}</strong></td><td class="center">${m.quantidade}</td><td>${m.especificacoes || '-'}</td><td class="center">${new Date(m.dataAtualizacao).toLocaleString('pt-BR')}</td></tr>`).join('')}</tbody></table>

    <h2 class="section-title">Lista Visual</h2>
    <div class="cards">
      ${materiais.map(m => `
        <div class="card">
          <div class="card-media">
            ${m.foto ? `<img src="${m.foto}" alt="${m.nome}">` : `<div style="font-size:56px;">📦</div>`}
          </div>
          <div class="card-body">
            <div class="card-title">${m.nome}</div>
            <div class="qty">Quantidade: ${m.quantidade}</div>
            <div style="margin-bottom:6px;">${m.especificacoes || '-'}</div>
            <div style="color:#6b7a99; font-size:13px;">Atualizado em ${new Date(m.dataAtualizacao).toLocaleString('pt-BR')}</div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <h2 class="section-title">Rastreabilidade</h2>
    ${movimentacoes.length ? `<table><thead><tr><th>Data/Hora</th><th>Material</th><th>Qtd.</th><th>Quem retirou</th><th>Função</th><th>Setor</th><th>Motivo</th><th>Observações</th><th>Lançado por</th></tr></thead><tbody>${movimentacoes.map(m => `<tr><td>${new Date(m.dataHora).toLocaleString('pt-BR')}</td><td>${m.materialNome}</td><td class="center">${m.quantidade}</td><td>${m.responsavel}</td><td>${m.funcao || '-'}</td><td>${m.setor || '-'}</td><td>${m.motivo || '-'}</td><td>${m.observacoes || '-'}</td><td>${m.lancadoPor || '-'}</td></tr>`).join('')}</tbody></table>` : `<p style="color:#6b7a99; margin-bottom:24px;">Nenhuma retirada registrada para este relatório.</p>`}

    <div class="footer">Relatório gerado automaticamente pelo sistema de Controle de Materiais - Plano & Plano</div>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (!win) {
      app.mostrarAlerta('O navegador bloqueou a abertura do relatório. Libere pop-ups e tente novamente.', 'error');
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
  },

  gerarRelatorioDia() {
    const hoje = new Date().toISOString().split('T')[0];
    const materiaisDia = this.materiais.filter(m => (m.dataAtualizacao || '').split('T')[0] === hoje);
    if (materiaisDia.length === 0) {
      app.mostrarAlerta('Nenhum material foi atualizado hoje!', 'error');
      return;
    }
    this.abrirJanelaRelatorio({
      titulo: 'Relatório do Dia - Materiais da Obra',
      subtitulo: `Data de referência: ${new Date().toLocaleDateString('pt-BR')}`,
      materiais: materiaisDia,
      movimentacoes: []
    });
  },

  gerarRelatorioCompleto() {
    if (!auth.pode('ver_relatorio_completo')) {
      app.mostrarAlerta('Seu perfil não pode abrir o relatório completo.', 'error');
      return;
    }
    const materiaisOrdenados = this.materiais.slice().sort((a, b) =>
      (a.nome || '').localeCompare((b.nome || ''), 'pt-BR', { sensitivity: 'base' })
    );
    if (!materiaisOrdenados.length) {
      app.mostrarAlerta('Ainda não há materiais cadastrados para o relatório completo.', 'error');
      return;
    }
    this.abrirJanelaRelatorio({
      titulo: 'Relatório Completo - Materiais da Obra',
      subtitulo: 'Todos os materiais cadastrados no sistema, em ordem alfabética.',
      materiais: materiaisOrdenados,
      movimentacoes: []
    });
  },

  gerarRelatorioRastreabilidadeCompleta() {
    if (!auth.pode('ver_rastreabilidade')) {
      app.mostrarAlerta('Seu perfil não pode abrir o relatório de rastreabilidade.', 'error');
      return;
    }
    const movimentacoesOrdenadas = this.movimentacoes.slice().sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora));
    if (!movimentacoesOrdenadas.length) {
      app.mostrarAlerta('Ainda não há registros de rastreabilidade para gerar o relatório.', 'error');
      return;
    }
    this.abrirJanelaRelatorioRastreabilidade({
      titulo: 'Relatório Completo de Rastreabilidade',
      subtitulo: 'Relatório exclusivo com todas as retiradas registradas no sistema.',
      movimentacoes: movimentacoesOrdenadas
    });
  }};


const appRT = {
  STORAGE_KEY: 'planejamento_rt_dados',
  STORAGE_KEY_DIA_DIA: 'planejamento_rt_dia_dia_dados',
  BASE_FILE: 'planejamento_rts_vila_ema.csv',
  itens: [],
  itensDiaDia: [],
  editandoId: null,
  editandoIdDiaDia: null,
  _unsub: null,
  _unsubDiaDia: null,
  meses: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  servicos: ['Fachada','Estrutura de Concreto','Alvenaria Estrutural + Distribuição Elétrica','Gradil','Requadração de Caixilhos','Enfiação','Prumada Hidráulica + Aranha','Ramal Sanitário','Alvenaria dos Shafts','Contrapiso','Gesso Liso','Forro de Gesso','Impermeabilização','Cerâmica, Baguete, Soleira, Azulejo','Caixilhos','Bancada','Pintura (Aparelhamento)','Portas de Madeira','Interrupt, Tomadas, QDL','Louças e Metais','Limpeza Grossa','Arremates Gerais','Piso Laminado','Pintura Final','Limpeza Fina','Apto Pronto para Entrega','Gesso','Revestimento','Pintura','Instalação de Porta','Acompanhamento'],
  statusList: ['Planejado','Pedir agora','RT lançada','Em suprimentos','Aguardando entrega','Entregue','Concluído'],

  podeSomenteEntregar() {
    return (window.currentUser?.role || '') === 'almoxarife';
  },
  podeAlterarStatusEspecifico(statusAtual, novoStatus) {
    const role = window.currentUser?.role || '';
    if (role === 'admin' || role === 'go') return true;
    if (role === 'almoxarife') return statusAtual === 'Aguardando entrega' && novoStatus === 'Entregue';
    return false;
  },
  acoesHtml(item, tipo='planejamento') {
    if (!auth.pode(tipo === 'dia' ? 'editar_rt_dia_dia' : 'editar_planejamento_rt')) return '';
    if (tipo === 'dia') {
      return `<div class="btn-group" style="margin:0;"><button class="btn btn-secondary" onclick="appRT.abrirModalEditarDiaDia('${item.id}')">✏️ Editar</button><button class="btn btn-danger" onclick="appRT.excluirDiaDia('${item.id}')">🗑️ Excluir</button></div>`;
    }
    return `<div class="btn-group" style="margin:0;"><button class="btn btn-secondary" onclick="appRT.abrirModalEditar('${item.id}')">✏️ Editar</button><button class="btn btn-danger" onclick="appRT.excluir('${item.id}')">🗑️ Excluir</button></div>`;
  },


  init() {
    this.preencherSelects();
    this.carregar().then(() => {
      this.iniciarSyncAoVivo();
      this.renderizar();
      this.renderizarDiaDia();
      const modal = document.getElementById('modalPlanejamentoRT');
      if (modal && !modal.dataset.bound) {
        modal.addEventListener('click', (e) => { if (e.target.id === 'modalPlanejamentoRT') this.fecharModal(); });
        modal.dataset.bound = '1';
      }
      const modalDia = document.getElementById('modalRTDiaDia');
      if (modalDia && !modalDia.dataset.bound) {
        modalDia.addEventListener('click', (e) => { if (e.target.id === 'modalRTDiaDia') this.fecharModalDiaDia(); });
        modalDia.dataset.bound = '1';
      }
      document.getElementById('rtStatus')?.addEventListener('change', () => this.atualizarResumoStatusPlanejamento());
      document.getElementById('rtDiaStatus')?.addEventListener('change', () => this.atualizarResumoStatusDiaDia());
    });
  },

  preencherSelects() {
    const mesSel = document.getElementById('rtMes');
    const mesFiltro = document.getElementById('rtMesFiltro');
    const servSel = document.getElementById('rtServico');
    const servFiltro = document.getElementById('rtServicoFiltro');
    const statusSel = document.getElementById('rtStatus');
    const servDiaSel = document.getElementById('rtDiaServico');
    const servDiaFiltro = document.getElementById('rtDiaServicoFiltro');
    const statusDiaSel = document.getElementById('rtDiaStatus');
    if (mesSel && !mesSel.dataset.ready) {
      mesSel.innerHTML = this.meses.map(m => `<option value="${m}">${m}</option>`).join('');
      mesSel.dataset.ready = '1';
    }
    if (mesFiltro && !mesFiltro.dataset.ready) {
      mesFiltro.innerHTML = '<option value="">Todos os meses</option>' + this.meses.map(m => `<option value="${m}">${m}</option>`).join('');
      mesFiltro.dataset.ready = '1';
      mesFiltro.value = this.mesAtualNome();
    }
    if (servSel && !servSel.dataset.ready) {
      servSel.innerHTML = this.servicos.map(s => `<option value="${s}">${s}</option>`).join('');
      servSel.dataset.ready = '1';
    }
    if (servFiltro && !servFiltro.dataset.ready) {
      servFiltro.innerHTML = '<option value="">Todos os serviços</option>' + this.servicos.map(s => `<option value="${s}">${s}</option>`).join('');
      servFiltro.dataset.ready = '1';
    }
    if (statusSel && !statusSel.dataset.ready) {
      statusSel.innerHTML = this.statusList.map(s => `<option value="${s}">${s}</option>`).join('');
      statusSel.dataset.ready = '1';
    }
    if (servDiaSel && !servDiaSel.dataset.ready) {
      servDiaSel.innerHTML = this.servicos.map(s => `<option value="${s}">${s}</option>`).join('');
      servDiaSel.dataset.ready = '1';
    }
    if (servDiaFiltro && !servDiaFiltro.dataset.ready) {
      servDiaFiltro.innerHTML = '<option value="">Todos os serviços</option>' + this.servicos.map(s => `<option value="${s}">${s}</option>`).join('');
      servDiaFiltro.dataset.ready = '1';
    }
    if (statusDiaSel && !statusDiaSel.dataset.ready) {
      statusDiaSel.innerHTML = this.statusList.map(s => `<option value="${s}">${s}</option>`).join('');
      statusDiaSel.dataset.ready = '1';
    }
    this.preencherFiltroTorres();
    this.preencherFiltroTorresDiaDia();
  },

  preencherFiltroTorres() {
    const torreFiltro = document.getElementById('rtTorreFiltro');
    if (!torreFiltro) return;
    const torres = Array.from(new Set(this.itens.map(i => i.torre).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
    const atual = torreFiltro.value || '';
    torreFiltro.innerHTML = '<option value="">Todas as torres</option>' + torres.map(t => `<option value="${t}">${t}</option>`).join('');
    torreFiltro.value = torres.includes(atual) ? atual : '';
  },

  preencherFiltroTorresDiaDia() {
    const torreFiltro = document.getElementById('rtDiaTorreFiltro');
    if (!torreFiltro) return;
    const torres = Array.from(new Set(this.itensDiaDia.map(i => i.torre).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
    const atual = torreFiltro.value || '';
    torreFiltro.innerHTML = '<option value="">Todas as torres</option>' + torres.map(t => `<option value="${t}">${t}</option>`).join('');
    torreFiltro.value = torres.includes(atual) ? atual : '';
  },

  mesAtualNome() { return this.meses[new Date().getMonth()]; },
  normalizarStatusRT(valor) {
    return valor === 'Autorizado para compra' ? 'Aguardando entrega' : (valor || 'Planejado');
  },
  mesPorData(dataIso) {
    if (!dataIso) return this.mesAtualNome();
    const dt = new Date(dataIso + 'T12:00:00');
    return this.meses[dt.getMonth()] || this.mesAtualNome();
  },

  parseBRDateToISO(valor) {
    if (!valor) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) return valor;
    const partes = valor.split('/');
    if (partes.length !== 3) return '';
    const [dia, mes, ano] = partes;
    return `${ano.padStart(4,'0')}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}`;
  },

  normalizarPlanejamentoImportado(item, idx = 0) {
    const dataServico = this.parseBRDateToISO(item['Início Planejado'] || item.dataServico || item.inicioPlanejado || '');
    const dataRT = this.parseBRDateToISO(item['Data da RT (Quarta)'] || item.dataRT || '');
    const mes = item.mes || this.mesPorData(dataServico);
    return {
      id: String(item.id || `rt_${idx}_${Date.now()}`),
      mes,
      servico: item['Serviço'] || item.servico || '',
      material: item['Nome na Planilha'] || item.material || item.nomePlanilha || '',
      nomePlanilha: item['Nome na Planilha'] || item.nomePlanilha || '',
      torre: item.Torre || item.torre || '',
      pavimento: item.Pavimento || item.pavimento || '',
      quantidade: Number(item.quantidade || 0),
      dataServico,
      leadTime: Number(item.leadTime || 20),
      status: item.status || 'Planejado',
      prioridadeManual: item.prioridadeManual || '',
      dataRT,
      dataAprovSupr: item.dataAprovSupr || '',
      dataAutorizacao: item.dataAutorizacao || '',
      dataEntrega: item.dataEntrega || '',
      observacoes: item.observacoes || '',
      origem: item.origem || 'escadinha',
      updatedAt: item.updatedAt || new Date().toISOString(),
      dataIdealPedido: this.calcularDataIdeal(dataServico, Number(item.leadTime || 20))
    };
  },


  normalizarDiaDia(item, idx = 0) {
    const dataNecessidade = item.dataNecessidade || item.dataServico || '';
    const leadTime = Number(item.leadTime || 20);
    return {
      id: String(item.id || `rtdia_${idx}_${Date.now()}`),
      servico: item.servico || '',
      material: item.material || '',
      torre: item.torre || '',
      pavimento: item.pavimento || '',
      quantidade: Number(item.quantidade || 0),
      dataNecessidade,
      leadTime,
      status: item.status || 'Pedir agora',
      prioridadeManual: item.prioridadeManual || '',
      dataRT: item.dataRT || '',
      dataAprovSupr: item.dataAprovSupr || '',
      dataAutorizacao: item.dataAutorizacao || '',
      dataEntrega: item.dataEntrega || '',
      observacoes: item.observacoes || '',
      updatedAt: item.updatedAt || new Date().toISOString(),
      dataIdealPedido: this.calcularDataIdeal(dataNecessidade, leadTime),
      origem: item.origem || 'dia-a-dia'
    };
  },

  hojeISO() {
    return new Date().toISOString().slice(0,10);
  },

  montarResumoStatus(item) {
    const partes = [];
    if (item.dataRT) partes.push(`RT: ${new Date(item.dataRT+'T12:00:00').toLocaleDateString('pt-BR')}`);
    if (item.dataAprovSupr) partes.push(`Suprimentos: ${new Date(item.dataAprovSupr+'T12:00:00').toLocaleDateString('pt-BR')}`);
    if (item.dataAutorizacao) partes.push(`Autorizado: ${new Date(item.dataAutorizacao+'T12:00:00').toLocaleDateString('pt-BR')}`);
    if (item.dataEntrega) partes.push(`Entrega: ${new Date(item.dataEntrega+'T12:00:00').toLocaleDateString('pt-BR')}`);
    return partes.length ? partes.join(' • ') : 'As datas serão registradas automaticamente conforme o avanço do status.';
  },

  atualizarResumoStatusPlanejamento(item = {}) {
    const el = document.getElementById('rtStatusResumo');
    if (el) el.textContent = this.montarResumoStatus(item);
  },

  atualizarResumoStatusDiaDia(item = {}) {
    const el = document.getElementById('rtDiaStatusResumo');
    if (el) el.textContent = this.montarResumoStatus(item);
  },

  aplicarDatasPorStatus(item, anterior = {}) {
    const hoje = this.hojeISO();
    item.dataRT = item.dataRT || anterior.dataRT || '';
    item.dataAprovSupr = item.dataAprovSupr || anterior.dataAprovSupr || '';
    item.dataAutorizacao = item.dataAutorizacao || anterior.dataAutorizacao || '';
    item.dataEntrega = item.dataEntrega || anterior.dataEntrega || '';

    if (['RT lançada','Em suprimentos','Autorizado para compra','Aguardando entrega','Entregue','Concluído'].includes(item.status) && !item.dataRT) item.dataRT = hoje;
    if (['Em suprimentos','Autorizado para compra','Aguardando entrega','Entregue','Concluído'].includes(item.status) && !item.dataAprovSupr) item.dataAprovSupr = hoje;
    if (['Autorizado para compra','Aguardando entrega','Entregue','Concluído'].includes(item.status) && !item.dataAutorizacao) item.dataAutorizacao = hoje;
    if (['Entregue','Concluído'].includes(item.status) && !item.dataEntrega) item.dataEntrega = hoje;

    return item;
  },

  async importarPlanejamentoBase() {
    try {
      const res = await fetch(this.BASE_FILE);
      if (!res.ok) throw new Error('Arquivo base não encontrado');
      const texto = await res.text();
      const linhas = texto.trim().split(/\r?\n/);
      if (linhas.length < 2) throw new Error('Arquivo base vazio');
      const headers = linhas[0].split(',').map(h => h.trim().replace(/^"|"$/g,''));
      const valuesRe = /(".*?"|[^",]+)(?=,|$)/g;
      const registros = linhas.slice(1).map((line, idx) => {
        const values = line.match(valuesRe)?.map(v => v.replace(/^"|"$/g,'').trim()) || [];
        const row = {};
        headers.forEach((h, i) => row[h] = values[i] || '');
        return this.normalizarPlanejamentoImportado(row, idx + 1);
      }).filter(r => r.material && r.dataServico);

      const manuais = this.itens.filter(i => i.origem !== 'escadinha');
      registros.forEach((item) => {
        const chave = `${item.torre}|${item.pavimento}|${item.servico}|${item.material}|${item.dataServico}`;
        const antigo = this.itens.find(i => `${i.torre}|${i.pavimento}|${i.servico}|${i.material}|${i.dataServico}` === chave);
        if (antigo) {
          item.id = antigo.id;
          item.status = antigo.status || item.status;
          item.prioridadeManual = antigo.prioridadeManual || item.prioridadeManual;
          item.dataAprovSupr = antigo.dataAprovSupr || item.dataAprovSupr;
          item.dataAutorizacao = antigo.dataAutorizacao || item.dataAutorizacao;
          item.dataEntrega = antigo.dataEntrega || item.dataEntrega;
          item.observacoes = antigo.observacoes || item.observacoes;
          item.quantidade = antigo.quantidade || item.quantidade;
        }
      });
      this.itens = [...manuais, ...registros];
      await this.salvarDados();
      this.preencherFiltroTorres();
      this.renderizar();
      app.mostrarAlerta('Planejamento base da escadinha importado com sucesso!', 'success');
    } catch (e) {
      console.error('Erro ao importar planejamento base:', e);
      app.mostrarAlerta('Não foi possível importar o planejamento base da escadinha.', 'error');
    }
  },


  async carregar() {
    try {
      if (window.__fb?.carregarPlanejamentoRTDaNuvem) {
        const cloud = await window.__fb.carregarPlanejamentoRTDaNuvem();
        if (Array.isArray(cloud)) {
          this.itens = cloud;
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens));
        }
      }
      if (window.__fb?.carregarRTDiaDiaDaNuvem) {
        const cloudDia = await window.__fb.carregarRTDiaDiaDaNuvem();
        if (Array.isArray(cloudDia)) {
          this.itensDiaDia = cloudDia;
          localStorage.setItem(this.STORAGE_KEY_DIA_DIA, JSON.stringify(this.itensDiaDia));
        }
      }
      if (!this.itens.length) {
        const salvos = localStorage.getItem(this.STORAGE_KEY);
        this.itens = salvos ? JSON.parse(salvos) : [];
      }
      if (!this.itensDiaDia.length) {
        const salvosDia = localStorage.getItem(this.STORAGE_KEY_DIA_DIA);
        this.itensDiaDia = salvosDia ? JSON.parse(salvosDia) : [];
      }
      if (!this.itens.length) {
        await this.importarPlanejamentoBase();
      }
    } catch (e) {
      console.error('Erro ao carregar planejamento RT:', e);
      this.itens = [];
      this.itensDiaDia = [];
    }
  },

  iniciarSyncAoVivo() {
    try {
      if (window.__fb?.escutarMudancasPlanejamentoRT) {
        if (this._unsub) this._unsub();
        this._unsub = window.__fb.escutarMudancasPlanejamentoRT((itens) => {
          this.itens = Array.isArray(itens) ? itens : [];
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens)); } catch(e) {}
          this.renderizar();
        });
      }
      if (window.__fb?.escutarMudancasRTDiaDia) {
        if (this._unsubDiaDia) this._unsubDiaDia();
        this._unsubDiaDia = window.__fb.escutarMudancasRTDiaDia((itens) => {
          this.itensDiaDia = Array.isArray(itens) ? itens : [];
          try { localStorage.setItem(this.STORAGE_KEY_DIA_DIA, JSON.stringify(this.itensDiaDia)); } catch(e) {}
          this.renderizarDiaDia();
        });
      }
    } catch (e) { console.warn('Sync ao vivo do planejamento indisponível:', e); }
  },

  async salvarDados() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens));
    if (window.__fb?.salvarPlanejamentoRTNaNuvem) await window.__fb.salvarPlanejamentoRTNaNuvem(this.itens);
  },

  async salvarDadosDiaDia() {
    localStorage.setItem(this.STORAGE_KEY_DIA_DIA, JSON.stringify(this.itensDiaDia));
    if (window.__fb?.salvarRTDiaDiaNaNuvem) await window.__fb.salvarRTDiaDiaNaNuvem(this.itensDiaDia);
  },

  abrirModalNovo() {
    if (!auth.pode('editar_planejamento_rt')) return app.mostrarAlerta('Seu perfil não pode editar o planejamento RT.', 'error');
    this.editandoId = null;
    document.getElementById('modalPlanejamentoRTTitle').textContent = 'Novo Planejamento RT';
    document.getElementById('formPlanejamentoRT').reset();
    document.getElementById('rtMes').value = document.getElementById('rtMesFiltro')?.value || this.mesAtualNome();
    document.getElementById('rtStatus').value = 'Planejado';
    document.getElementById('rtLeadTime').value = 20;
    document.getElementById('rtTorre').value = '';
    document.getElementById('rtPavimento').value = '';
    document.getElementById('modalPlanejamentoRT').classList.add('active');
    atualizarBotaoMobile();
  },

  abrirModalEditar(id) {
    if (!auth.pode('editar_planejamento_rt')) return app.mostrarAlerta('Seu perfil não pode editar o planejamento RT.', 'error');
    const item = this.itens.find(i => String(i.id) === String(id));
    if (!item) return;
    this.editandoId = id;
    document.getElementById('modalPlanejamentoRTTitle').textContent = 'Editar Planejamento RT';
    document.getElementById('rtMes').value = item.mes || this.mesAtualNome();
    document.getElementById('rtServico').value = item.servico || this.servicos[0];
    document.getElementById('rtTorre').value = item.torre || '';
    document.getElementById('rtPavimento').value = item.pavimento || '';
    document.getElementById('rtMaterial').value = item.material || '';
    document.getElementById('rtQuantidade').value = item.quantidade || '';
    document.getElementById('rtDataServico').value = item.dataServico || '';
    document.getElementById('rtLeadTime').value = item.leadTime || 15;
    document.getElementById('rtStatus').value = item.status || 'Planejado';
    document.getElementById('rtPrioridadeManual').value = item.prioridadeManual || '';
    document.getElementById('rtDataRT').value = item.dataRT || '';
    document.getElementById('rtObservacoes').value = item.observacoes || '';
    this.atualizarResumoStatusPlanejamento(item);
    document.getElementById('modalPlanejamentoRT').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModal() {
    document.getElementById('modalPlanejamentoRT').classList.remove('active');
    atualizarBotaoMobile();
  },

  calcularDataIdeal(dataServico, leadTime) {
    if (!dataServico) return '';
    const d = new Date(dataServico + 'T12:00:00');
    d.setDate(d.getDate() - Number(leadTime || 0));
    return d.toISOString().split('T')[0];
  },

  prioridadeAutomatica(item) {
    if (item.prioridadeManual) return item.prioridadeManual;
    if (['Entregue','Concluído'].includes(item.status)) return 'Baixa';
    const ideal = item.dataIdealPedido || this.calcularDataIdeal(item.dataServico, item.leadTime);
    if (!ideal) return 'Média';
    const hoje = new Date(); hoje.setHours(0,0,0,0);
    const dataIdeal = new Date(ideal + 'T00:00:00');
    const diff = Math.ceil((dataIdeal - hoje) / 86400000);
    if (diff < 0 || item.status === 'Pedir agora') return 'Alta';
    if (diff <= 7) return 'Média';
    return 'Baixa';
  },

  badgePrioridade(pri) {
    const mapa = { Alta: '#E84545', Média: '#F5A623', Baixa: '#27AE60' };
    return `<span style="display:inline-flex;padding:4px 10px;border-radius:999px;background:${mapa[pri] || '#95a5a6'};color:#fff;font-weight:700;font-size:12px;">${pri}</span>`;
  },
  statusSelectHtml(item, tipo = 'planejamento') {
    const podeEditarTudo = auth.pode(tipo === 'dia' ? 'editar_rt_dia_dia' : 'editar_planejamento_rt');
    const statusAtual = this.statusSugerido(item);
    if (podeEditarTudo) {
      const onchange = tipo === 'dia' ? `appRT.atualizarStatusDiaDia('${item.id}', this.value)` : `appRT.atualizarStatus('${item.id}', this.value)`;
      return `<select class="status-inline-select" onchange="${onchange}">${this.statusList.map(s => `<option value="${s}" ${statusAtual===s?'selected':''}>${s}</option>`).join('')}</select>`;
    }
    if (this.podeSomenteEntregar() && statusAtual === 'Aguardando entrega') {
      const onchange = tipo === 'dia' ? `appRT.atualizarStatusDiaDia('${item.id}', this.value)` : `appRT.atualizarStatus('${item.id}', this.value)`;
      return `<select class="status-inline-select" onchange="${onchange}"><option value="Aguardando entrega" selected>Aguardando entrega</option><option value="Entregue">Entregue</option></select>`;
    }
    return `<span>${statusAtual}</span>`;
  },

  async atualizarStatus(id, novoStatus) {
    const idx = this.itens.findIndex(i => String(i.id) === String(id));
    if (idx < 0) return;
    const statusAtual = this.statusSugerido(this.itens[idx]);
    if (!this.podeAlterarStatusEspecifico(statusAtual, novoStatus)) {
      return app.mostrarAlerta('Almoxarife só pode alterar de Aguardando entrega para Entregue.', 'error');
    }
    const item = { ...this.itens[idx], status: novoStatus, updatedAt: new Date().toISOString() };
    this.aplicarDatasPorStatus(item, this.itens[idx]);
    this.itens[idx] = item;
    await this.salvarDados();
    this.preencherFiltroTorres();
    this.renderizar();
    app.mostrarAlerta('Status do planejamento RT atualizado.', 'success');
  },

  async atualizarStatusDiaDia(id, novoStatus) {
    const idx = this.itensDiaDia.findIndex(i => String(i.id) === String(id));
    if (idx < 0) return;
    const statusAtual = this.statusSugerido(this.itensDiaDia[idx]);
    if (!this.podeAlterarStatusEspecifico(statusAtual, novoStatus)) {
      return app.mostrarAlerta('Almoxarife só pode alterar de Aguardando entrega para Entregue.', 'error');
    }
    const item = { ...this.itensDiaDia[idx], status: novoStatus, updatedAt: new Date().toISOString() };
    this.aplicarDatasPorStatus(item, this.itensDiaDia[idx]);
    this.itensDiaDia[idx] = item;
    await this.salvarDadosDiaDia();
    this.preencherFiltroTorresDiaDia();
    this.renderizarDiaDia();
    app.mostrarAlerta('Status da RT do Dia a Dia atualizado.', 'success');
  },

  statusSugerido(item) {
    if (item.status && item.status !== 'Planejado') return item.status;
    const pri = this.prioridadeAutomatica(item);
    return pri === 'Alta' ? 'Pedir agora' : 'Planejado';
  },

  async salvar(event) {
    event.preventDefault();
    const item = {
      id: String(this.editandoId || Date.now()),
      mes: document.getElementById('rtMes').value,
      servico: document.getElementById('rtServico').value,
      torre: document.getElementById('rtTorre').value.trim(),
      pavimento: document.getElementById('rtPavimento').value.trim(),
      material: document.getElementById('rtMaterial').value.trim(),
      quantidade: Number(document.getElementById('rtQuantidade').value || 0),
      dataServico: document.getElementById('rtDataServico').value,
      leadTime: Number(document.getElementById('rtLeadTime').value || 0),
      status: document.getElementById('rtStatus').value,
      prioridadeManual: document.getElementById('rtPrioridadeManual').value,
      dataRT: document.getElementById('rtDataRT').value,
      dataAprovSupr: '',
      dataAutorizacao: '',
      dataEntrega: '',
      observacoes: document.getElementById('rtObservacoes').value.trim(),
      updatedAt: new Date().toISOString()
    };
    item.dataIdealPedido = this.calcularDataIdeal(item.dataServico, item.leadTime);
    const idx = this.itens.findIndex(i => i.id === item.id);
    if (idx >= 0) this.itens[idx] = item; else this.itens.push(item);
    await this.salvarDados();
    this.fecharModal();
    this.renderizar();
    app.mostrarAlerta('Planejamento RT salvo com sucesso!', 'success');
  },

  async excluir(id) {
    if (!auth.pode('editar_planejamento_rt')) return app.mostrarAlerta('Seu perfil não pode excluir planejamentos RT.', 'error');
    if (!confirm('Deseja realmente excluir este item do planejamento RT?')) return;
    this.itens = this.itens.filter(i => String(i.id) !== String(id));
    await this.salvarDados();
    this.renderizar();
    app.mostrarAlerta('Planejamento RT excluído.', 'success');
  },

  solicitarSenhaAdmin() {
    const senha = prompt('Digite a senha para excluir todo o planejamento RT:');
    if (senha === null) return null;
    return senha;
  },

  async excluirTudoPlanejamento() {
    if (!auth.pode('editar_planejamento_rt')) return app.mostrarAlerta('Seu perfil não pode excluir o planejamento RT.', 'error');
    const senha = this.solicitarSenhaAdmin();
    if (senha === null) return;
    if (senha !== 'Admin@123') {
      app.mostrarAlerta('Senha inválida para exclusão do planejamento RT.', 'error');
      return;
    }
    if (!confirm('Tem certeza que deseja excluir TODO o planejamento RT? Esta ação não pode ser desfeita.')) return;
    this.itens = [];
    await this.salvarDados();
    this.preencherFiltroTorres();
    this.renderizar();
    app.mostrarAlerta('Todo o planejamento RT foi excluído com sucesso.', 'success');
  },

  itensFiltrados() {
    const mes = document.getElementById('rtMesFiltro')?.value || '';
    const status = document.getElementById('rtStatusFiltro')?.value || '';
    const torre = document.getElementById('rtTorreFiltro')?.value || '';
    const servico = document.getElementById('rtServicoFiltro')?.value || '';
    const busca = (document.getElementById('rtBusca')?.value || '').toLowerCase();
    return this.itens.filter(item => {
      const okMes = !mes || item.mes === mes;
      const okStatus = !status || this.statusSugerido(item) === status || item.status === status;
      const okTorre = !torre || item.torre === torre;
      const okServico = !servico || item.servico === servico;
      const blob = `${item.servico} ${item.material} ${item.pavimento || ''} ${item.torre || ''} ${item.observacoes || ''}`.toLowerCase();
      const okBusca = !busca || blob.includes(busca);
      return okMes && okStatus && okTorre && okServico && okBusca;
    }).sort((a,b) => {
      const rtA = a.dataRT || '';
      const rtB = b.dataRT || '';
      if (rtA !== rtB) return rtA.localeCompare(rtB);
      const mi = this.meses.indexOf(a.mes) - this.meses.indexOf(b.mes);
      if (mi !== 0) return mi;
      return (a.dataServico || '').localeCompare(b.dataServico || '');
    });
  },

  renderResumo(lista) {
    const el = document.getElementById('rtResumo');
    if (!el) return;
    const altas = lista.filter(i => this.prioridadeAutomatica(i) === 'Alta').length;
    const medias = lista.filter(i => this.prioridadeAutomatica(i) === 'Média').length;
    const concluidos = lista.filter(i => ['Entregue','Concluído'].includes(i.status)).length;
    el.innerHTML = `
      <div class="kpi"><div class="icon">📌</div><div class="value">${lista.length}</div><div class="label">Itens planejados</div></div>
      <div class="kpi"><div class="icon">🔴</div><div class="value">${altas}</div><div class="label">Prioridade alta</div></div>
      <div class="kpi"><div class="icon">🟡</div><div class="value">${medias}</div><div class="label">Atenção</div></div>
      <div class="kpi"><div class="icon">✅</div><div class="value">${concluidos}</div><div class="label">Entregues/Concluídos</div></div>`;
  },

  verPrioridadesDoMes() {
    const mes = document.getElementById('rtMesFiltro')?.value || this.mesAtualNome();
    const container = document.getElementById('rtPrioridadesMes');
    const lista = this.itens
      .filter(i => i.mes === mes && this.prioridadeAutomatica(i) === 'Alta')
      .sort((a,b) => (a.dataRT || '').localeCompare(b.dataRT || '') || (a.dataServico || '').localeCompare(b.dataServico || ''));
    if (!container) return;
    container.innerHTML = `<div class="card" style="margin-bottom:0;"><h2>🚨 Prioridades de ${mes}</h2>${lista.length ? `<div class="table-wrap"><table><thead><tr><th>Data RT</th><th>Torre</th><th>Pavimento</th><th>Serviço</th><th>Material</th><th>Data ideal</th><th>Status</th><th>Prioridade</th></tr></thead><tbody>${lista.map(i => `<tr><td>${i.dataRT ? new Date(i.dataRT+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td><td data-label="Torre">${i.torre || '-'}</td><td data-label="Pavimento">${i.pavimento || '-'}</td><td>${i.servico}</td><td data-label="Material">${i.material}</td><td data-label="Data ideal">${i.dataIdealPedido ? new Date(i.dataIdealPedido+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td><td data-label="Status">${this.statusSelectHtml(i, 'planejamento')}</td><td data-label="Prioridade">${this.badgePrioridade(this.prioridadeAutomatica(i))}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhuma prioridade alta encontrada para ${mes}.</p>`}</div>`;
  },



  abrirModalNovoDiaDia() {
    if (!auth.pode('editar_rt_dia_dia')) return app.mostrarAlerta('Seu perfil não pode editar RT do Dia a Dia.', 'error');
    this.editandoIdDiaDia = null;
    document.getElementById('modalRTDiaDiaTitle').textContent = 'Nova RT Dia a Dia';
    document.getElementById('formRTDiaDia').reset();
    document.getElementById('rtDiaStatus').value = 'Pedir agora';
    document.getElementById('rtDiaLeadTime').value = 20;
    this.atualizarResumoStatusDiaDia({});
    document.getElementById('modalRTDiaDia').classList.add('active');
    atualizarBotaoMobile();
  },

  abrirModalEditarDiaDia(id) {
    if (!auth.pode('editar_rt_dia_dia')) return app.mostrarAlerta('Seu perfil não pode editar RT do Dia a Dia.', 'error');
    const item = this.itensDiaDia.find(i => String(i.id) === String(id));
    if (!item) return;
    this.editandoIdDiaDia = id;
    document.getElementById('modalRTDiaDiaTitle').textContent = 'Editar RT Dia a Dia';
    document.getElementById('rtDiaServico').value = item.servico || this.servicos[0];
    document.getElementById('rtDiaMaterial').value = item.material || '';
    document.getElementById('rtDiaTorre').value = item.torre || '';
    document.getElementById('rtDiaPavimento').value = item.pavimento || '';
    document.getElementById('rtDiaQuantidade').value = item.quantidade || '';
    document.getElementById('rtDiaDataNecessidade').value = item.dataNecessidade || '';
    document.getElementById('rtDiaLeadTime').value = item.leadTime || 20;
    document.getElementById('rtDiaStatus').value = item.status || 'Pedir agora';
    document.getElementById('rtDiaPrioridadeManual').value = item.prioridadeManual || '';
    document.getElementById('rtDiaObservacoes').value = item.observacoes || '';
    this.atualizarResumoStatusDiaDia(item);
    document.getElementById('modalRTDiaDia').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModalDiaDia() {
    document.getElementById('modalRTDiaDia').classList.remove('active');
    atualizarBotaoMobile();
  },

  async salvarDiaDia(event) {
    event.preventDefault();
    const item = this.normalizarDiaDia({
      id: String(this.editandoIdDiaDia || Date.now()),
      servico: document.getElementById('rtDiaServico').value,
      material: document.getElementById('rtDiaMaterial').value.trim(),
      torre: document.getElementById('rtDiaTorre').value.trim(),
      pavimento: document.getElementById('rtDiaPavimento').value.trim(),
      quantidade: Number(document.getElementById('rtDiaQuantidade').value || 0),
      dataNecessidade: document.getElementById('rtDiaDataNecessidade').value,
      leadTime: Number(document.getElementById('rtDiaLeadTime').value || 20),
      status: document.getElementById('rtDiaStatus').value,
      prioridadeManual: document.getElementById('rtDiaPrioridadeManual').value,
      dataRT: '',
      dataAprovSupr: '',
      dataAutorizacao: '',
      dataEntrega: '',
      observacoes: document.getElementById('rtDiaObservacoes').value.trim(),
      updatedAt: new Date().toISOString()
    });
    const idx = this.itensDiaDia.findIndex(i => i.id === item.id);
    const anterior = idx >= 0 ? this.itensDiaDia[idx] : {};
    this.aplicarDatasPorStatus(item, anterior);
    if (idx >= 0) this.itensDiaDia[idx] = item; else this.itensDiaDia.unshift(item);
    await this.salvarDadosDiaDia();
    this.preencherFiltroTorresDiaDia();
    this.fecharModalDiaDia();
    this.renderizarDiaDia();
    app.mostrarAlerta('RT do Dia a Dia salva com sucesso!', 'success');
  },

  async excluirDiaDia(id) {
    if (!auth.pode('editar_rt_dia_dia')) return app.mostrarAlerta('Seu perfil não pode excluir RT do Dia a Dia.', 'error');
    if (!confirm('Deseja realmente excluir esta RT do Dia a Dia?')) return;
    this.itensDiaDia = this.itensDiaDia.filter(i => String(i.id) !== String(id));
    await this.salvarDadosDiaDia();
    this.renderizarDiaDia();
    app.mostrarAlerta('RT do Dia a Dia excluída.', 'success');
  },

  itensDiaDiaFiltrados() {
    const status = document.getElementById('rtDiaStatusFiltro')?.value || '';
    const torre = document.getElementById('rtDiaTorreFiltro')?.value || '';
    const servico = document.getElementById('rtDiaServicoFiltro')?.value || '';
    const busca = (document.getElementById('rtDiaBusca')?.value || '').toLowerCase();
    return this.itensDiaDia.filter(item => {
      const okStatus = !status || item.status === status || this.statusSugerido(item) === status;
      const okTorre = !torre || item.torre === torre;
      const okServico = !servico || item.servico === servico;
      const blob = `${item.servico} ${item.material} ${item.pavimento || ''} ${item.torre || ''} ${item.observacoes || ''}`.toLowerCase();
      const okBusca = !busca || blob.includes(busca);
      return okStatus && okTorre && okServico && okBusca;
    }).sort((a,b) => (a.dataNecessidade || '').localeCompare(b.dataNecessidade || '') || (a.dataRT || '').localeCompare(b.dataRT || ''));
  },

  renderResumoDiaDia(lista) {
    const el = document.getElementById('rtDiaResumo');
    if (!el) return;
    const altas = lista.filter(i => this.prioridadeAutomatica(i) === 'Alta').length;
    const emSupr = lista.filter(i => i.status === 'Em suprimentos').length;
    const aguardando = lista.filter(i => i.status === 'Aguardando entrega').length;
    const concluidos = lista.filter(i => ['Entregue','Concluído'].includes(i.status)).length;
    el.innerHTML = `
      <div class="kpi"><div class="icon">📝</div><div class="value">${lista.length}</div><div class="label">RTs do dia a dia</div></div>
      <div class="kpi"><div class="icon">🔴</div><div class="value">${altas}</div><div class="label">Críticas</div></div>
      <div class="kpi"><div class="icon">📦</div><div class="value">${emSupr}</div><div class="label">Em suprimentos</div></div>
      <div class="kpi"><div class="icon">✅</div><div class="value">${concluidos + aguardando}</div><div class="label">Entrega/fechamento</div></div>`;
  },

  verPrioridadesDiaDia() {
    const container = document.getElementById('rtDiaCriticas');
    if (!container) return;
    const lista = this.itensDiaDiaFiltrados().filter(i => this.prioridadeAutomatica(i) === 'Alta');
    container.innerHTML = `<div class="card" style="margin-bottom:0;"><h2>🚨 RTs Críticas do Dia a Dia</h2>${lista.length ? `<div class="table-wrap"><table><thead><tr><th>Torre</th><th>Pavimento</th><th>Serviço</th><th>Material</th><th>Necessidade</th><th>Data ideal</th><th>Status</th><th>Prioridade</th></tr></thead><tbody>${lista.map(i => `<tr><td data-label="Torre">${i.torre || '-'}</td><td data-label="Pavimento">${i.pavimento || '-'}</td><td>${i.servico}</td><td data-label="Material">${i.material}</td><td data-label="Data necessidade">${i.dataNecessidade ? new Date(i.dataNecessidade+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td><td data-label="Data ideal">${i.dataIdealPedido ? new Date(i.dataIdealPedido+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td><td data-label="Status">${this.statusSelectHtml(i, 'dia')}</td><td data-label="Prioridade">${this.badgePrioridade(this.prioridadeAutomatica(i))}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhuma RT crítica do dia a dia no momento.</p>`}</div>`;
  },

  renderizarDiaDia() {
    const container = document.getElementById('rtDiaDiaContainer');
    if (!container) return;
    this.preencherFiltroTorresDiaDia();
    const lista = this.itensDiaDiaFiltrados();
    this.renderResumoDiaDia(lista);
    this.verPrioridadesDiaDia();
    if (!lista.length) {
      container.innerHTML = '<p style="color:#6b7a99;">Nenhuma RT do Dia a Dia encontrada.</p>';
      return;
    }
    container.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Torre</th><th>Pavimento</th><th>Serviço</th><th>Material</th><th>Data necessidade</th><th>Lead time</th><th>Data ideal</th><th>Status</th><th>Prioridade</th><th>Ações</th></tr></thead><tbody>${lista.map(i => `<tr><td data-label="Torre">${i.torre || '-'}</td><td data-label="Pavimento">${i.pavimento || '-'}</td><td data-label="Serviço"><strong>${i.servico}</strong>${i.observacoes ? `<div style="color:#6b7a99;font-size:12px;margin-top:4px;">${i.observacoes}</div>` : ''}</td><td data-label="Material">${i.material}</td><td data-label="Data necessidade">${i.dataNecessidade ? new Date(i.dataNecessidade+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td><td data-label="Lead time">${i.leadTime || '-'} dia(s)</td><td data-label="Data ideal">${i.dataIdealPedido ? new Date(i.dataIdealPedido+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td><td data-label="Status">${this.statusSelectHtml(i, 'dia')}</td><td data-label="Prioridade">${this.badgePrioridade(this.prioridadeAutomatica(i))}</td><td data-label="Ações">${this.acoesHtml(i, 'dia')}</td></tr>`).join('')}</tbody></table></div>`;
  },

  renderizar() {
    const container = document.getElementById('rtPlanejamentoContainer');
    if (!container) return;
    this.preencherFiltroTorres();
    const lista = this.itensFiltrados();
    this.renderResumo(lista);
    this.verPrioridadesDoMes();
    if (!lista.length) {
      container.innerHTML = '<p style="color:#6b7a99;">Nenhum item de planejamento RT encontrado.</p>';
      return;
    }
    const grupos = {};
    for (const item of lista) {
      const chave = item.dataRT || `${item.mes}-sem-data`;
      (grupos[chave] ||= []).push(item);
    }
    const chaves = Object.keys(grupos).sort((a,b) => a.localeCompare(b));
    container.innerHTML = chaves.map((dataRT) => {
      const itens = grupos[dataRT].sort((a,b) => (a.dataServico || '').localeCompare(b.dataServico || ''));
      const titulo = dataRT && /^\d{4}-\d{2}-\d{2}$/.test(dataRT)
        ? `🗓️ Reunião de RT - ${new Date(dataRT+'T12:00:00').toLocaleDateString('pt-BR')}`
        : `🗓️ ${itens[0].mes}`;
      return `
      <div class="card" style="margin-bottom:1rem;">
        <h2>${titulo}</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Torre</th><th>Pavimento</th><th>Serviço</th><th>Material</th><th>Início do serviço</th><th>Lead time</th><th>Data ideal</th><th>Status</th><th>Prioridade</th><th>Ações</th></tr></thead>
            <tbody>
              ${itens.map(i => `
                <tr>
                  <td data-label="Torre">${i.torre || '-'}</td>
                  <td data-label="Pavimento">${i.pavimento || '-'}</td>
                  <td data-label="Serviço"><strong>${i.servico}</strong>${i.observacoes ? `<div style="color:#6b7a99;font-size:12px;margin-top:4px;">${i.observacoes}</div>` : ''}</td>
                  <td data-label="Material">${i.material}</td>
                  <td data-label="Início do serviço">${i.dataServico ? new Date(i.dataServico+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td>
                  <td data-label="Lead time">${i.leadTime || '-'} dia(s)</td>
                  <td data-label="Data ideal">${i.dataIdealPedido ? new Date(i.dataIdealPedido+'T12:00:00').toLocaleDateString('pt-BR') : '-'}</td>
                  <td data-label="Status">${this.statusSelectHtml(i, 'planejamento')}</td>
                  <td data-label="Prioridade">${this.badgePrioridade(this.prioridadeAutomatica(i))}</td>
                  <td data-label="Ações">
                    ${this.acoesHtml(i, 'planejamento')}
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`; }).join('');
  }
};

// ── Inicializar ao carregar a página ──
document.addEventListener('DOMContentLoaded', () => {
  window.auth = auth;
window.app = app;
window.appMateriais = appMateriais;
window.appRT = appRT;
auth.verificarSessao();
});
</script>
</body>
</html>
