import React from 'react';
import './App.css'
import Shape from './shape'
import BarChart from './BarChart';

function App() {
  const state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: 'root'
  }

  return (
    <div className="App">
      <BarChart data={state.data} width={state.width} height={state.height} />
      <Shape />
    </div>
  );
}

export default App;
