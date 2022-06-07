import React from "react";
import './styles/General.css'
import './resource.js'
import { Routes, Route } from "react-router-dom";

import Community from './components/community/Community';
import Home from "./components/home/Home";
import Multiplayer from "./components/multiplayer/Multiplayer";
import Layout from "./components/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="community" element={<Community />} />
                <Route path="multiplayer" element={<Multiplayer />} />
            </Route>
        </Routes>
    );
}

export default App;
