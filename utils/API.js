const URL_PREFIX = 'http://localhost:3001';

const API = {
	// Signup
	signup: (userObj) => {
		//TODO: Verify backend route
		return fetch(`${URL_PREFIX}/api/createUser`, {
			method: 'POST',
			body: JSON.stringify(userObj),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());
	},

    // Login 
    // userobj = {username: "username", password: "password"}
    // fetch sent to backend :
    login:userObj => {
        console.log("Logging in with credentials ");
        console.log("API.jsx userObj: ", userObj);
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
        return fetch(`${URL_PREFIX}/api/checkToken`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
    },


	// Get one user
	getOneUser: (userId) => {
		return fetch(`${URL_PREFIX}/api/users/${userId}`).then((res) => res.json());
	},


	// Create a recipe
	createRecipe: (userObj, token) => {
		{
			return fetch(`${URL_PREFIX}/api/recipes`, {
				method: 'POST',
				body: JSON.stringify(userObj),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => res.json());
		}
	},
};

export default API;
