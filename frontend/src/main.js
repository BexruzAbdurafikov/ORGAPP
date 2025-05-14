import { handleLinkClick, router } from "./router/router.js";

window.addEventListener('popstate', router);
document.addEventListener('click', handleLinkClick);

router();