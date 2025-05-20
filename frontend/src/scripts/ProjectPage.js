import axios from 'axios';
import '../assets/ProjectPage.scss';
import { cookie } from '../utils/cookie';

const loader = document.querySelector('#loader-overlay');
loader.classList.add('hidden');

async function drawProjectPage() {
    const projectId = window.location.pathname.split('/')[2];
    const res = await axios.get(import.meta.env.VITE_API_URL + `/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${cookie.getCookie('accessToken')}`,
        }
    });
    const project = res.data;

    const title = document.querySelector('.title');
    
    title.textContent = project.name;
}

drawProjectPage();