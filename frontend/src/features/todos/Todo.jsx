import {CiSquareCheck} from "react-icons/ci";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { GrTrash } from "react-icons/gr";
//import propsType from 'prop-types';

const Todo = ({ todo, onRemoveTodo, onToggleTodo }) => {
    const completedIcon = todo.completed ? <CiSquareCheck /> : <MdCheckBoxOutlineBlank />
    
    return (
        <>
            <li className="list-group-item text-center d-flex justify-content-between ">
                <button onClick={onToggleTodo} type="button" className="btn">{completedIcon}</button>
                {todo.name}
                <button className="btn btn-danger ms-3" onClick={onRemoveTodo}><GrTrash /></button>
            </li>
        </>
    )
}
/* todo.propsType = {
    todo: propsType.shape({
        completed: propsType.bool,
        dueDate: propsType.string,
        user_id: propsType.number,
        name: propsType.string,
    }),
    onRemoveTodo: propsType.func.isRequired,
    onToggleTodo: propsType.func.isRequired,
} */


export default Todo
