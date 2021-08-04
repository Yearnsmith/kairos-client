import kairosAPI from "../config/api";

export async function signUp(data){
    // fetch(http://localhost:4000/sign_up)
    try {
        const response = await kairosAPI.post("/sign_up", data)
        localStorage.setItem('jwt', response.data.jwt)
        return response
    } catch (e) {
        console.log(e)
    }
}

export async function signIn(data){
    try {
        const response = await kairosAPI.post("/sign_in", data)
        localStorage.setItem('jwt', response.data.jwt)
        return "Sign in successful!"
    } catch (e) {
        return e.message
    }

}