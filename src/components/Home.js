import React from 'react';
import Notes from './Notes';
import AddNotes from './AddNotes';

function Home() {
    return (
        <div className="container my-3">
            <AddNotes/>
            <Notes />
        </div>
    )
}

export default Home
