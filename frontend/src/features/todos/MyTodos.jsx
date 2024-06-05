import Todos from "./Todos";
import AddTodo from "../../components/AddElement";
import FilterTodo from "./FilterTodo";
import ErrorBoundary from '../../components/ErrorBoundary';
import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from "../../service/todoService";
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { filterTodo } from "./filterSlice";
import { useLocation, useParams } from 'react-router-dom';


const MyTodos = () => {
 
    const { data: {data = []} = {}, 
        error, 
        isLoading, 
        isFetching, 
        refetch 
    } = useGetTodosQuery();
    const [addTodo, { isLoading: loadingAdd, isSuccess: isAddSuccess, error: addError, isError: isAddError }] = useAddTodoMutation();
    const [removeTodo, { isLoading: loading, isSuccess, error: deleteError, isError }] = useDeleteTodoMutation();
    const [updateTodo, { isLoading: isUpdating, isSuccess: isUpdateSuccess, error: updateError, isError: isUpdateError }] = useUpdateTodoMutation();
    
    const activeFilter = useSelector(state => state.filter);

    let { list_id } = useParams();
    list_id = Number(list_id);
    const { search } = useLocation();
    const pars = new URLSearchParams(search);
    const list_name = pars.get('list_name') ?? '';
    const todoEl = useRef('');
    const dispatch = useDispatch();

    const todos = data.filter((todo) => {
        if (activeFilter === 'ALL') {
            return true
        }
        if (activeFilter === 'COMPLETED') {
            return todo.completed
        }
        return !todo.completed;

    })

    const manageClick = (e) => {
        e.preventDefault();
       addTodo({ 
            name: todoEl.current.value, 
            create_at: new Date().toLocaleDateString(),
            list_id,
            completed: false,
           
        })
      
      }
    
      if (isAddSuccess) {
        todoEl.current.value = '';
      };
      const onFilterTodo = (filter) => {
        dispatch(filterTodo(filter));
    }
    return (
        <>
            
                <div className="row justify-content-center m-5">
                    <div className="col-12 mb-2">
                        <h1 className="text-center">{list_name ? list_name: 'MY TODOS'}</h1>
                    </div>
                    <AddTodo 
                    manageClick={manageClick} 
                    Ele={todoEl} />
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <ErrorBoundary>
                            <Todos 
                            todos={todos} 
                            removeTodo={removeTodo} 
                            updateTodo={updateTodo} />
                        </ErrorBoundary>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-md-7">
                        <FilterTodo 
                        filter={activeFilter} 
                        onFilter={onFilterTodo} />
                    </div>
                </div>
            
        </>
    )
}

export default MyTodos
