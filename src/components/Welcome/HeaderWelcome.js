import React, {Component} from 'react';
import logo from './../../assets/logo.png'

class HeaderWelcome extends Component {

    render() {

        return (

            <section className='header'>
                <h1 className='header__title'>DRV</h1>
                <img src={logo} alt={'driving'} className='header__logo'/>
            </section>
        )
    }
}

export default HeaderWelcome;