import axios from 'axios';

const axios_instance = axios.create({
    baseURL: 'https://react-burger-beb91.firebaseio.com/',
});

export {axios_instance}