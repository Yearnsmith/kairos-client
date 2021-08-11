import kairosAPI from '../config/api'

export async function getGoals(){
    //axios 'calls' are .get, .post, ...etc.
    const response = await kairosAPI.get("/goals");
    return response.data;
};

export async function getGoalById(id){
    const response = await kairosAPI.get(`/goals/${id}`);
    return response.data;
};

export async function createGoal(data){
    const response = await kairosAPI.post("/goals", data);
    return response.data;
};

export async function updateGoal(data){
    console.log(typeof data)
    const response = await kairosAPI.put(`/goals/${parseInt(data.id)}`, data);
    return response.data;
};

export async function deleteGoal(id){
    const response = await kairosAPI.delete(`/goals/${id}`);
    return response;
};