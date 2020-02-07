import React from 'react';
import Shape from './basic/shape'
import BarChartSVG from './charts/BarChartCSV'
import CustomAxis from './charts/CustomAxis'
import ScatterChart from './charts/ScatterChart'
import LineChart from './charts/LineChart'

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
