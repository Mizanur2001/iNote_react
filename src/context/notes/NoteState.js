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
    const funcAddNote = async (notesData, alert) => {
        //api call
        let URL = `${host}/api/notes/addnotes`;
        let title = notesData.title;
        let description = notesData.description;
        let tag = notesData.tag;
        await fetch(URL, {
            method: 'POST',
            headers: {
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmM3ZTRiYjEzMjFlMTdmZWY3YTNhIn0sImlhdCI6MTY0NDI0MjYwMH0.lpqXIRPUgcd7_TlPa8-0fmP3rpimaWRE8LjM6Nk6yWk',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });

        //adding the notes into clint site
        funcGetAllNotes();
        alert({ alerts: 'success !', message: ' Notes added ' });
    }

    //Delete Notes
    const funcDelete = async (id, alert) => {
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
        alert({ alerts: 'success !', message: ' Note Deleted ' });
    }

    //edit note
    const funcEditNote = async (id, title, description, tag, alert) => {
        let URL = `${host}/api/notes/updatenotes/${id}`;
        await fetch(URL, {
            method: 'PUT',
            headers: {
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmM3ZTRiYjEzMjFlMTdmZWY3YTNhIn0sImlhdCI6MTY0NDI0MjYwMH0.lpqXIRPUgcd7_TlPa8-0fmP3rpimaWRE8LjM6Nk6yWk',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });
        alert({ alerts: 'success ! ', message: 'Note Updeded' });
        funcGetAllNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, funcAddNote, funcDelete, funcGetAllNotes, funcEditNote }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState
