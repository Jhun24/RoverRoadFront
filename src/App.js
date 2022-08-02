import './App.css';

import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from './components/index/index';
import Login from './components/login/login';
import Register from './components/register/register';

let App = ()=>{
  return(
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<Index/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;