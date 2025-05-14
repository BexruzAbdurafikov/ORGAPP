    function drawHeader() {
        const header = document.createElement('header');
        const div = document.createElement('div');
        const logo = document.createElement('span');
        const title = document.createElement('h1');

        header.classList.add('header');
        div.classList.add('header__elem');
        logo.classList.add('logo');
        title.classList.add('title');

        logo.innerHTML = `<svg width="35" height="35" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="18" rx="4" fill="#F5F1EF"/>
<path d="M3 3H7V15H3V3Z" fill="#262626"/>
<path d="M9 3H13V11H9V3Z" fill="#262626"/>
</svg>
`;
        title.textContent = 'ORGAPP';

        div.append(logo, title);
        header.appendChild(div);
        document.body.prepend(header);
    }

    drawHeader();