import {createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
       filterTodo: (state, action) => {
        return action.payload;
       }
    }
});

export const {filterTodo} =filterSlice.actions;
export const {reducer} = filterSlice;

export default reducer;