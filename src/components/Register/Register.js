import React, {Component} from 'react';
import HeaderWelcome from "./../Welcome/HeaderWelcome";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";

class Register extends Component {

    render() {

        return (
            <>
                <HeaderWelcome/>

                <section className='register'>
                    <form className='register__form'>
                        <label for='login'>Login</label>
                        <input type='text' name='login' id='login'/>

                        <label for='email'>Email</label>
                        <input type='text' name='email' id='email'/>

                        <label for='password'>Password</label>
                        <input type='password' name='password' id='password'/>

                        <label for='password_confirm'>Password confirmation</label>
                        <input type='password' name='password_confirm' id='password_confirm'/>

                        <div className='register__form__buttons'>

                            <NavLink to='/login'>
                                <button className='buttons__small' type="submit" value="Submit">Login</button>
                            </NavLink>

                            <button className='buttons__small' type="submit" value="Submit">Register</button>

                        </div>

                    </form>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default Register;