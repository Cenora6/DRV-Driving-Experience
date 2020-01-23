import React, {Component} from 'react';
import tipPhoto from './../../../assets/weekly-tip.jpg'
import firebase from "../../firebase/firebase";
import errorIcon from "../../../assets/error.png";
import ReactTooltip from "react-tooltip";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import tip1 from './../../../assets/article1.jpg'
import tip2 from './../../../assets/article2.jpg'
import tip3 from './../../../assets/article3.jpg'
import tip4 from './../../../assets/article4.jpg'
import tip5 from './../../../assets/article5.jpg'
import tip6 from './../../../assets/article6.jpg'

class TipsMain extends Component {
    state = {
        question: "",
        questionError: false,
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

        if (question.length > 100) {
            this.setState({
                question: "",
                questionError: false,
            });
            console.log(user, question);
        } else {
            this.setState({
                questionError: true,
            })
        }


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
                                <button className='buttons__small'>Take the test</button>
                            </div>
                            <ul className='tips__week__description__tags'>
                                <li>
                                    <i className="fas fa-tags"></i>
                                </li>
                                <li>safety</li>
                                <li>|</li>
                                <li>braking</li>
                                <li>|</li>
                                <li>technique</li>
                                <li>|</li>
                                <li>engine</li>
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
                        {this.state.questionError &&
                        <>
                            <span data-for='error__email' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                            <ReactTooltip className='error__class' id='error__email' type='error' delayHide={2000} effect='solid'>
                                <span>The question should have at least 100 characters!</span>
                            </ReactTooltip>
                        </>}
                        <span onClick={this.handleSubmit} className='buttons__small'>Send </span>
                    </div>
                    <div className='tips__newest__popular'>
                        <h2>Newest Tips</h2>
                        <Carousel showThumbs={false} infiniteLoop showStatus={false}>
                            <div>
                                <h3>Car and Driver [23]</h3>
                                <img alt="tip1" src={tip1} />
                            </div>
                            <div>
                                <h3>Mobile phones and driving safety [24]</h3>
                                <img alt="tip2" src={tip2} />
                            </div>
                            <div>
                                <h3>Speed limits [25]</h3>
                                <img alt="tip3" src={tip3} />
                            </div>
                        </Carousel>
                    </div>
                    <div className='tips__newest__popular'>
                        <h2>Popular Tips</h2>
                        <Carousel showThumbs={false} infiniteLoop showStatus={false}>
                            <div>
                                <h3>Safety tips for truck drivers [20]</h3>
                                <img alt="tip4" src={tip4} />
                            </div>
                            <div>
                                <h3>Aggressive driving and road rage [04]</h3>
                                <img alt="tip5" src={tip5} />
                            </div>
                            <div>
                                <h3>Winter driving preparedness [11]</h3>
                                <img alt="tip6" src={tip6} />
                            </div>
                        </Carousel>
                    </div>
                </section>
            </>
        )
    }
}

export default TipsMain;