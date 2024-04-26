const URL_PREFIX="http://localhost:3000"

const API = {

    // Signup
    signup:userObj => {
        //TODO: Verify backend route
        return fetch(`${URL_PREFIX}/api/users`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },

    // Login 
    login:userObj => {
        //TODO: Verify backend route
        return fetch(`${URL_PREFIX}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },

    //Check Token
    checkToken:token => {
        return fetch(`${URL_PREFIX}/api/users/checkToken`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
    },

    getOneUser:userId => {
        return fetch(`${URL_PREFIX}/api/users/${userId}`).then(res => res.json())
    }
};

export default API;
