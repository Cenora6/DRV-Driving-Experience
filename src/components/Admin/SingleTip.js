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
        title: "",
        description: "",
        photoVideo: "",
        tags: [],
        tagValue: "",

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
                    }
                });

                this.setState({
                    singleTip: array,
                    title: array[0].title,
                    description: array[0].description,
                    photoVideo: array[0].photovideo,
                    tags: array[0].tags,
                })
            });
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

    handlePhotoChange = (e) => {
        this.setState({
            photoVideo: e.target.value,
        })
    };

    handleTagAdd = (e) => {
        this.setState({
            tagValue: e.target.value,
        })
    };

    handleAddTag = (e) => {
        e.preventDefault();
        const {tags, tagValue} = this.state;
        this.setState({
            tags: [...tags, tagValue],
            tagValue: "",
        })
    };


    handleEditing = () => {
        this.setState({
            editing: !this.state.editing,
        })
    };

    handleSave = (e, index) => {
        e.preventDefault();
        const {title, description, tags, photoVideo} = this.state;
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
                            title: title,
                            description: description,
                            photovideo: photoVideo,
                            tags: tags,
                        })
                        .then( () => {
                            console.log("Document successfully updated!");
                            this.setState({
                                editing: false,
                            });
                            const { history } = this.props;
                            history.push("/admin-tips");
                        }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    })
                })
            });
    };

    handleClearPhoto = () => {
        this.setState({
            photoVideo: "",
        })
    };

    handleDeleteTag = (tag) => {
        this.setState({
            tags: this.state.tags.filter(i => i !== tag)
        })
    };

    render() {
        const { singleTip, editing,title, description, photoVideo, tags } = this.state;
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
                                </div>
                                <div className='tips__week__description'>
                                    <h3 className='margin__h3'>{singleTip[0].title}</h3>
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
                                                    <li key={index}>{tag} | </li>
                                            )
                                        })}
                                    </ul>
                                    <div className='tips__week__description__sharing'>
                                        <div className='tips__week__description__sharing__likes'>
                                            <i className="fas fa-thumbs-up"></i>
                                            <span>{singleTip[0].likes}</span>
                                        </div>
                                        <div className='tips__week__description__sharing__share'>
                                            <i className="fas fa-share-alt"></i>
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
                                        <input type='text' id='title' value={title} onChange={this.handleTitleChange}/>
                                        <label htmlFor="photovideo">Photo/video link:</label>
                                        <div className='admin__tips__edit__description__photo'>
                                            <input type='text' id='photovideo' value={photoVideo} onChange={this.handlePhotoChange}/>
                                            <i className="fas fa-times-circle animation" alt='clear photo'
                                               data-for='delete__photo' data-tip="" onClick={this.handleClearPhoto}></i>
                                            <ReactTooltip className='error__class' id='delete__photo' type='error' effect='solid' place='left'>
                                                <span>Delete the photo</span>
                                            </ReactTooltip>
                                        </div>
                                        <label htmlFor="description">Description:</label>
                                        <textarea value={description} id='description' onChange={this.handleDescriptionChange}/>
                                        <div className='admin__tips__edit__description__tags'>
                                            <div className='admin__tips__edit__description__tags__show'>
                                                <label htmlFor="tags" className='label'>Tags:</label>
                                                <ul>
                                                    {tags.map( (tag, index) => {
                                                        return (
                                                            <>
                                                                <li onClick={ () => this.handleDeleteTag(tag)}>{tag}</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className='admin__tips__edit__description__tags__add'>
                                                <input type="text" id="tags__add" name="tags" value={this.state.tagValue} onChange={this.handleTagAdd}/>
                                                <button className='buttons__small' onClick={this.handleAddTag}>Add</button>
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