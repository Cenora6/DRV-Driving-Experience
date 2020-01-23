import React, {Component} from 'react';
import tipPhoto from './../../../assets/weekly-tip.jpg'
import firebase from "../../firebase/firebase";

class TipsMain extends Component {
    state = {
        question: "",
    };

    handleChange = (e) => {
        this.setState({
            question: e.target.value,
        })
    };

    handleSubmit = (e) => {

        const user = firebase.auth().currentUser.displayName;
        e.preventDefault();
        const { question } = this.state;

        console.log(user, question);
        this.setState({
            question: "",
        })
    };

    render() {

        return (
            <>
                <section className='tips'>
                    <div className='tips__week'>
                        <div className='tips__week__title'>
                            <h2>Weekly Tip</h2>
                            <span>Tuesday, 5 May 2019</span>
                        </div>
                        <div className='tips__week__description'>
                            <h3>Safe engine braking [54]</h3>
                            <img src={tipPhoto} alt='weekly-tip'/>
                            <p>
                                Ut sollicitudin velit sit amet porta facilisis. Pellentesque sit amet dictum neque,
                                sed consequat justo. Fusce volutpat libero eu tellus accumsan, nec iaculis lorem placerat.
                                Maecenas lectus ex, eleifend ut congue in, porttitor quis lectus. Morbi vehicula volutpat
                                elementum. Mauris dictum finibus orci vel dignissim. Cras condimentum justo vel ipsum
                                mollis molestie. Nunc in iaculis ipsum. Aliquam placerat imperdiet risus ac ullamcorper
                                . Pellentesque ac vestibulum nulla. Praesent dolor ipsum, ultricies consequat rhoncus
                                quis, feugiat a lorem. Vivamus vehicula ipsum quis erat bibendum varius. Mauris
                                ullamcorper, tortor a sollicitudin condimentum, augue tortor tempor sapien, non
                                euismod turpis libero vitae magna. Pellentesque pharetra augue ut mi porttitor,
                                quis interdum nunc rutrum.
                            </p>
                            <div className='tips__week__description__button'>
                                <button className='buttons__small'>Zalicz trening</button>
                            </div>
                            <ul className='tips__week__description__tags'>
                                <li>
                                    <i className="fas fa-tags"></i>
                                </li>
                                <li>bezpieczeństwo</li>
                                <li>|</li>
                                <li>hamowanie</li>
                                <li>|</li>
                                <li>technika</li>
                                <li>|</li>
                                <li>żywotność</li>
                                <li>|</li>
                            </ul>
                            <div className='tips__week__description__sharing'>
                                <div className='tips__week__description__sharing__likes'>
                                    <i className="fas fa-thumbs-up"></i>
                                    <span>127</span>
                                </div>
                                <div className='tips__week__description__sharing__share'>
                                    <i className="fas fa-share-alt"></i>
                                    <span>12</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className='tips__questions'>
                        <span>Ask question</span>
                        <textarea value={this.state.question} onChange={this.handleChange}></textarea>
                    </form>
                    <div className='tips__button'>
                        <span onClick={this.handleSubmit} className='buttons__small'>Send</span>
                    </div>
                    <div className='tips__newest'>

                    </div>
                </section>
            </>
        )
    }
}

export default TipsMain;