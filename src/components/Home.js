import React, { useContext } from 'react';
import Notes from './Notes';

function Home() {
    return (
        <div className="container my-3">
            <div className="container">
                <h2 className='my-3'>Add Notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Enter Title</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Your Title length should be more than 3 char" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Notes />
        </div>
    )
}

export default Home
