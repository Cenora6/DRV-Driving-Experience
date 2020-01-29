import React, {Component} from 'react';
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import firebase from "../../firebase/firebase";
import ReactTooltip from 'react-tooltip'

const fileTypes = [
    'image/jpeg',
    'image/jpeg',
    'image/png'
];

class Profile extends Component {
    state = {
        fileSize: "",
        fileError: false,
        username: firebase.auth().currentUser.displayName,
        descriptionValue: "",
        profileName: "No file chosen",
    };

    handleImageChange = (e) => {
        const file = e.target.files;

        if(file.length > 0) {
            for (let i = 0; i < file.length; i++) {
                if (fileTypes.indexOf(file[i].type) !== -1) {

                    this.setState({
                        fileSize: this.returnFileSize(file[i].size),
                        profileName: file[i].name,
                    })

                } else {
                    this.setState({
                        fileError: true,
                    })
                }
            }
        }
    };

    handleSubmit = (e) => {
        e.preventDefault()
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

    render() {
        const user = firebase.auth().currentUser;
        const { fileSize, profileName } = this.state;

        return (
            <>
                <Header/>
                <section className='profile'>
                    <div className='profile__photo'>
                        <div className='profile__photo__square'></div>
                        <form className='profile__photo__form' onSubmit={this.handleSubmit}>
                            <label htmlFor="avatar" className='label'>Choose a profile picture:</label>
                            <input type="file"
                                   id="avatar" name="avatar"
                                   accept="image/png, image/jpeg"
                                   className='custom-file-input'
                                   onChange={this.handleImageChange}
                            />
                            <p>{profileName}</p>
                            <p>{fileSize}</p>
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
                                <input type='radio' id='female' name='gender'/>
                                <label htmlFor='female'>Female</label>
                                <div className="check"></div>
                            </div>
                            <div className='radio'>
                                <input type='radio' id='male' name='gender'/>
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
                                        <button className='buttons__small'onClick={this.handleSubmit}>Send</button>
                                    </span>
                            <ReactTooltip className='error__class' id='error__login' type='error' delayHide={2000} effect='solid'>
                                <span>{this.state.errorText}</span>
                            </ReactTooltip>
                        </>

                        :
                        <button className='buttons__small'onClick={this.handleSubmit}>Save</button>
                    }
                </section>
                <WelcomeFooter/>
            </>
        );
    }
}

export default Profile;