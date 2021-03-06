import React from 'react';
import { 
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'; 
import Shape from './basic/shape';
import BarChart from './charts/BarChart'
import BarChartSVG from './charts/BarChartCSV';
import CustomAxis from './charts/CustomAxis';
import ScatterChart from './charts/ScatterChart';
import LineChart from './charts/LineChart';
import WorldMap from './maps/WorldMap';
import ChoroplethMap from './maps/choroplethMap/ChoroplethMap'
import CirclesOnMap from './maps/circlesOnMap/circlesOnMap'
import Demo from './rsm/Demo'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="topnav">
          <Link to="/charts">Charts</Link>
          <Link to="/maps">Maps</Link>
          <Link to="/rsm">RSM</Link>
        </div>
        <Switch>
          <Route path="/charts">
            <BarChart />
          </Route>
          <Route path="/maps">
            {/* <WorldMap /> */}
            {/* <ChoroplethMap /> */}
            <div className="buttons">
              <button data-zoom="+1">Zoom in</button>
              <button data-zoom="-1">Zoom out</button>
            </div>
            <CirclesOnMap />
          </Route>
          <Route path="/rsm">
            <Demo />
          </Route>
        </Switch>
        {/* <Shape /> */}
        {/* <BarChartSVG /> */}
        {/* <CustomAxis /> */}
        {/* <ScatterChart /> */}
        {/* <LineChart /> */}
        
      </div>
    </Router>
  );
}

export default App;
