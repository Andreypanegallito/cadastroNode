import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './assets/img/logo.svg';
import './assets/styles/App.css';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Initial from './pages/initial';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </Router>
    // <div className="App">
    //   <Login />
    //   {/* <Cadastro /> */}
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
