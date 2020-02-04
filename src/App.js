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
import AdminRoute from "./components/Session/AdminRoute"
import { AuthProvider } from "./components/Session/AuthProvider";
import Forum from "./components/Home/Forum/Forum";
import MainTest from "./components/Home/Test/MainTest";
import AllTips from "./components/Home/Tips/AllTips";
import Tags from "./components/Home/Tags/Tags";
import Profile from "./components/Home/Profile/Profile";
import AdminQuestions from "./components/Admin/AdminQuestions";
import UsersAdmin from "./components/Admin/UsersAdmin";
import TipsAdmin from "./components/Admin/TipsAdmin";
import AsksAdmin from "./components/Admin/AsksAdmin";
import SingleAsk from "./components/Admin/SingleAsk";
import SingleTip from "./components/Admin/SingleTip";
import AdminAdd from "./components/Admin/AdminAdd";
import SingleQuestion from "./components/Admin/SingleQuestion";

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

                        <AdminRoute path='/admin-test' component={AdminQuestions} />
                        <AdminRoute path='/admintest/:id' component={SingleQuestion} />
                        <AdminRoute path='/admin-users' component={UsersAdmin} />
                        <AdminRoute path='/admin-asks' component={AsksAdmin} />
                        <AdminRoute path='/asks/:id' component={SingleAsk} />
                        <AdminRoute path='/admin-tips' component={TipsAdmin} />
                        <AdminRoute path='/admintips/:id' component={SingleTip} />
                        <AdminRoute path='/add' component={AdminAdd} />
                    </AnimatedSwitch>
                </Switch>
            </HashRouter>
            </AuthProvider>
        );
    }
}

export default App;