/*!
 * Cloud Style for Mermaid — keeps diagrams on the site palette.
 *
 * jekyll-theme-chirpy 7.4.1 renders Mermaid with `theme: 'default'` (light)
 * or `'dark'` and offers no hook for theme variables. This file is loaded
 * synchronously from `_includes/metadata-hook.html`, before the theme's
 * deferred `post.min.js`, and it wraps `mermaid.initialize` so the theme's
 * own call — and the one it repeats after each light/dark toggle — renders
 * with the tokens below instead. Nothing is rendered twice.
 */
(() => {
  /* --- Small accessibility repairs on theme markup -------------
     The theme puts aria-expanded on the collapse <div> as well as on its
     trigger, which is invalid ARIA (axe: aria-allowed-attr, critical), and
     it leaves horizontally scrolling regions out of the tab order. */
  const fixA11y = () => {
    document.querySelectorAll('.collapse[aria-expanded]').forEach((el) => {
      if (el.tagName !== 'BUTTON' && !el.getAttribute('role')) el.removeAttribute('aria-expanded');
    });

    const scrollers = document.querySelectorAll(
      '.content div[class^="language-"] .highlight, .content pre.mermaid, .content .table-wrapper'
    );
    scrollers.forEach((el) => {
      if (el.scrollWidth <= el.clientWidth) return;
      el.setAttribute('tabindex', '0');
      if (!el.getAttribute('role')) el.setAttribute('role', 'group');
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', '可横向滚动的内容');
    });

    /* The theme names the previous/next post links only "上一篇"/"下一篇",
       so their accessible name does not contain the visible title. */
    document.querySelectorAll('.post-navigation a[aria-label]').forEach((a) => {
      const visible = (a.textContent || '').replace(/\s+/g, ' ').trim();
      const label = a.getAttribute('aria-label');
      if (visible && !label.includes(visible)) a.setAttribute('aria-label', `${label}：${visible}`);
    });
  };

  const fixA11ySoon = () => window.setTimeout(fixA11y, 250);

  window.addEventListener('load', fixA11ySoon, { once: true });
  window.addEventListener('message', fixA11ySoon);

  /* --- PWA: let an installed device pick up a new deploy ----------------
     jekyll-theme-chirpy ships a byte-identical sw.min.js on every build, so
     the browser never reinstalls it and a phone can keep serving the old
     stylesheet from the old cache indefinitely. When a service worker
     controls this page, compare the stylesheet it has cached with the one the
     server has now, and drop the stale cache once. Guarded per session so a
     failed comparison can never loop. */
  const refreshPwaCache = async () => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return;
    // One forced reload per session is enough; this only guards a reload loop.
    if (sessionStorage.getItem('cf-pwa-reloaded') === '1') return;

    const link = [...document.querySelectorAll('link[rel="stylesheet"]')].find((l) =>
      /jekyll-theme-chirpy\.css/.test(l.href)
    );
    if (!link) return;

    try {
      const url = new URL(link.href);
      const head = await fetch(`${url.pathname}?cf=${Date.now()}`, { method: 'HEAD', cache: 'no-store' });
      const now = head.headers.get('etag') || head.headers.get('content-length');
      if (!now) return;

      const keys = (await caches.keys()).filter((k) => k.startsWith('chirpy-'));
      for (const key of keys) {
        const cached = await (await caches.open(key)).match(url.href);
        const then = cached && (cached.headers.get('etag') || cached.headers.get('content-length'));
        if (then && then !== now) {
          sessionStorage.setItem('cf-pwa-reloaded', '1');
          await Promise.all(keys.map((k) => caches.delete(k)));
          window.location.reload();
          return;
        }
      }
    } catch {
      /* offline, or a browser without the Cache API: leave it alone */
    }
  };

  window.addEventListener('load', refreshPwaCache, { once: true });

  /* --- Mermaid palette ----------------------------------------- */
  const FONT =
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

  const SQUARE_NODES =
    '.node rect, .node circle, .node ellipse, .node polygon, .node path { rx: 0; ry: 0; }' +
    '.cluster rect { rx: 0; ry: 0; }' +
    '.edgeLabel rect { rx: 0; ry: 0; }';

  // 4px-grid spacing on every diagram family, and no auto-shrinking: on a
  // narrow screen the diagram keeps its type size and the wrapper scrolls.
  const LAYOUT = {
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      useMaxWidth: false,
      nodeSpacing: 40,
      rankSpacing: 48,
      padding: 12,
    },
    sequence: { useMaxWidth: false, actorMargin: 48, boxMargin: 8, mirrorActors: false },
    gantt: { useMaxWidth: false },
    journey: { useMaxWidth: false },
    timeline: { useMaxWidth: false },
    class: { useMaxWidth: false },
    state: { useMaxWidth: false },
    er: { useMaxWidth: false },
    pie: { useMaxWidth: false, textPosition: 0.6 },
    mindmap: { useMaxWidth: false },
    gitGraph: { useMaxWidth: false },
  };

  const LIGHT = {
    ...LAYOUT,
    theme: 'base',
    themeCSS: SQUARE_NODES,
    fontFamily: FONT,
    themeVariables: {
      fontFamily: FONT,
      fontSize: '16px',
      background: '#f7f7f7',
      primaryColor: '#ffffff',
      primaryTextColor: '#1d1d1d',
      primaryBorderColor: '#1d1d1d',
      secondaryColor: '#f0f0f0',
      secondaryTextColor: '#1d1d1d',
      secondaryBorderColor: '#d4d4d4',
      tertiaryColor: '#fafafa',
      tertiaryTextColor: '#1d1d1d',
      tertiaryBorderColor: '#e3e3e3',
      lineColor: '#6b6b6b',
      textColor: '#1d1d1d',
      mainBkg: '#ffffff',
      nodeBorder: '#1d1d1d',
      nodeTextColor: '#1d1d1d',
      clusterBkg: '#fafafa',
      clusterBorder: '#d4d4d4',
      titleColor: '#1d1d1d',
      edgeLabelBackground: '#f7f7f7',
      labelBackground: '#f7f7f7',
      noteBkgColor: '#fff1e0',
      noteTextColor: '#1d1d1d',
      noteBorderColor: '#f6821f',
      actorBkg: '#ffffff',
      actorBorder: '#1d1d1d',
      actorTextColor: '#1d1d1d',
      actorLineColor: '#6b6b6b',
      signalColor: '#6b6b6b',
      signalTextColor: '#1d1d1d',
      labelBoxBkgColor: '#f0f0f0',
      labelBoxBorderColor: '#d4d4d4',
      labelTextColor: '#1d1d1d',
      loopTextColor: '#1d1d1d',
      activationBkgColor: '#f0f0f0',
      activationBorderColor: '#1d1d1d',
      sequenceNumberColor: '#ffffff',
      pie1: '#f6821f',
      pie2: '#1d1d1d',
      pie3: '#a64a00',
      pie4: '#6b6b6b',
      pie5: '#d4d4d4',
      pie6: '#ffb066',
      pie7: '#4a4a4a',
      pie8: '#f7d3b3',
      pieTitleTextSize: '14px',
      pieSectionTextSize: '13px',
      pieLegendTextSize: '13px',
    },
  };

  const DARK = {
    ...LAYOUT,
    theme: 'base',
    themeCSS: SQUARE_NODES,
    fontFamily: FONT,
    themeVariables: {
      fontFamily: FONT,
      fontSize: '16px',
      background: '#1d1d1d',
      primaryColor: '#262626',
      primaryTextColor: '#ededed',
      primaryBorderColor: '#8a8a8a',
      secondaryColor: '#2e2e2e',
      secondaryTextColor: '#ededed',
      secondaryBorderColor: '#4a4a4a',
      tertiaryColor: '#242424',
      tertiaryTextColor: '#ededed',
      tertiaryBorderColor: '#333333',
      lineColor: '#a8a8a8',
      textColor: '#ededed',
      mainBkg: '#262626',
      nodeBorder: '#8a8a8a',
      nodeTextColor: '#ededed',
      clusterBkg: '#232323',
      clusterBorder: '#4a4a4a',
      titleColor: '#ffffff',
      edgeLabelBackground: '#1d1d1d',
      labelBackground: '#1d1d1d',
      noteBkgColor: '#33230f',
      noteTextColor: '#ededed',
      noteBorderColor: '#f6821f',
      actorBkg: '#262626',
      actorBorder: '#8a8a8a',
      actorTextColor: '#ededed',
      actorLineColor: '#a8a8a8',
      signalColor: '#a8a8a8',
      signalTextColor: '#ededed',
      labelBoxBkgColor: '#242424',
      labelBoxBorderColor: '#4a4a4a',
      labelTextColor: '#ededed',
      loopTextColor: '#ededed',
      activationBkgColor: '#2e2e2e',
      activationBorderColor: '#8a8a8a',
      sequenceNumberColor: '#1d1d1d',
      pie1: '#f6821f',
      pie2: '#ededed',
      pie3: '#ffb066',
      pie4: '#8a8a8a',
      pie5: '#4a4a4a',
      pie6: '#a64a00',
      pie7: '#c4c4c4',
      pie8: '#5a3212',
      pieTitleTextSize: '14px',
      pieSectionTextSize: '13px',
      pieLegendTextSize: '13px',
    },
  };

  const isDark = () => {
    const mode = document.documentElement.getAttribute('data-mode');
    if (mode) return mode === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const patch = (api) => {
    if (!api || typeof api.initialize !== 'function' || api.cfPatched) return api;
    const initialize = api.initialize.bind(api);
    api.initialize = (options) => {
      // Keep whatever the caller asked for, except the parts Cloud Style owns.
      initialize({ ...options, ...(isDark() ? DARK : LIGHT) });
    };
    api.cfPatched = true;
    return api;
  };

  // Mermaid arrives from the CDN bundle later and assigns `window.mermaid`,
  // so wrap the property now and patch the API the moment it is assigned.
  if (window.mermaid) {
    patch(window.mermaid);
  } else {
    let api;
    Object.defineProperty(window, 'mermaid', {
      configurable: true,
      get: () => api,
      set: (value) => {
        api = patch(value);
      },
    });
  }
})();
