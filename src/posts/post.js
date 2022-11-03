import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { db } from '../firebase';
import './post.css';
import { serverTimestamp } from "firebase/firestore";


// const cred = {
//     1: {
//         uname: 'username1',
//         imgsrc: 'https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242_960_720.jpg',
//         captions: 'hello this is an image'
//     }
// }

const Post =({username, caption, imageUrl,postId,user})=> {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState("");
    useEffect(() => {
        let unsubscribe;
        if (postId) {
          unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
    
        return () => {
        //   unsubscribe();
        };
      }, [postId]);

    // const postcomment = (event) => {

    // }
    const postComment = (event) => {
        event.preventDefault();
    
        db.collection("posts").doc(postId).collection("comments").add({
          text: comment,
          username: user.displayName,
          timestamp: serverTimestamp(),
        });
        setComment("");
      };

    return (
        <div className='post'>
            <div className='postheader'>
                <h6>{username}</h6>  
            </div>
            <div>
                <img  className='postimg' src={imageUrl}/>

            </div>
            <div className='postfooter'>
                <h6>{username}</h6>
                <p>{caption}</p>

            </div>
            <div className='postcomment'>
            {comments.map((comment) => (
                <h5 className="comment">
                <strong>{comment.username}</strong> {comment.text}
                </h5>
                ))}

            </div>
            <div className="post_comments">
        
      </div>
            <form className='postCommentBox'>
                <input className='inputPost' type='text' placeholder='add a comment..' value={comment}
                onChange={(e)=> setComment(e.target.value)}/>
                <Button className='buttonPost' color='primary' type="submit" onClick={postComment}>Post</Button>
            </form>
        </div>
    )
} 

export default Post;