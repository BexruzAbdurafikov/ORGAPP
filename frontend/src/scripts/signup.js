import axios from 'axios';
import '../assets/signup.scss'
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';

const form = document.forms.signup;
const loader = document.querySelector('#loader-overlay');

loader.classList.add('hidden');

form.onsubmit = async (e) => {
    loader.classList.remove('hidden');
    e.preventDefault();

    const user = {};
    const fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/users', user);

        cookie.setCookie('accessToken', response.data.accessToken, 1);

        useToast('success', 'Регистрация прошла успешно!');

    } catch (e) {
        if (e.response) {
            const code = e.response.data?.code || e.response.status;

            if (code === 409) {
                useToast('error', 'Пользователь с таким email уже существует.');
            } else if (code === 400) {
                useToast('error', 'Некорректные данные. Проверьте поля формы.');
            } else if (code === 500) {
                useToast('error', 'Ошибка на сервере. Попробуйте позже.');
            } else {
                useToast('error', 'Неизвестная ошибка: ' + code);
            }
        }
    } finally {
        loader.classList.add('hidden');
    }
};