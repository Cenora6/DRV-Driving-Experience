import React, {Component} from 'react';
import Header from "./../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";

class SingleAsk extends Component {

    render() {

        return (
            <>
                <Header/>
                <section className='forum'>
                    <div className='forum__asks'>
                        <h2>Asks</h2>
                        <div className='forum__asks__single animation'>
                            <h3>Tristique senectus et netus [07]</h3>
                            <div className='forum__asks__single__desc'>
                                <span className='username'>Asked by <span>Username 3</span> </span>
                                <p>Duis tempus diam neque, eget vestibulum nisi feugiat et. Interdum
                                et malesuada fames ac ante ipsum primis in faucibus. Nunc at augue justo. Sed pretium
                                ante ac risus euismod, at ultrices purus congue. Ut vel neque id leo mollis vehicula.
                                Duis et neque orci. Proin sit amet libero in elit tincidunt tristique?`
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default SingleAsk;