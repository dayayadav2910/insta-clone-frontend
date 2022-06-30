import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, red, CardActions, Menu, MenuItem, Modal, Box, Divider, List, ListItem, Dialog, DialogTitle, TextField, Button, ListItemButton } from '@mui/material';
import { ShareIcon, Send, FavoriteTwoTone, FavoriteBorder, CommentSharp } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Favorite from '@mui/icons-material/Favorite';
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material';
import { indexedDBLocalPersistence } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../../App';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarBorder from '@mui/icons-material/StarBorder';
import AddPost from './AddPost';
const Cards = () => {
  const [open, setOpen] = React.useState(false);
  const [comment, setcomment] = useState("")

  const handleClick = () => {
    setOpen(!open);
  };
  console.log(comment);

  const handleComment = () => {
    console.log(comment);
  }
  const [openside, setopenside] = useState(false)
  const { state, dispatch } = useContext(UserContext)
  // console.log("OpenSide", openside);
  // console.log("Post from CardList",post);
  const [data, setdata] = useState([])
  useEffect(() => {
    fetch('http://localhost:6001/post/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(result => {
        console.log("All post", result);
        setdata(result.posts)
      })
  }, [])
  const likePost = (id) => {
    console.log("Like post id clicked");
    fetch('http://localhost:6001/post/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          }
          else {
            return item
          }
        })
        setdata(newData)
      })
  }
  const unlikePost = (id) => {
    console.log("unLike post id clicked");

    fetch('http://localhost:6001/post/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => console.log(result))
  }

  const makeCommet = (text, postId) => {
    console.log(text, postId);
    fetch('http://localhost:6001/post/comment', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          }
          else {
            return item
          }
        })
        setdata(newData)
      })
      .catch(err => {
        console.log(err);
      }
      )
  }
  const Cards = styled(Card)({
    background: 'white',
    width: '100%',
    maxWidth: '450px',
  })
  console.log("Component Render");
  return (
    <Box marginTop={"5%"} style={{ backgroundColor: "#FAFAFA" }} >
      {data.map((item, index) => {
        return (
          <Cards key={index} sx={{ margin: 1, marginLeft: "30%", marginRight: "50%" }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: ' #f09433' }} aria-label="recipe"></Avatar>}

              title={item.postedBy.name}
            />
            <CardMedia component="img" image={item.photo} style={{ height: "400px" }} alt="Paella dish" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {"Yeah"}
              </Typography>
            </CardContent>
            <CardActions sx={{ height: "40px" }}>
              <IconButton aria-label="add to favorites">
                {item.likes.includes(state._id) ? <Favorite style={{ color: 'red' }} onClick={() => { unlikePost(item._id) }} /> : <Favorite onClick={() => { likePost(item._id) }} />}
              </IconButton>
              <h6>likes {item.likes.length}</h6>
            </CardActions>
            <Box>
              <Divider></Divider>
              <Box display={'flex'} flexDirection={'row'}></Box>

              {/* <input style={{ width: '80%', height: 'auto', outline: 'none', border: '0px', marginBottom: '10px',marginLeft:'20px' }} key={'abc'}  autoFocus="autoFocus" type="text" placeholder='Add a Comment...' variant="standard" value={comment} onChange={(e)=>setcomment(e.target.value)}></input> */}
              {/* <a onClick={(e)=>{makeCommet(e.comment,e.item._id)}}>Post</a> */}
              <form onSubmit={(e) => {
                e.preventDefault()
                makeCommet(e.target[0].value, item._id)
              }}>
                <input style={{ width: '80%', height: 'auto', outline: 'none', border: '0px', marginBottom: '10px', marginLeft: '20px' }} type="text" placeholder="add a comment" />
              </form>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <CommentSharp />
                </ListItemIcon>
                <ListItemText primary="Comments" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {item.comments.map((record) => {
                  return (
                    <List key={item._id} component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={record.text} />
                      </ListItemButton>
                    </List>
                  )
                })}

              </Collapse>
            </Box>
          </Cards>
        )
      })}
      <AddPost></AddPost>
    </Box >
  )
}

export default Cards


// Created backend APIs with nodejs.
// Implemented user friendly websites.
// Fixed bugs from existing company's portal

// MySQL database development