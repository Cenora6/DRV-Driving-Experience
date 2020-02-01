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
                    console.log(url);
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
        // if(index === e.target.nextSibling.id) {

    render() {
        const { users, photoUrl, clicked, details, uploading } = this.state;
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
                                <section className='forum__asks__single admin animation' key={user.email}>
                                    <div className='single' onClick={() => this.showDetails(user.email)} data-id={index}>
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
                                        </div>
                                    </div>
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