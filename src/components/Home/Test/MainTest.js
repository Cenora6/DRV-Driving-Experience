import React, {Component} from 'react';
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import tip1 from './../../../assets/article1.jpg'
import tip2 from './../../../assets/article2.jpg'
import tip3 from './../../../assets/article3.jpg'
import ResultTest from "./ResultTest";

class QuestionsTest extends Component {
    state = {
        result: false
    };

    handleQuiz = () => {
        this.setState({
            result: true,
        })
    };

    render() {
        return (
            <>
                <Header/>
                <section className='test'>
                    {this.state.result && <ResultTest/>}
                    <div className='test__title'>
                        <h2>Training</h2>
                    </div>
                    <h3>Safe engine braking [54]</h3>
                    <p className='test__instructions'>Answer the following questions. In every question there is only one possible answer</p>
                    <div className='test__questions'>
                        <div className='test__questions__single'>
                            <h4>1. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas?</h4>
                            <ul className='test__questions__single__text'>
                                <li className='radio'>
                                    <input type='radio' id='1A' name='question1'/>
                                    <label htmlFor='1A'><span>A.</span>Aliquam augue nunc, sagittis non sagittis sit amet, mollis eget augue.
                                        Vivamus quis elementum metus.</label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='1B' name='question1'/>
                                    <div className="check"></div>
                                    <label htmlFor='1B'><span>B.</span>Phasellus nec finibus nisi. Duis et ullamcorper arcu. Proin id dolor
                                        eu tellus commodo malesuada eget et sapien.
                                    </label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='1C' name='question1'/>
                                    <div className="check"></div>
                                    <label htmlFor='1C'><span>C.</span> Sed consequat consequat turpis ac luctus. Vivamus in diam in ligula
                                        tempor consectetur.</label>
                                </li>
                            </ul>
                        </div>
                        <div className='test__questions__single'>
                            <h4>2. Integer id turpis elementum, pulvinar sem ac, egestas turpis?</h4>
                            <ul className='test__questions__single__photos'>
                                <li className='radio'>
                                    <input type='radio' id='2A' name='question2'/>
                                    <label htmlFor='2A'>
                                        <div className='image'>
                                            <img src={tip1} alt='quiz'/>
                                        </div>
                                        <span>A.</span>Aliquam augue nunc, sagittis non sagittis sit amet, mollis eget augue.
                                        Vivamus quis elementum metus.
                                    </label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='2B' name='question2'/>
                                    <div className="check"></div>
                                    <label htmlFor='2B'>
                                        <div className='image'>
                                            <img src={tip2} alt='quiz'/>
                                        </div>
                                        <span>B.</span>Phasellus nec finibus nisi. Duis et ullamcorper arcu. Proin id dolor
                                        eu tellus commodo malesuada eget et sapien.

                                    </label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='2C' name='question2'/>
                                    <div className="check"></div>
                                    <label htmlFor='2C'>
                                        <div className='image'>
                                            <img src={tip3} alt='quiz'/>
                                        </div>
                                        <span>C.</span> Sed consequat consequat turpis ac luctus. Vivamus in diam in ligula
                                        tempor consectetur.
                                    </label>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className='test__button'>
                        <button className='buttons__small' onClick={this.handleQuiz}>Finish</button>
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default QuestionsTest;