import { drawHeader } from "../components/header.js";
import { useUser } from "../utils/useUser.js";

async function layout() {
    const user = await useUser();
    drawHeader(user);
}

layout();