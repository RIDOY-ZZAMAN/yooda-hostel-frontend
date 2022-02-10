import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';



function App() {

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
