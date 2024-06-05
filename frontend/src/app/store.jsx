import {configureStore } from '@reduxjs/toolkit';
//import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/todos/filterSlice';
import {listsApi} from '../service/listService';
import {todosApi} from '../service/todoService';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../service/authService';

const store = configureStore ({
    reducer: {
        //todos: todosReducer,
        filter: filterReducer,
        [listsApi.reducerPath]: listsApi.reducer,
        [todosApi.reducerPath]: todosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listsApi.middleware, todosApi.middleware, authApi.middleware),
})
setupListeners(store.dispatch);
export default store;