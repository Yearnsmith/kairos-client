import axios from "axios";

const kairosAPI = axios.create({
    // reserved for production url
    // baseURL: 'https://kairos-planner.herokuapp.com/'
    baseURL: 'http://localhost:4000'
})

kairosAPI.interceptors.request.use(req => {
    // change to cookie storage
    const token = localStorage.getItem("jwt")
    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`
    }
    return req
})

export default kairosAPI