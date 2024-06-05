import Lists from "./Lists"
import AddList from "../../components/AddElement";
import { useAddListMutation } from "../../service/listService";
import { useRef } from "react";
const MyList = () => {
  const listEl = useRef();
  const [addList, { isLoading: loadingAdd, isSuccess: isAddSuccess, error: addError, isError: isAddError }] = useAddListMutation();

  const manageClick = (e) => {
    e.preventDefault();
    addList({ name: listEl.current.value, user_id: 1, id: parseInt()  })
  }
  if (isAddSuccess) {
    listEl.current.value = '';
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center m-5">
          <div className="col-12 mb-2">
            <h1>MY LIST</h1>
          </div>
          <AddList manageClick={manageClick} Ele={listEl} txtButton={'Add list'} />
        </div>
        <div className="row justify-content-center ">
          <div className="col-12 col-md-6 text-center">
            <Lists />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyList
