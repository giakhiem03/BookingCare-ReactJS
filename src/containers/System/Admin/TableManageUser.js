import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    async componentDidMount() {
        await this.props.fetchUserRedux();
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                users: this.props.usersRedux,
            });
        }
    }

    handleDeleteUser = async (user) => {
        if (user) {
            await this.props.deleteUser(user.id);
            this.props.fetchUserRedux();
        }
    };

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    };

    render() {
        let { users } = this.state;
        return (
            <div className="users-container">
                <div className="title text-center">Manage users</div>
                <div className="table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.length > 0 &&
                                users.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.email}</th>
                                        <td>{item.address}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    this.handleEditUser(item)
                                                }
                                                className={
                                                    this.props.action ===
                                                    CRUD_ACTIONS.EDIT
                                                        ? "btn btn-warning me-2"
                                                        : "btn btn-primary me-2"
                                                }
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() =>
                                                    this.handleDeleteUser(item)
                                                }
                                                className="btn btn-danger"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
