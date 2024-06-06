import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null
};
//recupera i dati dell'utente dal localStorage
const todoData = localStorage.getItem('todolist-data');
if (todoData) {
    //i dati recuperati dal localStorage sono di tipi stringa quindi bisogna convertirli in oggetto
    const data = JSON.parse(todoData);

    if (data && data.access_token) {
        //il token JWT è composto da 3 parti (header, payload, signature) separate da punti. La parte payload contiene le info di scadenza (exp). atob è una funzione che decodifica una stringa codificata in base64. La data di scadenza (expData) viene quindi calcolata convertendo il timestamp in millisecondi.
        const tokenInfo = JSON.parse(atob(data.access_token.split('.')[1]));
        const expData = new Date(tokenInfo.exp * 1000);
        console.log('exp data', expData);
        if (expData < (new Date())) {
            //Call refresh token
            //Delete token
            localStorage.removeItem('todolist-data');
        } else {
            initialState = {
                name: data.name,
                email: data.email
            }
        }
    }
}
export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //uso di draft = Puoi modificare draft direttamente, e Immer si occupa di restituire una nuova versione dello stato senza mutare l'originale.
        userLoggedin(draft, action) {
            const data = action.payload;
            if (data && data.name) {
                //salva i dati dell'utente nel localStorage del browser. JSON.stringify è un metodo che converte un oggetto JavaScript in una stringa JSON.
                localStorage.setItem('todolist-data', JSON.stringify(data));
                draft.user = {name: data.name, email: data.email }
            } else {
                draft.user = null;
            }
        },
        //uso di state = Quando aggiorni state, devi sempre restituire un nuovo oggetto che rappresenta il nuovo stato. Non puoi modificare state direttamente.
        userRegister(state, action) {
            const data = action.payload;
            if (data && data.name) {
                //salva i dati dell'utente nel localStorage del browser. JSON.stringify è un metodo che converte un oggetto JavaScript in una stringa JSON.
                localStorage.setItem('todolist-data', JSON.stringify(data));
                state.user = { name: data.name, email: data.email };
            } else {
                return null;
            }
        },
        logoutUser(draft) {
            localStorage.removeItem('todolist-data');
           
            draft.user = null;
        }
    }
})

export const { userLoggedin, logoutUser, userRegister } = userSlice.actions;
export default userSlice.reducer;