import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {NavLink} from "react-router-dom";
import {firebase} from "../firebase/firebase";

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

    handleEditing = (e, index) => {
        console.log(index);
        this.setState({
            editing: true,
        })
    };

    render() {
        const { singleTip } = this.state;
        const style = {
            position: "absolute",
            left: "1rem",
        };

        const index = this.props.match.params.id.toString();

        return (
            <>
                <Header/>
                {singleTip.length > 0 &&
                <section className='admin'>
                    <div className='tips__week' key={index}>
                        <div className='tips__week__title'>
                            <NavLink to={'/admin-tips'} style={style}>
                                <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
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
                                {singleTip[0].tags.map( (tag, index) => {
                                    return(
                                        <>
                                            <li key={index}>{tag}</li>
                                            <li>|</li>
                                        </>
                                    )
                                })}
                            </ul>
                            <div className='tips__week__description__sharing'>
                                <div className='tips__week__description__sharing__likes'>
                                    <i className="fas fa-thumbs-up animation" onClick={this.handleLike}></i>
                                    <span>{singleTip[0].likes}</span>
                                </div>
                                <div className='tips__week__description__sharing__share'>
                                    <i className="fas fa-share-alt animation" onClick={this.handleShare}></i>
                                    <span>{singleTip[0].share}</span>
                                </div>
                            </div>
                            <button className='buttons__small' onClick={(e) => this.handleEditing(e, index)}>Edit</button>
                        </div>
                    </div>
                </section>
                }

                <WelcomeFooter/>
            </>
        )
    }
}

export default SingleTip;