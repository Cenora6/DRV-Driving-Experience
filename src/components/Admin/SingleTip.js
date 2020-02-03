import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {NavLink} from "react-router-dom";
import {firebase} from "../firebase/firebase";
import ReactTooltip from "react-tooltip";

class SingleTip extends Component {
    state = {
        editing: false,
        singleTip: [],
    };

    componentDidMount() {
        this.getSingleTip();
    }

    getSingleTip = () => {
        firebase
            .firestore()
            .collection("tips")
            .get()
            .then((doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();

                    const index = this.props.match.params.id.toString();

                    if (data.id.indexOf(index) !== -1) {
                        array.push(data);

                        this.setState({
                            singleTip: array,
                        })
                    }
                });
            });
    };

    handleEditing = () => {
        this.setState({
            editing: !this.state.editing,
        })
    };

    handleSave = (e, index) => {
        this.setState({
            editing: false,
        })
    };

    render() {
        this.getSingleTip()
        const { singleTip, editing } = this.state;
        const style = {
            position: "absolute",
            left: "1rem",
        };

        const index = this.props.match.params.id.toString();

        return (
            <>
                <Header/>
                <section className='admin'>
                    {singleTip.length > 0 && (

                        (editing === false) ?
                            <div className='tips__week' key={index}>
                                <div className='tips__week__title'>
                                    <NavLink to={'/admin-tips'} style={style}>
                                        <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go
                                            back
                                        </button>
                                    </NavLink>
                                    <span>{singleTip[0].added}</span>
                                </div>
                                <div className='tips__week__description'>
                                    <h3>{singleTip[0].title}</h3>
                                    <img src={singleTip[0].photovideo} alt='weekly-tip'/>
                                    <p>
                                        {singleTip[0].description}
                                    </p>
                                    <ul className='tips__week__description__tags'>
                                        <li>
                                            <i className="fas fa-tags"></i>
                                        </li>
                                        {singleTip[0].tags.map((tag, index) => {
                                            return (
                                                <>
                                                    <li key={index}>{tag}</li>
                                                    <li>|</li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                    <div className='tips__week__description__sharing'>
                                        <div className='tips__week__description__sharing__likes'>
                                            <i className="fas fa-thumbs-up animation"></i>
                                            <span>{singleTip[0].likes}</span>
                                        </div>
                                        <div className='tips__week__description__sharing__share'>
                                            <i className="fas fa-share-alt animation"></i>
                                            <span>{singleTip[0].share}</span>
                                        </div>
                                    </div>
                                    <button className='buttons__small' onClick={(e) => this.handleEditing(e, index)}>Edit
                                    </button>
                                </div>
                            </div>
                            :
                            <>
                                <form className='admin__tips__edit' key={index}>
                                    <div className='admin__tips__edit__title'>
                                        <label htmlFor="title">Added:</label>
                                        <input type='text' value={singleTip[0].added} disabled/>
                                    </div>
                                    <div className='admin__tips__edit__description'>
                                        <label htmlFor="title">Title:</label>
                                        <input type='text' value={singleTip[0].title}/>
                                        <label htmlFor="photovideo">Photo/video link:</label>
                                        <div className='admin__tips__edit__description__photo'>
                                            <input type='text' value={singleTip[0].photovideo}/>
                                            <i className="fas fa-times-circle animation" alt='clear tags'
                                               data-for='delete__photo' data-tip=""></i>
                                            <ReactTooltip className='error__class' id='delete__photo' type='error' effect='solid' place='left'>
                                                <span>Delete the photo</span>
                                            </ReactTooltip>
                                        </div>
                                        <label htmlFor="description">Description:</label>
                                        <textarea value={singleTip[0].description}/>
                                        <div className='admin__tips__edit__description__tags'>
                                            <div className='admin__tips__edit__description__tags__show'>
                                                <label htmlFor="tags" className='label'>Tags:</label>
                                                <input type="text" id="tags" name="tags" value={singleTip[0].tags} disabled/>
                                                <i className="fas fa-times-circle animation" alt='clear tags'
                                                   data-for='clear__tags' data-tip=""></i>
                                                <ReactTooltip className='error__class' id='clear__tags' type='error' effect='solid' place='left'>
                                                    <span>Clear all tags</span>
                                                </ReactTooltip>
                                            </div>
                                            <div className='admin__tips__edit__description__tags__add'>
                                                <input type="text" id="tags" name="tags"/>
                                                <button className='buttons__small'>Add</button>
                                            </div>
                                        </div>
                                        <button className='buttons__small' onClick={(e) => this.handleSave(e, index)}>Save</button>
                                    </div>
                                </form>
                            </>
                    )
                    }
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default SingleTip;