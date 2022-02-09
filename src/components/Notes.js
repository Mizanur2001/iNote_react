import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems'

function Notes() {
    const context = useContext(noteContext);
    const { notes, funcGetAllNotes, funcEditNote } = context;
    useEffect(() => {
        funcGetAllNotes();
        // eslint-disable-next-line
    }, []);

    const [notesData, setNotesData] = useState({ id: '', etitle: "errro", edescription: "error", etag: "Error" });
    const ref = useRef(null);
    const refClose = useRef(null);

    const funcUpdateNote = (currentNote) => {
        ref.current.click();
        setNotesData({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }

    const funcOnChange = (e) => {
        setNotesData({ ...notesData, [e.target.name]: e.target.value });
    }

    const funcSaveCahangeEditNote = () => {
        refClose.current.click();
        funcEditNote(notesData.id, notesData.etitle, notesData.edescription, notesData.etag);
    }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Enter Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' onChange={funcOnChange} value={notesData.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={funcOnChange} value={notesData.etag} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Enter Description</label>
                                    <textarea className="form-control" id="edescription" name='edescription' rows="3" onChange={funcOnChange} value={notesData.edescription} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={funcSaveCahangeEditNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => { return <NoteItems key={note._id} notes={note} funcUpdateNote={funcUpdateNote} /> })}
            </div>
        </div>
    )
}

export default Notes
