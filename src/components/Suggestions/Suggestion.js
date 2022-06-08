import React from 'react';
import { getHeaders } from '../../utils';


class Suggestion extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            suggestion: this.props.model,
            ariaChecked:false,
            suggestionId:null,
        }
        this.togglefollow = this.togglefollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    togglefollow(ev) {
        console.log("clicked follow button")
        if (ev.target.getAttribute('aria-checked')==='true') {
            console.log('unfollow');
            this.unfollow(parseInt(ev.target.getAttribute('data-following-id')));
        } else {
            console.log('follow');
            this.follow(parseInt(ev.target.getAttribute('data-user-id')));
        }
    }

    follow(userId) {
        console.log('code to follow the user',userId);

        const postData = {
            "user_id": userId
        };
        
        fetch("https://photo-app-secured.herokuapp.com/api/following/", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    ariaChecked:true,
                    suggestionId:data.id
                })
            });
    }

    unfollow(followingId) {
        console.log('code to unfollow the user');

        const url = `https://photo-app-secured.herokuapp.com/api/following/${followingId}`;
        fetch(url, {
            method: "DELETE",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                ariaChecked:false,
                suggestionId:null
            })
        });
    

    }
    render () {
        const suggestion = this.state.suggestion;
        if (!suggestion) {
            console.log("empty")
            return (
                <div>asdf</div>  
            );
        }
        return (
            <div className="profile-card">
                <div className="profile-pic">
                    <img src={suggestion.thumb_url} alt="" />
                </div>
                <div className="username-wrapper">
                    <p className="username">{suggestion.username}</p>
                    <p className="sub-text">suggested for you</p>
                </div>
                <button role="switch" className={`${this.state.ariaChecked?'unfollow-btn':'follow-btn'}`}
                aria-label = {`${this.state.ariaChecked?'unfollow':'follow'}`}
                aria-checked = {this.state.ariaChecked}
                data-following-id={` ${this.state.suggestionId?this.state.suggestionId:''}`}
                data-user-id={suggestion.id} onClick={(e)=>this.togglefollow(e)}>{` ${this.state.ariaChecked?'unfollow':'follow'}`}</button>
            </div>
        );     
    }
}

export default Suggestion;