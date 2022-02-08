import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

function About(props) {
    const value = useContext(noteContext);
    useEffect(() => {
        value.update();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            This is About {value.state.name} and he is owner of {value.state.company} the world largest production company
        </div>
    )
}

export default About