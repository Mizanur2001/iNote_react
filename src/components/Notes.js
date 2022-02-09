import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems'

function Notes() {
    const context = useContext(noteContext);
    const { notes, funcGetAllNotes } = context;
    useEffect(() => {
        funcGetAllNotes();
        // eslint-disable-next-lins
    }, []);
    return (
        <div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => { return <NoteItems key={note._id} notes={note} /> })}
            </div>
        </div>
    )
}

export default Notes
