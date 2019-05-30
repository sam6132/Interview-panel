const axios = require('axios');

const URI = 'http://localhost:5000/api/candidate';


export const addCandidate = async (candidate) => {
    return axios
        .post(`${URI}/add`, candidate, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}

export const getCandidates = async () => {
    return axios.get(URI, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}

export const editCandidate = (candidate_id) => {
    return axios.get(`${URI}/edit/${candidate_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })

}
