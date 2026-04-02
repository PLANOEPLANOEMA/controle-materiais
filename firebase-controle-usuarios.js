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
    .predio3d-layout { display:grid; grid-template-columns:minmax(340px,1fr) 360px; gap:1.25rem; align-items:start; }
    .predio3d-stage { min-height:680px; background:linear-gradient(180deg,#eef4ff 0%,#f9fbff 55%,#edf5e9 100%); border-radius:18px; overflow:hidden; position:relative; box-shadow:var(--shadow); border:1px solid #dbe7f7; }
    .predio3d-help { position:absolute; top:12px; left:12px; z-index:2; background:rgba(255,255,255,.92); border-radius:999px; padding:.45rem .8rem; font-size:.82rem; color:var(--muted); box-shadow:0 4px 14px rgba(31,56,100,.08); }
    .predio3d-viewport { perspective:1400px; width:100%; min-height:680px; display:flex; align-items:center; justify-content:center; touch-action:none; cursor:grab; user-select:none; }
    .predio3d-viewport.dragging { cursor:grabbing; }
    .predio3d-building { position:relative; width:640px; height:640px; transform-style:preserve-3d; transition:transform .08s linear; }
    .predio3d-scene-ground { position:absolute; left:50%; bottom:22px; width:520px; height:220px; transform:translateX(-50%) rotateX(90deg) translateZ(-48px); background:linear-gradient(180deg,#7ea862 0%,#5f8c46 100%); border:8px solid #d8d9cd; box-shadow:0 22px 36px rgba(31,56,100,.18); }
    .predio3d-tower { position:absolute; bottom:72px; width:165px; transform-style:preserve-3d; }
    .predio3d-tower-a { left:175px; }
    .predio3d-tower-b { left:355px; }
    .predio3d-tower-base { position:absolute; left:-10px; right:-10px; bottom:-12px; height:18px; transform:translateZ(32px); background:#e6dfd4; box-shadow:0 10px 22px rgba(31,56,100,.15); }
    .predio3d-floor { position:absolute; left:0; width:165px; height:26px; transform-style:preserve-3d; }
    .predio3d-floor .face { position:absolute; box-sizing:border-box; border:1px solid rgba(38,55,84,.16); }
    .predio3d-floor .front, .predio3d-floor .back { width:165px; height:26px; display:flex; align-items:center; justify-content:space-between; padding:0 .65rem; color:#fff; font-weight:700; font-size:.78rem; overflow:hidden; }
    .predio3d-floor .front { transform:translateZ(30px); border-radius:4px; box-shadow:0 6px 16px rgba(31,56,100,.18); cursor:pointer; }
    .predio3d-floor .back { transform:rotateY(180deg) translateZ(30px); }
    .predio3d-floor .left, .predio3d-floor .right { width:60px; height:26px; }
    .predio3d-floor .right { right:-30px; transform:rotateY(90deg) translateZ(135px); }
    .predio3d-floor .left { left:-30px; transform:rotateY(-90deg) translateZ(30px); }
    .predio3d-floor .top { width:165px; height:60px; transform:rotateX(90deg) translateZ(30px) translateY(-30px); }
    .predio3d-floor .front::before, .predio3d-floor .back::before, .predio3d-floor .left::before, .predio3d-floor .right::before { content:''; position:absolute; inset:0; background:repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 12px, rgba(255,255,255,0) 12px 28px); pointer-events:none; }
    .predio3d-floor .front::after, .predio3d-floor .back::after { content:''; position:absolute; inset:4px 10px; background:repeating-linear-gradient(90deg, rgba(94,198,255,.9) 0 10px, rgba(94,198,255,.9) 10px 18px, rgba(0,0,0,0) 18px 28px); opacity:.55; border-radius:2px; pointer-events:none; }
    .predio3d-floor.active .front { outline:3px solid rgba(255,255,255,.98); box-shadow:0 0 0 4px rgba(31,56,100,.18), 0 14px 22px rgba(31,56,100,.22); }
    .predio3d-tower-roof { position:absolute; left:18px; right:18px; height:18px; transform:translateZ(30px); background:linear-gradient(180deg,#6f2d1a 0%,#4d170d 100%); box-shadow:0 6px 14px rgba(31,56,100,.18); }
    .predio3d-shadow { position:absolute; bottom:36px; width:220px; height:26px; background:rgba(132,158,196,.36); border-radius:999px; filter:blur(2px); }
    .predio3d-shadow-a { left:145px; }
    .predio3d-shadow-b { left:325px; }
    .predio3d-verde .front, .predio3d-verde .back, .predio3d-dot.verde { background:#27AE60; }
    .predio3d-verde .top, .predio3d-verde .left, .predio3d-verde .right { background:#239a55; }
    .predio3d-amarelo .front, .predio3d-amarelo .back, .predio3d-dot.amarelo { background:#F5A623; color:#1a2340; }
    .predio3d-amarelo .top, .predio3d-amarelo .left, .predio3d-amarelo .right { background:#dc951f; }
    .predio3d-vermelho .front, .predio3d-vermelho .back, .predio3d-dot.vermelho { background:#E84545; }
    .predio3d-vermelho .top, .predio3d-vermelho .left, .predio3d-vermelho .right { background:#cf3d3d; }
    .predio3d-cinza .front, .predio3d-cinza .back, .predio3d-dot.cinza { background:#95a5a6; }
    .predio3d-cinza .top, .predio3d-cinza .left, .predio3d-cinza .right { background:#869798; }
    .predio3d-legend { display:flex; flex-wrap:wrap; gap:.8rem; margin:.35rem 0 1rem; }
    .predio3d-legend-item { display:flex; align-items:center; gap:.4rem; font-size:.85rem; color:var(--muted); }
    .predio3d-dot { width:12px; height:12px; border-radius:999px; }
    .predio3d-panel .metric { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; margin-bottom:1rem; }
    .predio3d-panel .metric-card { background:#f7fbff; border:1px solid #dbe7f7; border-radius:14px; padding:.85rem; }
    .predio3d-panel .metric-card .num { font-size:1.35rem; font-weight:800; color:var(--blue-dark); }
    .predio3d-floor-list { max-height:280px; overflow:auto; border:1px solid #e3edf9; border-radius:14px; }
    .predio3d-floor-item { display:flex; align-items:center; justify-content:space-between; gap:.75rem; padding:.8rem 1rem; border-bottom:1px solid #eef3fb; cursor:pointer; }
    .predio3d-floor-item:last-child { border-bottom:none; }
    .predio3d-floor-item.active { background:#eef5ff; }
    .predio3d-badge { display:inline-flex; align-items:center; gap:.35rem; padding:.25rem .55rem; border-radius:999px; font-size:.78rem; font-weight:700; background:#eef3fb; color:var(--blue-dark); }
    .predio3d-details-list { display:grid; gap:.6rem; max-height:280px; overflow:auto; }
    .predio3d-details-item { background:#f8fbff; border:1px solid #e3edf9; border-radius:12px; padding:.75rem; }
    .predio3d-empty { padding:2rem; text-align:center; color:var(--muted); }
    @media (max-width:980px) { .predio3d-layout { grid-template-columns:1fr; } .predio3d-stage, .predio3d-viewport { min-height:560px; } .predio3d-building { width:540px; } .predio3d-tower-a { left:120px; } .predio3d-tower-b { left:300px; } }

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
            <div id="predio3dBuilding" class="predio3d-building"></div>
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
          <select id="rtDiaTorre" onchange="appRT.atualizarSelectPavimentos('rtDiaTorre', 'rtDiaPavimento')"></select>
        </div>
        <div class="form-group">
          <label for="rtDiaPavimento">Pavimento</label>
          <select id="rtDiaPavimento"></select>
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
          <select id="rtTorre" onchange="appRT.atualizarSelectPavimentos('rtTorre', 'rtPavimento')"></select>
        </div>
        <div class="form-group">
          <label for="rtPavimento">Pavimento</label>
          <select id="rtPavimento"></select>
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
  TOWER_CONFIG: { 'Torre A': 18, 'Torre B': 20 },
  state: { rotateX: -16, rotateY: -28, scale: 1, selected: null, tower: 'all', dragging: false, startX: 0, startY: 0, baseRotateX: -16, baseRotateY: -28 },
  controlsBound: false,

  normalizeTower(value) {
    const txt = String(value || '').trim().toLowerCase();
    if (!txt) return '';
    if (txt.includes('torre a') || txt === 'a' || txt.endsWith(' a')) return 'Torre A';
    if (txt.includes('torre b') || txt === 'b' || txt.endsWith(' b')) return 'Torre B';
    return String(value || '').trim();
  },

  normalizeFloor(value) {
    const txt = String(value || '').trim();
    if (!txt) return '';
    const lower = txt.toLowerCase();
    if (lower.includes('térreo') || lower.includes('terreo') || lower === 't') return 'Térreo';
    const match = lower.match(/(\d+)/);
    if (match) return `${parseInt(match[1], 10)}º Pavto`;
    return txt;
  },

  towerNames() {
    return Object.keys(this.TOWER_CONFIG);
  },

  floorsForTower(tower) {
    const nome = this.normalizeTower(tower);
    const total = this.TOWER_CONFIG[nome] || 0;
    return ['Térreo', ...Array.from({ length: total }, (_, i) => `${i + 1}º Pavto`)];
  },

  getItensBase() {
    const planejamento = (window.appRT?.itens || []).map(item => ({ ...item, torre: this.normalizeTower(item.torre), pavimento: this.normalizeFloor(item.pavimento), origem: 'planejamento' }));
    const diaDia = (window.appRT?.itensDiaDia || []).map(item => ({ ...item, torre: this.normalizeTower(item.torre), pavimento: this.normalizeFloor(item.pavimento), origem: 'dia-dia' }));
    return [...planejamento, ...diaDia];
  },

  torresDisponiveis() {
    return ['all', ...this.towerNames()];
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
    sel.value = current;
    this.state.tower = sel.value || 'all';
  },

  computeFloorStatus(items) {
    if (!items.length) return 'cinza';
    const statuses = items.map(i => String(i.status || '').trim());
    const today = new Date();
    today.setHours(0,0,0,0);
    const allConcluidos = statuses.length > 0 && statuses.every(s => s === 'Concluído');
    const andamento = statuses.some(s => ['Pedir agora','RT lançada','Em suprimentos','Aguardando entrega','Entregue','Planejado'].includes(s));
    const atrasado = items.some(i => {
      const dt = this.parseDate(i.dataServico || i['Início Planejado'] || i.dataNecessidade || '');
      const st = String(i.status || '');
      return dt && dt < today && !['Concluído','Entregue'].includes(st);
    });
    if (allConcluidos) return 'verde';
    if (atrasado) return 'vermelho';
    if (andamento) return 'amarelo';
    return 'cinza';
  },

  groupFloors() {
    const items = this.getItensBase();
    const towers = this.state.tower === 'all' ? this.towerNames() : [this.state.tower];
    return towers.flatMap(tower => this.floorsForTower(tower).map(floor => {
      const floorItems = items.filter(i => this.normalizeTower(i.torre) === tower && this.normalizeFloor(i.pavimento) === floor);
      return { key: `${tower}|${floor}`, tower, floor, items: floorItems, status: this.computeFloorStatus(floorItems) };
    }));
  },

  renderTower(building, tower, floors) {
    const floorHeight = 26;
    const towerEl = document.createElement('div');
    towerEl.className = `predio3d-tower ${tower === 'Torre A' ? 'predio3d-tower-a' : 'predio3d-tower-b'}`;
    towerEl.style.height = `${floors.length * floorHeight + 42}px`;

    floors.forEach((floorObj, idx) => {
      const y = idx * floorHeight;
      const floor = document.createElement('div');
      floor.className = `predio3d-floor predio3d-${floorObj.status}${this.state.selected === floorObj.key ? ' active' : ''}`;
      floor.style.bottom = `${y}px`;
      floor.innerHTML = `
        <div class="face front" onclick='predio3D.selectFloor(${JSON.stringify(floorObj.key)})'>
          <span>${floorObj.floor}</span>
          <span>${predio3D.statusLabel(floorObj.status)}</span>
        </div>
        <div class="face back"></div>
        <div class="face left"></div>
        <div class="face right"></div>
        <div class="face top"></div>
      `;
      towerEl.appendChild(floor);
    });

    const roof = document.createElement('div');
    roof.className = 'predio3d-tower-roof';
    roof.style.bottom = `${floors.length * floorHeight + 4}px`;
    towerEl.appendChild(roof);

    const base = document.createElement('div');
    base.className = 'predio3d-tower-base';
    towerEl.appendChild(base);
    building.appendChild(towerEl);
  },

  render() {
    this.buildTowerSelect();
    const floors = this.groupFloors();
    const building = document.getElementById('predio3dBuilding');
    const floorList = document.getElementById('predio3dFloorList');
    const details = document.getElementById('predio3dDetails');
    const selectedLabel = document.getElementById('predio3dSelectedLabel');
    const countFloors = document.getElementById('predio3dCountFloors');
    const countCritical = document.getElementById('predio3dCountCritical');
    if (!building || !floorList || !details || !selectedLabel || !countFloors || !countCritical) return;

    countFloors.textContent = String(floors.length);
    countCritical.textContent = String(floors.filter(f => f.status === 'vermelho').length);

    const defaultSelected = floors.length ? floors[floors.length - 1].key : null;
    if (!this.state.selected) this.state.selected = defaultSelected;
    if (this.state.selected && !floors.some(f => f.key === this.state.selected)) this.state.selected = defaultSelected;

    building.innerHTML = '<div class="predio3d-scene-ground"></div><div class="predio3d-shadow predio3d-shadow-a"></div><div class="predio3d-shadow predio3d-shadow-b"></div>';
    building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;

    const floorsByTower = this.towerNames().map(tower => ({ tower, floors: floors.filter(f => f.tower === tower) })).filter(x => this.state.tower === 'all' ? true : x.tower === this.state.tower);
    floorsByTower.forEach(({ tower, floors: towerFloors }) => this.renderTower(building, tower, towerFloors));

    floorList.innerHTML = floors.length ? floors.slice().sort((a, b) => a.tower.localeCompare(b.tower, 'pt-BR') || this.pavimentoOrder(b.floor) - this.pavimentoOrder(a.floor)).map(f => `
      <div class="predio3d-floor-item ${this.state.selected === f.key ? 'active' : ''}" onclick='predio3D.selectFloor(${JSON.stringify(f.key)})'>
        <div>
          <div style="font-weight:700;color:var(--blue-dark)">${f.tower} • ${f.floor}</div>
          <div style="font-size:.82rem;color:var(--muted)">${f.items.length} item(ns)</div>
        </div>
        <span class="predio3d-badge">${this.statusLabel(f.status)}</span>
      </div>
    `).join('') : '<div class="predio3d-empty">Nenhum pavimento encontrado.</div>';

    const selected = floors.find(f => f.key === this.state.selected);
    if (!selected) {
      selectedLabel.textContent = 'Selecione um pavimento';
      details.innerHTML = '<div class="predio3d-empty">Nenhum pavimento disponível.</div>';
    } else if (!selected.items.length) {
      selectedLabel.textContent = `${selected.tower} • ${selected.floor} • Sem dados`;
      details.innerHTML = `<div class="predio3d-details-item"><strong>${selected.tower} • ${selected.floor}</strong><div style="margin-top:.35rem;font-size:.9rem;color:var(--muted);">Ainda não existe RT criada para este pavimento.</div></div>`;
    } else {
      selectedLabel.textContent = `${selected.tower} • ${selected.floor} • ${this.statusLabel(selected.status)}`;
      details.innerHTML = selected.items.map(item => `
        <div class="predio3d-details-item">
          <div style="display:flex;justify-content:space-between;gap:.8rem;">
            <strong>${item.servico || 'Serviço não informado'}</strong>
            <span class="predio3d-badge">${item.status || 'Planejado'}</span>
          </div>
          <div style="margin-top:.35rem;font-size:.88rem;color:var(--muted);">
            Torre: ${item.torre || '-'} • Pavimento: ${item.pavimento || '-'}
          </div>
          <div style="margin-top:.35rem;font-size:.88rem;color:var(--muted);">
            Material: ${item.material || '-'} • Início: ${item.dataServico || item['Início Planejado'] || item.dataNecessidade || '-'}
          </div>
        </div>
      `).join('');
    }

    this.ensureControls();
  },

  selectFloor(floorKey) {
    this.state.selected = floorKey;
    this.render();
  },

  resetView() {
    this.state.rotateX = -16;
    this.state.rotateY = -28;
    this.state.scale = 1;
    this.render();
  },

  ensureControls() {
    if (this.controlsBound) return;
    const viewport = document.getElementById('predio3dViewport');
    if (!viewport) return;
    const startDrag = (clientX, clientY) => {
      this.state.dragging = true;
      this.state.startX = clientX;
      this.state.startY = clientY;
      this.state.baseRotateX = this.state.rotateX;
      this.state.baseRotateY = this.state.rotateY;
      viewport.classList.add('dragging');
    };
    const moveDrag = (clientX, clientY) => {
      if (!this.state.dragging) return;
      const dx = clientX - this.state.startX;
      const dy = clientY - this.state.startY;
      this.state.rotateY = this.state.baseRotateY + dx * 0.28;
      this.state.rotateX = Math.max(-55, Math.min(25, this.state.baseRotateX - dy * 0.18));
      const building = document.getElementById('predio3dBuilding');
      if (building) building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    };
    const endDrag = () => { this.state.dragging = false; viewport.classList.remove('dragging'); };
    viewport.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);
    viewport.addEventListener('touchstart', e => { const t = e.touches[0]; if (t) startDrag(t.clientX, t.clientY); }, { passive: true });
    viewport.addEventListener('touchmove', e => { const t = e.touches[0]; if (t) moveDrag(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener('touchend', endDrag);
    viewport.addEventListener('wheel', e => {
      e.preventDefault();
      this.state.scale = Math.max(0.75, Math.min(1.45, this.state.scale + (e.deltaY < 0 ? 0.06 : -0.06)));
      const building = document.getElementById('predio3dBuilding');
      if (building) building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    }, { passive: false });
    this.controlsBound = true;
  },

  gerarPdf() {
    const floors = this.groupFloors();
    const html = `
      <html><head><title>3D PRÉDIO</title></head>
      <body style="font-family:Arial,sans-serif;padding:24px;color:#1f2937;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
          <h1 style="margin:0;color:#1F3864;font-size:24px;">3D PRÉDIO</h1>
          <div style="font-size:12px;color:#6b7a99;">Gerado em ${new Date().toLocaleString('pt-BR')}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr>
              <th style="padding:.6rem;border:1px solid #d7e2f2;background:#eef5ff;text-align:left;">Torre</th>
              <th style="padding:.6rem;border:1px solid #d7e2f2;background:#eef5ff;text-align:left;">Pavimento</th>
              <th style="padding:.6rem;border:1px solid #d7e2f2;background:#eef5ff;text-align:left;">Status</th>
              <th style="padding:.6rem;border:1px solid #d7e2f2;background:#eef5ff;text-align:left;">Itens</th>
            </tr>
          </thead>
          <tbody>
            ${floors.map(f => `<tr><td style="padding:.55rem;border:1px solid #d7e2f2;">${f.tower}</td><td style="padding:.55rem;border:1px solid #d7e2f2;">${f.floor}</td><td style="padding:.55rem;border:1px solid #d7e2f2;">${this.statusLabel(f.status)}</td><td style="padding:.55rem;border:1px solid #d7e2f2;">${f.items.map(i => `${i.servico || '-'} / ${i.material || '-'}`).join('<br>') || 'Sem RT'}</td></tr>`).join('')}
          </tbody>
        </table>
      </body></html>`;
    const janela = window.open('', '_blank');
    if (!janela) return;
    janela.document.write(html);
    janela.document.close();
    janela.focus();
    janela.print();
  }
};

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
    this.prepararSelectsRT();
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


  torresPadrao() {
    return predio3D.towerNames();
  },

  normalizarTorre(valor) {
    return predio3D.normalizeTower(valor);
  },

  normalizarPavimento(valor) {
    return predio3D.normalizeFloor(valor);
  },

  pavimentosPorTorre(torre) {
    const nome = this.normalizarTorre(torre) || this.torresPadrao()[0];
    return predio3D.floorsForTower(nome);
  },

  preencherSelectTorres(selectId, valorAtual = '') {
    const el = document.getElementById(selectId);
    if (!el) return;
    const torres = this.torresPadrao();
    el.innerHTML = torres.map(t => `<option value="${t}">${t}</option>`).join('');
    el.value = torres.includes(valorAtual) ? valorAtual : torres[0];
  },

  atualizarSelectPavimentos(selectTorreId, selectPavimentoId, valorAtual = '') {
    const torre = this.normalizarTorre(document.getElementById(selectTorreId)?.value || '') || this.torresPadrao()[0];
    const el = document.getElementById(selectPavimentoId);
    if (!el) return;
    const pavimentos = this.pavimentosPorTorre(torre);
    el.innerHTML = pavimentos.map(p => `<option value="${p}">${p}</option>`).join('');
    el.value = pavimentos.includes(valorAtual) ? valorAtual : pavimentos[0];
  },

  prepararSelectsRT() {
    this.preencherSelectTorres('rtTorre', this.normalizarTorre(document.getElementById('rtTorre')?.value || '') || 'Torre A');
    this.atualizarSelectPavimentos('rtTorre', 'rtPavimento', this.normalizarPavimento(document.getElementById('rtPavimento')?.value || '') || 'Térreo');
    this.preencherSelectTorres('rtDiaTorre', this.normalizarTorre(document.getElementById('rtDiaTorre')?.value || '') || 'Torre A');
    this.atualizarSelectPavimentos('rtDiaTorre', 'rtDiaPavimento', this.normalizarPavimento(document.getElementById('rtDiaPavimento')?.value || '') || 'Térreo');
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
      torre: this.normalizarTorre(item.Torre || item.torre || ''),
      pavimento: this.normalizarPavimento(item.Pavimento || item.pavimento || ''),
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
      torre: this.normalizarTorre(item.torre || ''),
      pavimento: this.normalizarPavimento(item.pavimento || ''),
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
          this.itens = cloud.map((item, idx) => this.normalizarPlanejamentoImportado(item, idx));
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens));
        }
      }
      if (window.__fb?.carregarRTDiaDiaDaNuvem) {
        const cloudDia = await window.__fb.carregarRTDiaDiaDaNuvem();
        if (Array.isArray(cloudDia)) {
          this.itensDiaDia = cloudDia.map((item, idx) => this.normalizarDiaDia(item, idx));
          localStorage.setItem(this.STORAGE_KEY_DIA_DIA, JSON.stringify(this.itensDiaDia));
        }
      }
      if (!this.itens.length) {
        const salvos = localStorage.getItem(this.STORAGE_KEY);
        this.itens = salvos ? JSON.parse(salvos).map((item, idx) => this.normalizarPlanejamentoImportado(item, idx)) : [];
      }
      if (!this.itensDiaDia.length) {
        const salvosDia = localStorage.getItem(this.STORAGE_KEY_DIA_DIA);
        this.itensDiaDia = salvosDia ? JSON.parse(salvosDia).map((item, idx) => this.normalizarDiaDia(item, idx)) : [];
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
          this.itens = Array.isArray(itens) ? itens.map((item, idx) => this.normalizarPlanejamentoImportado(item, idx)) : [];
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens)); } catch(e) {}
          this.renderizar();
        });
      }
      if (window.__fb?.escutarMudancasRTDiaDia) {
        if (this._unsubDiaDia) this._unsubDiaDia();
        this._unsubDiaDia = window.__fb.escutarMudancasRTDiaDia((itens) => {
          this.itensDiaDia = Array.isArray(itens) ? itens.map((item, idx) => this.normalizarDiaDia(item, idx)) : [];
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
    this.preencherSelectTorres('rtTorre', 'Torre A');
    this.atualizarSelectPavimentos('rtTorre', 'rtPavimento', 'Térreo');
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
    this.preencherSelectTorres('rtTorre', this.normalizarTorre(item.torre) || 'Torre A');
    this.atualizarSelectPavimentos('rtTorre', 'rtPavimento', this.normalizarPavimento(item.pavimento) || 'Térreo');
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
      torre: this.normalizarTorre(document.getElementById('rtTorre').value),
      pavimento: this.normalizarPavimento(document.getElementById('rtPavimento').value),
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
    this.preencherSelectTorres('rtDiaTorre', 'Torre A');
    this.atualizarSelectPavimentos('rtDiaTorre', 'rtDiaPavimento', 'Térreo');
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
    this.preencherSelectTorres('rtDiaTorre', this.normalizarTorre(item.torre) || 'Torre A');
    this.atualizarSelectPavimentos('rtDiaTorre', 'rtDiaPavimento', this.normalizarPavimento(item.pavimento) || 'Térreo');
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
      torre: this.normalizarTorre(document.getElementById('rtDiaTorre').value),
      pavimento: this.normalizarPavimento(document.getElementById('rtDiaPavimento').value),
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
