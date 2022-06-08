import React from 'react';
import { getHeaders } from '../utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Story component created');
        this.state={
            stories:[]
        }
        this.getStoriesFromServer()
    }

    componentDidMount() {
        // fetch posts
        console.log('Story component mounted');
    }
    getStoriesFromServer(){
        fetch('/api/stories',{
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(stories => {
            console.log(stories)
            this.setState({
                stories:stories
            })
        })
    }
    render () {
        return (
            this.state.stories.length===0?
                (<div>Loading...</div>):
            <div className='story-status'>   
                {
                    this.state.stories.map(story=>{
                        return (
                            <div className="story-card" key={story.id}>
                            <div className="story-pic">
                                <img src={story.user.thumb_url } className="pic" alt={`profile pic for ${ this.props.username }`} />
                                </div>
                                <p className="story-name">{ story.user.username }</p>
                            </div> )
                    })
                      
                }
            </div>
        );
    }
}

export default Stories;