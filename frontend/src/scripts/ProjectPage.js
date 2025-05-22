import axios from 'axios';
import '../assets/ProjectPage.scss';
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';

const loader = document.querySelector('#loader-overlay');
const title = document.querySelector('.title');


async function drawProjectPage() {
    const projectId = window.location.pathname.split('/')[2];
    loader.classList.remove('hidden');
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + `/projects/${projectId}`, {
            headers: {
                Authorization: cookie.getCookie('accessToken')
            }
        });
        const project = res.data;

        const app = document.querySelector('#app');

        const container = document.createElement('div');
        const containerElem1 = document.createElement('div');
        const containerElem1Child = document.createElement('div');
        const projectsElems = document.createElement('div');
        const createButton1 = document.createElement('button');
        const containerElem2 = document.createElement('div');
        const upperBlock = document.createElement('div');
        const title = document.createElement('h1');
        const createButton2 = document.createElement('button');
        const projects = document.createElement('div');

        container.classList.add('container');
        containerElem1.classList.add('container__elem1');
        containerElem1Child.classList.add('container__elem1__child');
        projectsElems.classList.add('projects__elems');
        createButton1.classList.add('create');
        containerElem2.classList.add('container__elem2');
        upperBlock.classList.add('upper__block');
        title.classList.add('title');
        createButton2.classList.add('create');
        projects.classList.add('projects');

        createButton1.textContent = '+';
        title.textContent = project.name;
        createButton2.textContent = 'Пригласить';

        containerElem1Child.appendChild(projectsElems);
        containerElem1Child.appendChild(createButton1);
        containerElem1.appendChild(containerElem1Child);

        upperBlock.appendChild(title);
        upperBlock.appendChild(createButton2);
        containerElem2.appendChild(upperBlock);
        containerElem2.appendChild(projects);

        container.appendChild(containerElem1);
        container.appendChild(containerElem2);

        app.appendChild(container);
    } catch (e) {
        useToast('error', 'Failed to load project data');
    } finally {
        loader.classList.add('hidden');
    }
}

drawProjectPage();