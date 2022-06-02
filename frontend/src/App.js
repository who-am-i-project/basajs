import React, { useState } from "react";
import './styles/App.css'
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import UserSpace from './components/UserSpace'
import LoginPage from './components/LoginPage'

const socket = io.connect('/');

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/login' element={<LoginPage socket={socket} />} />
                <Route path='/game/:username' element={<UserSpace socket={socket} />} />
            </Routes>
        </div>
    );
}

export default App;
