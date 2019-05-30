const axios = require('axios');

const URI = 'http://localhost:5000/api/candidate';


export const addReview = async (candidate) => {
    return axios
        .post(`${URI}/add`, candidate)

}

export const getReview = async (r_id) => {
    return axios.get(`${URI}/getReview/${r_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}

export const editCandidate = (candidate_id) => {
    return axios.get(`${URI}/edit/${candidate_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })

}
