import React from "react";
import { ReactDOM } from "react";
import {db,auth,storage} from '../firebase';
import { useState ,useEffect,useStyles} from "react";
import { Button, ButtonGroup, Input } from "@material-ui/core";
import './CreatePost.css';
import { makeStyles } from "@material-ui/core/styles";
import "./CreatePost.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import 'firebase/auth';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { width } from "@mui/system";

const CreatePost = ({username}) => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const fileType = file["type"];
          const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
          if (validImageTypes.includes(fileType)) {
            setError("");
            setImage(file);
          } else {
            console.log("error");
            alert("error please upload a image file");
            setError("error please upload a image file");
          }
        }
      };
    
      const handleUpload = () => {
        if (caption!=="" && image) {
          console.log(image);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              storage
                .ref("images")
                .child(image.name) // Upload the file and metadata
                .getDownloadURL() // get download url
                .then((url) => {
                  setUrl(url);
                  db.collection("posts").add({
                    timestamp: serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username,
                  });
                  setCaption("");
                  setImage(null);
                  document.getElementById('captions').value="";
                })
                .catch((err)=> {
                  alert(err.message);
                  console.log(err.code);
                });
            }
          );
        } else {
            alert("Error please choose an image to upload");
          setError("Error please choose an image to upload");
        }
      };
      const fileInputRef = React.createRef();
    
    return(
        <div className="createpostmain">
            <p>Create a POST!</p>
            <textarea id="captions" style={{width:' 100%',height: '100px', maxWidth: '750px'}} placeholder="This is text-area." onChange={(e)=> setCaption(e.target.value)}></textarea><br/>
            <Button style={{backgroundColor: '#6C4AB6', margin: '10px', color: 'white', backgroundColor: 'skyblue'}} onClick={()=> fileInputRef.current.click()}>Upload Photo</Button>
            <input type="file" onChange={handleChange} hidden ref={fileInputRef}/>
            
            <Button style={{margin: '10px', backgroundColor: 'blue',color: 'white'}} onClick={handleUpload}>POST</Button>
        </div>

    );
}
export default CreatePost;
   