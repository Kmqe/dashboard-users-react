import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
    }
})

