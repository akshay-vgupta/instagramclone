import React from 'react';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('NavBar component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('NavBar component mounted');
    }

    render () {
        return (
            <div className="navbar">
            <div className="navbar-div">
              <div className="logo">{this.props.title}</div>
              <div className="navbar-right">
                <div className="name">{this.props.username}</div>
                <div className="name">API Docs</div>
                <button className="signout">Sign out</button>
              </div>
            </div>
          </div>       
        );
    }
}

export default NavBar;