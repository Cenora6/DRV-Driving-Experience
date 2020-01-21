import React, {Component} from 'react';
import cars from './../../assets/car_background.jpg'
import {NavLink} from "react-router-dom";

class WelcomeText extends Component {

    render() {

        return (
            <>
                <section className='welcome'>
                    <div className='welcome__title'>
                        <h2 className='welcome__title__text'>Driving Experience</h2>
                    </div>
                    <p className='welcome__description'>
                        We present to you a <br/> <span className='welcome__description__important'>
                        Driving Experience </span> <br/> an App, where you can find a lot of informations about driving.
                        Taking the tests will help you remember all the important informations.
                    </p>

                    <img src={cars} alt='cars' className='welcome__image'/>

                    <span className='welcome__check'>
                        Curious? Log in and check by yourself!
                    </span>

                    <div className='welcome__buttons'>
                        <NavLink to='/login'>
                            <button className='welcome_buttons__login buttons'>Login</button>
                        </NavLink>
                        <NavLink to='/register'>
                            <button className='welcome_buttons__register buttons'>Register</button>
                        </NavLink>

                    </div>

                </section>
            </>
        )
    }
}

export default WelcomeText;