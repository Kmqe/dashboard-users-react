import "./EditUser.css";

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// REDUX HOOKS
import { useSelector, useDispatch } from "react-redux";

// UserSlice Action
import {
    setEmail,
    setSubscription,
    setRight,
    setPassword,
    setName,
    setUsername,
} from "../../features/users/usersSlice";

// Import to get URL parameters
import { useParams } from "react-router-dom";

// COMPONENT
import { editUserInfoFunction } from "../../features/users/usersSlice";

// REACT HOOKS
import { useEffect } from "react";
import { notify } from "../toasts/Toast";

const EditUserInfo = () => {
    const dispatch = useDispatch();
    // Get userId from URL
    const { userId } = useParams();
    let { email, password, rights, subscription, username, name } = useSelector(state => state.users.userInfo);
    let users = useSelector(state => state.users.users);

    let user = users.find(user => user.id === userId);
    if (user) {
        sessionStorage.setItem("user_edit_info", JSON.stringify(user));
    }
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user_edit_info"));
        dispatch(setName(user.basicInfo.name))
        dispatch(setEmail(user.basicInfo.email))
        dispatch(setUsername(user.username))
        dispatch(setSubscription(user.pricingPlan))
        dispatch(setPassword(user.password))
        dispatch(setRight(user.rights))
    }, [])

    return (
        <div className='edit-user'>
            <h6>Profile details</h6>

            <form>
                <h1>Edit User</h1>
                <div className="box-input">
                    <label>Name</label>
                    <input value={name} onChange={(e) => dispatch(setName(e.target.value))} />
                </div>
                <div className="box-input">
                    <label>Email</label>
                    <input value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
                </div>
                <div className="box-input">
                    <label>Username</label>
                    <input value={username} onChange={(e) => dispatch(setUsername(e.target.value))} />
                </div>
                <div className="box-input">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} />
                </div>
                <div className="box-input">
                    <label>Subscription</label>
                    <div className="select-container">
                        <div className="arrow-icon">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        <select name="Subscription" id="subscription"
                            onChange={(e) => dispatch(setSubscription(e.target.value))}>
                            <option value={"Basic"} selected={subscription === "Basic" ? true : false}>Basic</option>
                            <option value={"Premium"} selected={subscription === "Premium" ? true : false}>Premium</option>
                            <option value={"Cinematic"} selected={subscription === "Cinematic" ? true : false}>Cinematic</option>
                        </select>
                    </div>
                </div>
                <div className="box-input">
                    <label>Rights</label>
                    <div className="select-container">
                        <div className="arrow-icon">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        <select name="Rights" id="right" onChange={(e) => dispatch(setRight(e.target.value))}>
                            <option value={"user"} selected={rights === "user" ? true : false}>User</option>
                            <option value={"moderator"} selected={rights === "moderator" ? true : false}>Moderator</option>
                            <option value={"admin"} selected={rights === "admin" ? true : false}>Admin</option>
                        </select>
                    </div>
                </div>
                <button className="add-user" onClick={(e) => {
                    e.preventDefault();
                    dispatch(editUserInfoFunction({
                        email,
                        password,
                        name,
                        rights,
                        subscription,
                        username,
                        id: userId,
                    }))
                    notify("editing")
                }}>Save</button>
            </form >
        </div>
    )
}

export default EditUserInfo