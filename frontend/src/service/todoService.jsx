import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TODO_URL } from '../confing';

// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
    reducerPath: 'todos',
    //tagTypes è un array che definisce i tipi di tag che verranno utilizzati per il caching e l'invalidazione. Ogni tag rappresenta una porzione di dati che può essere invalidata o aggiornata quando necessario.
    tagTypes: ['TODOS'], 
    baseQuery: fetchBaseQuery({
        baseUrl: TODO_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;;
           headers.set('Accept', 'application/json');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    endpoints: builder => (
        {
        getTodos: builder.query ({
            query: () => '',  
            //providesTags è una proprietà che si usa all'interno delle definizioni di endpoint query per specificare quali tag sono forniti dai dati restituiti da quel particolare endpoint. Quando un endpoint fornisce un tag, significa che i dati corrispondenti sono memorizzati nella cache sotto quel tag.

            providesTags: ['TODOS'] // = L'intera lista è considerata come un singolo blocco di dati nella cache, Ogni mutazione che invalida il tag ['LIST'] causerà il ricaricamento dell'intera lista, Meno complesso, ma meno efficiente per aggiornamenti parziali, Utile quando la lista è piccola e non cambia frequentemente.
              
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '',
                method: 'POST',
                body: todo,
            }),      
            invalidatesTags: ['TODOS'], 
        }),
        updateTodo: builder.mutation({
                    //per passare l'id possiamo destrutturare list oppure passare list.id nell'url
            query: ({id, ...body}) => ({
                    //list.id
                url: `/${id}`,
                method: 'PUT',
                body, // = Quando utilizzi un'API RESTful per aggiornare una risorsa con il metodo HTTP PUT, il body della richiesta contiene i dati aggiornati che vuoi inviare al server. Questo è essenziale per comunicare al server quali campi della risorsa devono essere aggiornati e con quali valori.
               
            }),  
            //invalidatesTags: ['TODOS']   
            invalidatesTags: (result, error) => {
                if (error || !result || result.data) {
                    return [{type: 'TODOS'}];
                }
                return Array.isArray(result) ? result.data.map((ele) => ({ 
                    type: 'TODOS', 
                    id: ele.id })) : [{ type: 'TODOS' }];
            } // = Ogni elemento nella lista è taggato separatamente con il proprio id, Più complesso, ma offre un controllo più granulare sulla cache, Ideale per liste grandi o molto dinamiche dove gli elementi possono essere aggiunti, modificati o rimossi frequentemente, Permette di ricaricare solo gli elementi che sono stati effettivamente modificati. 
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                
            }),
            //invalidatesTags è una proprietà che si usa all'interno delle definizioni di endpoint mutation per specificare quali tag devono essere invalidati quando la mutazione viene eseguita con successo. L'invalidazione di un tag indica che i dati associati a quel tag nella cache sono obsoleti e devono essere ricaricati.
            invalidatesTags: ['TODOS'] // (result, error, id) => {type: 'LIST', id:id}
/*             Quando richiami useDeleteListMutation e la cancellazione ha successo, RTK Query invalida il tag 'LIST'. Questo indica che i dati delle liste nella cache sono obsoleti e devono essere ricaricati.
            RTK Query quindi automaticamente richiama nuovamente useGetListsQuery per ottenere i dati aggiornati e memorizzarli di nuovo nella cache sotto il tag 'LIST'. */
            //in pratica qaundo cancelliamo una lista refetcha i dati
        })
  }),
})

export const { 
    useGetTodosQuery, 
    useDeleteTodoMutation, 
    useAddTodoMutation, 
    useUpdateTodoMutation 
} = todosApi








//con le THUNCKAPI
/* import { TODO_URL, FILTER_URL } from '../confing';


export const getTodos = async () => {
    return fetch(TODO_URL).then(res => res.json()).then(res => res);
}
export const getFilter = async () => {
    return fetch(FILTER_URL).then(res => res.json()).then(res => res);
}
export const removeTodo = async (todo) => {
    return fetch(TODO_URL + '/' + todo.id, 
        {
            method: 'DELETE'
        }
    ).then(res => res.json()).then(res => res);
}
export const newTodo = async (todo) => {
    return fetch(TODO_URL,
        {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(todo)
        }
    ).then(res => res.json()).then(res => res);
}
export const changeCompleted = async (todo) => {
    
    return fetch(TODO_URL + '/' + todo.id,
        {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(todo)
        }
    ).then(res => res.json()).then(res => res);
} */

