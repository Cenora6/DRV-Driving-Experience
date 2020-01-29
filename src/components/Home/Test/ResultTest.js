import React, {Component} from 'react';
import firebase from "../../firebase/firebase";
import {NavLink} from "react-router-dom";
import {
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    FacebookShareCount,
} from "react-share";

class ResultTest extends Component {
    state = {
        testPoints: 0,
        userPoints: "",
        uid: "",
    };

    componentDidMount() {
        this.getPoints();
    }

    getPoints = () => {
        const email = firebase.auth().currentUser.email;

        firebase
            .firestore()
            .collection("users")
            .where("email", "==", email )
            .get()
            .then(doc => {
                const pointsArray = [];
                const uidArray = [];

                doc.forEach(doc => {
                    const points = doc.data().points;
                    const uid = doc.id;

                    pointsArray.push(points);
                    uidArray.push(uid);
                });

                this.setState({
                    userPoints: pointsArray,
                    uid: uidArray,
                })
            });
    };

    savePoints = () => {
        const pointsSum = parseInt(this.state.userPoints) + parseInt(this.props.totalPoints);
        const uid = this.state.uid.toString();
        firebase.firestore().collection('users')
            .doc(uid)
            .update({
                points: pointsSum,
            }).then(function(docRef) {
            console.log("Document successfully updated!");
        })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
    };

    render() {
        const linkStyle = {
            textDecoration: "none",
        };
        const user = firebase.auth().currentUser;
        const pointsSum = parseInt(this.state.userPoints) + parseInt(this.props.totalPoints);
        const shareUrl = 'https://github.com/Cenora6';
        const title = 'Visit Cenora6 on Github';

        return (
            <div className='result'>
                <h4>Test: <br/> <span>Safe engine braking [54]</span> <br/> passed succesfully!</h4>
                <p>Congratulations <span>{user.displayName}</span></p>
                <p>You earned {this.props.totalPoints} points and now you have <span>{pointsSum} points.</span></p>
                <div className='result__share'>
                    <p>Share your result:</p>
                    <div className='result__share__media'>
                        <div className='facebook animation'>
                            <FacebookShareButton
                                url={shareUrl}
                                quote={title}>
                                <i className="fab fa-facebook-square"></i>
                            </FacebookShareButton>
                            <FacebookShareCount url={shareUrl}>
                                {shareCount => <span>{shareCount}</span>}
                            </FacebookShareCount>
                        </div>
                        <div className='twitter animation'>
                            <TwitterShareButton
                                url={shareUrl}
                                title={title}>
                                <i className="fab fa-twitter-square"></i>
                            </TwitterShareButton>
                        </div>
                        <div className='linkedin animation'>
                            <LinkedinShareButton
                                url={shareUrl}
                                title={title}>
                                <i className="fab fa-linkedin"></i>
                            </LinkedinShareButton>
                        </div>
                    </div>
                </div>
                <span onClick={this.savePoints}>
                <NavLink to={'/home'} style={linkStyle} className='buttons__small'>
                    Close the window and go back to TIPS
                </NavLink>
                </span>
            </div>
        )
    }
}

export default ResultTest;