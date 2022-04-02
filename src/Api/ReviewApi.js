import axios from 'axios';

class ReviewApi {
    state={
        Server:"http://localhost:8000/api/"
    }

    createReview = (review) => {
        return axios.post(`${this.state.Server}review/create`, review);
    }

    listReviewByEmployee = (userId) => {
        return axios.get(`${this.state.Server}reviews/list/${userId}`);
    }

}
export default new ReviewApi()