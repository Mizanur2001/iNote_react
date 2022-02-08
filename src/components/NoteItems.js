import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItems(props) {
    const context = useContext(noteContext);
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.notes.title}</h5>
                    <p className="card-text">{props.notes.description}</p>
                    <i className="far fa-trash-alt" onClick={() => { context.funcDelete(props.notes._id) }} />
                    <i className="far fa-edit mx-3" />
                </div>
            </div>
        </div>
    )
}

export default NoteItems