import axios from 'axios';
import '../assets/signup.scss'
import { cookie } from '../utils/cookie';

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

        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    } catch (error) {
        console.error(error);
    } finally {
        loader.classList.add('hidden');
    }
};