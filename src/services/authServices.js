import kairosAPI from "../config/api";

export async function signUp(data){
    const response = await kairosAPI.post("/api/auth/sign_up", data)
    return response.data
}

export async function signIn(data){
    const response = await kairosAPI.post("api/auth/sign_in", data)
    return response.data

}