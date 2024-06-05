import { useCallback } from "react";
import Todo from "./Todo";
import { useDispatch } from "react-redux";

const Todos = ({todos, removeTodo, updateTodo }) => {

    const dispatch = useDispatch();
    const onRemove = (todo) => {
        removeTodo(todo.id)
    }
    const onToggle = useCallback ( async (todo) => {
       const newTodo = {...todo, completed: !todo.completed};
       try {
        const res = await updateTodo(newTodo).unwrap();
        console.log('res', res);
       } catch (error) {
        console.log(error);
       }
       
    }, [dispatch]);

    return (
        <>
            <ul className="list-group list-group-flush" id='todoList'>
                {todos && todos.length > 0 ?  (
                    todos.map(todo => (
                      <Todo 
                      key={todo.id} 
                      todo={todo} 
                      onRemoveTodo={() => onRemove(todo)} 
                      onToggleTodo={() => onToggle(todo)}
                      />
                    ))) :( <h4 className="text-center">Non ci sono todos</h4>)
                }
            </ul>
        </>
    )
}

export default Todos
