import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils/constant";

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.onChangeLanguage(language);
    };

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="languages">
                    <span
                        className={
                            this.props.language === "vi"
                                ? "language-vi active"
                                : "language-vi "
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={
                            this.props.language === "en"
                                ? "language-en active"
                                : "language-en "
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        title="Log out"
                        onClick={processLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        onChangeLanguage: (language) => {
            dispatch(actions.changLanguageApp(language));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
