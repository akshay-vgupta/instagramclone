import React from 'react';
import { getHeaders } from '../../utils';
import AddCommentButton from './AddCommentButton';
import BookmarkButton from './BookmarkButton';
import Comments from './Coments';
import LikeButton from './LikeButton';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        }
        this.refreshPost = this.refreshPost.bind(this);
        //console.log('single post component created');
    }
    componentDidMount() {
        // fetch posts
        console.log('single post component mounted');
    }

    refreshPost(){
        fetch(`https://photo-app-secured.herokuapp.com/api/posts/${this.state.post.id}`, {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                post:data
            })
        });
    }
    render () {
        const post = this.state.post;
        if (!post) {
            console.log("empty")
            return (
                <div>asdf</div>  
            );
        }
        return (
            <div className="post" data-post-id={post.id}>
                <div className="info">
                    <p className="username">{post.user.username}</p>
                    <i className="fa-solid fa-ellipsis fa-xl"></i>
                </div>
                <div className="image-wrapper">
                    <img
                    src={post.image_url}
                    className="post-image"
                    alt=""
                    />
                </div>
                <div className="post-content">
                    <div className="reaction-wrapper">
                        <LikeButton likeId={post.current_user_like_id} postId={post.id}
                                    refreshPost={this.refreshPost}>
                        </LikeButton>
                        <i
                            className="fa-regular fa-comment fa-xl"
                            style={{marginTop: '25px', marginRight: '20px' }}
                        ></i>
                        <i
                            className="fa-regular fa-paper-plane fa-xl"
                            style={{marginTop: '25px', marginRight: '20px'}}
                        ></i>
                        <BookmarkButton bookmarkId={post.current_user_bookmark_id} postId={post.id} refreshPost={this.refreshPost}></BookmarkButton>
                    </div>
                    <p className="likes">{post.likes.length} likes</p>
                    <p className="description">
                    <span>{post.user.username} </span> {post.caption}
                    <button className="comment-more" href="#">More</button>
                    </p>
                    <Comments post={post}></Comments>
            
                    <p className="post-time">{post.display_time}</p>
                </div>
                <AddCommentButton postId={post.id} refreshPost={this.refreshPost}></AddCommentButton>
            </div>
        );     
    }
}

export default Post;