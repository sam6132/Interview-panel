const axios = require('axios');

const URI = 'http://localhost:5000/api/candidate';


export const addReview = async (c_id, review) => {
    return axios
        .post(`${URI}/addReview/${c_id}`, review, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}

export const getReview = async (r_id) => {
    return axios.get(`${URI}/getReview/${r_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}

export const editReviewByReviewId = (review_id, newReview) => {
    return axios.post(`${URI}/editReview/${review_id}`, newReview, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })

}

export const deleteReviewByReviewId = (candidate_id, review_id) => {
    return axios.delete(`${URI}/deleteReview/${candidate_id}&${review_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}
