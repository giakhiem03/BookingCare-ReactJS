import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faClipboardList,
    faHospital,
    faNotesMedical,
    faPhone,
    faQuestionCircle,
    faSearch,
    faSyringe,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changLanguageApp } from "../../store/actions/appActions";

class Header extends Component {
    changLanguage = (language) => {
        this.props.onChangeLanguage(language);
    };
    render() {
        console.log(this.props.userInfo);
        let { intl } = this.props;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <FontAwesomeIcon
                                size="xl"
                                color="gray"
                                cursor={"pointer"}
                                icon={faBars}
                            />
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <div>
                                        <b>
                                            <FormattedMessage id="homeheader.specialty" />
                                        </b>
                                    </div>
                                    <div className="sub-title">
                                        <FormattedMessage id="homeheader.searchDoctor" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="homeheader.select-room" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="homeheader.select-doctor" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="homeheader.check-health" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <FontAwesomeIcon
                                    style={{ marginRight: "5px" }}
                                    icon={faQuestionCircle}
                                />
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div
                                className={
                                    this.props.language === "vi"
                                        ? "language-vi active"
                                        : "language-vi"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    this.props.language === "en"
                                        ? "language-en active"
                                        : "language-en"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <FontAwesomeIcon
                                    style={{ margin: "0 5px" }}
                                    icon={faSearch}
                                />
                                <input
                                    type="text"
                                    placeholder={intl.formatMessage({
                                        id: "banner.placeholder",
                                    })}
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faHospital}
                                            color="green"
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faPhone}
                                            color="green"
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faClipboardList}
                                            color="green"
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faSyringe}
                                            color="green"
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faUserDoctor}
                                            color="green"
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faNotesMedical}
                                            color="green"
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
        onChangeLanguage: (language) => {
            dispatch(changLanguageApp(language));
        },
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Header));
