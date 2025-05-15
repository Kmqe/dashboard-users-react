import "./addUser.css";
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// REDUX HOOKS
import { useSelector, useDispatch } from "react-redux";

// UserSlice Action
import {
    setShowAddUserModal,
    setEmail,
    setSubscription,
    setRight,
    setPassword,
    setName,
    setUsername,
    createUser,
} from "../../features/users/usersSlice";

// Import toast alert for adding
import { notify } from "../toasts/Toast";

const AddUserModal = () => {
    const dispatch = useDispatch();
    // Check if the "Add User" popup should be shown
    const showPopup = useSelector(state => state.users.showAddUserModal); // true Or false
    const lastId = useSelector(state => state.users.lastId)
    let { email, password, rights, subscription, username, name } = useSelector(state => state.users.userInfo);

    function saveUser(e) {
        e.preventDefault();
        // Notify: adding user
        notify("adding");
        dispatch(createUser({ email, password, rights, subscription, username, name, lastId }))
        dispatch(setShowAddUserModal(!showPopup));
    }
    if (setShowAddUserModal) {
        return (
            <>
                <div className="add-user-modal" onClick={() => dispatch(setShowAddUserModal(!showPopup))}>
                    {/* <form>
                    <h1>Add User</h1>
                    <div className="box-input">
                        <label>Email</label>
                        <input value={email} onChange={(e) => dispatch(setEmail(e))} />
                    </div>
                    <div className="box-input">
                        <label>Password</label>
                        <input type="password" />
                    </div>
                    <div className="box-input">
                        <label>Subscription</label>
                        <div className="select-container">
                            <div className="arrow-icon">
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                            <select className="" name="Subscription" id="subscription">
                                <option value={"basic"}>Basic</option>
                                <option value={"premium"}>Premium</option>
                                <option value={"cinematic"}>Cinematic</option>
                            </select>
                        </div>
                    </div>
                    <div className="box-input">
                        <label>Rights</label>
                        <div className="select-container">
                            <div className="arrow-icon">
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                            <select className="" name="Rights" id="right">
                                <option value={"user"}>User</option>
                                <option value={"moderator"}>Moderator</option>
                                <option value={"admin"}>Admin</option>
                            </select>
                        </div>
                    </div>
                    <button className="add-user">ADD</button>
                </form> */}
                </div>
                <form>
                    <h1>Add User</h1>
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
                    <button className="add-user" onClick={(e) => saveUser(e)}>ADD</button>
                </form >
            </>
        )
    }
}

export default AddUserModal