import React, { useState } from 'react';
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);

    //Get all Notes
    const funcGetAllNotes = async () => {
        //api call
        let URL = `${host}/api/notes/fetchnotes`;
        const responce = await fetch(URL, {
            method: 'GET',
            headers: {
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmM3ZTRiYjEzMjFlMTdmZWY3YTNhIn0sImlhdCI6MTY0NDI0MjYwMH0.lpqXIRPUgcd7_TlPa8-0fmP3rpimaWRE8LjM6Nk6yWk',
                'Content-Type': 'application/json'
            }
        });
        let jsonData = await responce.json();
        setNotes(jsonData);
    }

    //Add a notes 
    const funcAddNote = (notesData) => {
        const note = {
            "_id": "6200ac6efe74746710bdmi09d1",
            "user": "61ffc7e4bb1321e17fef7a3a",
            "title": notesData.title,
            "description": notesData.description,
            "tag": notesData.tag,
            "date": "2022-02-07T05:21:50.722Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Delete Notes
    const funcDelete = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, funcAddNote, funcDelete, funcGetAllNotes }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState
