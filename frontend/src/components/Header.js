export async function drawHeader(user) {
    const currentPath = window.location.pathname;
    const allowedPages = ['/Projects', '/ProjectPage', '/'];

    const header = document.createElement('header');
    const div = document.createElement('div');
    const logo = document.createElement('span');
    const title = document.createElement('h1');
    const userName = document.createElement('div');
    const rightElem = document.createElement('div');

    rightElem.classList.add('header__right');
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
    title.textContent = 'ORGAPP'

    div.append(logo, title);
    header.append(div, rightElem);

    if (allowedPages.includes(currentPath)) {
        header.style.justifyContent = 'space-between';
        userName.innerHTML = user.user.displayName?.charAt(0).toUpperCase() || '';
        rightElem.append(userName);
    }

    if (currentPath === '/ProjectPage') {
        const a = document.createElement('a');
        a.classList.add('header__link');
        a.textContent = 'All projects';
        a.href = '/Projects';
        rightElem.prepend(a);
    }

    document.body.prepend(header);
}