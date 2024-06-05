import { FaRegPenToSquare } from "react-icons/fa6";
import { GrTrash } from "react-icons/gr";
import { Link, NavLink } from 'react-router-dom';

const List = ({ list, onRemoveList }) => {

    return (

        <>
            <div className="container">
                <li className="row">
                    <div className="col-12 col-sm-9 text-start">
                        <NavLink
                            to={
                                `/lists/${list.id}/todos?list_name=`
                                + encodeURIComponent(list.name)
                            }>
                            {list.name}
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-3 d-flex">
                        <Link
                            to={`/lists/${list.id}/edit?list_name=`
                                + encodeURIComponent(list.name)} className="btn btn-warning ms-3"><FaRegPenToSquare />
                        </Link>
                        <button onClick={() => onRemoveList(list.id)} className="btn btn-danger ms-2"><GrTrash /></button>
                    </div>

                </li>
            </div>
            <hr />
        </>

    )
}

export default List
