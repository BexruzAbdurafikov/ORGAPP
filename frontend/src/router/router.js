import AuthMiddleware from "../middlewares/auth.js";

const routes = [
    {
        path: /^\/$/,
        view: async () => {
            const res = await fetch('src/pages/Projects.html');
            return await res.text();
        },
        loadScritps: async () => {
            await import("../scripts/Projects.js");
        },
        // middlewares: [AuthMiddleware],
        layout: 'default'
    },
    {
        path: /^\/ProjectPage\/[a-zA-Z0-9]+$/,
        view: async () => {
            const res = await fetch('src/pages/ProjectPage.html');
            return await res.text();
        },
        loadScritps: async () => {
            await import("../scripts/ProjectPage.js");
        },
        middlewares: [AuthMiddleware],
        layout: 'default'
    },
    {
        path: /^\/Projects$/,
        view: async () => {
            const res = await fetch('src/pages/Projects.html');
            return await res.text();
        },
        loadScritps: async () => {
            await import("../scripts/Projects.js");
        },
        // middlewares: [AuthMiddleware],
        layout: 'default'
    },
    {
        path: /^\/signin$/,
        view: async () => {
            const res = await fetch('src/pages/signin.html');
            return await res.text();
        },
        loadScritps: async () => {
            await import("../scripts/signin.js");
        },
        layout: 'default'
    },
    {
        path: /^\/signup$/,
        view: async () => {
            const res = await fetch('src/pages/signup.html');
            return await res.text();
        },
        loadScritps: async () => {
            await import("../scripts/signup.js");
        },
        layout: 'default'
    }
];

const overlay = document.querySelector('#loader-overlay');

export async function router() {
    overlay.classList.remove('hidden');
    const path = window.location.pathname;
    const app = document.getElementById('app');


    for (const route of routes) {
        const match = path.match(route.path);

        if (match) {
            if (route.middlewares) {
                if (route.middlewares) {
                    for (const middleware of route.middlewares) {
                        await middleware();
                    }
                }
            }

            const content = await route.view(match);
            console.log(content);
            

            if (route.layout) {
                await import(`../layouts/${route.layout}.js`);
            }

            app.innerHTML = content;
            await route.loadScritps();
            return;
        }
    }

    const res = await fetch('src/pages/404.html');
    app.innerHTML = await res.text();
    overlay.classList.add('hidden')
}

export function handleLinkClick(e) {
    if (e.target.matches('a[data-link]')) {
        e.preventDefault();
        const url = e.target.href;
        history.pushState(null, null, url);
        router();
    }
}
