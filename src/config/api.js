import axios from "axios";

export default axios.create({
    baseURL: "https://tiendasetentahp.somee.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});