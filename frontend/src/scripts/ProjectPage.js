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
        const response = await axios.get(import.meta.env.VITE_API_URL + `/users`, {
            headers: {
                Authorization: cookie.getCookie('accessToken')
            }
        });
        const users = response.data.data;
        const project = res.data;

        const app = document.querySelector('#app');

        const span = document.createElement('span');
        const inviteMenu = document.createElement('div');
        const inviteMenuElem = document.createElement('div');
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

        inviteMenuElem.classList.add('inviteMenu__elem');
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

        span.innerHTML = `<svg class="closeBtn" width="24" height="24" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 2L2 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 2L24 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;
        createTask.textContent = '+';
        title.textContent = project.name;
        inviteBtn.textContent = 'Пригласить';

        users.forEach(user => {
            const participantName = document.createElement('h1');
            const invite = document.createElement('button');
            const participantBlock = document.createElement('div');

            participantBlock.classList.add('participantBlock');
            participantName.classList.add('title');
            invite.classList.add('inviteBtn');

            invite.textContent = '+'
            participantName.textContent = user.displayName

            invite.onclick = async () => {
                const participant = {
                    userId: user._id,
                    userName: user.displayName,
                };

                if (!project.participants.some(p => p.userId === participant.userId)) {
                    project.participants.push(participant);

                    await axios.patch(import.meta.env.VITE_API_URL + `/projects/${projectId}`, 
                        {participants: project.participants},
                        {
                            headers: {
                                Authorization: cookie.getCookie('accessToken')
                            }
                        }
                    )

                    const participantCircle = document.createElement('div');
                    participantCircle.classList.add('InviteUserName');
                    participantCircle.textContent = participant.userName?.charAt(0).toUpperCase() || '';
                    participants.append(participantCircle);

                    useToast('success', 'Пользователь успешно приглашен!');
                } else {
                    useToast('error', 'Пользователь уже приглашен в проект!');
                }

                inviteMenuElem.classList.remove('show');
                inviteMenu.classList.remove('show');
            }

            participantBlock.append(participantName, invite);
            inviteMenuElem.append(participantBlock)
        })

        project.participants.forEach(participant => {
            const participantCircle = document.createElement('div');

            participantCircle.classList.add('InviteUserName');

            participantCircle.textContent = participant.userName?.charAt(0).toUpperCase() || '';

            participants.append(participantCircle);
        });

        inviteBtn.onclick = () => {
            inviteMenu.classList.toggle('show');
            inviteMenuElem.classList.toggle('show');
        }

        span.onclick = () => {
            inviteMenu.classList.remove('show');
            inviteMenuElem.classList.remove('show');
        }

        inviteMenuElem.append(span);
        inviteMenu.append(inviteMenuElem);
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