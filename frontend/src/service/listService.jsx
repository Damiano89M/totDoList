import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LIST_URL } from '../confing'
// Define a service using a base URL and expected endpoints
export const listsApi = createApi({
    reducerPath: 'lists',
    //tagTypes è un array che definisce i tipi di tag che verranno utilizzati per il caching e l'invalidazione. Ogni tag rappresenta una porzione di dati che può essere invalidata o aggiornata quando necessario.
    tagTypes: ['LISTS'],
    baseQuery: fetchBaseQuery({
        baseUrl: LIST_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            headers.set('Accept', 'application/json');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    endpoints: builder => (
        {
            getLists: builder.query({
                query: () => ({
                    headers: {
                        // Accept: 'application/json' è una buona pratica che garantisce che le risposte del server siano in un formato prevedibile e facile da gestire, migliorando la robustezza e la manutenibilità del codice del client.
                        Accept: 'application/json',
                    }
                }),
                //providesTags è una proprietà che si usa all'interno delle definizioni di endpoint query per specificare quali tag sono forniti dai dati restituiti da quel particolare endpoint. Quando un endpoint fornisce un tag, significa che i dati corrispondenti sono memorizzati nella cache sotto quel tag.

                providesTags: ['LISTS'] // = L'intera lista è considerata come un singolo blocco di dati nella cache, Ogni mutazione che invalida il tag ['LIST'] causerà il ricaricamento dell'intera lista, Meno complesso, ma meno efficiente per aggiornamenti parziali, Utile quando la lista è piccola e non cambia frequentemente.

            }),

            addList: builder.mutation({
                query: (list) => ({
                    url: '',
                    method: 'POST',
                    body: list,
                    headers: {
                        // Accept: 'application/json' è una buona pratica che garantisce che le risposte del server siano in un formato prevedibile e facile da gestire, migliorando la robustezza e la manutenibilità del codice del client.
                        Accept: 'application/json',
                    }
                }),
                invalidatesTags: ['LISTS'],
            }),
            updateList: builder.mutation({
                //per passare l'id possiamo destrutturare list oppure passare list.id nell'url
                query: ({ id, ...body }) => ({
                    //list.id
                    url: `/${id}`,
                    method: 'PUT',
                    body, // = Quando utilizzi un'API RESTful per aggiornare una risorsa con il metodo HTTP PUT, il body della richiesta contiene i dati aggiornati che vuoi inviare al server. Questo è essenziale per comunicare al server quali campi della risorsa devono essere aggiornati e con quali valori.
                    headers: {
                        // Accept: 'application/json' è una buona pratica che garantisce che le risposte del server siano in un formato prevedibile e facile da gestire, migliorando la robustezza e la manutenibilità del codice del client.
                        Accept: 'application/json',
                    }
                }),
                invalidatesTags: (result, error) => {
                    if (error || !result || !result.data) {
                        return [{ type: 'LISTS' }];
                    }
                    return Array.isArray(result) ? result.data.map((ele) => ({ type: 'LISTS', id: ele.id })) : [{ type: 'LISTS' }];
                }// = Ogni elemento nella lista è taggato separatamente con il proprio id, Più complesso, ma offre un controllo più granulare sulla cache, Ideale per liste grandi o molto dinamiche dove gli elementi possono essere aggiunti, modificati o rimossi frequentemente, Permette di ricaricare solo gli elementi che sono stati effettivamente modificati. 
            }),
            deleteList: builder.mutation({
                query: (id) => ({
                    url: `/${id}`,
                    method: 'DELETE',
                    headers: {
                        //Accept: 'application/json' è una buona pratica che garantisce che le risposte del server siano in un formato prevedibile e facile da gestire, migliorando la robustezza e la manutenibilità del codice del client.
                        Accept: 'application/json',
                    }

                }),
                //invalidatesTags è una proprietà che si usa all'interno delle definizioni di endpoint mutation per specificare quali tag devono essere invalidati quando la mutazione viene eseguita con successo. L'invalidazione di un tag indica che i dati associati a quel tag nella cache sono obsoleti e devono essere ricaricati.
                invalidatesTags: ['LISTS'] // (result, error, id) => {type: 'LIST', id:id}
                /*             Quando richiami useDeleteListMutation e la cancellazione ha successo, RTK Query invalida il tag 'LIST'. Questo indica che i dati delle liste nella cache sono obsoleti e devono essere ricaricati.
                            RTK Query quindi automaticamente richiama nuovamente useGetListsQuery per ottenere i dati aggiornati e memorizzarli di nuovo nella cache sotto il tag 'LIST'. */
                //in pratica qaundo cancelliamo una lista refetcha i dati
            })
        }),
})

export const {
    useGetListsQuery,
    useDeleteListMutation,
    useAddListMutation,
    useUpdateListMutation
} = listsApi