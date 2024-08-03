import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todos/todoSlice";
import userReducer from "./features/users/userSlice";
import productsSlice from "./features/products/productsSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice,
    users: userReducer,
    products: productsSlice,
  },
});
export default store;
