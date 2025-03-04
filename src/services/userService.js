import axios from "../axios";

class UserService {
    handleLogin = (email, password) => {
        return axios.post("/api/login", { email, password });
    };

    getAllCodeService = (inputType) => {
        return axios.get(`/api/allcode?type=${inputType}`);
    };

    createNewUserService = (data) => {
        return axios.post("/api/create-new-user", data);
    };

    getAllUsers = (inputId) => {
        return axios.get(`/api/get-all-user?id=${inputId}`);
    };

    deleteUserService = (userId) => {
        return axios.delete("/api/delete-user", { data: { id: userId } });
    };

    editUserService = (inputData) => {
        return axios.put("/api/edit-user", inputData);
    };

    getTopDoctorHomeService = (limit) => {
        return axios.get(`/api/top-doctor-home?limit=${limit}`);
    };
}

export default new UserService();
