import React from "react";
import './styles/General.css'
import './resource.js'
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Community from './components/community/Community';
import Home from "./components/home/Home";
import Multiplayer from "./components/multiplayer/Multiplayer";
import Layout from "./components/Layout";

const socket = io.connect('/');

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="community" element={<Community />} />
                <Route path="multiplayer" element={<Multiplayer socket={socket} />} />
            </Route>
        </Routes>
    );
}

export default App;
