import axios from 'axios';
import '../assets/signin.scss'
import { cookie } from '../utils/cookie';

const form = document.forms.signin;
const loader = document.querySelector('#loader-overlay');

loader.classList.add('hidden');

form.onsubmit = async (e) => {
    loader.classList.remove('hidden');
    e.preventDefault();

    const user = {};
    const fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    })
    console.log(user);
    
    try{
        const res = await axios.post(import.meta.env.VITE_API_URL + '/authentication', {
            ...user,
            strategy: 'local'
        });

        cookie.setCookie('accessToken', res.data.accessToken, 1);
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }catch(e){
        console.error(e);
    }finally{
        loader.classList.add('hidden');
    }
};