import axios from 'axios';
import '../assets/signin.scss'
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';

const form = document.querySelector('form');
const loader = document.querySelector('#loader-overlay');

loader.classList.add('hidden');

form.onsubmit = async (e) => {
    e.preventDefault();

    const user = {};
    const fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    })

    try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/authentication', {
            ...user,
            strategy: 'local'
        });
        cookie.setCookie('accessToken', res.data.accessToken, 1);
        useToast('success', 'Вы успешно вошли!');
        setTimeout(() => {
            window.location.href = 'Projects';
        }, 2000);
    } catch (e) {
        const code = e.response.data?.code || e.response.status;
        if (code === 400) {
            useToast('error', 'Неверные данные. Проверьте форму.');
        } else if (code === 401) {
            useToast('error', 'Неверный логин или пароль.');
        } else if (code === 403) {
            useToast('error', 'Доступ запрещён.');
        } else if (code === 404) {
            useToast('error', 'Маршрут не найден.');
        } else {
            useToast('error', 'Ошибка входа: ' + code);
        }
    } finally {
        loader.classList.add('hidden');
    }
};