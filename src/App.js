import React, {Component} from 'react';
import {
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom';
import MainWelcome from "./components/Welcome/MainWelcome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AnimatedSwitch } from 'react-router-transition';
import Home from "./components/Home/Home";
import PrivateRoute from "./components/Session/PrivateRoute"
import { AuthProvider } from "./components/Session/AuthProvider";
import Forum from "./components/Home/Forum/Forum";
import MainTest from "./components/Home/Test/MainTest";
import AllTips from "./components/Home/Tips/AllTips";
import Tags from "./components/Home/Tags/Tags";
import Profile from "./components/Home/Profile/Profile";

class App extends Component {

    render() {
        return (
            <AuthProvider>
            <HashRouter>
                <Switch>
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper"
                    >
                        <Route exact path='/' component={MainWelcome}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <PrivateRoute exact path='/home' component={Home}/>
                        <PrivateRoute exact path='/forum' component={Forum}/>
                        <PrivateRoute exact path='/test/:id' component={MainTest}/>
                        <PrivateRoute path='/tips/:id' component={AllTips} />
                        <PrivateRoute path='/tags/:id' component={Tags} />
                        <PrivateRoute path='/profile' component={Profile} />
                    </AnimatedSwitch>
                </Switch>
            </HashRouter>
            </AuthProvider>
        );
    }
}

export default App;