import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {NavLink} from "react-router-dom";
import ReactTooltip from 'react-tooltip'

const fileTypes = [
    'image/jpeg',
    'image/jpeg',
    'image/png'
];

class AdminAdd extends Component {
    state = {
        date: [],
        tags: [],
        tagValue: "",
        title: "",
        description: "",
        fileTip: "",
        file2A: "",
        file2B: "",
        file2C: "",
        fileName: "No file chosen",
        fileError: false,
        question1: "",
        question2: "",
        question3: "",
        answers1: [],
        answers2: [],
        answers3: [],
    };

    componentDidMount() {
        this.handleDate();
    }

    handleImageChange = (e) => {
        const file = e.target.files;

        if(file.length > 0) {
            for (let i = 0; i < file.length; i++) {
                if (fileTypes.indexOf(file[i].type) !== -1) {

                    this.setState({
                        [e.target.name]: file[i],
                    });

                } else {
                    this.setState({
                        fileError: true,
                    })
                }
            }
        }
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

        const date = [dayOfWeekArray[dayOfWeek] + ", " + day + ' ' + monthsArray[month] + ' ' + year];

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

    handleAnswer1Change = (e) => {
      this.setState({

      })
    };

    handleAnswer2Change = (e) => {
      this.setState({

      })
    };

    handleAnswer3Change = (e) => {
      this.setState({

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

        console.log(
            {
                "new": [
                    {
                        "title": this.state.title,
                        "description": this.state.description,
                        "date": this.state.date,
                        "tags": this.state.tags,
                        "files": [this.state.fileTip, this.state.file2A, this.state.file2B, this.state.file2C],
                        "questions": [this.state.question1, this.state.question2, this.state.file2B, this.state.question3],
                        "answers1": this.state.answers1,
                        "answers2": this.state.answers2,
                        "answers3": this.state.answers3,                    }
                ]
            }
        )
    };


    render() {
        const { date, tagValue, tags, fileTip, file2A, file2B, file2C} = this.state;
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
                            <input type='text' id='title' onChange={this.handleTitleChange}/>
                            <label htmlFor="description">Description:</label>
                            <textarea id='description' onChange={this.handleDescriptionChange}/>
                            <label htmlFor="date">Added:</label>
                            <input type='text' id='date' value={date} disabled/>
                        </div>
                        <div className='admin__add__main__photo'>
                            <label htmlFor="tip_photo" className='label'>Photo/video:</label>
                            <input type="file"
                                   id="tip_photo" name="fileTip"
                                   accept="image/png, image/jpeg"
                                   className='custom-file-input'
                                   onChange={ this.handleImageChange}
                            />
                            { (fileTip) ?
                                fileTip.name.length > 25?
                                    <span>{fileTip.name.slice(0, 25) + "..."}</span> :
                                    <span>{fileTip.name}</span>
                                :
                                <span>{this.state.fileName}</span>
                            }
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
                                <input type="text" id="tagadd" name="tagadd" value={tagValue} onChange={this.handleTagChange}/>
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
                                    <input type='text' id='1a'/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='1b'/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='1c'/>
                                </div>
                            </div>
                            <label htmlFor="question">Question 2:</label>
                            <input type='text' id='question2' name='question2' onChange={this.handleQuestionChange}/>
                            <label htmlFor="answer">Answers:</label>
                            <div className='admin__add__main__test__answers'>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>A:</span>
                                    <input type='text' id='2a'/>
                                </div>
                                <div className='admin__add__main__test__answers__single__photo'>
                                    <input type="file"
                                           id="2Aphoto" name="file2A"
                                           accept="image/png, image/jpeg"
                                           className='custom-file-input'
                                           onChange={ this.handleImageChange }
                                    />
                                    { (file2A) ?
                                        file2A.name.length > 30 ?
                                            <span>{file2A.name.slice(0, 30) + "..."}</span> :
                                            <span>{file2A.name}</span>
                                        :
                                        <span>{this.state.fileName}</span>
                                    }
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='2b'/>
                                </div>
                                <div className='admin__add__main__test__answers__single__photo'>
                                    <input type="file"
                                           id="2Bphoto" name="file2B"
                                           accept="image/png, image/jpeg"
                                           className='custom-file-input'
                                           onChange={ this.handleImageChange}
                                    />
                                    { (file2B) ?
                                        file2B.name.length > 30 ?
                                            <span>{file2B.name.slice(0, 30) + "..."}</span> :
                                            <span>{file2B.name}</span>
                                        :
                                        <span>{this.state.fileName}</span>
                                    }
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='2c'/>
                                </div>
                                <div className='admin__add__main__test__answers__single__photo'>
                                    <input type="file"
                                           id="2Cphoto" name="file2C"
                                           accept="image/png, image/jpeg"
                                           className='custom-file-input'
                                           onChange={ this.handleImageChange }
                                    />
                                    { (file2C) ?
                                        file2C.name.length > 30 ?
                                            <span>{file2C.name.slice(0, 30) + "..."}</span> :
                                            <span>{file2C.name}</span>
                                        :
                                        <span>{this.state.fileName}</span>
                                    }
                                </div>
                            </div>
                            <label htmlFor="question">Question 3:</label>
                            <input type='text' id='question3' name='question3' onChange={this.handleQuestionChange}/>
                            <label htmlFor="answer">Answers:</label>
                            <div className='admin__add__main__test__answers'>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>A:</span>
                                    <input type='text' id='3a'/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='3b'/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='3c'/>
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