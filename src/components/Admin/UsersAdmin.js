import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {firebase} from "../firebase/firebase";

class UsersAdmin extends Component {
    state = {
        users: [],
        photoUrl: "",
        details: false,
        clicked: null,
        uploading: false,
        editing: false,
        description: "",
        login: "",
        role: "",
    };

    componentDidMount() {
        this.handleShowUsers();
    }

    handleShowUsers = () => {
        firebase.firestore()
            .collection("users")
            .orderBy("email", "desc");

        firebase
            .firestore()
            .collection("users")
            .get()
            .then( (doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });

                array.sort( (a, b) => {
                    return b.email - a.email;
                });

                this.setState({
                    users: array,
                });
            });
    };

    showDetails = (email) => {

        this.setState({
            clicked: email,
            details: !this.state.details,
        });

        if(firebase.storage()
            .ref()
            .child(`${email}/profile-image`)) {
            firebase.storage()
                .ref()
                .child(`${email}/profile-image`)
                .getDownloadURL()
                .then( (url) => {
                    this.setState({
                        uploading: true,
                        photoUrl: url,
                    })
                }).catch( (error) => {
                if(error === "storage/object-not-found") {
                    return
                }
            });
        }
        this.setState({
            uploading: false,
        })
    };

    handleChangeLogin = (e) => {
        this.setState({
            login: e.target.value,
        })
    };

    handleChangeDescription = (e) => {
        this.setState({
            description: e.target.value,
        })

    };

    handleChangeRole = (e) => {
        this.setState({
            role: e.target.value,
        })

    };

    handleEditing = (e, index) => {
        const {users} = this.state;
        this.setState({
            editing: !this.state.editing,
            description: users[index].description,
            login: users[index].login,
            role: users[index].role,
        })
    };

    handleSave = (email) => {
        const { description, login, role } = this.state;
        firebase
            .firestore()
            .collection("users")
            .where("email", "==", email)
            .get()
            .then( doc => {
                doc.forEach( doc => {
                    firebase.firestore()
                        .collection("users")
                        .doc(doc.id)
                        .update({
                            description: description,
                            login: login,
                            role: role,
                        })
                        .then( () => {
                            console.log("Document successfully updated!");
                            const { history } = this.props;
                            history.push('/admin')
                        }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    })
                })
            });
        this.setState({
            editing: false,
        })
    };

    render() {
        const { users, photoUrl, clicked, details, uploading, editing } = this.state;
        return (
            <>
                <Header/>

                <section className='forum'>
                    <div className='forum__asks'>
                        <h2>Users</h2>
                        <ul className='forum__asks__header admin__header'>
                            <li>
                                Email
                            </li>
                            <li>
                                Login
                            </li>
                            <li>
                                Register date
                            </li>
                            <li>
                                Role
                            </li>
                        </ul>

                        {users.map((user, index) => {
                            return (
                                <section className='forum__asks__single admin' key={user.email}>
                                    { editing === true && clicked === user.email ?
                                        <>
                                            <div className='admin__description admin__editing' onClick={() => this.showDetails(user.email)} data-id={index}>
                                                <div className='admin__editing__data'>
                                                    <div className='admin__editing__photo'>
                                                        <img src={photoUrl} alt='profile_pic' className='admin__description__photo'/>
                                                    </div>
                                                    <div className='admin__editing__text'>
                                                        <input type='text' className='admin__email' value={user.email} disabled/>
                                                        <input type='text' className='admin__login' value={this.state.login} onChange={this.handleChangeLogin}/>
                                                        <input type='text' className='admin__role' value={this.state.role} onChange={this.handleChangeRole}/>
                                                        <p className='admin__description__text__gender'><span>Points:</span> {user.points}</p>
                                                        <div className='radio'>
                                                            { user.gender === "female" ?
                                                            <>
                                                                <input type='radio' id='female' name='gender' value={user.gender}
                                                                       checked={true} readOnly={true}/>
                                                                <label htmlFor='female'>Female</label>
                                                                <div className="check"></div>
                                                            </>
                                                                :
                                                                <>
                                                                    <input type='radio' id='male' name='gender' value={user.gender}
                                                                           checked={true} readOnly={true}/>
                                                                    <label htmlFor='male'>Male</label>
                                                                    <div className="check"></div>
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea className='admin__editing__text__description' value={this.state.description} onChange={this.handleChangeDescription}/>
                                            </div>
                                            <button className='buttons__small' onClick={() => this.handleSave(user.email)}>Save</button>
                                        </>
                                        :
                                        <>
                                            <div className='single animation' onClick={() => this.showDetails(user.email)} data-id={index}>
                                                <p className='admin__email'>{user.email}</p>
                                                <p className='admin__login'>{user.login}</p>
                                                <p className='admin__date'>{user.registerDate}</p>
                                                <p className='admin__role'>{user.role}</p>
                                            </div>
                                            {uploading === false ?
                                                null
                                                :
                                                <div className="admin__description" id={index} style={{display: `${ (clicked === user.email && details === true) ? "flex" : "none"}`}}>
                                                    <img src={photoUrl} alt='profile_pic' className='admin__description__photo'/>
                                                    <div className='admin__description__text'>
                                                        <p className='admin__description__text__desc'>{user.description}</p>
                                                        <p className='admin__description__text__gender'><span>gender:</span> {user.gender}</p>
                                                        <p className='admin__description__text__gender'><span>Points:</span> {user.points}</p>
                                                        <button className='buttons__small' onClick={(e) => this.handleEditing(e, index)}>Edit</button>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }
                                </section>
                            )
                        })
                        }
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default UsersAdmin;