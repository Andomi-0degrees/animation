(function () {
    const PAGES = [
        { id: 'home', label: 'Spotlight Hub', path: 'index.html' },
        { id: 'taf', label: 'TAF Site', path: 'taf/index.html' },
        { id: 'practise-1', label: 'Practice 1', path: 'canvas-practise/practise-1.html' },
        { id: 'practise-2', label: 'Practice 2', path: 'canvas-practise/practise-2.html' },
        { id: 'practise-3', label: 'Practice 3', path: 'canvas-practise/practise-3.html' },
        { id: 'practise-5', label: 'Practice 5', path: 'canvas-practise/practise-5.html' },
        { id: 'practise-7', label: 'Practice 7', path: 'canvas-practise/practise-7.html' },
        { id: 'practise-8', label: 'Spotlight Hero', path: 'canvas-practise/practise-8.html' },
        { id: 'canva-1', label: 'Canvas 1', path: 'canvas-practise/canva-practise-1.html' },
        { id: 'canva-2', label: 'Canvas 2', path: 'canvas-practise/canva-practise-2.html' },
        { id: 'canva-3', label: 'Canvas 3', path: 'canvas-practise/canva-practise-3.html' }
    ];

    const script = document.currentScript;
    const depth = parseInt(script?.getAttribute('data-depth') || '0', 10);
    const prefix = depth > 0 ? '../'.repeat(depth) : '';

    function normalizePath(pathname) {
        return pathname.replace(/\\/g, '/').replace(/^\//, '').toLowerCase();
    }

    const currentPath = normalizePath(window.location.pathname);
    const currentFile = currentPath.split('/').pop() || 'index.html';
    const currentDir = currentPath.includes('/') ? currentPath.slice(0, currentPath.lastIndexOf('/') + 1) : '';

    function isActive(pagePath) {
        const full = normalizePath(pagePath);
        if (full === currentPath) return true;
        if (full.endsWith('/index.html') && currentFile === 'index.html') {
            return full.slice(0, -'index.html'.length) === currentDir;
        }
        return false;
    }

    function hrefFor(pagePath) {
        return prefix + pagePath;
    }

    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'Site navigation');
    nav.innerHTML = `
        <div class="site-nav__inner">
            <a class="site-nav__brand" href="${hrefFor('index.html')}">✦ <span>Animation</span> Lab</a>
            <button class="site-nav__toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">☰</button>
            <ul class="site-nav__links"></ul>
        </div>
    `;

    const links = nav.querySelector('.site-nav__links');
    PAGES.forEach((page) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = hrefFor(page.path);
        a.textContent = page.label;
        if (isActive(page.path)) a.classList.add('is-active');
        li.appendChild(a);
        links.appendChild(li);
    });

    document.body.prepend(nav);
    document.body.classList.add('has-site-nav');

    const toggle = nav.querySelector('.site-nav__toggle');
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
})();
