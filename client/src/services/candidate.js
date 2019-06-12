const axios = require('axios');

const URI = 'http://192.168.0.160:5000/api/candidate';


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
        .post(`http://192.168.0.160:5000/api/candidate/update/${c_id}`, candidate, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })
}

// write a url to get round details 


export const getRoundDetailsByCandidateId = async (candidate_id) => {
    return await axios
        .get(`http://192.168.0.160:5000/api/candidate/getrounddetails/${candidate_id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}


export const addSkillsByCandidateId = async (candidate_id, skill) => {

    console.log(skill)
    return await axios
        .post(`http://192.168.0.160:5000/api/candidate/addSkill/${candidate_id}`, { skill }, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })
}

export const getSkillsByCandidateId = async (candidate_id) => {
    return await axios
        .get(`http://192.168.0.160:5000/api/candidate/getskills/${candidate_id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}
export const updateRoundDetailsByCandidateId = async (candidate_id, review) => {
    return await axios
        .post(`http://192.168.0.160:5000/api/candidate/editReview/${candidate_id}`, review, {
            headers: { 'x-auth': localStorage.getItem('token') }

        })

}

export const deleteCandidateById = async (candidate_id) => {
    return await axios
        .delete(`http://192.168.0.160:5000/api/candidate/delete/${candidate_id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }

        })
}