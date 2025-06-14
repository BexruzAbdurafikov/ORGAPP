import { cookie } from "../utils/cookie.js";
import { redirect } from "../utils/helpers.js";
import { drawHeader } from "../components/Header.js";

export default async () => {
    const accessToken = cookie.getCookie('accessToken');

    if (!accessToken || accessToken === 'undefined') {
        return redirect('/signin');
    }

    try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));

        await drawHeader(payload);
    } catch (err) {
        console.warn("Ошибка при обработке токена, редирект на /signin");
        return redirect('/signin');
    }
};