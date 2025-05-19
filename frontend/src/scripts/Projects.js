import axios from 'axios';
import '../assets/Projects.scss';
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';
import { useUser } from '../utils/useUser';

const loader = document.querySelector('#loader-overlay');
const UpperBlockBtn = document.querySelector('.upper__block button');
const createMenu = document.querySelector('.createMenu');
const form = document.querySelector('form');
const closeBtn = document.querySelector('.closeBtn');

loader.classList.add('hidden');

form.onsubmit = async (e) => {
    loader.classList.remove('hidden');
    e.preventDefault();
    const user = await useUser();

    const formData = new FormData(form);
    const project = {};
    formData.forEach((value, key) => {
        project[key] = value;
    });
    
    try {
        project.participants = [{
            userId: user.user._id,
            userName: user.user.displayName,
        }]
        await axios.post(import.meta.env.VITE_API_URL + '/projects', project, {
            headers: {
                Authorization: `Bearer ${cookie.getCookie('accessToken')}`,
            }
        })
        useToast('success', 'Проект успешно создан!');
    } catch (e) {
        useToast('error', 'Ошибка создания проекта: ' + e.code);
    } finally {
        loader.classList.add('hidden');
        form.reset();
    }
}

UpperBlockBtn.onclick = () => {
    createMenu.classList.toggle('show');
    form.classList.toggle('show')
}

closeBtn.onclick = () => {
    form.classList.toggle('show')
    createMenu.classList.toggle('show');
}