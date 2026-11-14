/*!
 * Claude Style for Mermaid — keeps diagrams on the site palette.
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

  const SOFT_NODES =
    '.node rect, .node polygon, .node path { rx: 6; ry: 6; }' +
    '.cluster rect { rx: 8; ry: 8; }' +
    '.edgeLabel rect { rx: 4; ry: 4; }';

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
    themeCSS: SOFT_NODES,
    fontFamily: FONT,
    themeVariables: {
      fontFamily: FONT,
      fontSize: '16px',
      background: '#faf9f5',
      primaryColor: '#ffffff',
      primaryTextColor: '#1a1a19',
      primaryBorderColor: '#cfc9bb',
      secondaryColor: '#f0eee6',
      secondaryTextColor: '#1a1a19',
      secondaryBorderColor: '#ded8ca',
      tertiaryColor: '#f6f4ed',
      tertiaryTextColor: '#1a1a19',
      tertiaryBorderColor: '#e7e3d8',
      lineColor: '#8a857b',
      textColor: '#1a1a19',
      mainBkg: '#ffffff',
      nodeBorder: '#cfc9bb',
      nodeTextColor: '#1a1a19',
      clusterBkg: '#f0eee6',
      clusterBorder: '#dcd7ca',
      titleColor: '#1a1a19',
      edgeLabelBackground: '#faf9f5',
      labelBackground: '#faf9f5',
      noteBkgColor: '#f3e6df',
      noteTextColor: '#1a1a19',
      noteBorderColor: '#d97757',
      actorBkg: '#ffffff',
      actorBorder: '#cfc9bb',
      actorTextColor: '#1a1a19',
      actorLineColor: '#8a857b',
      signalColor: '#8a857b',
      signalTextColor: '#1a1a19',
      labelBoxBkgColor: '#f0eee6',
      labelBoxBorderColor: '#ded8ca',
      labelTextColor: '#1a1a19',
      loopTextColor: '#1a1a19',
      activationBkgColor: '#f3f1e9',
      activationBorderColor: '#cfc9bb',
      sequenceNumberColor: '#ffffff',
      pie1: '#d97757',
      pie2: '#1a1a19',
      pie3: '#a8492b',
      pie4: '#8a857b',
      pie5: '#ded8ca',
      pie6: '#e8a184',
      pie7: '#4a4a47',
      pie8: '#f0ddd2',
      pieTitleTextSize: '14px',
      pieSectionTextSize: '13px',
      pieLegendTextSize: '13px',
    },
  };

  const DARK = {
    ...LAYOUT,
    theme: 'base',
    themeCSS: SOFT_NODES,
    fontFamily: FONT,
    themeVariables: {
      fontFamily: FONT,
      fontSize: '16px',
      background: '#1f1e1d',
      primaryColor: '#262624',
      primaryTextColor: '#f5f3ec',
      primaryBorderColor: '#4a4a47',
      secondaryColor: '#2e2d2b',
      secondaryTextColor: '#f5f3ec',
      secondaryBorderColor: '#3a3a38',
      tertiaryColor: '#232221',
      tertiaryTextColor: '#f5f3ec',
      tertiaryBorderColor: '#3a3a38',
      lineColor: '#a9a69d',
      textColor: '#f5f3ec',
      mainBkg: '#262624',
      nodeBorder: '#4a4a47',
      nodeTextColor: '#f5f3ec',
      clusterBkg: '#232221',
      clusterBorder: '#3a3a38',
      titleColor: '#f5f3ec',
      edgeLabelBackground: '#1f1e1d',
      labelBackground: '#1f1e1d',
      noteBkgColor: '#3a2e28',
      noteTextColor: '#f5f3ec',
      noteBorderColor: '#d97757',
      actorBkg: '#262624',
      actorBorder: '#4a4a47',
      actorTextColor: '#f5f3ec',
      actorLineColor: '#a9a69d',
      signalColor: '#a9a69d',
      signalTextColor: '#f5f3ec',
      labelBoxBkgColor: '#232221',
      labelBoxBorderColor: '#3a3a38',
      labelTextColor: '#f5f3ec',
      loopTextColor: '#f5f3ec',
      activationBkgColor: '#2e2d2b',
      activationBorderColor: '#4a4a47',
      sequenceNumberColor: '#1f1e1d',
      pie1: '#d97757',
      pie2: '#f5f3ec',
      pie3: '#e8a184',
      pie4: '#a9a69d',
      pie5: '#4a4a47',
      pie6: '#a8492b',
      pie7: '#cfcdc5',
      pie8: '#3a2e28',
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
