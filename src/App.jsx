import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import LudoBoard from './pages/LudoBoard/LudoBoard';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LudoBoard />} />
    </Routes>

  )
}

export default App
