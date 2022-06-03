import React from "react";
import './styles/App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import io from "socket.io-client";

import Community from './components/Community';
import Home from "./components/MainPage";
import Multiplayer from "./components/Multiplayer";
import Layout from "./components/Layout";

const socket = io.connect('/');

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="community" element={<Community />} />
                    <Route path="multiplayer" element={<Multiplayer socket={socket} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
