import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';


const App = () => {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
