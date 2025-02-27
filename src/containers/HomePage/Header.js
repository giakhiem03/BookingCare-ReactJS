import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
    render() {
        return (
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
                                <b>Chuyên khoa</b>
                                <div className="sub-title">
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>Cơ sở y tế</b>
                                <div className="sub-title">
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>Bác sĩ</b>
                                <div className="sub-title">
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>Gói khám</b>
                                <div className="sub-title">
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                            Hỗ trợ
                        </div>
                        <div className="flag"> VN</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
