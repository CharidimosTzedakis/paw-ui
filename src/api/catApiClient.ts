import { TheCatAPI } from "@thatapicompany/thecatapi";

const theCatAPI = new TheCatAPI(import.meta.env.VITE_CAT_API_KEY);

export default theCatAPI;
