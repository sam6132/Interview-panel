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
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('refreshToken');

    axios.get(`${URI}/logout/${user_id}&${token}`);
    localStorage.clear();
    window.location.reload()
}

export const isLoggedIn = () => {
    if (localStorage.getItem("refreshToken") === null) {
        return false
    }
    return true
}

export const getAccessToken = () => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('refreshToken');
    axios.get(`http://localhost:5000/api/user/verify/${userId}&${token}`).then(res => {
        localStorage.setItem('token', res.data);
    }).catch(err => {
        logout()
    });
}


// // isLoggedIn() { }


// module.exports = { login }