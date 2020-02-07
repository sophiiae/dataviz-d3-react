import React from 'react';
import Shape from './components/shape'
import BarChartSVG from './components/BarChartCSV'
import CustomAxis from './components/CustomAxis'
import ScatterChart from './components/ScatterChart'
import LineChart from './components/LineChart'

function App() {
  return (
    <div className="App">
      <div className="App-header">Scatter Chart</div>
      {/* <Shape /> */}
      {/* <BarChart /> */}
      {/* <BarChartSVG /> */}
      {/* <CustomAxis /> */}
      {/* <ScatterChart /> */}
      <LineChart />
    </div>
  );
}

export default App;
