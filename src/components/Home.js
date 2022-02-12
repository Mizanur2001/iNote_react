import React from 'react';
import Notes from './Notes';
import AddNotes from './AddNotes';

function Home(props) {
    return (
        <div className="container my-3">
            <AddNotes alert={props.alert} />
            <Notes alert={props.alert} />
        </div>
    )
}

export default Home
