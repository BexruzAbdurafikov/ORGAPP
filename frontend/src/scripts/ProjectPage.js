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

        const inviteMenu = document.createElement('div');
        const form = document.createElement('form');
        const h1 = document.createElement('h1');
        const invite = document.createElement('button');
        const container = document.createElement('div');
        const containerElem1 = document.createElement('div');
        const containerElem1Child = document.createElement('div');
        const projectsElems = document.createElement('div');
        const createTask = document.createElement('button');
        const containerElem2 = document.createElement('div');
        const upperBlock = document.createElement('div');
        const title = document.createElement('h1');
        const inviteBtn = document.createElement('button');
        const projects = document.createElement('div');
        const participants = document.createElement('div');
        const inviteBlock = document.createElement('div');

        invite.classList.add('inviteBtn')
        inviteMenu.classList.add('inviteMenu');
        inviteBlock.classList.add('invite');
        participants.classList.add('participants');
        container.classList.add('container');
        containerElem1.classList.add('container__elem1');
        containerElem1Child.classList.add('container__elem1__child');
        projectsElems.classList.add('projects__elems');
        createTask.classList.add('create');
        containerElem2.classList.add('container__elem2');
        upperBlock.classList.add('upper__block');
        title.classList.add('title');
        inviteBtn.classList.add('create');
        projects.classList.add('projects');

        
        createTask.textContent = '+';
        title.textContent = project.name;
        inviteBtn.textContent = 'Пригласить';
        invite.textContent = '+'

        project.participants.forEach(participant => {
            const participantBlock = document.createElement('div');
            participantBlock.classList.add('InviteUserName');
            participantBlock.textContent = participant.userName?.charAt(0).toUpperCase() || '';
            participants.append(participantBlock);
        });

        inviteBtn.onclick = () => {
            inviteMenu.classList.toggle('show');
            form.classList.toggle('show');
        }

        form.append(h1, invite);
        inviteMenu.append(form);
        inviteBlock.append(inviteBtn, participants);

        containerElem1Child.append(projectsElems, createTask);
        containerElem1.append(containerElem1Child);

        upperBlock.append(title, inviteBlock);
        containerElem2.append(upperBlock, projects);

        container.append(containerElem1, containerElem2, inviteMenu);

        app.append(container);
    } catch (e) {
        useToast('error', 'Ошибка загрузки проекта: ' + e.code);
    } finally {
        loader.classList.add('hidden');
    }
}

drawProjectPage();