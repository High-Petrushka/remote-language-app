import { BrowserRouter,Route, Routes } from "react-router"
import { useState } from 'react';

import { Home } from "./components/pages/Home"
import { Registration } from './components/pages/Registration.jsx'
import { Login } from './components/pages/Login.jsx'
import { Navbar } from './components/interaction/Navbar.jsx'
import { NavPanel } from './components/interaction/NavPanel.jsx'

import { NavContext } from './Context/NavContext.js'
import { Lessons } from "./components/pages/Lessons.jsx";
import { Authors } from "./components/pages/Authors.jsx";
import { Profile } from "./components/pages/Profile.jsx";
import { NotFound } from "./components/pages/NotFound.jsx";

function App() {

  const [hidden, setHidden] = useState(true);

  return (
    <BrowserRouter>
      <NavContext value={{hidden,setHidden}}>
        <Navbar />
        <NavPanel />
      </NavContext>
      <Routes>
        <Route index element={<Home />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="authors" element={<Authors />} />
        <Route path="profile/:userId/" element={<Profile />} />
        <Route path='registration' element={<Registration />} />
        <Route path='login' element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
