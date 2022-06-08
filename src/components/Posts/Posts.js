import React from 'react';
import Post from './Post';
import { getHeaders } from '../../utils';

class Posts extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('All posts component created');
        this.state={
            posts:[]
        }
        this.getPostsFromserver();
    }
    getPostsFromserver(){
        fetch("https://photo-app-secured.herokuapp.com/api/posts/", {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                posts:data
            })
        });
    }
    componentDidMount() {
        // fetch posts
        console.log('All Posts component mounted');
    }

    render () {
        return (
            this.state.posts.length===0?
                (<div id="posts">Loading...</div>):
            <div>
                {
                    this.state.posts.map(post=>{
                        return (<Post model={post} key={'post-' + post.id}></Post>)
                    })
                }
            </div>
        );
    }
}

export default Posts;