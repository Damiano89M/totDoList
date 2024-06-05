import List from "./List";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";
import { useGetListsQuery, useDeleteListMutation, } from "../../service/listService";

const Lists = () => {
    const { 
        data: {data: lists = []} = {}, 
        error, 
        isLoading, 
        isFetching, 
        refetch 
    } = useGetListsQuery()
    const [removeList, { isLoading: loading, isSuccess, error: deleteError, isError }] = useDeleteListMutation();
   
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        if (isFetching) {
            toast.info('Loading')
        }
        if (!isFetching) {
            toast.dismiss()
        }

    }, [error, isFetching])

    const handleDelete = async (id) => {
        //si possono usare entrambi i metodi ma con il try catch è meglio
        /*      removeList(id)
             .unwrap()
             .then(() => {
                 refetch();
             }).catch(err => toast.err.message); */

        try {
            await removeList(id).unwrap();
            toast.success('List removed successfully');
            //refetch();
        } catch (err) {
            toast.error('Failed to remove the list');
        }
    }

    return (
        <>
            <div className="">

            </div>
            <ul className="list-group list-group-flush" id='listList'>
                { lists && lists.length > 0 ? (
                    lists.map(list => (
                        <List
                            key={list.id}
                            list={list}
                            onRemoveList={handleDelete}
                        />
                    ))) : <h4 className="text-center">Non ci sono lists</h4>
                }
                
            </ul>
            
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}


export default Lists
