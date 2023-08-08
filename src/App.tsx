import React from 'react';
import logo from './logo.svg';
import './App.css';
import OX,{State as OXState} from './board/OX';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Board from './board';

function App() {
  
  return (
    
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
