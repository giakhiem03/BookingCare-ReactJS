import axios from "../axios";

class UserService {
    handleLogin = (email, password) => {
        return axios.post("/api/login", { email, password });
    };

    getAllCodeService = (inputType) => {
        return axios.get(`/api/allcode?type=${inputType}`);
    };
}

export default new UserService();
