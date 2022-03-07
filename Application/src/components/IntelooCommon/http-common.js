import axios from "axios";
export default axios.create({
  baseURL: "https://maestro2go.azurewebsites.net/api/",
  headers: {
    "Content-type": "application/json"
  }
});
