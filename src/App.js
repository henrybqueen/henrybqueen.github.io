import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './pages/Home'; // Import your HomePage component
import DragPower from './pages/projects/DragPower'; // Import your ProjectPage component
import Film from './pages/images/Film';

import './App.css';

class App extends React.Component {



  render() {
    return (
      <BrowserRouter>
        <div style={{padding: '20px'}}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path='/project/1' element={<DragPower />} />
            <Route path='/images/film' element={<Film />} />
          </Routes> 
        </div>


    </BrowserRouter>
    );
  }
}

export default App;
