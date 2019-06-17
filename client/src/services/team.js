const axios = require('axios');

const URI = 'http://206.189.235.9:5000/api/team';


export const getTeams = async () => {
    return axios
        .get(`${URI}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        })

}

export const addTeamMember = async (t_id, teamMember) => {
    return axios
        .post(
            `${URI}/addTeamMembers/${t_id}`,
            teamMember,
            {
                headers: { "x-auth": localStorage.getItem("token") }
            }
        )
}

export const createTeam = async (team) => {
    return axios
        .post(`${URI}/createTeam/`, team, {
            headers: { "x-auth": localStorage.getItem("token") }
        })
}


export const getTeamsByTeamId = async (t_id) => {
    return axios.get(`${URI}/members/${t_id}`, {
        headers: { 'x-auth': localStorage.getItem('token') }
    })
}