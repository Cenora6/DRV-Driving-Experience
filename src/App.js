import React, {Component} from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import MainWelcome from "./components/Welcome/MainWelcome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";


class App extends Component {

  render() {
    return (
          <HashRouter>
            <Switch>
              <Route exact path='/' component={MainWelcome}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
            </Switch>
          </HashRouter>
    );
  }
}

export default App;