import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import HomePage from './HomePage'; // Import your HomePage component
import Couple from './projects/drag_power/components/Couple'; // Import your ProjectPage component

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path='/project/1' element={<Couple />} />
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
