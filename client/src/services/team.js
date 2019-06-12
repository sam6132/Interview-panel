const axios = require('axios');

const URI = 'http://206.189.235.9:5000/api/team';


export const getTeams = async () => {
    return axios
        .get(`${URI}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}



export const getTeamsByTeamId = async (t_id) => {
    return axios.get(`${URI}/members/${t_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}