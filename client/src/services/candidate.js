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


export const editCandidateById = (c_id, candidate) => {
    return axios
        .post(`${URI}/update/${c_id}`, candidate, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })
}

// write a url to get round details 


export const getRoundDetailsByCandidateId = async (candidate_id) => {
    return await axios
        .get(`${URI}/getrounddetails/${candidate_id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}


export const addSkillsByCandidateId = async (candidate_id, skill) => {

    console.log(skill)
    return await axios
        .post(`${URI}/addSkill/${candidate_id}`, { skill }, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })
}

export const getSkillsByCandidateId = async (candidate_id) => {
    return await axios
        .get(`${URI}/getskills/${candidate_id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}
export const updateRoundDetailsByCandidateId = async (candidate_id, review) => {
    return await axios
        .post(`${URI}/editReview/${candidate_id}`, review, {
            headers: { 'x-auth': localStorage.getItem('token') }

        })

}

export const deleteCandidateById = async (candidate_id) => {
    return await axios
        .delete(`${URI}/delete/${candidate_id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }

        })
}