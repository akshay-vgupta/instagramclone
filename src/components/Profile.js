import React from 'react';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Profile component mounted');
    }

    render () {
        return (
            <div className="profile-user-card">
                <div className="profile-user-pic">
                    <img src={this.props.imgsrc} alt="" />
                </div>
                <div>
                    <p className="username">{this.props.username}</p>
                </div>   
            </div>
        );
    }
}

export default Profile;