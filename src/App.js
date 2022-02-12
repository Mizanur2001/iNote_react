import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Alerts from './components/Alerts'
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react'

function App() {

  const [alerts, setAlerts] = useState(null);
  const funcAlert = (alert) => {
    setAlerts({
      alerts: alert.alerts,
      message: alert.message
    });
  }

  setTimeout(() => {
    setAlerts(null);
  }, 3000);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts alert={alerts} />
          <Routes>
            <Route path='/' element={<Home alert={funcAlert} />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login alert={funcAlert} />} />
            <Route path='/signup' element={<Signup alert={funcAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
