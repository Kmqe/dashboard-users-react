import './App.css';

import Pages from './components/pages/Pages';

function App() {
  // sessionStorage.removeItem("user_edit_info")
  return (
    <>
      <Pages />
    </>
  );
}

export default App;





















// import './App.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
// import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";

// // UserSlice Action
// import { fetchUsers } from './features/users/usersSlice';
// import { setShowAddUserModal } from './features/users/usersSlice';

// // REACT HOOKS
// import { useEffect } from 'react';

// // REDUX HOOKS
// import { useSelector, useDispatch } from 'react-redux';

// // component
// import Table from "./components/table/Table";
// import AddUserModal from './components/userModal/AddUserModal';
// import PopupAction from './components/popupAction/PopupAction';

// function App() {
//   const dispatch = useDispatch();
//   // Array of Users
//   const users = useSelector(state => state.users.users)

//   // get modal visibility state
//   const showAddUserModal = useSelector(state => state.users.showAddUserModal);

//   //  Show the action popup when clicking Lock or Delete
//   const showPopupAction = useSelector(state => state.users.showPopupAction.show);

//   useEffect(() => {
//     dispatch(fetchUsers())
//   }, []);

//   // Toggle the visibility of the "Add User" modal
//   function showAddUserPopup() {
//     dispatch(setShowAddUserModal(!showAddUserModal))
//   }

//   return (
//     <>
//       <div className='App'>
//         {showPopupAction ? <PopupAction /> : ""}

//         {showAddUserModal ? <AddUserModal /> : ""}

//         <div className='main-navigation'>
//           <div className='navigation-container'>
//             <div className='logo'>
//               <h2>HotFlix</h2>
//             </div>
//             <div className='user-navigation'>
//               <div className="user-icon">
//                 <FontAwesomeIcon size='lg' icon={faUserRegular} />
//               </div>
//               <div className='user-info'>
//                 <p>Admin</p>
//                 <h5>John Doe</h5>
//               </div>
//               <div className='logout-user'>
//                 <FontAwesomeIcon icon={faRightFromBracket} />
//               </div>
//             </div>
//             <div className='users'>
//               <div className='menu-item'>
//                 <FontAwesomeIcon icon={faUsers} size='lg' />
//                 <p>USERS</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='work-area'>
//           <div className='users-toolbar'>
//             <div className='users-total'>
//               <h1>Users</h1>
//               <p>{users.length} Total</p>
//             </div>
//             <div className='user-controls'>
//               <button className='add-user' onClick={() => showAddUserPopup()}>ADD USER</button>
//             </div>
//           </div>
//           <div className='users-lits'>
//             <Table users={users} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
