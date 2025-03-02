import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import userService from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",

            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        await this.props.getGenderStart();
        await this.props.getPositionsStart();
        await this.props.getRolesStart();
        // try {
        //     let res1 = await userService.getAllCodeService("gender");
        //     let res2 = await userService.getAllCodeService("position");
        //     let res3 = await userService.getAllCodeService("role");
        //     if (res1 && res1.errCode === 0) {
        //         this.setState({
        //             genderArr: res1.data,
        //             positionArr: res2.data,
        //             roleArr: res3.data,
        //         });
        //     }
        // } catch (error) {
        //     //
        // }
    }

    async componentDidUpdate(prevProps, preState, snapshot) {
        let { genders, positions, roles } = this.props;
        if (prevProps.genders !== genders) {
            this.setState({
                genderArr: genders,
                gender: genders && genders.length > 0 ? genders[0].key : "",
            });
        }
        if (prevProps.positions !== positions) {
            this.setState({
                positionArr: positions,
                position:
                    positions && positions.length > 0 ? positions[0].key : "",
            });
        }
        if (prevProps.roles !== roles) {
            this.setState({
                roleArr: roles,
                role: roles && roles.length > 0 ? roles[0].key : "",
            });
        }

        if (prevProps.usersRedux !== this.props.usersRedux) {
            let { genders, positions, roles } = this.props;

            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: genders && genders.length > 0 ? genders[0].key : "",
                position:
                    positions && positions.length > 0 ? positions[0].key : "",
                role: roles && roles.length > 0 ? roles[0].key : "",
                avatar: "",
                action: CRUD_ACTIONS.CREATE,
            });
        }
    }

    handleOnchangeImage = (e) => {
        let file = e.target.files[0];
        if (file) {
            let previewImage = URL.createObjectURL(file);
            this.setState({
                previewImage,
                avatar: file,
            });
        }
    };

    openPreviewImage = () => {
        this.setState({ isOpen: true });
    };

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState(
            {
                ...copyState,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
        ];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("This input is required: " + arrCheck[i]);
                break;
            }
        }

        return isValid;
    };

    handleSaveUser = async () => {
        let isValid = this.checkValidateInput();
        if (!isValid) {
            return;
        }

        if (this.state.action === CRUD_ACTIONS.CREATE) {
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            });
        }

        if (this.state.action === CRUD_ACTIONS.EDIT) {
            await this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }

        this.props.fetchUserRedux();
    };

    handleEditUserFromParent = (user) => {
        this.setState({
            email: user.email,
            password: "HARDCODE",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let previewImage = this.state.previewImage;
        let { language } = this.props;

        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar,
        } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">Learn React - Redux Fullstack</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        this.onChangeInput(e, "email")
                                    }
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        this.onChangeInput(e, "password")
                                    }
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        this.onChangeInput(e, "firstName")
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        this.onChangeInput(e, "lastName")
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        this.onChangeInput(e, "phoneNumber")
                                    }
                                />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(e) =>
                                        this.onChangeInput(e, "address")
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage
                                        id="manage-user.gender"
                                        value={gender}
                                    />
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                        this.onChangeInput(e, "gender")
                                    }
                                    value={gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => (
                                            <option
                                                value={item.key}
                                                key={index}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                        this.onChangeInput(e, "position")
                                    }
                                    value={position}
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => (
                                            <option
                                                value={item.key}
                                                key={index}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                        this.onChangeInput(e, "role")
                                    }
                                    value={role}
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => (
                                            <option
                                                value={item.key}
                                                key={index}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        hidden
                                        id="previewImage"
                                        type="file"
                                        onChange={this.handleOnchangeImage}
                                    />
                                    <label
                                        className="label-upload"
                                        htmlFor="previewImage"
                                    >
                                        Tải ảnh
                                        <FontAwesomeIcon
                                            icon={faUpload}
                                            size="lg"
                                        />
                                    </label>
                                    {previewImage && (
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${previewImage})`,
                                            }}
                                            onClick={this.openPreviewImage}
                                        ></div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? "btn btn-warning me-2"
                                            : "btn btn-primary me-2"
                                    }
                                    onClick={this.handleSaveUser}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParent={
                                        this.handleEditUserFromParent
                                    }
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.EditUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
