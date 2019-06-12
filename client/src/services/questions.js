const axios = require('axios');

const URI = 'http://192.168.0.160:5000/api/question';


export const createQuestion = async (title) => {

    return axios.post(`${URI}/create`, { title }, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}

export const addQuestion = async (q_id, question) => {
    console.log("from question", question)
    return axios
        .post(`${URI}/add/${q_id}`, { question }, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}

export const getQuestions = async () => {
    return axios.get(`${URI}/`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}
