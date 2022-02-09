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
    const funcAddNote = async (notesData) => {
        //api call
        let URL = `${host}/api/notes/addnotes`;
        let title = notesData.title;
        let description = notesData.description;
        let tag = notesData.tag;
        const responce = await fetch(URL, {
            method: 'POST',
            headers: {
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmM3ZTRiYjEzMjFlMTdmZWY3YTNhIn0sImlhdCI6MTY0NDI0MjYwMH0.lpqXIRPUgcd7_TlPa8-0fmP3rpimaWRE8LjM6Nk6yWk',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });

        //adding the notes into clint site
        let note = {
            "_id": "61322f119553781a8ca8d0e08",
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Delete Notes
    const funcDelete = async (id) => {
        let URL = `${host}/api/notes/deletenotes/${id}`;
        const responce = await fetch(URL, {
            method: 'DELETE',
            headers: {
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmM3ZTRiYjEzMjFlMTdmZWY3YTNhIn0sImlhdCI6MTY0NDI0MjYwMH0.lpqXIRPUgcd7_TlPa8-0fmP3rpimaWRE8LjM6Nk6yWk',
                'Content-Type': 'application/json'
            }
        });
        responce.json();
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
