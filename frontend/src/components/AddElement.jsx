
const AddElement = ({Ele, manageClick, txtButton}) => {
    return (
        <>
            <form onSubmit={manageClick} className="col-12 col-md-6">
                <div className="d-flex w-100">
                    <input 
                        ref={Ele} 
                        type="text" 
                        name="ele" 
                        id="ele" 
                        className="w-100 rounded-3" 
                    />
                    <button
                        type="submit"
                        className="btn btn-success" style={{ width: '150px' }}>
                            {txtButton ?? 'Add todo'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddElement
