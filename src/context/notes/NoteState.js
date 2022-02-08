import React, { useState } from 'react';
import NoteContext from './noteContext'

const NoteState = (props) => {
    const noteInitial =
        [
            {
                "_id": "6200ac31fe74746710bd09cf",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "vgvff",
                "description": "I'''''",
                "tag": "General",
                "date": "2022-02-07T05:20:49.859Z",
                "__v": 0
            },
            {
                "_id": "6200ac6efe74746710bgd09d1",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "This is Admin",
                "description": "this message is sending for testion pur>{",
                "tag": "General",
                "date": "2022-02-07T05:21:50.722Z",
                "__v": 0
            },
            {
                "_id": "6200ac31fe74746710bd09ocf",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "vgvff",
                "description": "I'''''",
                "tag": "General",
                "date": "2022-02-07T05:20:49.859Z",
                "__v": 0
            },
            {
                "_id": "6200ac6efe7474671i0bd09d1",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "This is Admin",
                "description": "this message is sending for testion pur>{",
                "tag": "General",
                "date": "2022-02-07T05:21:50.722Z",
                "__v": 0
            },
            {
                "_id": "6200ac31fe74746710bd09tcf",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "vgvff",
                "description": "I'''''",
                "tag": "General",
                "date": "2022-02-07T05:20:49.859Z",
                "__v": 0
            },
            {
                "_id": "6200ac6efe74746710ubd09d1",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "This is Admin",
                "description": "this message is sending for testion pur>{",
                "tag": "General",
                "date": "2022-02-07T05:21:50.722Z",
                "__v": 0
            },
            {
                "_id": "6200ac31fe7474671d0bd09cf",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "vgvff",
                "description": "I'''''",
                "tag": "General",
                "date": "2022-02-07T05:20:49.859Z",
                "__v": 0
            },
            {
                "_id": "6200ac6efe74746710bd09d1",
                "user": "61ffc7e4bb1321e17fef7a3a",
                "title": "This is Admin",
                "description": "this message is sending for testion pur>{",
                "tag": "General",
                "date": "2022-02-07T05:21:50.722Z",
                "__v": 0
            },
        ];
    const [notes, setNotes] = useState(noteInitial);

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

    return (
        <NoteContext.Provider value={{ notes, funcAddNote }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState
