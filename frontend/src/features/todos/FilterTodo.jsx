
const FilterTodo = ({onFilter, filter}) => {
    let btnClassAll = 'btn btn-outline-success w-100';
    let btnClassTodo = 'btn btn-outline-success w-100';
    let btnClassCompleted = 'btn btn-outline-success w-100';

    switch (filter) {
        case 'ALL':
            btnClassAll = btnClassAll.replace('btn-outline-success', 'btn-outline-info');
            break;
        case 'TODO':
            btnClassTodo = btnClassTodo.replace('btn-outline-success', 'btn-outline-info');
            break;
        case 'COMPLETED':
            btnClassCompleted = btnClassCompleted.replace('btn-outline-success', 'btn-outline-info');
            break;
    
        default:
            break;
    }
    return (
        <div className="row">
            <div className="col-sm-4">
                <button 
                disabled={filter === 'ALL'} 
                onClick={() => onFilter('ALL')} 
                className={btnClassAll}>ALL</button>
            </div>
            <div className="col-sm-4">
                <button 
                disabled={filter === 'TODO'} 
                onClick={() => onFilter('TODO')} 
                className={btnClassTodo}>TO DO</button>
            </div>
            <div className="col-sm-4">
                <button 
                disabled={filter === 'COMPLETED'} 
                onClick={() => onFilter('COMPLETED')} 
                className={btnClassCompleted}>COMPLETED</button>
            </div>
        </div>
    )
}

export default FilterTodo
