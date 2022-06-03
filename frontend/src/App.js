import React from "react";
import './styles/App.css'
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import LoginPage from './components/Multiplayer';
import MainPage from "./components/MainPage";

const socket = io.connect('/');

function App() {
    return (
        <div className="App"> 
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/multiplayer' element={<LoginPage socket={socket} />} />
            </Routes>
        </div>
    );
}

export default App;
