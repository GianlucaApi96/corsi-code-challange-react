import axios from 'axios';

class UserApi {
    state={
        Server:"http://localhost:8000/api/"
    }

    listEmployee = (userId) => {
        return axios.get(`${this.state.Server}listEmployee/${userId}`);
    }

    getUserId = (email) => {
        return axios.get(`${this.state.Server}listEmployee/${email}`);
    }

    /*async listEmployee(userId){
        try {
            await axios.get(`${this.state.Server}listEmployee/${userId}`);
        } catch (e){

        }
    }*/
}
export default new UserApi()