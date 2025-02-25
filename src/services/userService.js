import axios from "../axios";

class UserService {
    handleLogin = (email, password) => {
        return axios.post("/api/login", { email, password });
    };
}

export default new UserService();
