import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  uid: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, uid } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.uid = uid;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.uid = null; 
    },
  },
});
export const selectEmail = (state) => state.auth.email;
export const selectUseName = (state) => state.auth.useName;
export const selectUserID = (state) => state.auth.uid;
export const selectIsLoggediIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
export const { SET_ACTIVE_USER,REMOVE_ACTIVE_USER } = authSlice.actions;
