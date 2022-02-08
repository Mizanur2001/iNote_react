import React from 'react'

function NoteItems(props) {
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.notes.title}</h5>
                    <p className="card-text">{props.notes.description}</p>
                    <i className="far fa-trash-alt"></i>
                    <i className="far fa-edit mx-3"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItems