import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GitState from './context/gitState';

import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (
    <GitState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/user/:login" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </GitState>
  );
}

export default App;
