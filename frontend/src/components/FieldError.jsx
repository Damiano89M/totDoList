import React from 'react'

const FieldError = ({errors = []}) => {
    if (!errors.length) {
        return null
    }
    return (
        <div>
            <div className="alert alert-danger">
                {errors.map((error) => (
                    <p>{error}</p>
                ))}
            </div>
        </div>
    )
}

export default FieldError
