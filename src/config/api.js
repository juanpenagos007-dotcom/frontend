import axios from "axios";

export default axios.create({
    baseURL: "http://proyapi802.somee.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});