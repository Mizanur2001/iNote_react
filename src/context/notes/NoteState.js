import React, { useState } from 'react';
import NoteContext from './noteContext'

const NoteState = (props) => {
    const s1 = {
        name: "Mizanur Rahaman",
        company: "Virtual World"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                name: "James Lev",
                company: "ArtM"
            })
        }, 2000);
    }
    return (
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
