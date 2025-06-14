import { cookie } from "../utils/cookie.js";
import { redirect } from "../utils/helpers.js";
import { drawHeader } from "../components/Header.js";

export default async () => {
    const accessToken = cookie.getCookie('accessToken');

    let payload = null;

    if (accessToken && accessToken !== 'undefined') {
        try {
            payload = JSON.parse(atob(accessToken.split('.')[1]));
        } catch (err) {
            console.warn("Невалидный токен");
        }
    }

    await drawHeader(payload);

    const publicPaths = ['/signin', '/signup'];
    const path = window.location.pathname;

    if (!payload && !publicPaths.includes(path)) {
        return redirect('/signin');
    }
};
