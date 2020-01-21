import React, {Component} from 'react';
import HeaderWelcome from "./../Welcome/HeaderWelcome";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";

class Login extends Component {

    render() {

        return (
            <>
                <HeaderWelcome/>

                <section className='login'>
                    <form className='login__form'>
                        <label for='email'>Email</label>
                        <input type='text' name='email' id='email'/>

                        <label for='password'>Password</label>
                        <input type='password' name='password' id='password'/>

                        <div className='login__form__buttons'>

                            <NavLink to='/register'>
                                <button className='buttons__small' type="submit" value="Submit">Register</button>
                            </NavLink>

                            <button className='buttons__small' type="submit" value="Submit">Login</button>

                        </div>

                    </form>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default Login;