import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pizza-builder-6412e.firebaseio.com/'
});

export default instance;