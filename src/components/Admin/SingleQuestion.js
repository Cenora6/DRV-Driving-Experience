import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {firebase} from "../firebase/firebase";
import {NavLink} from "react-router-dom";

class SingleQuestion extends Component {
    state = {
        question: [],
        editing: false,
    };

    componentDidMount() {
        this.handleShowUsers();
    }

    handleShowUsers = () => {
        firebase
            .firestore()
            .collection("tips")
            .get()
            .then( (doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();

                    const index = this.props.match.params.id.toString();
                    if (data.id.indexOf(index) !== -1) {
                        array.push(data);
                    }
                });

                this.setState({
                    question: array,
                });
            });
    };

    handleEdit = () => {
        this.setState({
            editing: true,
        })
    };

    handleSave = () => {
        this.setState({
            editing: false,
        })
    };

    render() {
        const { question, editing } = this.state;
        return (
            <>
                <Header/>
                {question.length > 0 &&

                editing === false ?
                    <>
                        <NavLink to={'/admin-test'}>
                            <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                        </NavLink>
                        <section className='test'>
                            <div className='test__title'>
                                <h2>Training</h2>
                            </div>
                            <h3>{question[0].title}</h3>
                            <p className='test__instructions'>Answer the following questions. In every question there is only one possible answer</p>
                            <div className='test__questions'>
                                <div className='test__questions__single'>
                                    <h4>{question[0].test[0].question}</h4>
                                    <ul className='test__questions__single__text'>
                                        <li className='radio'>
                                            <input type='radio' id='1A' name='question1' onChange={this.checkAnswer1} value={"answer1"}/>
                                            <label htmlFor='1A'><span>A.</span>{question[0].test[0].answer1}</label>
                                            <div className="check"></div>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='1B' name='question1' onChange={this.checkAnswer1} value={"answer2"}/>
                                            <div className="check"></div>
                                            <label htmlFor='1B'><span>B.</span>{question[0].test[0].answer2}</label>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='1C' name='question1' onChange={this.checkAnswer1} value={"answer3"}/>
                                            <div className="check"></div>
                                            <label htmlFor='1C'><span>C.</span>{question[0].test[0].answer3}</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className='test__questions__single'>
                                    <h4>{question[0].test[1].question}</h4>
                                    <ul className='test__questions__single__photos'>
                                        <li className='radio'>
                                            <input type='radio' id='2A' name='question2' onChange={this.checkAnswer2} value={"answer1"}/>
                                            <label htmlFor='2A'>
                                                <div className='image'>
                                                    <img src={question[0].test[1].answer1[1]} alt='quiz'/>
                                                </div>
                                                <span>A.</span>{question[0].test[1].answer1[0]}
                                            </label>
                                            <div className="check"></div>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='2B' name='question2' onChange={this.checkAnswer2} value={"answer2"}/>
                                            <div className="check"></div>
                                            <label htmlFor='2B'>
                                                <div className='image'>
                                                    <img src={question[0].test[1].answer2[1]} alt='quiz'/>
                                                </div>
                                                <span>B.</span>{question[0].test[1].answer2[0]}

                                            </label>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='2C' name='question2' onChange={this.checkAnswer2} value={"answer3"}/>
                                            <div className="check"></div>
                                            <label htmlFor='2C'>
                                                <div className='image'>
                                                    <img src={question[0].test[1].answer3[1]} alt='quiz'/>
                                                </div>
                                                <span>C.</span>{question[0].test[1].answer3[0]}
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className='test__questions__single'>
                                    <h4>{question[0].test[2].question}</h4>
                                    <ul className='test__questions__single__text'>
                                        <li className='radio'>
                                            <input type='radio' id='3A' name='question3' onChange={this.checkAnswer3} value={"answer1"}/>
                                            <label htmlFor='3A'><span>A.</span>{question[0].test[2].answer1}</label>
                                            <div className="check"></div>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='3B' name='question3' onChange={this.checkAnswer3} value={"answer2"}/>
                                            <div className="check"></div>
                                            <label htmlFor='3B'><span>B.</span>{question[0].test[2].answer2}
                                            </label>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='3C' name='question3' onChange={this.checkAnswer3} value={"answer3"}/>
                                            <div className="check"></div>
                                            <label htmlFor='3C'><span>C.</span>{question[0].test[2].answer3}</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button className='buttons__small' onClick={this.handleEdit}>Edit</button>
                        </section>
                    </>
                    :
                    <>
                        <button className='buttons__small' onClick={this.handleSave}>Save</button>
                    </>

                }
                <WelcomeFooter/>
            </>
        )
    }
}

export default SingleQuestion;