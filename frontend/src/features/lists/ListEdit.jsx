import Edit from '../../components/AddElement';
import { useEffect, useRef } from 'react';
import { useUpdateListMutation } from '../../service/listService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListEdit = () => {
    const [updateList, {isSuccess, Error}] = useUpdateListMutation();
    const listEl = useRef('');
    const navigate = useNavigate();

    let {list_id} = useParams();
    list_id = Number(list_id);
    const {search} = useLocation()                 //esempio di quest 3 righe di codice = supponiame che l'URL sia http://example.com/path?list_name=shopping&user_id=123
    const pars = new URLSearchParams(search);      //{search} sarà "?list_name=shopping&user_id=123".                          
    let list_name;                                 //pars.get('list_name') restituirà "shopping".
    if (pars) {                                    //pars.get('user_id') restituirà "123".
        
        list_name = pars.get('list_name') ?? '';  
        
    };

    const manageClick = (e) => {
        e.preventDefault()
       updateList({name: listEl.current.value, id: list_id})
    };

    useEffect(() => {
        if (list_name) {
            listEl.current.value = list_name;
        }
        if (isSuccess) {
            navigate('/lists');
        }
        if (Error) {
            toast.error(Error.message);
        }
        
    }, [isSuccess, Error]);
    return (
        <div className="container">
            <div className='row justify-content-center m-5'>
                <h1 className="text-center mb-3">Edit list</h1>
                <Edit 
                manageClick={manageClick} 
                Ele={listEl} 
                txtButton={'Edit list'} />
            </div>
        </div>
    )
}

export default ListEdit
