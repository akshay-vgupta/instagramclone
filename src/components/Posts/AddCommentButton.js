import React from 'react';
import { getHeaders } from '../../utils';


class AddCommentButton extends React.Component {  

    constructor(props) {
        super(props);
        this.state={
            comment:''
        }
        this.textInput = React.createRef();
        this.updateComment = this.updateComment.bind(this);
        this.postComment = this.postComment.bind(this);
    }
    updateComment(ev){
        this.setState({
            comment:ev.target.value
        })
    }
    postComment(ev){
        const id = parseInt(ev.target.getAttribute('data-post-id'))
        const postData = {
            "post_id": id,
            "text": this.state.comment
        };
        
        fetch("https://photo-app-secured.herokuapp.com/api/comments", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    comment:''
                })
                this.props.refreshPost();
                this.textInput.current.focus();
            });
    }
    render () {
        const postId = this.props.postId;
        return (
            <div className="comment-wrapper">
                    <i
                    className="fa-regular fa-face-smile fa-xl"
                    style={{marginTop: '10px'}}
                    ></i>
                    <input
                    ref={this.textInput}
                    value={this.state.comment}
                    aria-label="Add a comment"
                    type="text"
                    className="comment-box"
                    placeholder="Add a comment"
                    onChange={this.updateComment}
                    />
                    <button className="comment-button"  data-post-id={postId} onClick={(e)=>this.postComment(e)}>post</button>
            </div>
        ) 
    }
}

export default AddCommentButton;