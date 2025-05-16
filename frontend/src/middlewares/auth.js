import { cookie } from "../utils/cookie.js"
import { redirect } from "../utils/helpers.js";

export default async () => {
    const acccessToken = cookie.getCookie('accessToken');

    if (acccessToken === 'undefined' || !acccessToken) {
        return redirect('/signin');
    }
}
