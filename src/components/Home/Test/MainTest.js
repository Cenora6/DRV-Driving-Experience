import React, {Component} from 'react';
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import ResultTest from "./ResultTest";
import ReactTooltip from 'react-tooltip'
import {firebase} from "../../firebase/firebase";

class QuestionsTest extends Component {
    state = {
        tipQuestions: [],
        result: false,
        chosenAnswer1: "",
        chosenAnswer2: "",
        chosenAnswer3: "",
        totalPoints: 0,
        answerError: false,
    };

    componentDidMount() {
        this.getTips()
    }

    getTips = () => {
        firebase
            .firestore()
            .collection("tips")
            .get()
            .then( (doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });

                array.sort( (a, b) => {
                    return a.id - b.id;
                });

                const i = this.props.match.params.id.toString();
                const tip = array[i - 1];

                this.setState({
                    tipQuestions: tip.test,
                });
            });
    };

    checkAnswer1 = (e) => {
        this.setState({
            chosenAnswer1: e.target.value
        });
    };

    checkAnswer2 = (e) => {
        this.setState({
            chosenAnswer2: e.target.value
        });
    };

    checkAnswer3 = (e) => {
        this.setState({
            chosenAnswer3: e.target.value
        });
    };

    handleQuiz = (e) => {
        e.preventDefault()
        this.setState({
            answerError: false,
        });
        const { tipQuestions } = this.state;
        const correct1 = tipQuestions[0].correct;
        const correct2 = tipQuestions[1].correct;
        const correct3 = tipQuestions[2].correct;
        const { chosenAnswer1, chosenAnswer2, chosenAnswer3 } = this.state;
        if (chosenAnswer1 === "" || chosenAnswer2 === "" || chosenAnswer3 === "") {
            this.setState({
                answerError: true,
            })
        } else {

            if(chosenAnswer1 === correct1) {
                this.setState(prevState => {
                    return {
                        totalPoints: prevState.totalPoints + 1
                    }
                });
            }

            if(chosenAnswer2 === correct2) {
                this.setState(prevState => {
                    return {
                        totalPoints: prevState.totalPoints + 1
                    }
                });
            }

            if(chosenAnswer3 === correct3) {
                this.setState(prevState => {
                    return {
                        totalPoints: prevState.totalPoints + 1
                    }
                });
            }
            this.setState({
                result: true,
            })
        }
    };

    render() {
        const { tipQuestions } = this.state;
        return (
            <>
                <Header/>

                { tipQuestions.length > 0 &&

                <section className='test'>
                    {this.state.result && <ResultTest totalPoints={this.state.totalPoints}/>}
                    <div className='test__title'>
                        <h2>Training</h2>
                    </div>
                    <h3>{tipQuestions.title}</h3>
                    <p className='test__instructions'>Answer the following questions. In every question there is only one possible answer</p>
                    <div className='test__questions'>
                        <div className='test__questions__single'>
                            <h4>{tipQuestions[0].question}</h4>
                            <ul className='test__questions__single__text'>
                                <li className='radio'>
                                    <input type='radio' id='1A' name='question1' onChange={this.checkAnswer1} value={"answer1"}/>
                                    <label htmlFor='1A'><span>A.</span>{tipQuestions[0].answer1}</label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='1B' name='question1' onChange={this.checkAnswer1} value={"answer2"}/>
                                    <div className="check"></div>
                                    <label htmlFor='1B'><span>B.</span>{tipQuestions[0].answer2}</label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='1C' name='question1' onChange={this.checkAnswer1} value={"answer3"}/>
                                    <div className="check"></div>
                                    <label htmlFor='1C'><span>C.</span>{tipQuestions[0].answer3}</label>
                                </li>
                            </ul>
                        </div>
                        <div className='test__questions__single'>
                            <h4>{tipQuestions[1].question}</h4>
                            <ul className='test__questions__single__photos'>
                                <li className='radio'>
                                    <input type='radio' id='2A' name='question2' onChange={this.checkAnswer2} value={"answer1"}/>
                                    <label htmlFor='2A'>
                                        <div className='image'>
                                            <img src={tipQuestions[1].answer1[1]} alt='quiz'/>
                                        </div>
                                        <span>A.</span>{tipQuestions[1].answer1[0]}
                                    </label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='2B' name='question2' onChange={this.checkAnswer2} value={"answer2"}/>
                                    <div className="check"></div>
                                    <label htmlFor='2B'>
                                        <div className='image'>
                                            <img src={tipQuestions[1].answer2[1]} alt='quiz'/>
                                        </div>
                                        <span>B.</span>{tipQuestions[1].answer2[0]}

                                    </label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='2C' name='question2' onChange={this.checkAnswer2} value={"answer3"}/>
                                    <div className="check"></div>
                                    <label htmlFor='2C'>
                                        <div className='image'>
                                            <img src={tipQuestions[1].answer3[1]} alt='quiz'/>
                                        </div>
                                        <span>C.</span>{tipQuestions[1].answer3[0]}
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className='test__questions__single'>
                            <h4>{tipQuestions[2].question}</h4>
                            <ul className='test__questions__single__text'>
                                <li className='radio'>
                                    <input type='radio' id='3A' name='question3' onChange={this.checkAnswer3} value={"answer1"}/>
                                    <label htmlFor='3A'><span>A.</span>{tipQuestions[2].answer1}</label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='3B' name='question3' onChange={this.checkAnswer3} value={"answer2"}/>
                                    <div className="check"></div>
                                    <label htmlFor='3B'><span>B.</span>{tipQuestions[2].answer2}
                                    </label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='3C' name='question3' onChange={this.checkAnswer3} value={"answer3"}/>
                                    <div className="check"></div>
                                    <label htmlFor='3C'><span>C.</span>{tipQuestions[2].answer3}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='test__button'>
                        {this.state.answerError ?
                            <>
                                <span data-for='error__login' data-tip="">
                                    <button className='buttons__small' onClick={this.handleQuiz}>Finish</button>
                                </span>
                                <ReactTooltip className='error__class' id='error__login' type='error' delayHide={2000} effect='solid'>
                                    <span>All questions need to have answers.</span>
                                </ReactTooltip>
                            </> : <button className='buttons__small' onClick={this.handleQuiz}>Finish</button>}
                    </div>
                </section>
                }
                <WelcomeFooter/>
            </>
        )
    }
}

export default QuestionsTest;