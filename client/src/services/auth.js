const axios = require('axios');

const URI = 'http://localhost:5000/api/user';


export const login = async (user) => {
    return axios
        .post(`${URI}/login`, user)

}


export const register = async (user) => {

    axios.post(`${URI}/register`, user)
}

export const logout = () => {
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('refreshToken');

    axios.get(`${URI}/logout/${user_id}&${token}`);
    sessionStorage.clear();
    window.location.reload()
}

export const isLoggedIn = () => {
    if (sessionStorage.getItem("refreshToken") === null) {
        return false
    }
    return true
}

export const getAccessToken = () => {
    const userId = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('refreshToken');
    axios.get(`http://localhost:5000/api/user/verify/${userId}&${token}`).then(res => {
        sessionStorage.setItem('token', res.data);
    }).catch(err => {
        logout()
    });
}


// // isLoggedIn() { }


// module.exports = { login }