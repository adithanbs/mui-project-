import axios from 'axios'

const BaseUrl = process.env.REACT_APP_BaseURL
// console.log("baseUrl",process.env.REACT_APP_BaseURL);
export const SignUp = (data) => {

    return axios.post(`${BaseUrl}signup`, data)
        .then((responce) => (responce))
        .catch(err => console.log(err))

}

export const SignIn = (data) => {

    return axios.post(`${BaseUrl}login`, data)
        .then((responce) => (responce))
        .catch(err => console.log(err))

}

export const Authenticated = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));    
        next()
    }
}

export const SignOut = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        return axios.get(`${BaseUrl}signout`)
            .then((responce) => console.log(responce))
            .catch(err => console.log(err))
    }
}

export const isAuthenticated = (data, next) => {
    if(typeof window == "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false
    }
}