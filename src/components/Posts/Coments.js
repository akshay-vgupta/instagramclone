import React from 'react';

class Comments extends React.Component {  

    render () {
        const post = this.props.post
            
        if(post.comments.length>1){
                return (
                    <div>
                        <button id="view-all" className="comment-more" data-post-id={post.id} >View all {post.comments.length} comments</button>
                        <p className="comment-text">
                        <span>{post.comments[post.comments.length-1].user.username} </span> 
                        {post.comments[post.comments.length-1].text}
                        </p>
                    </div>
                );
            }
            else if(post.comments.length===1){
                return (    
                <p className="comment-text">
                    <span>{post.comments[0].user.username} </span> 
                    {post.comments[0].text}
                    </p>
                );
            }
            else
            {
                return ``;
            }    
    }
}

export default Comments;