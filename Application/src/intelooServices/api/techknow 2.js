import axios from "axios";

export default axios.create({
    baseURL: 'http://20.122.71.73:5000/api/'
});