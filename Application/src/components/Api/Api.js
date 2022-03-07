import axios from 'axios';

export default axios.create({
    baseURL: 'https://maestro2go.azurewebsites.net/api/auto_graph'
})