const axios = require('axios');

const URI = 'http://localhost:5000/api/team';


export const getTeams = async () => {
    return axios
        .get(`${URI}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}

export const getTeamMembers = async (t_id) => {
    return axios.get(`${URI}/members/${t_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}