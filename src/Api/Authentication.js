import axios from 'axios';
import Cookies from 'js-cookie';

class Authentication{

    state = {
        Server:"http://localhost:8000"
    }

    sanctumAuth = (email) => {
        return axios.post(`${this.state.Server}/api/login`,
            {email});
    }

    signup = (email) => {
        return axios.post(`${this.state.Server}/api/user/create`,
            {email});
    }

    saveUserInfo= (email, token) => {
        sessionStorage.setItem("user",email);
        sessionStorage.setItem("token",token);

        this.setupAxiosInterceptors('Bearer ' + token);

    }

    clearUserInfo = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    }

    getUserInfo = () => sessionStorage.getItem("user");

    isLogged = () => {

        let user = this.getUserInfo();

        if (user === null){
            return false;
        }
        else{
            return true;
        }
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isLogged()) {
                    config.headers.authorization = token

                }
                return config;
            }
        )
    }

}

export default new Authentication()