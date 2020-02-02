import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {NavLink} from "react-router-dom";

class AdminAdd extends Component {
    state = {
        date: [],
        tags: [],
        tagValue: "",
    };

    componentDidMount() {
        this.handleDate();
    }

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

    handleTagChange = (e) => {
        this.setState({
            tagValue: e.target.value,
        })
    };

    addTag = (e) => {
        e.preventDefault();
        const tag = " " + this.state.tagValue;
        this.setState({
            tagValue: "",
            tags: [...this.state.tags, tag],
        })
    };

    render() {
        const { date, tagValue, tags } = this.state;
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
                    <form className='admin__add__main'>
                        <div className='admin__add__main__details'>
                            <label htmlFor="title">Title:</label>
                            <input type='text' id='title'/>
                            <label htmlFor="description">Description:</label>
                            <textarea id='description'/>
                            <label htmlFor="date">Added:</label>
                            <input type='text' id='date' value={date} disabled/>
                        </div>
                        <div className='admin__add__main__photo'>
                            <label htmlFor="tip_photo" className='label'>Photo/video:</label>
                            <input type="file"
                                   id="tip_photo" name="tip_photo"
                                   accept="image/png, image/jpeg"
                                   className='custom-file-input'
                                   onChange={this.handleImageChange}
                            />
                            <span>To save the uploaded photo, click "save"</span>
                        </div>
                        <div className='admin__add__main__photodetails'>
                            <span>Photo size: 5 Mb</span>
                            <span>Name: photo.jpg</span>
                        </div>
                        <div className='admin__add__main__tags'>
                            <div className='admin__add__main__tags__show'>
                                <label htmlFor="tags" className='label'>Tags:</label>
                                <input type="text" id="tags" name="tags" value={tags} disabled/>
                            </div>
                            <div className='admin__add__main__tags__add'>
                                <input type="text" id="tagadd" name="tagadd" value={tagValue} onChange={this.handleTagChange}/>
                                <button className='buttons__small' onClick={(e) => this.addTag (e, this.state.tagValue)}>Add</button>
                            </div>
                        </div>
                        <p>Test questions:</p>
                        <div className='admin__add__main__test'>
                            <label htmlFor="question">Question 1:</label>
                            <input type='text' id='question1'/>
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
                            <input type='text' id='question2'/>
                            <label htmlFor="answer">Answers:</label>
                            <div className='admin__add__main__test__answers'>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>A:</span>
                                    <input type='text' id='2a'/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>B:</span>
                                    <input type='text' id='2b'/>
                                </div>
                                <div className='admin__add__main__test__answers__single'>
                                    <span>C:</span>
                                    <input type='text' id='2c'/>
                                </div>
                            </div>
                            <label htmlFor="question">Question 3:</label>
                            <input type='text' id='question3'/>
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
                        <button className='buttons__small'>Save</button>
                    </form>

                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default AdminAdd;