import React, {Component} from 'react';
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import {firebase} from "../../firebase/firebase";
import ReactTooltip from 'react-tooltip'

const fileTypes = [
    'image/jpeg',
    'image/jpeg',
    'image/png'
];

class Profile extends Component {
    state = {
        file: "",
        fileSize: "",
        fileError: false,
        username: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        descriptionValue: "",
        fileName: "No file chosen",
        uploading: false,
        fileUrl: "",
        gender: "",
        userUid: "",
    };

    componentDidMount() {
        this.getPhoto();
        this.getData();
        this.getProfile();
    }

    getData = () => {
        const email = firebase.auth().currentUser.email;
        firebase
            .firestore()
            .collection("users")
            .where("email", "==", email )
            .get()
            .then(doc => {
                doc.forEach(doc => {
                    const uid = doc.id;
                    this.setState({
                        userUid: uid,
                    })
                });
            });
    };

    handleImageChange = (e) => {
        const file = e.target.files;

        if(file.length > 0) {
            for (let i = 0; i < file.length; i++) {
                if (fileTypes.indexOf(file[i].type) !== -1) {

                    this.setState({
                        file: file[i],
                        fileSize: this.returnFileSize(file[i].size),
                        fileName: file[i].name,
                    });

                } else {
                    this.setState({
                        fileError: true,
                    })
                }
            }
        }
    };

    handleSubmit = (e) => {
        const {userUid,descriptionValue,gender} = this.state;
        firebase.firestore().collection('users')
            .doc(userUid)
            .update({
                description: descriptionValue,
                gender: gender,
            })
            .then( (authUser) => {
                const user = firebase.auth().currentUser;
                if(user) {
                    user.updateProfile({
                        displayName: this.state.username,
                        uid: user.uid,
                    }).then( () => {
                        const { history } = this.props;
                        if(sessionStorage.getItem("role") === "user") {
                            history.push("/home");
                        } else if (sessionStorage.getItem("role") === "admin") {
                            history.push("/admin");
                        }
                    })
                }
            })
            .then(function(docRef) {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });

        if(this.state.file) {
            firebase.storage()
                .ref()
                .child(`${this.state.email}/profile-image`)
                .put(this.state.file)
                .then(snapshot => {
                    console.log("Profile photo updated!")
                })
                .catch(err => {
                    console.error(err);
                }).then( () => {
                firebase.storage()
                    .ref()
                    .child(`${this.state.email}/profile-image`)
                    .getDownloadURL()
                    .then( (url) => {
                        this.setState({
                            fileUrl: url,
                            uploading: true,
                            file: "",
                            fileSize: "",
                            fileName: "",
                        })
                    })
            });

            this.setState({
                uploading: false,
            });
        }

        e.preventDefault();
    };

    returnFileSize = (number) => {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            return (number/1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            return (number/1048576).toFixed(1) + 'MB';
        }
    };

    handleNameChange = (e) => {
        this.setState({
            username: e.target.value,
        })
    };

    handleDescriptionChange = (e) => {
        this.setState({
            descriptionValue: e.target.value,
        })
    };

    handleGenderChange = (e) => {
        this.setState({
            gender: e.target.id,
        })
    };

    handleDeletePhoto =  () => {
        this.setState({
            file: "",
            fileSize: "",
            fileName: "No file chosen"
        })
    };

    getPhoto = () => {
        if(firebase.storage()
            .ref()
            .child(`${this.state.email}/profile-image`)) {
            firebase.storage()
                .ref()
                .child(`${this.state.email}/profile-image`)
                .getDownloadURL()
                .then( (url) => {
                    this.setState({
                        fileUrl: url,
                        uploading: !this.state.uploading,
                        file: "",
                        fileSize: "",
                        fileName: "",
                    })
                }).catch( (error) => {
                    if(error === "storage/object-not-found") {
                        return
                    }
            });
        }
    };

    getProfile = () => {
        const email = firebase.auth().currentUser.email;

        firebase
            .firestore()
            .collection("users")
            .where("email", "==", email )
            .get()
            .then(doc => {
                doc.forEach(doc => {
                    const description = doc.data().description;
                    const gender = doc.data().gender;

                    this.setState({
                        descriptionValue: description,
                        gender: gender,
                    })
                });
            });
    };

    render() {
        const user = firebase.auth().currentUser;
        const { file, fileSize, fileName } = this.state;

        return (
            <>
                <Header/>
                <section className='profile'>
                    <div className='profile__photo'>
                        <div className='profile__photo__square'>{(this.state.uploading) &&
                            <img className='profile__photo__square__image' src={`${this.state.fileUrl}`} alt={'profilePhoto'}/>}
                        </div>
                        <form className='profile__photo__form' onSubmit={this.handleSubmit}>
                            <label htmlFor="avatar" className='label'>Choose a profile picture:</label>
                            <input type="file"
                                   id="avatar" name="avatar"
                                   accept="image/png, image/jpeg"
                                   className='custom-file-input'
                                   onChange={this.handleImageChange}
                            />
                            {(file) ? <i className="fas fa-times" onClick={this.handleDeletePhoto}></i> : null}
                            <p>{fileName}</p>
                            <p>{fileSize}</p>
                            <span>To save the uploaded photo, click "save"</span>
                        </form>
                    </div>
                    <div className='profile__data'>
                        <div className='profile__data__login'>
                            <label className='label'>Your username:</label>
                            <input type='text' value={this.state.username} onChange={this.handleNameChange}/>
                        </div>
                        <div className='profile__data__email'>
                            <label className='label'>Your email:</label>
                            <input type='text' disabled placeholder={user.email}/>
                        </div>
                        <div className='profile__data__gender'>
                            <span className='label'>Your gender:</span>
                            <div className='radio'>
                                <input type='radio' id='female' name='gender' value={this.state.gender}
                                       onChange={this.handleGenderChange}
                                       checked={(this.state.gender === "female") && true}/>
                                <label htmlFor='female'>Female</label>
                                <div className="check"></div>
                            </div>
                            <div className='radio'>
                                <input type='radio' id='male' name='gender' value={this.state.gender}
                                       onChange={this.handleGenderChange}
                                       checked={(this.state.gender === "male") && true}/>
                                <label htmlFor='male'>Male</label>
                                <div className="check"></div>
                            </div>
                        </div>

                    </div>
                </section>
                <section className='description'>
                    <span className='label'>Your description:</span>
                    <textarea value={this.state.descriptionValue} onChange={this.handleDescriptionChange}></textarea>
                </section>
                <section className='save'>
                    {this.state.fileError ?
                        <>
                                    <span data-for='error__login' data-tip="">
                                        <button className='buttons__small' onClick={this.handleSubmit}>Send</button>
                                        {!(this.state.uploading) &&
                                    <div className="spinner">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>}
                                    </span>
                            <ReactTooltip className='error__class' id='error__login' type='error' delayHide={2000} effect='solid'>
                                <span>{this.state.fileError}</span>
                            </ReactTooltip>
                        </>
                        :
                        <>
                        <button className='buttons__small' onClick={this.handleSubmit}>Save</button>
                            {!(this.state.uploading) &&
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>}
                        </>
                    }
                </section>
                <WelcomeFooter/>
            </>
        );
    }
}

export default Profile;