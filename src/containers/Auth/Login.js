import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import "./Login.scss";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "hoidanit",
            password: "withEric",
            isShowPassword: false,
        };
    }

    handleOnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = () => {
        console.log(this.state.username, " + ", this.state.password);
    };

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">
                            Login
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                name="username"
                                type="text"
                                value={this.state.username}
                                className="form-control "
                                placeholder="enter your username..."
                                onChange={this.handleOnChangeInput}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-inp-pw">
                                <input
                                    name="password"
                                    value={this.state.password}
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className=" form-control "
                                    placeholder="enter your password..."
                                    onChange={this.handleOnChangeInput}
                                />
                                <FontAwesomeIcon
                                    onClick={this.handleShowHidePassword}
                                    className="icons"
                                    icon={
                                        this.state.isShowPassword
                                            ? faEye
                                            : faEyeSlash
                                    }
                                    size="1x"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                                onClick={this.handleSubmit}
                                className="btn-login"
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span>Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <FontAwesomeIcon
                                icon={faFacebook}
                                size="3x"
                                color="#307aff"
                            />
                            <FontAwesomeIcon
                                icon={faGooglePlus}
                                size="3x"
                                color="#c32424"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
