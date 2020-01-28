import React, {Component} from 'react';
import Header from "./../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import ReadMoreReact from 'read-more-react';
import firebase from "../../firebase/firebase";

class Forum extends Component {
    state = {
        questions: [],
    };

    componentDidMount() {
        this.handleAllAsks();
    }

    handleAllAsks = () => {
        firebase
            .firestore()
            .collection("asks")
            .get()
            .then((doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });
                array.reverse();
                this.setState({
                    questions: array,
                });
            });
    };

    render() {

        const {questions} = this.state;
        return (
            <>
                <Header/>
                <section className='forum'>
                    <div className='forum__asks'>
                        <h2>Asks</h2>
                        <ul className='forum__asks__header'>
                            <li>
                                Title
                            </li>
                            <li>
                                Description
                            </li>
                            <li>
                                Posted
                            </li>
                        </ul>
                        {questions.map( (question, index) => {
                            return (
                                <div key={index}>
                                    <div className='forum__asks__single'>
                                        <p className='title'>{question.tip}</p>
                                        <ReadMoreReact text={`${question.question}`}
                                                       readMoreText="read more..."
                                                       min={100}
                                                       ideal={100}
                                                       max={300}/>
                                                       <div className='data'>
                                                           <p>{question.login}</p>
                                                           <p>{question.date}</p>
                                                       </div>
                                    </div>
                                    <section className='forum__asks__answer'>
                                        <i className="far fa-comment"></i>
                                        <p> <span>Posted on: {question.answer[0]}</span> <br/>
                                            {question.answer[1]}
                                        </p>
                                    </section>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default Forum;