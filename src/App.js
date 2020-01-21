import React, {Component} from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import MainWelcome from "./components/Welcome/MainWelcome";


class App extends Component {

  render() {
    return (
          <HashRouter>
            <Switch>
              <Route exact path='/' component={MainWelcome}/>
            </Switch>
          </HashRouter>
    );
  }
}

export default App;