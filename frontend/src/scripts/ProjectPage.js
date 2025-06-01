import axios from 'axios';
import '../assets/ProjectPage.scss';
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';

const loader = document.querySelector('#loader-overlay');
let project;

const options = [
    { value: 'Low', text: 'Low' },
    { value: 'Medium', text: 'Medium' },
    { value: 'High', text: 'High' },
]

function renderSections(sectionsContainer) {
    const createSectionBtn = sectionsContainer.querySelector('.createSectionBtn');
    sectionsContainer.innerHTML = '';
    sectionsContainer.appendChild(createSectionBtn);

    project.sections.forEach(section => {
        const sectionElement = document.createElement('div');
        const sectionTitle = document.createElement('h3');
        const tasksContainer = document.createElement('div');
        const addTaskBtn = document.createElement('button');

        const taskMenu = document.createElement('div');
        const taskMenuElem = document.createElement('div');
        const taskCloseBtn = document.createElement('span');
        const taskInput = document.createElement('input');
        const taskSelect = document.createElement('select');
        const taskSubmitBtn = document.createElement('button');

        sectionElement.classList.add('section');
        tasksContainer.classList.add('tasksContainer');
        addTaskBtn.classList.add('addTaskBtn');

        taskMenu.classList.add('inviteMenu');
        taskMenuElem.classList.add('inviteMenu__elem');
        taskSubmitBtn.classList.add('create');
        taskInput.classList.add('taskInput');
        taskSelect.classList.add('taskSelect');

        sectionTitle.textContent = section.title;
        addTaskBtn.textContent = '+ Добавить задачу';

        taskInput.placeholder = 'Название задачи';
        taskInput.required = true;
        taskSubmitBtn.textContent = 'Создать';
        taskCloseBtn.innerHTML = `<svg class="closeBtn" width="24" height="24" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 2L2 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 2L24 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;

        addTaskBtn.onclick = () => {
            taskMenu.classList.toggle('show');
            taskMenuElem.classList.toggle('show');
        }

        taskCloseBtn.onclick = () => {
            taskMenu.classList.remove('show');
            taskMenuElem.classList.remove('show');
        }

        options.forEach(opt => {
            const option = document.createElement('option');

            option.value = opt.value;
            option.textContent = opt.text;

            if (opt.value === 'Low') {
                option.style.backgroundColor = '#28a745';
                option.style.color = '#ffffff';
            } else if (opt.value === 'Medium') {
                option.style.backgroundColor = '#ffc107';
                option.style.color = '#000000';
            } else if (opt.value === 'High') {
                option.style.backgroundColor = '#dc3545';
                option.style.color = '#ffffff';
            }

            taskSelect.appendChild(option);
        })

        taskMenuElem.append(taskCloseBtn, taskInput, taskSelect, taskSubmitBtn);
        taskMenu.append(taskMenuElem);

        sectionElement.append(sectionTitle, tasksContainer, addTaskBtn, taskMenu);

        sectionsContainer.prepend(sectionElement);
    });
}

async function drawProjectPage() {
    const projectId = window.location.pathname.split('/')[2];
    try {
        loader.classList.remove('hidden');
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
        project = res.data;

        const body = document.querySelector('body');

        const container = document.createElement('div');
        const containerElem1 = document.createElement('div');
        const containerElem1Child = document.createElement('div');
        const projectsElems = document.createElement('div');
        const createTask = document.createElement('button');
        const containerElem2 = document.createElement('div');
        const upperBlock = document.createElement('div');
        const title = document.createElement('h1');
        const inviteBlock = document.createElement('div');
        const sections = document.createElement('div');
        const participants = document.createElement('div');
        const createSectionBtn = document.createElement('button');

        const inviteMenu = document.createElement('div');
        const inviteMenuElem = document.createElement('div');
        const inviteCloseBtn = document.createElement('span');
        const inviteBtn = document.createElement('button');

        const sectionMenu = document.createElement('div');
        const sectionMenuElem = document.createElement('form');
        const sectionCloseBtn = document.createElement('span');
        const sectionInput = document.createElement('input');
        const sectionSubmitBtn = document.createElement('button');

        container.classList.add('container');
        containerElem1.classList.add('container__elem1');
        containerElem1Child.classList.add('container__elem1__child');
        projectsElems.classList.add('projects__elems');
        createTask.classList.add('create');
        containerElem2.classList.add('container__elem2');
        upperBlock.classList.add('upper__block');
        title.classList.add('title');
        inviteBlock.classList.add('invite');
        participants.classList.add('participants');
        sections.classList.add('sections');
        createSectionBtn.classList.add('createSectionBtn');

        inviteMenu.classList.add('inviteMenu');
        inviteMenuElem.classList.add('inviteMenu__elem');
        inviteBtn.classList.add('create');

        sectionMenu.classList.add('inviteMenu');
        sectionMenuElem.classList.add('inviteMenu__elem');
        sectionSubmitBtn.classList.add('create');

        sectionInput.required = true;

        createTask.textContent = '+';
        title.textContent = project.name;
        inviteBtn.textContent = 'Пригласить';
        createSectionBtn.textContent = '+ Создать раздел';
        sectionSubmitBtn.textContent = 'Создать';
        sectionInput.placeholder = 'Название раздела';

        inviteCloseBtn.innerHTML = `<svg class="closeBtn" width="24" height="24" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 2L2 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 2L24 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;

        sectionCloseBtn.innerHTML = `<svg class="closeBtn" width="24" height="24" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 2L2 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 2L24 24" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;

        inviteBtn.onclick = () => {
            inviteMenu.classList.toggle('show');
            inviteMenuElem.classList.toggle('show');
        };

        inviteCloseBtn.onclick = () => {
            inviteMenu.classList.remove('show');
            inviteMenuElem.classList.remove('show');
        };

        createSectionBtn.onclick = () => {
            sectionMenu.classList.toggle('show');
            sectionMenuElem.classList.toggle('show');
        };

        sectionCloseBtn.onclick = () => {
            sectionMenu.classList.remove('show');
            sectionMenuElem.classList.remove('show');
        };

        sectionSubmitBtn.onclick = async () => {
            const sectionName = sectionInput.value.trim();
            if (sectionName) {
                try {
                    loader.classList.remove('hidden');
                    await createSection(sectionName);
                    sectionInput.value = '';
                    sectionMenu.classList.remove('show');
                    sectionMenuElem.classList.remove('show');
                    useToast('success', 'Раздел успешно создан!');
                } catch (e) {
                    useToast('error', 'Ошибка при создании раздела: ' + e.message);
                } finally {
                    loader.classList.add('hidden');
                }
            }
        };

        users.forEach(user => {
            const participantBlock = document.createElement('div');
            const participantName = document.createElement('h1');
            const inviteUserBtn = document.createElement('button');

            participantBlock.classList.add('participantBlock');
            participantName.classList.add('title');
            inviteUserBtn.classList.add('inviteBtn');

            participantName.textContent = user.displayName;
            inviteUserBtn.textContent = '+';

            inviteUserBtn.onclick = async () => {
                try {
                    loader.classList.remove('hidden');
                    const participant = {
                        userId: user._id,
                        userName: user.displayName,
                    };

                    if (!project.participants.some(p => p.userId === participant.userId)) {
                        project.participants.push(participant);

                        await axios.patch(
                            import.meta.env.VITE_API_URL + `/projects/${projectId}`,
                            { participants: project.participants },
                            { headers: { Authorization: cookie.getCookie('accessToken') } }
                        );

                        const participantCircle = document.createElement('div');
                        participantCircle.classList.add('InviteUserName');
                        participantCircle.textContent = participant.userName?.charAt(0).toUpperCase() || '';
                        participants.append(participantCircle);

                        useToast('success', 'Пользователь успешно приглашен!');
                    } else {
                        useToast('error', 'Пользователь уже приглашен в проект!');
                    }

                    inviteMenu.classList.remove('show');
                    inviteMenuElem.classList.remove('show');
                } catch (e) {
                    useToast('error', 'Ошибка приглашения пользователя: ' + e.code);
                } finally {
                    loader.classList.add('hidden');
                }
            };

            participantBlock.append(participantName, inviteUserBtn);
            inviteMenuElem.append(participantBlock);
        });

        project.participants.forEach(participant => {
            const participantCircle = document.createElement('div');
            participantCircle.classList.add('InviteUserName');
            participantCircle.textContent = participant.userName?.charAt(0).toUpperCase() || '';
            participants.append(participantCircle);
        });

        sectionMenuElem.append(sectionCloseBtn, sectionInput, sectionSubmitBtn);
        sectionMenu.append(sectionMenuElem);

        inviteMenuElem.append(inviteCloseBtn);
        inviteMenu.append(inviteMenuElem);

        sections.append(createSectionBtn);
        renderSections(sections);

        inviteBlock.append(inviteBtn, participants);
        upperBlock.append(title, inviteBlock);
        containerElem1Child.append(projectsElems, createTask);
        containerElem1.append(containerElem1Child);
        containerElem2.append(upperBlock, sections);
        container.append(containerElem1, containerElem2, inviteMenu, sectionMenu);
        body.append(container);
    } catch (e) {
        useToast('error', 'Ошибка загрузки проекта: ' + e.code);
    } finally {
        loader.classList.add('hidden');
    }
}

async function createSection(sectionName) {
    const projectId = window.location.pathname.split('/')[2];

    let updatedSections = [];

    if (project.sections) {
        updatedSections = [...project.sections];
    }

    updatedSections.push({
        title: sectionName.trim(),
        tasks: []
    });

    const response = await axios.patch(import.meta.env.VITE_API_URL + `/projects/${projectId}`,
        { sections: updatedSections },
        { headers: { Authorization: cookie.getCookie('accessToken') } }
    );

    project = response.data;

    const sectionsContainer = document.querySelector('.sections');
    if (sectionsContainer) {
        renderSections(sectionsContainer);
    }
}
drawProjectPage();