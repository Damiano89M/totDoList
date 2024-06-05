/* import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getTodos as fetcTodos, 
    getFilter, 
    removeTodo as deleteTodo, 
    newTodo, 
    changeCompleted 
} from '../../service/todoService';
import { filterTodo } from './filterSlice';

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (data = null, {dispatch}) => {
       
        let [todos, activeFilter] = await Promise.all([fetcTodos(), getFilter()]);
        console.log(todos, activeFilter);

        const filter = activeFilter[0];
        dispatch(filterTodo(filter));
        //funzione che filtra quali todo sono completati, da fare, oppure tutti
        todos = todos.filter(todo => {
            if (filter === 'ALL') {
                return true;
            }
            if (filter === 'COMPLETED') {
                return todo.completed;
            }
            return !todo.completed;
        });
        return todos
    },
)
export const removeTodo = createAsyncThunk(
    'todos/removeTodo',
    async (todo, {dispatch}) => {
       
        const res = await deleteTodo(todo);

        return todo;
       
    },
)
export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todo, {dispatch}) => {
       
        return await newTodo(todo);
       
    },
)
export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async (todo, {dispatch}) => {
       
        return await changeCompleted(todo);
       
    },
)
 */