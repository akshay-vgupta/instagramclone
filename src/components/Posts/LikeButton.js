import React from 'react';
import { getHeaders } from '../../utils';


class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    toggleLike(ev) {
        console.log("clicked like")
        if (this.props.likeId) {
            console.log('unlike');
            this.unlike();
        } else {
            console.log('like');
            this.like();
        }
    }

    like() {
        console.log('code to like the post');
        // issue fetch request and then afterwards requery for the post:
        // this.props.requeryPost();
        const postData = {
            "post_id": this.props.postId
        };
        
        fetch("/api/posts/likes/", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.refreshPost();
        });
    }

    unlike() {
        console.log('code to unlike the post');
        // issue fetch request and then afterwards requery for the post:
        // this.props.requeryPost();
        const url = `api/posts/likes/${this.props.likeId}`
    
        fetch(url, {
         method: "DELETE",
         headers: getHeaders()
     })
     .then(response => response.json())
     .then(data => {
        console.log(data);
        this.props.refreshPost();
     });
    }

    render () {
        const likeId = this.props.likeId;
        const postId = this.props.postId;
        return (
            <button role="switch" style={{background:'none', border:'none'}} onClick={this.toggleLike} aria-label = {likeId ? 'unlike':'like'} aria-checked={likeId ? 'true':'false'} 
            data-post-id={postId} data-like-id={likeId ? likeId: ""}>
                <i
                    className={` ${likeId ? 'fa-solid': 'fa-regular'} fa-heart fa-2xl`}
                    style={{marginTop: '25px', marginRight: '20px'}}>
                </i>
            </button>
        ) 
    }
}

export default LikeButton;