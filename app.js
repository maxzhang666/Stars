/* Star 书架 —— 纯静态，无框架。数据来自 data.js（由 fetch_stars.py 生成）。 */
(function () {
  'use strict';

  const D = window.STARS || { repos: [], stats: {} };
  const T = window.I18N;

  // ---------- 语言 → 颜色（GitHub linguist 的常用色，够用即可） ----------
  const LANG_COLOR = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Go: '#00ADD8',
    Rust: '#dea584', Java: '#b07219', 'C++': '#f34b7d', C: '#555555', 'C#': '#178600',
    Ruby: '#701516', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
    Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', Vue: '#41b883', Svelte: '#ff3e00',
    Elixir: '#6e4a7e', Haskell: '#5e5086', Lua: '#000080', Perl: '#0298c3',
    Scala: '#c22d40', Clojure: '#db5855', Zig: '#ec915c', Nim: '#ffc200', Julia: '#a270ba',
    'Jupyter Notebook': '#DA5B0B', 'Objective-C': '#438eff', 'F#': '#b845fc', OCaml: '#ef7a08',
    'Vim Script': '#199f4b', Makefile: '#427819', Dockerfile: '#384d54', MDX: '#fcb32c',
  };
  const langColor = l => LANG_COLOR[l] || '#8b949e';

  // ---------- 图标（lucide 路径，与原型同源） ----------
  const P = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.775a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/>',
    fork: '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    sliders: '<path d="M10 5H3M12 19H3M14 3v4M21 12a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2zM7 15v4"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    list: '<path d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM7 21h10"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    issue: '<circle cx="12" cy="12" r="10"/><path d="M14.31 8 10 12.39 7.41 9.9"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    calendar: '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
    dot: '<circle cx="12.1" cy="12.1" r="1"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  };
  const icon = (n, cls) => `<svg class="${cls || 'size-4'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

  // ---------- 转义 & 格式化 ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const fmtNum = n => {
    n = Number(n) || 0;
    if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1).replace(/\.0$/, '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 || n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
    return String(n);
  };
  const fmtFull = n => (Number(n) || 0).toLocaleString('en-US');

  function fmtAgo(days) {
    if (days == null) return '';
    if (days <= 0) return t('repo.today');
    if (days === 1) return t('repo.yesterday');
    if (days < 30) return t('repo.daysAgo', { n: days });
    if (days < 365) return t('repo.monthsAgo', { n: Math.round(days / 30) });
    return t('repo.yearsAgo', { n: Math.round(days / 365) });
  }

  // ---------- 状态 ----------
  // 站点标题/副标题优先用 data.js 里的配置（别人通过 workflow_call 传入），
  // 没有配置才回落到词典默认值 —— 这样使用者无需 fork 改代码即可定制。
  const SITE = D.site || {};
  // 底栏版权链接指向本项目仓库
  const OWNER = 'maxzhang666';
  const REPO = 'OpsStar';
  const siteTitle = () => SITE.title || t('site.title');
  const siteDesc = () => SITE.desc || t('site.desc');

  let L = localStorage.getItem('stars-lang') || SITE.lang || 'zh-CN';
  if (!T[L]) L = 'zh-CN';
  let theme = localStorage.getItem('stars-theme') || 'system';
  const applyTheme = () => {
    const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  };
  applyTheme();

  // 词典里的占位符形如 {n} / {total}，由调用方传值替换
  const t = (k, params) => {
    let s = (T[L] && T[L][k]) || T['zh-CN'][k] || k;
    if (params) {
      s = s.replace(/\{(\w+)\}/g, (whole, name) =>
        Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : whole);
    }
    return s;
  };

  // ---------- 筛选状态 ----------
  const PAGE = 60;   // 首屏渲染 60 条，之后滚动触底每次再加一批
  const f = {
    lang: 'all', lic: 'all', q: '', sort: 'stars', topic: '',
    starsOnly: false, hideArchived: false, activeOnly: false,
    view: localStorage.getItem('stars-view') || 'grid', open: false,
    limit: PAGE,
  };

  const hasDesc = r => (r.desc || '') + ' ' + (r.fullName || '') + ' ' + (r.owner || '') + ' ' + (r.topics || []).join(' ');

  function matches() {
    let list = D.repos.filter(r => {
      if (f.lang === '__none' ? !!r.lang : (f.lang !== 'all' && r.lang !== f.lang)) return false;
      if (f.lic === '__none' ? !!r.license : (f.lic !== 'all' && r.license !== f.lic)) return false;
      if (f.topic && !(r.topics || []).includes(f.topic)) return false;
      if (f.starsOnly && r.stars < 1000) return false;
      if (f.hideArchived && r.archived) return false;
      if (f.activeOnly && (r.pushedAgo == null || r.pushedAgo > 365)) return false;
      if (f.q) {
        const q = f.q.toLowerCase();
        if (!hasDesc(r).toLowerCase().includes(q)) return false;
      }
      return true;
    });

    const dir = f.sort === 'name' ? 1 : -1;
    list.sort((a, b) => {
      if (f.sort === 'name') return a.name.localeCompare(b.name);
      if (f.sort === 'recent') return ((a.starredAgo ?? 9e9) - (b.starredAgo ?? 9e9)) * -dir;
      if (f.sort === 'pushed') return ((a.pushedAgo ?? 9e9) - (b.pushedAgo ?? 9e9)) * -dir;
      return (b.stars - a.stars);
    });
    return list;
  }

  // ---------- 组件 ----------
  const badge = (txt, cls) => `<span class="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground ${cls || ''}">${txt}</span>`;

  const langDot = l => l
    ? `<span class="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><span class="size-2 shrink-0 rounded-full" style="background:${esc(langColor(l))}"></span>${esc(l)}</span>`
    : '';

  const licenseBadge = lic => {
    if (!lic || lic === 'NOASSERTION') return '';
    return badge(esc(lic), 'border-border');
  };

  // 缺字段就不显示徽标，不用「无语言」「无许可证」占位——那只是噪音。
  function metaBadges(r) {
    const noLang = !r.lang, noLic = !r.license || r.license === 'NOASSERTION';
    if (!noLang && noLic) return '';
    return (noLang ? '' : langDot(r.lang)) + licenseBadge(r.license);
  }

  // star 数据里没有评分，卡片右上角改显 star 数
  function repoCard(r) {
    return `
    <article role="button" tabindex="0" data-repo="${esc(r.fullName)}"
      onclick="F.openDrawer('${esc(r.fullName)}')"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();F.openDrawer('${esc(r.fullName)}')}"
      aria-label="${esc(t('drawer.openLabel', { name: r.name }))}"
      class="group flex min-w-0 cursor-pointer flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground transition-colors hover:border-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2">
      <div class="flex items-start gap-3">
        <img src="${esc(r.ownerAvatar)}" alt="" width="44" height="44" loading="lazy" decoding="async"
             class="size-11 shrink-0 rounded-[22%] bg-muted object-cover">
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-2">
            <h3 class="truncate font-semibold leading-tight">
              <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="hover:underline underline-offset-4">${esc(r.name)}</a>
            </h3>
            <span class="inline-flex shrink-0 items-center gap-1 text-xs font-medium tabular-nums text-muted-foreground">
              ${icon('star', 'size-3.5 fill-amber-400 text-amber-400')}${fmtNum(r.stars)}
            </span>
          </div>
          <p class="mt-0.5 truncate text-xs text-muted-foreground">${esc(r.owner)}</p>
          <p class="mt-1 line-clamp-2 text-sm text-muted-foreground">${r.desc ? esc(r.desc) : ''}</p>
        </div>
      </div>
      ${r.archived ? `<div>${badge(icon('archive', 'size-3') + esc(t('repo.archived')), 'border-amber-500/30 text-amber-700 dark:text-amber-300')}</div>` : ''}
      ${(() => {
        const row = metaBadges(r) + (r.isFork ? badge(esc(t('repo.fork'))) : '');
        return row ? `<div class="flex flex-nowrap items-center gap-1 overflow-hidden">${row}</div>` : '';
      })()}
      ${(() => {
        // topics 数量差异大（4个到 30+都有），按格子数硬切会让卡片高度参差。
        // 用单行 + 尾部渐隐截断，高度恒定，完整列表在抽屉里看。
        const tp = (r.topics || []).slice(0, 6);
        if (!tp.length) return '';
        return `<div class="relative overflow-hidden">
          <div class="flex flex-nowrap gap-1">
            ${tp.map(x => `<span class="shrink-0">${badge('#' + esc(x))}</span>`).join('')}
            ${r.topics.length > tp.length ? `<span class="shrink-0">${badge('+' + (r.topics.length - tp.length))}</span>` : ''}
          </div>
          <span aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card to-transparent"></span>
        </div>`;
      })()}
      <div class="mt-auto flex items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
        <span class="inline-flex items-center gap-1">${icon('clock', 'size-3')}${esc(fmtAgo(r.pushedAgo))}</span>
        <span class="inline-flex items-center gap-3">
          <span class="inline-flex items-center gap-1 tabular-nums">${icon('fork', 'size-3')}${fmtNum(r.forks)}</span>
          <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="inline-flex items-center gap-1 font-medium text-foreground/80 hover:underline">
            ${icon('external', 'size-3')}${esc(t('repo.visit'))}
          </a>
        </span>
      </div>
    </article>`;
  }

  function repoRow(r) {
    return `
    <div class="flex items-center gap-3 py-3">
      <img src="${esc(r.ownerAvatar)}" alt="" width="44" height="44" loading="lazy" decoding="async"
           class="size-11 shrink-0 rounded-[22%] bg-muted object-cover">
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" class="truncate font-medium hover:underline underline-offset-4">${esc(r.name)}</a>
          ${r.archived ? badge(esc(t('repo.archived')), 'border-amber-500/30 text-amber-700 dark:text-amber-300') : ''}
          <span class="inline-flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground tabular-nums">${icon('star', 'size-3 fill-amber-400 text-amber-400')}${fmtNum(r.stars)}</span>
        </div>
        ${r.desc ? `<p class="truncate text-sm text-muted-foreground">${esc(r.desc)}</p>` : ''}
      </div>
      <div class="hidden shrink-0 items-center gap-3 md:flex">
        ${metaBadges(r)}
        <span class="w-24 text-right text-xs text-muted-foreground">${esc(fmtAgo(r.pushedAgo))}</span>
      </div>
      <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t('repo.visit'))}"
         class="inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-muted-foreground hover:bg-accent hover:text-foreground">
        ${icon('external', 'size-4')}
      </a>
    </div>`;
  }

  // ---------- 侧栏筛选 ----------
  function sidebar() {
    const langs = Object.entries(D.stats.langs || {});
    const lics = Object.entries(D.stats.licenses || {});
    const box = 'size-4 rounded border-input accent-brand';
    const rowCls = on => `flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent ${on ? 'bg-accent font-medium' : ''}`;

    return `
    <aside id="filters" class="${f.open ? '' : 'hidden'} lg:block" aria-label="${esc(t('filter.category'))}">
      <div class="space-y-6 lg:sticky lg:top-20">
        <fieldset>
          <legend class="mb-2 text-sm font-semibold">${esc(t('filter.category'))}</legend>
          <div class="scroll-slim max-h-80 space-y-0.5 overflow-y-auto pr-1">
            <label class="${rowCls(f.lang === 'all')}">
              <input type="radio" name="lang" class="${box}" ${f.lang === 'all' ? 'checked' : ''} onchange="F.set('lang','all')">
              <span class="flex-1">${esc(t('filter.all'))}</span>
              <span class="text-xs tabular-nums text-muted-foreground">${fmtNum(D.repos.length)}</span>
            </label>
            ${langs.map(([k, v]) => `
              <label class="${rowCls(f.lang === k)}">
                <input type="radio" name="lang" class="${box}" ${f.lang === k ? 'checked' : ''} onchange="F.set('lang',${JSON.stringify(k).replace(/"/g, '&quot;')})">
                <span class="flex-1 truncate">${esc(k)}</span>
                <span class="text-xs tabular-nums text-muted-foreground">${v}</span>
              </label>`).join('')}
          </div>
        </fieldset>

        <fieldset>
          <legend class="mb-2 text-sm font-semibold">${esc(t('filter.license'))}</legend>
          <div class="scroll-slim max-h-48 space-y-0.5 overflow-y-auto pr-1">
            <label class="${rowCls(f.lic === 'all')}">
              <input type="radio" name="lic" class="${box}" ${f.lic === 'all' ? 'checked' : ''} onchange="F.set('lic','all')">
              <span class="flex-1">${esc(t('filter.allLicenses'))}</span>
              <span class="text-xs tabular-nums text-muted-foreground">${fmtNum(D.repos.length)}</span>
            </label>
            ${lics.map(([k, v]) => `
              <label class="${rowCls(f.lic === k)}">
                <input type="radio" name="lic" class="${box}" ${f.lic === k ? 'checked' : ''} onchange="F.set('lic',${JSON.stringify(k).replace(/"/g, '&quot;')})">
                <span class="flex-1 truncate">${esc(k === 'NOASSERTION' ? t('repo.noLicense') : k)}</span>
                <span class="text-xs tabular-nums text-muted-foreground">${v}</span>
              </label>`).join('')}
          </div>
        </fieldset>

        <fieldset class="space-y-0.5">
          <legend class="mb-2 text-sm font-semibold">${esc(t('filter.more'))}</legend>
          ${[['starsOnly', t('filter.starsOnly')], ['hideArchived', t('filter.hideArchived')], ['activeOnly', t('filter.activeOnly')]].map(([k, label]) => `
            <label class="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
              <input type="checkbox" class="${box}" ${f[k] ? 'checked' : ''} onchange="F.toggle('${k}')">
              <span class="flex-1">${esc(label)}</span>
            </label>`).join('')}
        </fieldset>
      </div>
    </aside>`;
  }

  function chips() {
    const c = [];
    if (f.lang !== 'all') c.push([f.lang === '__none' ? t('filter.noLang') : f.lang, `F.set('lang','all')`]);
    if (f.lic !== 'all') c.push([f.lic === 'NOASSERTION' || f.lic === '__none' ? t('repo.noLicense') : f.lic, `F.set('lic','all')`]);
    if (f.starsOnly) c.push([t('filter.starsOnly'), `F.toggle('starsOnly')`]);
    if (f.hideArchived) c.push([t('filter.hideArchived'), `F.toggle('hideArchived')`]);
    if (f.activeOnly) c.push([t('filter.activeOnly'), `F.toggle('activeOnly')`]);
    if (!c.length) return '';
    return c.map(([label, fn]) => `<button type="button" onclick="${fn}" class="inline-flex cursor-pointer items-center gap-1 rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-medium hover:bg-accent">${esc(label)}${icon('x', 'size-3')}</button>`).join('') +
      `<button type="button" onclick="F.clear()" class="cursor-pointer text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">${esc(t('filter.clear'))}</button>`;
  }

  function results() {
    if (!D.repos || !D.repos.length) {
      return `<div class="flex flex-col items-center px-6 py-16 text-center">
        <div class="mb-4 grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">${icon('inbox', 'size-5')}</div>
        <h3 class="font-semibold">${esc(t('state.error'))}</h3>
        <p class="mt-1 max-w-sm text-sm text-muted-foreground">${esc(t('state.errorDesc'))}</p>
      </div>`;
    }
    const list = matches();
    if (!list.length) {
      return `<div class="flex flex-col items-center px-6 py-16 text-center">
        <div class="mb-4 grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">${icon('search', 'size-5')}</div>
        <h3 class="font-semibold">${esc(t('state.empty'))}</h3>
        <p class="mt-1 max-w-sm text-sm text-muted-foreground">${esc(t('state.emptyDesc'))}</p>
        <div class="mt-5"><button type="button" onclick="F.clear()" class="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-3 text-[13px] font-medium hover:bg-accent">${esc(t('filter.clear'))}</button></div>
      </div>`;
    }

    const filtered = list.length !== D.repos.length;
    const head = `<p class="mb-3 text-sm text-muted-foreground" role="status">${filtered
      ? esc(t('state.countFiltered', { n: fmtNum(list.length), total: fmtFull(D.repos.length) }))
      : esc(t('state.count', { n: fmtFull(list.length) }))}</p>`;

    // 只渲染前 f.limit 条；滚到底由 IntersectionObserver 触发 F.more() 追加
    const shown = list.slice(0, f.limit);
    const rest = list.length - shown.length;

    const body = f.view === 'list'
      ? `<div id="repoList" class="divide-y rounded-xl border bg-card px-4">${shown.map(repoRow).join('')}</div>`
      // 必须显式写 grid-cols-1：否则移动端只有隐式 auto 轨道，
      // 卡片内容把 min-width:auto 顶到 458px，撑破 358px 的容器造成横向溢出。
      // grid-cols-1 = repeat(1, minmax(0,1fr))，minmax 的 0 正好堵住这个坑。
      : `<div id="repoList" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">${shown.map(repoCard).join('')}</div>`;

    // 哨兵：进入视口就加载下一批；全部加载完显示结束提示
    const tail = rest > 0
      ? `<div id="scrollTail" class="mt-6 flex flex-col items-center gap-2" aria-hidden="true">
           <span class="skeleton h-4 w-28"></span>
           <span data-shown-of class="text-xs text-muted-foreground">${esc(t('state.shownOf', { shown: fmtFull(shown.length), total: fmtFull(list.length) }))}</span>
         </div>`
      : `<p class="mt-6 text-center text-xs text-muted-foreground">${esc(t('state.allLoaded', { n: fmtFull(list.length) }))}</p>`;

    return head + body + tail;
  }

  // ---------- 详情抽屉 ----------
  // 数据全部来自已加载的 data.js，不发请求：Pages 是静态站，
  // 浏览器调 GitHub API 既受CORS 限制也会消耗匿名配额。
  let drawerRepo = null;
  let lastFocus = null;
  let readmeAbort = null;   // 必须早于 loadReadme 声明，否则 let 的 TDZ 会让赋值抛 ReferenceError

  const byFullName = n => (D.repos || []).find(r => r.fullName === n);

  function statCell(ic, label, value, title) {
    return `<div class="flex items-center gap-2"${title ? ` title="${esc(title)}"` : ''}>
      <span class="text-muted-foreground">${icon(ic, 'size-4')}</span>
      <span class="min-w-0">
        <span class="block text-sm font-medium tabular-nums leading-tight">${esc(value)}</span>
        <span class="block text-[11px] text-muted-foreground">${esc(label)}</span>
      </span>
    </div>`;
  }

  function topicChip(x) {
    return `<button type="button" onclick="F.topic('${esc(x)}')"
      class="cursor-pointer rounded-md border bg-muted/50 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground">#${esc(x)}</button>`;
  }

  // 语言分布：仅 --enrich 抓取时才有，按字节数画横条
  function langBars(langs) {
    const entries = Object.entries(langs || {}).sort((a, b) => b[1] - a[1]);
    if (!entries.length) {
      return '';
    }
    const total = entries.reduce((s, [, v]) => s + v, 0);
    const shown = entries.slice(0, 8);
    return `<div class="space-y-1.5">
      ${shown.map(([k, v]) => {
        const pct = total ? (v / total) * 100 : 0;
        return `<div class="grid grid-cols-[minmax(0,5rem)_1fr_auto] items-center gap-2 text-xs">
          <span class="flex min-w-0 items-center gap-1.5">
            <span class="size-2 shrink-0 rounded-full" style="background:${esc(langColor(k))}"></span>
            <span class="truncate">${esc(k)}</span>
          </span>
          <span class="h-1.5 overflow-hidden rounded-full bg-muted">
            <span class="block h-full rounded-full" style="width:${pct.toFixed(1)}%;background:${esc(langColor(k))}"></span>
          </span>
          <span class="tabular-nums text-muted-foreground">${pct.toFixed(1)}%</span>
        </div>`;
      }).join('')}
      ${entries.length > shown.length ? `<p class="pt-0.5 text-[11px] text-muted-foreground">${esc(t('drawer.moreLangs', { n: entries.length - shown.length }))}</p>` : ''}
    </div>`;
  }

  function drawerHTML(r) {
    const features = [
      r.hasIssues ? t('drawer.hasIssues') : null,
      r.hasWiki ? t('drawer.hasWiki') : null,
      r.hasDiscussions ? t('drawer.hasDiscussions') : null,
      r.hasPages ? t('drawer.hasPages') : null,
    ].filter(Boolean);

    return `
    <div class="drawer-overlay fixed inset-0 z-50 bg-black/40" onclick="F.closeDrawer(event)"></div>
    <aside class="drawer-panel fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-background shadow-xl"
           role="dialog" aria-modal="true" aria-labelledby="drawerTitle" tabindex="-1" id="drawer">

      <header class="flex items-start gap-3 border-b px-5 py-4">
        <img src="${esc(r.ownerAvatar)}" alt="" width="40" height="40" decoding="async"
             class="size-10 shrink-0 rounded-[22%] bg-muted object-cover">
        <div class="min-w-0 flex-1">
          <h2 id="drawerTitle" class="truncate font-semibold leading-tight">
            <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" class="hover:underline underline-offset-4">${esc(r.name)}</a>
          </h2>
          <p class="mt-0.5 truncate text-xs text-muted-foreground">
            <a href="https://github.com/${esc(r.owner)}" target="_blank" rel="noopener noreferrer" class="hover:underline">${esc(r.owner)}</a>
          </p>
        </div>
        <button type="button" onclick="F.closeDrawer()" aria-label="${esc(t('drawer.close'))}"
                class="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          ${icon('x', 'size-4')}
        </button>
      </header>

      <div class="scroll-slim flex-1 overflow-y-auto px-5 py-4">
        ${r.desc ? `<p class="text-sm leading-relaxed">${esc(r.desc)}</p>` : ''}

        ${(() => {
          const extras = [r.isFork ? badge(esc(t('repo.fork'))) : '',
                          r.archived ? badge(icon('archive', 'size-3') + esc(t('repo.archived')), 'border-amber-500/30 text-amber-700 dark:text-amber-300') : ''].join('');
          const row = metaBadges(r) + extras;
          return row ? `<div class="mt-3 flex flex-wrap gap-1">${row}</div>` : '';
        })()}

        ${r.homepage ? `<a href="${esc(r.homepage)}" target="_blank" rel="noopener noreferrer"
            class="mt-3 flex items-center gap-1.5 truncate text-xs text-brand hover:underline underline-offset-4">
            ${icon('globe', 'size-3.5 shrink-0')}<span class="truncate">${esc(r.homepage.replace(/^https?:\/\//, ''))}</span>
          </a>` : ''}

        <div class="mt-5 grid grid-cols-2 gap-3">
          ${statCell('star', t('drawer.stars'), fmtNum(r.stars))}
          ${statCell('fork', t('drawer.forks'), fmtNum(r.forks))}
          ${r.openIssues != null ? statCell('issue', t('drawer.issues'), fmtNum(r.openIssues)) : ''}
          ${statCell('archive', t('drawer.size'), fmtBytes(r.size))}
        </div>

        <section class="mt-6">
          <h3 class="mb-2 text-xs font-medium text-muted-foreground">${esc(t('drawer.timeline'))}</h3>
          <dl class="space-y-1.5 text-xs">
            ${[
              ['drawer.starredAt', r.starredAgo],
              ['drawer.pushedAt', r.pushedAgo],
              ['drawer.createdAt', r.createdAgo],
            ].filter(([, d]) => d != null).map(([k, d]) => `
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground">${icon('clock', 'size-3.5')}</span>
                <dt class="text-muted-foreground">${esc(t(k))}</dt>
                <dd class="ml-auto tabular-nums">${esc(fmtAgo(d))}</dd>
              </div>`).join('')}
          </dl>
        </section>

        ${(() => {
          const bars = langBars(r.langs);
          if (!bars) return '';
          return `<section class="mt-6">
          <h3 class="mb-2 text-xs font-medium text-muted-foreground">${esc(t('drawer.languages'))}</h3>
          ${bars}
        </section>`;
        })()}

        ${r.topics && r.topics.length ? `
        <section class="mt-6">
          <h3 class="mb-2 text-xs font-medium text-muted-foreground">${esc(t('drawer.topics'))}</h3>
          <div class="flex flex-wrap gap-1">${r.topics.map(topicChip).join('')}</div>
        </section>` : ''}

        ${features.length ? `
        <section class="mt-6">
          <h3 class="mb-2 text-xs font-medium text-muted-foreground">${esc(t('drawer.features'))}</h3>
          <div class="flex flex-wrap gap-1">${features.map(x => badge(esc(x))).join('')}</div>
        </section>` : ''}

                <section id="readmeSection" class="mt-6 hidden" aria-live="polite">
          <div id="readmeBody" class="text-sm leading-relaxed"></div>
        </section>
      </div>

      <footer class="flex gap-2 border-t px-5 py-3">
        <button type="button" onclick="F.readme()" aria-expanded="false" id="readmeToggle"
                class="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent">
          ${icon('book', 'size-4')}<span>${esc(t('drawer.readme'))}</span>
        </button>
        <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"
           class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">
          ${icon('github', 'size-4')}${esc(t('repo.visit'))}
        </a>
      </footer>
    </aside>`;
  }

  // ---------- README 预览 ----------
  // 运行时按需请求，不进 data.js：1222 个 README 均值约 5 KB，
  // 预取会让产物涨到 6 MB。GitHub API 允许跨域（access-control-allow-origin: *），
  // 所以浏览器直连没问题。
  // 代价是每位访客有自己的 60 次/小时匿名配额，够看几十个仓库。
  const readmeCache = new Map();

  // 极简 Markdown → HTML。目标只是「能读」，不是完整实现：
  // 先抽掉图片/HTML 块，再处理标题、列表、代码、链接、加粗、行内代码。
  function mdToHtml(md, base) {
    const text = String(md || '');
    if (!text.trim()) return '';

    const lines = text.split('\n');
    const out = [];
    let inCode = false, inList = false, para = [];

    const flushPara = () => {
      if (para.length) { out.push('<p>' + inline(para.join(' '), base) + '</p>'); para = []; }
    };
    const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };

    for (let raw of lines) {
      const line = raw.replace(/\s+$/, '');

      // 代码块
      if (/^\s*```/.test(line)) {
        flushPara(); closeList();
        if (!inCode) { out.push('<pre class="readme-pre"><code>'); inCode = true; }
        else { out.push('</code></pre>'); inCode = false; }
        continue;
      }
      if (inCode) { out.push(esc(raw) + '\n'); continue; }

      // 图片独占一行：直接丢弃，README 里 badge 图太多
      if (/^\s*!\[.*\]\(.*\)\s*$/.test(line)) { flushPara(); closeList(); continue; }
      // HTML 块（<p align=center> 之类）：丢弃，避免注入
      if (/^\s*<[^>]+>/.test(line)) { flushPara(); closeList(); continue; }

      // 标题
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        flushPara(); closeList();
        const lv = Math.min(h[1].length + 2, 6);   // README 的 h1 当正文里的 h3
        out.push(`<h${lv} class="readme-h">${inline(h[2], base)}</h${lv}>`);
        continue;
      }

      // 引用
      const q = line.match(/^>\s?(.*)$/);
      if (q) { flushPara(); closeList(); out.push(`<blockquote class="readme-quote">${inline(q[1], base)}</blockquote>`); continue; }

      // 分隔线
      if (/^\s*([-*_])\1{2,}\s*$/.test(line)) { flushPara(); closeList(); out.push('<hr class="readme-hr">'); continue; }

      // 列表
      const li = line.match(/^\s*[-*+]\s+(.*)$/);
      if (li) {
        flushPara();
        if (!inList) { out.push('<ul class="readme-ul">'); inList = true; }
        out.push(`<li>${inline(li[1], base)}</li>`);
        continue;
      }
      closeList();

      // 分隔线（三横线常被当成列表前的 hr）
      if (!line.trim()) { flushPara(); closeList(); continue; }

      para.push(line.trim());
    }
    flushPara(); closeList();
    if (inCode) out.push('</code></pre>');
    return out.join('');
  }

  // 行内元素。所有文本都先转义再插入，避免 README 里的 HTML/XSS。
  // base 必须显式传入：inline 是独立函数，拿不到 mdToHtml 的参数。
  function inline(s, base) {
    let x = esc(s);
    // 缩略链接 ![alt](url) → alt 文本
    x = x.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    // 链接。README 由被收录的仓库提供，内容不可信，
    // javascript:/data: 这类伪协议必须拦掉，否则点一下就执行脚本。
    // 只放行 http(s)、站内相对路径和锚点。
    x = x.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (m, txt, href) => {
      const safe = /^(https?:\/\/|#)/i.test(href) ? href : base + href;
      return `<a href="${esc(safe)}" target="_blank" rel="noopener noreferrer">${txt}</a>`;
    });
    x = x.replace(/`([^`]+)`/g, '<code class="readme-code">$1</code>');
    x = x.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    x = x.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    x = x.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    return x;
  }

  async function loadReadme(r) {
    const section = document.getElementById('readmeSection');
    const body = document.getElementById('readmeBody');
    const btn = document.getElementById('readmeToggle');
    if (!section || !body) return;

    // 再次点击= 收起
    if (!section.classList.contains('hidden')) {
      section.classList.add('hidden');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      return;
    }

    section.classList.remove('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'true');

    if (readmeCache.has(r.fullName)) {
      body.innerHTML = readmeCache.get(r.fullName);
      return;
    }

    body.innerHTML = `<p class="text-xs text-muted-foreground">${esc(t('readme.loading'))}</p>`;

    try {
      readmeAbort = new AbortController();
      const res = await fetch(`https://api.github.com/repos/${r.fullName}/readme`, {
        headers: { Accept: 'application/vnd.github.raw' },
        signal: readmeAbort.signal,
      });
      readmeAbort = null;
      if (res.status === 404) {
        body.innerHTML = `<p class="text-xs text-muted-foreground">${esc(t('readme.none'))}</p>`;
        readmeCache.set(r.fullName, body.innerHTML);
        return;
      }
      if (res.status === 403 || res.status === 429) {
        body.innerHTML = `<p class="text-xs text-amber-700 dark:text-amber-400">${esc(t('readme.rateLimited'))}</p>`;
        return;
      }
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const md = await res.text();
      const html = mdToHtml(md, r.url + '/blob/HEAD/');
      const out = html
        ? html
        : `<p class="text-xs text-muted-foreground">${esc(t('readme.empty'))}</p>`;
      body.innerHTML = out;
      readmeCache.set(r.fullName, out);
    } catch (e) {
      if (e.name === 'AbortError') return;   // 关抽屉导致的中断，静默忽略
      body.innerHTML = `<p class="text-xs text-muted-foreground">${esc(t('readme.failed'))}</p>`;
    }
  }

  function fmtBytes(n) {
    if (n == null) return '—';
    if (n < 1024) return n + ' B';
    const units = ['KB', 'MB', 'GB'];
    let v = n / 1024, i = 0;
    while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
    return (v >= 100 ? v.toFixed(0) : v.toFixed(1)) + ' ' + units[i];
  }

  function openDrawer(fullName) {
    const r = byFullName(fullName);
    if (!r) return;
    drawerRepo = r;
    // 鼠标点击不会把焦点落到 article 上（activeElement 会是 body），
    // 所以显式记录触发它的卡片，关闭时还回去。
    const active = document.activeElement;
    lastFocus = (active && active !== document.body && document.contains(active))
      ? active
      : document.querySelector(`article[data-repo="${CSS.escape(fullName)}"]`);

    const host = document.getElementById('drawerHost');
    host.innerHTML = drawerHTML(r);
    host.classList.remove('hidden');
    document.body.classList.add('drawer-open');
    document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth) + 'px';
    // 常驻底栏在抽屉下方会与抽屉底部的操作按钮打架，直接藏掉
    const bf = document.querySelector('footer');
    if (bf) bf.style.display = 'none';

    const panel = document.getElementById('drawer');
    if (panel) panel.focus();

    if (!location.hash.startsWith('#r=')) {
      history.replaceState(null, '', '#r=' + encodeURIComponent(fullName));
    }
  }

  function closeDrawer() {
    if (!drawerRepo) return;
    // 中止在途请求，否则响应回来会写进已销毁的容器
    if (readmeAbort) { readmeAbort.abort(); readmeAbort = null; }
    drawerRepo = null;
    const host = document.getElementById('drawerHost');
    if (host) { host.innerHTML = ''; host.classList.add('hidden'); }
    document.body.classList.remove('drawer-open');
    document.body.style.paddingRight = '';
    const bf = document.querySelector('footer');
    if (bf) bf.style.display = '';
    if (location.hash.startsWith('#r=')) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    // 焦点还回触发它的卡片
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    lastFocus = null;
  }

  // 抽屉内 Tab 循环，避免焦点跑到背景内容上
  document.addEventListener('keydown', e => {
    if (!drawerRepo) return;
    if (e.key === 'Escape') { closeDrawer(); return; }
    if (e.key !== 'Tab') return;
    const panel = document.getElementById('drawer');
    if (!panel) return;
    const items = [...panel.querySelectorAll('a[href], button:not([disabled])')].filter(el => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // ---------- 语言 / 主题 / 视图切换 ----------
  // 任何改变结果集的操作都要把 limit 收回第一页，否则筛选后仍按上次的偏移量截断
  window.F = {
    set(k, v) { f[k] = v; f.limit = PAGE; render(); },
    toggle(k) { f[k] = !f[k]; f.limit = PAGE; render(); },
    clear() { Object.assign(f, { lang: 'all', lic: 'all', q: '', starsOnly: false, hideArchived: false, activeOnly: false, limit: PAGE }); render(); },
    openFilters() { f.open = !f.open; render(); },
    setLang(l) { L = l; localStorage.setItem('stars-lang', l); render(); },
    setTheme(th) { theme = th; localStorage.setItem('stars-theme', th); applyTheme(); render(); },
    setView(v) { f.view = v; f.limit = PAGE; localStorage.setItem('stars-view', v); render(); },
    more() { loadMore(); },
    openDrawer(name) { openDrawer(name); },
    closeDrawer() { closeDrawer(); },
    topic(x) { f.q = ''; f.topic = x; f.limit = PAGE; render(); closeDrawer(); },
    readme() { if (drawerRepo) loadReadme(drawerRepo); },
  };

  // ---------- 下拉菜单（主题切换） ----------
  // 事件委托：菜单面板是重渲染出来的，直接绑定会在每次 render 后失效
  function closeMenus() {
    document.querySelectorAll('[data-menu-panel]').forEach(p => { p.hidden = true; });
    document.querySelectorAll('[data-menu-trigger]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-menu-trigger]');
    if (trigger) {
      const panel = trigger.parentElement.querySelector('[data-menu-panel]');
      if (panel) {
        const willOpen = panel.hidden;
        closeMenus();
        panel.hidden = !willOpen;
        trigger.setAttribute('aria-expanded', String(willOpen));
      }
      return;
    }
    const item = e.target.closest('[data-set-theme]');
    if (item) {
      F.setTheme(item.getAttribute('data-set-theme'));
      return;
    }
    // 点在菜单外面 → 收起
    if (!e.target.closest('[data-menu]')) closeMenus();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenus();
  });

  // ---------- 滚动自动加载 ----------
  // 只往 #repoList 尾部追加新节点，而不是整页重渲染：
  // 后者每次都要重建已渲染的几百个卡片，滚动时会明显卡顿，也会丢失滚动位置。
  let loadingMore = false;

  function loadMore() {
    if (loadingMore) return;
    const list = matches();
    if (f.limit >= list.length) return;

    loadingMore = true;
    const host = document.getElementById('repoList');
    if (!host) { loadingMore = false; return; }

    const from = f.limit;
    f.limit = Math.min(f.limit + PAGE, list.length);
    const next = list.slice(from, f.limit);
    host.insertAdjacentHTML('beforeend', next.map(f.view === 'list' ? repoRow : repoCard).join(''));

    updateTail(list);
    // 等 DOM 布局稳定后再放开，防止连续滚动瞬间把 1222 条全塞进来
    requestAnimationFrame(() => { loadingMore = false; });
  }

  function updateTail(list) {
    const results = document.getElementById('results');
    if (!results) return;
    const rest = list.length - f.limit;
    const shownOf = results.querySelector('[data-shown-of]');
    if (rest > 0) {
      // 原地更新文本即可；不要 insert 新节点，否则计数行会越堆越多
      if (shownOf) shownOf.textContent = t('state.shownOf', { shown: fmtFull(f.limit), total: fmtFull(list.length) });
    } else {
      const tail = results.querySelector('#scrollTail');
      if (tail) {
        tail.removeAttribute('aria-hidden');
        tail.innerHTML = `<p class="text-xs text-muted-foreground">${esc(t('state.allLoaded', { n: fmtFull(list.length) }))}</p>`;
      }
    }
  }

  let observer = null;
  function observeTail() {
    if (observer) observer.disconnect();
    const tail = document.getElementById('scrollTail');
    if (!tail) return;
    observer = new IntersectionObserver(entries => {
      if (entries.some(en => en.isIntersecting)) loadMore();
    }, { rootMargin: '400px 0px' });   // 提前 400px 预加载，滚起来才不觉得卡
    observer.observe(tail);
  }

  function themeIcon() { return { light: 'sun', dark: 'moon', system: 'monitor' }[theme]; }

  const iconBtn = 'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer';

  // 主题下拉菜单：照原型用 menuitemradio + 勾选标记，
  // 而不是「点一下循环切换」——后者看不出当前处于哪种模式。
  function themeMenu() {
    const item = 'flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-left transition-colors hover:bg-accent hover:text-accent-foreground';
    return `
    <div class="relative" data-menu="theme">
      <button type="button" data-menu-trigger aria-haspopup="menu" aria-expanded="false"
              aria-label="${esc(t('nav.theme'))}" title="${esc(t('theme.' + theme))}" class="${iconBtn}">
        ${icon(themeIcon(), 'size-4')}
      </button>
      <div data-menu-panel role="menu" hidden
           class="absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg">
        ${['light', 'dark', 'system'].map(k => `
          <button role="menuitemradio" aria-checked="${theme === k}" data-set-theme="${k}" class="${item}">
            ${icon({ light: 'sun', dark: 'moon', system: 'monitor' }[k], 'size-4')}
            <span class="flex-1">${esc(t('theme.' + k))}</span>
            ${theme === k ? `<span class="text-brand">${icon('check', 'size-4')}</span>` : ''}
          </button>`).join('')}
      </div>
    </div>`;
  }

  function header() {
    const menuBtn = (act, label, active, content) =>
      `<button type="button" onclick="${act}" aria-label="${esc(label)}" title="${esc(label)}" class="${iconBtn} ${active ? 'bg-accent text-foreground' : ''}">${content}</button>`;

    return `
    <header class="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] inline-flex h-8 items-center rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground">Skip to content</a>
        <div class="flex items-center gap-2 font-semibold tracking-tight">
          <svg class="size-5 text-brand" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.5 2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8z" fill="currentColor"/></svg>
          <span class="text-[17px]">${esc(siteTitle())}</span>
        </div>

        <div class="relative mx-2 hidden max-w-sm flex-1 sm:block lg:ml-6">
          <span class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">${icon('search', 'size-4')}</span>
          <input type="search" data-search="header" value="${esc(f.q)}" placeholder="${esc(t('filter.search'))}"
                 aria-label="${esc(t('filter.search'))}"
                 class="flex h-9 w-full rounded-md border border-input bg-muted/50 py-1 pl-8 pr-3 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30">
        </div>

        <div class="ml-auto flex items-center gap-1">
          <div class="flex items-center gap-0.5 rounded-md border p-0.5" role="group" aria-label="${esc(t('nav.lang'))}">
            ${menuBtn("F.setLang('zh-CN')", '简体中文', L === 'zh-CN', `<span class="text-xs font-medium">中</span>`)}
            ${menuBtn("F.setLang('en')", 'English', L === 'en', `<span class="text-xs font-medium">EN</span>`)}
          </div>
          ${themeMenu()}
        </div>
      </div>
    </header>`;
  }

  function statBar() {
    const s = D.stats || {};
    const items = [
      [t('stat.total'), fmtFull(s.total || 0)],
      [t('stat.stars'), fmtNum(s.totalStars || 0)],
      [t('stat.langs'), fmtNum(Object.keys(s.langs || {}).length)],
      [t('stat.topics'), fmtNum(Object.keys(s.topics || {}).length)],
    ];
    return `<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      ${items.map(([label, v]) => `
        <div class="rounded-xl border bg-card p-4">
          <div class="text-2xl font-semibold tracking-tight tabular-nums">${esc(v)}</div>
          <div class="mt-0.5 text-xs text-muted-foreground">${esc(label)}</div>
        </div>`).join('')}
    </div>`;
  }

  const sel = 'h-8 cursor-pointer rounded-md border border-input bg-background px-2 text-sm dark:bg-input/30';

  function render() {
    document.title = siteTitle();
    document.getElementById('app').innerHTML = `
      ${header()}
      <main id="main" class="outline-none">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          <div class="mb-6">
            <h1 class="text-2xl font-semibold tracking-tight">${esc(siteTitle())}</h1>
            <p class="mt-1 text-sm text-muted-foreground">${esc(siteDesc())}</p>
          </div>

          ${statBar()}

          <div class="mt-8 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
            ${sidebar()}
            <div class="min-w-0">
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <div class="relative min-w-48 flex-1">
                  <span class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">${icon('search', 'size-4')}</span>
                  <input type="search" data-search="inline" value="${esc(f.q)}" placeholder="${esc(t('filter.search'))}"
                         aria-label="${esc(t('filter.search'))}"
                         class="flex h-8 w-full rounded-md border border-input bg-transparent py-1 pl-8 pr-3 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30">
                </div>
                <button type="button" onclick="F.openFilters()" aria-expanded="${f.open}" aria-controls="filters"
                        class="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-3 text-[13px] font-medium hover:bg-accent lg:hidden">
                  ${icon('sliders', 'size-3.5')}${esc(t('filter.more'))}
                </button>
                <label class="sr-only" for="sort">${esc(t('filter.sort'))}</label>
                <select id="sort" class="${sel}" onchange="F.set('sort',this.value)">
                  ${['stars', 'recent', 'pushed', 'name'].map(s => `<option value="${s}" ${f.sort === s ? 'selected' : ''}>${esc(t('sort.' + s))}</option>`).join('')}
                </select>
                <div class="inline-flex rounded-md border p-0.5" role="group">
                  ${[['grid', 'grid'], ['list', 'list']].map(([v, ic]) => `
                    <button type="button" onclick="F.setView('${v}')" aria-pressed="${f.view === v}" aria-label="${esc(t('view.' + v))}"
                            class="grid size-7 cursor-pointer place-items-center rounded text-muted-foreground aria-pressed:bg-accent aria-pressed:text-foreground">${icon(ic, 'size-4')}</button>`).join('')}
                </div>
              </div>
              <div id="chips" class="mb-4 flex flex-wrap items-center gap-1.5 empty:hidden">${chips()}</div>
              <div id="results">${results()}</div>
            </div>
          </div>

        </div>
      </main>
      ${bottomBar()}
      <div id="drawerHost" class="hidden"></div>`;
    observeTail();
    closeMenus();
  }

  // 常驻底栏：fixed 在视口底部，滚动时始终可见。
  // 用 fixed 会遮住内容尾部，所以给 body 加 pb 预留出它的高度。
  function bottomBar() {
    const year = new Date().getFullYear();
    const genTime = new Date(D.generatedAt || Date.now())
      .toLocaleString(L === 'en' ? 'en-US' : 'zh-CN', { dateStyle: 'medium', timeStyle: 'short' });
    return `
    <footer class="fixed inset-x-0 bottom-0 z-30 border-t bg-background/85 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 text-xs text-muted-foreground sm:px-6">
        <span>&copy; ${year} ${esc(siteTitle())}</span>
        <span class="hidden sm:inline">${esc(t('generated', { t: genTime }))}</span>
        <a href="https://github.com/${OWNER}/${REPO}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-1 hover:text-foreground hover:underline underline-offset-4">
          ${icon('github', 'size-3.5')}<span>${esc(OWNER)}/${esc(REPO)}</span>
        </a>
      </div>
    </footer>`;
  }

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (theme === 'system') applyTheme(); });

  // 搜索做节流，避免每敲一个字符就重排上千个节点。
  // 关键：只替换结果区与筛选 chip，不动输入框本身。
  // 整体重渲染会销毁输入框 DOM，输入法的 composition 状态随之丢失，
  // 表现为中文只能逐字上屏（拼音还在候选框里就被打断）。
  let timer = null;
  let syncing = false;

  // 两个搜索框内容保持一致。直接赋值 .value 不会触发 input 事件，
  // 但仍用 syncing 标记兜底，避免将来有人改成派发事件时形成循环。
  function syncBoxes(from, value) {
    syncing = true;
    document.querySelectorAll('input[type=search]').forEach(x => {
      if (x !== from && x.value !== value) x.value = value;
    });
    syncing = false;
  }

  document.addEventListener('input', e => {
    const el = e.target;
    if (el.type !== 'search' || syncing) return;
    clearTimeout(timer);

    // 组合中（拼音还在候选框里）只记值不重绘，等 compositionend 再刷新
    if (el.dataset.composing === '1') { f.q = el.value; syncBoxes(el, el.value); return; }

    f.q = el.value;
    f.limit = PAGE;
    syncBoxes(el, el.value);
    timer = setTimeout(() => updateResults(), 180);
  });

  // compositionstart 标记当前处于输入法组字状态
  document.addEventListener('compositionstart', e => {
    if (e.target.type === 'search') e.target.dataset.composing = '1';
  });
  document.addEventListener('compositionend', e => {
    const el = e.target;
    if (el.type !== 'search') return;
    el.dataset.composing = '0';
    f.q = el.value;
    f.limit = PAGE;
    syncBoxes(el, el.value);
    clearTimeout(timer);
    timer = setTimeout(() => updateResults(), 0);
  });

  // 仅刷新结果区，输入框保持原有 DOM 与输入法状态。
  // statBar 展示的是全局统计，不随搜索变化，无需重绘。
  function updateResults() {
    const box = document.getElementById('results');
    if (box) box.innerHTML = results();
    const chipBox = document.getElementById('chips');
    if (chipBox) chipBox.innerHTML = chips();
    observeTail();
  }

  render();

  // 支持直接分享 #r=owner/name 链接；浏览器前进后退时同步开关抽屉
  function syncFromHash() {
    const m = location.hash.match(/^#r=(.+)$/);
    if (m) {
      const name = decodeURIComponent(m[1]);
      if (byFullName(name)) openDrawer(name);
      else closeDrawer();
    } else if (drawerRepo) {
      closeDrawer();
    }
  }
  window.addEventListener('hashchange', syncFromHash);
  syncFromHash();
})();