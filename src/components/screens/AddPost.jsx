import {Avatar,Button,ButtonGroup,Fab,Modal,Stack,styled,TextField,Tooltip,Typography, Box, Divider} from "@mui/material";
import React, { useState, useEffect } from "react";
import {Add as AddIcon,DateRange,EmojiEmotions,Image,PersonAdd,VideoCameraBack,} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AddPost() {

  const [open, setopen] = useState(false)
  const [posts, setposts] = useState("")

  const [title, settitle] = useState("")
  const [body, setbody] = useState("")
  const [url, seturl] = useState("")
 
  const history = useNavigate()
  const setbuttonopne=(e)=>{
    setposts(e.target.files[0]);
    console.log("posts",posts);
  }

  useEffect(()=>{
    if(url){
     fetch("http://localhost:6001/post/createpost",{
         method:"post",
         headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("token")
         },
         body:JSON.stringify({
             title,
             body,
             pic:url
         })
     }).then(res=>res.json())
     .then(data=>{
 
        if(data.error){
           console.log(data.error); 
        }
        else{
           console.log("Created Sucessfull");
           history('/')
        }
     }).catch(err=>{
         console.log(err)
     })
 }
 },[url])


  const postDetails = ()=>{
    console.log("Button is clicked");
    const data = new FormData()
    data.append("file",posts)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","dayayadav")
    fetch("https://api.cloudinary.com/v1_1/dayayadav/image/upload",{
        method:"post",
        body:data
    })   
    .then(res=>res.json())
    .then(data=>{
       seturl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
}

  const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
  const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  });
  const Input = styled('input')({
    display: 'none',
  });
  return (
    <>
      <Tooltip onClick={(e) => setopen(true)} sx={{ position: 'fixed', bottom: 30, left: 30, backgroundColor: 'white' }} title="Add">
        <Fab aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal open={open} onClose={(e) => setopen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box width={400} height={300} bgcolor="white" color={"text.primary"} p={3} borderRadius={5}>
          <Typography variant="h6" color="gray" textAlign="center">
            Create new post
          </Typography>
          <Divider></Divider>
          <TextField sx={{ width: "100%" }} placeholder="Title" value={title} onChange={(e)=>settitle(e.target.value)} variant="standard"/>
          <Divider></Divider>
          {/* <TextField sx={{ width: "100%" }}  placeholder="Body" value={body} onChange={(e)=>setbody(e.target.value)} variant="standard"/> */}
          <br></br><br></br>
          <label htmlFor="contained-button-file" display={"flex"}>
            <Input accept="image/*" id="contained-button-file" multiple type="file"  onChange={(e)=>setbuttonopne(e)}/>
            <Button variant="contained" component="span">
              Add Image 
            </Button>           
          </label>
          {posts? <>
            <TextField sx={{ width: "100%" }} value={posts.name} placeholder="Title" variant="standard"/>
            <br></br><br></br> 
            <Button variant="contained" component="span" onClick={()=>postDetails()}>
              Upload
            </Button>
          </>:""}
            
        </Box>
      </StyledModal>
    </>
  )
}

export default AddPost