import React from 'react';
import NavBar from './components/NavBar';
import Posts from './components/Posts/Posts';
import Profile from './components/Profile';
import Stories from './components/Stories';
import Suggestions from './components/Suggestions/Suggestions';
import {getHeaders} from './utils';

class App extends React.Component {  

    constructor(props){
        super(props);

        this.getProfileFromServer();
        this.state={
            user:{}
        }
        console.log(this.state.user)
    }
    getProfileFromServer(){
        fetch('/api/profile/',{
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(profile => {
            console.log(profile)
            this.setState({
                user:profile
            })
        })
    }
    render () {
        return (
            <div>
            <NavBar title="PhotoApp" 
            username={this.state.user.username}></NavBar>
            <div className="main-container">
            <div className="feed-wrapper">
              <div className="story">
              <Stories></Stories>
              </div>
      
              <div className="post-wrapper">
                  <Posts></Posts>
            </div>
            </div>
            <div className="suggestions-container">
            <Profile imgsrc={this.state.user.thumb_url} username={this.state.user.username}></Profile>

              <div className="suggestions-wrapper">
                <p className="suggestion-text">Suggestions for you</p>
                <div className="suggested-followers"></div>
                <Suggestions></Suggestions>
                </div>
              </div>
            </div>
            </div>
        );
    }
}

export default App;