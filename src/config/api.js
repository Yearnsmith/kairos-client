import axios from "axios";

const kairosAPI = axios.create({
    // reserved for production url
    // baseURL: 'https://kairos.herokuapp.com'
    baseURL: 'http://localhost:3000'
})

kairosAPI.interceptors.request.use(req => {
    // change to cookie storage
    const token = sessionStorage.getItem("token")
    if (token) {
        req.headers["Authorization"] = `Bearar ${token}`
    }
    return req
})

export default kairosAPI