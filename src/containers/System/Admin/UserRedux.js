import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: "",
            isOpen: false,
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
            });
        }
        if (prevProps.positions !== positions) {
            this.setState({
                positionArr: positions,
            });
        }
        if (prevProps.roles !== roles) {
            this.setState({
                roleArr: roles,
            });
        }
    }

    handleOnchangeImage = (e) => {
        let file = e.target.files[0];
        if (file) {
            let previewImage = URL.createObjectURL(file);
            this.setState({
                previewImage,
            });
        }
    };

    openPreviewImage = () => {
        this.setState({ isOpen: true });
    };

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let previewImage = this.state.previewImage;
        let { language } = this.props;
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
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => (
                                            <option value={""} key={index}>
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
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => (
                                            <option value={""} key={index}>
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
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => (
                                            <option value={""} key={index}>
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
                            <div className="col-12">
                                <button className="btn btn-primary">
                                    <FormattedMessage id="manage-user.save" />
                                </button>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
