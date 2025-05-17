import { useUser } from "../utils/useUser.js";

async function drawHeader() {
    const user = await useUser();

    const currentPath = window.location.pathname;
    const allowedPages = ['/Projects', '/ProjectPage'];

    const header = document.createElement('header');
    const div = document.createElement('div');
    const logo = document.createElement('span');
    const title = document.createElement('h1');
    const userName = document.createElement('div');

    userName.classList.add('userName');
    header.classList.add('header');
    div.classList.add('header__elem');
    logo.classList.add('logo');
    title.classList.add('title');

    logo.innerHTML = `<svg width="33" height="33" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="18" height="18" rx="4" fill="#F5F1EF"/>
<path d="M3 3H7V15H3V3Z" fill="#262626"/>
<path d="M9 3H13V11H9V3Z" fill="#262626"/>
</svg>
`;
    title.textContent = 'ORGAPP';
    userName.innerHTML = user.user.displayName?.charAt(0).toUpperCase() || '';

    div.append(logo, title);
    header.appendChild(div);

    if (allowedPages.some((page) => currentPath.includes(page))) {
        header.style.justifyContent = 'space-between';
        header.append(userName);
    }
    document.body.prepend(header);
}
drawHeader();