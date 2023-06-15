import axios from "axios";

export default axios.create({
  baseURL: "http://elibv2-production.up.railway.app/api",
  headers: {
    "Content-type": "application/json"
  }

});