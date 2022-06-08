import React from 'react';
import { getHeaders } from '../../utils';


class BookmarkButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.bookmark = this.bookmark.bind(this);
        this.unbookmark = this.unbookmark.bind(this);
    }

    toggleBookmark(ev) {
        console.log("clicked bookmark")
        if (this.props.bookmarkId) {
            console.log('unbookmark');
            this.unbookmark();
        } else {
            console.log('bookmark');
            this.bookmark();
        }
    }

    bookmark() {
        console.log('code to bookmark the post');
        // issue fetch request and then afterwards requery for the post:
        // this.props.requeryPost();
        const postData = {
            "post_id": this.props.postId
        };
        
        fetch("/api/bookmarks/", {
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

    unbookmark() {
        console.log('code to unbookmark the post');
        // issue fetch request and then afterwards requery for the post:
        // this.props.requeryPost();
        const url = `api/bookmarks/${this.props.bookmarkId}`
    
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
        const bookmarkId = this.props.bookmarkId;
        const postId = this.props.postId;
        return (
            <button role="switch" style={{background:'none', border:'none', marginLeft: 'auto'}} onClick={this.toggleBookmark} aria-label={bookmarkId ? 'unbookmark':'bookmark'}
            aria-checked={bookmarkId ? 'true':'false'}
            data-post-id={postId}
            data-bookmark-id={bookmarkId ?bookmarkId :''}>
            <i
                className={` ${bookmarkId ? 'fa-solid': 'fa-regular'} fa-regular fa-bookmark fa-2xl`}
                style={{
                marginTop: '25px',
                marginRight: '5px'
                }}>
            </i>
        </button>
        ) 
    }
}

export default BookmarkButton;