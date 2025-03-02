import actionTypes from "./actionTypes";
import userService from "../../services/userService";

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
