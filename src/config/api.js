import axios from "axios";

export default axios.create({
    baseURL: "https://proyapi802.somee.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});