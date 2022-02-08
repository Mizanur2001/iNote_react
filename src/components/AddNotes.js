import React from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext, useState } from 'react';

function AddNotes() {
    const context = useContext(noteContext);
    const { funcAddNote } = context;
    const [notesdata, setNotesdata] = useState({ title: "", description: "", tag: "Default" });
    const funcSubmitNote = (e) => {
        e.preventDefault();
        funcAddNote(notesdata);
    }
    const funcOnChange = (e) => {
        setNotesdata({ ...notesdata, [e.target.name]: e.target.value });
    }
    return (
        <div className="container">
            <h2 className='my-3'>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Enter Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Your Title length should be more than 3 char" name='title' onChange={funcOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter Description</label>
                    <textarea className="form-control" id="description" name='description' rows="3" onChange={funcOnChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={funcSubmitNote}>Submit</button>
            </form>
        </div>
    )
}

export default AddNotes
