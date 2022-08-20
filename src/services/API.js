import axios from "axios";

export default (url = "https://localhost:7051/") => {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
});
};
