import kairosAPI from '../config/api'

export async function getEvents(){
    //axios 'calls' are .get, .post, ...etc.
    const response = await kairosAPI.get("/events");
    return response.data;
};

export async function getEventsById(id){
    const response = await kairosAPI.get(`/events/${id}`);
    return response.data;
};

export async function getEventsByDate(date){
    const response = await kairosAPI.post(`/events/`, date);
    return response.data;
};

export async function createEvent(data){
    const response = await kairosAPI.post("/events", data);
    return response.data;
};

export async function updateEvent(data){
    const response = await kairosAPI.put(`/events/${data.id}`, data);
    return response.data;
};

export async function deleteEvent(id){
    const response = await kairosAPI.delete(`/events/${id}`);
    return response;
};