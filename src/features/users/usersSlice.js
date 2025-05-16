import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("usersSlice/fetchUsers", async () => {
    const response = await fetch("http://localhost:3000/users");
    return response.json();
})

export const createUser = createAsyncThunk("usersSlice/postUsers", async (user) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    const response = await fetch("http://localhost:3000/users", {
        method: "post",
        body: JSON.stringify({
            id: "" + (1 + Number(user.lastId)),
            basicInfo: {
                name: user.name,
                email: user.email
            },
            username: user.username,
            pricingPlan: user.subscription,
            comments: 0,
            reviews: 0,
            password: user.password,
            rights: user.rights,
            status: "Approved",
            createdDate: currentDate,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.json();
})

export const deleteUser = createAsyncThunk("userSlice/deleteUser", async (id) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json();
})

export const updateStates = createAsyncThunk("userSlice/updateState", async (userInfo) => {
    const response = await fetch(`http://localhost:3000/users/${userInfo.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status: userInfo.states,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    const data = await response.json();
    return data;
})

export const editUserInfoFunction = createAsyncThunk("userSlice/editUserInfo", async (userInfo) => {
    const response = await fetch(`http://localhost:3000/users/${userInfo.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            basicInfo: {
                name: userInfo.name,
                email: userInfo.email,
            },
            username: userInfo.username,
            password: userInfo.password,
            pricingPlan: userInfo.subscription,
            rights: userInfo.rights,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    return await response.json();
})

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        userIdHandle: 0,
        isLoading: false,
        error: null,
        showAddUserModal: false,
        showPopupAction: {
            show: false,
            type: ""
        },
        userInfo: {
            name: "",
            email: "",
            username: "",
            password: "",
            subscription: "basic",
            rights: "",
        },
        lastId: 0,
    },

    reducers: {
        setUsersArray: (state, action) => {
            state.users = action.payload;
            if (action.payload.length > 0) {
                state.users = action.payload;
                state.lastId = action.payload[action.payload.length - 1].id;
            }
        },
        setUserIdHandle: (state, action) => {
            state.userIdHandle = action.payload;
        },
        setShowAddUserModal: (state, action) => {
            state.showAddUserModal = action.payload;
        },
        setShowPopupAction: (state, action) => {
            state.showPopupAction = {
                show: action.payload.show,
                type: action.payload.type,
            };
        },
        setName: (state, action) => {
            state.userInfo.name = action.payload;
        },
        setEmail: (state, action) => {
            state.userInfo.email = action.payload;
        },
        setUsername: (state, action) => {
            state.userInfo.username = action.payload;
        },
        setPassword: (state, action) => {
            state.userInfo.password = action.payload;
        },
        setSubscription: (state, action) => {
            state.userInfo.subscription = action.payload;
        },
        setRight: (state, action) => {
            state.userInfo.rights = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            // ============ FETCH USERS ============ \\
            .addCase(fetchUsers.fulfilled, (state, action) => {
                if (action.payload.length > 0) {
                    state.users = action.payload;
                    state.lastId = action.payload[action.payload.length - 1].id;
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                console.log(action.error)
            })
            // ============ CREATE USER ============ \\
            .addCase(createUser.fulfilled, (state, action) => {
                state.users = [...state.users, action.payload]
                state.lastId = action.payload.id;
                state.userInfo.email = "";
                state.userInfo.name = "";
                state.userInfo.username = "";
                state.userInfo.password = "";
                state.userInfo.subscription = "basic";
                state.userInfo.rights = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.error.message;
                console.log(state.error)
            })
            // ============ DELETE USER ============ \\
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => {
                    return user.id === action.payload.id ? "" : user;
                })
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message;
                console.log(state.error)
            })
            // ============ UPDATE USER'S STATES ============ \\
            .addCase(updateStates.fulfilled, (state, action) => {
            })
            .addCase(updateStates.rejected, (state, action) => {
                state.error = action.error.message;
                console.log(state.error)
            })
            // ============ EDIT USER INFORMATION ============ \\
            .addCase(editUserInfoFunction.fulfilled, (state, action) => {
                state.users = state.users.map(user => {
                    if (user.id == action.payload.id) {
                        return action.payload;
                    }
                    return user;
                })
            })
            .addCase(editUserInfoFunction.rejected, (state, action) => {
                // console.log(action.error.message)
            })
    }
})

export const {
    setUsersArray,
    setUserIdHandle,
    setUserStates,
    setShowAddUserModal,
    setShowPopupAction,
    setEmail,
    setPassword,
    setSubscription,
    setRight,
    setName,
    setUsername,
} = usersSlice.actions;
export default usersSlice.reducer;