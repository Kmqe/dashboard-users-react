import "./popupAction.css"
// UserSlice Action
import {
    setShowPopupAction,
    setUsersArray,
    deleteUser,
    updateStates
} from "../../features/users/usersSlice";

// REDUX HOOKS
import { useSelector, useDispatch } from "react-redux";

// Import toast alert for deleting
import { notify } from "../toasts/Toast";

const PopupAction = () => {
    const dispatch = useDispatch();
    // Get the type of action ("delete" OR "lock") for the confirmation popup
    const typeAction = useSelector(state => state.users.showPopupAction.type);
    // Get necessary values from the Redux store: 
    // - the users list, 
    // - the ID of the user selected for delete or lock action,
    // - and the popup action state
    const users = useSelector(state => state.users.users)
    const id = useSelector(state => state.users.userIdHandle);
    const showPopupAction = useSelector(state => state.users.showPopupAction);

    function handleDeleteUser() {
        // Delete the user from the "database" (simulated by JSON)
        dispatch(deleteUser(id))
        // Close the confirmation popup and reset the popup type
        dispatch(setShowPopupAction({ show: !showPopupAction.show, type: "" }))
        // Notify: deleting user
        notify("deleting")
    }

    function handleChangeState() {
        // Iterate through the users array and find the user with the matching ID
        const newUsers = users.map(user => {
            if (user.id === id) {
                // Toggle the status between "Approved" and "Banned"
                const states = user.status === "Approved" ? "Banned" : "Approved";
                // Update the user's status in the "database" (simulated by JSON)
                dispatch(updateStates({ id: id, states: states }));
                // Return the updated user object with the new status
                return {
                    ...user,
                    status: states,
                }
            } else {
                return user;
            }
        })
        // Update the users array in the Redux store
        dispatch(setUsersArray(newUsers))
        // Close the confirmation popup and reset the popup type
        dispatch(setShowPopupAction({ show: !showPopupAction.show, type: "" }))
    }

    if (typeAction === "delete") {
        return (
            <div className='popup-action'>
                <div className='overlay'></div>
                <div className="popup">
                    <h2>User delete</h2>
                    <p>Are you sure to permanently delete this user?</p>
                    <div>
                        <button className="delete" onClick={() => handleDeleteUser()}>DELETE</button>
                        <button onClick={() => dispatch(setShowPopupAction({ show: !showPopupAction, type: "" }))}>DISMISS</button>
                    </div>
                </div>
            </div>
        )
    } else if (typeAction === "change_state") {
        return (
            <div className='popup-action'>
                <div className='overlay'></div>
                <div className="popup">
                    <h2>Status change</h2>
                    <p>Are you sure about immediately change status?</p>
                    <div>
                        <button className="delete" onClick={() => handleChangeState()}>Apply</button>
                        <button onClick={() => dispatch(setShowPopupAction({ show: !showPopupAction, type: "" }))}>DISMISS</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PopupAction