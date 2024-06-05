/* import { createSlice } from '@reduxjs/toolkit';
import { getTodos, removeTodo, addTodo, toggleTodo } from './thunksTodo';


const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: { */
        /*   addTodo: (state, action) => {
              state.push(action.payload);
          },
          removeTodo: (state, action) => {
              return state.filter(todo => todo.id !== action.payload.id);
          }, 
          toggleTodo: (state, action) => {
              const todo = state.find(todo => todo.id === action.payload.id);
              if (todo) {
                  todo.completed = !todo.completed;
              }
          }, */

  /*  },
     extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state, action) => {

            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state = state.filter(todo => todo.id !== action.payload.id);
                return state;
            }) */
           /*  .addCase(toggleTodo.fulfilled, (state, action) => {
                //troviamo l'id 
                const idx = state.findIndex(el => el.id === action.payload.id);
                if(idx !== -1) {
                    //state.splice(idx, 1, action.payload);
                    //modifichiamo direttamente state
                    state[idx] = action.payload;
                    
                } */
                //con questo return stiamo ritornando un nuovo array senza modificare direttamente state
/*                 Restituire un nuovo stato: Invece di usare splice o modificare direttamente il state, puoi usare il metodo map per creare un nuovo array.
                    Map: Il metodo map crea un nuovo array iterando su ogni elemento dell'array originale e applicando una funzione a ciascun elemento.  */
                    
                /*  return state.map(todo => 
                     todo.id === action.payload.id ? action.payload : todo
                 ); */
/*             })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.push(action.payload);
                return state;
            })
    },

}); */


/* export const {
   
} = todosSlice.actions; */

/* export const { reducer } = todosSlice;
export { getTodos, removeTodo, addTodo, toggleTodo };
export default reducer;




const initTodos = [
    {
        completed: true,
        name: 'Call my mum',
        dueDate: new Date().toLocaleDateString(),
        user_id: 1,
        id: 1,
    },
    {
        completed: false,
        name: 'Go to school',
        dueDate: new Date().toLocaleDateString(),
        user_id: 1,
        id: 2,
    },
    {
        completed: true,
        name: 'Do my homework',
        dueDate: new Date().toLocaleDateString(),
        user_id: 1,
        id: 3,
    },

]; */