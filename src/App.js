import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'; 
import Shape from './basic/shape';
import BarChart from './charts/BarChart'
import BarChartSVG from './charts/BarChartCSV';
import CustomAxis from './charts/CustomAxis';
import ScatterChart from './charts/ScatterChart';
import LineChart from './charts/LineChart';
import WorldMap from './maps/WorldMap';
import { Breadcrumbs, MenuList, MenuItem } from '@material-ui/core';

function App() {
  return (
    <Router>
      <div className="App">
        <MenuList aria-label="breadcrumb">
          <MenuItem>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/charts">Charts</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/maps">Maps</Link>
          </MenuItem>
        </MenuList>
        <Switch>
          <Route path="/charts">
            <BarChart />
          </Route>
          <Route path="/maps">
            <WorldMap />
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
