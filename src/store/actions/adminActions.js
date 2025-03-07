import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log(error);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log(error);
        }
    };
};

export const fetchPositionSuccess = (genderData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: genderData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log(error);
        }
    };
};

export const fetchRoleSuccess = (genderData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: genderData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log("RES: >>>>>>", data);
            let res = await userService.createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed");
                dispatch(saveUserSuccess());
            } else {
                toast.error(res.errMessage);
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log(error);
        }
    };
};

export const saveUserSuccess = () => ({
    type: "SAVE_USER_SUCCESS",
});

export const saveUserFailed = () => ({
    type: "SAVE_USER_FAILED",
});

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers("ALL");
            // let doctors = await userService.getTopDoctorHomeService(10);
            if (res && res.errCode === 0) {
                let users = res.users.reverse();
                dispatch(fetchAllUserSuccess(users));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            dispatch(fetchAllUserFailed());
            console.log(error);
        }
    };
};

export const fetchAllUserSuccess = (data) => {
    return {
        type: "FETCH_ALL_USERS_SUCCESS",
        users: data,
    };
};

export const fetchAllUserFailed = () => {
    return {
        type: "FETCH_ALL_USERS_FAILED",
    };
};

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess());
            } else {
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
        }
    };
};

export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
    };
};

export const deleteUserFailed = () => {
    return {
        type: actionTypes.DELETE_USER_FAILED,
    };
};

export const EditUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update user succeed");
                dispatch(editUserSuccess());
            } else {
                toast.error(res.errMessage);
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
        }
    };
};

export const editUserSuccess = () => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
    };
};

export const editUserFailed = () => {
    return {
        type: actionTypes.EDIT_USER_FAILED,
    };
};

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorHomeService("");
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess());
            } else {
                toast.error(res.message);
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFailed());
        }
    };
};

export const fetchTopDoctorsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
        data,
    };
};

export const fetchTopDoctorsFailed = () => {
    return {
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                toast.error(res.message);
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFailed());
        }
    };
};

export const fetchAllDoctorsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
        data,
    };
};
export const fetchAllDoctorsFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save Info Detail Doctor Succeed");
                dispatch(saveDetailDoctorSuccess());
            } else {
                toast.error(res.message);
                dispatch(saveDetailDoctorFailed());
            }
        } catch (error) {
            dispatch(saveDetailDoctorFailed());
        }
    };
};

export const saveDetailDoctorSuccess = () => {
    return {
        type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
    };
};

export const saveDetailDoctorFailed = () => {
    return {
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
    };
};
