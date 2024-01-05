import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "9fa8cd8c085c36458f63a5e889f54ba5",
        language: "ko-KR"
    }
})

export default instance