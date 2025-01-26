import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  age: "",
  gender: "",
  type: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.type = action.payload.type;
    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.age = "";
      state.gender = "";
      state.type = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
