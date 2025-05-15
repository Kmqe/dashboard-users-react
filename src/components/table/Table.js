import "./table.css"
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
    faUser as faUserRegular,
    faPenToSquare as faPenToSquareRegular,
    faTrashCan as faTrashCanRegular,
} from "@fortawesome/free-regular-svg-icons";

// UserSlice Action
import { setUserIdHandle, setShowPopupAction } from "../../features/users/usersSlice";

// REDUX HOOKS
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Table column headers configuration
const headers = [
    {
        id: 1,
        Label: "ID",
    },
    {
        id: 2,
        Label: "BASIC INFO",
    },
    {
        id: 3,
        Label: "USERNAME",
    },
    {
        id: 4,
        Label: "PRICING PLAN",
    },
    {
        id: 5,
        Label: "COMMENTS",
    },
    {
        id: 6,
        Label: "REVIEWS",
    },
    {
        id: 7,
        Label: "STATUS",
    },
    {
        id: 8,
        Label: "CREATED DATE",
    },
    {
        id: 9,
        Label: "ACTIONS",
    },
]

const Table = ({ users }) => {
    const showPopupAction = useSelector(state => state.users.showPopupAction.show)
    const dispatch = useDispatch();

    function handleAction(id, type_action) {
        dispatch(setShowPopupAction({ show: !showPopupAction, type: type_action }))
        dispatch(setUserIdHandle(id))
    }

    // function editUser() {
    //     return <>
    //         < Link to="/edit-user" />
    //     </>
    // }

    return (
        <table >
            <thead>
                <tr>
                    {
                        headers.map(header => {
                            return <th key={header.id}>
                                {header.Label}
                            </th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td className="user-info">
                                    <div className='user-icon'>
                                        <FontAwesomeIcon icon={faUserRegular} size='lg' />
                                    </div>
                                    <div className="user-data">
                                        <p className='user-info-name'>
                                            {user.basicInfo.name}
                                        </p>
                                        <p>
                                            {user.basicInfo.email}
                                        </p>
                                    </div>
                                </td>
                                <td>{user.username}</td>
                                <td>
                                    {user.pricingPlan}</td>
                                <td>{user.comments}</td>
                                <td>{user.reviews}</td>
                                <td style={{ color: user.status === "Approved" ? "#29b474" : "#eb5757" }}>{user.status}</td>
                                <td>{user.createdDate}</td>
                                <td>
                                    <div className='action-user'>
                                        <div className='icon-container lock' onClick={() => handleAction(user.id, "change_state")}>
                                            <FontAwesomeIcon icon={faLock} />
                                        </div>
                                        <Link to={`/edit-user/${user.id}`}>
                                            <div className='icon-container edit' onClick={() => { }}>
                                                <FontAwesomeIcon icon={faPenToSquareRegular} />
                                            </div>
                                        </Link>

                                        <div className='icon-container delete' onClick={() => handleAction(user.id, "delete")}>
                                            <FontAwesomeIcon icon={faTrashCanRegular} />
                                        </div>
                                    </div>
                                </td>
                            </tr>)
                    })
                }
            </tbody>
        </table >
    )
}


export default Table;