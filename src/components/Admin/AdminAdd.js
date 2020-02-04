import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {NavLink} from "react-router-dom";
import ReactTooltip from 'react-tooltip'
import {firebase} from "../firebase/firebase";

const fileTypes = [
    'image/jpeg',
    'image/jpeg',
    'image/png'
];

class AdminAdd extends Component {
    state = {
        id: "",
        lastId: [],
        date: "",
        tags: [],
        tagValue: "",
        title: "",
        description: "",
        fileTip: "",
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
        this.handleDate();
        this.getLastId();
    }

    getLastId = () => {
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

                const lastId = array[array.length - 1].id;
                if(lastId.length === 1) {
                    const last = `[0${parseInt(lastId) + 1}]`;
                    this.setState({
                        id: parseInt(array[array.length - 1].id) + 1,
                        lastId: last,
                    });
                }
            });
    };

    handleImageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleDate = () => {
        const dayOfWeek = new Date().getDay();
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();

        const dayOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const monthsArray = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const date = dayOfWeekArray[dayOfWeek] + ", " + day + ' ' + monthsArray[month] + ' ' + year;

        this.setState({
            date: date,
        })
    };

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    };

    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value,
        })
    };

    handleTagChange = (e) => {
        this.setState({
            tagValue: e.target.value,
        })
    };

    handleQuestionChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleAnswerChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value,
      })
    };

    addTag = (e) => {
        e.preventDefault();
        if(this.state.tagValue !== "") {
            const tag = " " + this.state.tagValue;
            this.setState({
                tagValue: "",
                tags: [...this.state.tags, tag],
            })
        }
    };

    clearTags = () => {
        this.setState({
            tags: [],
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {id, date, title, lastId, description, tags, fileTip, file2A, file2B, file2C, question1, question2,
            question3, answers1a, answers1b, answers1c, answers2a, answers2b, answers2c,  answers3a, answers3b, answers3c,
            correct1, correct2, correct3} = this.state;

        firebase.firestore()
            .collection('tips')
            .add({
                id: id.toString(),
                added: date,
                title: title + " " + lastId,
                description: description,
                photovideo: fileTip,
                tags: tags,
                likes: "0",
                share: "0",
                test: [
                    {
                        question: "1. " + question1,
                        answer1: answers1a,
                        answer2: answers1b,
                        answer3: answers1c,
                        correct: correct1,
                    },
                    {
                        question: "2. " + question2,
                        answer1: [answers2a, file2A],
                        answer2: [answers2b, file2B],
                        answer3: [answers2c, file2C],
                        correct: correct2,
                    },
                    {
                        question: "3. " + question3,
                        answer1: answers3a,
                        answer2: answers3b,
                        answer3: answers3c,
                        correct: correct3,
                    }
                ]

            })
            .then(function(docRef) {
                console.log("Document successfully updated!");
                const {history} = this.props;
                history.push('/admin-tips')
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
    };


    render() {
        const { date, tagValue, tags, lastId } = this.state;
        const style = {
            position: "absolute",
            top: "9rem",
            left: "1rem",
        };
        return (
            <>
                <Header/>
                <section className='admin__add'>
                    <div className='admin__add__title'>
                        <NavLink to={'/admin-tips'} style={style}>
                            <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                        </NavLink>
                        <h2>Add</h2>
                    </div>
                    <form className='admin__add__main' onSubmit={this.handleSubmit}>
                        <div className='admin__add__main__details'>
                            <label htmlFor="title">Title:</label>
                            <div className='admin__add__main__details__title'>
                                <input type='text' id='title' onChange={this.handleTitleChange}/>
                                <span className='admin__add__main__details__title__id'>{lastId}</span>
                            </div>
                            <label htmlFor="description">Description:</label>
                            <textarea id='description' onChange={this.handleDescriptionChange}/>
                            <label htmlFor="date">Added:</label>
                            <input type='text' id='date' value={date} disabled/>
                        </div>
                        <div className='admin__add__main__photo'>
                            <label htmlFor="tip_photo" className='label'>Photo/video (link):</label>
                            <input type="text" id="fileTip" name="fileTip" onChange={this.handleImageChange}/>
                        </div>
                        <div className='admin__add__main__photodetails'>
                            <span>To save the uploaded photo, click "save"</span>
                        </div>
                        <div className='admin__add__main__tags'>
                            <div className='admin__add__main__tags__show'>
                                <label htmlFor="tags" className='label'>Tags:</label>
                                <input type="text" id="tags" name="tags" value={tags} disabled/>
                                <i className="fas fa-times-circle animation" alt='clear tags'
                                   data-for='clear__tags' data-tip="" onClick={this.clearTags}></i>
                                <ReactTooltip className='error__class' id='clear__tags' type='error' effect='solid' place='left'>
                                    <span>Clear all tags</span>
                                </ReactTooltip>
                            </div>
                            <div className='admin__add__main__tags__add'>
                                <input type="text" id="tags" name="tags" value={tagValue} onChange={this.handleTagChange}/>
                                <button className='buttons__small' onClick={(e) => this.addTag (e, this.state.tagValue)}>Add</button>
                            </div>
                        </div>
                        <p>Test questions:</p>
                        <div className='admin__add__main__test'>
                            <label htmlFor="question">Question 1:</label>
                            <input type='text' id='question1' name='question1' onChange={this.handleQuestionChange}/>
                            <label htmlFor="answer">Answers:</label>
                            <div className='admin__add__main__test__answers'>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>A:</span>
                                    <input type='text' id='1a' name='answers1a' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='1b' name='answers1b' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='1c' name='answers1c' onChange={this.handleAnswerChange}/>
                                </div>
                            </div>
                            <label htmlFor="question">Question 2:</label>
                            <input type='text' id='question2' name='question2' onChange={this.handleQuestionChange}/>
                            <label htmlFor="answer">Answers:</label>
                            <div className='admin__add__main__test__answers'>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>A:</span>
                                    <input type='text' id='2a' name='answers2a' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single__photo'>
                                    <span>Photo to answer A (link):</span>
                                    <input type="text" id="file2A" name="file2A" onChange={this.handleImageChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='2b' name='answers2b' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single__photo'>
                                    <span>Photo to answer B (link):</span>
                                    <input type="text" id="file2B" name="file2B" onChange={this.handleImageChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='2c' name='answers2c' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single__photo'>
                                    <span>Photo to answer C (link):</span>
                                    <input type="text" id="file2C" name="file2C" onChange={this.handleImageChange}/>
                                </div>
                            </div>
                            <label htmlFor="question">Question 3:</label>
                            <input type='text' id='question3' name='question3' onChange={this.handleQuestionChange}/>
                            <label htmlFor="answer">Answers:</label>
                            <div className='admin__add__main__test__answers'>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>A:</span>
                                    <input type='text' id='3a' name='answers3a' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='3b' name='answers3b' onChange={this.handleAnswerChange}/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='3c' name='answers3c' onChange={this.handleAnswerChange}/>
                                </div>
                            </div>
                        </div>
                        <button className='buttons__small' onClick={this.handleSubmit}>Save</button>
                    </form>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default AdminAdd;