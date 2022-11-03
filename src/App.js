import React from "react";
import { ReactDOM } from "react";
import Post from './posts/post';
import Navbar from './Navbar/navbar';
import {db,auth} from './firebase';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { useState ,useEffect} from "react";
import CreatePost from './CreatePost/CreatePost';
import './App.css';
import { Button, Input } from "@material-ui/core";
import firebase from "firebase/app";
import Registration from "./Registration/registration";



const App = () => {
  const [posts,setPosts] = useState([]);
  const [user,setUser] = useState(null);
  const [signin,setSignin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerClick,setregisterClick] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);


  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

 
  const onRegister =()=> {
       const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userCredential.displayName = username;
      const user = userCredential.user;
      console.log(user);
      setSignin(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });}

    const onSignin = (event) => {
      event.preventDefault();
      // setSignin('true');
    
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCred)=>{
          if(userCred.user.email === email){
            setSignin(true);
            setUsername(userCred.user.displayName);
          }
        })
        .catch((error) => alert(error.message))
      
    };


  const doSignOut = () => {
    auth
    .signOut().then(() => {
      console.log('signOut');
      // Sign-out successful.
      setEmail("");
      setUsername("");
      setPassword("");
      setSignin(false);
    }).catch((error) => {
      // An error happened.
    })

  }

  return(
    <div>
      
      {signin === true ?
      <div>
        <div className="feed">
          <Button className="btnlogout" variant="contained" color="primary" onClick={doSignOut} style={{margin: '10px'}}>Logout</Button>
          <h1>Welcome {username}</h1>
          <CreatePost username = {username}/>
        </div>
        

        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId = {id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            user = {user}
          />
        ))}
      </div>
      
      :
      <div className="mainApp">
        <h1>Already Registered? Login Here!</h1>
        <form className="appform">
          <div className="appEmail"><label>Email </label><input placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="text"></input><br/><br/></div>
          <label>Password </label><input placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password"></input><br/><br/>
          <Button variant="contained" color='primary' className="loginbutton" onClick={onSignin}>Login</Button>&nbsp;&nbsp;&nbsp;
          {/* <Button variant="contained" color="secondary" onClick={onRegister}>Register</Button> */}
        </form>
        {/* {registerClick === false?<button onClick={() => setregisterClick(true)}>Register</button>:<p></p>}
        {
          registerClick === true ?
                <div>
                  <form className="registerform">
                  <label>Username </label><input onChange={(e)=> setUsername(e.target.value)} type="text"/><br/><br/>
                    <label>Email </label><input onChange={(e) => setEmail(e.target.value)} type="text"></input><br/><br/>
                    <label>Password </label><input onChange={(e) => setPassword(e.target.value)} type="text"></input><br/><br/>
                    <Button onClick={onRegister}>Register</Button>
                  </form>
                    
                </div>:
            <div></div>

        } */}

      </div>
      
  }
  { signin==false
  ? <Registration onRegister={onRegister} username={username} email={email} password={password} setSignin={setSignin} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail}/> 
  : <div>
    <p style={{textAlign: 'center'}}>Thanks for visiting!</p>
  </div>
}
    </div>
  );
}

export default App;