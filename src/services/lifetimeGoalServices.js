import kairosAPI from '../config/api'

export async function getLTGoals(){
    //axios 'calls' are .get, .post, ...etc.
    const response = await kairosAPI.get("/ltgoals");
    return response.data;
};

export async function getLTGoalById(id){
    const response = await kairosAPI.get(`/ltgoals/${id}`);
    return response.data;
};

export async function createLTGoal(data){
    const response = await kairosAPI.post("/ltgoals", data);
    return response.data;
};

export async function updateLTGoal(data){
    const response = await kairosAPI.put(`/ltgoals/${data.id}`, data);
    return response.data;
};

export async function deleteLTGoal(id){
    const response = await kairosAPI.delete(`/ltgoals/${id}`);
    return response;
};