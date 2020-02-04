import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {firebase} from "../firebase/firebase";
import {NavLink} from "react-router-dom";

class SingleQuestion extends Component {
    state = {
        question: [],
        editing: false,
        file2A: "",
        file2B: "",
        file2C: "",
        question1: "",
        question2: "",
        question3: "",
        answers1a: "",
        answers1b: "",
        answers1c: "",
        answers2a: "",
        answers2b: "",
        answers2c: "",
        answers3a: "",
        answers3b: "",
        answers3c: "",
        correct1: "",
        correct2: "",
        correct3: "",
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
                    question1: array[0].test[0].question,
                    answers1a: array[0].test[0].answer1,
                    answers1b: array[0].test[0].answer2,
                    answers1c: array[0].test[0].answer3,
                    question2: array[0].test[1].question,
                    answers2a: array[0].test[1].answer1[0],
                    answers2b: array[0].test[1].answer2[0],
                    answers2c: array[0].test[1].answer3[0],
                    file2A: array[0].test[1].answer1[1],
                    file2B: array[0].test[1].answer2[1],
                    file2C: array[0].test[1].answer3[1],
                    question3: array[0].test[2].question,
                    answers3a: array[0].test[2].answer1,
                    answers3b: array[0].test[2].answer2,
                    answers3c: array[0].test[2].answer3,
                    correct1: array[0].test[0].correct,
                    correct2: array[0].test[1].correct,
                    correct3: array[0].test[2].correct,
                });
            });
    };

    handleEdit = () => {
        this.setState({
            editing: true,
        })
    };

    handleEditValues = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleSave = (e, index) => {
        e.preventDefault();
        const {file2A, file2B, file2C, question1, question2,
            question3, answers1a, answers1b, answers1c, answers2a, answers2b, answers2c,  answers3a, answers3b, answers3c,
            correct1, correct2, correct3} = this.state;
        firebase
            .firestore()
            .collection("tips")
            .where("id", "==", index)
            .get()
            .then( doc => {
                doc.forEach( doc => {
                    firebase.firestore()
                        .collection("tips")
                        .doc(doc.id)
                        .update({
                            test: [
                                {
                                    question: question1,
                                    answer1: answers1a,
                                    answer2: answers1b,
                                    answer3: answers1c,
                                    correct: correct1,
                                },
                                {
                                    question: question2,
                                    answer1: [answers2a, file2A],
                                    answer2: [answers2b, file2B],
                                    answer3: [answers2c, file2C],
                                    correct: correct2,
                                },
                                {
                                    question: question3,
                                    answer1: answers3a,
                                    answer2: answers3b,
                                    answer3: answers3c,
                                    correct: correct3,
                                }
                            ]
                        })
                        .then( () => {
                            console.log("Document successfully updated!");
                            this.setState({
                                editing: false,
                            });
                            const { history } = this.props;
                            history.push("/admin-test");
                        }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    })
                })
            });
    };

    render() {
        const {file2A, file2B, file2C, question1, question2, question3, answers1a, answers1b, answers1c,
            answers2a, answers2b, answers2c,  answers3a, answers3b, answers3c,
            correct1, correct2, correct3, question, editing} = this.state;
        const index = this.props.match.params.id.toString();
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
                                            <input type='radio' id='1A' name='question1'/>
                                            <label htmlFor='1A'><span>A.</span>{question[0].test[0].answer1}</label>
                                            <div className="check"></div>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='1B' name='question1'/>
                                            <div className="check"></div>
                                            <label htmlFor='1B'><span>B.</span>{question[0].test[0].answer2}</label>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='1C' name='question1'/>
                                            <div className="check"></div>
                                            <label htmlFor='1C'><span>C.</span>{question[0].test[0].answer3}</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className='test__questions__single'>
                                    <h4>{question[0].test[1].question}</h4>
                                    <ul className='test__questions__single__photos'>
                                        <li className='radio'>
                                            <input type='radio' id='2A' name='question2'/>
                                            <label htmlFor='2A'>
                                                <div className='image'>
                                                    <img src={question[0].test[1].answer1[1]} alt='quiz'/>
                                                </div>
                                                <span>A.</span>{question[0].test[1].answer1[0]}
                                            </label>
                                            <div className="check"></div>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='2B' name='question2'/>
                                            <div className="check"></div>
                                            <label htmlFor='2B'>
                                                <div className='image'>
                                                    <img src={question[0].test[1].answer2[1]} alt='quiz'/>
                                                </div>
                                                <span>B.</span>{question[0].test[1].answer2[0]}

                                            </label>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='2C' name='question2'/>
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
                                            <input type='radio' id='3A' name='question3'/>
                                            <label htmlFor='3A'><span>A.</span>{question[0].test[2].answer1}</label>
                                            <div className="check"></div>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='3B' name='question3'/>
                                            <div className="check"></div>
                                            <label htmlFor='3B'><span>B.</span>{question[0].test[2].answer2}
                                            </label>
                                        </li>
                                        <li className='radio'>
                                            <input type='radio' id='3C' name='question3'/>
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
                        <form className='admin__add__main' onSubmit={this.handleSubmit}>
                            <div className='admin__add__main__test'>
                                <label htmlFor="question">Question 1:</label>
                                <input type='text' id='question1' name='question1' value={question1} onChange={this.handleEditValues}/>
                                <label htmlFor="answer">Answers:</label>
                                <div className='admin__add__main__test__answers'>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>A:</span>
                                        <input type='text' id='1a' name='answers1a' value={answers1a} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>B:</span>
                                        <input type='text' id='1b' name='answers1b' value={answers1b} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>C:</span>
                                        <input type='text' id='1c' name='answers1c' value={answers1c} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>Correct:</span>
                                        <input type='text' id='correct1' name='correct1' value={correct1} onChange={this.handleEditValues}/>
                                    </div>
                                </div>
                                <label htmlFor="question">Question 2:</label>
                                <input type='text' id='question2' name='question2' value={question2} onChange={this.handleEditValues}/>
                                <label htmlFor="answer">Answers:</label>
                                <div className='admin__add__main__test__answers'>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>A:</span>
                                        <input type='text' id='2a' name='answers2a' value={answers2a} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single__photo'>
                                        <span>Photo to answer A (link):</span>
                                        <input type="text" id="file2A" name="file2A" value={file2A} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>B:</span>
                                        <input type='text' id='2b' name='answers2b' value={answers2b} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single__photo'>
                                        <span>Photo to answer B (link):</span>
                                        <input type="text" id="file2B" name="file2B" value={file2B} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>C:</span>
                                        <input type='text' id='2c' name='answers2c' value={answers2c} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single__photo'>
                                        <span>Photo to answer C (link):</span>
                                        <input type="text" id="file2C" name="file2C" value={file2C} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>Correct:</span>
                                        <input type='text' id='correct2' name='correct2' value={correct2} onChange={this.handleEditValues}/>
                                    </div>
                                </div>
                                <label htmlFor="question">Question 3:</label>
                                <input type='text' id='question3' name='question3' value={question3} onChange={this.handleEditValues}/>
                                <label htmlFor="answer">Answers:</label>
                                <div className='admin__add__main__test__answers'>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>A:</span>
                                        <input type='text' id='3a' name='answers3a' value={answers3a} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>B:</span>
                                        <input type='text' id='3b' name='answers3b' value={answers3b} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>C:</span>
                                        <input type='text' id='3c' name='answers3c' value={answers3c} onChange={this.handleEditValues}/>
                                    </div>
                                    <div className='admin__add__main__test__answers__single'>
                                        <span>Correct:</span>
                                        <input type='text' id='correct3' name='correct3' value={correct3} onChange={this.handleEditValues}/>
                                    </div>
                                </div>
                            </div>
                            <button className='buttons__small' onClick={(e) => this.handleSave(e, index)}>Save</button>
                        </form>
                    </>

                }
                <WelcomeFooter/>
            </>
        )
    }
}

export default SingleQuestion;